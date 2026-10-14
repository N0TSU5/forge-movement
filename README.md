# Forge Movement website

React (Vite + React Router) site for Forge Movement, a Pilates studio in Digbeth, Birmingham.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Editing content

All copy lives in plain-text files in [`content/`](content/). See [`content/README.txt`](content/README.txt) for the format.
Photos go in `public/images/`, using the paths named in the content files. Until a photo exists, a labelled placeholder is shown.

Optional brand files:

- `public/images/logo-mark.png`: the "F" in the nav (also the favicon)
- `public/images/logo-lockup.png`: the FORGE MOVEMENT wordmark

## Momence

Set `momence_host_id` in `content/site.txt` to show the live timetable on `/schedule`.
Visitors filter by instructor with the Momence plugin's own dropdown.

## Deploying

This is a single-page app, so the host must serve `index.html` for every route (an SPA rewrite).

- **Cloudflare:** `npx wrangler deploy` (or `npm run deploy:cf`). [`wrangler.jsonc`](wrangler.jsonc) runs `npm run build` first, which builds for the domain root. Run `npx wrangler login` once first.
- **GitHub Pages:** `npm run deploy` builds with the `/forge-movement/` base path (GitHub serves the site from a subfolder) and pushes `dist/` to the `gh-pages` branch.

Research and design notes: [`docs/RESEARCH.md`](docs/RESEARCH.md).
