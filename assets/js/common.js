// ============================================================
// DVK GUNPLA - HÀM DÙNG CHUNG
// ============================================================

// ĐƯỜNG DẪN - để link và ảnh không bị vỡ dù trang nằm ở đâu
// index.html ở thư mục gốc; trang trong pages/ và admin/ đặt data-root="../" trên thẻ body
const ROOT = document.body.dataset.root || "";
// Ảnh, file trong assets/:  asset("images/logo.svg")
const asset = (path) => ROOT + "assets/" + path;
// Trang khách hàng:  page("cart.html"), page("index.html")
function page(name) {
  if (name === "index.html") return ROOT + "index.html";
  if (document.body.classList.contains("admin")) return ROOT + "pages/" + name;
  return (ROOT ? "" : "pages/") + name;
}

// Định dạng giá tiền: 1150000 -> "1.150.000đ"
function money(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}
function numberDot(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// "2026-08-05 09:12" -> "05/08/2026"
function formatDate(value) {
  const [d] = value.split(" ");
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}
function formatDateTime(value) {
  const time = value.split(" ")[1] || "";
  return `${time} - ${formatDate(value)}`;
}

// Bỏ dấu tiếng Việt để tìm kiếm tương đối
function normalize(text) {
  return String(text).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase().trim();
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function initials(name) {
  const parts = name.trim().split(/\s+/);
  const last = parts[parts.length - 1] || "";
  return last.charAt(0).toUpperCase();
}

function getProduct(id) { return PRODUCTS.find((p) => p.id === Number(id)); }
function getUser(id) { return USERS.find((u) => u.id === Number(id)); }
function getOrder(id) { return ORDERS.find((o) => o.id === id); }
function getCategory(id) { return CATEGORIES.find((c) => c.id === id); }
function currentUser() { return getUser(CURRENT_USER_ID); }
function cartCount() { return SAMPLE_CART.reduce((sum, item) => sum + item.qty, 0); }
function fullAddress(a) { return `${a.street}, ${a.ward}, ${a.city}`; }
function discountPercent(p) { return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0; }
function orderItemCount(order) { return order.items.reduce((s, i) => s + i.qty, 0); }

function statusChip(status) {
  return `<span class="chip chip-${status}">${ORDER_STATUS[status].label}</span>`;
}

// ============================================================
// BỘ BIỂU TƯỢNG SVG
// ============================================================
const ICON_PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.6l2.4 11.2a1.8 1.8 0 0 0 1.8 1.4h8.6a1.8 1.8 0 0 0 1.7-1.3L21.5 7H6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.8 3 2.6 3.5 5.2"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l5-5-5-5M15 12H4"/>',
  login: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l5-5-5-5M15 12H4"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  orders: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  map: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3 8 4s0 4 4 4zM12 8s1.5-5 4-4 0 4-4 4z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" fill="currentColor" stroke="none"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  filter: '<path d="M3 5h18l-7 8.5V20l-4-2v-4.5z"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  warning: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
  home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  dashboard: '<rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="13" y="3" width="8" height="6" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="15" width="8" height="6" rx="1.5"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
  bank: '<path d="M3 10 12 4l9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  note: '<path d="M5 4h14v12l-4 4H5z"/><path d="M15 20v-4h4M9 9h6M9 13h4"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  store: '<path d="M4 9 5.5 4h13L20 9M4 9v11h16V9M4 9h16"/><path d="M9 20v-6h6v6"/>',
  heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  medal: '<circle cx="12" cy="15" r="6"/><path d="m8.5 10.5-3-7.5h4l2.5 5M15.5 10.5l3-7.5h-4L12 8"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
};

function icon(name, extraClass = "") {
  const body = ICON_PATHS[name] || ICON_PATHS.info;
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// ============================================================
// THÔNG BÁO (TOAST) - mọi thao tác đều gọi hàm này
// ============================================================
function toast(title, message = "", type = "success") {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const icons = { success: "checkCircle", info: "info", warning: "warning", error: "x" };
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `
    <div class="toast-icon">${icon(icons[type])}</div>
    <div class="toast-body"><b>${title}</b>${message ? `<p>${message}</p>` : ""}</div>
    <button class="toast-close" aria-label="Đóng">${icon("x")}</button>`;
  const close = () => {
    el.classList.add("hide");
    setTimeout(() => el.remove(), 250);
  };
  el.querySelector(".toast-close").addEventListener("click", close);
  stack.appendChild(el);
  while (stack.children.length > 4) stack.firstElementChild.remove();
  setTimeout(close, 3200);
}

// Hiện thông báo rồi mới chuyển trang để người dùng kịp đọc
function toastThenGo(url, title, message, type = "success") {
  toast(title, message, type);
  setTimeout(() => { location.href = url; }, 1100);
}

// ============================================================
// HỘP THOẠI XÁC NHẬN (thay cho confirm() mặc định cho đẹp hơn)
// ============================================================
// body: HTML thêm bên dưới lời nhắn (vd: ô nhập lý do)
function confirmDialog({ title, message, body = "", iconName, okText = "Đồng ý", cancelText = "Hủy", danger = false }) {
  return new Promise((resolve) => {
    const wrap = document.createElement("div");
    wrap.className = "confirm-backdrop";
    wrap.innerHTML = `
      <div class="confirm-box ${danger ? "danger" : ""}" role="dialog" aria-modal="true">
        <div class="confirm-icon">${icon(iconName || (danger ? "trash" : "warning"))}</div>
        <h3>${title}</h3>
        <p>${message}</p>
        ${body}
        <div class="confirm-actions">
          <button class="btn btn-outline" data-act="cancel">${cancelText}</button>
          <button class="btn ${danger ? "btn-primary" : "btn-dark"}" data-act="ok">${okText}</button>
        </div>
      </div>`;
    const done = (value) => { wrap.remove(); resolve(value); };
    wrap.addEventListener("click", (e) => {
      if (e.target === wrap) done(false);
      const act = e.target.closest("[data-act]");
      if (act) done(act.dataset.act === "ok");
    });
    document.body.appendChild(wrap);
    wrap.querySelector('[data-act="ok"]').focus();
  });
}

// ============================================================
// THẺ SẢN PHẨM & PHÂN TRANG
// ============================================================
function productCard(p) {
  const off = discountPercent(p);
  return `
    <article class="product-card">
      <a class="product-thumb" href="${page("product.html")}?id=${p.id}">
        <img src="${asset(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">
        <div class="product-flags">
          ${off ? `<span class="flag flag-sale">-${off}%</span>` : ""}
          ${p.isNew ? `<span class="flag flag-new">Mới</span>` : ""}
        </div>
      </a>
      <div class="product-body">
        <div class="product-meta"><span class="grade grade-${p.category}">${p.category === "TOOL" ? "TOOL" : p.category}</span><span>${escapeHtml(p.series)}</span></div>
        <a class="product-name" href="${page("product.html")}?id=${p.id}" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</a>
        <div class="product-stats">
          <span class="star">${icon("star")} ${p.rating.toFixed(1)}</span>
          <span>Đã bán ${numberDot(p.sold)}</span>
        </div>
        <div class="product-price">
          <span class="price">${money(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : ""}
        </div>
        <div class="product-actions">
          <button class="btn btn-dark btn-sm" data-add-cart="${p.id}">${icon("cart")} Thêm vào giỏ</button>
        </div>
      </div>
    </article>`;
}

// Gắn sự kiện "Thêm vào giỏ" cho mọi nút có data-add-cart (chỉ thông báo, không lưu)
function bindAddToCart(scope = document) {
  scope.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const p = getProduct(btn.dataset.addCart);
      const qtyInput = document.querySelector("#qty-input");
      const qty = btn.dataset.useQty && qtyInput ? Number(qtyInput.value) || 1 : 1;
      toast("Đã thêm vào giỏ hàng", `${qty} x ${p.name} (${p.category})`);
    });
  });
}

