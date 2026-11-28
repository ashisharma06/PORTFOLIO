"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Stamp } from "@/components/ui/Stamp";
import type { Project } from "@/content/data";

type ProjectModalProps = {
  project: Project;
  number: string;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

function displayUrl(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

export function ProjectModal({
  project,
  number,
  onClose,
  returnFocusRef,
}: ProjectModalProps) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const returnFocus = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!dialogRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      const target = returnFocus ?? previouslyFocused;
      target?.focus();
    };
  }, [onClose, returnFocusRef]);

  if (typeof document === "undefined") return null;

  const isDeployed = Boolean(project.links.live);
  const primaryUrl = project.links.live ?? project.links.github ?? "";
  const secondaryUrl =
    project.links.live && project.links.github ? project.links.github : null;
  const titleId = `project-modal-title-${number}`;

  const backdropProps = reduceMotion
    ? { initial: false as const }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const cardProps = reduceMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, scale: 0.92, rotate: -4 },
        animate: { opacity: 1, scale: 1, rotate: -1 },
        exit: { opacity: 0, scale: 0.92, rotate: -4 },
      };
  const cardStyle = reduceMotion ? { rotate: -1 } : undefined;

  return createPortal(
    <motion.div
      {...backdropProps}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
      onClick={onClose}
      style={{ backgroundColor: "rgba(17, 17, 17, 0.55)" }}
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto p-4"
    >
      <motion.div
        {...cardProps}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={cardStyle}
        onClick={(event) => event.stopPropagation()}
        className="paper-card-grain relative my-auto max-h-[90vh] w-full max-w-[34rem] overflow-y-auto border-2 border-ink bg-paper p-6 shadow-[8px_8px_0_0_#111111] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink">
            <span>PROJECT · {project.year}</span>
            <span aria-hidden="true">/</span>
            <span>NO. {number}</span>
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-paper font-mono text-sm text-ink shadow-[3px_3px_0_0_#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            ✕
          </button>
        </div>

        <h2
          id={titleId}
          className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl"
        >
          {project.title}
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink">
          {project.tagline}
        </p>

        {!isDeployed && (
          <div className="mt-5">
            <Stamp
              rotate={-3}
              className="max-w-full whitespace-normal break-words text-[0.6rem]"
            >
              NOT DEPLOYED, SOURCE ONLY
            </Stamp>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center border-2 border-ink bg-signal-text px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-[5px_5px_0_0_#111111] transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
          >
            {isDeployed ? "VIEW LIVE PROJECT ↗" : "VIEW ON GITHUB ↗"}
          </a>

          {secondaryUrl && (
            <a
              href={secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 border-b-2 border-ink py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink hover:border-signal-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              GITHUB ↗
            </a>
          )}

          <span className="break-all font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink">
            {displayUrl(primaryUrl)}
          </span>
        </div>

        <div className="mt-8 flex justify-end border-t-2 border-ink pt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 border-b-2 border-ink font-mono text-xs uppercase tracking-[0.12em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
