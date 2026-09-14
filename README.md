# RoastLink ☕

> **Jejak kopi yang bisa diverifikasi, dari petani hingga cangkir.**
> A landing page for a blockchain-based coffee supply-chain traceability product — every cup has a story that can be proven.

RoastLink tracks the journey of coffee beans from farmer to cup using blockchain. The landing page demonstrates the concept with a scannable QR demo, a four-stage supply-chain timeline with mock on-chain records (tx hash, block, timestamp, location), and an animated farmer-fairness stats section — all in Bahasa Indonesia.

---

## Features

| Section | Component | What it shows |
|---|---|---|
| Navbar | `Navbar` | Brand + anchor links (Jejak Rantai, Transparansi Petani, Cara Kerja) |
| Hero / Cara Kerja | `Hero` + `QRScanDemo` + `ScanPreview` | Asymmetric split hero; right side is a generated SVG QR code with a sweeping scan line that reveals the bean's 4-stage journey |
| Jejak Rantai | `SupplyTimeline` | Horizontal timeline **Petani → Roaster → Distributor → Kedai Anda**, each stage opens an "on-chain card" with mock tx hash, block number, timestamp, and location |
| Transparansi Petani | `FarmerStats` | Animated count-up stats: +47% farmer income, 38% vs 12% retail-price share, Rp 62.500 vs Rp 42.000/kg, 1.284 partner farmers, 26 cooperatives |
| Footer | `Footer` | Brand line + closing |

- **Motion-first** — built with [Motion](https://motion.dev) (`motion/react`), with in-view count-ups and staged reveals.
- **Accessible motion** — every animation degrades to a static state under `prefers-reduced-motion` (`useReducedMotion`).
- **No QR library** — the QR visual is a deterministic seeded SVG (`mulberry32` PRNG + finder patterns), so it never reflows between renders.
- **SEO-ready** — Indonesian `lang="id"` metadata, OpenGraph tags, and keywords in `app/layout.tsx`.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router, TypeScript)
- **UI:** React 19
- **Styling:** Tailwind CSS 4 (`@tailwindcss/postcss`)
- **Animation:** Motion 11 (`motion/react`)
- **Icons:** Phosphor Icons (`@phosphor-icons/react`)
- **Fonts:** Playfair Display (serif headlines), Inter (body), JetBrains Mono (data/on-chain labels) — via `next/font/google`

## Getting Started

**Prerequisites:** Node.js 20.9+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |

## Project Structure

```
RoastLink/
├── app/
│   ├── layout.tsx        # Root layout: fonts, lang="id", SEO metadata
│   ├── page.tsx          # Home: Navbar → Hero → SupplyTimeline → FarmerStats → Footer
│   └── globals.css       # Tailwind 4 entry + design tokens (CSS variables)
├── components/
│   ├── Navbar.tsx        # Sticky top navigation
│   ├── Hero.tsx          # Headline + CTAs + QRScanDemo (id="cara-kerja")
│   ├── QRScanDemo.tsx    # Scan-line animation + staged journey reveal
│   ├── ScanPreview.tsx   # Deterministic SVG QR code (seeded, no library)
│   ├── SupplyTimeline.tsx# 4-stage chain timeline + on-chain detail cards (id="jejak")
│   ├── FarmerStats.tsx   # In-view animated count-up stats (id="petani")
│   └── Footer.tsx        # Footer
├── lib/
│   └── data.ts           # All mock data + types (SUPPLY_STEPS, FARMER_STATS, NAV_LINKS, BRAND)
├── next.config.ts        # Remote image patterns (picsum.photos placeholders)
└── package.json
```

## Roadmap

This repo is currently a front-end landing page with mock data. The plan to turn it into a real, shippable platform — backend, auth, real QR codes, on-chain anchoring, pilot phases — lives in [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Mock Data Disclaimer

All content in `lib/data.ts` is **illustrative sample data, not real on-chain records**. Transaction hashes, block numbers, prices, dates, and names are invented for demo purposes. There is **no backend, wallet integration, or actual blockchain** — this is a front-end landing page only. Editing `lib/data.ts` is the single place to change every number, stage, and label on the page.

## Customization

1. **Content / numbers** — edit `lib/data.ts` (supply stages, stats, nav links, tagline).
2. **Theme** — design tokens (colors, fonts, `headline-serif` / `data-mono` utility classes) live as CSS variables in `app/globals.css`.
3. **Metadata** — page title, description, and OpenGraph in `app/layout.tsx`.
4. **Images** — remote placeholder images are configured for `picsum.photos` in `next.config.ts`.

## Deployment

The easiest deploy is [Vercel](https://vercel.com/new) (zero-config for Next.js), or run the production build yourself:

```bash
npm run build
npm start
```

## License

Released under the [MIT License](LICENSE).
