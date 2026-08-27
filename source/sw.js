"use strict";

const CACHE_PREFIX = "AnZhiYuThemeCache";
const CACHE_NAME = `${CACHE_PREFIX}-v20260827-hero-fade-1`;
const LOCAL_HOST = "zhuyz.art";
const LOCAL_NETWORK_FIRST_RE = /\.(js|css)$/i;
const STATIC_ASSET_RE = /\.(woff2?|ttf|cur|png|jpe?g|svg|webp|gif|ico)$/i;
const CDN_ASSET_RE = /\.(js|css|woff2?|ttf|cur)$/i;

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      clients.claim(),
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
    ])
  );
});

const shouldCache = url => {
  if (url.hostname === LOCAL_HOST) return LOCAL_NETWORK_FIRST_RE.test(url.pathname) || STATIC_ASSET_RE.test(url.pathname);
  return ["cdn.cbd.int", "cdn.staticfile.org", "npm.elemecdn.com"].includes(url.hostname) && CDN_ASSET_RE.test(url.pathname);
};

const shouldBypassCache = (request, url) => {
  if (url.hostname !== LOCAL_HOST) return false;
  return request.mode === "navigate" || request.headers.get("accept")?.includes("text/html") || url.pathname === "/" || url.pathname.endsWith(".html");
};

const putCache = (cacheKey, response) => {
  if (response && response.ok) {
    caches.open(CACHE_NAME).then(cache => cache.put(cacheKey, response.clone()));
  }
  return response;
};

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || !request.url.startsWith("http")) return;

  const url = new URL(request.url);
  const cacheKey = url.href.endsWith("/index.html") ? url.href.slice(0, -10) : url.href;

  if (shouldBypassCache(request, url)) {
    event.respondWith(fetch(request).catch(() => caches.match(cacheKey)));
    return;
  }

  if (!shouldCache(url)) return;

  if (url.hostname === LOCAL_HOST && LOCAL_NETWORK_FIRST_RE.test(url.pathname)) {
    event.respondWith(fetch(request).then(response => putCache(cacheKey, response)).catch(() => caches.match(cacheKey)));
    return;
  }

  event.respondWith(
    caches.match(cacheKey).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => putCache(cacheKey, response));
    })
  );
});

self.addEventListener("message", event => {
  if (event.data !== "update") return;
  event.source &&
    event.source.postMessage({
      type: "update",
      new: { global: "20260827-hero-fade-1", local: "20260827-hero-fade-1" },
      list: [
        "/css/zhuyz-home.css?v=20260827-hero-fade-1",
        "/js/zhuyz-home-fade.js?v=20260827-hero-fade-1"
      ]
    });
});
