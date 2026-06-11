# Kunga Basics — Public Portal Website

Public marketing & legal site for Kunga Basics (Privacy Policy, Terms of
Service, Support/FAQ, About). Built with React + Vite + react-router-dom.

Visitor analytics tracking is wired in via `src/lib/track.js`, which posts
pageview/event beacons to `POST /api/v1/analytics/track` with
`source: 'portal'` — feeding the "Visitor Analytics" dashboard in
kunga-admin-portal.

## Local development

```bash
npm install
npm run dev
```

The dev server runs on **http://localhost:5190** and proxies `/api` requests
to `http://localhost:3001` (kunga-api running locally).

## Build

```bash
npm run build
```

## Deploy (Docker)

```bash
docker compose up --build -d
```

Runs nginx on `127.0.0.1:8081`. Add a host nginx reverse-proxy block for
`kungabasics.com` → `127.0.0.1:8081`, similar to the
`admin.kungabasics.com` setup documented in `kunga-admin-portal/README.md`.

## Pages

- `/` — Home / landing page
- `/about` — About Kunga Basics
- `/support` — Support, FAQ, contact info
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

## SEO

Each page renders a `<Seo>` component (`src/components/Seo.jsx`, via
react-helmet-async) that sets the title, meta description, canonical URL,
and Open Graph / Twitter card tags. Pages also embed JSON-LD structured
data where relevant:

- Home — `Organization` + `MobileApplication`
- Support — `FAQPage` (covers both the parent-focused topics and the
  app/account FAQs)

`public/sitemap.xml` and `public/robots.txt` list the canonical pages above
under the `kungabasics.com` domain — update both if routes are added,
removed, or renamed.
