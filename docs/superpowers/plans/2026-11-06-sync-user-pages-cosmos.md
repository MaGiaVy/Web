# Đồng Bộ Giao Diện Vũ Trụ Cho Toàn Bộ Trang Khách Hàng (User Pages Sync)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Đồng bộ hóa giao diện vũ trụ Gundam (Full Galaxy Cosmos) từ trang chủ sang tất cả 11 trang con của phân hệ khách hàng (`pages/*.html`), đảm bảo các khối nội dung, thẻ sản phẩm, bảng biểu, biểu mẫu và phân trang đều sử dụng phong cách Titanium Pods chống chìm tuyệt đối, giữ nguyên 100% logic và cấu trúc web tĩnh của môn Lập trình Web 1.

**Architecture:** Sử dụng lớp CSS cha `.cosmos-universe-body` đã khai báo ở trang chủ, mở rộng hệ thống quy tắc CSS đặc tả trong `assets/css/style.css` để định hình lại toàn bộ các thành phần chung (`.card`, `.breadcrumb`, `.page-title`, `.table`, `.summary`, `.tabs`, `.select`, `.input`, `.pagination`) trên các trang con. Bổ sung lớp thiên thể vũ trụ (`.celestial-orbit-overlay`) vào phần thân `<body>` của tất cả 11 file HTML thuộc thư mục `pages/`.

**Tech Stack:** Pure HTML5, Vanilla CSS3 (CSS Variables, Flexbox/Grid, Backdrop Filter, Radial Gradients, KaTeX/Chakra Petch typography), Vanilla JavaScript ES6 (không dùng thư viện ngoài).

**Spec:** `DESIGN.md` (Đặc tả thiết kế Đại Thiên Hà Vũ Trụ Gundam).

## Global Constraints
- **Nhánh Git:** Toàn bộ công việc chỉ thực hiện và push trên nhánh `user-ui`. Tuyệt đối không commit hoặc push sang nhánh `main`.
- **Ràng buộc học thuật môn Web 1:** Giữ nguyên 100% logic web tĩnh (`assets/js/data.js`, `assets/js/*.js`), các ID, class chức năng, sự kiện JavaScript, không đổi sang fetch động hay backend.
- **Phân hệ Admin:** Tuyệt đối không áp dụng giao diện vũ trụ lên thư mục `admin/` (`admin/*.html`).
- **Chống chìm (Anti-Sink):** Toàn bộ thẻ `.card`, bảng `.table`, khung thông tin trên nền vũ trụ phải có nền hợp kim titan đặc `#070d20` hoặc `#080e22` độ mờ 100%, viền phản quang Cyan `rgba(56, 189, 248, 0.35)` và bóng đổ sâu tách lớp.
- **Tiêu chuẩn tương phản:** Mọi chữ hiển thị trên nền vũ trụ tối phải đạt tối thiểu chuẩn WCAG AA / AAA (văn bản thường `#cbd5e1`, tiêu đề `#ffffff`, điểm nhấn Neon `#38bdf8`, giá bán `#f43f5e`).

## Review Focus
1. **Trang sản phẩm (`pages/products.html`):** Thanh sắp xếp/lọc (`.result-bar`), bộ lọc phân loại, thanh phân trang (`#pagination`) hiển thị sắc nét trên nền vũ trụ, không bị chìm hay vỡ phông.
2. **Trang chi tiết sản phẩm (`pages/product.html`):** Khung ảnh mô hình có vòm spotlight, bảng thông số kỹ thuật (`.pd-specs`), cụm chọn số lượng (`.qty`), các tab mô tả (`.tabs`) chuyển trạng thái sáng rõ.
3. **Trang giỏ hàng & thanh toán (`pages/cart.html`, `pages/checkout.html`):** Bảng danh sách hàng (`.table`), khối tóm tắt đơn hàng (`.summary`), nút Đặt hàng nổi bật rõ ràng, số tiền đọc dễ dàng.
4. **Trang lịch sử đơn & chi tiết đơn (`pages/orders.html`, `pages/order-detail.html`):** Khối thẻ đơn hàng (`.order-card`), các bước trạng thái đơn hàng giữ màu sắc trực quan, chữ không bị tiệp màu nền.
5. **Trang tài khoản, tìm kiếm nâng cao & đăng nhập/đăng ký (`account.html`, `advanced-search.html`, `login.html`, `register.html`):** Biểu mẫu nhập liệu (`.input`, `.select`), các chip gợi ý, khung đăng nhập cân đối giữa màn hình vũ trụ.

