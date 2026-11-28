# The Ashish Dispatch

A newspaper/zine-style personal portfolio for Ashish Sharma, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Requirements

- Node.js **20.9+** (Next.js 16 requirement)
- npm

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page reloads as you edit files.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the development server on port 3000. |
| `npm run build` | Creates the optimized production build. |
| `npm run start` | Serves the production build. Run `npm run build` first. |
| `npm run lint` | Runs ESLint across the project. |

For a standalone type check, run `npx tsc --noEmit`.

## Editing content

All portfolio facts live in [`content/data.ts`](content/data.ts). This is the single source of truth—avoid hard-coding new names, metrics, employers, or links into components.

- `profile` — name, role, location, email, GitHub, LinkedIn.
- `summary` — the lead paragraph and the source for the “55,000+ rows” number shown in the hero.
- `achievements` — wins and participation entries shown in the Wins section and ticker.
- `projects` — project cards, including bullets, tech tags, and optional links.
- `education` and `skills` — the Toolkit section.

The exported types at the top of `content/data.ts` describe each shape. If you add a new field, update its type too.

Project links are intentionally hidden while their URL is an empty string. Fill in a URL to make the “Live” or “GitHub” link appear. The remaining placeholders are listed below.

The “Download resume” button points to `/resume.pdf`. Add your PDF at `public/resume.pdf`.

Design tokens (paper, ink, signal, muted) are in [`app/globals.css`](app/globals.css). Components live in [`components/`](components/). The temporary design specimen sheet is available at `/styleguide` and is excluded from search engines.

## Links to fill in

These URLs in `content/data.ts` are empty placeholders:

| Project | Field | Data path | What to add |
| --- | --- | --- | --- |
| Dashify | `live` | `projects[0].links.live` | Live demo URL |
| BlogSeek | `live` | `projects[1].links.live` | Live demo URL |
| DocuMind | `github` | `projects[2].links.github` | GitHub repository URL |
| Commit Story | `live` | `projects[3].links.live` | Live demo URL |
| Commit Story | `github` | `projects[3].links.github` | GitHub repository URL |

Leave any URL empty if you do not want that link to render.

## Deploying to Vercel

1. Push the project to GitHub.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Vercel auto-detects the **Next.js** framework. Keep the default build command (`npm run build`) and output directory; no configuration changes are needed.
4. Click **Deploy**.

**No environment variables are required.** Vercel provides its deployment URL automatically, which is used for canonical URLs, Open Graph metadata, `sitemap.xml`, and `robots.txt`.

If you later connect a custom domain and want canonical/Open Graph URLs to use that exact domain instead of the deployment URL, you can optionally set `NEXT_PUBLIC_SITE_URL` to the domain origin. A basic deploy does not need it.

## License

Private portfolio project.
