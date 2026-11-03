// LỊCH SỬ MUA HÀNG - nhóm theo từng đơn hàng (tab trạng thái chỉ hiện thông báo), bấm "Xem chi tiết" mở trang order-detail.html riêng
(function () {
  const user = currentUser();
  const myOrders = ORDERS.filter((o) => o.userId === user.id).sort((a, b) => b.datetime.localeCompare(a.datetime));
  const totalSpent = myOrders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  let current = "all";

  document.getElementById("orders-sub").innerHTML = `Bạn có <b>${myOrders.length}</b> đơn hàng · Tổng chi tiêu <b class="text-red">${money(totalSpent)}</b>`;

  const tabs = [["all", "Tất cả"], ...Object.entries(ORDER_STATUS).map(([k, v]) => [k, v.label])];
  function renderTabs() {
    document.getElementById("status-tabs").innerHTML = tabs.map(([key, label]) => {
      return `<button data-status="${key}" class="${key === current ? "active" : ""}">${label}</button>`;
    }).join("");
  }

  function renderList() {
    // Web tĩnh: bấm tab chỉ hiện thông báo, danh sách đơn giữ nguyên
    const list = myOrders;
    document.getElementById("order-list").innerHTML = list.length ? list.map((o) => {
      const shown = o.items.slice(0, 2);
      const more = o.items.length - shown.length;
      return `
        <article class="card order-card">
          <div class="card-head">
            <div class="order-id"><b>#${o.id}</b><small>${icon("calendar")} ${formatDateTime(o.datetime)}</small><small>${icon("wallet")} ${o.payment === "cod" ? "Tiền mặt (COD)" : "Chuyển khoản"}</small></div>
            ${statusChip(o.status)}
          </div>
          <div class="order-items">
            ${shown.map((it) => {
              const p = getProduct(it.productId);
              return `<div class="order-item"><img src="${asset(p.image)}" alt="${escapeHtml(p.name)}"><div><b>${escapeHtml(p.name)}</b><small>${p.category} · x${it.qty}</small></div><span class="num">${money(it.price * it.qty)}</span></div>`;
            }).join("")}
            ${more > 0 ? `<p class="order-more">và ${more} sản phẩm khác...</p>` : ""}
          </div>
          <div class="order-foot">
            <span class="total">${orderItemCount(o)} sản phẩm · Tổng tiền:<b>${money(o.total)}</b></span>
            <div class="actions">
              <button class="btn btn-outline btn-sm" data-rebuy="${o.id}">${icon("refresh")} Mua lại</button>
              <a class="btn btn-dark btn-sm" href="order-detail.html?id=${o.id}">Xem chi tiết ${icon("arrowRight")}</a>
            </div>
          </div>
        </article>`;
    }).join("") : `<div class="card empty-state">${icon("orders")}<h3>Không có đơn hàng nào</h3><p>Chưa có đơn hàng ở trạng thái này.</p></div>`;
  }

  document.getElementById("status-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-status]");
    if (!btn) return;
    current = btn.dataset.status;
    renderTabs();
    renderList();
    toast("Đã lọc đơn hàng", btn.textContent, "info");
  });

  document.getElementById("order-list").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-rebuy]");
    if (btn) toast("Đã thêm vào giỏ hàng", `Các sản phẩm trong đơn #${btn.dataset.rebuy}`);
  });

  renderTabs();
  renderList();
})();
