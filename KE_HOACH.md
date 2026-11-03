# Kế hoạch 7 ngày - DVK Gunpla

## Phân công
| Vai trò | Người | Phụ trách | File chính |
|---|---|---|---|
| **Admin** | **Đạt** (nhóm trưởng) | Toàn bộ trang quản trị (9 trang), gộp code vào `main` | `admin/*.html`, `js/admin/*.js`, `css/admin.css` |
| **Khách hàng** | **Khang** | Toàn bộ trang người mua (12 trang) | `index`, `products`, `advanced-search`, `product`, `cart`, `checkout`, `order-success`, `orders`, `order-detail`, `account`, `login`, `register` (`.html` + `js/` cùng tên) |
| **Ảnh + kiểm thử + đề xuất** | **Vỹ** | Tìm ảnh sản phẩm, dữ liệu mẫu, kiểm thử toàn bộ web, đề xuất thêm chức năng / chỉnh giao diện | `images/`, `js/data.js`, `README.md`, GitHub Issues |

**Quy tắc làm việc**
- Mỗi người làm trên **nhánh riêng** (`admin`, `khach-hang`, `anh-du-lieu`). Đạt xem lại rồi gộp vào `main`.
- File dùng chung cho cả 2 phía (`js/common.js`, `js/layout.js`, `css/style.css`): **sửa thì báo cả nhóm trước**, tránh 2 người sửa cùng lúc.
- Vỹ ghi lỗi và đề xuất vào **GitHub Issues**: tên trang, các bước bấm, ảnh chụp, gắn tên người phụ trách (Đạt: admin, Khang: khách hàng).
- Mọi thao tác **chỉ hiện thông báo**, không lọc, xóa hay sửa thật (web tĩnh).

## Việc cụ thể của từng người
**Đạt - Admin**
- Đăng nhập/đăng xuất admin; Tổng quan; Sản phẩm (tìm kiếm + dropdown loại, xóa 2 trường hợp); Thêm/Sửa sản phẩm (xem trước ảnh, ô giá có dấu chấm).
- Người dùng: thêm, **chỉ xem** thông tin khách, khóa/mở. Đơn hàng: lọc theo tình trạng / ngày / phường–tỉnh, cập nhật xuôi. Chi tiết đơn. Thống kê top 5.
- Gộp code các nhánh vào `main`, ghi % công việc vào biên bản.

**Khang - Khách hàng**
- Trang chủ, danh sách theo phân loại, tìm kiếm + trang kết quả, tìm kiếm nâng cao, phân trang, chi tiết sản phẩm.
- Giỏ hàng, đặt hàng (thông tin tự hiện, chọn/nhập địa chỉ, chọn thanh toán), đặt hàng thành công, lịch sử + chi tiết đơn.
- Tài khoản (sửa tên, thêm địa chỉ), đăng ký/đăng nhập không ràng buộc.

**Vỹ - Ảnh, kiểm thử, đề xuất**
- **Tìm ảnh** cho 52 sản phẩm: lưu vào `images/products/` tên `p01.jpg` ... `p52.jpg` (khớp mã trong `js/data.js`), ảnh vuông khoảng 600×600, dung lượng dưới 200 KB, rồi đổi đuôi `.svg` → `.jpg` ở dòng `image:` trong `js/data.js`. **Không dùng link ảnh trên mạng.** Ưu tiên ảnh nhóm tự chụp hoặc ảnh được phép dùng.
- Rà dữ liệu mẫu: tên, giá, mô tả sản phẩm; tên phường/xã mới trong `LOCATIONS`.
- **Kiểm thử** theo checklist bên dưới trên Chrome, tắt mạng, mở file trực tiếp; tải thử ZIP từ GitHub.
- **Đề xuất** thêm chức năng hoặc chỉnh giao diện (ghi vào Issues kèm ảnh chụp), ví dụ: gợi ý khi gõ tìm kiếm, trang liên hệ, trang sửa sản phẩm giống trang xem sản phẩm, banner trang chủ.
- Soạn kịch bản demo và báo cáo.

