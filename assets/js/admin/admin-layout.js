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

// ============================================================
// XỬ LÝ ĐƠN HÀNG (dùng chung cho orders.html và order-detail.html)
// Trạng thái chỉ đi tới: Chưa xác nhận -> Đã xác nhận -> Đã giao, đơn chưa giao có thể hủy
// Web tĩnh: chỉ hỏi xác nhận rồi hiện thông báo, trạng thái giữ nguyên
// ============================================================
const ORDER_ACTIONS = {
  confirmed: { text: "Xác nhận đơn hàng", short: "Xác nhận", ic: "check", cls: "btn-dark", done: "Đã xác nhận đơn hàng" },
  shipping: { text: "Giao cho vận chuyển", short: "Giao hàng", ic: "truck", cls: "btn-dark", done: "Đã chuyển sang: Đang giao hàng" },
  delivered: { text: "Xác nhận đã giao hàng", short: "Đã giao", ic: "checkCircle", cls: "btn-dark", done: "Đã cập nhật: giao thành công" },
  cancelled: { text: "Hủy đơn hàng", short: "Hủy", ic: "x", cls: "btn-danger-outline", done: "Đã hủy đơn hàng" },
};

const ORDER_CANCEL_REASONS = ["Khách yêu cầu hủy", "Không liên lạc được khách", "Sản phẩm hết hàng", "Sai thông tin giao hàng", "Khách không nhận hàng", "Lý do khác"];

async function askOrderStatus(order, value) {
  const cancel = value === "cancelled";
  // Hủy đơn: chọn lý do (bấm 1 ô) + ghi chú
  const reasonForm = `
    <div class="lock-form">
      <div class="field"><span>Lý do hủy</span>
        <div class="reason-grid">${ORDER_CANCEL_REASONS.map((r, i) => `
          <label class="reason-option"><input type="radio" name="cancel-reason" value="${r}" ${i === 0 ? "checked" : ""}><span>${r}</span></label>`).join("")}
        </div>
      </div>
      <label class="field"><span>Ghi chú</span>
        <textarea class="textarea" id="cancel-note" rows="2" placeholder="Vd: Khách gọi điện báo đổi ý"></textarea>
      </label>
    </div>`;
  const asking = confirmDialog({
    title: cancel ? "Hủy đơn hàng này?" : `${ORDER_ACTIONS[value].text}?`,
    message: cancel
      ? `Đơn <b>#${order.id}</b> sẽ bị hủy và không khôi phục lại được.`
      : `Đơn <b>#${order.id}</b> sẽ chuyển sang <b>“${ORDER_STATUS[value].label}”</b>.<br>Sau khi cập nhật sẽ không quay lại được.`,
    okText: cancel ? "Hủy đơn" : "Xác nhận", cancelText: cancel ? "Không hủy" : "Để sau",
    body: cancel ? reasonForm : "",
    iconName: ORDER_ACTIONS[value].ic, danger: cancel,
  });
  // Lấy ô nhập trước khi hộp thoại đóng
  const box = document.querySelector(".confirm-box"), noteEl = document.getElementById("cancel-note");
  const ok = await asking;
  if (!ok) return toast("Chưa cập nhật", `Đơn #${order.id} vẫn ở trạng thái “${ORDER_STATUS[order.status].label}”`, "info");
  if (cancel) {
    const note = noteEl.value.trim();
    return toast("Đã hủy đơn hàng", `Đơn #${order.id} · Lý do: ${escapeHtml(box.querySelector('[name="cancel-reason"]:checked').value)}${note ? `<br>${escapeHtml(note)}` : ""}`);
  }
  toast(ORDER_ACTIONS[value].done, `Đơn #${order.id} · ${escapeHtml(getUser(order.userId).name)}`);
}
