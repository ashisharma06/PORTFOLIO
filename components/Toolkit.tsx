"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education, skills } from "@/content/data";
import { Label } from "@/components/ui/Label";

export function Toolkit() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.from(".toolkit-box", {
        y: 32,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <section aria-label="Skills" className="lg:col-span-7">
        <Label className="mb-4 block">
          CLASSIFIEDS / SKILLS
        </Label>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="toolkit-box border-2 border-ink bg-paper p-4"
            >
              <h3 className="border-b-2 border-ink pb-2 font-mono text-xs uppercase tracking-[0.12em] text-ink">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="inline-block border border-ink px-2 py-1 font-mono text-[0.7rem] text-ink transition-colors hover:bg-ink hover:text-paper motion-reduce:transition-none">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Education" className="lg:col-span-5">
        <Label className="mb-4 block">
          EDUCATION
        </Label>
        <div className="toolkit-box border-2 border-ink bg-paper p-5 sm:p-6">
          <ol className="divide-y-2 divide-ink">
            {education.map((entry) => (
              <li key={entry.institution} className="py-5 first:pt-0 last:pb-0">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink">
                  {entry.period} · {entry.location}
                </p>
                <h3 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-ink">
                  {entry.institution}
                </h3>
                <p className="mt-2 font-display text-base italic text-ink">
                  {entry.qualification}
                </p>
                {entry.score && (
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink">
                    {entry.score}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
