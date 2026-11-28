"use client";

import type { ReactNode } from "react";
import { usePaper } from "./PaperContext";

export function Sheet({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { currentPage, pageCount } = usePaper();
  const isCurrent = currentPage === index;

  return (
    <article
      data-paper-sheet=""
      data-index={index}
      data-current={isCurrent ? "true" : "false"}
      aria-label={`Page ${index + 1} of ${pageCount}`}
      inert={!isCurrent}
      className="paper-sheet"
      style={{ zIndex: pageCount - index }}
    >
      <div className="paper-front">
        <div data-paper-ink="" className="paper-ink">
          {children}
        </div>
        <div className="paper-crease" aria-hidden="true" />
        <div
          data-paper-highlight=""
          className="paper-highlight"
          aria-hidden="true"
        />
        <div data-paper-shade="" className="paper-shade" aria-hidden="true" />
        <div
          data-paper-under-shadow=""
          className="paper-under-shadow"
          aria-hidden="true"
        />
      </div>

      <div className="paper-back" aria-hidden="true">
        <div className="paper-back-rules" />
        <div data-paper-ink="" className="paper-back-ink">
          {children}
        </div>
        <div className="paper-crease" aria-hidden="true" />
      </div>

      <div
        data-paper-edge=""
        className="paper-edge"
        aria-hidden="true"
      />
    </article>
  );
}
