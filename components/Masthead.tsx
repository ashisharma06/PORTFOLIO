import { MastheadDate } from "@/components/MastheadDate";
import { Label } from "@/components/ui/Label";

export function Masthead() {
  return (
    <div className="pb-2">
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
        <div className="sm:justify-self-start">
          <Label>VOL. 01 / 2026</Label>
        </div>

        <p className="font-display text-4xl font-black leading-[0.9] tracking-tighter text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          THE ASHISH DISPATCH
        </p>

        <div className="sm:justify-self-end">
          <MastheadDate />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-5 border-b-[6px] border-double border-ink"
      />
    </div>
  );
}
