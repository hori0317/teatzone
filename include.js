<script>
(function(){
  if (window.__INCLUDE_BOOT__) return;
  window.__INCLUDE_BOOT__ = true;

  async function inject(id, url, position){
    if (document.getElementById(id)) return;
    const html = await fetch(url, {cache:'no-store'}).then(r=>r.text());
    const wrap = document.createElement('div');
    wrap.id = id;
    wrap.innerHTML = html;
    document.body.insertAdjacentElement(position || 'afterbegin', wrap);
  }

  function mountActionsFromTemplate(){
    const slot = document.getElementById('actions-slot');
    const tpl  = document.getElementById('actions-template');
    if (slot && tpl){
      const node = tpl.content ? tpl.content.cloneNode(true) : null;
      if (node) slot.replaceChildren(node);
      tpl.remove();
    } else if (slot && !tpl){
      const ghost = document.createElement('div');
      ghost.className = 'actions-ghost';
      slot.replaceChildren(ghost);
    }
  }

  async function boot(){
    await inject('site-header', 'header.html', 'afterbegin');
    mountActionsFromTemplate();
    await inject('site-footer', 'footer.html', 'beforeend');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
</script>
