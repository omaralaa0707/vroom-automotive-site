# Vroom Automotive — site 23 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Vroom Automotive, and not an official site.**

- **Live:** https://vroom-automotive-site.vercel.app
- **Repo:** [vroom-automotive-site](https://github.com/omaralaa0707/vroom-automotive-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Their own wall, sampled from a daylight frame: terracotta timber slats lifted to #E8935E for text, a dark faceted-marble panel read as graphite #9FA19E, over a dark warm-charcoal ground #1B1613 — the wood is kept to accents and rules, never a whole surface, because a page that orange would fight the cars far more than a wall with one car standing in front of it does

**Type pairing**
: Unbounded + Work Sans / Reem Kufi + Cairo (AR)

**3D / signature technique**
: **The lattice**: their own faceted diamond wall panel rebuilt as a real instanced rhombus screen standing in front of a cover-fit photo plane, the two layers parallaxing at different rates under the pointer — walking-past-a-mashrabiya as an actual depth cue, not a filter

**Motion language**
: The glimpse — content is revealed by a diamond-shaped clip-path opening from a pinpoint to cover the block, the shape of one gap in the lattice; no fade, no travel

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/vroom.automotive/
- Facebook: https://www.facebook.com/Vroom.Automotive/
- Google Maps: https://www.google.com/maps/place/Vroom+Automotive/data=!4m2!3m1!1s0x0:0xfb679aed93d9703b

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
