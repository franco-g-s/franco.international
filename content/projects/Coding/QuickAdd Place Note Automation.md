---
created: '2025-11-14'
tags:
  - project
status: completed
---

**Script Location:** `Scripts/place.js` ([[place.js]])
**QuickAdd Command:** `QuickAdd: Place`
**Developed with:** [[Claude]]

### Overview
Automated QuickAdd script that creates or updates city and country notes with:
- Automatic coordinate fetching from OpenStreetMap
- Fuzzy matching with typo tolerance
- Automatic country flag emoji icons via Iconize plugin
- Opens the note immediately after creation

### Features
**Core Functionality:**
- **Single-input workflow** - Just enter place name, select from matches, choose status
- **Smart place detection** - Automatically determines if city or country from OpenStreetMap data
- **Fuzzy matching** - Handles typos and shows up to 5 closest matches for selection
- **User confirmation** - Shows full location details to avoid ambiguity (e.g., Paris, France vs Paris, Texas)
- **Coordinate fetching** - Uses OpenStreetMap Nominatim API for accurate lat/long
- **Status selection** - "been" or "bucket list" with normalized formatting

**Icon Automation:**
- **Auto-flag selection** - 195+ countries supported with ISO 3166-1 alpha-2 codes
- **Cities use parent country flag** - Tokyo gets 🇯🇵, Paris gets 🇫🇷
- **Iconize integration** - Directly writes to plugin data and refreshes UI
- **Recently used tracking** - Updates Iconize's recent icons list

**Workflow Integration:**
- **Template-based** - Uses existing City/Country templates
- **Auto-opens note** - Opens the created/updated note immediately

### How to Use
1. Open Command Palette (`Cmd+P`)
2. Run `QuickAdd: Place`
3. Enter place name (typos OK!)
4. Select correct location if multiple matches
5. Choose status ("been" or "bucket list")
6. Done! Note created with flag icon and opened
**For existing notes:** Just enter the name - coordinates will be updated without asking for status.

### Technical Details
**Dependencies:**
- QuickAdd plugin (macro + user scripts)
- Iconize (obsidian-icon-folder) plugin
- OpenStreetMap Nominatim API

**File Structure:**
- Countries: `Personal/Countries/[Name].md`
- Cities: `Personal/Countries/Cities/[Name].md`
- Script: `Scripts/place.js`

**API Integration:**
- OpenStreetMap Nominatim (free, rate-limited)
- User-Agent: "ObsidianVault/1.0 (Personal Knowledge Management)"
- Fetches up to 5 results for user selection

### Replaced System
This script replaces the previous `/place` slash command that used:
- Claude AI for parsing and execution
- Complex multi-place input syntax (`name1/status & name2/status`)
- Manual Claude Code invocation

**Improvements over old system:**
- ✅ No AI calls needed (free + faster)
- ✅ Simpler single-place workflow (easier to use)
- ✅ Fuzzy matching with confirmation (better UX)
- ✅ Automatic icons (no manual selection)
- ✅ Opens note immediately (better workflow)
- ✅ More reliable (no API rate limits or AI errors)

### Future Enhancements
**Potential improvements:**
- Add support for regions/states/provinces
- Cache coordinates to avoid repeated API calls for same place
- Batch mode for creating multiple places in sequence
- Integration with trip planning (auto-add to upcoming trips)
- Historical place tracking (dates visited, trip associations)
- Photo integration (link to Attachments folder for place photos)
- Custom icon override option (some places might need special icons)
- Export to map visualization

### Development Notes
**Country Code Mapping:**
- Hardcoded map of 195+ countries to ISO codes
- Could be externalized to JSON file for easier updates
- Handles common alternate names (e.g., "Czechia" and "Czech Republic")

**Iconize Plugin Interaction:**
- Accesses plugin via `app.plugins.plugins['obsidian-icon-folder']`
- Directly modifies `data` object and calls `saveData()`
- Triggers `iconize-refresh` workspace event for UI update

**Error Handling:**
- Icon addition failures don't block note creation
- API failures show user-friendly error messages
- Graceful degradation throughout
