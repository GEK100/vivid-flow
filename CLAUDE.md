# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vivid Flow is a B2B marketing website for an AI automation consultancy targeting UK SMEs. The company (Vivid Flow, trading as Ictus Flow Ltd, registered in England & Wales) offers AI workflow automation across 10+ industry verticals grouped into three categories: Trades & Construction, Professional Services, and Hospitality & Care.

This is a **frontend-only** static site with no backend, database, or authentication. Form submissions are handled via Google Sheets integration.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with Turbopack
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4 with custom theme
- **Animations:** Framer Motion 11
- **Icons:** Lucide React

## Commands

All commands run from the `vivid-flow/` subdirectory:

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint
```

## Site Structure

The site has multiple pages:

### Main Pages
- `/` - Homepage with all marketing sections
- `/roi-calculator` - Free ROI calculator tool (lead generation)
- `/assessment` - AI Readiness Quiz (lead generation)

### Legal Pages
- `/privacy-policy` - Privacy Policy
- `/terms-of-service` - Terms of Service
- `/cookie-policy` - Cookie Policy

## Architecture

### Homepage Flow

The homepage (`src/app/page.tsx`) composes sections in this order:

```
Navigation
   ↓
Hero (centered, CTA to free tools)
   ↓
Services (bento grid of 6 offerings)
   ↓
InterSectionCTA (ROI Calculator link)
   ↓
Sectors (3 tabbed groups with auto-hide)
   ↓
InterSectionCTA (Assessment Quiz link)
   ↓
Methodology (4-step timeline)
   ↓
CTA/Contact (email form)
   ↓
Footer
```

### Key Files

| Path | Description |
|------|-------------|
| `src/app/page.tsx` | Homepage composing all sections |
| `src/app/layout.tsx` | Root layout with Google Fonts and metadata |
| `src/app/globals.css` | CSS custom properties, animations, patterns |
| `src/app/roi-calculator/page.tsx` | ROI Calculator with form + calculations |
| `src/app/assessment/page.tsx` | 10-question quiz with scoring |
| `src/app/privacy-policy/page.tsx` | Privacy Policy (server component) |
| `src/app/terms-of-service/page.tsx` | Terms of Service (server component) |
| `src/app/cookie-policy/page.tsx` | Cookie Policy (server component) |
| `src/components/` | Reusable section components |
| `src/data/sectors.ts` | Sector data, groupings, and TypeScript interfaces |
| `tailwind.config.ts` | Extended theme with custom colors and fonts |

### Data Layer

`src/data/sectors.ts` exports:
- `Sector`, `Problem`, `Solution`, `SectorGroup` interfaces
- `sectors` array (10 sectors with problems/solutions)
- `sectorGroups` array (3 groups: trades, professional, hospitality)
- `sectorNames` helper for dropdowns

### Import Alias

`@/*` resolves to `./src/*` (configured in tsconfig.json).

## Design System

### Fonts
- **Display/Headings:** Outfit (`font-display`)
- **Body:** DM Sans (`font-body`)

### Colors
- **Primary:** Indigo-600
- **Neutrals:** Slate (50-950)
- **Backgrounds:** Stone-50, White
- **Dark sections:** Slate-900, Slate-950

### CSS Variables
Defined in `globals.css`:
- `--background`, `--foreground`, `--primary`, `--border`, `--muted`

### Animations
- Framer Motion `whileInView` for viewport-triggered entrances
- `AnimatePresence` for enter/exit transitions
- Custom keyframes: fade-in, slide-up, flow, float, dash

## Component Patterns

### Client vs Server Components
- **Client components** (`'use client'`): All interactive components (Navigation, Hero, Services, Sectors, Methodology, CTA, Footer, ROI Calculator, Assessment)
- **Server components**: Legal pages (privacy, terms, cookie policy)

### Sector Tabs Behavior
- Default state: No sectors shown (clean view)
- On tab click: Sector cards appear
- Auto-hide: Cards disappear after 5 seconds
- Extended timer: 15 seconds if user clicks into sector details
- Same-tab click: Closes the tab immediately

### Form Handling
Forms submit to `NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT` environment variable:
- ROI Calculator: Captures name, phone, email + calculated results
- Assessment Quiz: Captures name, phone, email + score
- Contact CTA: Captures email only
- Fallback: Opens mailto if no endpoint configured

### Navigation
- Desktop: Horizontal nav + Free Tools pill buttons + "Get in Touch" CTA
- Mobile: Hamburger menu with Free Tools section
- Anchor links use `/#section` format (works from sub-pages)

## Company Information

- **Trading Name:** Vivid Flow
- **Registered Company:** Ictus Flow Ltd
- **Jurisdiction:** England & Wales
- **Contact Emails:**
  - General: hello@vividflow.co.uk
  - Privacy: privacy@vividflow.co.uk
  - Legal: legal@vividflow.co.uk
- **Website:** vividflow.co.uk

## Environment Variables

```env
NEXT_PUBLIC_GOOGLE_SHEETS_ENDPOINT=<your-google-apps-script-url>
```

Set up a Google Apps Script to receive POST requests and write to a Google Sheet.
