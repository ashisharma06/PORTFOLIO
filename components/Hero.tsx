"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  achievements,
  education,
  profile,
  projects,
  summary,
} from "@/content/data";
import { Label } from "@/components/ui/Label";
import { Stamp } from "@/components/ui/Stamp";

const headlineLines: { text: string; accent?: boolean }[][] = [
  [{ text: "ASHISH" }],
  [{ text: "SHARMA" }],
  [{ text: "BUILDS THE" }],
  [{ text: "WEB.", accent: true }],
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const stampY = useTransform(scrollYProgress, [0, 0.2], [0, 18]);
  const rootRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLSpanElement>(null);
  const projectsRef = useRef<HTMLSpanElement>(null);
  const podiumsRef = useRef<HTMLSpanElement>(null);

  const rowsMatch = summary.match(/([\d,]+)\+ rows/);
  const rowsNumber = rowsMatch
    ? Number(rowsMatch[1].replace(/,/g, ""))
    : 0;
  const podiumCount = achievements.filter((item) =>
    /Runner-Up|Winner/i.test(item.result),
  ).length;
  const focus = profile.role.match(/CSE \(Data Science\)/)?.[0] ?? "";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.1,
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const counters = [
      { element: rowsRef.current, value: rowsNumber, suffix: "+" },
      { element: projectsRef.current, value: projects.length, suffix: "" },
      { element: podiumsRef.current, value: podiumCount, suffix: "" },
    ].filter(
      (
        counter,
      ): counter is { element: HTMLSpanElement; value: number; suffix: string } =>
        counter.element !== null,
    );

    if (reduceMotion) {
      counters.forEach(({ element, value, suffix }) => {
        element.textContent = `${formatNumber(value)}${suffix}`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          const counter = counters.find((item) => item.element === element);
          if (!counter) return;

          const state = { value: 0 };
          gsap.to(state, {
            value: counter.value,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              element.textContent = `${formatNumber(Math.round(state.value))}${counter.suffix}`;
            },
            onComplete: () => {
              element.textContent = `${formatNumber(counter.value)}${counter.suffix}`;
            },
          });

          observer.unobserve(element);
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [rowsNumber, podiumCount]);

  return (
    <div
      ref={rootRef}
      style={{ containerType: "inline-size" }}
      className="w-full"
    >
      <h1
        aria-label="Ashish Sharma builds the web."
        style={{ fontSize: "clamp(2.25rem, 14.8cqw, 10.5rem)" }}
        className="block w-full font-display font-black leading-[0.9] tracking-[-0.02em] text-ink"
      >
        <span aria-hidden="true" className="block w-full">
          {headlineLines.map((line, lineIndex) => (
            <span
              key={lineIndex}
              className="block w-full overflow-hidden whitespace-nowrap pb-[0.12em] pr-[0.08em] -mb-[0.12em] -mr-[0.08em]"
            >
              <span className="hero-line block w-max whitespace-nowrap">
                {line.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={word.accent ? "text-signal-text" : undefined}
                  >
                    {word.text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
      </h1>

      <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-10 sm:mt-10">
        <div className="col-span-12 md:col-span-5">
          <Label className="mb-3 block">THE LEAD</Label>
          <p className="max-w-prose font-display text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-2 first-letter:font-black first-letter:text-6xl first-letter:leading-[0.75] sm:text-xl">
            {summary}
          </p>
        </div>

        <div className="col-span-12 border-2 border-ink p-4 md:col-span-4">
          <Label className="mb-4 block">BY THE NUMBERS</Label>
          <dl className="grid gap-4">
            <div className="border-t-2 border-ink pt-3 first:border-t-0 first:pt-0">
              <dt className="font-mono text-2xl text-ink">
                <span ref={rowsRef}>0+</span>
              </dt>
              <dd className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink">
                rows rendered smoothly
              </dd>
            </div>
            <div className="border-t-2 border-ink pt-3">
              <dt className="font-mono text-2xl text-ink">
                <span ref={projectsRef}>0</span>
              </dt>
              <dd className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink">
                projects shipped
              </dd>
            </div>
            <div className="border-t-2 border-ink pt-3">
              <dt className="font-mono text-2xl text-ink">
                <span ref={podiumsRef}>0</span>
              </dt>
              <dd className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink">
                hackathon podiums
              </dd>
            </div>
          </dl>
        </div>

        <div className="col-span-12 md:col-span-3">
          <Label className="mb-4 block">DISPATCH NOTE</Label>
          <motion.div
            className="px-1 py-2"
            style={reduceMotion ? undefined : { y: stampY }}
          >
            <Stamp
              rotate={-5}
              style={{ fontSize: "clamp(0.62rem, 1.1cqw, 0.7rem)" }}
            >
              RUNNER-UP, AI VERSE 2026
            </Stamp>
          </motion.div>
          <p className="mt-6 font-mono text-xs leading-relaxed text-ink">
            Currently: {focus}, {education[0]?.institution}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#work"
          className="border-2 border-ink bg-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_0_#111111]"
        >
          View work
        </a>
        <a
          href="#contact"
          className="border-2 border-ink bg-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_0_#111111]"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
