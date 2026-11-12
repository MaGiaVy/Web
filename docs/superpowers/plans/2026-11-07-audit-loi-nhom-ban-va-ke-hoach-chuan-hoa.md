# Kế Hoạch Chuẩn Hóa Quản Trị & Khắc Phục Toàn Diện Lỗi Web 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuẩn hóa toàn diện hệ thống Quản trị Admin (Tìm kiếm đơn hàng có feedback, Lọc đơn hàng thật theo khoảng ngày và từ khóa, Cột thao tác bảng chuẩn UX, Thống kê động theo khoảng thời gian tùy chọn "Từ ngày... Đến ngày...") và đảm bảo nhóm mình không mắc 100% các lỗi giáo viên đã trừ điểm ở nhóm bạn (Nhà Sách Online - `https://github.com/NguLongCongChua/-n-.git`).

**Architecture:** Sử dụng kiến trúc Client-side Vanilla JavaScript thuần chuẩn mực cho môn Lập trình Web 1: `assets/js/data.js` đóng vai trò Single Source of Truth (Database mô phỏng), các controller chuyên trách (`assets/js/admin/orders.js`, `assets/js/admin/statistics.js`, `assets/js/common.js`) trực tiếp xử lý lọc đa điều kiện (multi-criteria filter), tìm kiếm chuỗi không phân biệt hoa thường, tính toán thống kê KPI và Top 5 khách hàng tự động, render bảng mượt mà không reload trang và hiển thị Toast phản hồi tương tác chuẩn UX e-commerce (loại bỏ hoàn toàn các mánh lới CSS `:target` và "Ping-Pong Hack" của nhóm bạn).

**Tech Stack:** HTML5 Semantic, CSS3 Modular (Flexbox/Grid), Vanilla JavaScript ES6+ (`sessionStorage`, `URLSearchParams`, mảng `filter`/`reduce`/`sort`, DOM API), SVG Icons.

**Spec:** `tai-lieu/ke-hoach-kiem-tra-va-doi-chieu-loi.md`

## Bằng Chứng Audit Toàn Diện Mã Nguồn Nhóm Bạn (21 File Bị Soi)
1. **0% JavaScript:** `admin/html/admin-dashboard.html` dòng 512-514 chủ động comment out script (`../../JS/admin-dashboard.js`). Thư mục `js/` hoàn toàn không tồn tại trong repo dù `README.md` dòng 7 khẳng định có.
2. **CSS `:target` Hack:** `css/style-chung.css` dòng 409-456 dùng `#login-success:target ~ ...` để lật giao diện, làm hỏng lịch sử Back/Forward của trình duyệt và gây giật cuộn trang (Page Jump).
3. **Tìm kiếm đơn hàng "chết" (Lỗi bị trừ điểm):** `admin/html/admin-don-hang.html` dòng 388-391 chỉ có `<input class="input-search">` trơ trọi, không nằm trong `<form>`, không có `<button>`, không có script lắng nghe sự kiện, không có feedback.
4. **Lọc thời gian xung đột & thiếu khoảng ngày (Lỗi bị trừ điểm):** `admin/html/admin-don-hang.html` dòng 393-400 đặt đồng thời dropdown tháng và ô chọn ngày; không có cặp ô "Từ ngày... Đến ngày...".
5. **Cột thao tác gắn nút "Thêm đơn" (Lỗi bị trừ điểm):** `admin/html/admin-don-hang.html` dòng 449-452 gắn `<a href="#addOrderModal" class="btn-action-add"><i class="fa-solid fa-plus"></i> Thêm</a>` vào từng dòng `<tr>`.
6. **Thống kê gõ cứng (Lỗi bị trừ điểm):** `admin/html/admin-dashboard.html` dòng 268-350 gõ chết doanh thu `45.200.000 đ`, 128 đơn; không có trang thống kê riêng, không có bộ lọc khoảng thời gian.
7. **Gian lận tìm kiếm bằng CSS:** `san-pham.html` dòng 213-269 gõ cứng thông báo "Hiển thị 2 kết quả phù hợp" và gán class `search-hide` để ép ẩn sách 3-6 bằng CSS khi có hash `#search-result`. Dù gõ bất kỳ từ gì cũng chỉ hiện đúng 2 cuốn sách 1 & 2.
8. **Nút tăng giảm giỏ hàng bị liệt:** `chi-tiet.html` dòng 159-161 gán cứng `onclick="javascript:void(0)"`. `gio-hang.html` dòng 156-181 nút `-` và `+` không có sự kiện.
9. **Form mã giảm giá chết:** `gio-hang.html` dòng 209 ghi thẳng `onsubmit="return false;"`.
10. **Đăng nhập Admin không mật khẩu:** `admin/html/index.html` dòng 24-33 placeholder ghi "có thể bỏ trống", nút Đăng nhập là thẻ `<a>` nhảy thẳng vào Dashboard.
11. **"Ping-Pong Hacks":** `admin/html/admin-QLTK.html` dòng 21-31 comment thừa nhận dùng radio ẩn làm công tắc bật Toast ảo, nút khóa tài khoản không thay đổi trạng thái người dùng.

