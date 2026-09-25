# Wild Peel Tonic

A guide to a perpetual fermented electrolyte drink made from black tea, cabbage brine and fruit peels. Includes flavor combos, kefir drinks, a red-cabbage pH test and troubleshooting.

Static site, no build step. Installable as an offline app (manifest + service worker). Fonts are self-hosted so it works with no internet.

## Deploy

```bash
npx wrangler pages deploy . --project-name wild-peel-tonic
```

When you change any file, bump `VERSION` in `sw.js` so installed copies update.
