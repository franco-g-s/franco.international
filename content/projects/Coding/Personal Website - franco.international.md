---
title: Personal Website
created: '2026-02-06'
tags:
  - project
status: in progress
url:
  - 'https://github.com/franco-g-s/franco.international'
  - 'https://quartz.jzhao.xyz/'
  - 'https://stephango.com/vault'
  - 'https://ewan.my'
---
## Project Overview
A self-hosted personal website at **franco.international** that publishes selected content from my private Obsidian vault to the web. The website will showcase my CV, class notes, projects, book reviews, and other public-facing content while keeping my private vault completely separate and secure.

## Inspiration
Heavily inspired by:
- **Steph Ango's approach**: Separate vault for website with different structure than private vault
- **ewan.my**: Digital garden built with Quartz, featuring interconnected notes and graph view
- **Quartz static site generator**: Purpose-built for publishing Obsidian vaults as static websites

### Two-Vault System
- **Private Vault** (this vault): Stays private on iCloud + GitHub private repo, unchanged structure
- **Public Website Vault**: Separate Quartz project at `/Users/franco/franco.international`, public GitHub repo

### Publishing Workflow
1. Add `publish: true` property to notes in private vault that should be published
2. Publishing script filters notes by property and copies to public website repo
3. Optional `web-*` properties allow different titles/organization on website
4. GitHub Pages or Netlify auto-deploys on push
5. Live at franco.international with custom domain

### Content to Publish
- CV and about page
- Selected ETH class notes (post-processed atomic notes, not raw class notes)
- Public project notes (coding, research)
- Book notes and reviews
- Selected media notes (movies, etc.)
- Public research notes

## Technology Stack
- **Static Site Generator**: Quartz v4 (built for Obsidian)
- **Hosting**: GitHub Pages (free tier with custom domain)
- **Domain**: franco.international (purchased)
- **Version Control**: GitHub public repo
- **Build**: Automatic deployment via GitHub Actions
- **Features**: Wikilinks, backlinks, graph view, search, responsive design

## Website Structure
The public website will have a different structure than my private vault, optimized for web navigation:
```
content/
  about/
    - cv.md
    - index.md
  projects/
    - coding/
    - research/
  notes/
    - machine-learning/
    - control-systems/
    - [other topics]
  books/
    - reviews/
    - notes/
  media/
```

### Phase 1: Setup ✅
- [x] Install Quartz locally
- [x] Initialize empty Quartz project at `/Users/franco/franco.international`
- [x] Create public GitHub repository
- [x] Purchase franco.international domain
- [x] Document project in private vault
- [x] Update CLAUDE.md with publishing workflow

### Phase 2: Website Design ✅
- [x] Design website structure and navigation
- [x] Configure Quartz (quartz.config.ts - Cupertino theme, fonts, colors)
- [x] Customize appearance and theme
  - [x] Cupertino-inspired theme with SF Pro-like fonts (Inter)
  - [x] Custom blue accent color RGB(50, 130, 247)
  - [x] Floating controls island (bottom-left) with dark mode + reader mode toggles
  - [x] Scroll buttons (bottom-right) for top/bottom navigation
  - [x] Reader mode with persistent state and smooth fade transitions
  - [x] Disabled Explorer desktop collapse, kept TOC collapse
  - [x] Conditional graph view (full on homepage, local on other pages)
- [x] Create initial content (about page, CV, projects overview, ETH section)
- [x] Test local build and preview

### Phase 3: Publishing Automation (In Progress)
- [x] Define `publish` property system in private vault
- [x] Design routing rules (tag/area-based auto-routing + explicit `web-path`)
- [x] Create `scripts/publish.mjs` in website repo
- [x] Handle metadata transformation (strip private properties, apply `web-title`)
- [x] Handle `.base` embed removal and orphaned heading cleanup
- [x] Handle `` stripping for inline redactions
- [x] Handle attachment copying
- [x] Manifest-based change detection and orphan cleanup
- [x] `web-path` writeback to source notes
- [x] Dry-run report (default mode)
- [x] Execute mode with preview + push workflow
- [ ] Test publishing workflow with diverse notes
- [ ] Document publishing process

