// TÌM KIẾM NÂNG CAO (web tĩnh): bấm Tìm kiếm -> hiện thông báo rồi sang trang kết quả có sẵn
(function () {
  const $ = (id) => document.getElementById(id);
  const catLabel = (c) => (c.id === "TOOL" ? "Dụng cụ & Sơn" : `${c.name} (${c.id})`);

  $("a-submit").innerHTML = `${icon("search")} Tìm kiếm`;
  $("a-cat").innerHTML = `<option value="">Tất cả phân loại</option>` +
    CATEGORIES.map((c) => `<option value="${c.id}">${catLabel(c)}</option>`).join("");
  $("a-range").innerHTML = `<option value="">Tất cả mức giá</option>` +
    PRICE_RANGES.map((r) => `<option value="${r.id}">${r.label}</option>`).join("") +
    `<option value="custom" hidden>Tự nhập khoảng giá</option>`;

  // Chọn khoảng giá có sẵn -> tự điền 2 ô Từ / Đến
  $("a-range").addEventListener("change", () => {
    const r = PRICE_RANGES.find((x) => x.id === $("a-range").value);
    $("a-min").value = r ? r.min : "";
    $("a-max").value = r && r.max !== Infinity ? r.max : "";
  });
  ["a-min", "a-max"].forEach((id) => $(id).addEventListener("input", () => { $("a-range").value = "custom"; }));

  $("adv-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("a-name").value.trim();
    const c = getCategory($("a-cat").value);
    const min = $("a-min").value, max = $("a-max").value;
    const parts = [];
    if (name) parts.push(`Tên: “${escapeHtml(name)}”`);
    if (c) parts.push(`Loại: ${c.id === "TOOL" ? "Dụng cụ & Sơn" : c.id}`);
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

  $("a-quick").innerHTML = CATEGORIES.map((c) =>
    `<a class="adv-chip" href="products.html?cat=${c.id}"><span class="grade grade-${c.id}">${c.id === "TOOL" ? "TOOL" : c.id}</span> ${c.id === "TOOL" ? "Dụng cụ & Sơn" : c.name}</a>`).join("");
})();