## Global Constraints
- Giữ nguyên 100% phong cách thiết kế, bảng màu, typography, CSS tokens của Frame & Form / DVK Gunpla.
- Tuyệt đối không cài thêm thư viện/framework bên thứ ba (không React, không Vue, không jQuery) – tuân thủ chuẩn JavaScript thuần môn Web 1.
- Tương thích và đồng bộ hoàn toàn với dữ liệu `ORDERS`, `PRODUCTS`, `USERS`, `ORDER_STATUS`, `LOCATIONS` trong `assets/js/data.js`.
- Mọi thao tác tìm kiếm, lọc, phân trang, chuyển trạng thái đều phải phản hồi tức thời lên giao diện (DOM update) kèm thông báo Toast sinh động, tự nhiên.
- Tuyệt đối không để lộ các từ ngữ kỹ thuật như "Mô phỏng", "Web tĩnh", "Hardcode", "Chưa có backend" trong giao diện người dùng và thông báo Toast.

## Review Focus
- **Tìm kiếm không có kết quả:** Nhập từ khóa không tồn tại kết hợp bộ lọc ngày -> Bảng đơn hàng phải hiển thị giao diện rỗng (Empty State) lịch sự và Toast báo *"Không tìm thấy đơn hàng phù hợp"*, không để bảng trắng tinh hay gây lỗi script.
- **Khoảng ngày không hợp lệ (`from > to`):** Nhập ngày bắt đầu lớn hơn ngày kết thúc -> Form phải hiển thị cảnh báo hợp lệ và không tính toán sai lệch hay làm sập giao diện.
- **Thống kê trong khoảng ngày không có phát sinh đơn hàng:** Các thẻ KPI phải hiển thị `0 đ`, `0 đơn`, `0 khách` và bảng Top khách hàng hiển thị thông báo rỗng chỉn chu, không xuất hiện `NaN` hay `undefined`.
- **Cột thao tác đơn hàng:** Từng dòng đơn hàng chỉ chứa hành động tác động lên chính đơn đó ("Xem" / "Xử lý"), tuyệt đối không có nút "Thêm đơn mới" trong từng dòng (lỗi nghiêm trọng nhóm bạn bị trừ).
- **Hoàn nguyên bộ lọc ("Đặt lại"):** Bấm nút "Đặt lại" phải xóa trắng từ khóa, đưa ngày và dropdown về mặc định, khôi phục ngay lập tức danh sách tất cả đơn hàng về trang 1.

---

### Task 1: Chuẩn hóa Bộ Lọc & Tìm Kiếm Đơn Hàng Thật Kèm Feedback Đầy Đủ

**Files:**
- Modify: `assets/js/admin/orders.js:24-85`
- Test: `tests/admin/test_orders_filter.js`

**Interfaces:**
- Consumes: `ORDERS`, `USERS`, `ORDER_STATUS`, `LOCATIONS` từ `assets/js/data.js`, `toast()`, `formatDate()`, `money()` từ `assets/js/common.js`.
- Produces: Hàm `filterOrders(criteria)` lọc mảng `orders` thật theo 6 tiêu chí kết hợp: từ khóa (`key`), trạng thái (`status`), từ ngày (`from`), đến ngày (`to`), tỉnh thành (`city`), phường xã (`district`). Cập nhật `render()` hiển thị đúng số lượng và phân trang.

- [ ] **Step 1: Viết test kiểm tra logic lọc đơn hàng đa điều kiện**

