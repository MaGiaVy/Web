// ============================================================
// HEADER & FOOTER DÙNG CHUNG CHO TẤT CẢ TRANG KHÁCH HÀNG
// Mỗi trang chỉ cần đặt <div id="site-header"></div> và <div id="site-footer"></div>
// => header giống nhau 100% trên mọi trang
// ============================================================

function renderHeader() {
  const holder = document.getElementById("site-header");
  if (!holder) return;
  const user = currentUser();
  const page = document.body.dataset.page || "";
  const cat = getParam("cat");
  const q = page === "products" ? getParam("q") || "" : "";

  const navItem = (href, label, active, extra = "") =>
    `<a href="${href}" class="${active ? "active" : ""}">${extra}${label}</a>`;

  const nav = [
    navItem("index.html", "Trang chủ", page === "home", icon("home")),
    navItem("products.html", "Tất cả sản phẩm", page === "products" && !cat && getParam("q") === null, icon("grid")),
    ...CATEGORIES.map((c) =>
      navItem(`products.html?cat=${c.id}`, c.id === "TOOL" ? "Dụng cụ & Sơn" : c.name, page === "products" && cat === c.id)),
  ].join("");

  holder.outerHTML = `
  <div class="topbar">
    <div class="container">
      <div class="topbar-left">
        <span>${icon("phone")} Hotline: 1900 6868</span>
        <span>${icon("truck")} Miễn phí giao hàng cho đơn từ 1.000.000đ</span>
      </div>
      <div class="topbar-right">
        <a href="orders.html">${icon("orders")} Tra cứu đơn hàng</a>
        <a href="admin/login.html">${icon("dashboard")} Trang quản trị</a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="header-main">
      <div class="container">
        <a class="brand" href="index.html" aria-label="DVK Gunpla - Trang chủ">
          <img src="images/logo.svg" alt="Logo DVK Gunpla">
          <span class="brand-text"><b>DVK <em>GUNPLA</em></b><small>Gundam Model Store</small></span>
        </a>
        <form class="header-search" id="header-search" action="products.html" method="get" role="search">
          ${icon("search")}
          <input type="text" name="q" id="header-search-input" value="${escapeHtml(q)}" placeholder="Tìm mô hình Gundam, dụng cụ... (vd: Unicorn, Sazabi)" autocomplete="off">
          <button type="submit">Tìm kiếm</button>
        </form>
        <div class="header-actions">
          <div class="user-menu" id="user-menu">
            <button class="header-action" id="user-menu-btn" type="button" aria-haspopup="true">
              <span class="avatar" id="header-avatar">${initials(user.name)}</span>
              <span class="header-action-text"><small>Xin chào,</small><b id="header-user-name">${escapeHtml(user.name)}</b></span>
              ${icon("chevronDown")}
            </button>
            <div class="dropdown" role="menu">
              <div class="dropdown-head"><b id="dropdown-user-name">${escapeHtml(user.name)}</b><small>${escapeHtml(user.email)}</small></div>
              <a href="account.html">${icon("user")} Tài khoản của tôi</a>
              <a href="account.html#addresses">${icon("map")} Sổ địa chỉ</a>
              <a href="orders.html">${icon("orders")} Lịch sử mua hàng</a>
              <button type="button" class="danger" data-logout>${icon("logout")} Đăng xuất</button>
            </div>
          </div>
          <a class="header-action" href="cart.html" aria-label="Giỏ hàng">
            <span class="cart-icon-wrap">${icon("cart")}<span class="cart-badge" id="cart-badge">${cartCount()}</span></span>
            <span class="header-action-text"><small>Giỏ hàng</small><b>${cartCount()} sản phẩm</b></span>
          </a>
        </div>
      </div>
    </div>
    <nav class="header-nav">
      <div class="container">
        ${nav}
        <a href="advanced-search.html" class="nav-right ${page === "advanced-search" ? "active" : ""}">${icon("sliders")} Tìm kiếm nâng cao</a>
      </div>
    </nav>
  </header>`;

  // Menu tài khoản
  const menu = document.getElementById("user-menu");
  document.getElementById("user-menu-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) menu.classList.remove("open");
  });

  // Ô tìm kiếm trên header
  document.getElementById("header-search").addEventListener("submit", () => {
    const value = document.getElementById("header-search-input").value.trim();
    toast("Đang tìm kiếm...", value ? `Từ khóa: “${escapeHtml(value)}”` : "Hiển thị tất cả sản phẩm", "info");
  });

  bindLogout(document.querySelector(".site-header"));
}

function bindLogout(scope = document) {
  scope.querySelectorAll("[data-logout]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const ok = await confirmDialog({ title: "Đăng xuất?", message: "Bạn có chắc muốn đăng xuất khỏi tài khoản này không?", okText: "Đăng xuất" });
      if (ok) toastThenGo("login.html", "Đăng xuất thành công", "Hẹn gặp lại bạn!");
      else toast("Đã hủy đăng xuất", "", "info");
    });
  });
}

function renderFooter() {
  const holder = document.getElementById("site-footer");
  if (!holder) return;
  holder.outerHTML = `
  <footer class="site-footer">
    <div class="container footer-top">
      <div class="footer-brand">
        <a class="brand" href="index.html">
          <img src="images/logo.svg" alt="Logo DVK Gunpla">
          <span class="brand-text"><b>DVK <em>GUNPLA</em></b><small>Gundam Model Store</small></span>
        </a>
        <p>Cửa hàng mô hình Gundam chính hãng Bandai: HG, RG, MG, PG, SD cùng dụng cụ và sơn chuyên dụng cho người chơi Gunpla.</p>
      </div>
      <div>
        <h4>Danh mục</h4>
        <ul>${CATEGORIES.map((c) => `<li><a href="products.html?cat=${c.id}">${c.id === "TOOL" ? "Dụng cụ & Sơn" : `${c.name} (${c.id})`}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Hỗ trợ</h4>
        <ul>
          <li><a href="orders.html">Lịch sử mua hàng</a></li>
          <li><a href="account.html">Tài khoản của tôi</a></li>
          <li><a href="cart.html">Giỏ hàng</a></li>
          <li><a href="advanced-search.html">Tìm kiếm nâng cao</a></li>
          <li><a href="admin/login.html">Trang quản trị</a></li>
        </ul>
      </div>
      <div>
        <h4>Liên hệ</h4>
        <ul class="footer-contact">
          <li>${icon("map")} <span>273 An Dương Vương, Phường 3, Quận 5, TP. Hồ Chí Minh</span></li>
          <li>${icon("phone")} <span>1900 6868 (8:00 - 21:00)</span></li>
          <li>${icon("mail")} <span>hotro@dvkgunpla.vn</span></li>
          <li>${icon("users")} <span>Nhóm thực hiện: Đạt - Vỹ - Khang</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <span>© 2026 DVK Gunpla - Đồ án Lập trình Web</span>
        <span>Giao diện mẫu - dữ liệu minh họa</span>
      </div>
    </div>
  </footer>`;
}

renderHeader();
renderFooter();
