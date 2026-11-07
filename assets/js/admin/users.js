// QUẢN LÝ NGƯỜI DÙNG: tìm kiếm (web tĩnh: chỉ hiện thông báo), thêm, xem, khóa (có lý do) / mở khóa, phân trang
(function () {
  const PER_PAGE = 5;
  const $ = (id) => document.getElementById(id);
  const state = { page: 1 };
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
      <td class="num nowrap">${u.phone}</td>
      <td class="cell-addr"><span>${addr.ward}</span><small>${addr.city}</small></td>
      <td class="nowrap">${formatDate(u.joined)}</td>
      <td class="center"><a class="link" href="orders.html?user=${u.id}">${orders} đơn</a></td>
      <td class="nowrap"><span class="chip chip-${u.status}">${locked ? "Đã khóa" : "Hoạt động"}</span>
        ${locked && u.lockReason ? `<small class="lock-reason" title="Khóa ngày ${formatDate(u.lockedAt)}${u.lockNote ? ` · ${escapeHtml(u.lockNote)}` : ""}">${escapeHtml(u.lockReason)}</small>` : ""}</td>
      <td><div class="row-actions">
        <a class="icon-btn" href="user-form.html?id=${u.id}" title="Xem thông tin người dùng">${icon("eye")}</a>
        <button class="btn btn-sm ${locked ? "btn-blue" : "btn-danger-outline"}" data-toggle>${icon(locked ? "unlock" : "lock")} ${locked ? "Mở khóa" : "Khóa"}</button>
      </div></td>
    </tr>`;
  }

  function render() {
    const list = filtered();
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PER_PAGE;
    $("user-body").innerHTML = list.length ? list.slice(start, start + PER_PAGE).map(row).join("")
      : `<tr><td colspan="7"><div class="empty-state">${icon("users")}<h3>Không tìm thấy người dùng</h3></div></td></tr>`;
    const active = users.filter((u) => u.status === "active").length;
    $("user-foot").innerHTML = `<span>Trang ${state.page}/${pages} · <b>${list.length}</b> người dùng (${active} đang hoạt động · ${users.length - active} đã khóa)</span><div id="user-pages"></div>`;
    renderPagination($("user-pages"), list.length, PER_PAGE, state.page, (p) => { state.page = p; render(); });
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
  $("add-user").addEventListener("click", (e) => {
    e.preventDefault();
    toastThenGo("user-form.html", "Mở biểu mẫu thêm người dùng", "", "info");
  });

  // Lý do khóa: tên ngắn, bấm chọn 1 ô (chi tiết ghi vào ô Ghi chú)
  const LOCK_REASONS = ["Không nhận hàng COD", "Thông tin sai", "Tài khoản ảo", "Đánh giá sai sự thật", "Khách yêu cầu khóa", "Lý do khác"];
  const lockForm = `
    <div class="lock-form">
      <div class="field"><span>Lý do khóa</span>
        <div class="reason-grid">${LOCK_REASONS.map((r, i) => `
          <label class="reason-option"><input type="radio" name="lock-reason" value="${r}" ${i === 0 ? "checked" : ""}><span>${r}</span></label>`).join("")}
        </div>
      </div>
      <label class="field"><span>Ghi chú</span>
        <textarea class="textarea" id="lock-note" rows="3" placeholder="Vd: Liên hệ hotline 1900 1234 để được hỗ trợ mở khóa"></textarea>
      </label>
    </div>`;

  // Khóa / mở khóa
  $("user-body").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-toggle]");
    if (!btn) return;
    const tr = btn.closest("tr");
    const u = users.find((x) => x.id === Number(tr.dataset.id));
    const locking = u.status === "active";
    const asking = confirmDialog({
      title: locking ? "Khóa tài khoản?" : "Mở khóa tài khoản?",
      message: locking
        ? `Tài khoản <b>${escapeHtml(u.name)}</b> sẽ không thể đăng nhập và đặt hàng cho đến khi được mở khóa.`
        : `Tài khoản <b>${escapeHtml(u.name)}</b> sẽ được đăng nhập và mua hàng trở lại.`
          + (u.lockReason ? `<br><small>Lý do khóa trước đó: ${escapeHtml(u.lockReason)}${u.lockNote ? ` · ${escapeHtml(u.lockNote)}` : ""}</small>` : ""),
      body: locking ? lockForm : "", iconName: locking ? "lock" : "unlock",
      okText: locking ? "Khóa" : "Mở khóa", danger: locking,
    });
    // Lấy ô nhập trước khi hộp thoại đóng
    const box = document.querySelector(".confirm-box"), noteEl = $("lock-note");
    if (!(await asking)) return toast("Đã hủy thao tác", "", "info");
    // Web tĩnh: chỉ hiện thông báo, trạng thái trên bảng giữ nguyên
    if (locking) {
      const note = noteEl.value.trim();
      toast("Đã khóa tài khoản", `${escapeHtml(u.name)} · Lý do: ${escapeHtml(box.querySelector('[name="lock-reason"]:checked').value)}${note ? ` · ${escapeHtml(note)}` : ""}`, "warning");
    } else {
      toast("Đã mở khóa tài khoản", escapeHtml(u.name), "success");
    }
  });

  render();
})();
