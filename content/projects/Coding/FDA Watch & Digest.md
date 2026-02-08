---
created: '2025-10-30'
tags:
  - project
status: completed
url:
  - 'https://github.com/franco-g-s/fda-watch-digest/tree/main'
---
Automated FDA regulatory monitoring system that uses the **Federal Register API** and **eCFR API** to detect regulatory changes and generate AI-powered summaries for quick impact assessment. This project was part of my Internship at [[Accelerated Biosciences|Accelerated Biosciences]] in Taiwan. 

## Overview
**Problem:** Manually monitoring FDA regulatory publications and CFR regulation changes is time-consuming and risks missing important updates that could impact business operations.

**Solution:** Automated tool that monitors both Federal Register announcements and CFR regulation text via official government APIs, detects changes, cross-references them, and provides AI-generated summaries with email notifications.

### Federal Register Monitoring
- **Automated Detection**: Weekly checks of Federal Register for FDA publications
- **Intelligent Filtering**: 3-stage hybrid system (keywords → scoring → AI review)
- **Topic Focused**: Filters for cell therapy, gene therapy, stem cells, exosomes, secretomes
- **4-Tier Relevance**: HIGH/MEDIUM/LOW/MINIMAL priority classification
- **AI Summarization**: Claude-powered summaries with key points and action items
### CFR Regulation Monitoring
- **Snapshot System**: Periodic snapshots of 21 CFR Parts 1271, 600, 610, 312, 601
- **Change Detection**: Automatically detects ADDED, MODIFIED, REMOVED, RENAMED sections
- **Diff Analysis**: Shows before/after text comparison
- **AI Impact Analysis**: Relevance scoring (0-100) with detailed impact assessment
- **Cross-Referencing**: Links CFR changes to Federal Register documents
- **Timeline Building**: Shows regulatory progression (PRORULE → RULE → CFR change)
- **Classification**: Identifies expected vs unexpected changes
### Integration & Delivery
- **Interactive Workflow**: Single `fda workflow` command for complete monitoring
- **Email Digests**: Combined FR documents + CFR changes with HTML rendering
- **No Web Scraping**: Uses official government APIs (Federal Register + eCFR)
- **Historical Tracking**: SQLite database maintains complete regulatory history
- **Unified CLI**: Single command-line tool for all operations


### Primary Command: Interactive Workflow
The **recommended way** to use FDA Watch & Digest is through the interactive workflow:
```bash
python fda.py workflow
```

**What it does:**
- **Step 1: Federal Register Detection**
  - Asks: "How many days back should I check?" (default: 7 days)
  - Fetches documents from Federal Register API
  - Applies 3-stage relevance filtering (keywords → scoring → AI review)
  - Shows top HIGH priority documents
  - Auto-saves to database

- **Step 2: CFR Regulation Monitoring**
  - Creates snapshots of monitored CFR parts (1271, 600, 610, 312, 601)
  - Detects changes between snapshots
  - Runs AI analysis on detected changes
  - Reports relevance distribution

- **Step 3: AI Summarization**
  - Shows document counts (HIGH + MEDIUM relevance)
  - Displays estimated API cost
  - Asks: "Generate AI summaries? (Y/n)"
  - Processes documents with progress indicator
  - Generates 2-paragraph summaries (context + impact, no action items)

- **Step 4: Email Delivery**
  - Generates email digest with FR documents + CFR changes
  - Shows counts by relevance level
  - Asks: "Preview / Send / Skip?"
  - Opens preview in browser if requested
  - Sends email if confirmed (even if no changes)

- **Summary**: Shows what was accomplished (documents saved, CFR changes detected, summaries generated, email sent)

**Quick Mode** (for automation/cron):
```bash
python fda.py workflow --quick
```
- Uses default 7 days lookback
- Auto-summarizes HIGH + MEDIUM documents
- Auto-sends email (even if no updates)
- No interactive prompts

