"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Label } from "@/components/ui/Label";

const sections = [
  { id: "top", label: "Front Page" },
  { id: "wins", label: "Wins" },
  { id: "work", label: "Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const masthead = document.getElementById("top");
    if (!masthead) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(masthead);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-1 bg-signal-text"
        style={reduceMotion ? undefined : { scaleX: scrollYProgress, originX: 0 }}
      />

      <div
        className={`fixed inset-x-0 top-0 z-[60] border-b-2 border-ink bg-paper transition-transform duration-200 motion-reduce:transition-none ${
          scrolled
            ? "visible translate-y-0"
            : "max-sm:visible max-sm:translate-y-0 sm:invisible sm:-translate-y-full"
        }`}
      >
        <nav
          aria-label="Sections"
          className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <div className="hidden items-center gap-6 py-3 sm:flex">
            {sections.map(({ id, label }) => (
              <Link
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={`border-b-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink transition-colors motion-reduce:transition-none ${
                  active === id
                    ? "border-signal-text"
                    : "border-transparent hover:border-signal-text"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <Label className="hidden sm:inline">VOL. 01 / 2026</Label>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-index"
            onClick={() => setMenuOpen(true)}
            className="py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink sm:hidden"
          >
            INDEX
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          ref={dialogRef}
          id="site-index"
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
          className="fixed inset-0 z-[80] flex flex-col bg-paper p-4 sm:hidden"
        >
          <div className="flex items-center justify-between border-b-2 border-ink pb-3">
            <Label>SITE INDEX</Label>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                toggleRef.current?.focus();
              }}
              className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink"
            >
              CLOSE
            </button>
          </div>

          <ol className="mt-8 flex flex-col gap-5">
            {sections.map(({ id, label }, index) => (
              <li key={id}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 font-display text-4xl font-black tracking-tight text-ink"
                >
                  <span className="font-mono text-xs">0{index + 1}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
