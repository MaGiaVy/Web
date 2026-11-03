// QUẢN LÝ ĐƠN HÀNG: lọc theo tình trạng / khoảng ngày / địa điểm (web tĩnh: chỉ hiện thông báo), cập nhật trạng thái (chỉ xuôi)
// orders.html?user=... : xem danh sách đơn của 1 khách (mở từ Tổng quan / Thống kê)
(function () {
  const PER_PAGE = 10;
  const $ = (id) => document.getElementById(id);
  const orders = ORDERS.map((o) => ({ ...o })).sort((a, b) => b.datetime.localeCompare(a.datetime));
  const filterUser = getUser(getParam("user"));
  const state = { page: 1 };

  $("of-submit").innerHTML = `${icon("filter")} Lọc đơn hàng`;
  $("of-status").innerHTML = `<option value="">Tất cả tình trạng</option>` +
    Object.entries(ORDER_STATUS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join("");
  $("of-from").value = getParam("from") || "";
  $("of-to").value = getParam("to") || "";
  $("of-city").innerHTML = `<option value="">Tất cả thành phố</option>` + Object.keys(LOCATIONS).map((c) => `<option>${c}</option>`).join("");
  const fillDistricts = () => {
    const city = $("of-city").value;
    $("of-district").innerHTML = `<option value="">Tất cả quận/huyện</option>` + (city ? LOCATIONS[city].map((d) => `<option>${d}</option>`).join("") : "");
    $("of-district").disabled = !city;
  };
  fillDistricts();
  $("of-city").addEventListener("change", fillDistricts);

  // Danh sách cố định (không lọc thật). Chỉ khi mở từ trang khách hàng thì hiện đơn của khách đó
  function filtered() {
    return orders.filter((o) => !filterUser || o.userId === filterUser.id);
  }

  // Chỉ hiện các trạng thái kế tiếp hợp lệ -> không thể cập nhật ngược
  function statusControl(o) {
    const next = ORDER_STATUS[o.status].next;
    if (!next.length) return `<span class="final-note">${icon("lock")} Đã hoàn tất, không thể đổi</span>`;
    return `<div class="status-update">
      <select class="select" data-next>
        <option value="">-- Chuyển sang --</option>
        ${next.map((s) => `<option value="${s}">${ORDER_STATUS[s].label}</option>`).join("")}
      </select>
      <button class="btn btn-dark btn-sm" data-save>Lưu</button>
    </div>`;
  }

  function row(o) {
    const u = getUser(o.userId);
    return `<tr data-id="${o.id}">
      <td><a class="order-link" href="order-detail.html?id=${o.id}">#${o.id}</a></td>
      <td><div class="cell-user"><span class="avatar">${initials(u.name)}</span><div><b>${escapeHtml(u.name)}</b><small>${u.phone}</small></div></div></td>
      <td>${formatDate(o.datetime)}<br><small class="muted">${o.datetime.split(" ")[1]}</small></td>
      <td>${o.address.district}<br><small class="muted">${o.address.city}</small></td>
      <td class="right num"><b>${money(o.total)}</b><br><small class="muted">${orderItemCount(o)} sản phẩm</small></td>
      <td>${statusChip(o.status)}</td>
      <td>${statusControl(o)}</td>
      <td class="right"><a class="icon-btn" href="order-detail.html?id=${o.id}" title="Xem chi tiết đơn hàng">${icon("eye")}</a></td>
    </tr>`;
  }

  function render() {
    const list = filtered();
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PER_PAGE;
    $("order-body").innerHTML = list.length ? list.slice(start, start + PER_PAGE).map(row).join("")
      : `<tr><td colspan="8"><div class="empty-state">${icon("orders")}<h3>Không có đơn hàng phù hợp</h3><p>Hãy thử thay đổi điều kiện lọc.</p></div></td></tr>`;

    const sum = list.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
    $("of-note").innerHTML = (filterUser
      ? `Danh sách đơn hàng của khách <b>${escapeHtml(filterUser.name)}</b>: <b>${list.length}</b> đơn · `
      : `Tổng cộng <b>${list.length}</b> đơn hàng · `) +
      `Tổng giá trị (trừ đơn hủy): <b class="text-red">${money(sum)}</b>` +
      (filterUser ? ` <a class="link" href="orders.html">← Xem tất cả đơn hàng</a>` : "");

    $("order-foot").innerHTML = `<span>Trang ${state.page}/${pages} · ${list.length} đơn hàng</span><div id="order-pages"></div>`;
    renderPagination($("order-pages"), list.length, PER_PAGE, state.page, (page) => { state.page = page; render(); });
    return list.length;
  }

  // Lọc: chỉ hiện thông báo, danh sách giữ nguyên
  $("order-filter").addEventListener("submit", (e) => {
    e.preventDefault();
    const parts = [];
    const key = $("of-key").value.trim();
    const from = $("of-from").value, to = $("of-to").value;
    if (key) parts.push(`Từ khóa: “${escapeHtml(key)}”`);
    if ($("of-status").value) parts.push($("of-status").selectedOptions[0].text);
    if (from || to) parts.push(`${from ? formatDate(from) : "..."} → ${to ? formatDate(to) : "..."}`);
    if ($("of-city").value) parts.push(($("of-district").value ? $("of-district").value + ", " : "") + $("of-city").value);
    toast("Đã lọc đơn hàng", parts.length ? parts.join(" · ") : "Tất cả đơn hàng");
  });
  $("of-reset").addEventListener("click", () => {
    $("order-filter").reset();
    fillDistricts();
    toast("Đã đặt lại bộ lọc", "", "info");
  });

  // Cập nhật trạng thái
  $("order-body").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-save]");
    if (!btn) return;
    const tr = btn.closest("tr");
    const o = orders.find((x) => x.id === tr.dataset.id);
    const next = tr.querySelector("[data-next]").value;
    if (!next) return toast("Chưa chọn trạng thái mới", "Hãy chọn trạng thái trong danh sách trước khi lưu", "warning");
    const ok = await confirmDialog({
      title: "Cập nhật trạng thái?",
      message: `Đơn <b>#${o.id}</b>: ${ORDER_STATUS[o.status].label} → <b>${ORDER_STATUS[next].label}</b>.<br>Lưu ý: không thể quay lại trạng thái trước.`,
      okText: "Cập nhật", danger: next === "cancelled",
    });
    if (!ok) return toast("Đã hủy cập nhật", "", "info");
    // Web tĩnh: chỉ hiện thông báo, trạng thái trên bảng giữ nguyên
    tr.querySelector("[data-next]").value = "";
    toast("Cập nhật trạng thái thành công", `Đơn #${o.id}: ${ORDER_STATUS[next].label}`, next === "cancelled" ? "warning" : "success");
  });

  render();
  if (filterUser) toast("Danh sách đơn hàng của khách", filterUser.name, "info");
})();
