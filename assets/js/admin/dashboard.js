// TỔNG QUAN QUẢN TRỊ
(function () {
  const $ = (id) => document.getElementById(id);
  const valid = ORDERS.filter((o) => o.status !== "cancelled");
  const delivered = ORDERS.filter((o) => o.status === "delivered");
  const revenue = delivered.reduce((s, o) => s + o.total, 0);
  const pending = ORDERS.filter((o) => o.status === "pending");
  const activeUsers = USERS.filter((u) => u.status === "active").length;

  const kpis = [
    ["wallet", "Doanh thu", money(revenue), `Từ ${delivered.length} đơn đã giao thành công`],
    ["orders", "Đơn chờ xác nhận", pending.length, `Trên tổng số ${ORDERS.length} đơn hàng`],
    ["users", "Khách hàng", USERS.length, `${activeUsers} đang hoạt động · ${USERS.length - activeUsers} bị khóa`],
    ["box", "Sản phẩm", PRODUCTS.length, `${CATEGORIES.length} phân loại`],
  ];
  $("kpis").innerHTML = kpis.map(([ic, label, value, sub]) => `
    <div class="card kpi"><div class="kpi-icon">${icon(ic)}</div>
      <div><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div></div>`).join("");

  $("h-pending").innerHTML = `${icon("clock")} Đơn hàng cần xử lý`;
  const todo = ORDERS.filter((o) => o.status === "pending" || o.status === "confirmed").sort((a, b) => b.datetime.localeCompare(a.datetime)).slice(0, 5);
  $("pending-body").innerHTML = todo.map((o) => {
    const u = getUser(o.userId);
    return `<tr>
      <td><a class="order-link" href="order-detail.html?id=${o.id}">#${o.id}</a></td>
      <td><div class="cell-user"><span class="avatar">${initials(u.name)}</span><div><b>${u.name}</b><small>${u.phone}</small></div></div></td>
      <td>${formatDateTime(o.datetime)}</td>
      <td class="right num"><b>${money(o.total)}</b></td>
      <td>${statusChip(o.status)}</td>
      <td class="right"><a class="btn btn-outline btn-sm" href="order-detail.html?id=${o.id}">Xử lý</a></td>
    </tr>`;
  }).join("");

  // Mỗi khách: số đơn + tổng tiền (không liệt kê từng đơn ra đây cho gọn)
  $("h-customers").innerHTML = `${icon("users")} Khách hàng & mức mua`;
  const rows = USERS.map((u) => {
    const list = valid.filter((o) => o.userId === u.id);
    return { u, count: list.length, total: list.reduce((s, o) => s + o.total, 0) };
  }).sort((a, b) => b.total - a.total);
  $("customer-body").innerHTML = rows.map(({ u, count, total }) => {
    const addr = u.addresses.find((a) => a.isDefault);
    return `<tr>
      <td><div class="cell-user"><span class="avatar">${initials(u.name)}</span><div><b>${u.name}</b><small>${u.email}</small></div></div></td>
      <td>${addr.ward}, ${addr.city}</td>
      <td class="center num"><b>${count}</b> đơn</td>
      <td class="right num"><b class="text-red">${money(total)}</b></td>
      <td class="right"><a class="btn btn-dark btn-sm" href="orders.html?user=${u.id}" data-view-orders="${u.name}">${icon("orders")} Xem danh sách đơn hàng</a></td>
    </tr>`;
  }).join("");
  $("customer-body").addEventListener("click", (e) => {
    const link = e.target.closest("[data-view-orders]");
    if (!link) return;
    e.preventDefault();
    toastThenGo(link.getAttribute("href"), "Đang mở danh sách đơn hàng", `Khách hàng: ${link.dataset.viewOrders}`, "info");
  });

  $("h-stock").innerHTML = `${icon("warning")} Sản phẩm sắp hết hàng`;
  const low = PRODUCTS.slice().sort((a, b) => a.stock - b.stock).slice(0, 5);
  $("stock-body").innerHTML = low.map((p) => `<tr>
      <td><div class="cell-product"><img src="${asset(p.image)}" alt=""><div><b>${p.name}</b><small><span class="grade grade-${p.category}">${p.category}</span></small></div></div></td>
      <td class="right num">${money(p.price)}</td>
      <td class="center"><span class="chip ${p.stock <= 5 ? "chip-cancelled" : "chip-pending"}">Còn ${p.stock}</span></td>
      <td class="center num">${numberDot(p.sold)}</td>
      <td class="right"><a class="btn btn-outline btn-sm" href="product-form.html?id=${p.id}">${icon("edit")} Sửa</a></td>
    </tr>`).join("");
})();
