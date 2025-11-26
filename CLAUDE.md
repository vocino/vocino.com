# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based static website for vocino.com - a modern, minimal personal landing page optimized for GitHub Pages. The site uses Jekyll's built-in SCSS processing with a modular architecture and focuses on a clean, left-aligned design with a dark theme and magazine-quality typography.

The site includes a projects collection system for organizing evergreen content across categories like Gaming, AI, Web, and more.

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
│   ├── default.html   # Main layout with SEO tags
│   └── project.html   # Project detail page layout
├── _projects/         # Project collection (evergreen content)
│   ├── example-gaming-project.md
│   ├── example-ai-project.md
│   └── example-web-project.md
├── _sass/             # SCSS partials (imported by main stylesheet)
│   ├── _variables.scss  # CSS custom properties, colors, typography
│   ├── _base.scss       # Modern CSS reset and base styles
│   └── _layout.scss     # Main layout styles + project styles
├── assets/
│   └── css/
│       └── style.scss   # Main stylesheet (compiles to style.css)
├── _config.yml        # Jekyll configuration
├── index.html         # Homepage
├── projects.html      # Projects listing page
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
- **Left-aligned design**: Editorial-style layout inspired by minimalist design
- **Magazine typography**: Inter and Playfair Display with optical kerning and ligatures
- **Responsive typography**: Using clamp() for fluid font sizing
- **Minimal and modern**: Clean design with subtle gradient accents
- **Social integration**: Icon links with gradient underline effects
- **SEO-ready**: Uses jekyll-seo-tag plugin for meta tags

### Projects Collection
The site uses Jekyll Collections for organizing projects:
- **Location**: `_projects/` directory
- **Categories**: Gaming, AI, Web, or custom categories
- **Format**: Markdown files with YAML front matter
- **Features**:
  - Category tags for organization
  - Custom ordering with `order` field
  - External URL redirects (link directly to external sites)
  - Evergreen content (no dates required)
  - Simple list-based layout
  - Individual project pages with rich content support (for internal projects)

#### Adding a New Project

**Option 1: Internal Project (with full project page)**
1. Create a new `.md` file in `_projects/`
2. Add YAML front matter:
   ```yaml
   ---
   title: "Project Title"
   category: "Gaming" # or AI, Web, etc.
   excerpt: "Short description for listing page"
   order: 1 # Lower numbers appear first
   links:
     - title: "GitHub Repository"
       url: "https://github.com/..."
   ---
   ```
3. Write your project content in Markdown
4. Project will appear on `/projects/` with a link to its detail page

**Option 2: External Project (redirect to external URL)**
1. Create a new `.md` file in `_projects/`
2. Add YAML front matter with `external_url`:
   ```yaml
   ---
   title: "External Project"
   category: "Web"
   excerpt: "Short description"
   order: 2
   external_url: "https://github.com/username/project"
   ---
   ```
3. Project will appear on `/projects/` with an ↗ indicator
4. Clicking the project will open a redirect page that automatically sends users to the external URL
5. The redirect uses both meta refresh and JavaScript for compatibility
6. The redirect page shows a fallback link if automatic redirect fails

### Configuration
Key `_config.yml` settings:
- Uses `github-pages` gem for compatibility
- Plugins: `jekyll-feed`, `jekyll-seo-tag`
- Markdown processor: `kramdown`
- SCSS compilation with compressed output
- Author metadata for SEO and social links
- Collections: `projects` collection with individual pages enabled

## GitHub Pages Compatibility

This site is built specifically for GitHub Pages using:
- The `github-pages` gem (includes all GitHub Pages dependencies)
- Only GitHub Pages-compatible plugins
- Standard GitHub Pages build settings
- No custom plugins that require unsafe mode
