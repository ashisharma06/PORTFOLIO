"use client";

import { createContext, useContext } from "react";

export type PaperContextValue = {
  currentPage: number;
  pageCount: number;
  goToPage: (index: number) => void;
};

const PaperContext = createContext<PaperContextValue>({
  currentPage: 0,
  pageCount: 0,
  goToPage: () => {},
});

export function PaperProvider({
  value,
  children,
}: {
  value: PaperContextValue;
  children: React.ReactNode;
}) {
  return <PaperContext.Provider value={value}>{children}</PaperContext.Provider>;
}

export function usePaper() {
  return useContext(PaperContext);
}
