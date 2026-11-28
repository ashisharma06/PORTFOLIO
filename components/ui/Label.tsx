import type { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
};

export function Label({ children, className = "" }: LabelProps) {
  return (
    <span
      className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink ${className}`}
    >
      {children}
    </span>
  );
}
