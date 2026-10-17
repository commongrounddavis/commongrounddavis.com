/* Offline shell for navigations when the network is unreachable. */
const CACHE = "cgd-offline-v2";
const PRECACHE = [
  "/offline.html",
  "/offline.css",
  "/logo.svg",
  "/fonts/source-sans-3.woff2",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => {}))),
    ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))).then(() =>
        self.clients.claim(),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  try {
    const url = new URL(request.url);
    const path = url.pathname;
    if (url.origin === self.location.origin && PRECACHE.includes(path)) {
      event.respondWith(
        caches.match(path, { cacheName: CACHE }).then((hit) => hit || fetch(request)),
      );
      return;
    }
  } catch {
    /* ignore */
  }

  if (request.mode !== "navigate") return;

  event.respondWith(
    fetch(request).catch(() =>
      caches.match("/offline.html", { cacheName: CACHE }).then((shell) => {
        if (shell) return shell;
        throw new Error("offline");
      }),
    ),
  );
});
