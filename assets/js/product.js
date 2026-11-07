// TRANG CHI TIẾT SẢN PHẨM (product.html?id=...)
(function () {
  const p = getProduct(getParam("id")) || PRODUCTS[0];
  const cat = getCategory(p.category);
  const catName = p.category === "TOOL" ? "Dụng cụ & Sơn" : `${cat.name} (${cat.id})`;
  const off = discountPercent(p);
  document.title = `${p.name} - Frame & Form`;

  document.getElementById("breadcrumb").innerHTML =
    `<a href="${page("index.html")}">Trang chủ</a>${icon("chevronRight")}<a href="products.html?cat=${p.category}">${catName}</a>${icon("chevronRight")}<b>${escapeHtml(p.name)}</b>`;

  const isKit = p.category !== "TOOL";
  const specs = isKit
    ? [["layers", "Phân loại", catName], ["ruler", "Tỷ lệ", cat.scale === "SD" ? "Super Deformed" : cat.scale], ["tag", "Series", p.series], ["image", "Hình ảnh", "Artwork concept"]]
    : [["layers", "Phân loại", catName], ["tag", "Nhóm", p.series], ["image", "Hình ảnh", "Artwork concept"], ["note", "Dữ liệu", "Minh họa đồ án"]];

  document.getElementById("product-detail").innerHTML = `
    <div class="card">
      <div class="pd-layout">
        <div class="pd-gallery">
          <img src="${asset(p.image)}" alt="${escapeHtml(p.name)}">
        </div>
        <div class="pd-info">
          <span class="grade grade-${p.category}">${isKit ? cat.name.toUpperCase() : "DỤNG CỤ & SƠN"}</span>
          ${p.isNew ? `<span class="flag flag-new" style="margin-left:6px">Hàng mới</span>` : ""}
          <h1>${escapeHtml(p.name)}</h1>
          <div class="pd-sub"><span>Hình minh họa concept</span><i></i><span>Mã mẫu: <b>FF${String(p.id).padStart(3, "0")}</b></span></div>
          <div class="pd-price">
            <span class="price">${money(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span><span class="flag flag-sale">Tiết kiệm ${off}%</span>` : ""}
          </div>
          <p class="pd-desc">${escapeHtml(p.desc)}</p>
          <div class="pd-specs">
            ${specs.map(([ic, label, value]) => `<div class="pd-spec">${icon(ic)}<div><small>${label}</small><b>${escapeHtml(value)}</b></div></div>`).join("")}
          </div>
          <div class="pd-buy">
            <div class="qty">
              <button type="button" id="qty-minus" aria-label="Giảm">${icon("minus")}</button>
              <input id="qty-input" value="1" inputmode="numeric" aria-label="Số lượng">
              <button type="button" id="qty-plus" aria-label="Tăng">${icon("plus")}</button>
            </div>
            <button class="btn btn-dark" data-add-cart="${p.id}" data-use-qty="1">${icon("cart")} Thêm vào giỏ hàng</button>
            <button class="btn btn-primary" id="buy-now">Mua ngay</button>
          </div>
          <p class="pd-stock">Tình trạng hiển thị: <b>Dữ liệu mẫu</b></p>
          <div class="pd-policy">
            <div>${icon("image")} Artwork concept nguyên bản</div>
            <div>${icon("note")} Giá và tồn kho minh họa</div>
            <div>${icon("info")} Luồng mua hàng mô phỏng</div>
          </div>
        </div>
      </div>
      <div class="tabs" id="tabs">
        <button class="active" data-tab="desc">Mô tả sản phẩm</button>
        <button data-tab="spec">Thông số kỹ thuật</button>
        <button data-tab="review">Ghi chú</button>
      </div>
      <div class="tab-panel" data-panel="desc">
        <p><b>${escapeHtml(p.name)}</b> - ${escapeHtml(p.desc)}</p>
        <p style="margin-top:10px">${isKit
            ? `Bản minh họa thuộc nhóm <b>${cat.name}</b>, tỷ lệ tham khảo <b>${cat.scale}</b>. Nội dung sản phẩm và artwork được dùng để trình bày giao diện đồ án.`
          : "Artwork concept cho nhóm dụng cụ hobby. Tên, giá và mô tả là dữ liệu minh họa cho giao diện đồ án."}</p>
      </div>
      <div class="tab-panel" data-panel="spec" hidden>
        <table class="spec-table">
          <tr><td>Tên sản phẩm</td><td>${escapeHtml(p.name)}</td></tr>
          <tr><td>Phân loại</td><td>${catName}</td></tr>
          ${isKit ? `<tr><td>Tỷ lệ tham khảo</td><td>${cat.scale}</td></tr><tr><td>Series mẫu</td><td>${escapeHtml(p.series)}</td></tr><tr><td>Hình ảnh</td><td>Artwork concept nguyên bản</td></tr>` : `<tr><td>Nhóm</td><td>${escapeHtml(p.series)}</td></tr>`}
          <tr><td>Giá minh họa</td><td><b class="text-red">${money(p.price)}</b></td></tr>
          <tr><td>Tồn kho mẫu</td><td>${p.stock} sản phẩm</td></tr>
        </table>
      </div>
      <div class="tab-panel" data-panel="review" hidden>
        <p>Đây là khu vực minh họa giao diện. Đồ án không thu thập đánh giá khách hàng thật.</p>
      </div>
    </div>`;

  // Tăng giảm số lượng
  const qtyInput = document.getElementById("qty-input");
  const setQty = (v) => {
    const n = Math.max(1, Math.min(p.stock, Number(v) || 1));
    qtyInput.value = n;
    return n;
  };
  document.getElementById("qty-minus").addEventListener("click", () => {
    const n = setQty(Number(qtyInput.value) - 1);
    toast("Đã cập nhật số lượng", `Số lượng: ${n}`, "info");
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    const before = Number(qtyInput.value);
    const n = setQty(before + 1);
    if (n === before) toast("Đã đạt số lượng tối đa", `Chỉ còn ${p.stock} sản phẩm trong kho`, "warning");
    else toast("Đã cập nhật số lượng", `Số lượng: ${n}`, "info");
  });
  qtyInput.addEventListener("change", () => toast("Đã cập nhật số lượng", `Số lượng: ${setQty(qtyInput.value)}`, "info"));

  document.getElementById("buy-now").addEventListener("click", () => {
    if (!loggedInNow()) return toast("Vui lòng đăng nhập", "Đăng nhập để mua hàng", "warning");
    toastThenGo("cart.html", "Đã thêm vào giỏ hàng", `Đang chuyển đến giỏ hàng...`);
  });

  // Tabs
  document.getElementById("tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;
    document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll("[data-panel]").forEach((panel) => { panel.hidden = panel.dataset.panel !== btn.dataset.tab; });
  });

  // Sản phẩm cùng loại
  const related = SHOP_PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById("related").innerHTML = related.map(productCard).join("");
  document.getElementById("related-more").href = `products.html?cat=${p.category}`;

  bindAddToCart();
})();