// Vẽ thanh phân trang. onChange(page) được gọi khi bấm chuyển trang
function renderPagination(container, totalItems, perPage, current, onChange) {
  const pages = Math.max(1, Math.ceil(totalItems / perPage));
  if (totalItems <= perPage) { container.innerHTML = ""; return; }
  let html = `<div class="pagination">
    <button data-page="${current - 1}" ${current === 1 ? "disabled" : ""} aria-label="Trang trước">${icon("chevronLeft")}</button>`;
  for (let i = 1; i <= pages; i++) {
    html += `<button data-page="${i}" class="${i === current ? "active" : ""}">${i}</button>`;
  }
  html += `<button data-page="${current + 1}" ${current === pages ? "disabled" : ""} aria-label="Trang sau">${icon("chevronRight")}</button></div>`;
  const from = (current - 1) * perPage + 1;
  const to = Math.min(current * perPage, totalItems);
  html += `<p class="pagination-info">Hiển thị ${from} - ${to} trong tổng số ${totalItems} kết quả</p>`;
  container.innerHTML = html;
  container.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Number(btn.dataset.page);
      if (target < 1 || target > pages || target === current) return;
      onChange(target);
      toast(`Đã chuyển sang trang ${target}/${pages}`, "", "info");
    });
  });
}

