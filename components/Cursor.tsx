"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.25 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduced.matches);

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target;
      setActive(
        target instanceof Element &&
          Boolean(target.closest("[data-cursor-label='VIEW']")),
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: springX, y: springY }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          active
            ? "flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-paper"
            : "h-3 w-3 rounded-full bg-ink"
        }`}
      >
        {active && (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink">
            VIEW
          </span>
        )}
      </div>
    </motion.div>
  );
}
