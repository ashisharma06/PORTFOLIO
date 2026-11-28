"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "dispatch-intro-seen";

function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Storage may be blocked; treat as unseen.
    return false;
  }
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage may be blocked; the intro still plays once this load.
  }
}

export function Intro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // MatchMedia may be unavailable; the CSS fallback still ends the intro.
    }

    if (hasSeenIntro() || reduced) {
      markIntroSeen();
      window.setTimeout(() => setVisible(false), 0);
      return;
    }

    markIntroSeen();

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
          className="dispatch-intro fixed inset-0 z-[100] flex items-center justify-center bg-paper"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Skip intro"
            className="absolute right-3 top-3 flex h-11 min-w-11 touch-manipulation items-center justify-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
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
