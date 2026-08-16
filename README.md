# Marvel Explorer (React + Vite)

A responsive single-page React app to browse Marvel characters and comics. The UI supports random character discovery, character lists, and detail/comic previews while providing loading skeletons and graceful error handling. It uses a small service wrapper (src/services/MarvelService.jsx) to fetch data from a backend API that proxies the Marvel Comics API.

I inspected:
- package.json — contains the exact npm scripts used in this project.
- src/services/MarvelService.jsx — uses a remote API base and embeds an API key string; README below documents how to configure this safely.

---

## Live demo

Live demo (placeholder)
- https://nazarSynchyna.github.io/marvel/

---

## Key features
- Character list with pagination
- Character detail page with description, homepage/wiki, and comics list
- Random character widget for discovery
- Comics list and single-comic preview components
- Loading skeletons and spinners for async states
- Global Error Boundary and UI-friendly error messages
- Responsive UI styled with SCSS
- Production build and GitHub Pages deploy support via gh-pages

---

## Tech stack
- React (client)
- Vite (dev server & build)
- SCSS (Sass) for styling
- Marvel Comics API (proxied by a server; service wrapper in src/services/MarvelService.jsx)
- Deployment: GitHub Pages (gh-pages)

---

## Project structure

```
src/
  components/
    app/                # App root (App.jsx)
    appBanner/          # Hero/banner component
    appHeader/          # Header/nav
    randomChar/         # Random character widget
    charList/           # Character list & items
    charInfo/           # Character detail view
    comicsList/         # Comics listing UI
    singleComic/        # Single comic detail view
    errorBoundary/      # Top-level ErrorBoundary component
    errorMessage/      # Reusable error message UI
    spinner/            # Spinner
    skeleton/           # Skeleton placeholders
  services/
    MarvelService.jsx   # Centralized wrapper for all API calls
  resources/            # Static images / icons
  style/
    style.scss          # Global SCSS entry
  main.jsx              # App bootstrap (createRoot + render)
index.html
public/                 # Public static assets
package.json
vite.config.js
```

How it fits together:
- main.jsx bootstraps React and renders App.jsx.
- App.jsx composes header/banner and main views and delegates data fetching to MarvelService.
- MarvelService.jsx calls the proxied API (see below) and normalizes API responses for UI components.
- Components show skeletons, spinners, or error messages while waiting for API responses.

---

## Getting started — local development

Prerequisites
- Node.js (LTS recommended, e.g., 18.x or newer)
- npm (default examples below use npm)

Clone and install
```bash
git clone https://github.com/nazarSynchyna/marvel.git
cd marvel
npm install
```

Exact npm scripts (from package.json)
```json name=package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Start dev server
```bash
npm run dev
```

Build production assets
```bash
npm run build
```

Preview production build locally
```bash
npm run preview
```

Deploy (uses gh-pages)
```bash
npm run deploy
```

Notes:
- The repo already includes gh-pages as a devDependency; the package.json predeploy + deploy scripts are configured to build and publish dist to GitHub Pages.

---

## Environment and API configuration

Current state (what I found)
- src/services/MarvelService.jsx currently hardcodes:
  - _apiBase = "https://marvel-server-zeta.vercel.app/"
  - _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df"
- That means the client calls a proxy server (https://marvel-server-zeta.vercel.app/) with an embedded api key string.

Recommended secure configuration (preferred)
- Do not commit private API keys. For a client-side app you should:
  - Keep sensitive keys/private keys on a server-side proxy that signs requests.
  - Or, if using a client public key only, keep it in environment variables prefixed with VITE_ so Vite exposes them to the client.

Suggested env var names (use these in .env files)
- VITE_MARVEL_API_BASE  — base URL of the proxy server or Marvel API proxy (e.g. https://your-proxy.example.com/)
- VITE_MARVEL_API_KEY   — query string or raw api key value (e.g. d4ee... )

Add a .env.local in project root (do not commit):
```text name=.env.local
VITE_MARVEL_API_BASE=https://marvel-server-zeta.vercel.app/
VITE_MARVEL_API_KEY=apikey=d4eecb0c66dedbfae4eab45d312fc1df
```

How to migrate MarvelService to use env vars
- Replace the hardcoded values with Vite env variables (example change):

```javascript name=src/services/MarvelService.jsx
class MarvelService {
  _apiBase = import.meta.env.VITE_MARVEL_API_BASE || "https://marvel-server-zeta.vercel.app/";
  _apiKey = import.meta.env.VITE_MARVEL_API_KEY || "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
  _baseOffset = 0;

  /* ...rest unchanged... */
}
export default MarvelService;
```

Important security note:
- If you need to use Marvel private key to compute MD5 hashes (ts+privateKey+publicKey), do that on a backend, not in the browser. The public key alone can be used for some read-only endpoints but check Marvel API docs. The repo currently points at a proxy server—verify whether that server performs signing on the server side.

---

## Deployment (GitHub Pages)

This repository already has preconfigured scripts:
- predeploy: builds the app
- deploy: uses gh-pages -d dist to publish the built site

Steps to publish from local machine:
1. Ensure homepage/base path is correct in vite.config.js (if deploying to https://<username>.github.io/<repo>/ set base: '/<repo>/' in vite.config.js).
2. Build & deploy:
```bash
npm run predeploy
npm run deploy
# or simply
npm run deploy
```

CI / GitHub Actions (recommended)
- Create a GitHub Actions workflow that runs `npm ci && npm run build` and publishes dist to gh-pages (or uses pages action). This automates deployment on pushes to main.

Vite base config example for GitHub Pages
```js
// vite.config.js
import { defineConfig } from 'vite'
export default defineConfig({
  base: '/marvel/', // change to your repo name if publishing at /<repo>/
  // other config...
})
```

---

## Error handling & edge cases

- Error Boundary: The app contains src/components/errorBoundary to catch render-time errors and show a fallback UI instead of an application crash.
- API error handling: MarvelService.getResource throws on non-ok responses; upper-level components catch errors and render src/components/errorMessage.
- Loading states: spinner and skeleton components reduce layout shifts and clearly indicate pending operations.
- Missing images/assets: components use fallbacks or placeholder images from public/ or src/resources when thumbnails are missing.
- Rate limiting & signs: If the API returns 429s or auth errors, components surface friendly messages and retry advice.
- Private key exposure: This README recommends using a backend proxy to avoid exposing private API keys.
