// CHI TIẾT ĐƠN HÀNG (trang riêng: order-detail.html?id=...)
(function () {
  const order = getOrder(getParam("id")) || ORDERS.find((o) => o.userId === CURRENT_USER_ID);
  const $ = (id) => document.getElementById(id);
  document.title = `Đơn hàng #${order.id} - DVK Gunpla`;

  $("breadcrumb").innerHTML = `<a href="index.html">Trang chủ</a>${icon("chevronRight")}<a href="orders.html">Lịch sử mua hàng</a>${icon("chevronRight")}<b>Đơn #${order.id}</b>`;
  $("od-title").innerHTML = `Đơn hàng #${order.id} &nbsp;${statusChip(order.status)}`;
  $("od-sub").textContent = `Đặt lúc ${formatDateTime(order.datetime)} · ${orderItemCount(order)} sản phẩm`;

  $("od-actions").innerHTML = `
    <a class="btn btn-outline" href="orders.html">${icon("arrowLeft")} Quay lại lịch sử</a>
    ${order.status === "pending" ? `<button class="btn btn-danger-outline" id="cancel-order">${icon("x")} Hủy đơn</button>` : ""}
    <button class="btn btn-dark" id="rebuy">${icon("refresh")} Mua lại</button>`;

  $("od-timeline").innerHTML = `<div class="card-head"><h3>Trạng thái đơn hàng</h3></div>${orderTimeline(order)}`;
  $("od-items").innerHTML = orderItemsTable(order);
  $("od-info").innerHTML = `
    <div class="info-row">${icon("user")}<div><small>Người nhận</small><b>${escapeHtml(order.address.receiver)}</b></div></div>
    <div class="info-row">${icon("phone")}<div><small>Số điện thoại</small><b>${order.address.phone}</b></div></div>
    <div class="info-row">${icon("map")}<div><small>Địa chỉ giao hàng</small><b>${escapeHtml(fullAddress(order.address))}</b></div></div>
    <div class="info-row">${icon("wallet")}<div><small>Hình thức thanh toán</small><b>${PAYMENT_METHODS[order.payment]}</b></div></div>
    ${order.note ? `<div class="info-row">${icon("note")}<div><small>Ghi chú</small><b>${escapeHtml(order.note)}</b></div></div>` : ""}`;
  $("od-totals").innerHTML = `<div class="card-head"><h3>Thanh toán</h3></div>${orderTotalsBox(order)}`;

  $("rebuy").addEventListener("click", () => toast("Đã thêm vào giỏ hàng", `${orderItemCount(order)} sản phẩm từ đơn #${order.id}`));
  const cancelBtn = $("cancel-order");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", async () => {
      const ok = await confirmDialog({ title: "Hủy đơn hàng?", message: `Bạn có chắc muốn hủy đơn <b>#${order.id}</b> không?`, okText: "Hủy đơn", cancelText: "Không", danger: true });
      if (!ok) return toast("Đơn hàng vẫn được giữ nguyên", "", "info");
      toast("Đã gửi yêu cầu hủy đơn", `Đơn #${order.id} sẽ được cửa hàng xử lý`, "warning");
    });
  }
})();
