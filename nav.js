(function(){
  const LABELS = {
    'index': '額度計算機',
    'payroll': '薪資計算機',
    'care-info': '長照相關資訊',
    'news': '最新公告',
    'contact': '聯繫方式',
    'about': '關於我們'
  };

  function currentSlug(){
    const bodyAttr = document.body?.dataset?.page;
    if (bodyAttr) return bodyAttr.toLowerCase();
    const path = (location.pathname.split('/').pop() || '').toLowerCase();
    const slug = path.replace(/\.html?$/i, '');
    return slug || 'index';
  }

  function cleanHref(href){
    if (!href) return '';
    const trimmed = href.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('#')) return trimmed.toLowerCase();
    return trimmed
      .replace(/^\.\//, '')
      .replace(/#.*/, '')
      .replace(/\/$/, '')
      .replace(/\/index$/i, '/index.html')
      .replace(/\.html?$/i, '')
      .toLowerCase() || 'index';
  }

  function syncNav(){
    const slug = currentSlug();
    const titleEl = document.querySelector('.site-title[data-sync-title]');
    if (titleEl && LABELS[slug]){
      titleEl.textContent = LABELS[slug];
    }

    document.querySelectorAll('.nav-links a[href]').forEach(link => {
      const href = link.getAttribute('href');
      const key = cleanHref(href);
      let active = false;

      if (key.startsWith('#')){
        const hash = (location.hash || '').toLowerCase();
        active = hash === key;
      } else {
        active = (key || 'index') === slug;
      }

      link.classList.toggle('active', active);
      if (active){
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', syncNav);
  window.addEventListener('hashchange', syncNav);
  window.addEventListener('popstate', syncNav);
})();
