# Marvel Explorer (React + Vite)

A single-page React application built with Vite for browsing Marvel characters and comics.
---

## Live demo

[Live Demo](https://nazarsynchyna.github.io/marvel/)

---

## Key features

- Character listing with pagination
- Character detail view (description, homepage/wiki, comics list)
- Random character widget for discovery
- Comics list and single-comic preview components
- Loading skeletons and spinner components for async states
- Top-level ErrorBoundary component for render-time errors

---

## Tech stack

- React (client-side UI) 
- Vite (dev server & build)
- SCSS (Sass) for styling
- Marvel API accessed through a proxy/service wrapper (see src/services/MarvelService.jsx)
- Deployment helper: gh-pages

---

## Project structure (important files)

```
src/
  components/
    app/                # App root (App.jsx)
    appBanner/          # Banner/hero component
    appHeader/          # Header / navigation
    randomChar/         # Random character widget
    charList/           # Character list & items
    charInfo/           # Character detail view
    comicsList/         # Comics listing UI
    singleComic/        # Single comic detail view
    errorBoundary/      # Top-level ErrorBoundary component
    errorMessage/       # Reusable error message UI
    spinner/            # Spinner component
    skeleton/           # Skeleton placeholders
  services/
    MarvelService.jsx   # Centralized wrapper for API calls (currently includes hardcoded API base and key)
  resources/            # Static images / icons
  style/
    style.scss          # Global SCSS entry
  main.jsx              # App bootstrap (createRoot + render)
index.html
public/                 # Public static assets
package.json
vite.config.js
```

Notes:
- main.jsx bootstraps React and renders the app.
- The MarvelService wrapper is located at src/services/MarvelService.jsx and is the single place where API requests are composed.

---

## Getting started — local development

Prerequisites
- Node.js (LTS recommended)
- npm

Clone and install

```bash
git clone https://github.com/nazarSynchyna/marvel.git
cd marvel
npm install
```

Useful npm scripts (from package.json)

```json
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

Publish to GitHub Pages (if configured)

```bash
npm run deploy
```

---

## Environment and API configuration

Current state (what's in the repository)

- src/services/MarvelService.jsx currently defines the API base and API key inline. The file includes these default values:
  - _apiBase = "https://marvel-server-zeta.vercel.app/"
  - _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df"

Because those values are present in the client source, consider moving sensitive operations to a server-side proxy or use Vite environment variables for any public-only values.

Recommended secure configuration

- Do not commit private API keys. For client applications prefer:
  - Keep any private keys on a backend that signs requests.
  - For public-only keys or base URLs, use Vite env vars prefixed with VITE_ so they are injected at build time.

Suggested env var names (example)

```
VITE_MARVEL_API_BASE=https://your-proxy-or-api.example.com/
VITE_MARVEL_API_KEY=apikey=your_public_key_here
```

Example change to MarvelService to use Vite env vars (edit src/services/MarvelService.jsx):

```javascript
class MarvelService {
  _apiBase = import.meta.env.VITE_MARVEL_API_BASE || "https://marvel-server-zeta.vercel.app/";
  _apiKey = import.meta.env.VITE_MARVEL_API_KEY || "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
  _baseOffset = 0;

  /* ...rest of the class unchanged... */
}
export default MarvelService;
```

Create a local .env file for development (do NOT commit):

```
# .env.local
VITE_MARVEL_API_BASE=https://marvel-server-zeta.vercel.app/
VITE_MARVEL_API_KEY=apikey=d4eecb0c66dedbfae4eab45d312fc1df
```

Security note:
- If you need to use a private key (for example to calculate an MD5 hash with ts+privateKey+publicKey), do that on a backend — do not expose private keys in client-side code.

---

## Deployment

- The repository includes predeploy/deploy scripts in package.json which use gh-pages to publish the built `dist` directory.
- If deploying to GitHub Pages, ensure the `base` option in vite.config.js is set correctly for your repository path (for example, base: '/marvel/' if publishing at https://<username>.github.io/marvel/).

---

## Where to look next

- src/services/MarvelService.jsx — migrate hardcoded base/key to env vars or move signing logic to a server.
- Add a `.env.example` file to document required VITE_ variables without committing secrets.
- Add a GitHub Actions workflow to automate build and deploy to gh-pages if you want continuous deployment.
