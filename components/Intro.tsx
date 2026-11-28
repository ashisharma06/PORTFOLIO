"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "dispatch-intro-seen";

export function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;

    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage may be blocked; treat as unseen.
    }

    if (seen || reduced) {
      window.setTimeout(() => setVisible(false), 0);
      return;
    }

    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage may be blocked; the intro still plays once this load.
    }

    const timer = window.setTimeout(() => setVisible(false), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Issue intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute right-6 top-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Skip
          </button>
          <div className="text-center">
            <p className="font-display text-6xl font-black tracking-tight text-ink sm:text-8xl">
              VOL. 01
            </p>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink">
              The Ashish Dispatch
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
