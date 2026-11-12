# Kế Hoạch Chuyển Đổi Toàn Bộ Phân Hệ Admin Sang 100% HTML + CSS Thuần (Liquid Glass UI — Gundam Barbatos)

> **Nhánh thực thi:** `freestyle` (Tuyệt đối KHÔNG `git push` khi chưa có lệnh của User)
> **Mục tiêu cốt lõi:**
> 1. Loại bỏ 100% các thẻ `<script>` và sự phụ thuộc vào JavaScript trong toàn bộ các trang `admin/*.html`.
> 2. Áp dụng đồng bộ giao diện **Liquid Glass UI** (kính lỏng trong suốt chuẩn VisionOS/iOS kết hợp kỹ thuật `/ui-styling`) với phông nền **Gundam Barbatos Lupus Rex** (`../assets/images/admin/barbatos-bg.jpg`) vào `assets/css/admin.css`.
> 3. Giữ nguyên tính rõ nét, độ tương phản cao của chữ, số tiền, huy hiệu và bảng biểu (không bị chìm vào nền).
> 4. Khắc phục triệt để các lỗi bị trừ điểm của nhóm bạn (không dùng `:target` gây giật nhảy trang và hỏng nút Back, không để phân trang `href="#"` bị liệt, không thêm nút `+` ở từng dòng đơn hàng, giữ đủ bộ lọc `Từ ngày - Đến ngày`, format số tiền có dấu chấm phân cách).

---

## 1. Kiến Trúc Giao Diện & Thanh Điều Hướng (Sidebar & Topbar Tĩnh)

### 1.1. Thứ tự mục trên Thanh Sidebar (Inlined trực tiếp vào mọi trang Admin)
- **Nhóm 1 — Quản lý chính (5 mục chuẩn barem đề bài xếp trên đầu):**
  1. `Tổng quan` (`index.html`)
  2. `Người dùng` (`users.html`)
  3. `Sản phẩm` (`products.html`)
  4. `Đơn hàng` (`orders.html`) — kèm badge đỏ `2`
  5. `Thống kê` (`statistics.html`)
- **Nhóm 2 — Mở rộng (4 mục phụ xếp phía dưới):**
  6. `Khuyến mãi` (`promotions.html`)
  7. `Email khách hàng` (`emails.html`)
  8. `Lời nhắn` (`messages.html`) — kèm badge đỏ `1`
  9. `Cài đặt cửa hàng` (`settings.html`)
- **Nhóm 3 — Liên kết nhanh & Chân trang:**
  - `Xem trang bán hàng` (`../index.html`)
  - `Đăng xuất` (`login.html`)

### 1.2. Hệ thống CSS Tương Tác Không Dùng JS (Pure CSS Checkbox/Radio)
- **Toast thông báo CSS (`<input type="checkbox" id="toast-..." hidden>` + `<label for="toast-...">`):**
  - Hiển thị góc trên bên phải (`position: fixed; top: 24px; right: 24px; z-index: 9999`), có nút đóng `×` (`<label for="toast-...">`), tự động trượt mượt mà, **không đổi URL hash và không làm giật màn hình**.
- **Modal xác nhận CSS (`<input type="checkbox" id="modal-..." hidden>`):**
  - Dùng cho các nút: `Xóa sản phẩm`, `Ẩn / Mở bán sản phẩm`, `Khóa / Mở khóa tài khoản` (có radio chọn lý do khóa + ghi chú), `Xác nhận / Giao hàng / Đã giao / Hủy đơn hàng` (có radio chọn lý do hủy).
  - Khi bấm nút "Đồng ý / Xác nhận" trong Modal: đóng Modal và bật Toast thông báo thành công bằng CSS.
- **Toast sau khi Lưu biểu mẫu (`#saved-toast` với `position: fixed; top: 0; pointer-events: none`):**
  - Khi bấm `Lưu` từ các trang `product-form.html`, `product-edit.html`, `user-form.html`, `user-edit.html`, form điều hướng về trang danh sách (`products.html` hoặc `users.html`) và hiện Toast thông báo `"Đã lưu thông tin thành công!"` (dùng neo `position: fixed` nên trình duyệt tuyệt đối không bị cuộn giật).

---

## 2. Chi Tiết Từng Trang Trong `admin/` (Tổng cộng 17 file HTML tĩnh)

### 2.1. Nhóm Trang Chính Trong Barem
1. **`admin/login.html` (Đăng nhập quản trị):**
   - Giao diện Liquid Glass nổi bật trên nền Gundam Barbatos.
   - Các ô nhập Tên đăng nhập & Mật khẩu **không có `required`**, cho phép gõ tự do hoặc bấm `Đăng nhập` chuyển thẳng vào `index.html`.