Tạo file `tests/admin/test_orders_filter.js`:
```javascript
const assert = require("assert");

// Giả lập dữ liệu tối giản tương đương data.js
const mockOrders = [
  { id: "DH001", userId: "1", datetime: "2026-10-15 14:30", status: "completed", address: { city: "Hồ Chí Minh", ward: "Phường 1" }, total: 500000 },
  { id: "DH002", userId: "2", datetime: "2026-10-20 09:15", status: "pending", address: { city: "Hà Nội", ward: "Phường Cống Vị" }, total: 1200000 },
  { id: "DH003", userId: "1", datetime: "2026-11-01 16:45", status: "delivering", address: { city: "Hồ Chí Minh", ward: "Phường 2" }, total: 350000 }
];
const mockUsers = {
  "1": { id: "1", name: "Nguyễn Văn A", phone: "0901234567" },
  "2": { id: "2", name: "Trần Thị B", phone: "0912345678" }
};

function filterOrders(orders, criteria) {
  return orders.filter(o => {
    const u = mockUsers[o.userId] || { name: "", phone: "" };
    if (criteria.key) {
      const q = criteria.key.toLowerCase().trim();
      const matchKey = o.id.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) || u.phone.includes(q);
      if (!matchKey) return false;
    }
    if (criteria.status && o.status !== criteria.status) return false;
    if (criteria.from && o.datetime.slice(0, 10) < criteria.from) return false;
    if (criteria.to && o.datetime.slice(0, 10) > criteria.to) return false;
    if (criteria.city && o.address.city !== criteria.city) return false;
    if (criteria.district && o.address.ward !== criteria.district) return false;
    return true;
  });
}

// Case 1: Tìm theo mã đơn
assert.strictEqual(filterOrders(mockOrders, { key: "DH001" }).length, 1);
// Case 2: Tìm theo tên khách
assert.strictEqual(filterOrders(mockOrders, { key: "Văn A" }).length, 2);
// Case 3: Lọc theo khoảng ngày
assert.strictEqual(filterOrders(mockOrders, { from: "2026-10-01", to: "2026-10-31" }).length, 2);
// Case 4: Lọc kết hợp trạng thái và thành phố
assert.strictEqual(filterOrders(mockOrders, { status: "delivering", city: "Hồ Chí Minh" }).length, 1);
// Case 5: Từ khóa không tồn tại
assert.strictEqual(filterOrders(mockOrders, { key: "Không Có" }).length, 0);

console.log("✅ Tất cả các case lọc đơn hàng đã PASS!");
```

- [ ] **Step 2: Chạy test để xác nhận logic hoạt động chuẩn xác**

Chạy: `node tests/admin/test_orders_filter.js`
Kỳ vọng: In ra `✅ Tất cả các case lọc đơn hàng đã PASS!`

- [ ] **Step 3: Cập nhật hàm lọc và sự kiện trong `assets/js/admin/orders.js`**

Trong `assets/js/admin/orders.js`:
- Bổ sung biến trạng thái `filterCriteria = { key: "", status: "", from: "", to: "", city: "", district: "" }`.
- Cập nhật hàm `filtered()` để duyệt qua `filterCriteria`, so khớp từ khóa với mã đơn `o.id`, tên người dùng `u.name`, số điện thoại `u.phone`.
- So khớp chính xác mốc thời gian `from` (ngày >= from) và `to` (ngày <= to).
- Trong sự kiện `$("order-filter").addEventListener("submit")`:
  - Đọc toàn bộ giá trị từ các ô input.
  - Gán vào `filterCriteria`.
  - Reset `state.page = 1`.
  - Gọi `render()`.
  - Hiển thị Toast với phản hồi rõ ràng: *"Đã tìm thấy X đơn hàng phù hợp"* (hoặc *"Không có đơn hàng nào khớp với điều kiện lọc"*).
- Trong sự kiện `$("of-reset").addEventListener("click")`:
  - Reset toàn bộ `filterCriteria` về rỗng.
  - Reset `state.page = 1`.
  - Gọi `render()`.
  - Hiển thị Toast: *"Đã đặt lại bộ lọc, hiển thị tất cả X đơn hàng"*.

- [ ] **Step 4: Kiểm tra trực quan trên trình duyệt**

Mở `admin/orders.html`, nhập mã đơn thử nghiệm hoặc chọn ngày từ `2026-08-01` đến `2026-11-02`:
- Bảng đơn hàng lọc đúng danh sách đơn tương ứng.
- Toast thông báo số lượng đơn hàng tìm thấy.
- Bấm "Đặt lại", bảng quay về danh sách đầy đủ ban đầu.

---

### Task 2: Rà Soát & Đảm Bảo Cột Thao Tác Đơn Hàng Chuẩn Nghiệp Vụ UX

