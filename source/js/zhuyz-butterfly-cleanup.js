(function () {
  'use strict';

  var cachePrefix = 'AnZhiYuThemeCache';

  function isLegacyRegistration(registration) {
    return [registration.active, registration.waiting, registration.installing].some(function (worker) {
      return worker && new URL(worker.scriptURL).pathname === '/sw.js';
    });
  }

  async function clearLegacyThemeCache() {
    if ('serviceWorker' in navigator) {
      try {
        var registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.filter(isLegacyRegistration).map(function (registration) {
          return registration.unregister();
        }));
      } catch (_) {
        // A cleanup failure must not affect the static site.
      }
    }

    if ('caches' in window) {
      try {
        var keys = await caches.keys();
        await Promise.all(keys.filter(function (key) {
          return key.indexOf(cachePrefix) === 0;
        }).map(function (key) {
          return caches.delete(key);
        }));
      } catch (_) {
        // Cache Storage may be unavailable in a private browsing context.
      }
    }
  }

  void clearLegacyThemeCache();
}());
