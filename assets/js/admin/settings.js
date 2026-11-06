// CÀI ĐẶT CỬA HÀNG (web tĩnh): thông tin liên hệ, giao hàng, đổi trả
// Form hiện đúng giá trị trong STORE_INFO (cùng nguồn với trang khách); Lưu chỉ hiện thông báo
(function () {
  const $ = (id) => document.getElementById(id);
  $("h-contact").innerHTML = `${icon("store")} Thông tin liên hệ`;
  $("h-ship").innerHTML = `${icon("truck")} Giao hàng & đổi trả`;
  $("st-city").innerHTML = Object.keys(LOCATIONS).map((c) => `<option>${c}</option>`).join("");
  const fillWards = (selected) => {
    $("st-ward").innerHTML = LOCATIONS[$("st-city").value].map((w) => `<option ${w === selected ? "selected" : ""}>${w}</option>`).join("");
  };
  ["st-fee", "st-free"].forEach((id) => bindMoneyInput($(id)));

  function fill() {
    $("st-street").value = STORE_INFO.street;
    $("st-city").value = STORE_INFO.city;
    fillWards(STORE_INFO.ward);
    $("st-hotline").value = STORE_INFO.hotline;
    $("st-email").value = STORE_INFO.email;
    $("st-hours").value = STORE_INFO.hours;
    setMoneyValue($("st-fee"), STORE_INFO.shipFee);
    setMoneyValue($("st-free"), STORE_INFO.freeShipFrom);
    $("st-days").value = STORE_INFO.deliveryDays;
    $("st-return").value = STORE_INFO.returnDays;
  }
  // Khung xem trước đổi theo nội dung đang nhập (chỉ là xem trước, không lưu)
  function preview() {
    const free = parseMoney($("st-free").value), fee = parseMoney($("st-fee").value);
    $("st-preview").innerHTML = `
      <div class="info-row">${icon("map")}<div><small>Địa chỉ</small><b>${escapeHtml($("st-street").value)}, ${$("st-ward").value}, ${$("st-city").value}</b></div></div>
      <div class="info-row">${icon("phone")}<div><small>Hotline</small><b>${escapeHtml($("st-hotline").value)}</b></div></div>
      <div class="info-row">${icon("mail")}<div><small>Email</small><b>${escapeHtml($("st-email").value)}</b></div></div>
      <div class="info-row">${icon("clock")}<div><small>Giờ mở cửa</small><b>${escapeHtml($("st-hours").value)}</b></div></div>
      <div class="info-row">${icon("truck")}<div><small>Giao hàng</small><b>Phí ${fee !== "" ? money(fee) : "—"}, miễn phí cho đơn từ ${free !== "" ? money(free) : "—"}</b></div></div>
      <div class="info-row">${icon("refresh")}<div><small>Đổi trả</small><b>Trong ${escapeHtml($("st-return").value)} ngày</b></div></div>`;
  }
  $("st-where").innerHTML = `${icon("info")}<span>Thông tin này hiển thị ở thanh đầu trang, chân trang, trang Liên hệ, Hướng dẫn mua hàng và Giỏ hàng.</span>`;

  fill();
  preview();
  $("st-city").addEventListener("change", () => { fillWards(); preview(); });
  $("settings-form").addEventListener("input", preview);
  $("settings-form").addEventListener("change", preview);
  $("st-reset").addEventListener("click", () => {
    fill();
    preview();
    toast("Đã hủy thay đổi", "Thông tin được khôi phục như ban đầu", "info");
  });
  $("settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    toast("Đã lưu cài đặt cửa hàng", `Hotline ${escapeHtml($("st-hotline").value)} · ${escapeHtml($("st-email").value)}`);
  });
})();
