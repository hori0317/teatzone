<script>
(async function(){
  async function inject(id, url){
    const el = document.getElementById(id);
    if(!el) return;
    try{
      const res = await fetch(url, { cache: 'no-cache' });
      el.innerHTML = await res.text();
    }catch(e){
      el.innerHTML = '<div style="color:#b00020;font-weight:700;">無法載入 '+url+'</div>';
    }
  }
  await inject('__header', 'header.html');
  await inject('__footer', 'footer.html');
})();
</script>
