// KHUYẾN MÃI (web tĩnh): chương trình, mã giảm giá, sản phẩm đang giảm giá
// Mọi thao tác Lưu / Tạm dừng / Tiếp tục chỉ hiện thông báo, dữ liệu giữ nguyên
(function () {
  const $ = (id) => document.getElementById(id);

  // ---------- Chương trình ----------
  $("h-promo").innerHTML = `${icon("gift")} Chương trình khuyến mãi`;
  $("promo-status").innerHTML = PROMOTION.active
    ? `<span class="chip chip-delivered">Đang chạy</span>` : `<span class="chip chip-gray">Tạm dừng</span>`;
  $("pm-name").value = PROMOTION.name;
  $("pm-desc").value = PROMOTION.desc;
  $("pm-active").value = PROMOTION.active ? "1" : "0";
  $("pm-topbar").checked = PROMOTION.showTopbar;
  $("pm-note").innerHTML = `${icon("info")}<span>Mức “giảm đến <b>${maxSaleDiscount()}%</b>” được tính tự động từ giá gốc của <b>${SHOP_PRODUCTS.filter((p) => p.oldPrice).length}</b> sản phẩm đang giảm giá. <a class="link" href="products.html?view=sale">Xem các sản phẩm này →</a></span>`;
  $("pm-view").innerHTML = `${icon("eye")} Xem trang Khuyến mãi`;
  $("promo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("pm-name").value.trim() || PROMOTION.name;
    toast("Đã lưu chương trình", `${escapeHtml(name)} · ${$("pm-active").value === "1" ? "Đang chạy" : "Tạm dừng"}`);
  });

  // ---------- Mã giảm giá ----------
  $("h-coupons").innerHTML = `${icon("tag")} Mã giảm giá`;
  $("cp-new").innerHTML = `${icon("plus")} Tạo mã mới`;
  ["cp-value", "cp-max", "cp-min"].forEach((id) => bindMoneyInput($(id)));

  pagedList($("cp-body"), $("cp-foot"), COUPONS, (c) => {
    const pct = Math.round((c.used / c.limit) * 100);
    const toggle = c.status === "active"
      ? `<button class="btn btn-outline btn-sm" data-toggle="${c.code}">${icon("lock")} Tạm dừng</button>`
      : c.status === "paused" ? `<button class="btn btn-outline btn-sm" data-toggle="${c.code}">${icon("unlock")} Tiếp tục</button>` : "";
    return `<tr>
      <td><span class="coupon-code">${c.code}</span></td>
      <td><b>${couponValueText(c)}</b><small class="cell-sub">${escapeHtml(c.desc)}</small></td>
      <td class="nowrap">Đơn từ ${money(c.minOrder)}</td>
      <td class="nowrap"><div class="usage"><span style="width:${pct}%"></span></div><small class="cell-sub">${c.used}/${c.limit} lượt</small></td>
      <td><span class="chip ${COUPON_STATUS[c.status].chip}">${COUPON_STATUS[c.status].label}</span></td>
      <td class="right nowrap">
        <button class="btn btn-outline btn-sm" data-edit="${c.code}">${icon("edit")} Sửa</button>
        ${toggle}
      </td>
    </tr>`;
  }, "mã giảm giá");

  // Mở form tạo / sửa mã (chỉ hiện form, không đổi dữ liệu)
  function openForm(c) {
    $("cp-form").hidden = false;
    $("cp-form-title").textContent = c ? `Sửa mã ${c.code}` : "Tạo mã giảm giá mới";
    $("cp-code").value = c ? c.code : "";
    $("cp-type").value = c ? c.type : "percent";
    $("cp-value").value = c ? (c.type === "percent" ? c.value : c.value ? numberDot(c.value) : "") : "";
    setMoneyValue($("cp-max"), c && c.maxDiscount ? c.maxDiscount : "");
    setMoneyValue($("cp-min"), c ? c.minOrder : "");
    $("cp-limit").value = c ? c.limit : "";
    $("cp-desc").value = c ? c.desc : "";
    $("cp-form").dataset.editing = c ? c.code : "";
    $("cp-code").focus();
  }
  $("cp-new").addEventListener("click", () => {
    openForm(null);
    toast("Tạo mã giảm giá mới", "Điền thông tin rồi bấm Lưu mã", "info");
  });
  $("cp-cancel").addEventListener("click", () => {
    $("cp-form").hidden = true;
    toast("Đã hủy", "Không có thay đổi nào được lưu", "info");
  });
  $("cp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = $("cp-code").value.trim().toUpperCase() || "MÃ MỚI";
    const editing = $("cp-form").dataset.editing;
    $("cp-form").hidden = true;
    toast(editing ? `Đã cập nhật mã ${editing}` : `Đã tạo mã ${escapeHtml(code)}`, escapeHtml($("cp-desc").value.trim()) || "Mã giảm giá đã được lưu");
  });

  $("cp-body").addEventListener("click", async (e) => {
    const edit = e.target.closest("[data-edit]");
    if (edit) {
      openForm(COUPONS.find((c) => c.code === edit.dataset.edit));
      return toast(`Sửa mã ${edit.dataset.edit}`, "Chỉnh thông tin rồi bấm Lưu mã", "info");
    }
    const tog = e.target.closest("[data-toggle]");
    if (!tog) return;
    const c = COUPONS.find((x) => x.code === tog.dataset.toggle);
    const pausing = c.status === "active";
    const ok = await confirmDialog({
      title: pausing ? `Tạm dừng mã ${c.code}?` : `Cho mã ${c.code} chạy lại?`,
      message: pausing ? "Khách sẽ không dùng được mã này cho tới khi bạn cho chạy lại." : "Khách sẽ dùng lại được mã này ở giỏ hàng.",
      okText: pausing ? "Tạm dừng" : "Chạy lại", iconName: pausing ? "lock" : "unlock",
    });
    if (!ok) return toast("Đã hủy thao tác", "", "info");
    toast(pausing ? `Đã tạm dừng mã ${c.code}` : `Mã ${c.code} đã chạy lại`, c.desc);
  });

})();
