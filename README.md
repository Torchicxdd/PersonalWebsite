# davidparker.io

Personal website built with [Eleventy](https://www.11ty.dev/) (plain HTML/CSS, no framework).

## Commands

- `npm install` — install dependencies
- `npm run dev` — local dev server with hot reload
- `npm run build` — build static site to `dist/`

## Editing content

All site content lives in one file: `src/_data/site.json`.
Bio, the "Languages & tools" filter, work experience, and projects are all
driven by this data. Placeholders are marked `TODO:`.

- **Filtering:** the floating tool panel matches chips against a job's
  `tools` and a project's `tags`. Keep those labels identical to the chip
  labels in `toolbox` (e.g. `C#`, `MonoGame`, `Node.js`). If a job/project
  has no tools or tags, it is never dimmed by the filter.
- **Old builds:** Eleventy doesn't clean the output dir, so delete `dist/`
  before building after removing assets.

Styles live in `src/css/style.css` (design tokens in `:root`), behaviour in `src/js/main.js`.

## Deploy

Build outputs plain static files to `dist/` — drop it on any static host
(GitHub Pages, Netlify, Vercel, etc.).