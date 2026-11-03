// TRANG GIỎ HÀNG - dữ liệu mẫu, thay đổi chỉ hiển thị trên trang (không lưu)
(function () {
  const cart = SAMPLE_CART.map((item) => ({ ...item }));
  const body = document.getElementById("cart-body");

  function render() {
    body.innerHTML = cart.length ? cart.map((item) => {
      const p = getProduct(item.productId);
      return `
        <tr data-id="${p.id}">
          <td><div class="cell-product">
            <img src="${p.image}" alt="${escapeHtml(p.name)}">
            <div><a href="product.html?id=${p.id}"><b>${escapeHtml(p.name)}</b></a><small><span class="grade grade-${p.category}">${p.category}</span> ${escapeHtml(p.series)}</small></div>
          </div></td>
          <td class="right num">${money(p.price)}</td>
          <td class="center">
            <div class="qty qty-sm">
              <button type="button" data-minus aria-label="Giảm">${icon("minus")}</button>
              <input value="${item.qty}" readonly aria-label="Số lượng">
              <button type="button" data-plus aria-label="Tăng">${icon("plus")}</button>
            </div>
          </td>
          <td class="right num"><b class="text-red">${money(p.price * item.qty)}</b></td>
          <td class="right"><button class="icon-btn" data-remove title="Xóa khỏi giỏ">${icon("trash")}</button></td>
        </tr>`;
    }).join("") : `<tr><td colspan="5"><div class="empty-state">${icon("cart")}<h3>Giỏ hàng đang trống</h3><p>Hãy chọn vài mẫu Gundam thật ngầu nhé!</p><br><a class="btn btn-dark" href="products.html">Mua sắm ngay</a></div></td></tr>`;
    updateSummary();
  }

  function updateSummary() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const sub = cart.reduce((s, i) => s + getProduct(i.productId).price * i.qty, 0);
    const ship = sub === 0 || sub >= 1000000 ? 0 : 30000;
    document.getElementById("cart-title").textContent = `Giỏ hàng của bạn (${count} sản phẩm)`;
    document.getElementById("sum-count").textContent = count;
    document.getElementById("sum-sub").textContent = money(sub);
    document.getElementById("sum-ship").textContent = ship ? money(ship) : "Miễn phí";
    document.getElementById("sum-total").textContent = money(sub + ship);
    document.getElementById("ship-note").innerHTML = sub >= 1000000
      ? `${icon("truck")}<span>Đơn hàng của bạn được <b>miễn phí vận chuyển</b>.</span>`
      : `${icon("truck")}<span>Mua thêm <b>${money(1000000 - sub)}</b> để được miễn phí vận chuyển.</span>`;
    // Cập nhật số trên icon giỏ hàng của header cho khớp
    document.getElementById("cart-badge").textContent = count;
    document.getElementById("go-checkout").classList.toggle("disabled", count === 0);
  }

  // Web tĩnh: tăng/giảm/xóa chỉ hiện thông báo, giỏ hàng giữ nguyên
  body.addEventListener("click", async (e) => {
    const row = e.target.closest("tr[data-id]");
    if (!row) return;
    const p = getProduct(row.dataset.id);
    if (e.target.closest("[data-plus]")) {
      toast("Đã tăng số lượng", p.name, "info");
    } else if (e.target.closest("[data-minus]")) {
      toast("Đã giảm số lượng", p.name, "info");
    } else if (e.target.closest("[data-remove]")) {
      const ok = await confirmDialog({ title: "Xóa khỏi giỏ hàng?", message: `Bạn có chắc muốn xóa “${escapeHtml(p.name)}” khỏi giỏ hàng?`, okText: "Xóa", danger: true });
      if (!ok) return toast("Đã hủy thao tác", "", "info");
      toast("Đã xóa sản phẩm khỏi giỏ hàng", p.name);
    }
  });

  document.getElementById("go-checkout").addEventListener("click", (e) => {
    e.preventDefault();
    if (!cart.length) return toast("Giỏ hàng đang trống", "Hãy thêm sản phẩm trước khi đặt hàng", "warning");
    toastThenGo("checkout.html", "Đang chuyển đến trang đặt hàng", "Vui lòng kiểm tra thông tin giao hàng", "info");
  });

  render();
})();
