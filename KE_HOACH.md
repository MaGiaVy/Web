# Kế hoạch 7 ngày - DVK Gunpla

## Phân công
> Tên trong bảng là gợi ý, nhóm đổi người cho hợp sở trường. Mỗi người **sở hữu một nhóm file riêng** để không sửa đè lên nhau.

| Vai trò | Người | Phụ trách | File chính |
|---|---|---|---|
| **Admin** | Khang | Toàn bộ trang quản trị (9 trang) | `admin/*.html`, `js/admin/*.js`, `css/admin.css` |
| **Khách hàng** | Vỹ | Toàn bộ trang người mua (12 trang) | `index`, `products`, `advanced-search`, `product`, `cart`, `checkout`, `order-success`, `orders`, `order-detail`, `account`, `login`, `register` (`.html` + `js/` cùng tên) |
| **Kiểm thử + phần dùng chung** | Đạt (nhóm trưởng) | Kiểm thử toàn bộ web, giữ các file dùng chung, gộp code vào `main`, báo cáo | `js/data.js`, `js/common.js`, `js/layout.js`, `css/style.css`, `images/`, `fonts/`, `README.md` |

**Quy tắc làm việc**
- Mỗi người làm trên **nhánh riêng** (`admin`, `khach-hang`, `chung`). Chỉ Đạt gộp vào `main` sau khi kiểm tra.
- File dùng chung (header, CSS chung, dữ liệu mẫu, hàm `money`, `toast`…) **chỉ Đạt sửa**. Ai cần đổi thì nhắn Đạt.
- Lỗi tìm được ghi vào **GitHub Issues**: tên trang, các bước bấm, ảnh chụp, người phụ trách sửa.
- Mọi thao tác **chỉ hiện thông báo**, không lọc, xóa hay sửa thật (web tĩnh).

## Việc cụ thể của từng người
**Khang - Admin**
- Đăng nhập/đăng xuất admin; Tổng quan; Sản phẩm (tìm kiếm + dropdown loại, xóa 2 trường hợp); Thêm/Sửa sản phẩm (xem trước ảnh, ô giá có dấu chấm).
- Người dùng: thêm, **chỉ xem** thông tin khách, khóa/mở. Đơn hàng: lọc theo tình trạng / ngày / phường–tỉnh, cập nhật xuôi. Chi tiết đơn. Thống kê top 5.
- Kiểm tra chéo phần khách hàng vào ngày 4.

**Vỹ - Khách hàng**
- Trang chủ, danh sách theo phân loại, tìm kiếm + trang kết quả, tìm kiếm nâng cao, phân trang, chi tiết sản phẩm.
- Giỏ hàng, đặt hàng (thông tin tự hiện, chọn/nhập địa chỉ, chọn thanh toán), đặt hàng thành công, lịch sử + chi tiết đơn.
- Tài khoản (sửa tên, thêm địa chỉ), đăng ký/đăng nhập không ràng buộc.

**Đạt - Kiểm thử + dùng chung**
- Giữ header/footer, CSS chung, dữ liệu mẫu (sản phẩm, đơn, user, phường/xã), ảnh, font.
- Kiểm thử theo checklist bên dưới trên **Chrome, tắt mạng, mở file trực tiếp**; tải thử ZIP từ GitHub.
- Đối chiếu từng dòng biên bản chấm + file ghi chú; viết báo cáo, ghi % công việc; chuẩn bị kịch bản demo.

## Lịch làm việc
| Ngày | Đạt (kiểm thử + chung) | Vỹ (khách hàng) | Khang (admin) |
|---|---|---|---|
| **1** | Tạo nhánh, hướng dẫn cả nhóm cách chạy. Soạn bảng kiểm thử từ biên bản chấm | Đọc hiểu 12 trang khách hàng | Đọc hiểu 9 trang admin |
| **2** | Rà dữ liệu mẫu, tên phường/xã mới, ảnh sản phẩm (thay ảnh thật nếu muốn) | Rà trang chủ, phân loại, tìm kiếm, chi tiết SP | Rà đăng nhập, tổng quan, sản phẩm, thêm/sửa SP |
| **3** | **Kiểm thử vòng 1** toàn bộ web, ghi lỗi vào Issues | Rà giỏ hàng, đặt hàng, lịch sử, tài khoản | Rà người dùng, đơn hàng, thống kê |
| **4** | Kiểm tra lại các lỗi đã sửa | Sửa lỗi phần khách hàng | Sửa lỗi admin + **kiểm tra chéo** phần khách hàng |
| **5** | **Kiểm thử vòng 2** trên máy khác, tắt mạng; tải ZIP từ GitHub kiểm tra ảnh, font | Sửa lỗi còn lại | Sửa lỗi còn lại |
| **6** | Gộp code vào `main`, viết báo cáo, ghi % công việc | Tập vấn đáp: giải thích phần mình **và** 1 trang admin | Tập vấn đáp: giải thích phần mình **và** 1 trang khách hàng |
| **7** | Cả nhóm chạy thử theo kịch bản demo như thầy chấm, đóng gói nộp | | |

## Checklist kiểm thử (Đạt dùng)
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
