// NGƯỜI DÙNG (ADMIN) - web tĩnh
// - user-form.html       : THÊM người dùng mới (lưu chỉ hiện thông báo)
// - user-form.html?id=.. : XEM thông tin người dùng. Thông tin cá nhân là quyền lợi của khách hàng,
//                          admin chỉ được xem, KHÔNG được sửa
(function () {
  const $ = (id) => document.getElementById(id);
  const u = getUser(getParam("id"));

  $("uf-city").innerHTML = Object.keys(LOCATIONS).map((c) => `<option>${c}</option>`).join("");
  const fillWards = () => { $("uf-ward").innerHTML = LOCATIONS[$("uf-city").value].map((w) => `<option>${w}</option>`).join(""); };
  fillWards();

  function preview() {
    const name = $("uf-name").value.trim() || "Tên người dùng";
    const locked = u && u.status === "locked";
    $("uf-preview").innerHTML = `
      <div style="text-align:center">
        <span class="avatar" style="width:72px;height:72px;font-size:26px;margin:0 auto 12px">${initials(name)}</span>
        <b style="font-size:17px">${escapeHtml(name)}</b>
        <p class="muted">${escapeHtml($("uf-email").value || "email@vidu.com")}</p>
        <p class="muted">${escapeHtml($("uf-phone").value || "Số điện thoại")}</p>
        <p style="margin-top:8px">${escapeHtml(($("uf-street").value || "Số nhà, tên đường") + ", " + $("uf-ward").value + ", " + $("uf-city").value)}</p>
        <p style="margin-top:12px"><span class="chip chip-${locked ? "locked" : "active"}">${locked ? "Đã khóa" : "Hoạt động"}</span></p>
        ${u ? `<p class="muted" style="margin-top:12px;font-size:12.5px">Tham gia ngày ${formatDate(u.joined)}</p>` : ""}
      </div>`;
  }

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
    $("readonly-note").hidden = false;
    $("readonly-note").innerHTML = `${icon("lock")}<span>Thông tin cá nhân thuộc quyền của khách hàng, quản trị viên <b>chỉ được xem</b>, không được chỉnh sửa.</span>`;
    document.title = `${u.name} - Quản trị DVK Gunpla`;

    // Đơn hàng của khách (chỉ xem)
    const orders = ORDERS.filter((o) => o.userId === u.id);
    $("uf-orders").hidden = false;
    $("uf-orders").innerHTML = `
      <div class="card-head"><h3>Đơn hàng (${orders.length})</h3><a class="link" href="orders.html?user=${u.id}">Xem tất cả →</a></div>
      <div class="info-list">${orders.slice(0, 4).map((o) => `
        <div class="info-row" style="justify-content:space-between;align-items:center">
          <div><a class="order-link" href="order-detail.html?id=${o.id}">#${o.id}</a><small>${formatDate(o.datetime)}</small></div>
          <b class="num">${money(o.total)}</b>
        </div>`).join("") || '<p class="muted">Chưa có đơn hàng</p>'}</div>`;

    // Bấm vào ô bị khóa -> nhắc là chỉ được xem
    $("user-form").addEventListener("click", (e) => {
      if (e.target.closest(".input, .select")) toast("Chỉ được xem", "Quản trị viên không được sửa thông tin cá nhân của khách hàng", "warning");
    });
    $("user-form").addEventListener("submit", (e) => e.preventDefault());
  } else {
    // ----- THÊM MỚI -----
    $("form-title").innerHTML = `${icon("plus")} Thêm người dùng mới`;
    $("uf-city").addEventListener("change", () => { fillWards(); preview(); });
    ["uf-name", "uf-email", "uf-phone", "uf-street"].forEach((id) => $(id).addEventListener("input", preview));
    $("uf-ward").addEventListener("change", preview);
    $("user-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("uf-name").value.trim() || "Người dùng mới";
      toastThenGo("users.html", "Thêm người dùng thành công", escapeHtml(name));
    });
    $("uf-cancel").addEventListener("click", (e) => {
      e.preventDefault();
      toastThenGo("users.html", "Đã hủy", "Thông tin chưa được lưu", "info");
    });
  }
  preview();
})();
