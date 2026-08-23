'use strict';

const { slugize } = require('hexo-util');

const starterCategories = ['技术笔记', '项目记录', '生活随笔'];

const createPaginationData = (base, posts) => ({
  base,
  current: 1,
  current_url: base,
  next: 0,
  next_link: '',
  posts,
  prev: 0,
  prev_link: '',
  total: 1
});

hexo.extend.generator.register('empty-collections', function (locals) {
  const routes = [];
  const categoryDir = this.config.category_dir.replace(/\/?$/, '/');
  const existingCategories = new Set(locals.categories.data.map(category => category.name));

  if (!locals.posts.length) {
    const archiveDir = this.config.archive_dir.replace(/\/?$/, '/');
    routes.push({
      path: archiveDir,
      layout: ['archive', 'index'],
      data: {
        ...createPaginationData(archiveDir, locals.posts),
        archive: true
      }
    });
  }

  for (const name of starterCategories) {
    if (existingCategories.has(name)) continue;

    const path = `${categoryDir}${slugize(name, { transform: this.config.filename_case })}/`;
    routes.push({
      path,
      layout: ['category', 'archive', 'index'],
      data: {
        ...createPaginationData(path, locals.posts),
        category: name
      }
    });
  }

  return routes;
});
