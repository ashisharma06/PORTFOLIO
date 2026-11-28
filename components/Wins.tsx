"use client";

import { motion, useReducedMotion } from "framer-motion";
import { achievements, type Achievement } from "@/content/data";
import { Label } from "@/components/ui/Label";
import { Stamp } from "@/components/ui/Stamp";

function placement(result: string): string {
  if (/Runner-Up/i.test(result)) return "RUNNER-UP";

  const prize = result.match(/\d(?:st|nd|rd|th) Prize/i);
  if (prize) return prize[0].toUpperCase();

  return result.toUpperCase();
}

function isPodium(item: Achievement): boolean {
  return /Runner-Up|Winner/i.test(item.result);
}

function tickerText(item: Achievement): string {
  return `${placement(item.result)} · ${item.title.toUpperCase()} · ${item.date.toUpperCase()}`;
}

export function Wins() {
  const reduceMotion = useReducedMotion();
  const podiums = achievements.filter(isPodium);
  const participation = achievements.filter((item) => !isPodium(item));

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: "easeOut" as const },
  };

  const renderStory = (item: Achievement, featured: boolean) => (
    <motion.article
      key={item.title}
      {...reveal}
      className={`border-2 border-ink bg-paper ${
        featured ? "p-6 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      <Label className="mb-4 block">{item.date.toUpperCase()}</Label>

      <h3
        className={`font-display font-black leading-[1.05] tracking-tight text-ink ${
          featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {item.title}
      </h3>

      {item.description && (
        <p className="mt-4 max-w-prose font-display text-base leading-relaxed text-ink">
          {item.description}
        </p>
      )}

      <div className="mt-6">
        <Stamp rotate={featured ? -4 : 3}>{placement(item.result)}</Stamp>
      </div>
    </motion.article>
  );

  return (
    <div>
      <div className="ticker w-full overflow-hidden border-y-2 border-ink bg-ink py-3">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="ticker-group"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {achievements.map((item) => (
                <span
                  key={`${copy}-${item.title}`}
                  className="flex items-center gap-4 whitespace-nowrap pl-4 font-mono text-xs uppercase tracking-[0.12em] text-paper"
                >
                  {tickerText(item)}
                  <span aria-hidden="true" className="text-signal">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {podiums.map((item) => renderStory(item, true))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {participation.map((item) => renderStory(item, false))}
      </div>
    </div>
  );
}
