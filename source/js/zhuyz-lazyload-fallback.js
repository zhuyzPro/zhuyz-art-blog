(function () {
  function loadImage(img) {
    var src = img.getAttribute("data-lazy-src");
    if (!src || img.getAttribute("src") === src) return;
    img.setAttribute("src", src);
    img.style.opacity = "1";
  }

  function loadVisibleImages() {
    var margin = window.innerHeight * 1.5;
    document.querySelectorAll("img[data-lazy-src]").forEach(function (img) {
      var rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight + margin && rect.bottom > -margin) loadImage(img);
    });
  }

  function initFallback() {
    if (window.lazyLoadInstance && typeof window.lazyLoadInstance.update === "function") {
      window.lazyLoadInstance.update();
      return;
    }
    loadVisibleImages();
  }

  window.addEventListener("load", initFallback);
  window.addEventListener("scroll", loadVisibleImages, { passive: true });
  document.addEventListener("pjax:complete", initFallback);
  setTimeout(initFallback, 1200);
})();