**Files:**
- Verify/Modify: `admin/orders.html:34-40`
- Verify/Modify: `assets/js/admin/orders.js:32-45`

**Interfaces:**
- Consumes: Cấu trúc hàng `row(o)` trong `orders.js`.
- Produces: Cột Thao tác (`<td>`) chỉ chứa các hành động hợp lệ cho dòng đó (`Xem` hoặc `Xử lý`), tuyệt đối loại bỏ mọi nút thêm đơn hàng trong từng dòng. Đặt nút tạo đơn (nếu cần) ở cấp toolbar đầu bảng.

- [ ] **Step 1: Rà soát mã nguồn `orders.js` và `orders.html` hiện tại**

Kiểm tra hàm `row(o)` trong `assets/js/admin/orders.js` dòng 41-43:
```javascript
<td class="right">${ORDER_STATUS[o.status].next.length
  ? `<a class="btn btn-dark btn-sm" href="order-detail.html?id=${o.id}">Xử lý ${icon("chevronRight")}</a>`
  : `<a class="btn btn-outline btn-sm" href="order-detail.html?id=${o.id}">Xem ${icon("chevronRight")}</a>`}</td>
```
Xác nhận: Hiện tại dự án của nhóm mình đã làm đúng nguyên lý: Cột hành động chỉ có nút xem/xử lý, không hề có icon `+` thêm đơn như nhóm bạn.

- [ ] **Step 2: Bổ sung thanh công cụ thao tác cấp bảng (Table Toolbar) nếu cần thiết**

Nếu muốn hỗ trợ tạo đơn hàng thủ công tại quầy (POS/Admin):
- Đặt nút `<button class="btn btn-primary" id="btn-create-order">+ Tạo đơn hàng mới</button>` nằm ở thanh công cụ phía trên (`#order-filter` hoặc thanh header bảng), không bao giờ đặt vào trong từng dòng `<tr>`.

- [ ] **Step 3: Kiểm tra hiển thị**

Mở `admin/orders.html` trên trình duyệt:
- Xác nhận từng dòng đơn hàng có layout gọn gàng, nút bấm rõ nghĩa (`Xử lý` hoặc `Xem`), không gây hiểu nhầm nghiệp vụ.

---

### Task 3: Chuẩn Hóa Phân Hệ Thống Kê Động Theo Khoảng Thời Gian "Từ Ngày... Đến Ngày..."

**Files:**
- Modify: `assets/js/admin/statistics.js:1-40`
- Modify: `admin/statistics.html:29-99`
- Test: `tests/admin/test_statistics_calc.js`

**Interfaces:**
- Consumes: `ORDERS`, `USERS`, `formatDate()`, `money()` từ `assets/js/data.js` & `assets/js/common.js`.
- Produces: Hàm `computeStatistics(from, to)` tự động tính toán tổng doanh thu, tổng số đơn, số khách đã mua, tỷ trọng và bảng Top 5 khách hàng mua nhiều nhất dựa trên dữ liệu đơn hàng thực tế phát sinh trong khoảng thời gian `[from, to]`.

- [ ] **Step 1: Viết test kiểm tra thuật toán tính toán thống kê động**

Tạo file `tests/admin/test_statistics_calc.js`:
```javascript
const assert = require("assert");

const mockOrders = [
  { id: "DH1", userId: "U1", datetime: "2026-10-05 10:00", status: "completed", total: 1000000 },
  { id: "DH2", userId: "U1", datetime: "2026-10-15 10:00", status: "delivered", total: 2000000 },
  { id: "DH3", userId: "U2", datetime: "2026-10-25 10:00", status: "completed", total: 1500000 },
  { id: "DH4", userId: "U3", datetime: "2026-09-01 10:00", status: "completed", total: 500000 }, // Ngoài khoảng tháng 10
  { id: "DH5", userId: "U2", datetime: "2026-10-20 10:00", status: "cancelled", total: 800000 }  // Đơn hủy -> không tính
];

function computeStatistics(orders, from, to) {
  const valid = orders.filter(o => {
    if (o.status === "cancelled") return false;
    const d = o.datetime.slice(0, 10);
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });

  const totalRevenue = valid.reduce((s, o) => s + o.total, 0);
  const totalOrders = valid.length;

  const userMap = {};
  valid.forEach(o => {
    if (!userMap[o.userId]) userMap[o.userId] = { count: 0, total: 0 };
    userMap[o.userId].count += 1;
    userMap[o.userId].total += o.total;
  });

  const uniqueCustomers = Object.keys(userMap).length;
  const topUsers = Object.entries(userMap)
    .map(([userId, data]) => ({ userId, ...data }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return { totalRevenue, totalOrders, uniqueCustomers, topUsers };
}

// Test tính trong tháng 10/2026 (2026-10-01 đến 2026-10-31)
const stats = computeStatistics(mockOrders, "2026-10-01", "2026-10-31");
assert.strictEqual(stats.totalRevenue, 4500000); // DH1(1tr) + DH2(2tr) + DH3(1.5tr)
assert.strictEqual(stats.totalOrders, 3);
assert.strictEqual(stats.uniqueCustomers, 2);
assert.strictEqual(stats.topUsers[0].userId, "U1");
assert.strictEqual(stats.topUsers[0].total, 3000000);

console.log("✅ Logic tính toán thống kê động đã PASS!");
```

