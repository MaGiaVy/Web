// ============================================================
// KHUNG TRANG QUẢN TRỊ: thanh bên + thanh trên (giống nhau ở mọi trang admin)
// ============================================================
(function () {
  const activePage = document.body.dataset.adminPage;
  const title = document.body.dataset.title || "Quản trị";
  const crumb = document.body.dataset.crumb || "";
  const pending = ORDERS.filter((o) => o.status === "pending").length;

  const links = [
    ["dashboard", "index.html", "dashboard", "Tổng quan"],
    ["products", "products.html", "box", "Sản phẩm"],
    ["users", "users.html", "users", "Người dùng"],
    ["orders", "orders.html", "orders", "Đơn hàng", pending],
    ["statistics", "statistics.html", "chart", "Thống kê"],
  ];

  const sidebar = document.getElementById("admin-sidebar");
  sidebar.outerHTML = `
    <aside class="sidebar">
      <a class="brand" href="index.html">
        <img src="${asset("images/logo.svg")}" alt="Logo DVK Gunpla">
        <span class="brand-text"><b>DVK <em>GUNPLA</em></b><small>Trang quản trị</small></span>
      </a>
      <div class="side-label">Quản lý</div>
      <nav class="side-nav">
        ${links.map(([key, href, ic, label, badge]) =>
          `<a href="${href}" class="${activePage === key ? "active" : ""}">${icon(ic)} ${label}${badge ? `<span class="badge">${badge}</span>` : ""}</a>`).join("")}
      </nav>
      <div class="side-label">Khác</div>
      <nav class="side-nav">
        <a href="../index.html" target="_blank">${icon("store")} Xem trang bán hàng</a>
      </nav>
      <div class="side-foot side-nav">
        <a href="#" data-admin-logout>${icon("logout")} Đăng xuất</a>
      </div>
    </aside>`;

  const days = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const now = new Date();
  const today = `${days[now.getDay()]}, ${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

  document.getElementById("admin-topbar").outerHTML = `
    <header class="admin-topbar">
      <div>
        <div class="crumb">Quản trị${crumb ? " / " + crumb : ""}</div>
        <h1>${title}</h1>
      </div>
      <div class="right">
        <span class="date">${icon("calendar")} ${today}</span>
        <div class="admin-user">
          <span class="avatar">A</span>
          <div><b>Admin DVK</b><small>Quản trị viên</small></div>
        </div>
        <button class="icon-btn" title="Đăng xuất" data-admin-logout>${icon("logout")}</button>
      </div>
    </header>`;

  document.querySelectorAll("[data-admin-logout]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const ok = await confirmDialog({ title: "Đăng xuất?", message: "Bạn có chắc muốn đăng xuất khỏi trang quản trị?", okText: "Đăng xuất" });
      if (ok) toastThenGo("login.html", "Đăng xuất thành công", "Hẹn gặp lại!");
      else toast("Đã hủy đăng xuất", "", "info");
    });
  });
})();
