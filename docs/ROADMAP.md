# RoastLink — Future Development & Ship Plan

> From mock landing page to a real, shippable coffee-traceability platform.

## Current State

The repo today is a **front-end only landing page** (`app/` + `components/`):

- All "on-chain" data is mock (`lib/data.ts` — invented tx hashes, blocks, prices, stats).
- No backend, no database, no auth, no real QR codes, no blockchain.
- Deployable as a static-ish Next.js 16 site.

Everything below is the path to shipping the real product.

---

## 1. What "Real Ship" Means — the MVP

**One sentence:** a roaster can register a coffee batch, record each handoff from farmer to café, and any consumer can scan the bag's QR code to see the verified journey — with every stage anchored so it cannot be silently rewritten.

### Actors and what they do

| Actor | Does |
|---|---|
| Farmer / cooperative | Registered by an admin (most rural users won't self-serve); harvest events created on their behalf |
| Roaster | Creates batches, records roasting profile, prints bag QR codes |
| Distributor | Confirms receipt/shipment (temperature, weight) |
| Café / consumer | Scans QR → public verification page (no login) |
| Admin (RoastLink) | Onboards partners, oversees the chain, handles disputes |

### MVP scope (cut ruthlessly)

1. Auth + roles for 3 internal actor types
2. Batch lifecycle: `harvest → processing → roasting → shipping → received`
3. Immutable event log per batch (append-only, hash-chained)
4. Real QR generation (encodes `roastlink.id/b/<batchId>`)
5. Public consumer scan page — mobile-first, no login, works on WhatsApp's in-app browser
6. Landing page (this repo) rewritten to use **real** data for featured batches

**Explicitly out of MVP:** payments/settlement, token, farmer app, multi-language, public explorer.

---

## 2. Target Architecture

```
Consumer phone ──scan──▶ /b/[batchId]  (public, ISR-cached, no auth)
                                   │
Roaster/Café dashboards ──▶ Next.js App Router (Vercel)
                                   │
                        Route Handlers / server actions
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
  Postgres (Neon)          Vercel Blob (batch           Anchor worker:
  batches, events,         photos, signed QR            batch-event Merkle
  actors, price records    PDFs)                        root → EVM chain
```

**Core trust design — "hash-chain first, chain-anchoring second."** The source of truth is an append-only event table where each event stores the hash of the previous one. This alone makes tampering detectable. Anchoring periodic Merkle roots on a public blockchain is a later, additive layer — you do **not** need a token or full on-chain storage to be credible. See [Key Decisions](#3-key-decisions).

---

## 3. Key Decisions

| # | Decision | Recommendation |
|---|---|---|
| 1 | Blockchain strategy | **Off-chain hash-chained log + on-chain anchoring** of Merkle roots. Full on-chain storage is unnecessary and expensive. |
| 2 | Which chain (for anchoring) | Decide at Phase 3. Criteria: tx fee < $0.01, stable EVM tooling (viem), long-term survivability. Candidates: Base, Polygon PoS. Avoid anything token-linked — regulatory noise in Indonesia (Bappebti) for zero product benefit. |
| 3 | Offline reality of rural Aceh/etc. | Events are often entered by **coop staff on behalf of farmers**, from a phone with bad signal → the data-entry UI must be a **PWA with offline queue** (background sync when signal returns). |
| 4 | Verification UX | Scan lands on a read-only page; no wallet, no popup, no crypto jargon. "Blockchain" appears once, as a block-explorer link. |
| 5 | IDs | Batch ID as short human-readable code (`RL-2026-0042`) printed with the QR — QR fails/scratches, humans still type. |

---

## 4. Phased Roadmap

Estimates assume **one full-time developer**; halve with two.

### Phase 0 — Hardening (≈ 1 week)
- [ ] CI: GitHub Actions — `npm run build` + typecheck on every push
- [ ] Testing setup: Vitest + React Testing Library; first tests on `lib/data.ts` consumers
- [ ] ESLint config + Prettier
- [ ] Environments: `vercel env` for all secrets; `.env.example` committed
- [ ] Preview deployments enabled (Vercel does this automatically per-PR)

### Phase 1 — MVP Platform (≈ 4–6 weeks)
- [ ] Postgres via Vercel Marketplace (**Neon** — serverless Postgres; `vercel integration add neon`) + Drizzle ORM + migrations
- [ ] Auth — **Clerk** (native Vercel Marketplace integration, roles/organizations built in; alternatives: Auth0, Supabase Auth) + role middleware
- [ ] Batch + event API (server actions), append-only enforcement at the DB level
- [ ] Dashboards: batch list, new event form, batch detail with timeline (reuse `SupplyTimeline` design)
- [ ] Real QR: `qrcode` npm package → SVG → Vercel Blob; batch sticker sheet PDF for roasters
- [ ] Public `/b/[batchId]` page: ISR, OG image with the journey, block-explorer link stub
- [ ] Rewrite landing `lib/data.ts` to read a real featured batch (keep mock as fallback)
- [ ] Resend (Marketplace) for transactional email — batch-verified notifications

### Phase 2 — Pilot with One Cooperative (≈ 4 weeks, overlaps field work)
- [ ] PWA: service worker + offline event queue (IndexedDB), sync indicator
- [ ] Big-button, low-literacy-friendly data entry (icons over text, Bahasa only)
- [ ] Photo capture per event (cherry, green bean, roast) → Vercel Blob
- [ ] Admin onboarding flow + training material for one coop (e.g. a Gayo cooperative)
- [ ] Checkly (Marketplace) synthetic monitoring on the public scan page — it's the revenue-critical path
- [ ] Observability: Sentry or Vercel Observability
- [ ] Pilot success metric: **50 real batches fully traced, scan page loads < 2 s on 3G**

### Phase 3 — Public Verification + On-Chain Anchoring (≈ 3 weeks)
- [ ] Merkle root of each week's events anchored to chosen EVM chain (viem, cold wallet in env/KMS)
- [ ] Verification: recompute Merkle proof server-side → show explorer link on scan page
- [ ] Public verification API + simple `/verify` page for third parties (buyers, certifiers)
- [ ] Public explorer-lite: recent batches, coop count, total kg traced

### Phase 4 — Scale & Revenue (open-ended)
- [ ] Price-transparency module: record farmgate price per batch → power the FarmerStats claims with **real** numbers
- [ ] Settlement integration (Stripe via Marketplace for card-side; local rails: QRIS/Midtrans — custom, not marketplace)
- [ ] Multi-coop onboarding, id/en i18n
- [ ] Certifier exports (Fairtrade / Rainforest Alliance audit packs)
- [ ] Farmer-facing lightweight view (WhatsApp bot or SMS summary — farmers check via feature phone)

---

## 5. Core Data Model

```ts
actors      (id, type: coop|roaster|distributor|cafe, name, region, clerk_org_id)
batches     (id, code "RL-2026-0042", variety, altitude_masl, coop_id, current_stage)
events      (id, batch_id, actor_id, stage, payload_json, photo_urls[],
             prev_event_hash, own_hash)            -- append-only, hash-chained
prices      (id, batch_id, currency, amount, price_point: farmgate|fob|retail)
anchors     (id, period, merkle_root, chain, tx_hash, block, anchored_at)
```

DB-level rules: `events` has **no UPDATE/DELETE grant**; `own_hash = sha256(prev_event_hash + canonical(payload))`. Anchoring verifies the whole chain without trusting RoastLink's servers.

---

## 6. Recommended Stack

| Layer | Pick | Why |
|---|---|---|
| Hosting | Vercel (current) | Zero-config Next.js 16, preview deploys |
| Database | **Neon** Postgres (Marketplace) | Serverless, branching for dev/staging |
| ORM | Drizzle | Light, SQL-shaped, great TS inference |
| Auth | **Clerk** (Marketplace) | Roles + organizations out of the box; fastest path to multi-actor auth |
| File storage | Vercel Blob | Photos + QR/PDF assets, signed URLs |
| QR | `qrcode` npm | Real QR, no lib bloat |
| Chain client (Phase 3) | viem | EVM reads/writes without web3 bloat |
| Email | Resend (Marketplace) | Simple transactional email |
| Monitoring | Checkly (Marketplace) + Sentry | Scan page is the money path |
| Validation | Zod | Every event payload validated before hashing |

---

## 7. Non-Functional Requirements

- **Privacy / law:** Indonesian **UU PDP** (Personal Data Protection) applies to farmer names/photos. Store minimal PII, get written consent at coop onboarding, publish only coop-level (not individual) data on public pages.
- **Performance:** scan page must be LCP < 2.5 s on a mid-range Android over 3G — ISR + tiny JS budget; the QR page gets **no** client-side animation libs.
- **Accessibility & literacy:** icon-led UI for data entry; all public copy Bahasa Indonesia first.
- **Security:** role checks in server actions (never trust the client); rate-limit the public scan endpoint; signed Blob URLs; secrets only via `vercel env`.
- **Testing:** unit-test the hash-chain functions exhaustively (they are the trust core); E2E the scan flow with Playwright.
- **i18n:** `id` default, `en` for buyers/certifiers from Phase 4.

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| Coop staff don't adopt the tool | Enter data *for* them during pilot; WhatsApp-in photos accepted and normalized by admin |
| "Blockchain" reads as greenwashing | Anchor real roots, show explorer links, publish the verification method openly |
| Garbage-in events destroy trust | Admin review queue before an event becomes publicly visible |
| Chain/vendor lock-in | Event log is plain Postgres + canonical JSON; anchoring is additive and swappable |
| Solo-dev scope creep | Anything not in MVP scope (§1) waits for Phase 4 — no exceptions mid-pilot |

---

## 9. Start Here (this week)

1. Enable CI: add `.github/workflows/ci.yml` running `npm ci && npm run build`
2. `vercel link` in this repo, then `vercel integration add neon` to provision Postgres
3. Scaffold the schema: `batches` + `events` tables with the hash-chain columns
4. Build the one screen that proves the product: **public `/b/[batchId]` page** fed by real data