### Phase 4: Deployment (In Progress)
- [x] Configure GitHub Pages
- [x] Set up custom domain (franco.international)
- [x] Configure SSL certificate (automatic via GitHub Pages)
- [x] Set up analytics (Cloudflare configured in quartz.config.ts)
- [ ] Test deployment pipeline
- [ ] Verify all links and navigation work

### Phase 5: Content Population (In Progress)
- [x] Publish CV and about page
- [ ] Select and publish class notes
- [ ] Publish project notes
- [ ] Publish book reviews
- [ ] Add navigation and index pages

### Phase 6: Maintenance & Iteration
- [ ] Set up automated publishing workflow (cron job or GitHub Action)
- [ ] Create documentation for future updates
- [ ] Iterate on design based on usage
- [ ] Expand content over time

### Changes to be made
- don't show the note's tag on the website
- update the whole project note with the current state of the whole project and all the project info and structure and functions
- use the created date property from the personal vault as the date the note was created in the website, but then also include when the note was last updated in the website as well. 
- the original light/dark mode toggle still appears in it's default place (next to the search bar) when viewing the index note for folders. (it should only appear in the floating island with the reader mode button). 

### Why Not Self-Host on Raspberry Pi?
- **Free hosting wins**: GitHub Pages is free, zero maintenance, better uptime
- **No hassle**: No dealing with ISP restrictions, port forwarding, SSL certificates, security patches
- **Global CDN**: Faster for international visitors
- **Cost**: $0 vs $100+ upfront + $50-80/year ongoing
- **Raspberry Pi**: Saved for future projects (home automation, media server, etc.)

### Why Separate Vaults?
- Keeps private vault structure unchanged (no "Public/" folder cluttering things)
- Website can have completely different organization optimized for web navigation
- Zero risk of accidentally exposing private notes
- Different audiences: personal vault for me, website for public
- Follows Steph Ango's proven approach

### Why Property-Based Publishing?
- Fits existing vault's extensive property system
- Granular control over what gets published
- Can customize titles/categorization for web (`web-*` properties)
- No folder structure disruption
- Easy to automate with script

### How It Works
The publishing script lives at `franco.international/scripts/publish.mjs`. It scans the private vault for notes with `publish: true`, transforms them (strips private properties, removes `.base` embeds, strips ``), and copies them to the website's `content/` directory.

### Properties
- `publish: true` — Required. Marks note for publication
- `web-path` — Optional. Explicit destination folder (e.g., `about`, `projects/coding`). Auto-populated on first publish if absent
- `web-title` — Optional. Different title on website (becomes `title` in published frontmatter)

### Routing Rules (first match wins)
1. Explicit `web-path` property → use literally
2. File in `ETH/` → mirror folder structure under `eth/`
3. Tag `books` or area `[[Books]]` → `books/`
4. Tag `movies` or area `[[Movies]]` → `media/`
5. Tag `project`/`business` or area `[[Projects]]` → `projects/`
6. Tag `clippings` → `notes/`
7. Fallback → `notes/`

### Commands
```bash
node scripts/publish.mjs                  # Dry-run (default)
node scripts/publish.mjs --execute        # Publish + commit + preview + push
node scripts/publish.mjs --clean          # Remove all script-created files
node scripts/publish.mjs --verify         # Check published files match source
```

### Safety
- Dry-run by default — must pass `--execute` to write anything
- Manifest tracking — only touches files the script created
- Preview before push — local Quartz server + auto-opens browser for review
- Private properties always stripped (`people`, `collections`, `expenses`, etc.)
- `` blocks always stripped
- Broken wikilinks render as plain text on website (Quartz-side config)

## Future Enhancements
- Add blog/essays section
- Integrate search analytics to see what people look for
- Add newsletter/RSS feed for updates
- Consider adding comments (via GitHub Discussions or similar)
- Explore interactive elements (executable code blocks like ewan.my)
- Add more dynamic content (trip maps, book ratings visualizations, etc.)

## Related Notes
- [[Obsidian Rules]] - Core principles for vault organization
- [[Scripts]] - Automation workflows 
- [[Automation]] - Vault automation strategies
