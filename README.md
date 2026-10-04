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
Add each instructor's `momence_teacher_id` to enable the instructor filter.

## Deploying

This is a single-page app, so the host must serve `index.html` for every route (an SPA rewrite).

Research and design notes: [`docs/RESEARCH.md`](docs/RESEARCH.md).
