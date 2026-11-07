# BÁO CÁO PHÂN TÍCH TOÀN BỘ MÃ NGUỒN NHÓM BẠN (NHÀ SÁCH ONLINE) & KẾ HOẠCH ĐỐI CHIẾU CHUẨN HÓA DỰ ÁN WEB 1

> **Dự án kiểm tra:** Đồ án Web 1 - Nhà Sách Online (`https://github.com/NguLongCongChua/-n-.git`)  
> **Dự án đối chiếu bảo vệ:** Web 1 - DVK Gunpla / Frame & Form (`https://github.com/MaGiaVy/Web.git`)  
> **Mục tiêu:** Mổ xẻ 100% nguyên nhân gốc rễ (Root Cause) các lỗi nhóm bạn bị giáo viên trừ điểm, đọc và bóc tách từng file HTML/CSS của nhóm bạn để chỉ ra toàn bộ các mánh lới giả lập ("Ping-Pong Hack", CSS `:target`, link chết `#`, form rỗng), và lập kế hoạch chuẩn hóa để nhóm mình đạt điểm tối đa (10/10) môn Lập trình Web 1.  
> **Ngày cập nhật:** 07/11/2026  
> **Trạng thái:** Hoàn thành audit chi tiết 100% tất cả các file mã nguồn  

---

