# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Astro v5 static site, TypeScript strict mode, deployed to GitHub Pages at `franco.international`. Single dependency (Astro); no UI library, no formatter, no test suite.

## Commands

- `npm run dev` — dev server with hot reload
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally (rendering differs from dev)

## Build-time data fetching

`src/pages/index.astro` fetches from three sources at build time:

- `https://garden.franco.international/notes.json` — graceful fallback if unavailable
- `https://api.github.com/users/franco-g-s` — graceful fallback if unavailable
- Strava API — **CI only**; local builds skip gracefully without these secrets:
  - `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN`

## Deployment

Push to `main` → GitHub Actions runs `npm ci && npm run build` → deploys to GitHub Pages. No lint or test step in CI. Direct pushes and PRs are both used depending on change size.

## Photo assets

Photos in `public/photos/` use numeric naming. The landing page references them by index in `src/pages/index.astro` — adding or renaming a photo requires updating that index too.
