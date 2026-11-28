"use client";

import { Children, useMemo, useRef, useState, type ReactNode } from "react";
import { PaperProvider } from "./PaperContext";
import { Sheet } from "./Sheet";
import { usePaperTimeline } from "./usePaperTimeline";
import "./paper.css";

export function PaperStage({
  children,
  label = "The Ashish Dispatch",
}: {
  children: ReactNode;
  label?: string;
}) {
  const pages = useMemo(() => Children.toArray(children), [children]);
  const pageCount = pages.length;

  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { goToPage } = usePaperTimeline({
    trackRef,
    stageRef,
    pageCount,
    onCurrentPageChange: setCurrentPage,
  });

  return (
    <PaperProvider value={{ currentPage, pageCount, goToPage }}>
      <main
        id="main"
        ref={trackRef}
        aria-label={label}
        className="paper-track"
        style={{ height: `${pageCount * 100}vh` }}
      >
        <div ref={stageRef} data-paper-stage="" className="paper-stage">
          <div
            data-paper-floor-shadow=""
            className="paper-floor-shadow"
            aria-hidden="true"
          />
          {pages.map((page, index) => (
            <Sheet key={index} index={index}>
              {page}
            </Sheet>
          ))}
          <div className="paper-grain" aria-hidden="true" />
        </div>
      </main>
    </PaperProvider>
  );
}
