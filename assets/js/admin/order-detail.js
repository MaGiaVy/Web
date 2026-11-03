// CHI TIẾT ĐƠN HÀNG (ADMIN) - trang riêng, xử lý đơn: trạng thái chỉ đi tới, không quay lại
(function () {
  const $ = (id) => document.getElementById(id);
  const order = { ...(getOrder(getParam("id")) || ORDERS[ORDERS.length - 1]) };
  const u = getUser(order.userId);
  // Giữ tên phường / thành phố trên cùng 1 dòng (không bị cắt "TP. / Hồ Chí Minh")
  const keepTogether = (text) => escapeHtml(text).replace(/ /g, "&nbsp;");
  document.title = `Đơn #${order.id} - Quản trị DVK Gunpla`;

  function renderHead() {
    $("od-title").innerHTML = `Đơn hàng #${order.id} &nbsp;${statusChip(order.status)}`;
    $("od-sub").textContent = `Đặt lúc ${formatDateTime(order.datetime)} · ${orderItemCount(order)} sản phẩm`;
    $("od-timeline").innerHTML = `<div class="card-head"><h3>Tiến trình đơn hàng</h3></div>${orderTimeline(order)}`;
  }

  function renderStatusBox() {
    const next = ORDER_STATUS[order.status].next;
    $("od-status").innerHTML = `
      <div class="card-head"><h3>Xử lý đơn hàng</h3></div>
      <div class="card-pad status-actions">
        ${next.length
          ? next.map((s) => `<button class="btn ${ORDER_ACTIONS[s].cls} btn-block" data-next="${s}">${icon(ORDER_ACTIONS[s].ic)} ${ORDER_ACTIONS[s].text}</button>`).join("")
            + `<p class="status-hint">${icon("info")} Trạng thái đã cập nhật thì không quay lại bước trước được.</p>`
          : `${order.cancelReason ? `<p class="lock-reason-box"><b>Lý do hủy: ${order.cancelReason.reason}</b>${order.cancelReason.note ? `<br><small>${escapeHtml(order.cancelReason.note)}</small>` : ""}</p>` : ""}
             <p class="status-hint">${icon("lock")} ${order.status === "delivered" ? "Đơn hàng đã hoàn tất." : "Đơn hàng đã bị hủy."}</p>`}
      </div>`;
  }

  $("od-status").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-next]");
    if (btn) askOrderStatus(order, btn.dataset.next);
  });

  $("od-actions").innerHTML = `
    <a class="btn btn-outline" href="orders.html">${icon("arrowLeft")} Danh sách đơn</a>
    <button class="btn btn-dark" id="print">${icon("download")} In hóa đơn</button>`;
  $("print").addEventListener("click", () => toast("Đã gửi lệnh in hóa đơn", `Đơn #${order.id}`, "info"));

  $("od-items").innerHTML = orderItemsTable(order, "product-form.html?id=");
  // Khách hàng, giao hàng, thanh toán gộp trong 1 khung, chia mục cho gọn
  $("od-info").innerHTML = `
    <div class="od-section">
      <h4>${icon("user")} Khách hàng</h4>
      <b>${escapeHtml(u.name)}</b>
      <span>${u.email} · ${u.phone}</span>
      <a class="link" href="orders.html?user=${u.id}">Xem các đơn khác của khách ›</a>
    </div>
    <div class="od-section">
      <h4>${icon("truck")} Giao đến</h4>
      <b>${escapeHtml(order.address.receiver)} · ${order.address.phone}</b>
      <span>${escapeHtml(order.address.street)}, ${keepTogether(order.address.ward)}, ${keepTogether(order.address.city)}</span>
      ${order.note ? `<p class="od-note">${icon("note")} ${escapeHtml(order.note)}</p>` : ""}
    </div>
    <div class="od-section">
      <h4>${icon(order.payment === "cod" ? "cash" : "bank")} Thanh toán</h4>
      <b>${PAYMENT_METHODS[order.payment]}</b>
    </div>`;
  // Tiền hàng + phí ship ở trên, Tổng thanh toán tách riêng 1 dải cho dễ phân biệt
  $("od-totals").innerHTML = `
    <div class="od-sum">
      <div class="od-sum-row"><span>Tiền hàng (${orderItemCount(order)} sản phẩm)</span><b>${money(order.subtotal)}</b></div>
      <div class="od-sum-row"><span>Phí vận chuyển ${order.shipping ? "" : "<small>(đơn từ 1.000.000đ)</small>"}</span><b>${order.shipping ? money(order.shipping) : "Miễn phí"}</b></div>
    </div>
    <div class="od-sum-total"><span>Tổng thanh toán</span><b>${money(order.total)}</b></div>`;

  renderHead();
  renderStatusBox();
})();
