# vocino.com

Personal website for Travis Vocino built with Jekyll and deployed on Cloudflare Pages.

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

This site is deployed on Cloudflare Pages. Changes pushed to the `master` branch automatically trigger a new build and deployment.

### Cloudflare Pages Configuration

- **Production branch**: `master`
- **Build command**: `bundle exec jekyll build`
- **Build directory**: `_site`

## Project Structure

```
.
├── _layouts/         # HTML templates
├── _sass/            # SCSS partials
├── assets/           # Static assets
│   ├── css/         # Stylesheets
│   ├── images/      # Images (logo, favicons, etc.)
│   └── js/          # JavaScript
├── _config.yml      # Jekyll configuration
├── index.html       # Homepage
├── about.html       # About page
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
Edit `index.html` or create new pages to add content.

## License

Personal website - all rights reserved.

## Author

Travis Vocino
- Website: [vocino.com](https://vocino.com)
- Threads: [@vocino](https://threads.net/@vocino)
- Email: travis@vocino.com
