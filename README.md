# Ved Verma — Portfolio

A React 18 single-page portfolio built with Vite, React Router, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL when the development server starts. To create and preview a production build:

```bash
npm run build
npm run preview
```

Run the linter with `npm run lint`.

## Contact form setup (EmailJS)

1. Copy `.env.example` to `.env.local`.
2. Create an EmailJS service and template. Use the template variables `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, and `{{message}}`.
3. Fill in the three `VITE_EMAILJS_*` values in `.env.local`.
4. Restart the Vite dev server or rebuild after changing environment values.
5. Add a public contact email to `contact.email` in `src/data/siteData.js` if you want the copy-email action enabled.

If EmailJS is not configured, the form validates its fields and explains that delivery is not set up yet; GitHub and LinkedIn links remain available. Never put an EmailJS private key in browser code.

## Portfolio content and assets

Portfolio content, project details, links, and timeline entries are maintained in `src/data/siteData.js`. The profile and hackathon photos are in `public/`, and the project galleries load screenshots from their respective folders below `src/assets/projects/`.

Project screenshot folders:

- URL Shortener: `src/assets/projects/url-shortener/`
- Link Tree clone: `src/assets/projects/link-tree/`
- Password Manager: `src/assets/projects/password-manager/`

Supported image files in those folders are discovered automatically. Additional remote screenshots can be listed in a project's `screenshots` array in `siteData.js`.

The resume download uses `person.resumePath` in `src/data/siteData.js`; keep the personal PDF at the matching path in `public/`.

## Project structure

- `src/components/` — shared navigation, layout, error boundary, and theme controls
- `src/context/` — persisted dark/light theme
- `src/pages/` — route-level page components
- `src/data/` — portfolio content (the single source of truth)
- `scripts/` — build-time SEO file generation
- `src/assets/projects/` — project screenshots
- `public/` — static files such as the resume and SEO files

## Deploy

The app uses React Router client-side routes; the SPA fallback files are included.

- **Vercel:** set the project root to `portfolio` (if deploying the `C:\Master` workspace repository), use `npm run build`, and set the output directory to `dist`. `vercel.json` rewrites app routes to `index.html`.
- **Netlify:** set the base directory to `portfolio` (if deploying the workspace repository), use `npm run build`, and publish `dist`. `public/_redirects` is copied into the build output and rewrites app routes to `index.html`.

After your host assigns the public domain, set `seo.siteUrl` in `src/data/siteData.js` to that origin and rebuild. This generates the canonical page URLs, sitemap, and sitemap reference in `robots.txt`; until then, the site omits domain-specific sitemap and canonical URLs. Set `seo.socialImage` if you have a public share-card image. Add the three EmailJS environment variables in the hosting dashboard to enable contact delivery in production.
