# AL-SHARRYF Pickles

Next.js (App Router) + Bun + Tailwind CSS v4, with Framer Motion, GSAP (ScrollTrigger) and Lenis smooth scrolling.

## Run

```bash
bun install
bun dev          # http://localhost:3000
bun run build && bun start
```

## Edit content

- Prices, flavours, descriptions: `src/data/products.ts` (prices are placeholders in TZS)
- Phone, email, socials, domain: `src/data/site.ts`
- Set `NEXT_PUBLIC_SITE_URL=https://your-domain` for correct canonical, sitemap and OG URLs

## SEO included

Metadata + Open Graph + Twitter cards, JSON-LD (LocalBusiness, WebSite, Product/Offer with TZS prices), `sitemap.xml`, `robots.txt`, web manifest, semantic HTML, optimised `next/image`.
