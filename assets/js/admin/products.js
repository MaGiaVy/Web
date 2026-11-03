// QUẢN LÝ SẢN PHẨM: tìm kiếm (web tĩnh: tìm gì cũng ra 1 trang kết quả mẫu), thêm/sửa (trang riêng), xóa
// Xóa (web tĩnh, chỉ hiện thông báo): đã bán -> nút "Ẩn", hỏi xác nhận rồi báo "đã ẩn"
//                                    chưa bán -> nút "Xóa", hỏi xác nhận rồi báo "đã xóa vĩnh viễn"
(function () {
  const PER_PAGE = 12;
  const $ = (id) => document.getElementById(id);
  const state = { page: 1, search: null }; // search: điều kiện đã tìm (null = đang xem tất cả)

  $("add-product").innerHTML = `${icon("plus")} Thêm sản phẩm`;
  $("ps-cat").innerHTML = `<option value="">Tất cả loại (${PRODUCTS.length})</option>` +
    CATEGORIES.map((c) => `<option value="${c.id}">${c.id === "TOOL" ? "Dụng cụ & Sơn" : `${c.name} (${c.id})`} - ${PRODUCTS.filter((p) => p.category === c.id).length}</option>`).join("");

  // Web tĩnh: không lọc thật. Bấm Tìm kiếm với điều kiện nào cũng ra cùng 1 trang kết quả mẫu
  // (SEARCH_RESULT_IDS trong data.js, dùng chung với trang tìm kiếm bên khách hàng)
  function filtered() {
    if (state.search) return SEARCH_RESULT_IDS.map(getProduct);
    return PRODUCTS.slice().sort((a, b) => b.id - a.id);
  }
  const catText = () => $("ps-cat").selectedOptions[0].text.split(" - ")[0].replace(/ \(\d+\)$/, "");

  function card(p) {
    return `
      <article class="ap-card ${p.hidden ? "is-hidden" : ""}" data-id="${p.id}">
        <div class="ap-thumb">
          <img src="${asset(p.image)}" alt="${escapeHtml(p.name)}">
          ${p.hidden
            ? `<span class="ap-status chip chip-hidden">Đang ẩn</span>`
            : `<span class="ap-status chip ${p.sold > 0 ? "chip-delivered" : "chip-pending"}">${p.sold > 0 ? "Đã có người mua" : "Chưa bán"}</span>`}
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
          ${p.hidden
            ? `<button class="btn btn-blue btn-sm" data-show title="Sản phẩm đang ẩn, bấm để mở bán lại">${icon("eye")} Mở bán</button>`
            : p.sold > 0
            ? `<button class="btn btn-warning-outline btn-sm" data-delete title="Đã có người mua nên chỉ ẩn được, không xóa">${icon("eyeOff")} Ẩn</button>`
            : `<button class="btn btn-danger-outline btn-sm" data-delete title="Chưa bán nên được xóa vĩnh viễn">${icon("trash")} Xóa</button>`}
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

    $("ps-note").innerHTML = state.search
      ? `<div class="search-result-bar">
          <span>${icon("search")}<span>Kết quả tìm kiếm: <b>${items.length}</b> sản phẩm</span></span>
          ${state.search.map((c) => `<span class="chip chip-confirmed">${c}</span>`).join("")}
          <button type="button" class="link" id="ps-clear">← Xem tất cả sản phẩm</button>
        </div>`
      : ""; // chỉ hiện khi đang xem kết quả tìm kiếm

    renderPagination($("ps-pagination"), items.length, PER_PAGE, state.page, (page) => {
      state.page = page;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return items.length;
  }

  // Tìm kiếm: điều kiện nào cũng ra trang kết quả mẫu
  $("product-filter").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("ps-name").value.trim();
    state.search = [
      name ? `Tên: “${escapeHtml(name)}”` : "",
      `Loại: ${catText()}`,
      `Sắp xếp: ${$("ps-sort").selectedOptions[0].text}`,
    ].filter(Boolean);
    state.page = 1;
    render();
    toast("Đã tìm kiếm sản phẩm", `Tìm thấy ${SEARCH_RESULT_IDS.length} sản phẩm`);
  });
  // Đặt lại / Xem tất cả: quay về danh sách đầy đủ
  function showAll() {
    $("product-filter").reset();
    state.search = null;
    state.page = 1;
    render();
    toast("Đã đặt lại", "Đang hiển thị tất cả sản phẩm", "info");
  }
  $("ps-reset").addEventListener("click", showAll);
  $("ps-note").addEventListener("click", (e) => { if (e.target.closest("#ps-clear")) showAll(); });
  $("add-product").addEventListener("click", (e) => {
    e.preventDefault();
    toastThenGo("product-form.html", "Mở biểu mẫu thêm sản phẩm", "", "info");
  });

  // XÓA / ẨN / MỞ BÁN LẠI SẢN PHẨM (web tĩnh: chỉ hỏi xác nhận rồi hiện thông báo)
  $("admin-products").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-delete], [data-show]");
    if (!btn) return;
    const cardEl = btn.closest(".ap-card");
    const p = getProduct(cardEl.dataset.id);

    // Thông báo chỉ ghi mã + tên ngắn gọn để không bị dài nhiều dòng
    const code = `<strong>GP${String(p.id).padStart(4, "0")}</strong> ${escapeHtml(p.name)}`;
    // Thông tin sản phẩm trong hộp thoại để admin nhìn là biết đang thao tác với sản phẩm nào
    const info = `
      <div class="del-product">
        <img src="${asset(p.image)}" alt="">
        <div>
          <b>${escapeHtml(p.name)}</b>
          <small>Mã GP${String(p.id).padStart(4, "0")} · ${money(p.price)}</small>
          <small>Đã bán <b>${numberDot(p.sold)}</b> · Tồn kho <b>${p.stock}</b></small>
        </div>
      </div>`;

    if (p.hidden) {
      const ok = await confirmDialog({
        title: "Mở bán lại sản phẩm?",
        message: "Sản phẩm đang bị ẩn khỏi trang bán hàng.",
        body: `${info}
          <ul class="del-effects show">
            <li>${icon("eye")} Hiển thị lại trên trang bán hàng</li>
            <li>${icon("cart")} Khách hàng có thể tìm thấy và đặt mua</li>
          </ul>`,
        iconName: "eye", okText: "Mở bán lại", cancelText: "Không, vẫn ẩn",
      });
      if (!ok) return toast("Đã hủy mở bán", `${code} vẫn đang ẩn`, "info");
      toast("Đã mở bán lại sản phẩm", `${code}<br>Đã hiển thị lại trên trang bán hàng`);
    } else if (p.sold > 0) {
      const ok = await confirmDialog({
        title: "Ẩn sản phẩm này?",
        message: `Sản phẩm đã có <b>${numberDot(p.sold)} lượt mua</b> nên không thể xóa, chỉ có thể ẩn.`,
        body: `${info}
          <ul class="del-effects">
            <li>${icon("eyeOff")} Khách hàng không còn thấy và mua được sản phẩm</li>
            <li>${icon("orders")} Các đơn hàng cũ vẫn giữ nguyên thông tin</li>
            <li>${icon("refresh")} Có thể mở bán lại bất cứ lúc nào</li>
          </ul>`,
        iconName: "eyeOff", okText: "Ẩn sản phẩm", cancelText: "Không, giữ lại",
      });
      if (!ok) return toast("Đã hủy ẩn sản phẩm", `${code} vẫn đang được bán`, "info");
      toast("Đã ẩn sản phẩm", `${code}<br>Đã ẩn khỏi trang bán hàng`);
    } else {
      const ok = await confirmDialog({
        title: "Xóa vĩnh viễn sản phẩm?",
        message: "Sản phẩm <b>chưa có ai mua</b> nên sẽ bị xóa hẳn khỏi hệ thống.",
        body: `${info}
          <ul class="del-effects danger">
            <li>${icon("trash")} Xóa hết thông tin, hình ảnh và mô tả</li>
            <li>${icon("warning")} Không thể khôi phục sau khi xóa</li>
          </ul>`,
        okText: "Xóa vĩnh viễn", cancelText: "Không, giữ lại", danger: true,
      });
      if (!ok) return toast("Đã hủy xóa sản phẩm", `${code} chưa bị xóa`, "info");
      toast("Đã xóa sản phẩm", `${code}<br>Đã xóa vĩnh viễn khỏi hệ thống`);
    }
  });

  render();
})();
