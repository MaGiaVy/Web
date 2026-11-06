// ============================================================
// HEADER & FOOTER DÙNG CHUNG CHO TẤT CẢ TRANG KHÁCH HÀNG
// Mỗi trang chỉ cần đặt <div id="site-header"></div> và <div id="site-footer"></div>
// => header giống nhau 100% trên mọi trang
// ============================================================
const LOGIN_KEY = "dvk_logged_in";
function isLoggedIn() {
  try { return sessionStorage.getItem(LOGIN_KEY) === "1"; } catch (e) { return false; }
}
function setLoggedIn(value) {
  try { value ? sessionStorage.setItem(LOGIN_KEY, "1") : sessionStorage.removeItem(LOGIN_KEY); } catch (e) { /* bỏ qua */ }
}

// Trang bắt buộc đăng nhập: chưa đăng nhập thì chuyển về trang đăng nhập
// Tên các trang riêng tư, dùng cho thông báo ở trang đăng nhập
const PRIVATE_PAGES = {
  account: "Tài khoản của tôi",
  orders: "Lịch sử mua hàng",
  "order-detail": "Chi tiết đơn hàng",
  checkout: "Thanh toán",
  "order-success": "Đặt hàng thành công",
};
(function guardPrivatePages() {
  const current = document.body.dataset.page;
  if (PRIVATE_PAGES[current] && !isLoggedIn()) {
    // Ghi nhớ trang đang muốn xem (kèm ?id=... nếu có) để đăng nhập xong quay lại đúng trang đó
    location.replace(page("login.html") + "?redirect=" + encodeURIComponent(current + location.search));
  }
})();

// Đọc tham số redirect trên trang đăng nhập: chỉ chấp nhận các trang riêng tư ở trên
function loginRedirectTarget() {
  const value = getParam("redirect");
  if (!value) return null;
  const [name, query = ""] = value.split("?");
  if (!PRIVATE_PAGES[name]) return null;
  return { label: PRIVATE_PAGES[name], href: `${name}.html${query ? "?" + query : ""}` };
}

