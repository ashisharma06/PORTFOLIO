"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  const now = new Date();
  const label = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(now)
    .toUpperCase();
  const iso = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  return `${iso}|${label}`;
}

function getServerSnapshot() {
  return null;
}

export function MastheadDate() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [iso, label] = snapshot?.split("|") ?? [];

  return (
    <time
      dateTime={iso}
      className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink"
    >
      {label ?? "\u00a0"}
    </time>
  );
}
