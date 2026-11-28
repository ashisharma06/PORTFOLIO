# AGENTS.md

PROJECT: Personal portfolio for Ashish Sharma, a CSE (Data Science) student and frontend developer in Bengaluru.

STACK: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP. No other UI libraries unless I ask.

DESIGN CONCEPT "The Dispatch": the site looks like a printed zine / newspaper front page.

- Palette: paper #F2ECE0, ink #111111, signal orange #FF4A1C, faded grey-brown #8A8173 for secondary text. No gradients, no glassmorphism, no purple.
- Fonts via next/font: Fraunces (display serif, heavy weights, tight tracking) and JetBrains Mono (labels, metadata, numbers).

LAYOUT CONCEPT "The Dispatch, Long-Scroll Edition":
- The site is one continuous scrolling newspaper edition, not a pinned stage or a set of full-viewport pages.
- Section order: masthead + hero, wins ticker and stories, project clippings, toolkit and education, contact, footer.
- A sticky section index stays available while reading and includes a thin scroll-progress bar. It links to #top, #wins, #work, #toolkit and #contact, and it must not cover section headings on any screen size.
- The hero is the front-page lead. Projects are individual paper clippings in one Work section; the Wins ticker, toolkit/classifieds and contact rows keep the same print vocabulary.
- Framer Motion is preferred for in-page reveals and micro-interactions. GSAP is used selectively for scroll-driven detail; heavy below-the-fold sections mount as they approach the viewport.
- prefers-reduced-motion: disable marquees, parallax, counters and non-essential transitions. All content stays visible and readable without motion.
- Test at 360x640, 768x1024 and 1440x900. Use fluid type and spacing, avoid horizontal overflow, keep contrast at WCAG AA or better, and preserve visible focus states.

RULES:

- Use only facts from content/data.ts. Never invent metrics, employers, or links.
- Server components by default, "use client" only where needed.
- Mobile-first, fully responsive, WCAG AA contrast, semantic HTML, visible focus states.
- Keep components small and in /components. Run `npm run lint` and `npm run build` after each step and fix errors.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
