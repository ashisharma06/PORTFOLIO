import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Hero } from "@/components/Hero";
import {
  LazyContact,
  LazyProjects,
  LazyToolkit,
  LazyWins,
} from "@/components/LazySections";
import { Masthead } from "@/components/Masthead";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />

      <main id="main" className="pb-16">
        <div id="top" className="scroll-mt-24 pt-20 sm:pt-8">
          <Container>
            <Masthead />
            <div className="mt-10 sm:mt-16">
              <Hero />
            </div>
          </Container>
        </div>

        <Container>
          <Rule label="CONTINUED FROM PAGE 01" className="mt-16 sm:mt-24" />

          <section id="wins" className="scroll-mt-24 py-16 sm:py-24">
            <SectionHeader
              title="Wins & Headlines"
              issue="02"
              className="mb-8 sm:mb-10"
            />
            <LazyWins />
          </section>

          <Rule label="THE WORK DESK" />

          <section id="work" className="scroll-mt-24 py-16 sm:py-24">
            <SectionHeader
              title="Selected Work"
              issue="03"
              className="mb-8 sm:mb-10"
            />
            <LazyProjects />
          </section>

          <Rule label="CLASSIFIEDS & EDUCATION" />

          <section id="toolkit" className="scroll-mt-24 py-16 sm:py-24">
            <SectionHeader
              title="Toolkit & Education"
              issue="04"
              className="mb-8 sm:mb-10"
            />
            <LazyToolkit />
          </section>

          <Rule label="THE NEWSROOM" />

          <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
            <SectionHeader
              title="Contact"
              issue="05"
              className="mb-8 sm:mb-10"
            />
            <LazyContact />
          </section>
        </Container>
      </main>
    </>
  );
}
