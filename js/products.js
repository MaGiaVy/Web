// TRANG DANH SÁCH SẢN PHẨM
// - Xem theo phân loại: products.html?cat=HG
// - Kết quả tìm kiếm: products.html?q=... -> trang kết quả CÓ SẴN, không lọc thật (web tĩnh)
// - Tìm kiếm nâng cao / sắp xếp: chỉ hiện thông báo
(function () {
  const PER_PAGE = 9;
  const $ = (id) => document.getElementById(id);
  const list = $("product-list");
  const cat = getCategory(getParam("cat"));
  const keyword = getParam("q");
  let mode = keyword !== null ? "search" : cat ? "category" : "all";
  let page = 1;

  // Dropdown phân loại (điều kiện của tìm kiếm nâng cao)
  $("f-cat").innerHTML = `<option value="">Tất cả phân loại</option>` +
    CATEGORIES.map((c) => `<option value="${c.id}">${c.id === "TOOL" ? "Dụng cụ & Sơn" : `${c.name} (${c.id})`}</option>`).join("");
  if (cat) $("f-cat").value = cat.id;

  // Dropdown khoảng giá
  $("f-range").innerHTML = `<option value="">Tất cả mức giá</option>` +
    PRICE_RANGES.map((r) => `<option value="${r.id}">${r.label}</option>`).join("") +
    `<option value="custom" hidden>Tùy chọn (nhập bên dưới)</option>`;
  $("f-name").value = keyword || "";

  // Danh sách hiển thị theo chế độ
  function items() {
    if (mode === "search") return SEARCH_RESULT_IDS.map(getProduct);
    if (mode === "category") return PRODUCTS.filter((p) => p.category === cat.id);
    return PRODUCTS;
  }

  function renderHeading() {
    const catName = cat ? (cat.id === "TOOL" ? "Dụng cụ & Sơn" : `${cat.name} (${cat.id})`) : "";
    const titles = { search: "Kết quả tìm kiếm", category: catName, all: "Tất cả sản phẩm" };
    $("list-title").textContent = titles[mode];
    $("list-subtitle").textContent = mode === "search" ? "Các sản phẩm phù hợp với yêu cầu của bạn"
      : mode === "category" ? cat.desc : "Mô hình Gundam chính hãng và dụng cụ lắp ráp";
    $("breadcrumb").innerHTML = `<a href="index.html">Trang chủ</a>${icon("chevronRight")}<a href="products.html">Sản phẩm</a>` +
      (mode !== "all" ? `${icon("chevronRight")}<b>${titles[mode]}</b>` : "");
  }

  function render() {
    const data = items();
    const start = (page - 1) * PER_PAGE;
    renderHeading();
    $("result-count").innerHTML = mode === "search" ? `Tìm thấy <b>${data.length}</b> sản phẩm` : `Có <b>${data.length}</b> sản phẩm`;
    list.innerHTML = data.slice(start, start + PER_PAGE).map(productCard).join("");
    bindAddToCart(list);
    renderPagination($("pagination"), data.length, PER_PAGE, page, (p) => {
      page = p;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Mô tả các điều kiện người dùng đã nhập (chỉ để hiển thị trong thông báo)
  function conditionText() {
    const parts = [];
    const name = $("f-name").value.trim();
    const c = getCategory($("f-cat").value);
    const min = $("f-min").value, max = $("f-max").value;
    if (name) parts.push(`Tên: “${escapeHtml(name)}”`);
    if (c) parts.push(`Loại: ${c.id === "TOOL" ? "Dụng cụ & Sơn" : c.id}`);
    if (min !== "" || max !== "") parts.push(`Giá: ${min !== "" ? money(min) : "0đ"} - ${max !== "" ? money(max) : "không giới hạn"}`);
    return parts.length ? parts.join(" · ") : "Không có điều kiện";
  }

  // Chọn khoảng giá có sẵn -> tự điền vào 2 ô Từ / Đến
  $("f-range").addEventListener("change", (e) => {
    const r = PRICE_RANGES.find((x) => x.id === e.target.value);
    $("f-min").value = r ? r.min : "";
    $("f-max").value = r && r.max !== Infinity ? r.max : "";
  });
  ["f-min", "f-max"].forEach((id) => $(id).addEventListener("input", () => { $("f-range").value = "custom"; }));

  // Tìm kiếm nâng cao (bấm nút hoặc nhấn Enter): hiện thông báo + trang kết quả có sẵn
  $("filter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    mode = "search";
    page = 1;
    render();
    toast("Đã tìm kiếm", conditionText());
  });

  $("f-reset").addEventListener("click", () => {
    $("filter-form").reset();
    toast("Đã xóa điều kiện tìm kiếm", "", "info");
  });

  $("sort").addEventListener("change", (e) => {
    toast("Đã sắp xếp", e.target.options[e.target.selectedIndex].text, "info");
  });

  // Lần đầu mở trang
  render();
  if (mode === "search") {
    toast("Đã tìm kiếm", keyword ? `Từ khóa: “${escapeHtml(keyword)}”` : "Hiển thị kết quả tìm kiếm");
  } else if (mode === "category") {
    toast(`Danh mục ${cat.id === "TOOL" ? "Dụng cụ & Sơn" : cat.name}`, `Có ${items().length} sản phẩm`, "info");
  } else if (getParam("adv")) {
    $("f-name").focus();
    toast("Tìm kiếm nâng cao", "Nhập tên, chọn phân loại và khoảng giá rồi bấm Tìm kiếm", "info");
  }
})();
