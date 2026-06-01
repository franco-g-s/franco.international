---
name: preview
description: Build and preview the production site locally before pushing. Use when verifying a change in the production build — Astro's production output differs from the dev server in optimization and rendering.
---

Run `npm run build && npm run preview` to build the production version and serve it locally.

Check that:
- Pages render correctly (no blank sections, no JS errors in console)
- Images and photos load from `public/photos/`
- Data-fetched sections (GitHub stats, garden notes) either show content or render their fallback states cleanly
- Animations and interactive elements behave as expected

Report what you observed before declaring the change ready to push.
