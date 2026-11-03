// TRANG DANH SÁCH SẢN PHẨM (web tĩnh)
// - products.html              : tất cả sản phẩm
// - products.html?cat=HG       : sản phẩm theo phân loại
// - products.html?q=...        : trang KẾT QUẢ TÌM KIẾM có sẵn (không lọc thật)
//   (từ tìm kiếm nâng cao có thêm &loai=..&tu=..&den=.. chỉ để hiện lại điều kiện đã nhập)
(function () {
  const PER_PAGE = 8;
  const $ = (id) => document.getElementById(id);
  const list = $("product-list");
  const cat = getCategory(getParam("cat"));
  const keyword = getParam("q");
  const mode = keyword !== null ? "search" : cat ? "category" : "all";
  let pageNum = 1;

  function items() {
    if (mode === "search") return SEARCH_RESULT_IDS.map(getProduct);
    if (mode === "category") return SHOP_PRODUCTS.filter((p) => p.category === cat.id);
    return SHOP_PRODUCTS;
  }

  function catLabel(c) {
    return c.id === "TOOL" ? "Dụng cụ & Sơn" : `${c.name} (${c.id})`;
  }

  // Tiêu đề, breadcrumb
  const titles = { search: "Kết quả tìm kiếm", category: cat ? catLabel(cat) : "", all: "Tất cả sản phẩm" };
  $("list-title").textContent = titles[mode];
  $("list-subtitle").textContent = mode === "search" ? "Các sản phẩm phù hợp với yêu cầu của bạn"
    : mode === "category" ? cat.desc : "Mô hình Gundam chính hãng và dụng cụ lắp ráp";
  $("breadcrumb").innerHTML = `<a href="${page("index.html")}">Trang chủ</a>${icon("chevronRight")}<a href="products.html">Sản phẩm</a>` +
    (mode !== "all" ? `${icon("chevronRight")}<b>${titles[mode]}</b>` : "");

  // Điều kiện đã tìm (chỉ hiển thị lại)
  if (mode === "search") {
    const tags = [];
    const typeCat = getCategory(getParam("loai"));
    const min = getParam("tu"), max = getParam("den");
    if (keyword) tags.push(`Từ khóa: “${escapeHtml(keyword)}”`);
    if (typeCat) tags.push(`Loại: ${catLabel(typeCat)}`);
    if (min || max) tags.push(`Giá: ${min ? money(Number(min)) : "0đ"} - ${max ? money(Number(max)) : "không giới hạn"}`);
    $("active-filters").innerHTML = tags.map((t) => `<span class="chip no-dot">${t}</span>`).join("");
  }

  function render() {
    const data = items();
    const start = (pageNum - 1) * PER_PAGE;
    $("result-count").innerHTML = mode === "search" ? `Tìm thấy <b>${data.length}</b> sản phẩm` : `Có <b>${data.length}</b> sản phẩm`;
    list.innerHTML = data.slice(start, start + PER_PAGE).map(productCard).join("");
    bindAddToCart(list);
    renderPagination($("pagination"), data.length, PER_PAGE, pageNum, (p) => {
      pageNum = p;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  $("sort").addEventListener("change", (e) => {
    toast("Đã sắp xếp", e.target.options[e.target.selectedIndex].text, "info");
  });

  render();
  if (mode === "search") {
    toast("Đã tìm kiếm", keyword ? `Từ khóa: “${escapeHtml(keyword)}”` : "Hiển thị kết quả tìm kiếm");
  } else if (mode === "category") {
    toast(`Danh mục ${cat.id === "TOOL" ? "Dụng cụ & Sơn" : cat.name}`, `Có ${items().length} sản phẩm`, "info");
  }
})();
