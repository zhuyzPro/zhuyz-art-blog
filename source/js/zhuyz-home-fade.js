(function () {
  "use strict";

  var selector = "#page-header.full_page";
  var frameId = 0;
  var copyFadeStartRatio = 0.14;
  var copyFadeEndRatio = 0.3;
  var collapseStartRatio = 0.38;
  var handoffEndRatio = 0.66;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateFade() {
    frameId = 0;

    var header = document.querySelector(selector);
    if (!header) return;

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    var copyFadeStart = viewportHeight * copyFadeStartRatio;
    var copyFadeDistance = Math.max(viewportHeight * (copyFadeEndRatio - copyFadeStartRatio), 1);
    var copyProgress = clamp((window.scrollY - copyFadeStart) / copyFadeDistance, 0, 1);
    var collapseStart = viewportHeight * collapseStartRatio;
    var collapseDistance = Math.max(viewportHeight * (handoffEndRatio - collapseStartRatio), 1);
    var collapseProgress = clamp((window.scrollY - collapseStart) / collapseDistance, 0, 1);
    var nav = document.querySelector("#nav");
    var navHeight = nav ? nav.getBoundingClientRect().height : 0;
    // Keep the mountain visible while the header shortens. At the handoff point,
    // the AnZhiYu content sits directly below the fixed navigation.
    var maxCollapse = Math.max(viewportHeight * (1 - handoffEndRatio) - navHeight, 0);
    var collapseAmount = Math.round(maxCollapse * collapseProgress);

    header.style.setProperty("--zhuyz-hero-fade", collapseProgress.toFixed(3));
    header.style.setProperty("--zhuyz-hero-copy-opacity", (1 - copyProgress).toFixed(3));
    header.style.setProperty("--zhuyz-hero-collapse", collapseAmount + "px");
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
