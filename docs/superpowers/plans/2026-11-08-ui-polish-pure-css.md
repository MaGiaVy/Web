# Pure CSS UI/UX Polish Implementation Plan (6 Issues)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Khắc phục trọn vẹn 6 vấn đề giao diện phía User (Thanh tìm kiếm, chống bôi xanh Hero Best Sellers, chuẩn hóa bố cục 4 cột Footer, khóa nhập tay Khoảng giá, tách Tab Đổi mật khẩu 5A, và Hộp thoại xác nhận Hủy đơn) bằng **100% HTML + CSS thuần (0% JavaScript mới)**.

**Architecture:** Sử dụng các kỹ thuật CSS hiện đại gồm `:has(option:checked)` để khóa ô nhập giá khi chọn khoảng giá có sẵn, `user-select: none` để chống bôi đen xanh khi nhấp đúp vào nút chuyển slide Best Sellers, hệ thống Radio/Checkbox + `<label>` thuần CSS cho việc chuyển 3 tab trang Tài khoản (5A) và bật/đóng Hộp thoại xác nhận Hủy đơn (Modal Confirm) kèm đổi trạng thái đơn hàng sang "Đã hủy".

**Tech Stack:** HTML5, CSS3 (`:has()`, `:checked`, `user-select`), không sử dụng JavaScript.

**Spec:** Yêu cầu trực tiếp của người dùng (6 mục kiểm tra ngày 08/11/2026).

## Global Constraints

- **0% JavaScript mới:** Tuyệt đối không viết thêm bất kỳ hàm JS nào cho cả 6 tính năng (kể cả mục 4 và mục 6).
- **Bảo toàn giao diện gốc:** Giữ nguyên hệ màu, phông chữ và cấu trúc thẻ của nhánh `user-ui` / `freestyle`.
- **Không tự ý push Git:** Chỉ sửa trên local sau khi người dùng duyệt kế hoạch.

## Review Focus

- Nhấp đúp / nhấp liên tục vào mũi tên trái/phải của khu vực `BEST SELLERS` trên `index.html` và `index1.html` không được xuất hiện vệt bôi đen màu xanh dương.
- Footer trên tất cả 19 trang khách hàng phải dùng đúng `<div class="container footer-top">` để chia 4 cột ngang đều đặn và không bị lặp chữ "Liên hệ" sát tiêu đề "LIÊN HỆ".
- Khi chọn một khoảng giá có sẵn trong `<select name="range">` ở `pages/advanced-search.html`, 2 ô nhập tay `tu` và `den` phải bị khóa (`pointer-events: none`, nền xám mờ); khi chọn lại "Tất cả mức giá" thì mở khóa trở lại.
- Trang `pages/account.html` mặc định chỉ hiển thị tab **Hồ sơ cá nhân**; khi bấm **Sổ địa chỉ** hoặc **Đổi mật khẩu** ở menu bên trái mới chuyển sang khung tương ứng (Phương án 5A).
- Khi bấm nút **Hủy đơn** ở `pages/orders.html` hoặc `pages/order-detail.html`, phải hiện hộp thoại xác nhận hỏi *"Bạn có chắc chắn muốn hủy đơn hàng #DH26110201 không?"* có nút **Không, quay lại** và **Đồng ý hủy**.

---

### Task 1: Xóa chữ "Gundam" mặc định trên thanh tìm kiếm & Đồng bộ Footer 4 cột chuẩn gốc (Mục 1 & Mục 3)

**Files:**
- Modify: `index.html`, `index1.html`, `pages/*.html` (tất cả 19 trang khách hàng)

- [ ] **Step 1: Xóa thuộc tính `value="Gundam"` trên thanh tìm kiếm Header và trang Tìm kiếm nâng cao**
  - Đổi `<input type="text" name="q" id="header-search-input" value="Gundam" ...>` thành `value=""` trên toàn bộ các trang để ô tìm kiếm trống tự nhiên, hiển thị đúng `placeholder="Tìm mô hình, đồ nghề..."`.
  - Đổi `<input class="input" name="q" value="Gundam" ...>` trong `pages/advanced-search.html` thành `value=""`.
- [ ] **Step 2: Chuẩn hóa Footer từ `.footer-grid` sang `.footer-top` và bỏ dòng "Liên hệ" trùng lặp**
  - Thay thế toàn bộ `<div class="container footer-grid">` ở các trang bị lệch (`index.html`, `index1.html`, `pages/products*.html`, `pages/product.html`, `pages/advanced-search.html`, `pages/search-result.html`, `pages/login.html`, `pages/register.html`) bằng cấu trúc `<div class="container footer-top">` chuẩn gốc có `.footer-brand` và `.footer-promises`.
  - Trong cột **Hỗ trợ** của Footer, giữ 4 mục: *Lịch sử mua hàng*, *Tài khoản của tôi*, *Giỏ hàng*, *Hướng dẫn mua hàng* (bỏ dòng link *Liên hệ* cuối cột Hỗ trợ để không bị lặp với cột *LIÊN HỆ* kế bên).

---

### Task 2: Chống bôi xanh khi bấm nhanh ở khu vực Best Sellers (Mục 2)

**Files:**
- Modify: `assets/css/home.css`
- Modify: `assets/css/style.css`

- [ ] **Step 1: Thêm `user-select: none` cho toàn bộ khu vực Hero Carousel**
  - Trong `assets/css/home.css`, bổ sung:
    ```css
    body.store-home .hero-collectors,
    body.store-home .hero-arrow,
    body.store-home .hero-art,
    body.store-home .hero-side,
    body.store-home .hero-watermark {
      -webkit-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
    }
    ```
