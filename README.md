# neerajwadhwani.com

Personal site — React + Vite + Tailwind. Static, no backend.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build locally
npm run lint
```

## Where the content lives

All copy is data, not JSX. To update the site, edit these four files —
you should never need to touch a component to change what it says.

| File | Contains |
|---|---|
| `src/data/profile.js` | Name, headline, about, links, contact, availability |
| `src/data/projects.js` | Case studies — the most important content here |
| `src/data/experience.js` | Roles and highlights |
| `src/data/skills.js` | Toolkit groups |

## Before deploying — checklist

- [x] `profile.links.github` — https://github.com/neeraj43
- [ ] `profile.links` linkedin + leetcode still ship as `'#'`
- [ ] **Push `../prompt-eval` to GitHub** — the Prompt Evaluator card links to
      `github.com/neeraj43/prompt-eval`, which 404s until it exists
- [ ] `public/Neeraj-Wadhwani-Resume.pdf` added
- [x] Headshot added — `public/neeraj-480.jpg` / `neeraj-960.jpg` (falls back to "NW" initials if missing)
- [ ] Replace the scaffold entries in `src/data/projects.js` with real work
- [ ] Fill `metric` in `src/data/experience.js`, or leave blank (blank does not render)
- [ ] Update the canonical + `og:` URLs in `index.html` if the domain differs
- [ ] Add profile URLs to the `sameAs` array in the JSON-LD block in `index.html`
- [ ] Regenerate `public/og.png` if the headline changes (see *Images* below)

## Images

The master headshot is `assets/neeraj-original.png` (not shipped). The two
JPEGs the site actually serves are generated from it:

```bash
sips -Z 960 -s format jpeg -s formatOptions 78 assets/neeraj-original.png --out public/neeraj-960.jpg
sips -Z 480 -s format jpeg -s formatOptions 80 assets/neeraj-original.png --out public/neeraj-480.jpg
```

`public/og.png` (1200×630, the LinkedIn/Slack preview card) is rendered from
`assets/og-template.html` — edit that file, then screenshot it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --hide-scrollbars --window-size=1200,630 \
  --virtual-time-budget=8000 --screenshot=public/og.png \
  "file://$PWD/assets/og-template.html"
```

## The live demo

The Prompt Evaluator card carries an interactive panel. It is deliberately split
in two, and the split is the honest part:

| Half | Where | Runs |
|---|---|---|
| Structural signals + removal patterns | `src/lib/promptCheck.js` | live, on whatever you type |
| Dimension scores and the percentage | `src/data/promptExamples.js` | recorded from the skill, labelled as such |

The weighted percentage needs a model to judge whether a task is actually clear.
No regex does that — so the panel shows a score **only** for the four recorded
sample prompts, and for your own text it shows the mechanical findings plus a
line explaining why there is no number. Faking that percentage would undercut the
one claim the project makes.

`src/lib/promptCheck.js` mirrors `prompt-eval/skill/references/remove.md`. If you
change a removal pattern in one, change it in the other.

## Design system

Colours are CSS custom properties in `src/index.css`, exposed to Tailwind as
semantic names (`bg`, `elev`, `ink`, `muted`, `faint`, `accent`, …). Light and
dark are both first-class; the theme is applied by an inline script in
`index.html` before first paint to avoid a flash.

The palette is sampled from the headshot: `accent` is the navy of the blazer,
`--warm` is the window light behind him, and the greys carry the same slight
warmth as the office wall. If the photo is ever replaced, re-sample rather than
leaving a palette that no longer matches the face at the top of the page.

Every text colour was checked for WCAG AA (4.5:1) against its own surface —
not just in the palette, but as actually composited on the page. Re-check with
`scripts/contrast-audit.js` (paste into the browser console, once per theme)
after any colour change. The dimmest passing pair on the site is 4.65:1.

`faint` is the dimmest legible token — don't add anything below it, and don't
reintroduce raw Tailwind colour classes (`slate-*`, `emerald-*`). `emerald-500`
was the one that slipped through: it reads 2.4:1 on the light page, which is why
there is now an `ok` token with a different value per theme.

Body copy is Inter. JetBrains Mono is for labels, metrics and tech chips only —
never for prose.

## Notes

- Scroll reveals are fail-safe: the hiding styles are scoped to a `js-reveal`
  class that `useReveal` adds only once it can observe. If JS fails, if
  `IntersectionObserver` is missing, or if the visitor prefers reduced motion,
  nothing is hidden. Content is never invisible.
- `prefers-reduced-motion` is honoured globally.
