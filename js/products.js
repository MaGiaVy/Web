// TRANG DANH SÁCH SẢN PHẨM: phân loại + tìm kiếm cơ bản + tìm kiếm nâng cao + phân trang
(function () {
  const PER_PAGE = 9;
  const state = {
    name: getParam("q") || "",
    cat: getCategory(getParam("cat")) ? getParam("cat") : "",
    min: "",
    max: "",
    range: "",
    sort: "default",
    page: 1,
  };

  const $ = (id) => document.getElementById(id);
  const list = $("product-list");

  // Danh sách phân loại dạng radio
  $("f-cats").innerHTML = [{ id: "", name: "Tất cả" }, ...CATEGORIES].map((c) => {
    const count = c.id ? PRODUCTS.filter((p) => p.category === c.id).length : PRODUCTS.length;
    const label = c.id === "TOOL" ? "Dụng cụ & Sơn" : c.id ? `${c.name} (${c.id})` : "Tất cả";
    return `<label><input type="radio" name="cat" value="${c.id}" ${state.cat === c.id ? "checked" : ""}> ${label}<span class="count">${count}</span></label>`;
  }).join("");

  // Dropdown khoảng giá
  $("f-range").innerHTML = `<option value="">Tất cả mức giá</option>` +
    PRICE_RANGES.map((r) => `<option value="${r.id}">${r.label}</option>`).join("") +
    `<option value="custom" hidden>Tùy chọn (nhập bên dưới)</option>`;

  $("f-name").value = state.name;

  function filtered() {
    const key = normalize(state.name);
    const min = state.min === "" ? 0 : Number(state.min);
    const max = state.max === "" ? Infinity : Number(state.max);
    let items = PRODUCTS.filter((p) =>
      (!key || normalize(p.name + " " + p.series).includes(key)) &&
      (!state.cat || p.category === state.cat) &&
      p.price >= min && p.price <= max);
    if (state.sort === "best") items = items.slice().sort((a, b) => b.sold - a.sold);
    if (state.sort === "price-asc") items = items.slice().sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") items = items.slice().sort((a, b) => b.price - a.price);
    if (state.sort === "new") items = items.slice().sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return items;
  }

  function renderHeading() {
    const cat = getCategory(state.cat);
    const catName = cat ? (cat.id === "TOOL" ? "Dụng cụ & Sơn" : `${cat.name} (${cat.id})`) : "";
    $("list-title").textContent = state.name ? `Kết quả tìm kiếm “${state.name}”` : cat ? catName : "Tất cả sản phẩm";
    $("list-subtitle").textContent = cat ? cat.desc : "Mô hình Gundam chính hãng và dụng cụ lắp ráp";
    $("breadcrumb").innerHTML = `<a href="index.html">Trang chủ</a>${icon("chevronRight")}<a href="products.html">Sản phẩm</a>` +
      (catName ? `${icon("chevronRight")}<b>${catName}</b>` : "") +
      (state.name ? `${icon("chevronRight")}<b>Tìm “${escapeHtml(state.name)}”</b>` : "");

    const tags = [];
    if (state.name) tags.push(`Tên: ${escapeHtml(state.name)}`);
    if (cat) tags.push(`Loại: ${catName}`);
    if (state.min !== "" || state.max !== "") {
      tags.push(`Giá: ${state.min !== "" ? money(state.min) : "0đ"} - ${state.max !== "" ? money(state.max) : "không giới hạn"}`);
    }
    $("active-filters").innerHTML = tags.map((t) => `<span class="chip no-dot">${t}</span>`).join("");
  }

  function render() {
    const items = filtered();
    const pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PER_PAGE;
    renderHeading();
    $("result-count").innerHTML = `Tìm thấy <b>${items.length}</b> sản phẩm`;
    list.innerHTML = items.length
      ? items.slice(start, start + PER_PAGE).map(productCard).join("")
      : `<div class="card empty-state" style="grid-column:1/-1">${icon("search")}<h3>Không tìm thấy sản phẩm phù hợp</h3><p>Hãy thử từ khóa khác hoặc nới rộng khoảng giá.</p><br><button class="btn btn-dark" id="empty-reset">Xóa bộ lọc</button></div>`;
    bindAddToCart(list);
    const emptyReset = $("empty-reset");
    if (emptyReset) emptyReset.addEventListener("click", resetFilters);
    renderPagination($("pagination"), items.length, PER_PAGE, state.page, (page) => {
      state.page = page;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return items.length;
  }

  function readForm() {
    state.name = $("f-name").value.trim();
    const checked = document.querySelector('input[name="cat"]:checked');
    state.cat = checked ? checked.value : "";
    state.min = $("f-min").value;
    state.max = $("f-max").value;
    state.page = 1;
  }

  function resetFilters() {
    $("filter-form").reset();
    document.querySelector('input[name="cat"][value=""]').checked = true;
    Object.assign(state, { name: "", cat: "", min: "", max: "", range: "", page: 1 });
    $("header-search-input").value = "";
    render();
    toast("Đã xóa bộ lọc", `Hiển thị tất cả ${PRODUCTS.length} sản phẩm`, "info");
  }

  // Chọn khoảng giá có sẵn -> tự điền vào 2 ô Từ / Đến
  $("f-range").addEventListener("change", (e) => {
    const r = PRICE_RANGES.find((x) => x.id === e.target.value);
    $("f-min").value = r ? r.min : "";
    $("f-max").value = r && r.max !== Infinity ? r.max : "";
  });
  ["f-min", "f-max"].forEach((id) => $(id).addEventListener("input", () => { $("f-range").value = "custom"; }));

  // Bấm Tìm kiếm hoặc nhấn Enter
  $("filter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    readForm();
    if (state.min !== "" && state.max !== "" && Number(state.min) > Number(state.max)) {
      toast("Khoảng giá chưa hợp lệ", "Giá “Từ” đang lớn hơn giá “Đến”, hệ thống đã tự đổi chỗ.", "warning");
      [state.min, state.max] = [state.max, state.min];
      $("f-min").value = state.min; $("f-max").value = state.max;
    }
    const count = render();
    toast("Tìm kiếm hoàn tất", `Tìm thấy ${count} sản phẩm phù hợp`, count ? "success" : "warning");
  });

  $("f-reset").addEventListener("click", resetFilters);

  // Chọn phân loại -> lọc ngay
  $("f-cats").addEventListener("change", () => {
    readForm();
    const count = render();
    const cat = getCategory(state.cat);
    toast(cat ? `Phân loại: ${cat.id === "TOOL" ? "Dụng cụ & Sơn" : cat.name}` : "Tất cả phân loại", `${count} sản phẩm`, "info");
  });

  $("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    state.page = 1;
    render();
    toast("Đã sắp xếp", e.target.options[e.target.selectedIndex].text, "info");
  });

  // Lần đầu mở trang
  const count = render();
  if (getParam("q") !== null) {
    toast("Kết quả tìm kiếm", state.name ? `Tìm thấy ${count} sản phẩm cho “${escapeHtml(state.name)}”` : `Hiển thị ${count} sản phẩm`, count ? "success" : "warning");
  } else if (state.cat) {
    const cat = getCategory(state.cat);
    toast(`Danh mục ${cat ? cat.name : ""}`, `Có ${count} sản phẩm`, "info");
  } else if (getParam("adv")) {
    $("f-name").focus();
    toast("Tìm kiếm nâng cao", "Kết hợp tên, phân loại và khoảng giá rồi bấm Tìm kiếm", "info");
  }
})();