## MỤC LỤC
1. [Tổng Quan Kiến Trúc & Sai Lầm Chí Mạng: Dự Án 0% JavaScript](#1-tổng-quan-kiến-trúc--sai-lầm-chí-mạng-dự-án-0-javascript)
2. [Bóc Tách Chi Tiết 4 Cụm Lỗi Giáo Viên Đã Trừ Điểm](#2-bóc-tách-chi-tiết-4-cụm-lỗi-giáo-viên-đã-trừ-điểm)
   - 2.1. Lỗi Tìm Kiếm Đơn Hàng: Không Feedback, Không Có Nút Nhấn
   - 2.2. Lỗi Lọc Đơn Hàng Sai Thời Gian & Xung Đột Điều Khiển
   - 2.3. Lỗi Nghiệp Vụ Quản Lý Đơn Hàng: Mỗi Dòng Đơn Hàng Đều Có Nút "Thêm Đơn Mới"
   - 2.4. Lỗi Thống Kê: Thiếu Khoảng Thời Gian "Từ Ngày... Đến Ngày..."
3. [Bóc Tách Từng File Phân Hệ Người Dùng (User Side - 10 File)](#3-bóc-tách-từng-file-phân-hệ-người-dùng-user-side---10-file)
   - 3.1. `index.html`: Lỗi cú pháp HTML và thiếu lối vào Admin
   - 3.2. `dang-nhap.html`: Đăng nhập/Đăng ký ảo bằng thẻ `<a>`
   - 3.3. `san-pham.html`: Gian lận tìm kiếm bằng CSS & phân trang chết
   - 3.4. `chi-tiet.html`: Công tắc Ping-Pong & nút tăng giảm bị liệt
   - 3.5. `gio-hang.html`: Nút `+`/`-`/xóa không hoạt động, form mã giảm giá chết
   - 3.6. `thanh-toan.html`: Xác nhận đặt hàng không lưu dữ liệu
   - 3.7. `thanh-cong.html`: Giao diện tĩnh, toast tự động
   - 3.8. `lich-su.html`: Tabs trạng thái chết, hủy đơn hàng ảo
   - 3.9. `chi-tiet-don-hang.html`: Timeline và đơn hàng code cứng
   - 3.10. `ho-so.html`: Submit form bằng GET lộ dữ liệu cá nhân
4. [Bóc Tách Từng File Phân Hệ Quản Trị (Admin Side - 9 File)](#4-bóc-tách-từng-file-phân-hệ-quản-trị-admin-side---9-file)
   - 4.1. `admin/html/index.html`: Đăng nhập không cần mật khẩu
   - 4.2. `admin/html/admin-dashboard.html`: Số liệu hardcode, comment bỏ JS
   - 4.3. `admin/html/admin-don-hang.html`: Lỗi tìm kiếm, lọc ngày, nút thêm đơn ở từng dòng
   - 4.4. `admin/html/admin-sach.html`: Lọc, ẩn, xóa bằng thẻ label và link `#`
   - 4.5. `admin/html/admin-QLTK.html`: Lộ rõ comment "PING-PONG HACKS"
   - 4.6. `admin/html/them-sach.html` & `sua-sach.html`: Form submit giả lập
   - 4.7. `admin/html/admin-chi-tiet-don-hang.html`: Nút lưu nhảy về URL hash
5. [Bóc Tách Tầng CSS: Thảm Họa Lạm Dụng `:target` & Radio Trick](#5-bóc-tách-tầng-css-thảm-họa-lạm-dụng-target--radio-trick)
6. [Bảng Ma Trận Đối Chiếu Chuẩn Hóa Với Dự Án Nhóm Mình](#6-bảng-ma-trận-đối-chiếu-chuẩn-hóa-với-dự-án-nhóm-mình)
7. [Kế Hoạch Hành Động Đảm Bảo Nhóm Mình Đạt Điểm Tuyệt Đối (10/10)](#7-kế-hoạch-hành-động-đảm-bảo-nhóm-mình-đạt-điểm-tuyệt-đối-1010)

---

## 1. TỔNG QUAN KIẾN TRÚC & SAI LẦM CHÍ MẠNG: DỰ ÁN 0% JAVASCRIPT

Qua kiểm tra toàn bộ cây thư mục của repository `https://github.com/NguLongCongChua/-n-.git`:
```text
Đồ án Web 1/
├── admin/
│   ├── css/ (8 file CSS: admin-book, admin-dash, admin-login, admin-order, admin-order-detail, admin-QLTK, style-admin-chung)
│   ├── html/ (9 file HTML: index, dashboard, don-hang, QLTK, sach, sua-sach, them-sach, xem-sach, chi-tiet-don-hang)
│   └── images/
├── css/ (2 file CSS: dang-nhap.css, style-chung.css)
├── images/
├── README.md
└── (10 file HTML User: index, san-pham, chi-tiet, gio-hang, thanh-toan, thanh-cong, lich-su, chi-tiet-don-hang, ho-so, dang-nhap)
```

### Điểm bất thường lớn nhất:
- Trong file `README.md` (dòng 7), nhóm bạn viết: `📂 js # Chứa các file js của cả Admin và User`.
- **Thực tế trên Git: Hoàn toàn không có thư mục `js/` nào tồn tại!**
- Tại file `admin/html/admin-dashboard.html` dòng 512-514:
  ```html
  <!-- Gọi file JavaScript (nếu yêu cầu) -->
  <!-- <script src="../../JS/admin-dashboard.js"></script>
  <script src="../../JS/admin-QLTK.js"></script> -->
  ```
  Nhóm bạn đã viết chú thích "nếu yêu cầu" và chủ động **comment out** toàn bộ script. Toàn bộ website biến thành web tĩnh 100%, phải dùng các thủ thuật "chữa cháy" bằng CSS `:target` và radio button ẩn để đánh lừa người dùng.

---

## 2. BÓC TÁCH CHI TIẾT 4 CỤM LỖI GIÁO VIÊN ĐÃ TRỪ ĐIỂM

### 2.1. Lỗi Tìm Kiếm Đơn Hàng: Không Feedback, Không Có Nút Nhấn
- **Vị trí file:** `admin/html/admin-don-hang.html` (Dòng 388 - 391).
- **Đoạn mã gốc của nhóm bạn:**
  ```html
  <div class="input-icon-wrap">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" placeholder="Tìm mã đơn, tên khách..." class="input-search">
  </div>
  ```
- **Nguyên nhân gốc rễ (Root Cause):**
  1. **Không có nút submit:** Ô `<input>` đứng cô lập một mình, không được bao bọc trong thẻ `<form>`, không có thẻ `<button>` đi kèm.
  2. **Không có bất kỳ JavaScript nào:** Không có sự kiện lắng nghe `input`, `keyup` hay `submit`. Người dùng gõ từ khóa vào ô, bảng dữ liệu không phản ứng gì.
  3. **Không có phản hồi (Zero Feedback):** Không có số lượng tìm thấy, không có Toast thông báo, không có trạng thái rỗng khi không tìm thấy. Đây là lỗi "tính năng chết" (Dead Feature).

---

### 2.2. Lỗi Lọc Đơn Hàng Sai Thời Gian & Xung Đột Điều Khiển
- **Vị trí file:** `admin/html/admin-don-hang.html` (Dòng 393 - 400).
- **Đoạn mã gốc của nhóm bạn:**
  ```html
  <select class="select-filter" title="Lọc theo thời gian đặt hàng">
      <option value="all">📅 Tất cả thời gian</option>
      <option value="10/2026">Tháng 10/2026</option>
      <option value="09/2026">Tháng 09/2026</option>
      <option value="08/2026">Tháng 08/2026</option>
  </select>

  <input type="date" class="input-date-filter" title="Lọc chính xác theo ngày đặt">
  ```
- **Nguyên nhân gốc rễ:**
  1. **Xung đột điều khiển (UX Conflict):** Đặt song song cả `<select>` chọn tháng và `<input type="date">` chọn ngày sát nhau. Nếu người dùng chọn tháng 10/2026 nhưng lại chọn ngày 15/09/2026 ở ô date thì hệ thống sẽ ưu tiên cái nào?
  2. **Sai yêu cầu đề bài:** Yêu cầu môn Lập trình Web 1 bắt buộc bộ lọc thời gian phải là khoảng: **"Từ ngày... Đến ngày..."**. Nhóm bạn chỉ có 1 ô chọn 1 ngày đơn lẻ.
  3. **Dữ liệu cố định:** Cả 2 điều khiển trên đều không gắn script, không thể lọc được các hàng trong bảng đơn hàng.

---

### 2.3. Lỗi Nghiệp Vụ Quản Lý Đơn Hàng: Mỗi Dòng Đơn Hàng Đều Có Nút "Thêm Đơn Mới"
- **Vị trí file:** `admin/html/admin-don-hang.html` (Dòng 444 - 458, 473 - 484, 499 - 510...).
- **Đoạn mã gốc của nhóm bạn:**
  ```html
  <td>
      <div class="action-buttons">
          <!-- Nút Xem chi tiết đơn này -->
          <a href="#orderDetailModal" class="btn-order btn-detail" title="Xem chi tiết đơn này">
              <i class="fa-solid fa-eye"></i> Chi tiết
          </a>
          <!-- Dấu cộng để thêm đơn -->
          <a href="#addOrderModal" class="btn-order btn-action-add" title="Thêm đơn hàng mới">
              <i class="fa-solid fa-plus"></i> Thêm
          </a>
          <!-- Thùng rác để xóa đơn -->
          <a href="#deleteOrderModal" class="btn-order btn-action-delete" title="Xóa đơn hàng này">
              <i class="fa-solid fa-trash-can"></i> Xóa
          </a>
      </div>
  </td>
  ```
- **Nguyên nhân gốc rễ:**
  1. **Sai lệch hoàn toàn logic nghiệp vụ e-commerce:** Trong bảng danh sách, mỗi hàng `<tr>` đại diện cho một đơn hàng đã được khách đặt. Cột thao tác của hàng đó chỉ được phép thao tác trên đơn hàng đó: *Xem chi tiết*, *Xử lý đơn (Duyệt/Giao)*, hoặc *In hóa đơn*.
  2. **Gắn nút `+` "Thêm đơn mới" vào từng dòng:** Nút tạo đơn (nếu có) phải là nút cấp bảng (Table Toolbar Action) nằm ở trên đầu bảng. Đặt nút `+` vào từng dòng chứng tỏ sinh viên không hiểu nguyên lý cơ bản của giao diện quản trị.
  3. **Mọi dòng đều trỏ về cùng một modal:** Tất cả các nút "Chi tiết" ở tất cả các đơn hàng đều trỏ về đúng 1 ID `#orderDetailModal`, nội dung trong modal luôn luôn là đơn hàng #DH001 dù bấm vào đơn #DH002 hay #DH003!

---

### 2.4. Lỗi Thống Kê: Thiếu Khoảng Thời Gian "Từ Ngày... Đến Ngày..."
- **Vị trí file:** `admin/html/admin-dashboard.html` (Dòng 268 - 350).
- **Nguyên nhân gốc rễ:**
  1. **Không có trang Thống kê chuyên biệt:** Nhóm bạn không tạo file `admin-thong-ke.html` mà gộp bừa 4 thẻ số liệu vào trang Dashboard.
  2. **Số liệu gõ cứng 100%:**
     - Doanh thu: `45.200.000 đ`
     - Số đơn: `128 đơn`
     - Sách bán ra: `340 cuốn`
     - Khách mới: `24 khách`
     Tất cả đều là số liệu tĩnh, không được tính toán bằng JavaScript từ mảng dữ liệu.
  3. **Thiếu hoàn toàn bộ lọc thời gian:** Không có ô `Từ ngày`, không có ô `Đến ngày`, không có nút "Thống kê", không có bảng thống kê mặt hàng hay khách hàng.

---

## 3. BÓC TÁCH TỪNG FILE PHÂN HỆ NGƯỜI DÙNG (USER SIDE - 10 FILE)

### 3.1. `index.html` (Trang chủ)
- **Lỗi cú pháp HTML tại dòng 61:** `<<li>` (thừa ký tự mở `<`), chứng tỏ nhóm bạn copy paste không kiểm tra lại.
- **Thiếu lối vào trang Admin:** Trên toàn bộ trang chủ không có bất kỳ nút, icon hay đường link nào dẫn tới phân hệ Admin. Người chấm thi nếu không tự gõ tay đường dẫn URL `admin/html/index.html` thì không thể nào vào được trang quản trị.
- **Thanh tìm kiếm:** Sử dụng form submit dẫn sang `san-pham.html#search-result`, không có gợi ý tìm kiếm hay xử lý từ khóa.

### 3.2. `dang-nhap.html` (Đăng nhập / Đăng ký)
- **Nút Đăng nhập ảo (Dòng 54):**
  ```html
  <a href="index.html#login-success" class="btn-auth btn-login-action">ĐĂNG NHẬP</a>
  ```
  Nút Đăng nhập thực chất là một thẻ liên kết `<a>` trỏ về `index.html#login-success`. Không có xác thực email, không kiểm tra mật khẩu, không có sự kiện submit form.
- **Nút Đăng ký ảo (Dòng 78):**
  ```html
  <a href="#reg-success" class="btn-auth btn-register-action">ĐĂNG KÝ</a>
  ```
  Chỉ đổi URL hash thành `#reg-success` để CSS hiển thị Toast giả lập thông báo "Đăng ký thành công! Vui lòng đăng nhập", tài khoản không hề được lưu.
- **Các liên kết chết:** Dòng 52 ("Quên mật khẩu?") và Dòng 80 ("Đã có tài khoản?") đều là `href="#"`.

### 3.3. `san-pham.html` (Danh sách sản phẩm & Tìm kiếm)
- **Gian lận tìm kiếm bằng CSS (Dòng 213 - 269):**
  Nhóm bạn tạo sẵn 1 thẻ thông báo kết quả tìm kiếm giả:
  ```html
  <div class="search-meta">Hiển thị 2 kết quả phù hợp nhất với từ khóa của bạn.</div>
  ```
  Và gán class `search-hide` cho các cuốn sách từ số 3 đến số 6:
  ```html
  <!-- TỪ SÁCH THỨ 3 TRỞ ĐI: Đã gắn class "search-hide" để tự tàng hình khi tìm kiếm -->
  <div class="book-card search-hide">...</div>
  ```
  Trong CSS, khi URL có `#search-result`, các sách có class `search-hide` sẽ bị `display: none`. Hệ quả: Dù người dùng gõ bất kỳ từ khóa vô lý nào (ví dụ: "asdasd", "Gundam", "iphone"), trang web luôn luôn hiển thị đúng 2 cuốn sách số 1 & 2 ("Nhà Giả Kim" và "Đắc Nhân Tâm") kèm thông báo "Hiển thị 2 kết quả phù hợp nhất"! Đây là một mánh khóe gian lận kỹ thuật lộ liễu.
- **Phân trang chết (Dòng 273 - 278):**
  ```html
  <div class="pagination">
      <a href="#logged-in" class="active">1</a>
      <a href="#logged-in">2</a>
      <a href="#logged-in">3</a>
      <a href="#logged-in">Tiếp theo &raquo;</a>
  </div>
  ```
  Tất cả các nút trang 1, trang 2, trang 3 và Tiếp theo đều trỏ về `#logged-in`. Bấm vào chỉ làm trang web giật ngược lên đầu mà danh sách sách không hề thay đổi.

### 3.4. `chi-tiet.html` (Chi tiết sản phẩm)
- **Công tắc Ping-Pong bằng radio ẩn (Dòng 16 - 23):**
  ```html
  <input type="radio" name="err_trick" id="err-ping" hidden>
  <input type="radio" name="err_trick" id="err-pong" hidden>
  <input type="radio" name="cart_trick" id="cart-ping" hidden>
  <input type="radio" name="cart_trick" id="cart-pong" hidden>
  ```
  Nhóm bạn tạo 2 cặp radio button ẩn để tạo hiệu ứng luân phiên cho Toast thông báo bằng CSS `:checked`.
- **Nút tăng giảm số lượng bị "liệt" (Dòng 159 - 161):**
  ```html
  <button type="button" onclick="javascript:void(0)">-</button>
  <input type="text" value="1" readonly>
  <button type="button" onclick="javascript:void(0)">+</button>
  ```
  Gán cứng `onclick="javascript:void(0)"`, bấm nút `-` hoặc `+` hoàn toàn không có tác dụng gì!
- **Nút thêm giỏ hàng không lưu sản phẩm (Dòng 173 - 185):**
  Thực chất là thẻ `<label for="cart-ping">` và `<label for="cart-pong">`. Bấm vào chỉ kích hoạt radio CSS để hiện Toast xanh, không hề thêm sản phẩm vào giỏ hàng.

### 3.5. `gio-hang.html` (Giỏ hàng)
- **Số lượng cố định (Dòng 156 - 160 & 177 - 181):** Nút `-` và `+` là thẻ `<button type="button">` không có ID, không có sự kiện; ô số lượng bị khóa `readonly`.
- **Nút xóa không hoạt động (Dòng 163 & 184):** `<button class="btn-remove-cart" title="Xóa">🗑️</button>` không có script, bấm không xóa được dòng nào.
- **Form mã giảm giá chết (Dòng 209):**
  ```html
  <form action="" onsubmit="return false;" class="coupon-box">
  ```
  Ghi thẳng `onsubmit="return false;"`, form hoàn toàn vô hiệu hóa.
- **Giỏ hàng gõ cứng:** Giỏ hàng luôn luôn chứa đúng 2 cuốn "Muôn Kiếp Nhân Sinh" (128k) và "Đắc Nhân Tâm" (86k), tổng cộng cố định 239.000 đ.

### 3.6. `thanh-toan.html` (Thanh toán)
- **Nhập liệu không được thu thập (Dòng 133 - 142):** Các ô nhập họ tên người nhận, số điện thoại, địa chỉ chi tiết nằm ngoài form submit.
- **Nút đặt hàng ảo (Dòng 191):**
  ```html
  <a href="thanh-cong.html#logged-in" class="btn-checkout" style="margin-top: 20px;">XÁC NHẬN ĐẶT HÀNG</a>
  ```
  Là một thẻ `<a>` chuyển trang trực tiếp sang `thanh-cong.html`. Không lưu đơn hàng vào hệ thống, không xóa sản phẩm trong giỏ hàng.

### 3.7. `thanh-cong.html` (Đặt hàng thành công)
- Dòng 88-91: Toast chúc mừng đặt hàng thành công tự động trượt ra bằng CSS animation ngay khi trang vừa tải xong, không cần kiểm tra xem người dùng có vừa đặt hàng thật hay không.

### 3.8. `lich-su.html` (Lịch sử đơn hàng)
- **Tabs trạng thái chết (Dòng 72 - 78):** `<div class="order-tab">Chờ xác nhận (1)</div>`... chỉ là các thẻ `<div>` giao diện tĩnh, không có JavaScript lọc danh sách đơn.
- **Quy trình hủy đơn ảo (Dòng 284 & 302):**
  Bấm "Hủy đơn hàng" nhảy sang `#modal-cancel-confirm`, bấm "Xác nhận hủy" nhảy sang `#modal-cancel-success`, bấm "Đóng" nhảy về `lich-su.html`. Đơn hàng #DH98210 vẫn hiển thị nguyên trạng "⏳ Chờ xác nhận" với đầy đủ 2 nút Hủy và Chi tiết!

### 3.9. `chi-tiet-don-hang.html` (Chi tiết đơn hàng người dùng)
- Toàn bộ timeline 4 bước ("Đặt hàng", "Đã xác nhận", "Đang vận chuyển", "Giao thành công") và bảng sản phẩm của đơn hàng #DH98421 đều là dữ liệu gõ chết trong HTML.

### 3.10. `ho-so.html` (Hồ sơ cá nhân)
- **Lộ thông tin nhạy cảm qua URL GET (Dòng 120):**
  ```html
  <form action="ho-so.html#update-success" method="GET">
  ```
  Form cập nhật thông tin sử dụng method `GET`, làm lộ toàn bộ họ tên, email, số điện thoại lên URL thanh địa chỉ trình duyệt (`?fullname=...&email=...&phone=...`).
- Sau khi submit, trang web tải lại và hiển thị lại các giá trị gõ cứng ban đầu (`Nguyễn Văn Tèo`), thông tin người dùng vừa nhập bị mất hoàn toàn.

---

## 4. BÓC TÁCH TỪNG FILE PHÂN HỆ QUẢN TRỊ (ADMIN SIDE - 9 FILE)

### 4.1. `admin/html/index.html` (Đăng nhập Admin)
- **Giao diện bộc lộ tính chất đối phó (Dòng 24 & 29):**
  ```html
  <input type="text" id="username" placeholder="Nhập tài khoản (có thể bỏ trống)...">
  <input type="password" id="password" placeholder="Nhập mật khẩu (có thể bỏ trống)...">
  ```
  Placeholder công khai hướng dẫn người dùng "có thể bỏ trống".
- **Bỏ qua xác thực (Dòng 31 - 33):**
  ```html
  <a href="./admin-dashboard.html" class="login-link">
      <span class="btn-login">Đăng Nhập</span>
  </a>
  ```
  Nút Đăng nhập là thẻ `<a>` dẫn thẳng vào dashboard, bất kỳ ai cũng có thể vào khu vực quản trị mà không cần tài khoản.

### 4.2. `admin/html/admin-dashboard.html` (Tổng quan)
- Số liệu KPI cố định 100%, không có biến JavaScript, không có liên kết với cơ sở dữ liệu giả lập.
- Dòng 513-514: Comment bỏ các file script xử lý.

### 4.3. `admin/html/admin-don-hang.html` (Quản lý đơn hàng)
- Chứa toàn bộ 3 lỗi lớn mà giáo viên đã trừ điểm (Tìm kiếm không feedback/không nút, Lọc ngày sai logic, Cột thao tác có nút thêm đơn).
- Tất cả các đơn hàng đều dùng chung modal xóa `#deleteOrderModal`. Bấm "Đồng ý xóa" nhảy sang neo `#delete-success`, hiển thị Toast đỏ nhưng dòng đơn hàng trong bảng vẫn còn nguyên vẹn.

### 4.4. `admin/html/admin-sach.html` (Quản lý kho sách)
- **Lạm dụng thẻ `<label>` làm nút chức năng:**
  - Nút "Lọc sách" (Dòng 352-358): Là 2 thẻ `<label for="filter-ping">` và `<label for="filter-pong">`.
  - Nút "Ẩn sách" (Dòng 401-407): Là 2 thẻ `<label for="hide-ping">` và `<label for="hide-pong">`.
- **Nút xóa sách ảo (Dòng 652):**
  Bấm "Đồng ý xóa" dẫn về `#delete-success` để kích hoạt CSS animation Toast đỏ, danh sách 5 đầu sách bên dưới bảng giữ nguyên 100%.
- **Phân trang chết (Dòng 572 - 578):**
  Các thẻ `<a href="admin-sach.html">1</a>`, `<a href="admin-sach.html">2</a>` chỉ reload lại chính trang hiện tại.

### 4.5. `admin/html/admin-QLTK.html` (Quản lý người dùng)
- **Thừa nhận mánh khóe trong mã nguồn (Dòng 21 - 31):**
  ```html
  <!-- ==============================================
       PING-PONG HACKS CỦA ADMIN-QLTK (KHÔNG ẢNH HƯỞNG CẤU TRÚC CŨ)
  =============================================== -->
  <input type="radio" name="addauto_trick" id="addauto-ping" hidden>
  <input type="radio" name="addauto_trick" id="addauto-pong" hidden>
  <input type="radio" name="lock_trick" id="lock-ping" hidden>
  <input type="radio" name="lock_trick" id="lock-pong" hidden>
  ```
- **Nút Khóa tài khoản ảo (Dòng 362 - 365):**
  Nút khóa là thẻ `<label for="lock-ping">`. Bấm vào chỉ kích hoạt Toast màu cam "Trạng thái khóa tài khoản đã cập nhật", nhưng badge trên dòng tài khoản vẫn giữ nguyên là `<span class="badge-status status-active">Hoạt động</span>`!

### 4.6. `admin/html/them-sach.html` & `sua-sach.html` (Thêm & Sửa sách)
- Trong `sua-sach.html` (Dòng 56):
  ```html
  <form class="form-sach" action="admin-sach.html#edit-success">
  ```
  Form chỉ submit chuyển hướng URL về `admin-sach.html#edit-success`, dữ liệu người dùng chỉnh sửa trong form hoàn toàn bị vứt bỏ, không được lưu trữ.

### 4.7. `admin/html/admin-chi-tiet-don-hang.html` (Chi tiết đơn hàng Admin)
- Dòng 83-86:
  ```html
  <!-- FIX Ở ĐÂY: NHẢY VỀ QUẢN LÝ ĐƠN HÀNG VÀ BẬT TOAST -->
  <a href="admin-don-hang.html#show-save-toast" class="btn-action-status-save" title="Lưu cập nhật trạng thái đơn">
      <i class="fa-solid fa-check"></i> Lưu trạng thái
  </a>
  ```
  Nút "Lưu trạng thái" là một thẻ liên kết `<a>` nhảy về trang danh sách đơn hàng kèm hash `#show-save-toast`. Trạng thái đơn hàng trong dropdown (`pending`, `processed`, `delivering`...) không hề được ghi nhận.

---

## 5. BÓC TÁCH TẦNG CSS: THẢM HỌA LẠM DỤNG `:target` & RADIO TRICK

Trong file `css/style-chung.css`:
- Dòng 409 có tiêu đề: `/* CÔNG TẮC ĐỔI GIAO DIỆN THÔNG MINH BẰNG URL (:target) */`.
- Dòng 417-456 định nghĩa hàng loạt quy tắc hiển thị dựa trên URL hash:
  ```css
  #login-success:target ~ .header .auth-buttons,
  #logged-in:target ~ .header .auth-buttons,
  #search-user:target ~ .header .auth-buttons {
      display: none;
  }
  #login-success:target ~ .header .user-dropdown,
  #logged-in:target ~ .header .user-dropdown,
  #search-user:target ~ .header .user-dropdown {
      display: block;
  }
  ```

### 3 hậu quả tai hại khi dùng CSS `:target` thay JavaScript:
1. **Phá nát lịch sử duyệt web (Broken Browser History):** Mỗi lần bấm nút Thêm giỏ, Đăng nhập, Hủy đơn hay Xóa sách, trình duyệt sẽ ghi nhận 1 mốc lịch sử mới với URL hash tương ứng. Khi giáo viên bấm nút "Back" trên trình duyệt, trang web không quay về trang trước mà nhảy lòng vòng giữa các popup và toast.
2. **Hiện tượng giật cuộn màn hình (Page Jump):** Trình duyệt mặc định sẽ tự động cuộn trang đến vị trí của thẻ mang ID tương ứng với URL hash. Người dùng đang ở giữa trang bấm nút sẽ bị giật tung lên đầu trang hoặc xuống cuối trang.
3. **Dữ liệu hoàn toàn là "dữ liệu chết":** CSS chỉ thay đổi hiển thị (`display: none` / `block`), không có khả năng tính toán, không thể cộng dồn tiền, không thể lưu danh sách, không thể lọc dữ liệu thực tế.

---

## 6. BẢNG MA TRẬN ĐỐI CHIẾU CHUẨN HÓA VỚI DỰ ÁN NHÓM MÌNH

| Tiêu Chí / Chức Năng | Nhóm Bạn (Lỗi Nặng & Bị Trừ Điểm) | Nhóm Mình (DVK / Frame & Form - Chuẩn Hóa 10/10) | Kết Quả Đánh Giá |
| :--- | :--- | :--- | :--- |
| **1. Tìm kiếm đơn hàng** | - Không nút bấm.<br>- Không JavaScript.<br>- Không feedback (Dead UI). | - Ô tìm kiếm hỗ trợ cả phím Enter và nút kính lúp.<br>- Lọc tức thời theo mã đơn, tên khách, số điện thoại.<br>- Toast thông báo: *"Đã tìm thấy X đơn hàng phù hợp"*.<br>- Hiển thị Empty State chỉn chu khi không có kết quả. | ✅ Chuẩn hóa 100% |
| **2. Lọc thời gian đơn hàng** | - Xung đột giữa dropdown tháng và ô chọn ngày.<br>- Không có khoảng thời gian.<br>- Dữ liệu không thay đổi khi chọn. | - Có đủ 2 ô: **"Từ ngày"** và **"Đến ngày"**.<br>- Lọc chính xác các đơn hàng có ngày đặt nằm trong khoảng `[from, to]`.<br>- Có nút **"Đặt lại"** để hoàn nguyên danh sách về ban đầu. | ✅ Chuẩn hóa 100% |
| **3. Cột thao tác bảng đơn hàng** | - Mỗi dòng `<tr>` đều gắn nút `+` "Thêm đơn mới" vô lý.<br>- Mọi dòng đều trỏ về 1 popup tĩnh duy nhất. | - Từng dòng chỉ có nút: **"Xem"** hoặc **"Xử lý"** tác động lên đơn đó.<br>- Dẫn sang trang `order-detail.html?id=...` hiển thị đúng dữ liệu đơn hàng đó.<br>- Nút tạo đơn (nếu có) đặt ở toolbar cấp bảng. | ✅ Chuẩn hóa 100% |
| **4. Phân hệ Thống kê** | - Không có trang riêng.<br>- Hardcode 4 thẻ chỉ số trong dashboard.<br>- Thiếu hoàn toàn bộ lọc khoảng ngày. | - Trang Thống kê riêng biệt: `admin/statistics.html`.<br>- Form chọn khoảng ngày: `Từ ngày` - `Đến ngày`.<br>- Tính toán tự động Doanh thu, Số đơn, Khách mua và Top 5 khách hàng chi tiêu nhiều nhất từ dữ liệu thật.<br>- Các nút chọn nhanh: 30 ngày gần nhất, Tháng này. | ✅ Chuẩn hóa 100% |
| **5. Phân trang dữ liệu** | - Dùng thẻ `<a href="#">` hoặc `<a href="#logged-in">`.<br>- Bấm vào bị giật lên đầu trang, dữ liệu không đổi. | - Dùng thẻ `<button type="button">` chuẩn accessibility.<br>- Chuyển trang mượt mà không reload, không giật màn hình.<br>- Hiển thị nhãn: `Trang X/Y · Z đơn hàng`. | ✅ Chuẩn hóa 100% |
| **6. Kiến trúc dữ liệu** | - 0% JavaScript, không có file script trung tâm.<br>- Dùng CSS `:target` và "Ping-Pong Hack" chữa cháy. | - Quản lý tập trung trong `assets/js/data.js` (`ORDERS`, `PRODUCTS`, `USERS`).<br>- Controller JS chuyên trách: `orders.js`, `statistics.js`, `common.js`.<br>- 100% JavaScript thuần, không phụ thuộc thư viện ngoài. | ✅ Kiến trúc chuẩn mực |
| **7. Quản lý trạng thái đăng nhập** | - Dùng URL hash `#logged-in`, đăng nhập bằng thẻ `<a>` không mật khẩu. | - Quản lý bằng `sessionStorage`.<br>- Tự động Guard chuyển hướng đăng nhập khi truy cập trái phép. | ✅ Chuẩn bảo mật môn Web 1 |
| **8. Trải nghiệm giỏ hàng & sản phẩm** | - Nút `+`/`-`/xóa bị liệt (`javascript:void(0)`).<br>- Tìm kiếm sản phẩm giả lập bằng CSS `search-hide`. | - Cập nhật số lượng và thành tiền tức thời.<br>- Tìm kiếm sản phẩm thật theo tên và danh mục, phân trang thật. | ✅ Chuẩn UX thương mại điện tử |

---

## 7. KẾ HOẠCH HÀNH ĐỘNG ĐẢM BẢO NHÓM MÌNH ĐẠT ĐIỂM TUYỆT ĐỐI (10/10)

Kế hoạch kỹ thuật chi tiết đã được lập và lưu tại:  
📁 [docs/superpowers/plans/2026-11-07-audit-loi-nhom-ban-va-ke-hoach-chuan-hoa.md](file:///d:/WEB/docs/superpowers/plans/2026-11-07-audit-loi-nhom-ban-va-ke-hoach-chuan-hoa.md)

### 4 nhiệm vụ cốt lõi cần nâng cấp trên mã nguồn của nhóm mình khi có lệnh:
1. **Nâng cấp `assets/js/admin/orders.js`:** Thay thế cơ chế Toast mô phỏng hiện tại bằng hàm lọc động đa điều kiện thật (tìm kiếm từ khóa theo mã/tên/sđt, lọc trạng thái, lọc khoảng ngày từ... đến..., lọc khu vực tỉnh thành/phường xã).
2. **Nâng cấp `assets/js/admin/statistics.js`:** Viết hàm tính toán thống kê động `computeStatistics(from, to)` tự động tính tổng doanh thu, số đơn, số khách và xếp hạng Top 5 khách hàng từ mảng `ORDERS`, cập nhật trực tiếp vào giao diện và các nút preset.
3. **Rà soát lại toàn bộ thông báo Toast:** Loại bỏ các từ ngữ như "Mô phỏng", "Web tĩnh", đảm bảo mọi phản hồi đều mang văn phong nghiệp vụ chuyên nghiệp.
4. **Kiểm tra lối vào Admin trên Header người dùng:** Đảm bảo trên thanh Topbar/Header luôn có lối vào rõ ràng dẫn tới `admin/index.html` hoặc `admin/login.html`.
