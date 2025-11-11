<script>
(async function injectPartials(){
  async function inject(sel, url){
    const host = document.querySelector(sel);
    if (!host) return;
    try{
      const res = await fetch(url, { cache: 'no-store' });
      host.innerHTML = await res.text();
    }catch(e){
      host.innerHTML = '<div class="hint warn">載入失敗：'+(e.message||e)+'</div>';
    }
  }
  await inject('#site-header','header.html');
  await inject('#site-footer','footer.html');
})();
</script>
