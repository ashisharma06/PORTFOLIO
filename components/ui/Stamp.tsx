import type { ReactNode } from "react";

type StampProps = {
  children: ReactNode;
  rotate?: number;
  className?: string;
};

export function Stamp({ children, rotate = -4, className = "" }: StampProps) {
  return (
    <span
      className={`inline-block border-2 border-signal-text bg-paper px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink opacity-90 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
