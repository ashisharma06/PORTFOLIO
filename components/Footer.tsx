import { profile } from "@/content/data";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-ink pt-10 pb-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.12em] text-ink sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © 2026 {profile.name} · Set in Fraunces &amp; JetBrains Mono · Printed
          on Vercel
        </p>
        <a
          href="#top"
          className="self-start border-b-2 border-ink hover:border-signal-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
