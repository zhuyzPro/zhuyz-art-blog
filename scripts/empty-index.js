'use strict';

// hexo-generator-index omits the root route when there are no published posts.
hexo.extend.generator.register('empty-index', function (locals) {
  if (locals.posts.length > 0) return;

  return {
    path: '',
    layout: ['index', 'archive'],
    data: {
      __index: true,
      base: '',
      current: 1,
      current_url: '',
      next: 0,
      next_link: '',
      posts: locals.posts,
      prev: 0,
      prev_link: '',
      total: 1
    }
  };
});
