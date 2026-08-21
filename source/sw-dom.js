"use strict";

document.addEventListener("DOMContentLoaded", function () {
  if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;

  const updateKey = "updated";
  const clearCacheNotice = () =>
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("AnZhiYuThemeCache")).map(key => caches.delete(key))));

  if (sessionStorage.getItem(updateKey)) {
    clearCacheNotice();
    sessionStorage.removeItem(updateKey);
    return;
  }

  navigator.serviceWorker.controller.postMessage("update");
  navigator.serviceWorker.addEventListener("message", function (event) {
    const data = event.data || {};
    sessionStorage.setItem(updateKey, data.type || "update");
    clearCacheNotice().then(() => {
      if (data.list && data.list.some(url => /\.(js|css)$/.test(url))) location.reload();
      else sessionStorage.removeItem(updateKey);
    });
  });
});
