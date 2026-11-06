// THÊM / SỬA SẢN PHẨM (product-form.html hoặc product-form.html?id=...)
(function () {
  const $ = (id) => document.getElementById(id);
  const editing = getProduct(getParam("id"));

  $("pf-cat").innerHTML = `<option value="">-- Chọn phân loại --</option>` +
    CATEGORIES.map((c) => `<option value="${c.id}">${c.id === "TOOL" ? "Dụng cụ & Sơn" : `${c.name} (${c.id})`}</option>`).join("");

  const updateScale = () => {
    const c = getCategory($("pf-cat").value);
    $("pf-scale").value = c ? (c.scale || "Không áp dụng") : "";
  };
  // Ô giá tự thêm dấu chấm hàng nghìn khi gõ
  bindMoneyInput($("pf-price"));
  bindMoneyInput($("pf-old"));

  $("pf-cat").addEventListener("change", () => {
    updateScale();
    const c = getCategory($("pf-cat").value);
    if (c) toast("Đã chọn phân loại", c.id === "TOOL" ? "Dụng cụ & Sơn" : c.name, "info");
  });

  // Sửa giá: ghi giá hiện tại bên dưới ô để lỡ xóa vẫn biết giá cũ mà nhập lại
  function rememberPrice(id, oldValue) {
    const hint = $(id + "-hint");
    hint.innerHTML = `Giá hiện tại: <b>${oldValue ? money(oldValue) : "chưa có"}</b>`;
    hint.hidden = false;
  }

  function showPreview(src) {
    $("preview").innerHTML = src
      ? `<img src="${src}" alt="Ảnh xem trước">`
      : `<div class="placeholder">${icon("image")}<p>Chưa có ảnh<br>Bấm “Chọn ảnh từ máy” để tải lên</p></div>`;
  }

  if (editing) {
    // Hiển thị đúng thông tin cũ trước khi sửa (đặc biệt là phân loại và hình)
    $("form-title").innerHTML = `${icon("edit")} Sửa sản phẩm: GP${String(editing.id).padStart(4, "0")}`;
    $("pf-name").value = editing.name;
    $("pf-cat").value = editing.category;
    $("pf-series").value = editing.series;
    setMoneyValue($("pf-price"), editing.price);
    setMoneyValue($("pf-old"), editing.oldPrice || "");
    rememberPrice("pf-price", editing.price);
    rememberPrice("pf-old", editing.oldPrice);
    $("pf-stock").value = editing.stock;
    $("pf-desc").value = editing.desc;
    $("pf-submit").textContent = "Lưu thay đổi";
    $("upload-text").textContent = "Đổi ảnh khác";
    $("file-name").textContent = `Ảnh hiện tại: ${editing.image.split("/").pop()}`;
    showPreview(asset(editing.image));
    document.title = `Sửa ${editing.name} - Quản trị Frame & Form`;
  } else {
    $("form-title").innerHTML = `${icon("plus")} Thêm sản phẩm mới`;
    showPreview("");
  }
  updateScale();

  // Upload ảnh -> hiển thị xem trước ngay
  $("pf-image").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      showPreview(reader.result);
      $("file-name").textContent = `Đã chọn: ${file.name} (${Math.round(file.size / 1024)} KB)`;
      toast("Đã tải ảnh lên", "Xem trước ảnh ở khung bên phải", "info");
    };
    reader.onerror = () => toast("Không đọc được ảnh", "Hãy chọn lại ảnh khác", "error");
    reader.readAsDataURL(file);
  });

  $("product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("pf-name").value.trim() || "Sản phẩm mới";
    if (editing) toastThenGo("products.html", "Cập nhật sản phẩm thành công", `Đã lưu thay đổi cho “${escapeHtml(name)}”`);
    else toastThenGo("products.html", "Thêm sản phẩm thành công", `“${escapeHtml(name)}” đã được thêm vào danh sách`);
  });

  $("pf-cancel").addEventListener("click", (e) => {
    e.preventDefault();
    toastThenGo("products.html", "Đã hủy", "Thông tin chưa được lưu", "info");
  });
})();
