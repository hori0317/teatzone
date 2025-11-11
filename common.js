<script>
// common.js
document.addEventListener("DOMContentLoaded", () => {
  // 取得目前頁面的檔名（例如 "about.html" → "about"）
  const file = location.pathname.split("/").pop().replace(/\.html?$/i, "") || "index";

  // 對應表：頁面名稱 → 中文標題
  const titleMap = {
    "index": "額度計算機",
    "payroll": "薪資計算機",
    "care-info": "長照相關資訊",
    "news": "最新公告",
    "contact": "聯繫方式",
    "about": "關於我們"
  };

  // 找到頂部標題元素
  const siteTitle = document.querySelector(".site-title");
  if (siteTitle) {
    siteTitle.textContent = titleMap[file] || "長照相關資訊";
  }

  // 同時也更新 <title>
  document.title = `${titleMap[file] || "長照相關資訊"}｜長照資訊系統`;

  // 導覽列高亮
  document.querySelectorAll(".nav-links a").forEach(a => {
    const target = a.getAttribute("href").replace(/\.html?$/i, "");
    if (target === file) a.classList.add("active");
  });
});

</script>
