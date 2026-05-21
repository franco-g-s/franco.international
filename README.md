# franco.international

Personal hub — the main face of my web presence. An Astro static site with a floating-photos landing screen and three scroll sections linking out to the garden, CV, and socials.

🌐 **Live site:** [franco.international](https://franco.international)

Part of a three-site personal web presence:
- **[franco.international](https://franco.international)** — this hub
- [garden.franco.international](https://garden.franco.international) — digital garden
- [cv.franco.international](https://cv.franco.international) — CV

## Design

**Landing screen:** Pure white background. "Franco Gómez Schumacher" centered in large Inter 200-weight text. Personal photos scattered around the name, each bobbing gently with overlapping sine waves (harbor-bobbing animation). The name is completely stationary.

**Scroll sections:**
- **Digital Garden** — 5 most recent notes with previews, pulled from the garden's JSON feed at build time
- **CV** — 4 highlight cards (location, upcoming, current role, languages), each expanding in a lightbox with more detail
- **Elsewhere** — social links with handles and descriptions: Instagram, YouTube, Strava, LinkedIn, GitHub

**Lightbox:** Clicking any floating element opens a frosted-glass overlay. Cards expand to show more detail; photos go full-screen. Close with Escape or clicking the backdrop.

**Speed control:** Minimal slider fixed to the bottom-right — drag to tune bob amplitude from 0–220%.

## Tech Stack

- **Framework:** [Astro](https://astro.build) (static output)
- **Hosting:** GitHub Pages
- **Domain:** franco.international
- **Fonts:** Inter (rsms.me CDN)
- **Animation:** `requestAnimationFrame` + layered sine waves — no physics engine

## Animation

Each floating element has independent randomized parameters:
- Two overlapping sine waves per axis (X and Y) — organic, non-repetitive motion
- Gentle rotation oscillation (±3.5°)
- Proximity pull toward cursor within 180px radius
- Amplitude damps to 25% while scrolling, lerps back smoothly afterward

Anchors (name + section labels) are completely stationary at `z-index: 10`.

## Build-time Data

`src/pages/index.astro` fetches at build time:
- `https://garden.franco.international/notes.json` — 5 most recent garden notes
- `https://api.github.com/users/franco-g-s` — GitHub profile (avatar, bio, repo count)

## Local Development

```bash
npm install
npm run dev    # dev server with hot reload
npm run build  # production build → dist/
```

## Contact

- **Email:** franco@goxcoworld.com
- **GitHub:** [@franco-g-s](https://github.com/franco-g-s)
