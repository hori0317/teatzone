<script>
/* 導覽：依當前網址自動高亮（支援 /page 與 page.html） */
(function(){
  function norm(href){
    try{
      const u = new URL(href, location.origin);
      let p = u.pathname.trim();
      if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
      p = p.replace(/\/(index\.html?)?$/i, '/index').replace(/\.html?$/i, '');
      const parts = p.split('/'); return (parts[parts.length-1]||'').toLowerCase();
    }catch(e){ return ''; }
  }
  const here = norm(location.href);
  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.nav-links a[href]').forEach(a=>{
      const target = norm(a.getAttribute('href'));
      if (target && target === here) a.classList.add('active');
    });
  });
})();

/* 版頭／版腳避位（可選） */
(function(){
  function adjustDockPadding(){
    const dock = document.getElementById('bottomDock');
    const h = dock ? (dock.offsetHeight || 0) : 0;
    document.documentElement.style.setProperty('--dock-h', h + 'px');
  }
  function adjustTopbarPadding(){
    const topbar = document.querySelector('.topbar');
    const h = topbar ? (topbar.offsetHeight || 0) : 0;
    document.documentElement.style.setProperty('--topbar-h', h + 'px');
  }
  window.addEventListener('resize', ()=>{ adjustTopbarPadding(); adjustDockPadding(); });
  window.addEventListener('orientationchange', ()=>{ adjustTopbarPadding(); adjustDockPadding(); });
  document.addEventListener('DOMContentLoaded', ()=>{
    adjustTopbarPadding(); adjustDockPadding();
    const dock = document.getElementById('bottomDock');
    if(window.ResizeObserver && dock){ new ResizeObserver(()=>adjustDockPadding()).observe(dock); }
    const topbar = document.querySelector('.topbar');
    if(window.ResizeObserver && topbar){ new ResizeObserver(()=>adjustTopbarPadding()).observe(topbar); }
  });
})();

/* 簡易防拷（如需）*/
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && ['u','s','p'].includes(e.key.toLowerCase())) e.preventDefault();
  if (e.key === 'F12') e.preventDefault();
});
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
</script>
