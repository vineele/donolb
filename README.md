# DonoLB

A self-contained Next.js donation leaderboard exported from the live DonoLB app.

## Run locally

```bash
pnpm install
pnpm run dev
```

## Deploy to Netlify

This project is configured as a static Next.js export and does not require a server or API.

1. Upload this folder to a Git repository or drag the ZIP contents into a new Netlify site.
2. In Netlify, use `pnpm run build` as the build command and `out` as the publish directory. These values are already included in `netlify.toml`.
3. Netlify will install the dependencies, build the static site, and serve the generated pages.

You can also build it locally with:

```bash
pnpm install
pnpm run build
```

The deployable output is written to `out/`.

The source-export link is disabled in this copy through `.env.local` and has no Replit API dependency.
Your profile, bracket, card, background, accent, and custom CSS settings are stored in browser localStorage.
