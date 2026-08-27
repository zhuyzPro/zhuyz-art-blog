(function () {
  "use strict";

  var selector = "#page-header.full_page";
  var frameId = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateFade() {
    frameId = 0;

    var header = document.querySelector(selector);
    if (!header) return;

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    var fadeDistance = Math.max(viewportHeight * 0.9, 1);
    var progress = clamp(window.scrollY / fadeDistance, 0, 1);

    header.style.setProperty("--zhuyz-hero-fade", progress.toFixed(3));
  }

  function scheduleFade() {
    if (frameId) return;
    frameId = window.requestAnimationFrame(updateFade);
  }

  window.addEventListener("scroll", scheduleFade, { passive: true });
  window.addEventListener("resize", scheduleFade, { passive: true });
  document.addEventListener("DOMContentLoaded", scheduleFade, { once: true });
  document.addEventListener("pjax:complete", scheduleFade);

  scheduleFade();
})();
