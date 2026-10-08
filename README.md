# Marvel Explorer (React + Vite)

A single-page React application built with Vite for browsing Marvel characters and comics through a routed information portal.

---

## Live demo

[Live Demo](https://nazarsynchyna.github.io/marvel/)

---

## Key features

- Character listing with paginated “load more” requests
- Keyboard-accessible character selection with focus management
- Character detail view with description, homepage, wiki link, and related comics
- Character search by name with Formik form state and Yup validation
- Random character widget with manual refresh and automatic refresh every 15 seconds
- Comics listing with pagination, prices, thumbnails, and links to comic detail pages
- Single character and single comic routes with dynamic page content
- Client-side routing with React Router and a dedicated 404 page
- Lazy-loaded pages and layouts with a top-level `Suspense` fallback
- Dynamic page metadata (`title` and `description`) through React Helmet
- Shared process-state rendering for waiting, loading, confirmed, and error states
- Reusable loading spinner, skeleton, and error message components
- Error boundaries around major sections of the main page
- Animated character-list items using `react-transition-group`
- Image fallback handling for unavailable Marvel thumbnails
- Memoized character-list content generation with `useMemo`
- GitHub Pages deployment support through `gh-pages`

---

## Tech stack

- React 19 (client-side UI)
- React DOM 19
- Vite 8 (development server and production build)
- React Router DOM 7 (client-side routing)
- React Helmet (document metadata)
- Formik and Yup (search form state and validation)
- PropTypes (component prop validation)
- React Transition Group (list enter animations)
- SCSS via Sass (styling)
- Marvel API accessed through a custom service hook and server-side proxy (see `src/services/MarvelService.jsx`)
- ESLint 10 with React Hooks and React Refresh plugins
- `gh-pages` (GitHub Pages deployment)

---

## Project structure (important files)

```
src/
  components/
    app/
      App.jsx                         # Router, lazy routes, and Suspense boundary
    appBanner/
      appBanner.jsx
      appBanner.scss                  # Comics-page banner
    appHeader/
      appHeader.jsx
      appHeader.scss                  # Main navigation
    charInfo/
      charInfo.jsx
      charInfo.scss                   # Selected character details
    charList/
      charList.jsx
      charList.scss                   # Paginated character list and transitions
    charSearchForm/
      charSearchForm.jsx
      charSearchForm.scss             # Formik/Yup character search
    comicsList/
      comicsList.jsx
      comicsList.scss                 # Paginated comics list
    errorBoundary/
      errorBoundary.jsx               # Render-time error boundary
    errorMessage/
      error.gif
      errorMessage.jsx                # Error-state UI
    pages/
      404.jsx                         # Not-found page
      ComicsPage.jsx                  # Comics route
      MainPage.jsx                    # Characters portal
      SinglePage.jsx                  # Shared data-loading wrapper
      index.jsx                       # Page exports
      singleCharacterLayout/
        singleCharacterLayout.jsx
        singleCharacterLayout.scss    # Character detail layout
      singleComicLayout/
        singleComicLayout.jsx
        singleComicLayout.scss        # Comic detail layout
    randomChar/
      randomChar.jsx
      randomChar.scss                 # Random character widget
    skeleton/
      skeleton.jsx
      skeleton.scss                   # Loading placeholder
    spinner/
      spinner.jsx                     # Loading spinner
  hooks/
    http.hook.jsx                     # Fetch wrapper and process state
  resources/
    img/                              # Static Marvel-themed images
  services/
    MarvelService.jsx                 # API hook and response transformations
  style/
    button.scss                       # Shared button styles
    style.scss                        # Global SCSS entry point
    variables.scss                    # Shared style variables
  utils/
    setContent.jsx                    # Process-state-to-component helper
  main.jsx                            # React application bootstrap
public/
  favicon.ico
index.html
package.json
vite.config.js
```

Notes:
- `src/main.jsx` imports the global styles and mounts the React application.
- `App.jsx` uses `BrowserRouter` with the Vite base URL, lazy-loaded route components, and a `Suspense` spinner fallback.
- The main routes are `/`, `/comics`, `/comics/:id`, and `/characters/:id`; unmatched paths render the 404 page.
- `MarvelService.jsx` is a custom hook that uses `useHttp`, requests character and comic data, and transforms API responses for the UI.
- `useHttp` exposes the current process state (`waiting`, `loading`, `confirmed`, or `error`), while `setContent` maps those states to loading, success, and error components.

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

Run ESLint

```bash
npm run lint
```

Preview production build locally

```bash
npm run preview
```

Publish to GitHub Pages

```bash
npm run deploy
```

---

## Environment and API configuration

Current state (what's in the repository)

- `src/services/MarvelService.jsx` currently uses the following inline configuration:
  - `_apiBase = "https://marvel-server-zeta.vercel.app/"`
  - `_apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df"`
- Requests are sent through the proxy endpoints `characters` and `comics`.
- The service adds pagination parameters (`limit` and `offset`) and transforms API responses into the data shapes consumed by the components.
- The client currently exposes the API key in the bundled source. Treat it as public and rotate or replace it if it provides access to a protected resource.

Recommended secure configuration

- Do not commit private API keys. Keep private Marvel credentials and request-signing logic on a backend or proxy.
- If a base URL or public-only key must be configured in the client, use Vite environment variables prefixed with `VITE_`.
- Add a `.env.example` file for documented variable names and keep local secrets in `.env.local`.

Suggested env var names (example)

```
VITE_MARVEL_API_BASE=https://your-proxy-or-api.example.com/
VITE_MARVEL_API_KEY=apikey=your_public_key_here
```

The service is implemented as a hook, so an environment-variable migration would update its constants rather than replace a class:

```javascript
const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase =
    import.meta.env.VITE_MARVEL_API_BASE ||
    "https://marvel-server-zeta.vercel.app/";
  const _apiKey =
    import.meta.env.VITE_MARVEL_API_KEY ||
    "apikey=your_public_key_here";

  // getAllCharacters, getCharacter, getCharacterByName,
  // getAllComics, and getComic use these values for requests.
};
```

Security note:
- If a private key is required to calculate an MD5 hash using `ts + privateKey + publicKey`, perform that calculation on a backend. Never expose private keys in client-side code.

---

## Deployment

- The repository includes `predeploy` and `deploy` scripts that build the application and publish the `dist` directory with `gh-pages`.
- `vite.config.js` sets `base: "/marvel/"`, matching the repository's GitHub Pages URL.
- The Vite development server is configured to use polling, which can help file watching in containerized or virtualized environments.

---

## Where to look next

- Move the API base URL and key out of `MarvelService.jsx` and document the final environment-variable setup.
- Add automated tests for API transformations, process-state rendering, pagination boundaries, search validation, and route-level behavior.
- Add a GitHub Actions workflow to run lint/build checks and automate GitHub Pages deployment.
- Consolidate duplicated local `setContent` implementations in list components with the shared `src/utils/setContent.jsx` helper.
- Correct inconsistent import path casing and component filename casing so the project behaves consistently on case-sensitive file systems.
- Improve request cancellation and stale-response handling when users navigate or submit searches rapidly.

---

## Author

**Nazar Synchyna**
