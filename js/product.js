// TRANG CHI TIẾT SẢN PHẨM (product.html?id=...)
(function () {
  const p = getProduct(getParam("id")) || PRODUCTS[0];
  const cat = getCategory(p.category);
  const catName = p.category === "TOOL" ? "Dụng cụ & Sơn" : `${cat.name} (${cat.id})`;
  const off = discountPercent(p);
  document.title = `${p.name} - DVK Gunpla`;

  document.getElementById("breadcrumb").innerHTML =
    `<a href="index.html">Trang chủ</a>${icon("chevronRight")}<a href="products.html?cat=${p.category}">${catName}</a>${icon("chevronRight")}<b>${escapeHtml(p.name)}</b>`;

  const isKit = p.category !== "TOOL";
  const specs = isKit
    ? [["layers", "Phân loại", catName], ["ruler", "Tỷ lệ", cat.scale === "SD" ? "Super Deformed" : cat.scale], ["tag", "Series", p.series], ["store", "Hãng sản xuất", "Bandai Spirits"]]
    : [["layers", "Phân loại", catName], ["tag", "Nhóm", p.series], ["store", "Xuất xứ", "Nhật Bản"], ["shield", "Bảo hành", "6 tháng"]];

  document.getElementById("product-detail").innerHTML = `
    <div class="card">
      <div class="pd-layout">
        <div class="pd-gallery">
          <img src="${p.image}" alt="${escapeHtml(p.name)}">
        </div>
        <div class="pd-info">
          <span class="grade grade-${p.category}">${isKit ? cat.name.toUpperCase() : "DỤNG CỤ & SƠN"}</span>
          ${p.isNew ? `<span class="flag flag-new" style="margin-left:6px">Hàng mới</span>` : ""}
          <h1>${escapeHtml(p.name)}</h1>
          <div class="pd-sub">
            <span class="star">${icon("star")} ${p.rating.toFixed(1)}</span><i></i>
            <span>Đã bán <b class="num">${numberDot(p.sold)}</b></span><i></i>
            <span>Mã SP: <b>GP${String(p.id).padStart(4, "0")}</b></span>
          </div>
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
          <p class="pd-stock">Tình trạng: <b>Còn hàng</b> (${p.stock} sản phẩm có sẵn)</p>
          <div class="pd-policy">
            <div>${icon("shield")} Chính hãng 100%</div>
            <div>${icon("truck")} Giao hàng 1 - 3 ngày</div>
            <div>${icon("refresh")} Đổi trả trong 7 ngày</div>
          </div>
        </div>
      </div>
      <div class="tabs" id="tabs">
        <button class="active" data-tab="desc">Mô tả sản phẩm</button>
        <button data-tab="spec">Thông số kỹ thuật</button>
        <button data-tab="review">Đánh giá (3)</button>
      </div>
      <div class="tab-panel" data-panel="desc">
        <p><b>${escapeHtml(p.name)}</b> - ${escapeHtml(p.desc)}</p>
        <p style="margin-top:10px">${isKit
          ? `Sản phẩm thuộc dòng <b>${cat.name}</b> tỷ lệ <b>${cat.scale}</b>, nhựa màu tách sẵn nên không cần sơn vẫn đẹp. Bộ kit gồm runner nhựa, sticker/decal, sách hướng dẫn lắp ráp chi tiết bằng hình ảnh. Phù hợp để trưng bày, làm quà tặng hoặc sưu tầm.`
          : "Dụng cụ chuyên dụng cho người chơi Gunpla, giúp quá trình lắp ráp nhanh hơn và mô hình hoàn thiện đẹp hơn."}</p>
      </div>
      <div class="tab-panel" data-panel="spec" hidden>
        <table class="spec-table">
          <tr><td>Tên sản phẩm</td><td>${escapeHtml(p.name)}</td></tr>
          <tr><td>Phân loại</td><td>${catName}</td></tr>
          ${isKit ? `<tr><td>Tỷ lệ</td><td>${cat.scale}</td></tr><tr><td>Series</td><td>${escapeHtml(p.series)}</td></tr><tr><td>Hãng sản xuất</td><td>Bandai Spirits (Nhật Bản)</td></tr><tr><td>Độ tuổi khuyến nghị</td><td>15+</td></tr>` : `<tr><td>Nhóm</td><td>${escapeHtml(p.series)}</td></tr>`}
          <tr><td>Giá bán</td><td><b class="text-red">${money(p.price)}</b></td></tr>
          <tr><td>Tồn kho</td><td>${p.stock} sản phẩm</td></tr>
        </table>
      </div>
      <div class="tab-panel" data-panel="review" hidden>
        ${[["Trần Quang Huy", 5, "Hàng chuẩn chính hãng, đóng gói rất kỹ. Sẽ ủng hộ shop tiếp!"],
           ["Lê Thảo Vy", 5, "Giao hàng nhanh, nhựa đẹp không bị trầy xước."],
           ["Phạm Đức Minh", 4, "Mô hình đẹp, giá tốt so với mặt bằng chung."]]
          .map(([name, star, text]) => `<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px dashed var(--line)"><span class="avatar">${initials(name)}</span><div><b>${name}</b> <span style="color:#d99a00">${"★".repeat(star)}${"☆".repeat(5 - star)}</span><p>${text}</p></div></div>`).join("")}
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
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById("related").innerHTML = related.map(productCard).join("");
  document.getElementById("related-more").href = `products.html?cat=${p.category}`;

  bindAddToCart();
})();
