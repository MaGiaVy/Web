// NGƯỜI DÙNG (ADMIN) - web tĩnh
// - user-form.html       : THÊM người dùng mới (lưu chỉ hiện thông báo)
// - user-form.html?id=.. : XEM thông tin người dùng (chỉ xem, việc sửa để phía backend làm)
(function () {
  const $ = (id) => document.getElementById(id);
  const u = getUser(getParam("id"));

  $("uf-city").innerHTML = Object.keys(LOCATIONS).map((c) => `<option>${c}</option>`).join("");
  const fillWards = () => { $("uf-ward").innerHTML = LOCATIONS[$("uf-city").value].map((w) => `<option>${w}</option>`).join(""); };
  fillWards();

  // Số đơn, tổng chi tiêu (không tính đơn hủy), số đơn hủy
  function userStats() {
    const list = ORDERS.filter((o) => o.userId === u.id);
    const spent = list.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
    const cancelled = list.filter((o) => o.status === "cancelled").length;
    return `<div class="uf-stats">
      <div><b>${list.length}</b><small>Đơn hàng</small></div>
      <div><b>${money(spent)}</b><small>Đã chi tiêu</small></div>
      <div><b class="${cancelled ? "text-red" : ""}">${cancelled}</b><small>Đơn hủy</small></div>
    </div>`;
  }

  function preview() {
    const name = $("uf-name").value.trim() || "Tên người dùng";
    const locked = u && u.status === "locked";
    $("uf-preview").innerHTML = `
      <div style="text-align:center">
        <span class="avatar" style="width:72px;height:72px;font-size:26px;margin:0 auto 12px">${initials(name)}</span>
        <b style="font-size:17px">${escapeHtml(name)}</b>
        <p class="muted">${escapeHtml($("uf-email").value || "email@vidu.com")}</p>
        <p class="muted">${escapeHtml($("uf-phone").value || "Số điện thoại")}</p>
        <div class="uf-addr">
          <b>${escapeHtml($("uf-street").value || "Số nhà, tên đường")}</b>
          <span>${$("uf-ward").value}</span>
          <span>${$("uf-city").value}</span>
        </div>
        <p style="margin-top:12px"><span class="chip chip-${locked ? "locked" : "active"}">${locked ? "Đã khóa" : "Hoạt động"}</span></p>
        ${locked && u.lockReason ? `<p class="lock-reason-box"><b>Khóa ngày ${formatDate(u.lockedAt)}</b><br>Lý do: ${escapeHtml(u.lockReason)}${u.lockNote ? `<br><small>${escapeHtml(u.lockNote)}</small>` : ""}</p>` : ""}
        ${u ? userStats() : ""}
        ${u ? `<p class="muted" style="margin-top:12px;font-size:12.5px">Tham gia ngày ${formatDate(u.joined)}</p>` : ""}
      </div>`;
  }

  // Gõ / chọn đến đâu thì khung "Thông tin tài khoản" cập nhật đến đó
  $("uf-city").addEventListener("change", () => { fillWards(); preview(); });
  ["uf-name", "uf-email", "uf-phone", "uf-street"].forEach((id) => $(id).addEventListener("input", preview));
  $("uf-ward").addEventListener("change", preview);
  $("uf-cancel").addEventListener("click", (e) => {
    e.preventDefault();
    toastThenGo("users.html", "Đã hủy", "Thông tin chưa được lưu", "info");
  });

  if (u) {
    // ----- CHỈ XEM -----
    const a = u.addresses.find((x) => x.isDefault);
    $("form-title").innerHTML = `${icon("user")} Thông tin người dùng`;
    $("uf-name").value = u.name;
    $("uf-email").value = u.email;
    $("uf-phone").value = u.phone;
    $("uf-city").value = a.city; fillWards();
    $("uf-ward").value = a.ward;
    $("uf-street").value = a.street;
    ["uf-name", "uf-email", "uf-phone", "uf-street"].forEach((id) => { $(id).readOnly = true; });
    ["uf-city", "uf-ward"].forEach((id) => { $(id).disabled = true; });
    $("uf-pass-field").hidden = true;
    $("form-actions").hidden = true;
    document.title = `${u.name} - Quản trị DVK Gunpla`;

    // Đơn hàng của khách
    const orders = ORDERS.filter((o) => o.userId === u.id).sort((a, b) => b.datetime.localeCompare(a.datetime));
    $("uf-orders").hidden = false;
    $("uf-orders").innerHTML = `
      <div class="card-head"><h3>Lịch sử mua hàng (${orders.length} đơn)</h3><a class="link" href="orders.html?user=${u.id}">Xem trong Quản lý đơn hàng →</a></div>
      ${orders.length ? `<div class="table-wrap"><table class="table">
        <thead><tr><th>Mã đơn</th><th>Ngày đặt</th><th class="center">Sản phẩm</th><th class="right">Tổng tiền</th><th>Trạng thái</th></tr></thead>
        <tbody>${orders.map((o) => `<tr>
          <td><a class="order-link" href="order-detail.html?id=${o.id}">#${o.id}</a></td>
          <td>${formatDate(o.datetime)}</td>
          <td class="center">${orderItemCount(o)}</td>
          <td class="right num"><b>${money(o.total)}</b></td>
          <td>${statusChip(o.status)}</td>
        </tr>`).join("")}</tbody></table></div>`
      : `<div class="empty-state">${icon("orders")}<h3>Chưa có đơn hàng nào</h3></div>`}`;

    $("user-form").addEventListener("submit", (e) => e.preventDefault());
  } else {
    // ----- THÊM MỚI -----
    $("form-title").innerHTML = `${icon("plus")} Thêm người dùng mới`;
    $("user-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("uf-name").value.trim() || "Người dùng mới";
      toastThenGo("users.html", "Thêm người dùng thành công", escapeHtml(name));
    });
  }
  preview();
})();
