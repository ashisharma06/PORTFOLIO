export function PlaceholderPage({
  number,
  title,
}: {
  number: number;
  title: string;
}) {
  return (
    <div className="flex h-full w-full flex-col border-2 border-ink bg-paper px-[6vw] py-[5vh]">
      <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-3 font-mono text-[clamp(0.6rem,1.4vw,0.85rem)] uppercase tracking-[0.14em] text-ink">
        <span>The Ashish Dispatch</span>
        <span>
          {String(number).padStart(2, "0")} / 08
        </span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <span className="font-display text-[clamp(8rem,42vw,30rem)] font-black leading-[0.8] tracking-[-0.09em] text-ink">
          {number}
        </span>
      </div>

      <div className="border-t-2 border-ink pt-3 text-center font-mono text-[clamp(0.65rem,1.6vw,1rem)] uppercase tracking-[0.2em] text-muted">
        {title}
      </div>
    </div>
  );
}
