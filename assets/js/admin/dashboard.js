// TỔNG QUAN QUẢN TRỊ
(function () {
  const PER_PAGE = 5;
  const $ = (id) => document.getElementById(id);

  // Bảng có phân trang ở chân (mỗi trang 5 dòng), dùng cho cả 3 bảng bên dưới
  function pagedTable(name, list, rowHtml, unit) {
    let current = 1;
    const render = () => {
      const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      const start = (current - 1) * PER_PAGE;
      $(`${name}-body`).innerHTML = list.slice(start, start + PER_PAGE).map(rowHtml).join("");
      $(`${name}-foot`).innerHTML = `<span>Trang ${current}/${pages} · <b>${list.length}</b> ${unit}</span><div id="${name}-pages"></div>`;
      renderPagination($(`${name}-pages`), list.length, PER_PAGE, current, (p) => { current = p; render(); });
    };
    render();
  }
  const valid = ORDERS.filter((o) => o.status !== "cancelled");
  const LOW_STOCK = 15; // còn từ 15 sản phẩm trở xuống thì báo sắp hết

  // Mốc "hôm nay" = ngày của đơn mới nhất trong dữ liệu mẫu (thầy mở ngày nào số liệu vẫn đúng)
  const DAY = 86400000;
  const today = new Date(ORDERS.map((o) => o.datetime.slice(0, 10)).sort().pop());
  const iso = (d) => d.toISOString().slice(0, 10);
  const daysAgo = (n) => iso(new Date(today - n * DAY));
  const between = (list, from, to) => list.filter((o) => { const d = o.datetime.slice(0, 10); return d >= from && d <= to; });
  const sum = (list) => list.reduce((s, o) => s + o.total, 0);
  // So sánh với kỳ trước: ▲ xanh khi tăng, ▼ đỏ khi giảm
  const trend = (now, before, text) => {
    if (!before) return `<span class="trend up">▲ Mới</span> ${text}`;
    const pct = Math.round(((now - before) / before) * 100);
    return `<span class="trend ${pct >= 0 ? "up" : "down"}">${pct >= 0 ? "▲" : "▼"} ${Math.abs(pct)}%</span> ${text}`;
  };

  // Doanh thu: chỉ tính đơn đã giao thành công
  const delivered = ORDERS.filter((o) => o.status === "delivered");
  const rev30 = sum(between(delivered, daysAgo(29), iso(today)));
  const revPrev = sum(between(delivered, daysAgo(59), daysAgo(30)));
  const new7 = between(ORDERS, daysAgo(6), iso(today)).length;
  const newPrev = between(ORDERS, daysAgo(13), daysAgo(7)).length;
  const waitConfirm = ORDERS.filter((o) => o.status === "pending").length;
  const waitShip = ORDERS.filter((o) => o.status === "confirmed" || o.status === "shipping").length;
  const lowStock = PRODUCTS.filter((p) => p.stock <= LOW_STOCK);

  const kpis = [
    ["wallet", "Doanh thu 30 ngày", money(rev30), trend(rev30, revPrev, "so với kỳ trước"), "statistics.html",
      `Đơn đã giao từ ${formatDate(daysAgo(29))} đến ${formatDate(iso(today))}`, "kpi-green"],
    ["orders", "Đơn mới 7 ngày", new7, trend(new7, newPrev, "so với kỳ trước"), "orders.html",
      `Đơn đặt từ ${formatDate(daysAgo(6))} đến ${formatDate(iso(today))}`, "kpi-blue"],
    ["clock", "Đơn cần xử lý", waitConfirm + waitShip, `${waitConfirm} chờ xác nhận · ${waitShip} chờ giao`, "#h-pending", "Xem các đơn cần xử lý", "kpi-purple"],
    ["warning", "Sắp hết hàng", lowStock.length, `${lowStock.filter((p) => p.stock <= 5).length} sản phẩm còn ≤ 5`, "#h-stock", `Sản phẩm còn từ ${LOW_STOCK} cái trở xuống`, "kpi-amber"],
  ];
  $("kpis").innerHTML = kpis.map(([ic, label, value, sub, href, tip, color]) => `
    <a class="card kpi kpi-link" href="${href}" title="${tip}"><div class="kpi-icon ${color}">${icon(ic)}</div>
      <div><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div></a>`).join("");

  $("h-pending").innerHTML = `${icon("clock")} Đơn hàng cần xử lý`;
  const todo = ORDERS.filter((o) => o.status === "pending" || o.status === "confirmed" || o.status === "shipping").sort((a, b) => b.datetime.localeCompare(a.datetime));
  pagedTable("pending", todo, (o) => {
    const u = getUser(o.userId);
    return `<tr>
      <td><a class="order-link" href="order-detail.html?id=${o.id}">#${o.id}</a></td>
      <td><div class="cell-user"><span class="avatar">${initials(u.name)}</span><div><b>${u.name}</b><small>${u.phone}</small></div></div></td>
      <td>${formatDateTime(o.datetime)}</td>
      <td class="right num"><b>${money(o.total)}</b></td>
      <td>${statusChip(o.status)}</td>
      <td class="right"><a class="btn btn-dark btn-sm" href="order-detail.html?id=${o.id}">Xử lý ${icon("chevronRight")}</a></td>
    </tr>`;
  }, "đơn cần xử lý");

  // Mỗi khách: số đơn + tổng tiền (không liệt kê từng đơn ra đây cho gọn)
  $("h-customers").innerHTML = `${icon("users")} Khách hàng & mức mua`;
  const rows = USERS.map((u) => {
    const list = valid.filter((o) => o.userId === u.id);
    return { u, count: list.length, total: list.reduce((s, o) => s + o.total, 0) };
  }).filter((r) => r.count > 0).sort((a, b) => b.total - a.total); // chỉ khách đã có đơn
  pagedTable("customer", rows, ({ u, count, total }) => {
    const addr = u.addresses.find((a) => a.isDefault);
    return `<tr>
      <td><div class="cell-user"><span class="avatar">${initials(u.name)}</span><div><b>${u.name}</b><small>${u.email}</small></div></div></td>
      <td class="nowrap">${addr.ward}<br><small class="muted">${addr.city}</small></td>
      <td class="center num"><b>${count}</b> đơn</td>
      <td class="right num"><b class="text-red">${money(total)}</b></td>
      <td class="right"><a class="btn btn-dark btn-sm" href="orders.html?user=${u.id}" data-view-orders="${u.name}">${icon("orders")} Xem danh sách đơn hàng</a></td>
    </tr>`;
  }, "khách đã mua hàng");
  $("customer-body").addEventListener("click", (e) => {
    const link = e.target.closest("[data-view-orders]");
    if (!link) return;
    e.preventDefault();
    toastThenGo(link.getAttribute("href"), "Đang mở danh sách đơn hàng", `Khách hàng: ${link.dataset.viewOrders}`, "info");
  });

  $("h-stock").innerHTML = `${icon("warning")} Sản phẩm sắp hết hàng`;
  const low = PRODUCTS.filter((p) => p.stock <= LOW_STOCK).sort((a, b) => a.stock - b.stock);
  pagedTable("stock", low, (p) => `<tr>
      <td><div class="cell-product"><img src="${asset(p.image)}" alt=""><div><b>${p.name}</b><small><span class="grade grade-${p.category}">${p.category}</span></small></div></div></td>
      <td class="right num">${money(p.price)}</td>
      <td class="center"><span class="chip ${p.stock <= 5 ? "chip-cancelled" : "chip-pending"}">Còn ${p.stock}</span></td>
      <td class="center num">${numberDot(p.sold)}</td>
      <td class="right"><a class="btn btn-outline btn-sm" href="product-form.html?id=${p.id}">${icon("edit")} Sửa</a></td>
    </tr>`, "sản phẩm còn từ 15 trở xuống");
})();
