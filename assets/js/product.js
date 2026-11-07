// TRANG CHI TIẾT SẢN PHẨM (product.html?id=...)
(function () {
  const p = getProduct(getParam("id")) || PRODUCTS[0];
  const cat = getCategory(p.category);
  const catName = CATEGORY_LABELS[p.category];
  const code = `GP${String(p.id).padStart(4, "0")}`; // cùng mã với trang quản trị
  // Tình trạng kho: hết hàng / sắp hết (<= 5) / còn hàng
  const stockText = p.stock <= 0 ? `<b class="out">Hết hàng</b>` : p.stock <= 5 ? `<b class="low">Sắp hết hàng</b> · chỉ còn ${p.stock} sản phẩm` : `<b>Còn hàng</b> · ${p.stock} sản phẩm có sẵn`;
  const off = discountPercent(p);
  document.title = `${p.name} - Frame & Form`;

  document.getElementById("breadcrumb").innerHTML =
    `<a href="${page("index.html")}">Trang chủ</a>${icon("chevronRight")}<a href="products.html?cat=${p.category}">${catName}</a>${icon("chevronRight")}<b>${escapeHtml(p.name)}</b>`;

  const isKit = p.category !== "TOOL";
  const specs = isKit
    ? [["layers", "Phân loại", `${catName} (${cat.id})`], ["ruler", "Tỷ lệ", cat.scale === "SD" ? "Super Deformed (SD)" : cat.scale], ["tag", "Series", p.series], ["box", "Tình trạng", p.stock > 0 ? "Còn hàng" : "Hết hàng"]]
    : [["layers", "Phân loại", catName], ["tag", "Nhóm", p.series], ["box", "Tình trạng", p.stock > 0 ? "Còn hàng" : "Hết hàng"], ["shield", "Chất lượng", "Hàng chính hãng"]];

  document.getElementById("product-detail").innerHTML = `
    <div class="card">
      <div class="pd-layout">
        <div class="pd-gallery">
          <img src="${asset(p.image)}" alt="${escapeHtml(p.name)}">
        </div>
        <div class="pd-info">
          <span class="grade grade-${p.category}">${catName.toUpperCase()}</span>
          ${p.isNew ? `<span class="flag flag-new" style="margin-left:6px">Hàng mới</span>` : ""}
          <h1>${escapeHtml(p.name)}</h1>
          <div class="pd-sub"><span class="star">${icon("star")} ${p.rating.toFixed(1)}</span><i></i><span>Đã bán <b>${numberDot(p.sold)}</b></span><i></i><span>Mã SP: <b>${code}</b></span></div>
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
          <p class="pd-stock">${stockText}</p>
          <div class="pd-policy">
            <div>${icon("truck")}<span>Miễn phí giao hàng cho đơn từ ${money(STORE_INFO.freeShipFrom)}</span></div>
            <div>${icon("refresh")}<span>Đổi trả trong ${STORE_INFO.returnDays} ngày</span></div>
            <div>${icon("shield")}<span>Hàng chính hãng, nguyên hộp</span></div>
          </div>
        </div>
      </div>
      <div class="tabs" id="tabs">
        <button class="active" data-tab="desc">Mô tả sản phẩm</button>
        <button data-tab="spec">Thông số kỹ thuật</button>
        <button data-tab="review">Giao hàng &amp; đổi trả</button>
      </div>
      <div class="tab-panel" data-panel="desc">
        <p><b>${escapeHtml(p.name)}</b> - ${escapeHtml(p.desc)}</p>
        <p style="margin-top:10px">${isKit
          ? `Mô hình lắp ráp dòng <b>${cat.name}</b>, tỷ lệ <b>${cat.scale}</b>, thuộc series <b>${escapeHtml(p.series)}</b>. Hộp gồm các khung nhựa (runner) đã phân màu, sách hướng dẫn lắp ráp và decal dán; không cần keo dán.`
          : "Dụng cụ hỗ trợ lắp ráp và hoàn thiện mô hình, dùng được cho mọi dòng HG, RG, MG, PG và SD."}</p>
      </div>
      <div class="tab-panel" data-panel="spec" hidden>
        <table class="spec-table">
          <tr><td>Tên sản phẩm</td><td>${escapeHtml(p.name)}</td></tr>
          <tr><td>Phân loại</td><td>${catName}</td></tr>
          ${isKit ? `<tr><td>Tỷ lệ</td><td>${cat.scale}</td></tr><tr><td>Series</td><td>${escapeHtml(p.series)}</td></tr>` : `<tr><td>Nhóm</td><td>${escapeHtml(p.series)}</td></tr>`}
          <tr><td>Mã sản phẩm</td><td>${code}</td></tr>
          <tr><td>Giá bán</td><td><b class="text-red">${money(p.price)}</b>${p.oldPrice ? ` <s class="muted">${money(p.oldPrice)}</s>` : ""}</td></tr>
          <tr><td>Tình trạng kho</td><td>${p.stock > 0 ? `Còn ${p.stock} sản phẩm` : "Hết hàng"}</td></tr>
        </table>
      </div>
      <div class="tab-panel" data-panel="review" hidden>
        <ul class="pd-ship-list">
          <li>Giao hàng toàn quốc, dự kiến ${STORE_INFO.deliveryDays} ngày làm việc. Phí giao hàng ${money(STORE_INFO.shipFee)}, <b>miễn phí cho đơn từ ${money(STORE_INFO.freeShipFrom)}</b>.</li>
          <li>Thanh toán khi nhận hàng (COD) hoặc chuyển khoản.</li>
          <li>Đổi trả trong <b>${STORE_INFO.returnDays} ngày</b> nếu hộp bị móp, thiếu chi tiết hoặc giao sai mẫu (sản phẩm còn nguyên hộp, chưa cắt runner).</li>
          <li>Cần hỗ trợ? Gọi hotline <b>${STORE_INFO.hotline}</b> (${STORE_INFO.hours}).</li>
        </ul>
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
