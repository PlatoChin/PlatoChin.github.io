// 代表專案資料(來源:碩益顧問 Resume 202112)
const projects = [
  ["某科技廠", "SAP ERP 導入專案及系統維運(MM 顧問/維運窗口)", "sap"],
  ["某科技廠", "SAP ERP 系統維護(維運窗口)", "sap"],
  ["某化妝品製造廠 A", "ERP 導入專案(導入顧問)", "erp"],
  ["某化妝品製造廠 B", "ERP 導入專案(導入顧問)", "erp"],
  ["某箱包製造廠", "ERP 導入專案(導入顧問)", "erp"],
  ["某包裝廠 A", "ERP 導入專案(導入顧問)", "erp"],
  ["某化妝品製造廠 C", "ERP 導入專案(導入顧問)", "erp"],
  ["某包裝廠 B", "ERP 導入專案(導入顧問)", "erp"],
  ["某跨國量販業 A", "跨國量販系統導入專案(導入顧問)", "retail"],
  ["某跨國量販業 B", "會員系統升級整合專案(導入顧問)", "retail"],
  ["某跨國量販業 B", "商店街系統開發導入專案(導入顧問)", "retail"],
  ["某物流業者 A", "統倉系統導入專案(導入顧問)", "retail"],
  ["某生鮮食品工廠", "SAP 生鮮工廠導入專案(導入顧問)", "sap"],
  ["某物流業者 B", "SAP 統倉系統導入專案(導入顧問)", "sap"],
  ["某連鎖超市", "SAP ERP 系統維護(維運窗口)", "sap"],
  ["某電子組裝廠", "SAP ERP 系統維護(MM 維運顧問)", "sap"],
];

const list = document.getElementById("projects");
function render(filter) {
  list.replaceChildren();
  projects
    .filter(p => filter === "all" || p[2] === filter)
    .forEach(([name, role]) => {
      const li = document.createElement("li");
      const b = document.createElement("b");
      const s = document.createElement("span");
      b.textContent = name;
      s.textContent = role;
      li.append(b, s);
      list.append(li);
    });
}
render("all");

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    render(btn.dataset.filter);
  });
});

// 深色模式(記住選擇)
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
} catch (e) {}
document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// 捲動顯示動畫 + 數字跳動
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("show");
    e.target.querySelectorAll("[data-count]").forEach(el => {
      const end = +el.dataset.count;
      let n = 0;
      const t = setInterval(() => {
        n += Math.max(1, Math.round(end / 20));
        if (n >= end) { n = end; clearInterval(t); }
        el.textContent = n;
      }, 40);
    });
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
