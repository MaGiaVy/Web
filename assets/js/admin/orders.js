// QUẢN LÝ ĐƠN HÀNG: lọc theo tình trạng / khoảng ngày / địa điểm (tỉnh/thành, phường/xã) (web tĩnh: chỉ hiện thông báo), bấm Xử lý / Xem để mở trang chi tiết (xác nhận, hủy đơn làm ở trang chi tiết)
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
  $("of-city").innerHTML = `<option value="">Tất cả tỉnh/thành</option>` + Object.keys(LOCATIONS).map((c) => `<option>${c}</option>`).join("");
  const fillDistricts = () => {
    const city = $("of-city").value;
    $("of-district").innerHTML = `<option value="">Tất cả phường/xã</option>` + (city ? LOCATIONS[city].map((d) => `<option>${d}</option>`).join("") : "");
    $("of-district").disabled = !city;
  };
  fillDistricts();
  $("of-city").addEventListener("change", fillDistricts);

  // Danh sách cố định (không lọc thật). Chỉ khi mở từ trang khách hàng thì hiện đơn của khách đó;
  // mở từ Thống kê (có kèm from/to) thì chỉ hiện các đơn đã mua trong kỳ thống kê, khớp số đơn ở bảng Top 5
  const statFrom = filterUser && getParam("from"), statTo = filterUser && getParam("to");
  function filtered() {
    return orders.filter((o) => !filterUser || (o.userId === filterUser.id && (!statFrom ||
      (o.status !== "cancelled" && o.datetime.slice(0, 10) >= statFrom && o.datetime.slice(0, 10) <= statTo))));
  }

  function row(o) {
    const u = getUser(o.userId);
    return `<tr data-id="${o.id}">
      <td><a class="order-link" href="order-detail.html?id=${o.id}">#${o.id}</a></td>
      <td><div class="cell-user"><span class="avatar">${initials(u.name)}</span><div><b>${escapeHtml(u.name)}</b><small>${u.phone}</small></div></div></td>
      <td>${formatDate(o.datetime)}<br><small class="muted">${o.datetime.split(" ")[1]}</small></td>
      <td class="nowrap">${o.address.ward}<br><small class="muted">${o.address.city}</small></td>
      <td class="right num"><b>${money(o.total)}</b><br><small class="muted">${orderItemCount(o)} sản phẩm</small></td>
      <td>${statusChip(o.status)}</td>
      <td class="right">${ORDER_STATUS[o.status].next.length
        ? `<a class="btn btn-dark btn-sm" href="order-detail.html?id=${o.id}">Xử lý ${icon("chevronRight")}</a>`
        : `<a class="btn btn-outline btn-sm" href="order-detail.html?id=${o.id}">Xem ${icon("chevronRight")}</a>`}</td>
    </tr>`;
  }

  function render() {
    const list = filtered();
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PER_PAGE;
    $("order-body").innerHTML = list.length ? list.slice(start, start + PER_PAGE).map(row).join("")
      : `<tr><td colspan="7"><div class="empty-state">${icon("orders")}<h3>Không có đơn hàng phù hợp</h3><p>Hãy thử thay đổi điều kiện lọc.</p></div></td></tr>`;

    // Chỉ hiện dòng này khi đang xem đơn của 1 khách (từ trang Người dùng / Thống kê)
    $("of-note").innerHTML = filterUser
      ? `<div class="search-result-bar"><span>${icon("user")}<span>Đơn hàng của khách <b>${escapeHtml(filterUser.name)}</b>${statFrom ? ` từ ${formatDate(statFrom)} đến ${formatDate(statTo)} (không tính đơn hủy)` : ""}: <b>${list.length}</b> đơn · tổng <b>${money(list.reduce((s, o) => s + o.total, 0))}</b></span></span>
          <a class="link" href="orders.html" style="margin-left:auto">← Xem tất cả đơn hàng</a></div>`
      : "";

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
  render();
  if (filterUser) toast("Danh sách đơn hàng của khách", filterUser.name, "info");
})();
