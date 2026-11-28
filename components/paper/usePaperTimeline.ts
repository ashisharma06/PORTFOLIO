"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type UsePaperTimelineOptions = {
  trackRef: RefObject<HTMLElement | null>;
  stageRef: RefObject<HTMLElement | null>;
  pageCount: number;
  onCurrentPageChange: (page: number) => void;
};

/**
 * One ScrollTrigger owns the whole stage. Scroll position is the only input;
 * every sheet transform is a segment of a single scrubbed timeline.
 */
export function usePaperTimeline({
  trackRef,
  stageRef,
  pageCount,
  onCurrentPageChange,
}: UsePaperTimelineOptions) {
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const currentRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || pageCount < 1) return;

    if (pageCount === 1) {
      currentRef.current = 0;
      onCurrentPageChange(0);
      return;
    }

    let media: gsap.MatchMedia | undefined;

    const context = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const sheets = gsap.utils.toArray<HTMLElement>(
        "[data-paper-sheet]",
        stage,
      );
      const count = Math.min(pageCount, sheets.length);

      const setCurrent = (progress: number) => {
        const page = Math.min(
          count - 1,
          Math.max(0, Math.floor(progress * (count - 1) + 0.5)),
        );
        if (page !== currentRef.current) {
          currentRef.current = page;
          onCurrentPageChange(page);
        }
      };

      media = gsap.matchMedia();

      // Full newsprint turn. Each segment is one timeline unit long, giving
      // pageCount - 1 equal turns over the (pageCount - 1) viewport of scroll.
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const highlights = gsap.utils.toArray<HTMLElement>(
          "[data-paper-highlight]",
          stage,
        );
        const inkEls = gsap.utils.toArray<HTMLElement>(
          "[data-paper-ink]",
          stage,
        );
        const floorShadow = stage.querySelector<HTMLElement>(
          "[data-paper-floor-shadow]",
        );

        gsap.set(sheets, {
          rotateY: 0,
          rotateX: 0,
          rotateZ: 0,
          skewY: 0,
          scaleX: 1,
        });
        gsap.set(sheets.slice(1), { autoAlpha: 1, pointerEvents: "auto" });
        gsap.set(highlights, { xPercent: 0, skewX: -14, opacity: 0 });
        if (floorShadow) gsap.set(floorShadow, { scaleX: 1, opacity: 0.25 });

        let smearing = false;
        const turn = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          // Ink smear is the only paint-based effect, limited to 10% of a
          // segment. Toggling a class here keeps it correct in both directions.
          onUpdate: () => {
            const time = turn.time();
            const segment = Math.min(count - 1, Math.max(0, Math.floor(time)));
            const local = time - segment;
            const smear = segment < count - 1 && local > 0.001 && local < 0.1;
            if (smear !== smearing) {
              smearing = smear;
              inkEls.forEach((el) =>
                el.classList.toggle("paper-ink-smear", smear),
              );
            }
          },
        });

        for (let i = 0; i < count - 1; i += 1) {
          const sheet = sheets[i];
          const next = sheets[i + 1];
          const shade = sheet.querySelector<HTMLElement>("[data-paper-shade]");
          const edge = sheet.querySelector<HTMLElement>("[data-paper-edge]");
          const highlight = highlights[i];
          const underShadow = next.querySelector<HTMLElement>(
            "[data-paper-under-shadow]",
          );
          const at = i;

          // A finger catches the free edge before the sheet commits to turning.
          turn.to(sheet, { rotateY: -6, duration: 0.15, ease: "power2.out" }, at);
          turn.to(sheet, { rotateY: -172, duration: 0.85 }, at + 0.15);

          // Approximated bend: the whole sheet peels, skews and squashes at
          // the midpoint, then relaxes. One element, no duplicated content.
          turn.fromTo(
            sheet,
            { rotateX: 0, skewY: 0, scaleX: 1 },
            {
              rotateX: 4,
              skewY: -2,
              scaleX: 0.985,
              duration: 0.425,
              repeat: 1,
              yoyo: true,
            },
            at + 0.15,
          );

          // The page flutters as it lands, then settles elastically.
          const wobble = Math.random() * 0.8 - 0.4;
          turn.to(
            sheet,
            { rotateZ: wobble, duration: 0.05, ease: "power2.out" },
            at + 0.8,
          );
          turn.to(
            sheet,
            { rotateZ: 0, duration: 0.15, ease: "elastic.out(1, 0.35)" },
            at + 0.85,
          );

          if (shade) {
            // Peak when the sheet is nearly edge-on, after the finger-lift.
            turn.to(shade, { opacity: 0.35, duration: 0.575 }, at);
            turn.to(shade, { opacity: 0, duration: 0.425 }, at + 0.575);
          }

          if (edge) {
            turn.fromTo(
              edge,
              { opacity: 0, skewY: 0 },
              { opacity: 1, skewY: -3, duration: 0.5, repeat: 1, yoyo: true },
              at,
            );
          }

          if (highlight) {
            turn.fromTo(
              highlight,
              { xPercent: 0 },
              {
                xPercent: 520,
                duration: 0.65,
                ease: "power1.inOut",
                immediateRender: false,
              },
              at + 0.25,
            );
            turn.fromTo(
              highlight,
              { opacity: 0 },
              { opacity: 0.85, duration: 0.3, immediateRender: false },
              at + 0.275,
            );
            turn.to(highlight, { opacity: 0, duration: 0.3 }, at + 0.575);
          }

          if (underShadow) {
            turn.fromTo(
              underShadow,
              { xPercent: 0, opacity: 0.4 },
              { xPercent: -30, opacity: 0, duration: 1, immediateRender: false },
              at,
            );
          }

          if (floorShadow) {
            turn.to(
              floorShadow,
              { scaleX: 0.35, opacity: 0.12, duration: 0.45 },
              at + 0.15,
            );
            turn.to(
              floorShadow,
              { scaleX: 1, opacity: 0.25, duration: 0.4, ease: "power2.out" },
              at + 0.6,
            );
          }

          // Once the sheet is all but edge-on, it is spent. Explicit restore
          // points keep the state correct when scrubbing backwards.
          turn.set(sheet, { autoAlpha: 1, pointerEvents: "auto" }, at);
          turn.set(sheet, { autoAlpha: 0, pointerEvents: "none" }, at + 0.99);
        }

        triggerRef.current = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          pinSpacing: false,
          scrub: 1,
          snap: {
            snapTo: 1 / (count - 1),
            duration: 0.5,
            ease: "power2.inOut",
          },
          animation: turn,
          invalidateOnRefresh: true,
          onUpdate: (self) => setCurrent(self.progress),
        });

        setCurrent(triggerRef.current.progress);

        return () => {
          inkEls.forEach((el) => el.classList.remove("paper-ink-smear"));
        };
      });

      // Reduced motion: no 3D, no curl, no shade — a short crossfade only.
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(sheets, { autoAlpha: 1, pointerEvents: "auto" });
        gsap.set(sheets.slice(1), { autoAlpha: 0 });

        const fade = gsap.timeline({ defaults: { ease: "none" } });
        for (let i = 0; i < count - 1; i += 1) {
          const at = i;
          fade.to(sheets[i], { autoAlpha: 0, duration: 0.3 }, at);
          fade.to(sheets[i + 1], { autoAlpha: 1, duration: 0.3 }, at);
        }

        triggerRef.current = ScrollTrigger.create({
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          pinSpacing: false,
          scrub: 1,
          snap: {
            snapTo: 1 / (count - 1),
            duration: 0.5,
            ease: "power2.inOut",
          },
          animation: fade,
          invalidateOnRefresh: true,
          onUpdate: (self) => setCurrent(self.progress),
        });

        setCurrent(triggerRef.current.progress);
      });
    }, track);

    return () => {
      media?.revert();
      context?.revert();
      triggerRef.current = null;
    };
  }, [onCurrentPageChange, pageCount, stageRef, trackRef]);

  const goToPage = useCallback(
    (index: number) => {
      const trigger = triggerRef.current;
      if (!trigger || pageCount < 2) return;

      const target = Math.min(pageCount - 1, Math.max(0, index));
      const top =
        trigger.start +
        (trigger.end - trigger.start) * (target / (pageCount - 1));
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [pageCount],
  );

  return { goToPage };
}
