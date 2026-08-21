(() => {
  const ROOT_SELECTOR = '[data-project-center]';

  function initProjectCenter() {
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (root.dataset.projectCenterReady === 'true') return;
      root.dataset.projectCenterReady = 'true';

      const tabs = Array.from(root.querySelectorAll('[data-project-filter]'));
      const search = root.querySelector('[data-project-search]');
      const cards = Array.from(root.querySelectorAll('[data-project-card]'));

      let activeFilter = 'all';

      const update = () => {
        const query = (search?.value || '').trim().toLocaleLowerCase();
        let visibleCount = 0;

        cards.forEach((card) => {
          const typeMatches = activeFilter === 'all' || card.dataset.projectType === activeFilter;
          const textMatches = !query || (card.dataset.projectSearch || '').toLocaleLowerCase().includes(query);
          const visible = typeMatches && textMatches;
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });

        root.classList.toggle('is-empty', visibleCount === 0);
      };

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          activeFilter = tab.dataset.projectFilter || 'all';
          tabs.forEach((item) => {
            const active = item === tab;
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-selected', String(active));
          });
          update();
        });
      });

      search?.addEventListener('input', update);
      update();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectCenter, { once: true });
  } else {
    initProjectCenter();
  }

  document.addEventListener('pjax:complete', initProjectCenter);
  document.addEventListener('pjax:success', initProjectCenter);
})();
