# Accelerate Plumbing & Heating — Website

A fast, static marketing site for Accelerate Plumbing & Heating Ltd. (Prince George, BC).
Plain HTML, CSS, and a single vanilla-JavaScript file — no build step, no framework, no dependencies.

## Pages
- `index.html` — Home (hero quote form, services, stats, testimonials)
- `about.html` — About / owner story
- `plumbing.html` — Plumbing services
- `heating.html` — Heating & Hydronics
- `contact.html` — Contact + quote request form

## How it works
- Shared header and footer are baked into every page (edit them in all five files, or re-run the generator).
- `app.js` handles the mobile menu, the count-up stats, hover/focus styling, and the two forms.
- The Home and Contact forms validate in the browser, then open a pre-filled email to
  **acceleratepandh@gmail.com** (mailto). No server required.

## Editing content
Open any `.html` file in a text editor — all copy is plain text inside the markup.
To swap the placeholder photos (company van, owner portrait, job galleries), replace the
grey placeholder blocks with `<img>` tags pointing at real images in `assets/`.

## Deploy (Vercel)
This is a static site, so deployment is instant:
1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project → Import** the repo.
3. Framework preset: **Other**. No build command. Output directory: `.` (root).
4. Deploy. `vercel.json` enables clean URLs (`/about` instead of `/about.html`).

You can also drag this folder onto the Vercel dashboard to deploy without GitHub.

## Local preview
Open `index.html` directly in a browser, or run a tiny local server:
```
python3 -m http.server 8000
```
then visit http://localhost:8000

## Fonts & colors
- Display: Sora · Body: Plus Jakarta Sans (Google Fonts)
- Brand orange `#ee6a1e`, dark `#15171b`
