<script>
(async function(){
  // 決定 header 檔案：若 body 有 data-header="lite" → 載入 header-lite.html
  const headerType = document.body.dataset.header === 'lite'
    ? 'header-lite.html'
    : 'header.html';

  async function inject(id, url){
    const el = document.getElementById(id);
    if(!el) return;
    try{
      const res = await fetch(url, { cache: 'no-cache' });
      el.innerHTML = await res.text();
    }catch(e){
      el.innerHTML = `<div style="color:#b00020;font-weight:700;">無法載入 ${url}</div>`;
    }
  }

  // 載入 header / footer
  await inject('__header', headerType);
  await inject('__footer', 'footer.html');
})();
</script>
