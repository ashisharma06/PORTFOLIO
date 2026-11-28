"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

function Skeleton({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`border-2 border-dashed border-ink opacity-30 ${className}`}
    />
  );
}

function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, near };
}

function NearViewport({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const { ref, near } = useNearViewport();

  return (
    <div ref={ref}>
      {near ? children : <Skeleton className={className} />}
    </div>
  );
}

const Wins = dynamic(() => import("@/components/Wins").then((m) => m.Wins), {
  ssr: false,
  loading: () => <Skeleton className="min-h-[28rem]" />,
});

const Projects = dynamic(
  () => import("@/components/Projects").then((m) => m.Projects),
  {
    ssr: false,
    loading: () => <Skeleton className="min-h-[60rem]" />,
  },
);

const Toolkit = dynamic(
  () => import("@/components/Toolkit").then((m) => m.Toolkit),
  {
    ssr: false,
    loading: () => <Skeleton className="min-h-[36rem]" />,
  },
);

const Contact = dynamic(
  () => import("@/components/Contact").then((m) => m.Contact),
  {
    ssr: false,
    loading: () => <Skeleton className="min-h-[38rem]" />,
  },
);

export function LazyWins() {
  return (
    <NearViewport className="min-h-[28rem]">
      <Wins />
    </NearViewport>
  );
}

export function LazyProjects() {
  return (
    <NearViewport className="min-h-[60rem]">
      <Projects />
    </NearViewport>
  );
}

export function LazyToolkit() {
  return (
    <NearViewport className="min-h-[36rem]">
      <Toolkit />
    </NearViewport>
  );
}

export function LazyContact() {
  return (
    <NearViewport className="min-h-[38rem]">
      <Contact />
    </NearViewport>
  );
}