// ============================================================
// HIỂN THỊ ĐƠN HÀNG (dùng chung cho khách hàng và admin)
// ============================================================
function orderTimeline(order) {
  const steps = [
    { key: "pending", label: "Chưa xác nhận", sub: "Đã đặt hàng", ic: "orders" },
    { key: "confirmed", label: "Đã xác nhận", sub: "Đang chuẩn bị hàng", ic: "box" },
    { key: "shipping", label: "Đang giao", sub: "Đang vận chuyển", ic: "truck" },
    { key: "delivered", label: "Đã giao thành công", sub: "Hoàn tất", ic: "checkCircle" },
  ];
  const order4 = ["pending", "confirmed", "shipping", "delivered"];
  const cancelled = order.status === "cancelled";
  const idx = cancelled ? -1 : order4.indexOf(order.status);
  if (cancelled) steps[3] = { key: "cancelled", label: "Đã hủy", sub: "Đơn hàng bị hủy", ic: "x" };
  return `<div class="timeline">${steps.map((s, i) => {
    let cls = "";
    if (cancelled) cls = i === 0 ? "done" : i === 3 ? "cancel" : "";
    else if (i < idx || (i === idx && s.key === "delivered")) cls = "done";
    else if (i === idx) cls = "current";
    return `<div class="tl-step ${cls}"><div class="tl-dot">${icon(s.ic)}</div><b>${s.label}</b><small>${i === 0 ? formatDateTime(order.datetime) : s.sub}</small></div>`;
  }).join("")}</div>`;
}

function orderItemsTable(order, productLink = page("product.html") + "?id=") {
  return `<div class="table-wrap"><table class="table">
    <thead><tr><th>Sản phẩm</th><th class="right">Đơn giá</th><th class="center">Số lượng</th><th class="right">Thành tiền</th></tr></thead>
    <tbody>${order.items.map((it) => {
      const p = getProduct(it.productId);
      return `<tr>
        <td><div class="cell-product"><img src="${asset(p.image)}" alt="${escapeHtml(p.name)}"><div><a href="${productLink}${p.id}"><b>${escapeHtml(p.name)}</b></a><small><span class="grade grade-${p.category}">${p.category}</span> ${escapeHtml(p.series)}</small></div></div></td>
        <td class="right num">${money(it.price)}</td>
        <td class="center num">${it.qty}</td>
        <td class="right num"><b>${money(it.price * it.qty)}</b>${it.qty > 1 ? `<small class="line-calc">${money(it.price)} × ${it.qty}</small>` : ""}</td>
      </tr>`;
    }).join("")}</tbody>
  </table></div>`;
}

function orderTotalsBox(order) {
  return `<div class="summary-body">
    <div class="summary-row"><span>Tạm tính (${orderItemCount(order)} sản phẩm)</span><b>${money(order.subtotal)}</b></div>
    <div class="summary-row"><span>Phí vận chuyển</span><b>${order.shipping ? money(order.shipping) : "Miễn phí"}</b></div>
    <div class="summary-total"><span>Tổng cộng</span><b>${money(order.total)}</b></div>
  </div>`;
}

// ============================================================
// Ô NHẬP GIÁ: tự thêm dấu chấm hàng nghìn khi gõ (1250000 -> 1.250.000)
// ============================================================
function parseMoney(text) {
  const digits = String(text).replace(/\D/g, "");
  return digits === "" ? "" : Number(digits);
}

function setMoneyValue(input, value) {
  input.value = value === "" || value === null || value === undefined ? "" : numberDot(value);
}

function bindMoneyInput(input) {
  input.setAttribute("inputmode", "numeric");
  const group = (digits) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Backspace ngay sau dấu chấm / Delete ngay trước dấu chấm: nhảy qua dấu chấm để xóa luôn chữ số
  input.addEventListener("keydown", (e) => {
    const pos = input.selectionStart;
    if (pos !== input.selectionEnd) return;
    if (e.key === "Backspace" && input.value[pos - 1] === ".") input.setSelectionRange(pos - 1, pos - 1);
    if (e.key === "Delete" && input.value[pos] === ".") input.setSelectionRange(pos + 1, pos + 1);
  });

  input.addEventListener("input", () => {
    // Giữ vị trí con trỏ theo số chữ số đứng trước nó
    const caret = input.selectionStart;
    const digitsBefore = input.value.slice(0, caret).replace(/\D/g, "").length;
    // Xóa 1 chữ số thì chỉ mất đúng chữ số đó (1.000 xóa số 1 -> 000, không thành 0)
    input.value = group(input.value.replace(/\D/g, "").slice(0, 12));
    let pos = 0, count = 0;
    while (pos < input.value.length && count < digitsBefore) {
      if (/\d/.test(input.value[pos])) count++;
      pos++;
    }
    input.setSelectionRange(pos, pos);
  });

  // Rời ô thì bỏ số 0 thừa ở đầu (000 -> 0)
  input.addEventListener("blur", () => {
    input.value = group(input.value.replace(/\D/g, "").replace(/^0+(?=\d)/, ""));
  });
}
