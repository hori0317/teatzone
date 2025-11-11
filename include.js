<script>
(function(){
  // 將 header/footer 注入頁面；同網域（GitHub / Cloudflare Pages）可直接 fetch
  async function inject(id, url, where='afterbegin'){
    if (document.getElementById(id)) return;
    const html = await fetch(url, {cache:'no-store'}).then(r=>r.text());
    const host = (id==='site-header') ? document.body : document.body;
    const wrap = document.createElement('div');
    wrap.id = id;
    wrap.innerHTML = html;
    if (id==='site-header') document.body.insertAdjacentElement('afterbegin', wrap);
    else document.body.insertAdjacentElement('beforeend', wrap);
  }

  function mountActionsFromTemplate(){
    const slot = document.getElementById('actions-slot');
    const tpl  = document.getElementById('actions-template');
    if (slot && tpl){
      const node = tpl.content ? tpl.content.cloneNode(true) : null;
      if (node) slot.replaceChildren(node);
      // 掛上之後移除 template，避免重複
      tpl.remove();
    } else if (slot && !tpl){
      // 沒有動作按鈕就放一個隱形佔位，維持頂欄對齊
      const ghost = document.createElement('div');
      ghost.className = 'actions-ghost';
      slot.replaceChildren(ghost);
    }
  }

  function navHighlight(){
    function norm(href){
      try{
        const u = new URL(href, location.origin);
        let p = u.pathname.trim();
        if (p.length>1 && p.endsWith('/')) p = p.slice(0, -1);
        p = p.replace(/\/(index\.html?)?$/i, '/index').replace(/\.html?$/i, '');
        const last = p.split('/').pop();
        return last.toLowerCase();
      }catch{ return ''; }
    }
    const here = norm(location.href);
    document.querySelectorAll('.nav-links a[href]').forEach(a=>{
      const t = norm(a.getAttribute('href')||'');
      if (t && t===here) a.classList.add('active');
    });
  }

  function fitVars(){
    // 依 header/footer 高度調整 CSS 變數（若你的 style.css 已做，這段無害）
    const topbar = document.querySelector('.topbar');
    const dock   = document.getElementById('bottomDock');
    if (topbar) document.documentElement.style.setProperty('--topbar-h', (topbar.offsetHeight||56)+'px');
    if (dock)   document.documentElement.style.setProperty('--dock-h', (dock.offsetHeight||56)+'px');
  }

  async function boot(){
    await inject('site-header', 'header.html');
    mountActionsFromTemplate();
    navHighlight();
    fitVars();

    await inject('site-footer', 'footer.html');
    fitVars();

    // 變動時重新調整
    const ro1 = new ResizeObserver(fitVars);
    const ro2 = new ResizeObserver(fitVars);
    const tb = document.querySelector('.topbar');
    const ft = document.getElementById('bottomDock');
    if (tb) ro1.observe(tb);
    if (ft) ro2.observe(ft);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
</script>