## Lịch làm việc
| Ngày | Đạt (admin) | Khang (khách hàng) | Vỹ (ảnh + kiểm thử + đề xuất) |
|---|---|---|---|
| **1** | Tạo nhánh, hướng dẫn cả nhóm cách chạy. Đọc hiểu 9 trang admin | Đọc hiểu 12 trang khách hàng | Đọc hiểu cả web, soạn bảng kiểm thử từ biên bản chấm. Bắt đầu tìm ảnh |
| **2** | Rà đăng nhập, tổng quan, sản phẩm, thêm/sửa SP | Rà trang chủ, phân loại, tìm kiếm, chi tiết SP | Tìm ảnh (HG, RG, MG), rà dữ liệu mẫu |
| **3** | Rà người dùng, đơn hàng, thống kê | Rà giỏ hàng, đặt hàng, lịch sử, tài khoản | Tìm ảnh (PG, SD, dụng cụ), thay vào web. **Kiểm thử vòng 1**, ghi lỗi + đề xuất vào Issues |
| **4** | Sửa lỗi + làm đề xuất được chọn (admin) | Sửa lỗi + làm đề xuất được chọn (khách hàng) | Kiểm tra lại lỗi đã sửa, kiểm tra ảnh không vỡ ở mọi trang |
| **5** | Sửa lỗi còn lại | Sửa lỗi còn lại | **Kiểm thử vòng 2** trên máy khác, tắt mạng; tải ZIP từ GitHub kiểm tra ảnh, font |
| **6** | Gộp code vào `main`, ghi % công việc. Tập vấn đáp phần admin + 1 trang khách hàng | Tập vấn đáp phần khách hàng + 1 trang admin | Viết báo cáo, kịch bản demo. Tập vấn đáp: giải thích dữ liệu mẫu, ảnh và 1 trang mỗi phía |
| **7** | Cả nhóm chạy thử theo kịch bản demo như thầy chấm, đóng gói nộp | | |

## Checklist kiểm thử (Vỹ dùng)
- [ ] Header giống hệt nhau trên **mọi** trang (kể cả login, giỏ hàng, chi tiết đơn)
- [ ] Mọi giá tiền đều có dấu chấm: `1.150.000đ`; số tiền trong bảng căn phải
- [ ] Số trên icon giỏ hàng nằm gọn, không lệch
- [ ] Ảnh hiện đủ ở giỏ hàng, đặt hàng, chi tiết đơn, admin (không vỡ ảnh)
- [ ] Font tiếng Việt hiển thị đúng khi **tắt mạng**
- [ ] Bấm gì cũng có thông báo: tìm kiếm, chuyển trang, thêm giỏ, thêm/sửa/xóa, lọc, đăng nhập/xuất
- [ ] Tìm kiếm, lọc, xóa, khóa, đổi trạng thái: chỉ hiện thông báo, không thay đổi thật
- [ ] Chi tiết đơn hàng là trang riêng, **không phải popup**
- [ ] Đăng ký/đăng nhập: bỏ trống vẫn vào được
- [ ] Sửa được tên, thêm được địa chỉ mới (Phường/Xã - Tỉnh/Thành phố)
- [ ] Admin: có ô tìm kiếm + dropdown lọc loại sản phẩm; ô giá tự có dấu chấm
- [ ] Admin **chỉ xem** được thông tin khách hàng, không sửa
- [ ] Xóa SP đã bán → hỏi → báo đã ẩn. Chưa bán → hỏi → báo đã xóa
- [ ] Trạng thái đơn không chọn ngược được
- [ ] Tổng quan/thống kê: chỉ hiện tổng tiền + số đơn, bấm "Xem danh sách đơn hàng" mới sang trang đơn
- [ ] Thu nhỏ cửa sổ: bảng không vỡ, chữ không tràn

## Kịch bản demo (khoảng 5 phút)
1. Mở `index.html` → bấm phân loại MG → chuyển trang 2.
2. Tìm "unicorn" trên header → mở Tìm kiếm nâng cao: tên + RG + 1 - 3 triệu.
3. Mở chi tiết SP → thêm vào giỏ (chỉ báo, không nhảy trang) → vào giỏ, tăng/xóa SP.
4. Đặt hàng: thông tin tự hiện → chọn "Giao đến địa chỉ khác" → chọn chuyển khoản → Đặt hàng.
5. Trang thành công → Xem chi tiết đơn (trang riêng) → Lịch sử mua hàng.
6. Tài khoản: sửa tên, thêm địa chỉ mới (hiện thông báo).
7. `admin/login.html` → Tổng quan → Sản phẩm: tìm + lọc loại, xóa 1 SP đã bán (báo đã ẩn) và 1 SP mới (báo đã xóa).
8. Thêm/sửa SP (xem trước ảnh, đúng loại, ô giá có dấu chấm) → Người dùng: xem (chỉ đọc), khóa/mở → Đơn hàng: lọc theo ngày + phường/tỉnh, cập nhật xuôi.
9. Thống kê: chọn khoảng ngày → top 5 → "Xem danh sách đơn hàng" → bấm link chi tiết.
