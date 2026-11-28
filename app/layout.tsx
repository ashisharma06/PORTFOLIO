import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { JsonLd } from "@/components/JsonLd";
import { summary } from "@/content/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-mono",
  display: "swap",
});

const title = "Ashish Sharma | Frontend Developer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: summary,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: summary,
    url: "/",
    type: "website",
    locale: "en_IN",
    siteName: "The Ashish Dispatch",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: summary,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`
            .dispatch-intro { display: none !important; }
            [data-js-reveal] { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:border-2 focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.12em] focus:text-ink"
        >
          Skip to content
        </a>
        <Intro />
        <Cursor />
        {children}
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
