// TRANG ĐẶT HÀNG: tự hiển thị thông tin người đăng nhập, chọn/nhập địa chỉ, chọn hình thức thanh toán
(function () {
  const user = currentUser();
  const $ = (id) => document.getElementById(id);

  $("h-user").innerHTML = `${icon("user")} Thông tin người đặt hàng`;
  $("h-address").innerHTML = `${icon("map")} Địa chỉ giao hàng`;
  $("h-payment").innerHTML = `${icon("wallet")} Hình thức thanh toán`;
  $("h-note").innerHTML = `${icon("note")} Ghi chú`;

  $("user-box").innerHTML = `
    <span class="avatar">${initials(user.name)}</span>
    <div><b>${escapeHtml(user.name)}</b><p>${user.phone} · ${user.email}</p></div>
    <span class="chip chip-active">Đã đăng nhập</span>`;

  // Địa chỉ đã lưu + lựa chọn nhập địa chỉ mới
  $("address-options").innerHTML = user.addresses.map((a) => `
    <label class="option ${a.isDefault ? "checked" : ""}">
      <input type="radio" name="address" value="${a.id}" ${a.isDefault ? "checked" : ""}>
      <div class="option-main">
        <b>${escapeHtml(a.receiver)} <span class="muted" style="font-weight:400">| ${a.phone}</span> <span class="chip chip-gray no-dot">${a.label}</span> ${a.isDefault ? '<span class="chip chip-confirmed no-dot">Mặc định</span>' : ""}</b>
        <p>${escapeHtml(fullAddress(a))}</p>
      </div>
    </label>`).join("") + `
    <label class="option">
      <input type="radio" name="address" value="new">
      <div class="option-main"><b>${icon("plus")} Giao đến địa chỉ khác</b><p>Nhập một địa chỉ nhận hàng mới cho đơn này</p></div>
    </label>`;

  // Tỉnh/thành -> phường/xã (đơn vị hành chính 2 cấp mới)
  $("na-city").innerHTML = Object.keys(LOCATIONS).map((c) => `<option>${c}</option>`).join("");
  const fillDistricts = () => {
    $("na-ward").innerHTML = LOCATIONS[$("na-city").value].map((d) => `<option>${d}</option>`).join("");
  };
  fillDistricts();
  $("na-city").addEventListener("change", fillDistricts);
  $("na-name").value = user.name;
  $("na-phone").value = user.phone;

  $("payment-options").innerHTML = `
    <label class="option checked">
      <input type="radio" name="payment" value="cod" checked>
      <div class="option-icon">${icon("cash")}</div>
      <div class="option-main"><b>Thanh toán tiền mặt khi nhận hàng (COD)</b><p>Thanh toán trực tiếp cho nhân viên giao hàng</p></div>
    </label>
    <label class="option">
      <input type="radio" name="payment" value="bank">
      <div class="option-icon">${icon("bank")}</div>
      <div class="option-main"><b>Chuyển khoản trực tuyến</b><p>Quét mã QR hoặc chuyển khoản theo thông tin bên dưới</p></div>
    </label>`;
  $("bank-content").textContent = `${user.phone.replace(/\s/g, "")} THANH TOAN DON HANG`;

  // Đổi kiểu viền khi chọn
  function syncOptions(name) {
    document.querySelectorAll(`input[name="${name}"]`).forEach((r) => r.closest(".option").classList.toggle("checked", r.checked));
  }
  document.querySelectorAll('input[name="address"]').forEach((r) => r.addEventListener("change", () => {
    syncOptions("address");
    const isNew = r.value === "new";
    $("new-address").classList.toggle("show", isNew);
    toast(isNew ? "Nhập địa chỉ giao hàng mới" : "Đã chọn địa chỉ giao hàng",
      isNew ? "Điền thông tin người nhận vào biểu mẫu bên dưới" : fullAddress(user.addresses.find((a) => a.id === Number(r.value))), "info");
  }));
  document.querySelectorAll('input[name="payment"]').forEach((r) => r.addEventListener("change", () => {
    syncOptions("payment");
    $("bank-box").classList.toggle("show", r.value === "bank");
    toast("Đã chọn hình thức thanh toán", PAYMENT_METHODS[r.value], "info");
  }));

  // Tóm tắt đơn hàng từ giỏ hàng mẫu
  const sub = SAMPLE_CART.reduce((s, i) => s + getProduct(i.productId).price * i.qty, 0);
  const ship = sub >= 1000000 ? 0 : 30000;
  $("sum-title").textContent = `Đơn hàng (${cartCount()} sản phẩm)`;
  $("summary-items").innerHTML = SAMPLE_CART.map((i) => {
    const p = getProduct(i.productId);
    return `<div class="summary-item">
      <div class="thumb"><img src="${p.image}" alt="${escapeHtml(p.name)}"><span>${i.qty}</span></div>
      <div><b>${escapeHtml(p.name)}</b><small>${p.category} · ${money(p.price)}</small></div>
      <span class="num">${money(p.price * i.qty)}</span>
    </div>`;
  }).join("");
  $("sum-sub").textContent = money(sub);
  $("sum-ship").textContent = ship ? money(ship) : "Miễn phí";
  $("sum-total").textContent = money(sub + ship);

  // Đặt hàng: chỉ hiện thông báo rồi chuyển sang trang hoàn tất
  $("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = await confirmDialog({ title: "Xác nhận đặt hàng?", message: `Tổng thanh toán <b>${money(sub + ship)}</b>. Bạn có muốn đặt đơn hàng này không?`, okText: "Đặt hàng" });
    if (!ok) return toast("Đã hủy đặt hàng", "Bạn có thể tiếp tục chỉnh sửa thông tin", "info");
    toastThenGo("order-success.html", "Đặt hàng thành công!", "Đơn hàng của bạn đã được ghi nhận");
  });
})();