### Individual Commands
For granular control, use individual commands:
```bash
# Document detection
python fda.py run --days 60          # Detect and save new documents

# Testing & validation
python fda.py filter --days 60       # Test filtering system (with AI)
python fda.py filter --no-ai         # Test without AI review (faster)
python fda.py test                   # Comprehensive system test
python fda.py smtp                   # Test SMTP connection only

# AI Summarization
python fda.py summarize              # Summarize HIGH & MEDIUM docs (recommended)
python fda.py summarize --all        # Summarize all relevance levels
python fda.py summarize --limit 5    # Limit to 5 documents
python fda.py summarize --relevance HIGH  # Only HIGH relevance

# Email operations
python fda.py preview                # Preview email in browser
python fda.py send                   # Send email digest

# Database viewing
python fda.py show                   # View all documents
python fda.py show --relevance HIGH  # Filter by relevance
python fda.py show --type RULE       # Filter by document type
python fda.py show --limit 10        # Limit results

# CFR Monitoring (NEW)
python fda.py cfr snapshot           # Create CFR snapshots for all monitored parts
python fda.py cfr snapshot --parts 1271  # Snapshot specific part only
python fda.py cfr detect             # Detect changes between snapshots
python fda.py cfr analyze            # Run AI analysis on detected changes
python fda.py cfr analyze --limit 10 # Analyze up to 10 changes
python fda.py cfr show               # View recent CFR changes
python fda.py cfr show --part 1271   # Show changes for specific part
python fda.py cfr show --relevance HIGH  # Filter by relevance
python fda.py cfr show --verbose     # Show detailed analysis

# Help
python fda.py --help                 # Show all commands
python fda.py workflow --help        # Help for specific command
```

## Filtering System
The system uses a **3-stage hybrid approach** to identify relevant documents:
### Stage 1: Keyword Pre-screening
- Searches entire document (title + abstract + body text)
- Case-insensitive matching
- Keywords: cell therapy, gene therapy, stem cells, exosomes, secretomes, regenerative medicine
- Documents without keywords are **rejected** and not stored
### Stage 2: Weighted Relevance Scoring
- **Title matches:** 10 points per keyword
- **Abstract matches:** 5 points per keyword
- **Body matches:** 1 point per keyword
- **Document type bonuses:**
  - RULE: +3 points (critical regulations)
  - PRORULE: +2 points (proposed changes)
  - NOTICE: +0 points
### Stage 3: AI Validation (Claude)
- Only reviews **borderline cases** (MEDIUM/LOW relevance)
- HIGH relevance documents (≥15 pts) skip AI review (already clearly relevant)
- MINIMAL relevance documents (1-4 pts) skip AI review (clearly not relevant)
- Validates actual relevance vs. keyword spam
### 4-Tier Classification
- **HIGH (≥15 pts):** Direct regulatory impact
- **MEDIUM (10-14 pts):** May affect compliance
- **LOW (5-9 pts):** Potentially relevant
- **MINIMAL (1-4 pts):** Brief mentions
- **REJECTED (0 pts):** No keywords - not stored

## AI Summarization
Uses **Claude Haiku 4.5** to generate concise, regulatory-focused summaries.
### Summary Structure
Each AI-generated summary includes:
- **KEY POINTS:** 2-3 bullet points highlighting the most important takeaways
- **SUMMARY:** Exactly 2 paragraphs:
  - First paragraph: What the regulation/guidance is about and why it was issued (context and background)
  - Second paragraph: Regulatory impact on cell/gene therapy companies, what changes, deadlines, and comment periods
**Note:** Summaries focus on explaining the regulation itself, not prescribing action items. They provide regulatory context and impact assessment, letting recipients determine appropriate responses.
### Cost Optimization
- **Default:** Only HIGH and MEDIUM relevance documents are summarized
- **Rationale:** Highest regulatory impact documents require detailed analysis
- **Estimated cost:** ~$0.01-0.03 per summary (Claude Haiku 4.5)
- **Typical usage:** 2-3 summaries per week = ~$0.10-0.30/month

## CFR Regulation Monitoring
The system now monitors actual CFR regulation text changes, not just Federal Register announcements.
### How It Works
1. **Snapshot Creation** (`fda cfr snapshot`)
   - Fetches current text of monitored CFR parts from eCFR API
   - Creates SHA-256 hash of content
   - Stores in database with date
   - Monitored parts: 21 CFR 1271 (HCT/Ps), 600/610 (Biologics), 312 (INDs), 601 (Licensing)

