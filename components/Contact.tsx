"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/data";
import { Label } from "@/components/ui/Label";
import { Stamp } from "@/components/ui/Stamp";

const rows = [
  { label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GITHUB", value: profile.github, href: profile.github },
  { label: "LINKEDIN", value: profile.linkedin, href: profile.linkedin },
];

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — the email remains selectable for manual copying.
    }
  };

  return (
    <div>
      <div className="relative pb-10">
        <h3 className="font-display text-5xl font-black leading-[0.9] tracking-tighter text-ink sm:text-7xl lg:text-8xl">
          HAVE A STORY? LET&apos;S PRINT IT.
        </h3>
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 600 30"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-8 w-full"
          fill="none"
        >
          {reduceMotion ? (
            <path
              d="M4 20 C 120 4, 240 28, 360 12 S 540 24, 596 8"
              stroke="var(--color-signal)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          ) : (
            <motion.path
              d="M4 20 C 120 4, 240 28, 360 12 S 540 24, 596 8"
              stroke="var(--color-signal)"
              strokeWidth="7"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          )}
        </motion.svg>
      </div>

      <ul className="border-t-2 border-ink">
        {rows.map((row, index) => (
          <li key={row.label} className="border-b-2 border-ink">
            <div className="flex items-center gap-3 py-5 sm:gap-6">
              <a
                href={row.href}
                className="group flex min-w-0 flex-1 items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="min-w-0">
                  <Label className="mb-1 block">{row.label}</Label>
                  <span className="block break-all font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">
                    {row.value}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-3xl text-ink transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  ↗
                </span>
              </a>

              {index === 0 && (
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="shrink-0 border-2 border-ink px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
                >
                  Copy
                </button>
              )}
            </div>

            {index === 0 && (
              <div aria-live="polite" className="pb-4">
                {copied && <Stamp rotate={3}>COPIED</Stamp>}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <a
          href="/resume.pdf"
          download
          className="inline-block border-2 border-ink bg-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_0_#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Download resume ↗
        </a>
      </div>
    </div>
  );
}