function renderHeader() {
  const holder = document.getElementById("site-header");
  if (!holder) return;
  const user = currentUser();
  const loggedIn = isLoggedIn();
  const currentPage = document.body.dataset.page || "";
  const cat = getParam("cat");
  const q = currentPage === "products" ? getParam("q") || "" : "";

  const navItem = (href, label, active, extra = "") =>
    `<a href="${href}" class="${active ? "active" : ""}">${extra}${label}</a>`;

  const nav = [
    navItem(page("index.html"), "Trang ch\u1ee7", currentPage === "home", icon("home")),
    navItem(page("products.html"), "T\u1ea5t c\u1ea3 m\u00f4 h\u00ecnh", currentPage === "products" && !cat && getParam("q") === null, icon("grid")),
    `<div class="nav-drop">
      <button type="button" class="nav-drop-btn${currentPage === "products" && cat ? " active" : ""}" aria-haspopup="true" aria-expanded="false">Danh m\u1ee5c ${icon("chevronDown")}</button>
      <div class="nav-drop-menu" role="menu">
        ${CATEGORIES.map((c) => `<a href="${page("products.html")}?cat=${c.id}" class="${cat === c.id ? "current" : ""}">${CATEGORY_LABELS[c.id]}</a>`).join("")}
      </div>
    </div>`,
    navItem(page("sale.html"), "Khuy\u1ebfn m\u00e3i", currentPage === "sale"),
    navItem(page("guide.html"), "H\u01b0\u1edbng d\u1eabn mua h\u00e0ng", currentPage === "guide"),
    navItem(page("contact.html"), "Li\u00ean h\u1ec7", currentPage === "contact"),
  ].join("");

  holder.outerHTML = `
  <div class="topbar">
    <div class="container">
      <div class="topbar-left">
        ${PROMOTION.active && PROMOTION.showTopbar ? `<span class="topbar-promo">${icon("tag")} ${PROMOTION.name}: giảm đến ${maxSaleDiscount()}% <a href="${page("sale.html")}">Xem ngay <span aria-hidden="true">&#8599;</span></a></span>` : ""}
        <span>${icon("truck")} Miễn phí giao hàng cho đơn từ ${money(STORE_INFO.freeShipFrom)}</span>
      </div>
      <div class="topbar-right">
        <span>${icon("phone")} Hotline ${STORE_INFO.hotline} <i>·</i> ${STORE_INFO.hours.split(",")[0]}</span>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="header-main">
      <div class="container">
        <a class="brand" href="${page("index.html")}" aria-label="Frame & Form - Trang chủ">
          <img src="${asset("images/frame-form.svg")}" alt="Biểu tượng Frame & Form">
          <span class="brand-text"><b>FRAME <em>&amp; FORM</em></b><small>M&#212; H&#204;NH &amp; V&#7852;T PH&#7848;M S&#431;U T&#7846;M</small></span>
        </a>
        <form class="header-search" id="header-search" action="${page("products.html")}" method="get" role="search">
          ${icon("search")}
          <input type="text" name="q" id="header-search-input" value="${escapeHtml(q)}" placeholder="T&#236;m m&#244; h&#236;nh, &#273;&#7891; ngh&#7873;..." autocomplete="off">
          <button type="submit">T&#236;m ki&#7871;m</button>
          <a class="header-search-advanced" href="${page("advanced-search.html")}">${icon("sliders")}<span>N\u00e2ng cao</span></a>
        </form>
        <div class="header-actions">
          ${loggedIn ? `
          <div class="user-menu" id="user-menu">
            <button class="header-action" id="user-menu-btn" type="button" aria-haspopup="true">
              <span class="avatar" id="header-avatar">${initials(user.name)}</span>
              <span class="header-action-text"><small>Xin chào,</small><b id="header-user-name">${escapeHtml(user.name)}</b></span>
              ${icon("chevronDown")}
            </button>
            <div class="dropdown" role="menu">
              <div class="dropdown-head"><b id="dropdown-user-name">${escapeHtml(user.name)}</b><small>${escapeHtml(user.email)}</small></div>
              <a href="${page("account.html")}">${icon("user")} Tài khoản của tôi</a>
              <a href="${page("account.html")}#addresses">${icon("map")} Sổ địa chỉ</a>
              <a href="${page("orders.html")}">${icon("orders")} Lịch sử mua hàng</a>
              <button type="button" class="danger" data-logout>${icon("logout")} Đăng xuất</button>
            </div>
          </div>` : `
          <a class="header-action" href="${page("login.html")}">${icon("login")}<span class="header-action-text"><b>Đăng nhập</b></span></a>
          <a class="btn btn-primary btn-sm" href="${page("register.html")}">Đăng ký</a>`}
          <a class="header-action" href="${page("cart.html")}" aria-label="Giỏ hàng">
            <span class="cart-icon-wrap">${icon("cart")}<span class="cart-badge" id="cart-badge">${cartCount()}</span></span>
            <span class="header-action-text"><small>Giỏ hàng</small><b>${cartCount()} sản phẩm</b></span>
          </a>
        </div>
      </div>
    </div>
    <nav class="header-nav">
      <div class="container">
        ${nav}
      </div>
    </nav>
  </header>`;

  // Nút "Danh mục": bấm để mở/đóng danh sách (không tải lại trang), bấm ra ngoài thì đóng
  const navDrop = document.querySelector(".nav-drop");
  if (navDrop) {
    const navDropBtn = navDrop.querySelector(".nav-drop-btn");
    navDropBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navDropBtn.setAttribute("aria-expanded", String(navDrop.classList.toggle("open")));
    });
    document.addEventListener("click", (e) => {
      if (!navDrop.contains(e.target)) {
        navDrop.classList.remove("open");
        navDropBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Menu tài khoản
  const menu = document.getElementById("user-menu");
  if (menu) {
    document.getElementById("user-menu-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) menu.classList.remove("open");
    });
  }

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
      if (ok) {
        setLoggedIn(false); // từ giờ các trang ẩn avatar, thông tin khách và lịch sử mua hàng
        toastThenGo(page("login.html"), "Đăng xuất thành công", "Hẹn gặp lại bạn!");
      }
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
        <a class="brand" href="${page("index.html")}">
          <img src="${asset("images/frame-form.svg")}" alt="Biểu tượng Frame & Form">
          <span class="brand-text"><b>FRAME <em>&amp; FORM</em></b><small>M&#212; H&#204;NH &amp; V&#7852;T PH&#7848;M S&#431;U T&#7846;M</small></span>
        </a>
        <p>Mô hình lắp ráp và vật phẩm trưng bày cho người yêu sưu tầm, từ mẫu gọn nhẹ cho người mới đến mô hình cỡ lớn cho tủ kính.</p>
        <ul class="footer-promises">
          <li><span class="footer-promise-icon">${icon("shield")}</span> Mô hình chính hãng, nguyên hộp</li>
          <li><span class="footer-promise-icon">${icon("box")}</span> Đóng gói chống sốc khi giao hàng</li>
          <li><span class="footer-promise-icon">${icon("refresh")}</span> Đổi trả trong ${STORE_INFO.returnDays} ngày</li>
        </ul>
      </div>
      <div>
        <h4>Danh mục</h4>
        <ul>${CATEGORIES.map((c) => `<li><a href="${page("products.html")}?cat=${c.id}">${CATEGORY_LABELS[c.id]}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Hỗ trợ</h4>
        <ul>
          ${isLoggedIn() ? `<li><a href="${page("orders.html")}">Lịch sử mua hàng</a></li>
          <li><a href="${page("account.html")}">Tài khoản của tôi</a></li>` : `<li><a href="${page("login.html")}">Đăng nhập</a></li>
          <li><a href="${page("register.html")}">Đăng ký tài khoản</a></li>`}
          <li><a href="${page("cart.html")}">Giỏ hàng</a></li>
          <li><a href="${page("guide.html")}">Hướng dẫn mua hàng</a></li>
          <li><a href="${page("contact.html")}">Liên hệ</a></li>
        </ul>
      </div>
      <div>
        <h4>Liên hệ</h4>
        <ul class="footer-contact">
          <li>${icon("map")} <span>${storeAddress()}</span></li>
          <li>${icon("phone")} <span>Hotline: ${STORE_INFO.hotline}</span></li>
          <li>${icon("mail")} <span>${STORE_INFO.email}</span></li>
          <li>${icon("clock")} <span>${STORE_INFO.hours}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <span>© 2026 Frame &amp; Form</span>
        <span>M&#7895;i m&#244; h&#236;nh, m&#7897;t d&#7845;u &#7845;n ri&#234;ng.</span>
      </div>
    </div>
  </footer>`;
}

// Bấm Đăng nhập => đăng nhập lại (hiện lại avatar, thông tin khách, lịch sử mua hàng)
const loginForm = document.getElementById("login-form");
if (loginForm) loginForm.addEventListener("submit", () => setLoggedIn(true));

renderHeader();
renderFooter();

