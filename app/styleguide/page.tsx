import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stamp } from "@/components/ui/Stamp";

const swatches = [
  { name: "Paper", hex: "#F2ECE0", className: "border-ink bg-paper text-ink" },
  { name: "Ink", hex: "#111111", className: "border-ink bg-ink text-paper" },
  { name: "Signal", hex: "#FF4A1C", className: "border-ink bg-signal text-ink" },
  { name: "Muted", hex: "#6F675B", className: "border-ink bg-muted text-ink" },
];

export const metadata: Metadata = {
  title: "Styleguide | The Ashish Dispatch",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return (
    <main id="main" className="py-10 sm:py-16">
      <Container>
        <div className="mb-6 flex flex-wrap items-center gap-6">
          <Stamp>STYLE GUIDE</Stamp>
          <Label>VOL. 01 / ISSUE 2026</Label>
        </div>

        <h1 className="font-display text-5xl font-black leading-none tracking-tight text-ink sm:text-7xl">
          The Dispatch
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-sm text-ink">
          Temporary component specimen sheet for design review.
        </p>

        <Rule className="my-10" />

        <section className="mb-12">
          <SectionHeader title="Colour" issue="01" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {swatches.map((swatch) => (
              <div
                key={swatch.name}
                className={`border-2 p-4 ${swatch.className}`}
              >
                <p className="font-display text-lg font-bold">{swatch.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide">
                  {swatch.hex}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 font-display text-2xl text-muted">
            Muted is reserved for large secondary text.
          </p>
        </section>

        <Rule label="SPECIMEN" className="my-10" />

        <section className="mb-12">
          <SectionHeader title="Type" issue="02" />
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <Label className="mb-3 block">DISPLAY / FRAUNCES</Label>
              <p className="font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                A printed page, rebuilt for the browser.
              </p>
            </div>
            <div>
              <Label className="mb-3 block">MONO / JETBRAINS MONO</Label>
              <p className="font-mono text-base">
                VOL. 01 / ISSUE 2026 — BENGALURU
              </p>
              <p className="mt-2 font-mono text-sm">§ 02 / SECTION MARKER</p>
            </div>
          </div>
        </section>

        <Rule label="COMPONENTS" className="my-10" />

        <section className="mb-12">
          <SectionHeader title="Components" issue="03" />
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <Label className="mb-3 block">LABEL</Label>
              <div className="flex flex-wrap items-center gap-4">
                <Label>FRONTEND DEVELOPER</Label>
                <Label>DATA SCIENCE</Label>
              </div>
            </div>
            <div>
              <Label className="mb-3 block">STAMP</Label>
              <div className="flex flex-wrap items-center gap-6 py-2">
                <Stamp>APPROVED</Stamp>
                <Stamp rotate={3}>IN PRINT</Stamp>
                <Stamp rotate={-7}>FILED 2026</Stamp>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Label className="mb-3 block">RULE / WITH LABEL</Label>
            <Rule label="CONTINUED ON PAGE 02" />
          </div>
        </section>

        <Rule className="my-10" />

        <section>
          <SectionHeader title="Container" issue="04" />
          <Container className="mt-6 border-2 border-dashed border-ink bg-paper p-4">
            <Label className="block text-center">
              MAX-W 1200PX / RESPONSIVE PADDING
            </Label>
          </Container>
        </section>
      </Container>
    </main>
  );
}