2. **`admin/index.html` (Tổng quan / Dashboard):**
   - Hard-code 4 thẻ KPI Liquid Glass (Doanh thu `50.045.000đ`, Đơn chờ xử lý `2`, Khách hàng `8`, Sản phẩm `24`).
   - Hard-code bảng Đơn hàng mới chờ xử lý, Khách hàng chi tiêu cao và Sản phẩm sắp hết hàng.
3. **`admin/users.html` (Quản lý người dùng) & `admin/users-search.html` (Kết quả tìm kiếm người dùng):**
   - Thanh công cụ tách riêng:
     - Form **Tìm kiếm** (`action="users-search.html"`): Ô nhập từ khóa + nút `Tìm kiếm` chuyển sang `users-search.html` (hiển thị 2 người dùng mẫu khớp tìm kiếm + nhãn `"Kết quả tìm kiếm người dùng"` + nút `"← Xem tất cả người dùng"`).
     - Nút **Lọc trạng thái**: Chọn trạng thái + bấm nút `Lọc` -> hiện Toast `"Đã lọc danh sách người dùng!"` ngay tại trang hiện tại.
     - Nút **`+ Thêm người dùng`** (`href="user-form.html"`, tách sang phải `margin-left: auto`).
   - Bảng danh sách người dùng tĩnh (5 dòng mẫu), cột Thao tác cố định `min-width: 175px`:
     - Nút `Xem / Sửa` (`href="user-edit.html"`).
     - Nút `Khóa` / `Mở khóa` mở hộp thoại xác nhận CSS (chọn lý do khóa) -> bấm xác nhận hiện Toast `"Đã khóa/mở khóa tài khoản!"`.
   - Thanh phân trang tĩnh ở chân bảng: Khi bấm vào trang `2` hoặc `›` sẽ hiện Toast `"Đã chuyển trang!"` và giữ nguyên danh sách hiện tại.
4. **`admin/user-form.html` (Thêm người dùng) & `admin/user-edit.html` (Sửa/Xem người dùng):**
   - Cả 2 trang đều cho phép gõ nhập bình thường vào mọi ô input/select, **tuyệt đối không có `required` hay `readonly`/`disabled`**.
   - `user-form.html`: Các ô trống để nhập mới, bấm `Lưu người dùng` -> chuyển về `users.html` kèm Toast `"Đã lưu thông tin người dùng thành công!"`.
   - `user-edit.html`: Điền sẵn thông tin khách hàng mẫu (`Nguyễn Minh Anh`), khung tóm tắt chi tiêu (`5.470.000đ`), bảng lịch sử đơn hàng bên dưới, bấm `Lưu thay đổi` -> chuyển về `users.html` kèm Toast `"Đã cập nhật thông tin người dùng thành công!"`.
5. **`admin/products.html` (Quản lý sản phẩm) & `admin/products-search.html` (Kết quả tìm kiếm sản phẩm):**
   - Thanh công cụ:
     - Ô nhập tên sản phẩm + nút `Tìm kiếm` (`action="products-search.html"`) -> chuyển sang `products-search.html` hiển thị 4 sản phẩm mẫu kèm thanh ghi chú `"Kết quả tìm kiếm: 4 sản phẩm"` và nút `"← Xem tất cả sản phẩm"`.
     - Dropdown Loại sản phẩm + Sắp xếp + nút `Lọc sản phẩm` -> bấm vào hiện Toast `"Đã lọc danh sách sản phẩm!"` ngay tại chỗ.
     - Nút **`+ Thêm sản phẩm`** (`href="product-form.html"`, `margin-left: auto`).
   - Lưới 12 thẻ sản phẩm Gunpla tĩnh (Liquid Glass cards), giá tiền format dấu chấm (`2.400.000đ`):
     - Nút `Sửa` (`href="product-edit.html"`).
     - Sản phẩm đã bán: Nút `Ẩn` (mở modal xác nhận CSS -> hiện Toast `"Đã ẩn sản phẩm!"`).
     - Sản phẩm chưa bán: Nút `Xóa` (mở modal xác nhận CSS -> hiện Toast `"Đã xóa vĩnh viễn sản phẩm!"`).
     - Sản phẩm đang ẩn: Nút `Mở bán` (hiện Toast `"Đã mở bán lại sản phẩm!"`).
   - Thanh phân trang tĩnh: Bấm nút chuyển trang hiện Toast `"Đã chuyển trang!"` và giữ nguyên danh sách.
