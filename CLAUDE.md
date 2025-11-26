# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based static website for vocino.com - a modern, minimal personal landing page optimized for GitHub Pages. The site uses Jekyll's built-in SCSS processing with a modular architecture and focuses on a clean, centered design with a dark theme.

## Development Commands

### Initial Setup
```bash
# Install dependencies (first time)
bundle install
```

### Building and Serving
```bash
# Serve the site locally with live reload (default: http://localhost:4000)
bundle exec jekyll serve

# Serve with live reload and incremental builds (faster)
bundle exec jekyll serve --incremental

# Build the site for production (output to _site/)
bundle exec jekyll build

# Serve with drafts and future posts
bundle exec jekyll serve --drafts --future
```

### GitHub Pages Deployment
This site is configured to work with GitHub Pages. Simply push to the master branch and GitHub will automatically build and deploy the site.

## Architecture

### Directory Structure
```
.
├── _layouts/          # HTML templates
│   └── default.html   # Main layout with SEO tags
├── _sass/             # SCSS partials (imported by main stylesheet)
│   ├── _variables.scss  # CSS custom properties, colors, typography
│   ├── _base.scss       # Modern CSS reset and base styles
│   └── _layout.scss     # Main layout styles
├── assets/
│   └── css/
│       └── style.scss   # Main stylesheet (compiles to style.css)
├── _config.yml        # Jekyll configuration
├── index.html         # Homepage
└── Gemfile           # Ruby dependencies (github-pages gem)
```

### Styling System
The site uses a modular SCSS architecture:
1. `assets/css/style.scss` - Main stylesheet with front matter (Jekyll processes this)
2. Imports three partials from `_sass/`:
   - `_variables.scss` - CSS custom properties for colors, typography, spacing
   - `_base.scss` - Modern CSS reset and base element styles
   - `_layout.scss` - Layout-specific styles (container, content, social links)
3. Uses CSS custom properties (`:root` variables) for theming
4. Responsive design with clamp() for fluid typography
5. Dark theme with gradient text effects

### Layout Philosophy
- **Centered design**: Flexbox-based vertical and horizontal centering
- **Responsive typography**: Using clamp() for fluid font sizing
- **Minimal and modern**: Clean design with gradient accents
- **Social integration**: Icon links with hover effects
- **SEO-ready**: Uses jekyll-seo-tag plugin for meta tags

### Configuration
Key `_config.yml` settings:
- Uses `github-pages` gem for compatibility
- Plugins: `jekyll-feed`, `jekyll-seo-tag`
- Markdown processor: `kramdown`
- SCSS compilation with compressed output
- Author metadata for SEO and social links

## GitHub Pages Compatibility

This site is built specifically for GitHub Pages using:
- The `github-pages` gem (includes all GitHub Pages dependencies)
- Only GitHub Pages-compatible plugins
- Standard GitHub Pages build settings
- No custom plugins that require unsafe mode
