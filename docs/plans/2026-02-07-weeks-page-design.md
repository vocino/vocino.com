# /weeks - Life in Weeks Visualization Design

**Date:** February 7, 2026
**Status:** Design Complete - Ready for Implementation

## Concept

A wordless, full-viewport meditation on life as a grid of time. Inspired by Dieter Rams' "less, but better" philosophy, this page visualizes a human life (80 years) as individual weeks on desktop or months on mobile.

**Key Principle:** Pure geometric contemplation. No text, no interaction, no data exposure. The viewer discovers the meaning themselves.

## Core Experience

### Visual Design

- **Desktop:** 4,160 squares (80 years × 52 weeks)
- **Mobile:** 960 squares (80 years × 12 months)
- **Layout:** Perfect squares in CSS Grid, 1-2px gaps, fills 100% viewport
- **Grid proportions:** ~80 columns × 52 rows (desktop), ~40 columns × 24 rows (mobile)

### Color & Gradient

Single color: Brand cyan (`var(--brand)` / #00CCFF) with opacity gradient anchored on current week/month.

**Asymmetric Fade:**
- **Current week/month:** 100% opacity (brightest point)
- **Past cells:** Slower fade, more solid - "lived experience"
  - `opacity = max(0.15, 1 - (distance/totalPast)^0.5)`
  - Square root curve creates gradual, weighty falloff
- **Future cells:** Faster fade, more ethereal - "optimistic possibility"
  - `opacity = max(0.08, 1 - (distance/totalFuture)^1.5)`
  - Exponential curve creates quicker, lighter falloff

### Entrance Animation

**Ripple from current week outward** - "now" as the epicenter.

- Cells fade in based on distance from current week: `delay = distance × 8ms`
- Total animation: ~2 seconds (330ms for furthest cells)
- Each cell fades to its final gradient opacity (not 100% then fade)
- Subtle refinements:
  - Blur-to-focus: 0.5px → 0px during fade
  - Scale: 0.95 → 1.0 during fade
  - Ease-out curve

Animation happens once on load, then grid becomes still - a completed thought.

## Technical Architecture

### Page Structure

- **File:** `src/pages/weeks.astro`
- **Layout:** Uses existing `BaseLayout.astro`
- **Rendering:** Static page with client-side JavaScript
- **No dependencies:** Pure HTML/CSS/JS (~200 lines total)

### Implementation Approach

**DOM-based (not Canvas):**
- Individual `<div>` elements for each week/month
- CSS Grid for layout
- Inline styles for opacity values (calculated in JS)
- Better CSS control, easier debugging, semantic HTML

**Responsive Strategy:**
- Breakpoint at `$breakpoint-md` (768px)
- Desktop: weeks grid
- Mobile: months grid
- Grid rebuilds instantly on resize (no animation on resize)

### Calculations

**Birthdate:** April 12, 1982 (hardcoded)
**Life expectancy:** 80 years (4,160 weeks / 960 months)

JavaScript calculates:
- Current date (browser local time)
- Weeks/months lived since birth
- Weeks/months remaining until age 80
- Distance of each cell from current position
- Opacity and animation delay for each cell

## Integration with Style Guide

### Colors
- Background: `var(--bg)` (#0F1419)
- Cells: `var(--brand)` (#00CCFF) at calculated opacities
- Gap color: `var(--bg)` (gaps reveal dark background)

### Typography
- None visible (wordless design)
- Uses `$font-family-mono` if optional metadata added later

### Spacing
- Cell gaps: 1-2px (minimal, maintains unified fabric)
- Viewport: 100% width/height with minimal centering margins

## Edge Cases & Details

### Time Calculations
- **Leap years:** Ignored (52 weeks/year approximation sufficient)
- **Time zones:** Uses browser's local date for "current week"
- **Future birthdays:** Grid can extend slightly beyond 80 if needed

### Responsive Behavior
- `@media (max-width: $breakpoint-md)`: Switch to months
- Grid centers in viewport on all devices
- Scrollable if viewport too small (preserve minimum cell size)

### Accessibility
- `<h1 class="sr-only">Life in weeks</h1>` for screen readers
- Meaningful page title: "Weeks"
- High contrast cyan on dark (WCAG AA compliant)
- No interactive elements (no keyboard navigation needed)
- Print CSS: Static grid at optimal density

### SEO Metadata
```html
<title>Weeks</title>
<meta name="description" content="A visualization of life in weeks">
```
Minimal metadata that doesn't spoil the discovery.

## Design Philosophy

**Dieter Rams Principles Applied:**
1. **Innovative:** New take on "life in weeks" concept
2. **Useful:** Contemplative tool for reflection
3. **Aesthetic:** Pure geometric beauty, no decoration
4. **Understandable:** Wordless but discoverable
5. **Unobtrusive:** No interaction, no interruption
6. **Honest:** Direct visualization, no manipulation
7. **Long-lasting:** Timeless minimalism
8. **Thorough:** Every detail considered
9. **Environmentally friendly:** Minimal code, fast load
10. **As little design as possible:** Only what's essential

## Success Criteria

The design succeeds if visitors:
1. Pause and stay on the page
2. Experience a moment of reflection
3. Discover the meaning without explanation
4. Feel the weight of time passing
5. See beauty in the geometric simplicity

---

**Ready for implementation.**
