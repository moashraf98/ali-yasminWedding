# Ali & Yasmin Wedding Invitation

An editable Arabic RTL wedding invitation built with React, TypeScript, and Vite.

## Features

- Full-screen invitation cover with reveal animation
- Local couple photos and background slideshow
- Arabic RTL typography and responsive layout
- Countdown to the wedding date
- Background music playlist with playback controls
- Quick greeting messages
- Guestbook greetings with no WhatsApp integration
- Optional shared greetings API support

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build and preview

```bash
npm run typecheck
npm run build
npm run preview
```

## GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Push the `main` branch.
4. In the repository settings, open **Pages** and choose **GitHub Actions** as the source.
5. The included workflow will build and publish the invitation.

The workflow automatically uses the repository name as the Pages base path.

## Guestbook storage

By default, greetings are saved in the visitor's browser using `localStorage`. This works on a static GitHub Pages deployment without any server.

To use a shared guestbook, set `VITE_API_BASE_URL` to a separately hosted API that provides:

- `GET /api/greetings`
- `POST /api/greetings` with `{ "name": "...", "message": "..." }`

The API must allow requests from the deployed website and return greeting objects with `id`, `name`, and `message`.

## Project structure

- `src/App.tsx` — invitation page and interactions
- `src/index.css` — visual styling and responsive rules
- `public/assets/images/` — couple photos
- `public/assets/music/` — invitation music
- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages deployment