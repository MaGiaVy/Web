// TRANG CHỦ
(function () {
  const usp = [
    ["shield", "Chính hãng 100%", "Nhập trực tiếp từ Bandai"],
    ["truck", "Giao hàng toàn quốc", "Miễn phí đơn từ 1 triệu"],
    ["refresh", "Đổi trả 7 ngày", "Thiếu runner đổi ngay"],
    ["gift", "Quà tặng kèm", "Đế trưng bày cho đơn MG"],
  ];
  document.getElementById("usp").innerHTML = usp.map(([ic, title, sub]) => `
    <div class="usp-item"><div class="icon-circle">${icon(ic)}</div><div><b>${title}</b><span>${sub}</span></div></div>`).join("");

  // Danh mục: lấy ảnh sản phẩm bán chạy nhất của mỗi loại làm ảnh đại diện
  document.getElementById("home-categories").innerHTML = CATEGORIES.map((c) => {
    const items = SHOP_PRODUCTS.filter((p) => p.category === c.id);
    const cover = items.slice().sort((a, b) => b.sold - a.sold)[0];
    return `
      <a class="cat-card" href="${page("products.html")}?cat=${c.id}">
        <img src="${asset(cover.image)}" alt="${c.name}">
        <div>
          <b>${c.id === "TOOL" ? "Dụng cụ" : c.id} <span class="count">${items.length} SP</span></b>
          <small>${c.desc}</small>
        </div>
      </a>`;
  }).join("");

  const best = SHOP_PRODUCTS.filter((p) => p.category !== "TOOL").sort((a, b) => b.sold - a.sold).slice(0, 8);
  document.getElementById("home-best").innerHTML = best.map(productCard).join("");

  const fresh = SHOP_PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  document.getElementById("home-new").innerHTML = fresh.map(productCard).join("");

  const guide = [
    ["HG", "Người mới bắt đầu", "Ít chi tiết, lắp trong 2 - 3 giờ, giá dễ tiếp cận.", "1/144", "~13 cm", "2 - 3 giờ"],
    ["RG", "Thích chi tiết, ít chỗ trưng bày", "Kích thước như HG nhưng chi tiết gần bằng MG.", "1/144", "~13 cm", "6 - 8 giờ"],
    ["MG", "Đã có kinh nghiệm", "Có khung xương bên trong, cử động linh hoạt.", "1/100", "~18 cm", "8 - 12 giờ"],
    ["PG", "Dân sưu tầm", "Kích thước lớn, hàng nghìn chi tiết, có đèn LED.", "1/60", "~30 cm", "25 giờ+"],
  ];
  document.getElementById("home-guide").innerHTML = guide.map(([g, who, desc, scale, size, time]) => `
    <div class="guide-item">
      <span class="grade grade-${g}">${g}</span>
      <h4>${who}</h4>
      <p>${desc}</p>
      <ul><li><span>Tỷ lệ</span><b>${scale}</b></li><li><span>Chiều cao</span><b>${size}</b></li><li><span>Thời gian lắp</span><b>${time}</b></li></ul>
    </div>`).join("");

  bindAddToCart();
})();
