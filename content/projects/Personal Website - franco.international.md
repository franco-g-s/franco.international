---
created: 2026-02-06T00:00:00.000Z
tags:
  - project
areas:
  - '[[Projects]]'
  - '[[Coding]]'
  - '[[Obsidian]]'
status: in progress
url:
  - 'https://franco.international'
  - 'https://github.com/franco-g-s/franco.international'
  - 'https://quartz.jzhao.xyz/'
  - 'https://stephango.com/vault'
  - 'https://ewan.my'
---
### Notes
<!-- Obsidian Base removed: ![[Notes.base#Project Notes]] -->

### Resources
<!-- Obsidian Base removed: ![[Resources.base#Project Resources]] -->

## Current Status

🎉 **LIVE**: https://franco.international

The website is fully deployed and operational with:
- ✅ Custom domain with HTTPS
- ✅ Automatic GitHub Actions deployment
- ✅ Cloudflare Web Analytics (cookieless, no consent banners)
- ✅ Custom Cupertino-inspired theme
- ✅ Reader mode, dark mode, and responsive design
- 🚧 Publishing automation (in progress)
- 🚧 Content population (in progress)

## Project Overview

My personal website at **franco.international** is a digital garden built with Quartz v4 that publishes selected content from my private Obsidian vault. The site showcases my CV, class notes, projects, book reviews, and public-facing content while keeping my private vault completely separate and secure.

This project represents a complete custom implementation of Quartz with extensive UI/UX customizations, including custom components, persistent state management, and privacy-focused analytics.

## Inspiration

Heavily inspired by:
- **Steph Ango's approach**: Separate vault for website with different structure than private vault
- **ewan.my**: Digital garden built with Quartz, featuring interconnected notes and graph view
- **Quartz static site generator**: Purpose-built for publishing Obsidian vaults as static websites
- **Apple Cupertino design**: Clean, minimal aesthetic with subtle interactions

## Architecture

### Two-Vault System
- **Private Vault** (this vault): Stays private on iCloud + GitHub private repo at `/Users/franco/Library/Mobile Documents/iCloud~md~obsidian/Documents/FGS`
  - Contains 397+ markdown files with personal notes, research, projects
  - Extensive property system for organization
  - Notes marked with `publish: true` are candidates for publication
- **Public Website Vault**: Separate Quartz project at `/Users/franco/franco.international`
  - Public GitHub repo: https://github.com/franco-g-s/franco.international
  - Contains only curated public content
  - Different structure optimized for web navigation
  - Currently 8 markdown files (about, CV, ETH, projects, books, notes, media)

### Publishing Workflow (Planned)

1. **In Private Vault**: Add `publish: true` property to notes that should be published
2. **Publishing Script**: Filters notes by property and copies to public website repo
3. **Metadata Transformation**: Optional `web-*` properties allow different titles/organization on website
4. **Auto-Deploy**: GitHub Actions automatically builds and deploys on push to main branch
5. **Live Site**: Changes appear at https://franco.international within 1-2 minutes

### Current Content Structure

```
content/
├── about/
│   ├── index.md         # Bio and contact information
│   └── cv.md            # Full CV with education, experience, skills
├── eth/
│   └── index.md         # ETH Zürich academic notes section
├── projects/
│   └── index.md         # Projects overview (coding, cycling, research)
├── notes/
│   └── index.md         # General notes and research
├── books/
│   └── index.md         # Book reviews and notes
└── media/
    └── index.md         # Movie reviews and media notes
```

## Technology Stack

### Core Infrastructure
- **Static Site Generator**: Quartz v4.5.2
- **Hosting**: GitHub Pages (free tier)
- **Domain**: franco.international (purchased via Namecheap)
- **DNS**: Namecheap BasicDNS with 4 A records + CNAME for www
- **SSL/HTTPS**: Automatic via GitHub Pages (Let's Encrypt)
- **Version Control**: Git + GitHub public repository

### Build & Deployment
- **CI/CD**: GitHub Actions workflow (`.github/workflows/deploy.yml`)
- **Build Process**: `npx quartz build` → uploads to GitHub Pages
- **Deployment**: Automatic on push to main branch
- **Build Time**: ~2 seconds for 8 files

### Analytics & Monitoring
- **Analytics**: Cloudflare Web Analytics (free, cookieless)
- **Privacy**: No cookies, no consent banners required
- **Compliance**: GDPR/CCPA compliant by design
- **Dashboard**: https://dash.cloudflare.com/ (Web Analytics)

### Design & Styling
- **Theme**: Custom Cupertino-inspired design
- **Fonts**:
  - Headers & Body: Inter (via Google Fonts CDN)
  - Code: JetBrains Mono
- **Colors**:
  - Primary Blue: RGB(50, 130, 247) - matches Apple system blue
  - Light mode: White background, subtle grays
  - Dark mode: True black (#1d1d1f) with high contrast
- **Responsive**: Mobile-first with breakpoints for tablet and desktop

### Custom Components

Created entirely new components for enhanced UX:

1. **FloatingControls** (`quartz/components/FloatingControls.tsx`)
   - Bottom-left floating island containing theme and reader mode toggles
   - Forwards child component CSS and scripts using `concatenateResources`
   - Always visible, even in reader mode
   - Cupertino-style glassmorphism with backdrop blur

2. **ScrollButtons** (`quartz/components/ScrollButtons.tsx`)
   - Bottom-right scroll-to-top and scroll-to-bottom buttons
   - SVG arrow icons with smooth scroll behavior
   - Hover effects with transform and shadow transitions

3. **ReaderMode** (heavily customized)
   - Persistent state across page navigation via localStorage
   - Smooth fade transitions (0.4s fade out, 0.8s fade in)
   - Active state indicator (turns blue when enabled)
   - No hover reveal - sidebars only return when toggled off

### Modified Core Components

1. **Explorer**
   - Disabled desktop title collapse (only mobile hamburger collapses)
   - Hidden collapse toggle icon via CSS
   - Default "link" behavior (clicking folder navigates, not collapses)

2. **TableOfContents**
   - Kept collapse toggle for managing long content lists
   - Allows hiding backlinks when TOC is expanded

3. **Graph**
   - Conditional rendering: full graph on homepage, local graph on other pages
   - Hidden tags in both local and global views

### Configuration Files

- **quartz.config.ts**: Main configuration (theme, analytics, base URL)
- **quartz.layout.ts**: Component layout (sidebars, header, footer, afterBody)
- **quartz/styles/base.scss**: Custom CSS overrides and additions
- **quartz/cfg.ts**: Extended Analytics type to support Cloudflare
- **quartz/plugins/emitters/componentResources.ts**: Custom analytics injection

## Implementation Steps

### Phase 1: Setup ✅
- [x] Install Quartz locally (`npx quartz create`)
- [x] Initialize empty Quartz project at `/Users/franco/franco.international`
- [x] Create public GitHub repository (franco-g-s/franco.international)
- [x] Purchase franco.international domain via Namecheap
- [x] Document project in private vault (this note)
- [x] Update CLAUDE.md with publishing workflow documentation

### Phase 2: Website Design ✅
- [x] Design website structure and navigation
- [x] Configure Quartz (quartz.config.ts)
	- [x] Set page title: "Franco's Digital Garden"
	- [x] Configure base URL: franco.international
	- [x] Set locale: en-US
- [x] Customize appearance and theme
	- [x] Cupertino-inspired theme with SF Pro-like fonts (Inter)
	- [x] Custom blue accent color RGB(50, 130, 247)
	- [x] Light and dark mode color schemes
	- [x] Floating controls island (bottom-left) with dark mode + reader mode toggles
	- [x] Scroll buttons (bottom-right) for top/bottom navigation
	- [x] Reader mode with persistent state and smooth fade transitions
	- [x] Disabled Explorer desktop collapse, kept TOC collapse
	- [x] Conditional graph view (full on homepage, local on other pages)
	- [x] Hidden folder collapse icons in Explorer via CSS
- [x] Create initial content
	- [x] About page with bio and contact info
	- [x] CV page with education, experience, skills (populated from PDF)
	- [x] Projects overview page (high-level categories)
	- [x] ETH section for academic notes
	- [x] Placeholder pages for books, notes, media
- [x] Test local build and preview (`npx quartz build --serve`)

### Phase 3: Publishing Automation (Next Priority)
- [ ] Define `publish` property system in private vault
- [ ] Create publishing script to filter and copy notes
	- [ ] Read all markdown files in private vault
	- [ ] Filter by `publish: true` property
	- [ ] Copy to appropriate directories in public vault
	- [ ] Handle wikilink resolution and asset copying
- [ ] Handle metadata transformation (web-title, web-areas, etc.)
- [ ] Test publishing workflow with sample notes
- [ ] Document publishing process
- [ ] Consider GitHub Action for automated sync

### Phase 4: Deployment ✅
- [x] Configure GitHub Pages
	- [x] Create `.github/workflows/deploy.yml`
	- [x] Set build source to GitHub Actions
	- [x] Configure Pages environment
- [x] Set up custom domain (franco.international)
	- [x] Add custom domain in GitHub Pages settings
	- [x] Configure DNS at Namecheap (4 A records + CNAME)
	- [x] Wait for DNS propagation (~10-15 minutes)
	- [x] Verify DNS configuration
- [x] Configure SSL certificate (automatic via GitHub Pages)
	- [x] Enable HTTPS enforcement
	- [x] Let's Encrypt provisioning
- [x] Set up analytics
	- [x] Sign up for Cloudflare Web Analytics (free)
	- [x] Add Cloudflare as new analytics provider in quartz/cfg.ts
	- [x] Implement script injection in componentResources.ts
	- [x] Configure token in quartz.config.ts
- [x] Test deployment pipeline
	- [x] Push to main branch triggers build
	- [x] Build completes in ~1-2 minutes
	- [x] Site updates automatically
- [x] Verify all links and navigation work
	- [x] Test wikilinks
	- [x] Test graph view interactions
	- [x] Test search functionality
	- [x] Test mobile responsiveness

### Phase 5: Content Population (In Progress)
- [x] Publish CV and about page
- [ ] Select and publish class notes
	- [ ] Review ETH class notes for publication readiness
	- [ ] Choose atomic notes (not raw class notes)
	- [ ] Add `publish: true` to selected notes
- [ ] Publish project notes  
	- [ ] Choose public-appropriate projects
	- [ ] Document coding projects (Quartz, MCP servers, automation)
	- [ ] Document research projects
- [ ] Publish book reviews
	- [ ] Select completed book notes with reviews
	- [ ] Add ratings and thoughts
- [ ] Add navigation and index pages
	- [ ] Create topic index pages
	- [ ] Add "Recently Updated" sections
	- [ ] Improve homepage content

### Phase 6: Maintenance & Iteration
- [ ] Set up automated publishing workflow
	- [ ] GitHub Action to sync from private vault?
	- [ ] Cron job on local machine?
	- [ ] Manual script with git hooks?
- [ ] Create documentation for future updates
	- [ ] Document publishing process
	- [ ] Document theme customization
	- [ ] Document component development
- [ ] Iterate on design based on usage
	- [ ] Review analytics for popular pages
	- [ ] Improve navigation based on user behavior
	- [ ] Refine color scheme and typography
- [ ] Expand content over time
	- [ ] Add new sections as needed
	- [ ] Maintain regular publishing cadence
	- [ ] Update CV and projects

## Key Decisions

### Why Not Self-Host on Raspberry Pi?
- **Free hosting wins**: GitHub Pages is free, zero maintenance, better uptime (99.9% SLA)
- **No hassle**: No dealing with ISP restrictions, port forwarding, SSL certificate renewal, security patches
- **Global CDN**: Faster for international visitors (content distributed globally)
- **Cost**: $0 vs $100+ upfront + $50-80/year ongoing (electricity, dynamic DNS, etc.)
- **Reliability**: GitHub's infrastructure vs home internet uptime
- **Raspberry Pi**: Saved for future projects (home automation, media server, Pi-hole, etc.)

### Why Separate Vaults?
- **Clean architecture**: Keeps private vault structure unchanged (no "Public/" folder cluttering things)
- **Optimized organization**: Website can have completely different organization optimized for web navigation
- **Security**: Zero risk of accidentally exposing private notes (separate repos, separate builds)
- **Different audiences**: Personal vault for me, website for public
- **Flexibility**: Can restructure website without affecting private vault
- **Proven approach**: Follows Steph Ango's successful pattern

### Why Property-Based Publishing?
- **Vault integration**: Fits existing vault's extensive property system
- **Granular control**: Choose exactly which notes get published
- **Flexible metadata**: Can customize titles/categorization for web using `web-*` properties
- **No structural changes**: No folder structure disruption in private vault
- **Easy automation**: Simple to script (filter by property, copy files)
- **Scalability**: Can add more publishing rules as needed

### Why Cloudflare Web Analytics Over Plausible/Google?
- **Free forever**: No monthly fees ($0 vs $9/month for Plausible or data harvesting for Google)
- **No cookies**: Completely cookieless tracking (no consent banners needed)
- **Privacy-focused**: GDPR/CCPA compliant by design, doesn't track individuals
- **Lightweight**: Minimal impact on page load times
- **No consent fatigue**: Visitors don't see annoying cookie popups
- **Sufficient data**: Pageviews, referrers, devices - everything needed without PII

### Custom Components vs. Default Quartz
- **Better UX**: Reader mode, floating controls, scroll buttons improve navigation
- **Brand consistency**: Cupertino theme matches personal aesthetic preferences
- **Persistent state**: Reader mode stays active across pages (localStorage)
- **Performance**: No impact on build times, minimal JavaScript overhead
- **Maintainability**: Well-structured components in separate files
- **Learning**: Deep understanding of Quartz architecture for future customization

## Technical Achievements

### Custom Analytics Provider
Added Cloudflare Web Analytics as a new first-class provider in Quartz:
- Extended `Analytics` type in `quartz/cfg.ts`
- Implemented script injection in `quartz/plugins/emitters/componentResources.ts`
- Supports same configuration pattern as built-in providers
- Could be contributed back to Quartz upstream

### State Persistence
Implemented localStorage-based state management for reader mode:
- Survives page navigation (SPA routing)
- Persists across browser sessions
- Updates button UI on every page load
- Clean abstraction with `updateReaderModeUI` helper

### Component Resource Forwarding
Solved the challenge of child component resources in wrapper components:
- FloatingControls forwards both CSS and scripts from children
- Uses `concatenateResources` utility for proper bundling
- Ensures dark mode and reader mode work when moved to new location

### CSS-Only Sidebar Hiding
Optimized reader mode implementation:
- Uses opacity transitions instead of display manipulation
- Keeps layout stable (no content shifting)
- Smooth fade animations (0.4s out, 0.8s in)
- No hover reveal (clean, intentional UX)

## Future Enhancements

### Content & Features
- Add blog/essays section for long-form writing
- Create topic index pages (AI, Cycling, Biotech, etc.)
- Add "Recently Updated" or "Recently Added" sections
- Newsletter/RSS feed for content updates
- Comments system (GitHub Discussions integration?)
- Interactive elements (executable code blocks like ewan.my)

### Visualizations & Data
- Trip maps using Leaflet.js
- Book ratings visualizations (charts, timelines)
- Project timeline visualization
- Reading statistics and insights

### Analytics & SEO
- Analyze search patterns to improve content
- Add Open Graph images for better social sharing
- Implement structured data (Schema.org)
- Create sitemap for better indexing (Quartz generates this automatically)

### Technical Improvements
- Optimize images with next-gen formats (WebP, AVIF)
- Add lazy loading for images
- Implement service worker for offline support
- Add web app manifest for PWA capabilities
- Consider self-hosted fonts for privacy

### Publishing Workflow
- Automated sync from private vault (GitHub Action or cron job)
- Preview environment for draft notes
- Scheduled publishing for future-dated posts
- Automatic image optimization in publishing script
- Version control integration (track when notes were last published)

## Related Notes
- [[Obsidian Rules]] - Core principles for vault organization
- [[Scripts]] - Automation workflows (future publishing script will live here)
- [[Automation]] - Vault automation strategies
- [[CV]] - Source CV note (has `publish: true`)

## Project Statistics
- **Started**: 2026-02-06
- **Deployed**: 2026-02-06 (same day!)
- **Current Files**: 8 markdown files
- **Git Commits**: 10+ commits
- **Custom Components**: 3 new, 3 modified
- **Lines of Custom Code**: ~500+ (TypeScript, SCSS, configs)
- **Build Time**: ~2 seconds
- **Deployment Time**: ~1-2 minutes (GitHub Actions)
