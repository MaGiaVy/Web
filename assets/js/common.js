// ============================================================
// DVK GUNPLA - HÀM TIỆN ÍCH DÙNG CHUNG (WEB TĨNH THUẦN HTML/CSS)
// Tuyệt đối không có cơ sở dữ liệu ngầm, không tính toán logic động
// ============================================================

// BỘ BIỂU TƯỢNG SVG CHO THÔNG BÁO
const TOAST_ICONS = {
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  warning: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>'
};

function toastIcon(name) {
  const body = TOAST_ICONS[name] || TOAST_ICONS.info;
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

// BẮN THÔNG BÁO TOAST GÓC MÀN HÌNH
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
    <div class="toast-icon">${toastIcon(icons[type] || "info")}</div>
    <div class="toast-body"><b>${title}</b>${message ? `<p>${message}</p>` : ""}</div>
    <button class="toast-close" aria-label="Đóng">${toastIcon("x")}</button>`;
  const close = () => {
    el.classList.add("hide");
    setTimeout(() => el.remove(), 250);
  };
  el.querySelector(".toast-close").onclick = close;
  stack.appendChild(el);
  while (stack.children.length > 4) stack.firstElementChild.remove();
  setTimeout(close, 3200);
}

// GẮN SỰ KIỆN NÚT "THÊM VÀO GIỎ" (CHỈ BẮN TOAST MINH HỌA)
function bindAddToCart(scope = document) {
  scope.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const card = btn.closest(".product-card") || btn.closest(".pd-layout") || document;
      const nameEl = card.querySelector(".product-name") || card.querySelector("h1");
      const name = nameEl ? nameEl.textContent.trim() : "Mô hình Gunpla";
      toast("Đã thêm vào giỏ hàng!", `1 x ${name}`, "success");
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindAddToCart(document);
});

function syncAccountTabFromHash() {
  const hash = location.hash.replace("#", "");
  if (hash === "addresses" || hash === "password" || hash === "profile") {
    const radio = document.getElementById("acc-tab-" + hash);
    if (radio) radio.checked = true;
  }
}
window.addEventListener("hashchange", syncAccountTabFromHash);
document.addEventListener("DOMContentLoaded", syncAccountTabFromHash);
