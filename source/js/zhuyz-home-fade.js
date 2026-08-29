(function () {
  "use strict";

  var selector = "#page-header.full_page";
  var frameId = 0;
  var fadeEndRatio = 0.72;
  var copyFadeStartRatio = 0.16;
  var copyFadeEndRatio = 0.36;
  var collapseStartRatio = 0.5;
  var collapseEndRatio = 0.72;
  var collapseAmountRatio = 0.28;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateFade() {
    frameId = 0;

    var header = document.querySelector(selector);
    if (!header) return;

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    // Hand off to the AnZhiYu content before the hero has been scrolled away.
    var fadeDistance = Math.max(viewportHeight * fadeEndRatio, 1);
    var progress = clamp(window.scrollY / fadeDistance, 0, 1);
    var copyFadeStart = viewportHeight * copyFadeStartRatio;
    var copyFadeDistance = Math.max(viewportHeight * (copyFadeEndRatio - copyFadeStartRatio), 1);
    var copyProgress = clamp((window.scrollY - copyFadeStart) / copyFadeDistance, 0, 1);
    var collapseStart = viewportHeight * collapseStartRatio;
    var collapseDistance = Math.max(viewportHeight * (collapseEndRatio - collapseStartRatio), 1);
    var collapseProgress = clamp((window.scrollY - collapseStart) / collapseDistance, 0, 1);
    var nav = document.querySelector("#nav");
    var navHeight = nav ? nav.getBoundingClientRect().height : 0;
    var maxCollapse = Math.max(viewportHeight * collapseAmountRatio - navHeight, 0);
    var collapseAmount = Math.round(maxCollapse * collapseProgress);

    header.style.setProperty("--zhuyz-hero-fade", progress.toFixed(3));
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
