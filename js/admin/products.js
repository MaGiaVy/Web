// QUẢN LÝ SẢN PHẨM: tìm kiếm, lọc theo loại, thêm/sửa (trang riêng), xóa
// Xóa: đã bán -> hỏi xác nhận rồi ẨN (style.display = 'none')
//      chưa bán -> hỏi xác nhận rồi GỠ HẲN thẻ (card.remove())
(function () {
  const PER_PAGE = 12;
  const $ = (id) => document.getElementById(id);
  const state = { name: "", cat: "", sort: "new", page: 1 };
  const removed = new Set(); // sản phẩm đã ẩn/xóa trong phiên xem trang này

  $("add-product").innerHTML = `${icon("plus")} Thêm sản phẩm`;
  $("ps-cat").innerHTML = `<option value="">Tất cả loại (${PRODUCTS.length})</option>` +
    CATEGORIES.map((c) => `<option value="${c.id}">${c.id === "TOOL" ? "Dụng cụ & Sơn" : `${c.name} (${c.id})`} - ${PRODUCTS.filter((p) => p.category === c.id).length}</option>`).join("");

  function filtered() {
    const key = normalize(state.name);
    let items = PRODUCTS.filter((p) => !removed.has(p.id) && (!key || normalize(p.name).includes(key)) && (!state.cat || p.category === state.cat));
    const sorters = {
      new: (a, b) => b.id - a.id,
      name: (a, b) => a.name.localeCompare(b.name, "vi"),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      stock: (a, b) => a.stock - b.stock,
    };
    return items.slice().sort(sorters[state.sort]);
  }

  function card(p) {
    return `
      <article class="ap-card" data-id="${p.id}">
        <div class="ap-thumb">
          <img src="${asset(p.image)}" alt="${escapeHtml(p.name)}">
          <span class="ap-status chip ${p.sold > 0 ? "chip-delivered" : "chip-pending"}">${p.sold > 0 ? "Đã có người mua" : "Chưa bán"}</span>
        </div>
        <div class="ap-body">
          <div class="top"><span class="grade grade-${p.category}">${p.category}</span><span>Mã: GP${String(p.id).padStart(4, "0")}</span></div>
          <h3 title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</h3>
          <span class="price">${money(p.price)}</span>
          <div class="ap-stats">
            <div><small>Tồn kho</small><b>${p.stock}</b></div>
            <div><small>Đã bán</small><b>${numberDot(p.sold)}</b></div>
            <div><small>Đánh giá</small><b>${p.rating.toFixed(1)}</b></div>
          </div>
        </div>
        <div class="ap-actions">
          <a class="btn btn-outline btn-sm" href="product-form.html?id=${p.id}">${icon("edit")} Sửa</a>
          <button class="btn btn-danger-outline btn-sm" data-delete>${icon("trash")} Xóa</button>
        </div>
      </article>`;
  }

  function render() {
    const items = filtered();
    const pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PER_PAGE;
    $("admin-products").innerHTML = items.length
      ? items.slice(start, start + PER_PAGE).map(card).join("")
      : `<div class="card empty-state" style="grid-column:1/-1">${icon("search")}<h3>Không tìm thấy sản phẩm</h3><p>Thử từ khóa khác hoặc chọn loại khác.</p></div>`;

    const cat = getCategory(state.cat);
    $("ps-note").innerHTML = `Đang hiển thị <b>${items.length}</b> sản phẩm` +
      (state.name ? ` <span class="chip no-dot">Tên: ${escapeHtml(state.name)}</span>` : "") +
      (cat ? ` <span class="chip no-dot">Loại: ${cat.id === "TOOL" ? "Dụng cụ & Sơn" : cat.name}</span>` : "") +
      (removed.size ? ` · <span>${removed.size} sản phẩm đã ẩn/xóa trong phiên này</span>` : "");

    renderPagination($("ps-pagination"), items.length, PER_PAGE, state.page, (page) => {
      state.page = page;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return items.length;
  }

  $("product-filter").addEventListener("submit", (e) => {
    e.preventDefault();
    state.name = $("ps-name").value.trim();
    state.cat = $("ps-cat").value;
    state.page = 1;
    const n = render();
    toast("Tìm kiếm hoàn tất", `Tìm thấy ${n} sản phẩm`, n ? "success" : "warning");
  });
  $("ps-cat").addEventListener("change", () => {
    state.cat = $("ps-cat").value;
    state.page = 1;
    const n = render();
    toast("Đã lọc theo loại", `${$("ps-cat").selectedOptions[0].text.split(" - ")[0]}: ${n} sản phẩm`, "info");
  });
  $("ps-sort").addEventListener("change", () => {
    state.sort = $("ps-sort").value;
    render();
    toast("Đã sắp xếp", $("ps-sort").selectedOptions[0].text, "info");
  });
  $("ps-reset").addEventListener("click", () => {
    $("product-filter").reset();
    Object.assign(state, { name: "", cat: "", sort: "new", page: 1 });
    render();
    toast("Đã đặt lại bộ lọc", `Hiển thị tất cả sản phẩm`, "info");
  });
  $("add-product").addEventListener("click", (e) => {
    e.preventDefault();
    toastThenGo("product-form.html", "Mở biểu mẫu thêm sản phẩm", "", "info");
  });

  // XÓA SẢN PHẨM
  $("admin-products").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-delete]");
    if (!btn) return;
    const cardEl = btn.closest(".ap-card");
    const p = getProduct(cardEl.dataset.id);

    if (p.sold > 0) {
      const ok = await confirmDialog({
        title: "Xác nhận xóa sản phẩm?",
        message: `“${escapeHtml(p.name)}” đã có <b>${numberDot(p.sold)}</b> lượt mua nên không thể xóa vĩnh viễn. Hệ thống sẽ <b>ẩn</b> sản phẩm khỏi trang bán hàng. Bạn có muốn tiếp tục?`,
        okText: "Ẩn sản phẩm", danger: true,
      });
      if (!ok) return toast("Đã hủy thao tác xóa", p.name, "info");
      cardEl.style.display = "none"; // ẩn sản phẩm đã bán
      removed.add(p.id);
      toast("Đã ẩn sản phẩm", `“${p.name}” đã có người mua nên được ẩn khỏi website`, "warning");
    } else {
      const ok = await confirmDialog({
        title: "Xác nhận xóa sản phẩm?",
        message: `“${escapeHtml(p.name)}” chưa được bán ra. Sản phẩm sẽ bị <b>xóa vĩnh viễn</b>. Bạn có chắc chắn?`,
        okText: "Xóa sản phẩm", danger: true,
      });
      if (!ok) return toast("Đã hủy thao tác xóa", p.name, "info");
      cardEl.remove(); // gỡ hẳn sản phẩm chưa bán
      removed.add(p.id);
      toast("Đã xóa sản phẩm", `“${p.name}” đã được xóa khỏi hệ thống`);
    }
    // Cập nhật lại số lượng đang hiển thị (thẻ đã ẩn/xóa ngay trên màn hình)
    document.querySelector("#ps-note b").textContent = filtered().length;
  });

  render();
})();
