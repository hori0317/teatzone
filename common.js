<script>
(function(){
  if (window.__COMMON_BOOT__) return; // 防重複
  window.__COMMON_BOOT__ = true;

  function norm(href){
    try{
      const u = new URL(href, location.origin);
      let p = u.pathname.trim();
      if (p.length>1 && p.endsWith('/')) p = p.slice(0, -1);
      p = p.replace(/\/(index\.html?)?$/i, '/index').replace(/\.html?$/i, '');
      return p.split('/').pop().toLowerCase();
    }catch{ return ''; }
  }

  function highlightNav(){
    const here = norm(location.href);
    document.querySelectorAll('.nav-links a[href]').forEach(a=>{
      const t = norm(a.getAttribute('href')||'');
      if (t && t===here) a.classList.add('active');
    });
  }

  function fitVars(){
    const topbar = document.querySelector('.topbar');
    const dock   = document.getElementById('bottomDock');
    if (topbar) document.documentElement.style.setProperty('--topbar-h', (topbar.offsetHeight||56)+'px');
    if (dock)   document.documentElement.style.setProperty('--dock-h', (dock.offsetHeight||56)+'px');
  }

  function observeResize(){
    const tb = document.querySelector('.topbar');
    const ft = document.getElementById('bottomDock');
    if (window.ResizeObserver){
      const ro = new ResizeObserver(fitVars);
      tb && ro.observe(tb);
      ft && ro.observe(ft);
    }
  }

  function boot(){
    highlightNav();
    fitVars();
    observeResize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
</script>
