# DVK Gunpla - Web bán mô hình Gundam (Đồ án Web1)

Nhóm: **Đạt - Vỹ - Khang**. Giao diện tĩnh HTML/CSS/JS, **không có cơ sở dữ liệu**.

## Cách chạy
Bấm đúp **`index.html`** để mở bằng Chrome. Không cần cài đặt hay chạy server.
Trang quản trị: **`admin/login.html`**. Nhập gì cũng đăng nhập được.

## Quy tắc của thầy (nhớ kỹ khi sửa code)
| Quy tắc | Đã làm ở đâu |
|---|---|
| Không có CSDL, thao tác chỉ hiện thông báo | Dữ liệu viết sẵn trong `js/data.js`. Mọi nút đều gọi `toast(...)` |
| Tìm kiếm / lọc không lọc thật | Bấm tìm chỉ hiện thông báo. Trang kết quả cố định (`SEARCH_RESULT_IDS` trong `js/data.js`). Lọc ở admin cũng vậy |
| Header giống nhau 100% trên mọi trang | Header/footer được vẽ từ **một file duy nhất** `js/layout.js` (admin: `js/admin/admin-layout.js`) |
| Giá có dấu chấm hàng nghìn | Luôn dùng hàm `money(n)` → `1.150.000đ`. **Không tự viết giá bằng tay** |
| Số trên icon giỏ hàng không lệch | `.cart-badge` trong `css/style.css` |
| Ảnh không vỡ khi chuyển trang | Ảnh nằm trong `images/`. Trang trong `admin/` đặt `data-root="../"` và dùng `asset(path)` |
| Không mất font tiếng Việt | Font lưu sẵn trong `fonts/`, không tải từ Google |
| Chi tiết đơn hàng là trang HTML riêng | `order-detail.html?id=...` và `admin/order-detail.html?id=...` |
| Bỏ ràng buộc đăng ký/đăng nhập | `login.html`, `register.html`, `admin/login.html`: không `required`, nhập gì cũng vào |
| Tự sửa tên, thêm địa chỉ khác | `account.html` |
| Admin có ô tìm kiếm + dropdown lọc loại | `admin/products.html` |
| Xóa SP đã bán → hỏi rồi ẩn (`display='none'`), chưa bán → hỏi rồi `card.remove()` | `js/admin/products.js` |
| Dashboard chỉ hiện tổng tiền + số đơn của khách, bấm nút mới xem đơn | `admin/index.html`, `admin/statistics.html` |
| Trạng thái đơn chỉ cập nhật xuôi | `ORDER_STATUS.next` trong `js/data.js` |

## Cấu trúc thư mục
```
index.html            Trang chủ
products.html         Danh sách theo phân loại + tìm kiếm cơ bản/nâng cao + phân trang
product.html?id=      Chi tiết sản phẩm
cart.html             Giỏ hàng (dữ liệu mẫu)
checkout.html         Đặt hàng: thông tin người đăng nhập, chọn/nhập địa chỉ, chọn thanh toán
order-success.html    Đặt hàng thành công (hiển thị đơn vừa lưu)
orders.html           Lịch sử mua hàng (nhóm theo đơn)
order-detail.html?id= Chi tiết 1 đơn hàng
account.html          Hồ sơ (sửa tên), sổ địa chỉ (thêm địa chỉ), đổi mật khẩu
login.html, register.html
admin/                login, index (tổng quan), products, product-form, users, user-form,
                      orders, order-detail, statistics
css/style.css         Giao diện chung     css/admin.css   Giao diện admin
js/data.js            TOÀN BỘ dữ liệu mẫu (sản phẩm, người dùng, đơn hàng, giỏ hàng)
js/common.js          Hàm dùng chung: money, toast, confirmDialog, productCard, phân trang...
js/layout.js          Header + footer trang khách
js/<trang>.js         Code riêng của từng trang   js/admin/*.js   Code trang admin
images/products/      Ảnh minh họa sản phẩm p01.svg ... p52.svg
```

## Sửa dữ liệu / thay ảnh
- Thêm sản phẩm: thêm 1 dòng vào mảng `PRODUCTS` trong `js/data.js`. Ảnh tự lấy theo `images/products/pXX.svg`.
- Muốn dùng **ảnh thật**: chép ảnh vào `images/products/`, đặt tên `p01.jpg`... và đổi đuôi `.svg` → `.jpg` trong `js/data.js` (dòng `image: ...`).
  Dùng **đường dẫn tương đối**, không dùng link ảnh trên mạng (máy thầy có thể không có mạng).
- Thông báo: `toast("Tiêu đề", "Nội dung", "success" | "info" | "warning" | "error")`.

## Tài liệu
Thư mục `tai-lieu/`: đề bài, biên bản đánh giá của thầy, file ghi chú đề tài của nhóm.
