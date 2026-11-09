# NMMILE '26

Website for NMMILE 2026, hosted by New Millennium School, Bahrain.

The landing page opens on a small walkable assembly floor: steer the delegate with WASD, the arrow keys or a tap, walk up to a council banner and press E to enter that council's page.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

Almost everything you will want to change lives in `src/content/`. No component code needs touching.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, dates, venue, email, Instagram, registration link, theme text, stats, schedule, FAQs, nav |
| `councils.ts` | Every council: abbreviation, name, level, colour, agenda, chairs, study guide link |
| `secretariat.ts` | Secretariat and faculty, with optional photos |
| `gallery.ts` | Gallery photos and captions |

Common jobs:

- **Announce the dates:** set `startsAt` in `site.ts` to an ISO date such as `"2026-12-12T08:00:00+03:00"`. The hero switches to a live countdown.
- **Open registration:** set `registrationOpen: true` and paste the form link into `registerUrl`.
- **Add or rename a council:** edit `councils.ts`. The 3D hall, the councils grid and the council pages are generated from that list. Keep it between 4 and 10 councils so the hall stays readable.
- **Release an agenda:** add strings to a council's `agenda` array and a `guideUrl` for the study guide PDF (put PDFs in `public/guides/`).
- **Add team photos:** put images in `public/team/` and set `photo: "/team/name.jpg"`.

## Structure

```
src/
  app/                  pages (App Router)
    councils/[slug]/    one page per council
  components/
    hall/               the 3D assembly floor (three.js via react-three-fiber)
      scene.tsx         world, booths, player movement, camera
      delegate.tsx      the low-poly delegate figure
      textures.ts       banners, placards and floor drawn on canvas at runtime
  content/              everything editable
```

The hall uses no model files or image downloads: every object is built from primitives and every texture is drawn at runtime, so it stays light. On phones and low-core machines it drops shadows and floating paper. Without WebGL it falls back to a row of council pennants.

## Design notes

- Type: Instrument Serif for display, DM Sans for text.
- Palette: paper `#f3eee3`, ink `#1b1a17`, seal red `#b3261e`, sea `#2e5e5a`, brass `#c8892b`. Defined once in `src/app/globals.css`.
- Section labels are numbered like resolution clauses. Keep copy short and plain.

## Deploy

Import the repository on Vercel. No environment variables are needed.
