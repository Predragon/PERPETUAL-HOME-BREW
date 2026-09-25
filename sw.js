// The deploy workflow replaces VERSION with the commit hash so installed copies update.
const VERSION = "wpt-dev";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/fonts.css",
  "fonts/atkinson-hyperlegible-latin-3dfb9b.woff2",
  "fonts/atkinson-hyperlegible-latin-7cd82a.woff2",
  "fonts/atkinson-hyperlegible-latin-ext-45959b.woff2",
  "fonts/atkinson-hyperlegible-latin-ext-5e93bb.woff2",
  "fonts/atkinson-hyperlegible-latin-ext-ab0f02.woff2",
  "fonts/atkinson-hyperlegible-latin-fd943e.woff2",
  "fonts/bricolage-grotesque-latin-a97232.woff2",
  "fonts/bricolage-grotesque-latin-ext-a4fe79.woff2",
  "fonts/ibm-plex-mono-latin-a7544c.woff2",
  "fonts/ibm-plex-mono-latin-ext-b42080.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pages: network first so updates show up, cache when offline. Everything else: cache first.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
