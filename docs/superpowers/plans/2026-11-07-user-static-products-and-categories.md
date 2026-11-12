# Kế Hoạch Chuyển Đổi Danh Mục Sản Phẩm Tĩnh & Phân Trang Thông Báo Phía User

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Mục tiêu:**
1. Chuyển đổi toàn bộ hệ thống danh mục phân loại phía khách hàng (User) từ cơ chế nạp JS động (`?cat=...`) thành **6 file HTML tĩnh độc lập**:
   - `pages/products-hg.html` (Mẫu gọn nhẹ - High Grade)
   - `pages/products-rg.html` (Mẫu nhiều chi tiết - Real Grade)
   - `pages/products-mg.html` (Mẫu trưng bày - Master Grade)
   - `pages/products-pg.html` (Mô hình cỡ lớn - Perfect Grade)
   - `pages/products-sd.html` (Mẫu mini - Super Deformed)
   - `pages/products-tool.html` (Đồ nghề lắp ráp - Dụng cụ & Sơn)
2. Chuẩn hóa trang `pages/products.html` (Tất cả mô hình):
   - Đưa tất cả các mẫu Gundam đẹp nhất của người dùng lên **Trang 1**: Barbatos Lupus Rex, Barbatos MG, Sazabi Ver.Ka, Strike Freedom, Unicorn Gundam, Wing Gundam Zero, 00 Raiser, RX-78-2 Unleashed, Hi-Nu Gundam Ver.Ka, Gundam Aerial, Gundam Calibarn, Gundam Exia.
   - Cơ chế phân trang: Khi bấm vào trang 2, trang 3, trang 4... chỉ hiển thị Toast thông báo chuyển trang tương ứng, danh sách 12 siêu phẩm ở trên vẫn hiển thị nguyên vẹn.
3. Cập nhật Menu dropdown Danh mục trong Header (`assets/js/layout.js`) để trỏ trực tiếp đến 6 trang HTML tĩnh mới.
4. Đảm bảo toàn bộ quy trình diễn ra trên nhánh `freestyle`, **TUYỆT ĐỐI KHÔNG GIT PUSH**.

---

### Danh sách các nhiệm vụ cụ thể

- [ ] **Task 1: Cấu trúc hóa các mẫu Gundam đẹp nhất lên Trang 1 (`pages/products.html`) & Phân trang Toast**
  - Tích hợp 12 mẫu Gunpla xuất sắc nhất vào lưới sản phẩm tĩnh của `pages/products.html`.
  - Thêm cụm Toast thông báo chuyển trang thuần CSS / HTML (chuyển sang Trang 2, Trang 3...).
  - Cập nhật dải tab phân loại trên đầu trang trỏ về các file tĩnh mới (`products-hg.html`, `products-mg.html`...).

- [ ] **Task 2: Xây dựng 6 trang HTML tĩnh cho từng danh mục phân loại**
  - Tạo `pages/products-hg.html`: Danh sách mô hình HG (10+ mẫu nổi tiếng).
  - Tạo `pages/products-rg.html`: Danh sách mô hình RG (8+ mẫu nhiều chi tiết).
  - Tạo `pages/products-mg.html`: Danh sách mô hình MG (8+ mẫu khung xương tỷ lệ 1/100).
  - Tạo `pages/products-pg.html`: Danh sách mô hình PG (4+ mẫu cao cấp tỷ lệ 1/60).
  - Tạo `pages/products-sd.html`: Danh sách mô hình SD (8+ mẫu chibi mini).
  - Tạo `pages/products-tool.html`: Danh sách dụng cụ & phụ kiện lắp ráp (8+ sản phẩm dụng cụ).

- [ ] **Task 3: Cập nhật Header & Dropdown Danh mục trong `assets/js/layout.js`**
  - Điều chỉnh 6 liên kết trong dropdown menu "Danh mục" sang các file `.html` tĩnh tương ứng.
  - Xử lý trạng thái `active` của menu header khi người dùng truy cập các trang này.

- [ ] **Task 4: Kiểm thử và xác minh trên Localhost**
  - Kiểm tra `http://localhost:5500/pages/products.html`: click các nút phân trang 1, 2, 3 và xác nhận bắn toast thông báo trong khi danh sách vẫn giữ nguyên các con Gundam đẹp.
  - Kiểm tra click dropdown Danh mục và chuyển mượt mà qua cả 6 trang phân loại mới.
  - Xác minh trạng thái git trên nhánh `freestyle` (không có lệnh push nào được thực thi).