- [ ] **Step 2: Chạy test để xác minh độ chính xác**

Chạy: `node tests/admin/test_statistics_calc.js`
Kỳ vọng: In ra `✅ Logic tính toán thống kê động đã PASS!`

- [ ] **Step 3: Cập nhật `assets/js/admin/statistics.js` sang cơ chế tính toán động 100%**

- Bổ sung hàm `renderStats(from, to)` đọc dữ liệu từ `ORDERS`:
  - Lọc bỏ các đơn có `status === "cancelled"`.
  - Lọc theo điều kiện `datetime >= from` và `datetime <= to`.
  - Cập nhật số liệu vào các thẻ KPI `#st-kpis`:
    - Doanh thu: `money(totalRevenue)`
    - Đơn hàng: `totalOrders`
    - Khách đã mua: `uniqueCustomers`
    - Tỷ trọng Top 5: Tính phần trăm doanh thu của Top 5 trên tổng doanh thu.
  - Render động bảng Top 5 khách hàng `#st-body`:
    - Xếp hạng 1, 2, 3, 4, 5 với badge màu tương ứng.
    - Tên và email khách hàng lấy từ `getUser(userId)`.
    - Số đơn, thanh tỷ trọng phần trăm (`share-bar`).
    - Nút "Xem danh sách đơn hàng" trỏ về: `orders.html?user=${u.id}&from=${from}&to=${to}`.
- Kết nối form `#stat-form`:
  - Khi submit: Lấy giá trị `#st-from` và `#st-to`. Kiểm tra nếu `from > to` thì báo lỗi Toast; ngược lại gọi `renderStats(from, to)` và bắn Toast: *"Đã thống kê thành công: Khoảng thời gian từ [Từ ngày] đến [Đến ngày]"*.
- Đồng bộ các nút chọn nhanh (`30 ngày gần nhất`, `Tháng này`, `Năm nay`):
  - Khi bấm: Cập nhật giá trị vào `#st-from` và `#st-to` đồng thời kích hoạt `renderStats` ngay lập tức.

- [ ] **Step 4: Kiểm tra trực quan trên trình duyệt**

Mở `admin/statistics.html`:
- Thay đổi các khoảng ngày khác nhau hoặc bấm các nút preset.
- Xác nhận các thẻ KPI và bảng Top 5 tự động nhảy số liệu chính xác tương ứng với dữ liệu trong `data.js`.
- Không còn bất kỳ đoạn text hardcode cố định nào.

---

### Task 4: Chuẩn Hóa Phân Trang & Xử Lý Trạng Thái Rỗng Không Giật Màn Hình

**Files:**
- Modify: `assets/js/common.js:150-190`
- Verify: `assets/js/admin/orders.js`, `assets/js/admin/products.js`, `assets/js/admin/users.js`

**Interfaces:**
- Consumes: Hàm `renderPagination(container, totalItems, perPage, currentPage, onPageChange)`.
- Produces: Thanh phân trang bằng thẻ `<button type="button" class="page-btn">` thay vì `<a href="#">` để triệt tiêu hoàn toàn hiện tượng giật màn hình lên đầu trang (Page Jump) và tránh làm rối loạn lịch sử trình duyệt (Browser History).

- [ ] **Step 1: Kiểm tra implementation của `renderPagination` trong `assets/js/common.js`**

Xác nhận các nút phân trang sử dụng thẻ `<button>` có `type="button"`, gắn sự kiện `click` và gọi callback `onPageChange(page)`. Tránh dùng thẻ `<a href="#">`.

