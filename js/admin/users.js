// QUẢN LÝ NGƯỜI DÙNG: tìm kiếm (web tĩnh: chỉ hiện thông báo), thêm, sửa, khóa / mở khóa
(function () {
  const $ = (id) => document.getElementById(id);
  const users = USERS.map((u) => ({ ...u }));
  $("add-user").innerHTML = `${icon("plus")} Thêm người dùng`;

  // Danh sách cố định (không lọc thật)
  function filtered() {
    return users;
  }

  function row(u) {
    const addr = u.addresses.find((a) => a.isDefault);
    const orders = ORDERS.filter((o) => o.userId === u.id).length;
    const locked = u.status === "locked";
    return `<tr data-id="${u.id}" class="${locked ? "is-locked" : ""}">
      <td><div class="cell-user"><span class="avatar">${initials(u.name)}</span><div><b>${escapeHtml(u.name)}</b><small>${u.email}</small></div></div></td>
      <td class="num">${u.phone}</td>
      <td>${addr.district}, ${addr.city}</td>
      <td>${formatDate(u.joined)}</td>
      <td class="center"><a class="link" href="orders.html?user=${u.id}">${orders} đơn</a></td>
      <td><span class="chip chip-${u.status}">${locked ? "Đã khóa" : "Hoạt động"}</span></td>
      <td><div class="row-actions">
        <a class="btn btn-outline btn-sm" href="user-form.html?id=${u.id}">${icon("edit")} Sửa</a>
        <button class="btn btn-sm ${locked ? "btn-blue" : "btn-danger-outline"}" data-toggle>${icon(locked ? "unlock" : "lock")} ${locked ? "Mở khóa" : "Khóa"}</button>
      </div></td>
    </tr>`;
  }

  function render() {
    const list = filtered();
    $("user-body").innerHTML = list.length ? list.map(row).join("")
      : `<tr><td colspan="7"><div class="empty-state">${icon("users")}<h3>Không tìm thấy người dùng</h3></div></td></tr>`;
    const active = users.filter((u) => u.status === "active").length;
    $("user-foot").innerHTML = `<span>Tổng cộng <b>${list.length}</b> người dùng</span><span>${active} đang hoạt động · ${users.length - active} đã khóa</span>`;
    return list.length;
  }

  // Tìm kiếm / lọc: chỉ hiện thông báo, danh sách giữ nguyên
  $("user-filter").addEventListener("submit", (e) => {
    e.preventDefault();
    const key = $("us-key").value.trim();
    toast("Đã tìm kiếm người dùng", `${key ? `Từ khóa: “${escapeHtml(key)}” · ` : ""}Trạng thái: ${$("us-status").selectedOptions[0].text}`);
  });
  $("us-status").addEventListener("change", () => {
    toast("Đã lọc theo trạng thái", $("us-status").selectedOptions[0].text, "info");
  });
  $("us-reset").addEventListener("click", () => {
    $("user-filter").reset();
    toast("Đã đặt lại bộ lọc", "", "info");
  });
  $("add-user").addEventListener("click", (e) => {
    e.preventDefault();
    toastThenGo("user-form.html", "Mở biểu mẫu thêm người dùng", "", "info");
  });

  // Khóa / mở khóa
  $("user-body").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-toggle]");
    if (!btn) return;
    const tr = btn.closest("tr");
    const u = users.find((x) => x.id === Number(tr.dataset.id));
    const locking = u.status === "active";
    const ok = await confirmDialog({
      title: locking ? "Khóa tài khoản?" : "Mở khóa tài khoản?",
      message: locking
        ? `Tài khoản <b>${escapeHtml(u.name)}</b> sẽ không thể đăng nhập và đặt hàng cho đến khi được mở khóa.`
        : `Tài khoản <b>${escapeHtml(u.name)}</b> sẽ được đăng nhập và mua hàng trở lại.`,
      okText: locking ? "Khóa" : "Mở khóa", danger: locking,
    });
    if (!ok) return toast("Đã hủy thao tác", "", "info");
    // Web tĩnh: chỉ hiện thông báo, trạng thái trên bảng giữ nguyên
    toast(locking ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản", u.name, locking ? "warning" : "success");
  });

  render();
})();
