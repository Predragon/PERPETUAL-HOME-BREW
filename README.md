# Wild Peel Tonic

Live: https://perpetual-home-brew.pages.dev

A guide to a perpetual fermented electrolyte drink made from black tea, cabbage brine and fruit peels. Includes flavor combos, kefir drinks, a red-cabbage pH test and troubleshooting.

Static site, no build step. Installable as an offline app (manifest + service worker). Fonts are self-hosted so it works with no internet.

## Deploy

Deploys to Cloudflare Pages project `perpetual-home-brew`. Upload only the site files, not `.git`:

```bash
rm -rf /tmp/phb && mkdir /tmp/phb
git archive HEAD index.html sw.js manifest.webmanifest fonts icons | tar -x -C /tmp/phb
npx wrangler pages deploy /tmp/phb --project-name perpetual-home-brew --branch main
```

When you change any file, bump `VERSION` in `sw.js` so installed copies update.
