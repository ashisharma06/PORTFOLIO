import type { CSSProperties, ReactNode } from "react";

type StampProps = {
  children: ReactNode;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

export function Stamp({
  children,
  rotate = -4,
  className = "",
  style,
}: StampProps) {
  return (
    <span
      className={`inline-block border-2 border-signal-text bg-paper px-3 py-1 font-mono font-bold uppercase tracking-[0.14em] text-ink opacity-90 ${className}`}
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
