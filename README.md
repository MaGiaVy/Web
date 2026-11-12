# Frame & Form - Web bán mô hình Gundam (Đồ án Web1)

Nhóm: **Đạt - Vỹ - Khang**. Giao diện tĩnh HTML/CSS/JS, **không có cơ sở dữ liệu**.

## Cách chạy
Bấm đúp **`index.html`** (ở thư mục ngoài cùng) để mở bằng Chrome. Không cần cài đặt hay chạy server.
Trang quản trị: **`admin/login.html`**. Nhập gì cũng đăng nhập được.

## Quy tắc của thầy (nhớ kỹ khi sửa code)
| Quy tắc | Đã làm ở đâu |
|---|---|
| Không có CSDL, thao tác chỉ hiện thông báo | Dữ liệu viết sẵn trong `assets/js/data.js`. Mọi nút đều gọi `toast(...)` |
| **Web tĩnh: không lọc, không xóa/sửa thật** | Tìm kiếm, lọc, xóa, khóa user, đổi trạng thái, sửa tên, thêm địa chỉ, giỏ hàng... **chỉ hiện thông báo**, màn hình giữ nguyên. Trang kết quả tìm kiếm cố định (`SEARCH_RESULT_IDS` trong `assets/js/data.js`) |
| Header giống nhau 100% trên mọi trang | Header/footer được vẽ từ **một file duy nhất** `assets/js/layout.js` (admin: `assets/js/admin/admin-layout.js`) |
| Giá có dấu chấm hàng nghìn | Luôn dùng hàm `money(n)` → `1.150.000đ`. **Không tự viết giá bằng tay** |
| Số trên icon giỏ hàng không lệch | `.cart-badge` trong `assets/css/style.css` |
| Ảnh không vỡ khi chuyển trang | Ảnh nằm trong `assets/images/`. Trang trong `admin/` đặt `data-root="../"` và dùng `asset(path)` |
| Không mất font tiếng Việt | Font lưu sẵn trong `assets/fonts/`, không tải từ Google |
| Chi tiết đơn hàng là trang HTML riêng | `pages/order-detail.html?id=...` và `admin/order-detail.html?id=...` |
| Bỏ ràng buộc đăng ký/đăng nhập | `pages/login.html`, `pages/register.html`, `admin/login.html`: không `required`, nhập gì cũng vào |
| Tự sửa tên, thêm địa chỉ khác | `pages/account.html` |
| Admin **chỉ xem** thông tin khách hàng (việc sửa để backend làm), khóa có lý do, danh sách 5 người/trang | `admin/user-form.html` (thêm), `admin/user-form.html?id=...` (chỉ xem) |
| Ô nhập giá tự thêm dấu chấm khi gõ | `bindMoneyInput()` trong `assets/js/common.js` |
| Địa chỉ theo đơn vị hành chính mới (bỏ quận/huyện) | Số nhà → Phường/Xã → Tỉnh/Thành phố, danh sách trong `LOCATIONS` (`assets/js/data.js`) |
| Admin có ô tìm kiếm + dropdown lọc loại | `admin/products.html` |
| Xóa SP: đã bán → nút **Ẩn**, hỏi rồi báo "đã ẩn"; chưa bán → nút **Xóa**, hỏi rồi báo "đã xóa vĩnh viễn" (chỉ thông báo) | `assets/js/admin/products.js` |
| Dashboard chỉ hiện tổng tiền + số đơn của khách, bấm nút mới xem đơn | `admin/index.html`, `admin/statistics.html` |
| Trạng thái đơn chỉ đi tới, không quay lại; hủy đơn phải chọn lý do | Xử lý ở `admin/order-detail.html` (danh sách đơn chỉ có nút Xử lý / Xem). Bước kế tiếp: `ORDER_STATUS.next` trong `assets/js/data.js` |
| Thông tin cửa hàng, khuyến mãi, mã giảm giá **chỉ khai báo 1 chỗ** | `STORE_INFO`, `PROMOTION`, `COUPONS`, `EMAIL_CAMPAIGNS`, `CONTACT_MESSAGES` trong `assets/js/data.js`: trang khách và trang admin cùng đọc nên luôn khớp. Mức "giảm đến X%" tự tính từ giá gốc |
| Chương trình khuyến mãi không có ngày hết hạn thật | Thầy mở ngày nào cũng hiện "đang diễn ra". Số liệu admin lấy mốc theo ngày của đơn mới nhất, không theo ngày thật |
| Danh sách nhiều trang không bị co/giật | `renderPagination()` giữ chiều cao danh sách bằng trang đầy đủ |