2. **Change Detection** (`fda cfr detect`)
   - Compares two most recent snapshots for each part
   - Identifies ADDED, MODIFIED, REMOVED, RENAMED sections
   - Generates before/after text comparison
   - Calculates similarity scores

3. **AI Analysis** (`fda cfr analyze`)
   - Relevance scoring (0-100) based on cell/gene therapy impact
   - Detailed impact analysis (2,000+ characters)
   - Compliance action recommendations (4,000+ characters)
   - Classification by relevance level (HIGH/MEDIUM/LOW/MINIMAL)

4. **Cross-Referencing** (automatic)
   - Links CFR changes to Federal Register documents
   - Multi-strategy matching (direct references, keywords, part-level)
   - Builds timelines showing regulatory progression
   - Classifies as expected (announced in FR) or unexpected (silent change)

### CFR Change Data
Each detected CFR change includes:
- **Citation:** e.g., "21 CFR § 1271.90"
- **Change Type:** ADDED, MODIFIED, REMOVED, or RENAMED
- **Before/After Text:** Full text comparison
- **Diff Summary:** Brief description of what changed
- **Relevance Score:** 0-100 (AI-generated)
- **Impact Analysis:** Regulatory implications and affected companies
- **Compliance Notes:** Specific actions required, deadlines
- **Related Documents:** Federal Register documents that announced the change
- **Timeline:** Chronological progression (PRORULE → RULE → CFR change)
- **Classification:** Expected (announced) vs Unexpected (silent)

### Email Integration
CFR changes are automatically included in email digests:
- Displayed in separate section after Federal Register documents
- Color-coded by change type (green=ADDED, yellow=MODIFIED, red=REMOVED)
- Collapsible before/after text sections
- Expandable AI analysis and compliance notes
- Related Federal Register documents listed with confidence levels


### Data Flow
```
Federal Register API
        │
        ▼
┌──────────────────────────┐
│   Change Detector        │  Compares with database
│   (detect new docs)      │  Identifies what's new
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  Relevance Filter        │  3-stage hybrid system:
│  (3-stage hybrid)        │  1. Keywords
│                          │  2. Scoring
│                          │  3. AI validation
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│   SQLite Database        │  Stores relevant docs
│   (persistent storage)   │  Tracks relevance scores
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  Document Summarizer     │  Claude AI generates
│  (Claude AI)             │  actionable summaries
└──────────────────────────┘
        │
        ▼
┌──────────────────────────┐
│  Email Notifier          │  Sends priority-based
│  (SMTP)                  │  digest to stakeholders
└──────────────────────────┘
```

### Technology Stack
- **Language:** Python 3.11+
- **APIs:** Federal Register API (no auth required)
- **AI:** Anthropic Claude Haiku 4.5
- **Database:** SQLite
- **Email:** SMTP (Gmail or custom)
- **HTTP Client:** `requests`
- **Scheduling:** Cron or Python `schedule` (optional)


## Development Status
**Current Phase:** Production Ready ✅
### Completed Features
- [x] Federal Register API integration
- [x] 3-stage relevance filtering system
- [x] Change detection and deduplication
- [x] SQLite database with relevance tracking
- [x] AI-powered summarization (Claude Haiku 4.5)
- [x] Email notifications (HTML + plain text)
- [x] Interactive workflow orchestration
- [x] Comprehensive CLI tool
- [x] System testing and validation

### Roadmap
- [x] Automated scheduling (cron integration)
- [x] eCFR API integration (monitor regulation text changes)
- [ ] Web dashboard for viewing history
- [ ] Multi-user support with preferences
- [ ] Advanced analytics and trend analysis

## Why This Approach?
**Advantages over web scraping:**
- ✅ **Reliable** - Official government API, well-maintained
- ✅ **Free** - No authentication or API keys required
- ✅ **Structured** - Clean JSON responses, easy to parse
- ✅ **Complete** - Access to historical data and metadata
- ✅ **Fast** - No HTML parsing or page rendering
- ✅ **Legal** - Using official public APIs as intended

**Regulatory monitoring best practices:**
- Federal Register is the authoritative source for new regulations
- Proposed rules give advance warning before final implementation
- This is where regulatory professionals look first

---

**Last Updated:** 2025-11-17
**Status:** Production Ready
**Version:** 1.0
