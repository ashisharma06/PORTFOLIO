# AGENTS.md

PROJECT: Personal portfolio for Ashish Sharma, a CSE (Data Science) student and frontend developer in Bengaluru.

STACK: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP. No other UI libraries unless I ask.

DESIGN CONCEPT "The Dispatch": the site looks like a printed zine / newspaper front page.

- Palette: paper #F2ECE0, ink #111111, signal orange #FF4A1C, faded grey-brown #8A8173 for secondary text. No gradients, no glassmorphism, no purple.
- Fonts via next/font: Fraunces (display serif, heavy weights, tight tracking) and JetBrains Mono (labels, metadata, numbers).

LAYOUT CONCEPT "The Dispatch, Page-Turn Edition":
- The site is NOT a long scrolling page. It is a stack of 8 full-viewport newspaper pages inside one fixed stage. Native scrolling only drives a pinned animation timeline; the pages turn like real newsprint.
- Page order: 1 Front Page (masthead + hero), 2 Wins, 3 Dashify, 4 BlogSeek, 5 DocuMind, 6 Commit Story, 7 Toolkit and Education, 8 Contact.
- Every page's content must fit inside 100dvh with no internal scrolling at 360x640, 768x1024 and 1440x900. Use clamp() typography and container-relative sizing to achieve this.
- Page-turn engine uses GSAP ScrollTrigger (scrub + pin) and CSS 3D transforms. Framer Motion is used only for in-page micro-interactions.
- Content animations on a page start when that page becomes the current page, not on generic scroll visibility.
- prefers-reduced-motion: replace the 3D turn with a simple crossfade and disable parallax and tilt.
- Performance: animate only transform and opacity, use will-change sparingly, target 60fps, keep heavy pages' effects paused when they are not current.

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
