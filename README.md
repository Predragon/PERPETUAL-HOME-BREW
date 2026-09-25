# Wild Peel Tonic

Live: https://perpetual-home-brew.pages.dev

A guide to a perpetual fermented electrolyte drink made from black tea, cabbage brine and fruit peels. Includes flavor combos, kefir drinks, a red-cabbage pH test and troubleshooting.

Static site, no build step. Installable as an offline app (manifest + service worker). Fonts are self-hosted so it works with no internet.

## Deploy

Every push to `main` deploys to the Cloudflare Pages project `perpetual-home-brew` through `.github/workflows/deploy.yml`. The workflow stamps `sw.js` with the commit hash, so installed copies pick up the new version on their next online visit.

The repo needs two Actions secrets: `CLOUDFLARE_API_TOKEN` (with Cloudflare Pages: Edit permission) and `CLOUDFLARE_ACCOUNT_ID`.

To deploy by hand without GitHub:

```bash
rm -rf /tmp/phb && mkdir /tmp/phb
git archive HEAD index.html sw.js manifest.webmanifest fonts icons | tar -x -C /tmp/phb
npx wrangler pages deploy /tmp/phb --project-name perpetual-home-brew --branch main
```