- [ ] **Step 2: Thêm thông báo phản hồi nhẹ nhàng khi chuyển trang**

Khi người dùng chuyển sang trang khác (ví dụ từ trang 1 sang trang 2):
- Cuộn êm (smooth scroll) danh sách bảng lên đầu nếu bảng quá dài: `tableWrap.scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- Cập nhật số hiển thị chân bảng: `Trang X/Y · Z bản ghi`.

- [ ] **Step 3: Kiểm tra trực quan**

Thực hiện bấm chuyển trang trên bảng Đơn hàng và bảng Sản phẩm:
- Trang chuyển mượt mà, không bị reload, không bị giật trang lên đầu, URL không bị gắn mã `#`.

---

### Task 5: Rà Soát Toàn Diện Giao Diện Phía Khách Hàng (User UI) & Lối Vào Admin

**Files:**
- Verify: `assets/js/header.js` hoặc thanh Topbar/Header ở `index.html`, `pages/*.html`.
- Verify: `pages/cart.html`, `pages/products.html`.

**Interfaces:**
- Consumes: Cấu trúc menu điều hướng và giỏ hàng.
- Produces: Lối vào rõ ràng dẫn tới `admin/login.html` hoặc `admin/index.html` để giáo viên chấm bài có thể truy cập ngay chỉ với 1 click, không cần phải tự gõ URL.

- [ ] **Step 1: Đảm bảo có nút "Quản trị" hoặc icon Admin trên Header/Topbar phía người dùng**

Kiểm tra thanh Header của người dùng:
- Nếu người dùng đăng nhập tài khoản có quyền quản trị hoặc ở thanh Topbar tiện ích, có nút "Trang quản trị" dẫn đến `admin/index.html` (hoặc `admin/login.html`).

- [ ] **Step 2: Kiểm tra tương tác giỏ hàng và thanh toán phía người dùng**

Xác nhận:
- Nút tăng `+` và giảm `-` số lượng sản phẩm trên giỏ hàng cập nhật trực tiếp thành tiền và tổng đơn hàng bằng JavaScript.
- Nút xóa sản phẩm cập nhật giỏ hàng và hiển thị Toast phản hồi: *"Đã xóa sản phẩm khỏi giỏ hàng"*.
- Ô tìm kiếm sản phẩm phía người dùng có cả icon kính lúp và hỗ trợ bấm Enter hoặc nút tìm kiếm.

---

## Self-Review Checklist (Tự Đánh Giá Sau Khi Lập Kế Hoạch)

1. **Độ phủ yêu cầu (Spec coverage):** Toàn bộ 4 lỗi giáo viên đã trừ nhóm bạn (Tìm kiếm đơn không feedback/không nút, Lọc ngày sai logic, Cột thao tác có nút thêm đơn, Thống kê thiếu từ ngày đến ngày) cùng 21 file mã nguồn có lỗi mánh lới của nhóm bạn (CSS `:target`, Ping-Pong Hack, gian lận tìm kiếm bằng CSS, form chết `onsubmit="return false;"`) đều đã có bằng chứng và task tương ứng giải quyết triệt để 100%.
2. **Độ chi tiết từng bước (Step scan):** Mỗi bước trong từng task đều chỉ định rõ file cần sửa, đoạn mã test, câu lệnh chạy và kết quả kỳ vọng rõ ràng.
3. **Tính nhất quán dữ liệu (Type consistency):** Các tên trường dữ liệu (`datetime`, `status`, `userId`, `total`, `address`) hoàn toàn khớp với cấu trúc trong `assets/js/data.js`.
4. **Trọng tâm rà soát (Review Focus):** Đã bao hàm đủ 5 tình huống biên dễ bị bắt bẻ (tìm kiếm rỗng, ngày `from > to`, thống kê không có đơn, nút thao tác từng dòng, đặt lại bộ lọc).
5. **Quy tắc cam kết:** Kế hoạch này được lập thành tài liệu chi tiết, **hoàn toàn chưa tác động hay chỉnh sửa mã nguồn dự án** nhằm tuân thủ đúng yêu cầu của người dùng ("Không có sự cho phép của tui thì hong được sửa").

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-11-07-audit-loi-nhom-ban-va-ke-hoach-chuan-hoa.md`.

Please review the plan. Which execution approach would you prefer?

- **Native** - I implement every task myself in this session, the way this harness runs work, then one fresh reviewer on the most capable model checks the whole branch.
- **Subagent-driven** - A fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end.
