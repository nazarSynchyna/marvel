# Marvel Explorer

A responsive React + Vite app for browsing Marvel characters and comics. It includes character lists, random character discovery, comic previews, loading states, and friendly error handling.

## Features
- Browse Marvel characters with pagination
- View character details and related comics
- Discover a random character
- See comic previews
- Responsive UI with SCSS
- Loading skeletons, spinners, and error messages

## Tech stack
- React
- Vite
- SCSS
- Marvel API proxy/service layer
- GitHub Pages deploy support

## Getting started
```bash
git clone https://github.com/nazarSynchyna/marvel.git
cd marvel
npm install
npm run dev
```

## Available scripts
```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run deploy
```

## Deployment
The project is configured for GitHub Pages via `gh-pages`.

If you deploy to GitHub Pages, make sure the Vite base path matches your repo name in `vite.config.js`.

## Notes
- Keep API keys out of the client when possible.
- Use environment variables for configuration if you want to avoid hardcoding values.
- Check the console if something breaks during development.

## Project structure
- `src/components/` — UI components
- `src/services/` — API/service logic
- `src/style/` — global SCSS
- `public/` — static assets
- `vite.config.js` — Vite config
- `package.json` — scripts and dependencies
