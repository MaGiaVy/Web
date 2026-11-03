// CHI TIẾT ĐƠN HÀNG (ADMIN) - trang riêng, có cập nhật trạng thái chỉ theo chiều xuôi
(function () {
  const $ = (id) => document.getElementById(id);
  const order = { ...(getOrder(getParam("id")) || ORDERS[ORDERS.length - 1]) };
  const u = getUser(order.userId);
  document.title = `Đơn #${order.id} - Quản trị DVK Gunpla`;

  function renderHead() {
    $("od-title").innerHTML = `Đơn hàng #${order.id} &nbsp;${statusChip(order.status)}`;
    $("od-sub").textContent = `Đặt lúc ${formatDateTime(order.datetime)} · ${orderItemCount(order)} sản phẩm · ${PAYMENT_METHODS[order.payment]}`;
    $("od-timeline").innerHTML = `<div class="card-head"><h3>Tiến trình đơn hàng</h3></div>${orderTimeline(order)}`;
  }

  function renderStatusBox() {
    const next = ORDER_STATUS[order.status].next;
    $("od-status").innerHTML = `
      <div class="card-head"><h3>Cập nhật trạng thái</h3></div>
      <div class="card-pad" style="display:grid;gap:12px">
        <div>Trạng thái hiện tại: ${statusChip(order.status)}</div>
        ${next.length ? `
          <select class="select" id="next-status">
            <option value="">-- Chọn trạng thái mới --</option>
            ${next.map((s) => `<option value="${s}">${ORDER_STATUS[s].label}</option>`).join("")}
          </select>
          <button class="btn btn-dark btn-block" id="save-status">${icon("check")} Cập nhật trạng thái</button>`
        : `<p class="final-note">${icon("lock")} Đơn hàng đã ở trạng thái cuối, không thể thay đổi.</p>`}
      </div>
      <div class="flow-note" style="border-top:1px solid var(--line)">
        <b>Quy trình (chỉ cập nhật xuôi):</b>
        <div>${statusChip("pending")} ${icon("arrowRight")} ${statusChip("confirmed")} ${icon("arrowRight")} ${statusChip("delivered")}</div>
        <div class="muted">Đơn chưa giao có thể chuyển sang ${statusChip("cancelled")}</div>
      </div>`;
    const btn = $("save-status");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      const value = $("next-status").value;
      if (!value) return toast("Chưa chọn trạng thái mới", "Hãy chọn trạng thái trong danh sách", "warning");
      const ok = await confirmDialog({
        title: "Cập nhật trạng thái?",
        message: `${ORDER_STATUS[order.status].label} → <b>${ORDER_STATUS[value].label}</b>.<br>Sau khi cập nhật sẽ không thể quay lại.`,
        okText: "Cập nhật", danger: value === "cancelled",
      });
      if (!ok) return toast("Đã hủy cập nhật", "", "info");
      // Web tĩnh: chỉ hiện thông báo, trạng thái giữ nguyên
      $("next-status").value = "";
      toast("Cập nhật trạng thái thành công", `Đơn #${order.id}: ${ORDER_STATUS[value].label}`, value === "cancelled" ? "warning" : "success");
    });
  }

  $("od-actions").innerHTML = `
    <a class="btn btn-outline" href="orders.html">${icon("arrowLeft")} Danh sách đơn</a>
    <button class="btn btn-dark" id="print">${icon("download")} In hóa đơn</button>`;
  $("print").addEventListener("click", () => toast("Đã gửi lệnh in hóa đơn", `Đơn #${order.id}`, "info"));

  $("od-items").innerHTML = orderItemsTable(order, "product-form.html?id=");
  $("od-info").innerHTML = `
    <div class="info-row">${icon("user")}<div><small>Khách hàng</small><b>${escapeHtml(u.name)}</b> · <a class="link" href="orders.html?user=${u.id}">Xem các đơn khác</a></div></div>
    <div class="info-row">${icon("mail")}<div><small>Email</small><b>${u.email}</b></div></div>
    <div class="info-row">${icon("phone")}<div><small>Người nhận</small><b>${escapeHtml(order.address.receiver)} - ${order.address.phone}</b></div></div>
    <div class="info-row">${icon("map")}<div><small>Địa chỉ giao hàng</small><b>${escapeHtml(fullAddress(order.address))}</b></div></div>
    ${order.note ? `<div class="info-row">${icon("note")}<div><small>Ghi chú</small><b>${escapeHtml(order.note)}</b></div></div>` : ""}`;
  $("od-totals").innerHTML = `<div class="card-head"><h3>Thanh toán</h3></div>${orderTotalsBox(order)}`;

  renderHead();
  renderStatusBox();
})();