---

### Task 1: Mở rộng CSS Vũ Trụ Cho Toàn Bộ Thành Phần Giao Diện Con Trong `assets/css/style.css`

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1.1:** Soạn thảo bộ quy tắc CSS đặc tả cho các khối chung dưới lớp `.cosmos-universe-body`:
  - Tiêu đề trang & điều hướng: `.page-title h1` (trắng neon, font display), `.page-title p` (xám bạc `#94a3b8`), `.breadcrumb` (`#94a3b8`, active `#f8fafc`).
  - Khối Card Titanium Pod: `.cosmos-universe-body .card` (nền đặc `#070d20`, viền Cyan `rgba(56, 189, 248, 0.35)`, bóng đổ sâu `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75)`).
  - Thanh tiêu đề thẻ: `.cosmos-universe-body .card-head` (nền `#0a122c`, viền đáy `rgba(56, 189, 248, 0.25)`, tiêu đề `#ffffff`).
- [ ] **Step 1.2:** Định dạng lại các điều khiển biểu mẫu & thanh công cụ dưới `.cosmos-universe-body`:
  - Ô nhập liệu & lựa chọn: `.cosmos-universe-body .input`, `.cosmos-universe-body .select`, `.cosmos-universe-body .textarea` (nền `#0d152e`, viền `rgba(56, 189, 248, 0.4)`, chữ trắng `#f8fafc`, focus viền `#38bdf8` tỏa sáng neon).
  - Thanh kết quả & sắp xếp: `.cosmos-universe-body .result-bar` (nền `#070d20`, chữ `#cbd5e1`, phân cách Cyan).
  - Chip bộ lọc đang chọn: `.cosmos-universe-body .active-filters .chip` (nền `rgba(56, 189, 248, 0.15)`, viền `#38bdf8`, chữ `#38bdf8`).
- [ ] **Step 1.3:** Định dạng phân trang Mecha Vũ Trụ:
  - `.cosmos-universe-body .pagination button`: nền `#0d152e`, viền `rgba(56, 189, 248, 0.35)`, chữ `#cbd5e1`.
  - `.cosmos-universe-body .pagination button.active`: gradient Neon Cyan-Purple `#38bdf8` -> `#818cf8`, chữ tối `#020617`, phát quang neon.
  - `.cosmos-universe-body .pagination-info`: chữ `#94a3b8`.
- [ ] **Step 1.4:** Định dạng trang Chi tiết sản phẩm (`pages/product.html`):
  - Khung ảnh `.pd-gallery`: vòm sáng Spotlight sau ảnh mô hình.
  - Thông số kỹ thuật `.pd-spec`: ô titan `#0d152e`, nhãn xám `#94a3b8`, giá trị trắng `#ffffff`.
  - Cụm tăng giảm số lượng `.qty`: nền `#0d152e`, viền Cyan, nút tăng giảm hover Cyan.
  - Khối chính sách `.pd-policy`: nền kính mờ vũ trụ `rgba(56, 189, 248, 0.08)`, viền mờ `rgba(56, 189, 248, 0.2)`.
  - Hệ thống Tab `.tabs button`: viền đáy Cyan phát quang khi active.
