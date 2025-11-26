# vocino.com

Personal website for Travis Vocino - a modern, minimal landing page built with Jekyll and optimized for GitHub Pages.

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
├── _layouts/          # HTML templates
├── _sass/             # SCSS partials
├── assets/
│   └── css/          # Main stylesheet
├── _config.yml       # Jekyll configuration
├── index.html        # Homepage
└── Gemfile          # Ruby dependencies
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

## License

Personal website - all rights reserved.

## Author

Travis Vocino
- Website: [vocino.com](https://vocino.com)
- Threads: [@vocino](https://threads.net/@vocino)
- Email: travis@vocino.com
