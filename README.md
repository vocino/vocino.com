# vocino.com

Personal website for Travis Vocino - an installment chain art project built with Jekyll and optimized for GitHub Pages.

## Quick Start

### Prerequisites
- Ruby (version 2.7 or higher)
- Bundler (`gem install bundler`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vocino/vocino.com.git
cd vocino.com
```

2. Install dependencies:
```bash
bundle install
```

3. Run the development server:
```bash
bundle exec jekyll serve
```

4. Open your browser to `http://localhost:4000`

## Development

### Local Development
```bash
# Standard development server with live reload
bundle exec jekyll serve

# Faster builds with incremental regeneration
bundle exec jekyll serve --incremental
```

### Building for Production
```bash
bundle exec jekyll build
```

The compiled site will be in the `_site/` directory.

## Deployment

This site is configured for GitHub Pages. To deploy:

1. Push your changes to the `master` branch
2. GitHub Pages will automatically build and deploy your site
3. Your site will be live at `https://vocino.com`

### GitHub Pages Setup
1. Go to your repository settings
2. Navigate to "Pages"
3. Set source to "Deploy from a branch"
4. Select the `master` branch
5. Click "Save"

## Project Structure

```
.
├── _includes/        # Reusable components (nav, latest installment)
├── _layouts/         # HTML templates (installment, default)
├── _sass/            # SCSS partials
├── assets/           # Global assets (shared across installments)
│   ├── css/         # Main stylesheet
│   ├── images/      # Global images (e.g., logo, favicons)
│   └── js/          # Global JavaScript
├── 001/              # Installment 001
│   ├── assets/      # Installment-specific assets
│   ├── index.html   # Installment content
│   ├── local.css    # Installment-specific CSS (optional)
│   └── local.js     # Installment-specific JS (optional)
├── _config.yml      # Jekyll configuration
├── index.html       # Root page (renders latest installment)
└── Gemfile         # Ruby dependencies
```

## Customization

### Update Site Information
Edit `_config.yml` to update:
- Site title and tagline
- Author information
- Social links

### Modify Styling
- Colors and theme: `_sass/_variables.scss`
- Base styles: `_sass/_base.scss`
- Layout: `_sass/_layout.scss`

### Add Content
Edit `index.html` to modify the homepage content.

## Creating New Installments

This site uses an "installment chain" structure where each installment lives in a numbered directory (`/001/`, `/002/`, etc.). The root page (`/`) automatically renders the latest installment.

### How to Create a New Installment

1. **Create the installment directory** (zero-padded, 3 digits):
   ```bash
   mkdir 002
   ```

2. **Create the installment's `index.html`**:
   ```html
   ---
   layout: installment
   title: Your Installment Title
   description: Your installment description
   ---
   
   <!-- Your installment content here -->
   <div class="centered-content">
     <div class="content-wrapper">
       <!-- Your content -->
     </div>
   </div>
   ```

3. **Add installment-specific assets** (optional):
   - Create `002/assets/images/` for images
   - Create `002/assets/js/` for JavaScript
   - Create `002/assets/css/` for CSS (or use `local.css`)

4. **Customize navigation colors** (optional):
   Create `002/local.css` to theme the nav bar:
   ```css
   :root {
     --nav-bg: rgba(15, 20, 25, 0.8);
     --nav-border: rgba(43, 52, 64, 0.5);
     --nav-arrow-color: var(--text-muted);
     --nav-arrow-hover: var(--text-secondary);
     --nav-arrow-bg: rgba(0, 204, 255, 0.1);
     --nav-number-color: var(--text-muted);
   }
   ```

5. **Add installment-specific JavaScript** (optional):
   Create `002/local.js` for any custom behavior.

### Important Notes

- **Numbering**: Use zero-padded 3-digit numbers (`001`, `002`, `003`, etc.)
- **Assets**: 
  - Global assets (logo, favicons) live in `/assets/` and can be referenced from any installment
  - Installment-specific assets live in `/XXX/assets/`
- **Navigation**: The nav bar automatically computes prev/next based on installment numbers
- **Root page**: The root (`/`) always shows the latest (highest numbered) installment
- **Layout**: All installments use the `installment` layout which includes the nav bar

### Example Installment Structure

```
002/
├── index.html          # Main content (required)
├── local.css          # Nav theming (optional)
├── local.js           # Custom JS (optional)
└── assets/            # Installment assets (optional)
    ├── images/
    ├── js/
    └── css/
```

## License

Personal website - all rights reserved.

## Author

Travis Vocino
- Website: [vocino.com](https://vocino.com)
- Threads: [@vocino](https://threads.net/@vocino)
- Email: travis@vocino.com
