// TÌM KIẾM NÂNG CAO (web tĩnh): bấm Tìm kiếm -> hiện thông báo rồi sang trang kết quả có sẵn
(function () {
  const $ = (id) => document.getElementById(id);
  const catLabel = (c) => CATEGORY_LABELS[c.id];

  $("a-submit").innerHTML = `${icon("search")} Tìm kiếm`;
  $("a-cat").innerHTML = `<option value="">Tất cả phân loại</option>` +
    CATEGORIES.map((c) => `<option value="${c.id}">${catLabel(c)}</option>`).join("");
  $("a-range").innerHTML = `<option value="">Tất cả mức giá</option>` +
    PRICE_RANGES.map((r) => `<option value="${r.id}">${r.label}</option>`).join("") +
    `<option value="custom" hidden>Tự nhập khoảng giá</option>`;

  // Chọn khoảng giá có sẵn -> tự điền 2 ô Từ / Đến
  $("a-range").addEventListener("change", () => {
    const r = PRICE_RANGES.find((x) => x.id === $("a-range").value);
    setMoneyValue($("a-min"), r ? r.min : "");
    setMoneyValue($("a-max"), r && r.max !== Infinity ? r.max : "");
  });
  ["a-min", "a-max"].forEach((id) => {
    bindMoneyInput($(id)); // tự thêm dấu chấm hàng nghìn khi gõ
    $(id).addEventListener("input", () => { $("a-range").value = "custom"; });
  });

  $("adv-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("a-name").value.trim();
    const c = getCategory($("a-cat").value);
    const min = parseMoney($("a-min").value), max = parseMoney($("a-max").value);
    const parts = [];
    if (name) parts.push(`Tên: “${escapeHtml(name)}”`);
    if (c) parts.push(`Loại: ${catLabel(c)}`);
    if (min !== "" || max !== "") parts.push(`Giá: ${min !== "" ? money(min) : "0đ"} - ${max !== "" ? money(max) : "không giới hạn"}`);

    const params = new URLSearchParams({ q: name });
    if (c) params.set("loai", c.id);
    if (min !== "") params.set("tu", min);
    if (max !== "") params.set("den", max);
    toastThenGo(`products.html?${params}`, "Đã tìm kiếm", parts.length ? parts.join(" · ") : "Không có điều kiện");
  });

  $("a-reset").addEventListener("click", () => {
    $("adv-form").reset();
    toast("Đã xóa điều kiện tìm kiếm", "", "info");
  });

  $("breadcrumb").innerHTML = `<a href="${page("index.html")}">Trang chủ</a>${icon("chevronRight")}<b>Tìm kiếm nâng cao</b>`;

  // Gợi ý từ khóa phổ biến: bấm vào -> sang trang kết quả tìm kiếm có sẵn
  const suggestions = ["Freedom", "Unicorn", "RX-78-2", "Zaku", "Kìm cắt"];
  $("a-quick").innerHTML = suggestions.map((k) =>
    `<a class="adv-chip" href="products.html?q=${encodeURIComponent(k)}">${icon("search")} ${k}</a>`).join("");
})();
