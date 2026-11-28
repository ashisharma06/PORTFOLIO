"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/content/data";
import { Label } from "@/components/ui/Label";

function DashifyMark() {
  const heights = [18, 30, 24, 42, 34, 50];

  return (
    <div
      role="img"
      aria-label="Animated bar chart"
      className="flex h-20 items-end gap-1.5 border-b-2 border-l-2 border-ink px-2 pb-1"
    >
      {heights.map((height, index) => (
        <span
          key={index}
          className="dash-bar block w-3 bg-signal"
          style={{ height: `${height}px`, animationDelay: `${index * 120}ms` }}
        />
      ))}
    </div>
  );
}

function BlogSeekMark() {
  return (
    <div
      role="img"
      aria-label="Three blog sources merging into one list"
      className="flex h-20 items-center gap-2"
    >
      <div className="flex flex-col gap-1">
        {["DEV.TO", "HASHNODE", "HACKER NEWS"].map((source) => (
          <span
            key={source}
            className="border border-ink px-1.5 py-0.5 font-mono text-[0.55rem] uppercase text-ink"
          >
            {source}
          </span>
        ))}
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 40 60"
        className="h-12 w-8 shrink-0"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
      >
        <path d="M2 10 H20 V30 H36" />
        <path d="M2 30 H36" />
        <path d="M2 50 H20 V30" />
        <path d="M31 25 L36 30 L31 35" />
      </svg>
      <div className="border-2 border-ink bg-paper px-2 py-1 font-mono text-[0.6rem] leading-relaxed text-ink">
        01 / 02 / 03
      </div>
    </div>
  );
}

function DocuMindMark() {
  return (
    <svg
      role="img"
      aria-label="PDF sheet with highlighted lines linked to a quote bubble"
      viewBox="0 0 180 72"
      className="h-20 w-full"
      fill="none"
    >
      <rect
        x="2"
        y="4"
        width="66"
        height="64"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <path d="M10 16 H58 M10 26 H50 M10 36 H58 M10 46 H44" stroke="var(--color-ink)" strokeWidth="2" />
      <rect x="8" y="31" width="52" height="10" fill="var(--color-signal)" opacity="0.9" />
      <path d="M68 36 H100" stroke="var(--color-ink)" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M96 32 L101 36 L96 40" stroke="var(--color-ink)" strokeWidth="2" />
      <rect
        x="102"
        y="16"
        width="74"
        height="40"
        fill="var(--color-paper)"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />
      <path d="M108 30 H170 M108 40 H152" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M112 56 L106 64 L122 56" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2" />
    </svg>
  );
}

function CommitStoryMark() {
  const eras = ["ERA 01", "ERA 02", "ERA 03", "ERA 04"];

  return (
    <svg
      role="img"
      aria-label="Commit timeline with four labelled eras"
      viewBox="0 0 180 72"
      className="h-20 w-full"
      fill="none"
    >
      <path d="M8 34 H172" stroke="var(--color-ink)" strokeWidth="2" />
      {eras.map((era, index) => {
        const x = 20 + index * 46;
        return (
          <g key={era}>
            <circle cx={x} cy="34" r="5" fill={index === 1 ? "var(--color-signal)" : "var(--color-paper)"} stroke="var(--color-ink)" strokeWidth="2" />
            <text
              x={x}
              y="56"
              textAnchor="middle"
              className="font-mono"
              fontSize="7"
              fill="var(--color-ink)"
            >
              {era}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Signature({ title }: { title: string }) {
  switch (title) {
    case "Dashify":
      return <DashifyMark />;
    case "BlogSeek":
      return <BlogSeekMark />;
    case "DocuMind":
      return <DocuMindMark />;
    default:
      return <CommitStoryMark />;
  }
}

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
      {projects.map((project, index) => {
        const rotation = index % 2 === 0 ? -1.5 : 1.5;
        const number = String(index + 1).padStart(2, "0");

        return (
          <motion.article
            key={project.title}
            aria-labelledby={`project-${index}`}
            data-cursor-label="VIEW"
            initial={reduceMotion ? false : { rotate: rotation }}
            animate={{
              rotate: rotation,
              y: 0,
              filter: "drop-shadow(6px 6px 0px #111111)",
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    rotate: 0,
                    y: -8,
                    filter: "drop-shadow(12px 12px 0px #FF4A1C)",
                  }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`torn-card cursor-target border-2 border-ink bg-paper-dark p-6 pt-10 ${
              index % 2 === 1 ? "md:mt-12" : ""
            }`}
          >
            <div
              aria-hidden="true"
              className="outline-number font-display text-7xl font-black leading-none sm:text-8xl"
            >
              {number}
            </div>

            <div className="mt-4 border-t-2 border-ink pt-4">
              <Signature title={project.title} />
            </div>

            <h3
              id={`project-${index}`}
              className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl"
            >
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-ink">
              {project.tagline}
            </p>

            <ul className="mt-5 list-disc space-y-1 pl-5 font-display text-sm leading-relaxed text-ink">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="border border-ink px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <Label className="sr-only">Links</Label>
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo for ${project.title}`}
                  className="border-b-2 border-ink font-mono text-xs uppercase tracking-[0.12em] text-ink hover:border-signal-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Live ↗
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View GitHub repository for ${project.title}`}
                  className="border-b-2 border-ink font-mono text-xs uppercase tracking-[0.12em] text-ink hover:border-signal-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
