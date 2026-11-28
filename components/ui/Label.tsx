import type { CSSProperties, ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Label({ children, className = "", style }: LabelProps) {
  return (
    <span
      style={style}
      className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink ${className}`}
    >
      {children}
    </span>
  );
}