- [ ] **Step 2: Kiểm tra thao tác nhấp chuột nhanh liên tục vào mũi tên trái/phải**
  - Đảm bảo khi click nhanh 10 lần liên tiếp không có bất kỳ vùng văn bản hay hình ảnh nào bị trình duyệt tô xanh.

---

### Task 3: Khóa ô nhập tay khi chọn Khoảng giá có sẵn bằng 100% CSS `:has()` (Mục 4 - 0% JS)

**Files:**
- Modify: `pages/advanced-search.html`
- Modify: `assets/css/style.css`

- [ ] **Step 1: Cập nhật nhãn và ghi chú trong `pages/advanced-search.html`**
  - Trong `<select class="select" name="range">`, đặt option mặc định là `<option value="" selected>Tất cả mức giá (Tự nhập bên dưới)</option>`.
  - Thêm dòng chú thích nhỏ tự động đổi trạng thái dưới 2 ô nhập giá: khi đã chọn khoảng giá ở trên thì hiện dòng nhắc *"Đang áp dụng khoảng giá chọn sẵn (chọn lại 'Tất cả mức giá' nếu muốn tự nhập tay)"*.
- [ ] **Step 2: Viết quy tắc CSS `:has()` khóa 2 ô nhập tay khi chọn khoảng giá**
  - Trong `assets/css/style.css`:
    ```css
    .adv-form:has(select[name="range"] option:not([value=""]):checked) .price-inputs {
      cursor: not-allowed;
    }
    .adv-form:has(select[name="range"] option:not([value=""]):checked) .price-inputs input {
      pointer-events: none;
      background: #f0efec;
      color: var(--muted);
      opacity: 0.55;
    }
    .adv-price-locked-note {
      display: none;
      margin-top: 6px;
      font-size: 12px;
      color: #8a6645;
    }
    .adv-form:has(select[name="range"] option:not([value=""]):checked) .adv-price-locked-note {
      display: block;
    }
    ```

---

### Task 4: Thiết kế lại trang Tài khoản theo Phương án 5A (3 Tab độc lập bằng Pure CSS)

**Files:**
- Modify: `pages/account.html`
- Modify: `assets/css/style.css`

- [ ] **Step 1: Chuyển 3 phân khu trong `pages/account.html` thành 3 Tab điều khiển bằng Radio thuần CSS**
  - Đặt 3 radio ẩn trước `.account-layout`:
    - `<input type="radio" name="acc-tab" id="acc-tab-profile" class="acc-tab-radio" checked>`
    - `<input type="radio" name="acc-tab" id="acc-tab-addresses" class="acc-tab-radio">`
    - `<input type="radio" name="acc-tab" id="acc-tab-password" class="acc-tab-radio">`
  - Trong `<nav class="account-nav">`, dùng `<label for="acc-tab-profile">`, `<label for="acc-tab-addresses">`, `<label for="acc-tab-password">` để khi bấm vào mục nào ở cột trái thì mục đó sáng `.active` và bên cột phải **chỉ hiển thị đúng 1 thẻ `<section>` tương ứng** (Hồ sơ cá nhân / Sổ địa chỉ / Đổi mật khẩu).
- [ ] **Step 2: Bổ sung lối tắt "Đổi mật khẩu" và nút Ẩn/Hiện mật khẩu thuần CSS**
  - Thêm nút con mắt bật/tắt gợi ý hoặc bố cục rõ ràng theo chuẩn `/ui-ux-pro-max` trong thẻ Đổi mật khẩu.

---

### Task 5: Hộp thoại xác nhận "Bạn có chắc chắn muốn hủy đơn?" bằng 100% HTML + CSS (Mục 6 - 0% JS)

**Files:**
- Modify: `pages/orders.html`
- Modify: `pages/order-detail.html`
- Modify: `assets/css/style.css`

- [ ] **Step 1: Tạo Modal xác nhận Hủy đơn bằng Checkbox thuần CSS**
  - Thêm 2 checkbox ẩn cho đơn `#DH26110201`:
    - `#modal-cancel-toggle`: Mở/đóng hộp thoại xác nhận `.confirm-backdrop`.
    - `#order-cancelled-state`: Ghi nhận trạng thái sau khi người dùng bấm **"Đồng ý hủy"**.
  - Đổi nút **Hủy đơn** thành `<label for="modal-cancel-toggle" class="btn btn-outline btn-sm">✕ Hủy đơn</label>`.
  - Khi bấm **Hủy đơn**, hộp thoại `.confirm-backdrop` hiện lên chính giữa màn hình:
    - Tiêu đề: **Hủy đơn hàng #DH26110201?**
    - Nội dung: *Bạn có chắc chắn muốn hủy đơn hàng này không? Thao tác này không thể hoàn tác.*
    - Nút 1: `<label for="modal-cancel-toggle" class="btn btn-outline">Không, quay lại</label>` (bấm vào đóng hộp thoại ngay).
    - Nút 2: `<label for="order-cancelled-state" class="btn btn-primary">Đồng ý hủy</label>` (bấm vào sẽ đóng hộp thoại, đồng thời đổi nhãn trạng thái đơn `#DH26110201` từ `Chưa xác nhận` sang `Đã hủy` màu đỏ và hiện thanh thông báo xác nhận đã hủy đơn thành công — hoàn toàn bằng CSS!).