- [ ] **Step 1.5:** Định dạng trang Giỏ hàng & Thanh toán (`pages/cart.html`, `pages/checkout.html`):
  - Bảng `.table`: dòng tiêu đề xám bạc `#94a3b8`, đường kẻ hàng `rgba(255, 255, 255, 0.1)`, chữ nội dung `#ffffff`.
  - Khối tóm tắt `.summary`: nền `#070d20`, đường nét tính tiền rõ ràng, tổng tiền màu đỏ phát quang `#f43f5e`.
  - Phương thức thanh toán & địa chỉ giao hàng: ô chọn nổi bật với viền Cyan khi chọn.
- [ ] **Step 1.6:** Định dạng trang Đơn hàng, Tài khoản, Tìm kiếm nâng cao & Xác thực (`orders.html`, `order-detail.html`, `account.html`, `advanced-search.html`, `login.html`, `register.html`):
  - Thẻ đơn hàng `.order-card`: phân tách đầu/thân rõ ràng, mã đơn in đậm cơ khí.
  - Menu tài khoản bên trái `.account-sidebar a`: hover & active chuyển sang Cyan phát sáng.
  - Form tìm kiếm nâng cao `.adv-form` & các chip gợi ý `.adv-chip`: nền titan, viền Cyan.
  - Khung đăng nhập / đăng ký `.auth-card`: đặt giữa không gian vũ trụ, viền neon tinh tế.
- [ ] **Step 1.7:** Kiểm tra cú pháp CSS và trailing whitespace bằng `git diff --check`.

---

### Task 2: Cập Nhật 11 File HTML Trong Thư Mục `pages/`

**Files:**
- Modify: `pages/products.html`
- Modify: `pages/product.html`
- Modify: `pages/cart.html`
- Modify: `pages/checkout.html`
- Modify: `pages/order-success.html`
- Modify: `pages/orders.html`
- Modify: `pages/order-detail.html`
- Modify: `pages/account.html`
- Modify: `pages/advanced-search.html`
- Modify: `pages/login.html`
- Modify: `pages/register.html`

- [ ] **Step 2.1:** Thêm `class="cosmos-universe-body"` vào thẻ `<body>` của cả 11 file.
- [ ] **Step 2.2:** Chèn thẻ thiên thể vũ trụ ngay đầu thẻ `<body>` (trước `#site-header`):
  ```html
  <!-- Lớp thiên thể vũ trụ (Mặt Trời, Trái Đất) -->
  <div class="celestial-orbit-overlay" aria-hidden="true">
    <div class="solar-flare-beacon"></div>
    <div class="earth-marble"></div>
  </div>
  ```
- [ ] **Step 2.3:** Kiểm tra đảm bảo không làm xê dịch bất kỳ ID nào như `#site-header`, `#site-footer`, `#product-list`, `#pagination`, v.v.

---

### Task 3: Kiểm Tra Tính Toàn Vẹn & Không Gây Tác Động Phụ (Regression & Visual Verification)

**Files:**
- Verify: `pages/*.html`
- Verify: `admin/*.html` (đảm bảo không bị ảnh hưởng)
- Verify: `assets/js/*.js` (đảm bảo không có lỗi runtime)

- [ ] **Step 3.1:** Chạy cú pháp kiểm tra Node.js cho toàn bộ các file JS trong `assets/js/`.
- [ ] **Step 3.2:** Xác minh giao diện trang quản trị `admin/*.html` vẫn giữ nguyên phong cách quản trị chuẩn, không bị lem CSS vũ trụ.
- [ ] **Step 3.3:** Kiểm tra mã nguồn HTML của 11 file để đảm bảo các thẻ đóng mở nguyên vẹn.
- [ ] **Step 3.4:** Chạy `git diff --check` để đảm bảo sạch sẽ hoàn toàn.

---

### Task 4: Commit và Push Lên Nhánh `user-ui`

**Files:**
- Git repository: `D:\WEB`

- [ ] **Step 4.1:** Kiểm tra trạng thái bằng `git status`.
- [ ] **Step 4.2:** Commit với thông điệp: `feat(ui): synchronize full galaxy cosmic theme across all user pages`.
- [ ] **Step 4.3:** Push commit lên remote `origin/user-ui`.
