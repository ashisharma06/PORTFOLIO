import { MastheadDate } from "@/components/MastheadDate";
import { Label } from "@/components/ui/Label";

const labelStyle = { fontSize: "clamp(0.6rem, 1.1cqw, 0.8rem)" } as const;

export function Masthead() {
  return (
    <div
      style={{ containerType: "inline-size" }}
      className="pb-2"
    >
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
        <div className="flex items-center justify-between sm:justify-self-start">
          <Label className="whitespace-nowrap" style={labelStyle}>
            VOL. 01 / 2026
          </Label>
          <div className="sm:hidden">
            <MastheadDate />
          </div>
        </div>

        <p
          style={{ fontSize: "clamp(1.5rem, 5.2cqw, 4rem)" }}
          className="order-2 text-center font-display font-black leading-[0.9] tracking-tighter text-ink sm:order-none sm:whitespace-nowrap"
        >
          THE ASHISH DISPATCH
        </p>

        <div className="hidden justify-self-end sm:block">
          <MastheadDate />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-4 border-b-[6px] border-double border-ink"
      />
    </div>
  );
}