## Cấu trúc thư mục
```
index.html              Trang chủ (thầy mở file này)
pages/                  14 trang khách hàng
  products.html           Danh sách theo phân loại / trang kết quả tìm kiếm + phân trang
  advanced-search.html    Tìm kiếm nâng cao (tên + phân loại + khoảng giá)
  product.html?id=        Chi tiết sản phẩm
  cart.html               Giỏ hàng (dữ liệu mẫu)
  checkout.html           Đặt hàng: thông tin người đăng nhập, chọn/nhập địa chỉ, chọn thanh toán
  order-success.html      Đặt hàng thành công
  orders.html             Lịch sử mua hàng (nhóm theo đơn)
  order-detail.html?id=   Chi tiết 1 đơn hàng
  account.html            Hồ sơ (sửa tên), sổ địa chỉ, đổi mật khẩu
  login.html, register.html
  sale.html               Khuyến mãi (chương trình + mã giảm giá + mẫu đang giảm)
  guide.html              Hướng dẫn mua hàng
  contact.html            Liên hệ (gửi lời nhắn chỉ hiện thông báo)
admin/                  13 trang quản trị: login, index (tổng quan), products, product-form,
                        users, user-form (thêm / xem), orders, order-detail, statistics,
                        promotions (khuyến mãi + mã giảm giá), emails (email khách hàng),
                        messages (lời nhắn liên hệ), settings (cài đặt cửa hàng)
assets/
  css/style.css           Giao diện chung   css/home.css   Trang chủ   css/admin.css   Giao diện admin
  js/data.js              TOÀN BỘ dữ liệu mẫu (sản phẩm, người dùng, đơn hàng, giỏ hàng, phường/xã,
                          thông tin cửa hàng, khuyến mãi, mã giảm giá, email, lời nhắn)
  js/common.js            Hàm dùng chung: money, toast, confirmDialog, page(), asset()...
  js/layout.js            Header + footer trang khách
  js/<trang>.js           Code riêng từng trang khách     js/admin/*.js   Code trang admin
  fonts/                  Font tiếng Việt (chạy được khi không có mạng)
  images/studio/          Ảnh sản phẩm p01 ... p52      images/frame-form.svg   Logo
tai-lieu/               Đề bài, biên bản chấm, ghi chú đề tài, kế hoạch (ke-hoach.md, KE_HOACH_*.md)
  thiet-ke/               Ảnh nháp thiết kế giao diện (không dùng trên web)
```

**Đường dẫn trong JS:** dùng `page("cart.html")` cho link trang khách và `asset("images/frame-form.svg")` cho ảnh. Hai hàm này tự tính `../` nên đặt ở trang nào cũng không vỡ link.

## Sửa dữ liệu / thay ảnh
- Thêm sản phẩm: thêm 1 dòng vào mảng `PRODUCTS` trong `assets/js/data.js`. Ảnh tự lấy theo `assets/images/studio/pXX.svg`.
- Muốn dùng **ảnh thật**: chép ảnh vào `assets/images/studio/`, đặt tên `p01.jpg`... và đổi đuôi `.svg` → `.jpg` trong `assets/js/data.js` (dòng `image: ...`).
  Dùng **đường dẫn tương đối**, không dùng link ảnh trên mạng (máy thầy có thể không có mạng).
- Thông báo: `toast("Tiêu đề", "Nội dung", "success" | "info" | "warning" | "error")`.

## Tài liệu
Thư mục `tai-lieu/`: đề bài, biên bản đánh giá của thầy, file ghi chú đề tài của nhóm, kế hoạch và phân công (`ke-hoach.md`).