6. **`admin/product-form.html` (Thêm sản phẩm) & `admin/product-edit.html` (Sửa sản phẩm):**
   - Cả 2 trang đều cho phép gõ nhập bình thường, **không đặt `required`**.
   - Phần tải ảnh dùng `<input type="file" id="pf-image" accept="image/*" hidden>` gắn với `<label for="pf-image" class="btn">` để bấm vào mở cửa sổ chọn file thật của Windows, kèm checkbox xác nhận đã chọn ảnh.
   - `product-form.html`: Form trống, khung placeholder ảnh mẫu, bấm `Thêm sản phẩm` -> về `products.html` kèm Toast lưu thành công.
   - `product-edit.html`: Điền sẵn dữ liệu mẫu (`MG Sazabi Ver.Ka`), ô Giá bán điền sẵn `2.400.000` (format có dấu chấm phân cách) kèm dòng chữ kế bên/bên dưới `Giá hiện tại: 2.400.000đ`, Giá gốc `2.790.000` (`Giá hiện tại: 2.790.000đ`), hiển thị sẵn ảnh `../assets/images/products/sazabi-verka.jpg` và nút `Đổi ảnh khác`. Bấm `Lưu thay đổi` -> về `products.html` kèm Toast lưu thành công.
7. **`admin/orders.html` (Quản lý đơn hàng) & `admin/orders-search.html` (Kết quả tìm kiếm đơn hàng):**
   - Thanh công cụ đủ 3 tiêu chí đề bài:
     - Ô tìm mã đơn / khách hàng + nút `Tìm kiếm` (`action="orders-search.html"`) -> chuyển sang `orders-search.html` hiển thị 2 đơn hàng mẫu kèm nhãn `"Kết quả tìm kiếm: 2 đơn hàng"` và nút `"← Xem tất cả đơn hàng"`.
     - Bộ lọc: Tình trạng + Từ ngày + Đến ngày + Tỉnh/Thành phố + Phường/Xã + nút `Lọc đơn hàng` -> bấm vào hiện Toast `"Đã lọc danh sách đơn hàng!"` và giữ nguyên bảng đơn hàng tĩnh.
   - Bảng danh sách đơn hàng tĩnh (8 dòng mẫu), số tiền có dấu chấm phân cách, có nút `Chi tiết` (`href="order-detail.html"`) và nút chuyển trạng thái (`Xác nhận`, `Giao hàng`, `Đã giao`, `Hủy`) mở Modal xác nhận CSS -> Toast thông báo.
   - Thanh phân trang tĩnh: Bấm chuyển trang hiện Toast `"Đã chuyển trang!"` và giữ nguyên danh sách.
8. **`admin/order-detail.html` (Chi tiết đơn hàng):**
   - Hiển thị tĩnh chi tiết đơn `#DH261023`, thanh tiến trình 4 bước (`Chưa xác nhận` → `Đã xác nhận` → `Đang giao` → `Đã giao`), danh sách sản phẩm trong đơn, thông tin khách hàng/giao hàng/tổng tiền (`3.200.000đ`).
   - Các nút cập nhật trạng thái đơn và nút `In hóa đơn` hoạt động bằng CSS Modal/Toast.
9. **`admin/statistics.html` (Thống kê khách hàng):**
   - Chuyển chính thức giao diện từ bản spike Liquid Glass sang `admin/statistics.html` (và xóa file tạm `statistics-glass-spike.html`).
   - Có ô `Từ ngày`, `Đến ngày` và nút `Thống kê` (bấm vào hiện Toast `"Đã thống kê dữ liệu!"` bằng CSS, giữ nguyên 4 thẻ KPI và bảng Top 5 khách hàng xếp giảm dần từ `10.450.000đ` xuống `5.470.000đ`).

### 2.2. Nhóm 4 Trang Mở Rộng (Xếp Dưới Trên Sidebar)
10. **`admin/promotions.html` (Khuyến mãi):**
    - Form chương trình khuyến mãi (không `required`, bấm `Lưu chương trình` hiện Toast `"Đã lưu chương trình khuyến mãi!"`).
    - Bảng danh sách sản phẩm giảm giá tĩnh (số tiền format dấu chấm `2.400.000đ`), có thanh phân trang tĩnh (bấm hiện Toast `"Đã chuyển trang!"`).
11. **`admin/emails.html` (Email khách hàng):**
    - Form soạn và gửi email (không `required`, bấm `Gửi email` hiện Toast `"Đã gửi email thành công!"`).
    - Bảng danh sách khách hàng nhận email và lịch sử gửi tĩnh + thanh phân trang tĩnh (bấm hiện Toast `"Đã chuyển trang!"`).
12. **`admin/messages.html` (Lời nhắn liên hệ):**
    - Danh sách lời nhắn tĩnh của khách hàng + form phản hồi (không `required`, bấm `Gửi phản hồi` hiện Toast `"Đã gửi phản hồi thành công!"`) + thanh phân trang tĩnh.
13. **`admin/settings.html` (Cài đặt cửa hàng):**
    - Form thông tin cửa hàng, phí vận chuyển format dấu chấm (`30.000đ`, miễn phí từ `1.000.000đ`), thông tin ngân hàng (không `required`, bấm `Lưu cài đặt` hiện Toast `"Đã lưu cài đặt cửa hàng thành công!"`).
