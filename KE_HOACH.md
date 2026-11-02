# Kế hoạch 7 ngày - DVK Gunpla

## Phân công (theo file, để không sửa đè lên nhau)
| Người | Phụ trách | File chính |
|---|---|---|
| **Đạt** (nhóm trưởng) | Khung chung + trưng bày sản phẩm | `css/style.css`, `js/common.js`, `js/layout.js`, `js/data.js`, `index.html`, `products.html`, `product.html` |
| **Vỹ** | Mua hàng & tài khoản | `cart.html`, `checkout.html`, `order-success.html`, `orders.html`, `order-detail.html`, `account.html`, `login.html`, `register.html` |
| **Khang** | Toàn bộ trang quản trị | `admin/*`, `css/admin.css`, `js/admin/*` |

> `js/data.js`, `js/common.js`, `js/layout.js` dùng chung cho mọi trang: **chỉ Đạt sửa**, ai cần đổi thì báo Đạt.

## Lịch làm việc
| Ngày | Cả nhóm | Đạt | Vỹ | Khang |
|---|---|---|---|---|
| **1** | Đẩy code lên GitHub, mỗi người tạo nhánh riêng. Mở từng trang, đọc hiểu code | Chốt tên shop, logo, danh mục, khoảng giá | Đọc luồng giỏ hàng → đặt hàng → lịch sử | Đọc luồng sản phẩm / user / đơn / thống kê |
| **2** | Đối chiếu biên bản chấm (12 mục khách, 8 mục admin) | Sửa dữ liệu mẫu, thay ảnh thật nếu muốn | Rà giỏ hàng, đặt hàng, địa chỉ, thanh toán | Rà thêm/sửa/xóa SP, quản lý user |
| **3** | Tùy biến giao diện theo ý nhóm | Trang chủ, tìm kiếm nâng cao, phân trang | Tài khoản (sửa tên, thêm địa chỉ), lịch sử, chi tiết đơn | Đơn hàng (lọc, cập nhật xuôi), thống kê top 5 |
| **4** | **Đổi chéo kiểm tra**: Đạt test admin, Vỹ test trang SP, Khang test mua hàng | Sửa lỗi được báo | Sửa lỗi được báo | Sửa lỗi được báo |
| **5** | Kiểm tra lỗi giao diện nhỏ (checklist bên dưới) trên **máy khác, tắt mạng, mở file trực tiếp bằng Chrome** | Header, giá tiền, ảnh | Thông báo ở mọi nút | Ô tìm kiếm + lọc admin |
| **6** | Gộp nhánh, sửa lỗi cuối. Tập vấn đáp: mỗi người giải thích được phần của mình **và** 1 phần của người khác | | | |
| **7** | Chạy thử y như thầy chấm theo kịch bản demo, đóng gói nộp (tải thử ZIP từ GitHub, kiểm tra đủ ảnh và font) | | | |

## Checklist lỗi thầy hay bắt
- [ ] Header giống hệt nhau trên **mọi** trang (kể cả login, giỏ hàng, chi tiết đơn)
- [ ] Mọi giá tiền đều có dấu chấm: `1.150.000đ`
- [ ] Số trên icon giỏ hàng nằm gọn, không lệch
- [ ] Ảnh hiện đủ ở giỏ hàng, đặt hàng, chi tiết đơn, admin (không vỡ ảnh)
- [ ] Font tiếng Việt hiển thị đúng khi **tắt mạng**
- [ ] Bấm gì cũng có thông báo: tìm kiếm, chuyển trang, thêm giỏ, thêm/sửa/xóa, lọc, đăng nhập/xuất
- [ ] Chi tiết đơn hàng là trang riêng, **không phải popup**
- [ ] Đăng ký/đăng nhập: bỏ trống vẫn vào được
- [ ] Sửa được tên, thêm được địa chỉ mới
- [ ] Admin: có ô tìm kiếm + dropdown lọc loại sản phẩm
- [ ] Xóa SP đã bán → hỏi → ẩn. Chưa bán → hỏi → gỡ thẻ
- [ ] Trạng thái đơn không chọn ngược được
- [ ] Dashboard/thống kê: chỉ hiện tổng tiền + số đơn, bấm "Xem danh sách đơn hàng" mới hiện chi tiết

## Kịch bản demo (khoảng 5 phút)
1. Mở `index.html` → bấm phân loại MG → chuyển trang 2.
2. Tìm "unicorn" trên header → tìm nâng cao: tên + RG + 1 - 3 triệu.
3. Mở chi tiết SP → thêm vào giỏ (chỉ báo, không nhảy trang) → vào giỏ, tăng/xóa SP.
4. Đặt hàng: thông tin tự hiện → chọn "Giao đến địa chỉ khác" → chọn chuyển khoản → Đặt hàng.
5. Trang thành công → Xem chi tiết đơn (trang riêng) → Lịch sử mua hàng.
6. Tài khoản: sửa tên (header đổi theo), thêm địa chỉ mới.
7. `admin/login.html` → Tổng quan → Sản phẩm: tìm + lọc loại, xóa 1 SP đã bán (bị ẩn) và 1 SP mới (bị xóa).
8. Thêm/sửa SP (xem trước ảnh, đúng loại) → Người dùng: khóa/mở → Đơn hàng: lọc theo ngày + quận, cập nhật xuôi.
9. Thống kê: chọn khoảng ngày → top 5 → "Xem danh sách đơn hàng" → bấm link chi tiết.
