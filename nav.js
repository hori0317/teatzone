document.addEventListener("DOMContentLoaded", () => {
  // 1. 取得目前 body 設定的頁面 ID (例如 data-page="video")
  const pageID = document.body.getAttribute("data-page");

  // 2. 取得所有的選單連結
  const links = document.querySelectorAll(".nav-links a");

  // 3. 比對連結，並加上 active
  links.forEach(link => {
    // 取得連結的 href (例如 "video.html")
    const href = link.getAttribute("href");
    
    // 移除 .html 副檔名，只留檔名 (例如 "video")
    // 如果 href 是空或 # 就不處理
    if(!href || href === "#") return;

    const linkPage = href.replace(".html", "").toLowerCase();

    // 判斷邏輯：
    // 如果 body 的 data-page 等於連結檔名 -> 亮起
    // 特殊情況：首頁 index 也要對應 index
    if (pageID === linkPage || (pageID === "index" && linkPage === "index")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
