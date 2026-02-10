# franco.international

My personal website and digital garden, built with [Quartz](https://quartz.jzhao.xyz) and published from my Obsidian vault.

🌐 **Live site:** [franco.international](https://franco.international)

## About

This is my personal knowledge base where I share:
- **Academic notes** from ETH Zürich (Mechanical Engineering)
- **Projects** - coding, hardware design, research
- **Book notes** and reviews
- **Media** notes and reflections
- **About me** - CV and personal background

## Tech Stack

- **Static Site Generator:** [Quartz v4](https://quartz.jzhao.xyz)
- **Content Source:** Obsidian vault (private repository)
- **Hosting:** GitHub Pages
- **Domain:** franco.international
- **Publishing:** Property-based selective publishing (`publish: true`)

## Architecture

This repository contains the public-facing website. Content is selectively published from my private Obsidian vault using a custom publishing workflow:

1. Notes in private vault are marked with `publish: true` property
2. Publishing script (`scripts/publish.mjs`) processes content:
   - **Wikilink transformation**: Resolves `[[Note Title]]` to proper web paths (case-insensitive, alias-aware)
   - **Metadata filtering**: Strips private properties, preserves public metadata
   - **Content cleaning**: Removes Obsidian comments, base embeds, orphaned headings
   - **Attachment handling**: Copies referenced images and media files
3. Quartz builds the static site with custom components
4. GitHub Pages auto-deploys

**Two-vault system:**
- **Private vault** (separate repo): Full personal knowledge base with private notes
- **Public website** (this repo): Curated selection for public consumption

**Custom Components:**
- `FrontmatterProperties`: Displays note metadata in collapsible Obsidian-style panel
- Enhanced Explorer with single-line overflow
- Collapsible Table of Contents
- Always-visible Backlinks

## Features

- 📚 Digital garden with wikilinks and backlinks
- 🔍 Full-text search
- 🕸️ Interactive graph view (full network on homepage, local connections on pages)
- 🌓 Dark/light mode
- 📱 Responsive design
- 🗂️ File explorer navigation
- 📋 **Frontmatter properties display** - Obsidian-style metadata panel showing 30+ property types
- 🔗 **Intelligent wikilink resolution** - Case-insensitive, alias-aware link transformation
- 🎨 Cupertino-inspired design with custom Inter typography

## Structure

```
content/
├── about/           # About me & CV
├── notes/           # Academic notes (ETH Zürich)
├── projects/        # Coding, hardware, research projects
├── books/           # Book notes and reviews
└── media/           # Movies, shows, media notes
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npx quartz build --serve

# Build for production
npx quartz build

# Sync to GitHub
npx quartz sync
```

## Contact

- **Email:** franco@goxcoworld.com
- **GitHub:** [@franco-g-s](https://github.com/franco-g-s)

## License

Content © 2026 Franco Gómez Schumacher. All rights reserved.

Website built with [Quartz](https://github.com/jackyzha0/quartz) (MIT License).
