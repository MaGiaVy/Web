**Yêu cầu:**  
Thực hiện GIAO DIỆN website sử dụng HTML, CSS, Js bán sản phẩm theo đề tài đã đăng kí. Mọi chức năng của website không được hoạt động không có cơ sở dữ liệu dưới mọi hình thức. 

**Cụ thể:**

1. **Các chức năng cho người dùng cuối (end-user)**

\+ Hiển thị sản phẩm theo phân loại  
\+ Hiển thị chi tiết sản phẩm  
\+ Tìm kiếm cơ bản theo tên sản phẩm (tìm tương đối)  
\+ Tìm kiếm nâng cao (kết hợp nhiều điều kiện trong 1 lần tìm kiếm): theo tên sản phẩm, có chọn phân loại và khoảng giá  
\+ Hiển thị sản phẩm theo phân loại và kết quả tìm kiếm dạng phân trang  
\+ Đăng ký làm người mua hàng (giao diện trên người dùng đầu cuối)  
\+ Bán hàng phải có giỏ hàng: (tham khảo các web bán hàng trực tuyến)

* Yêu cầu phải đăng nhập và tự hiển thị thông tin người đăng nhập  
* Cho phép chọn địa chỉ của tài khoản mua hoặc nhập địa chỉ mới.  
* Cho phép chọn hình thức chi trả (Trực tuyến hoặc Tiền mặt – KHÔNG yêu cầu trang thanh toán)

\+ Hiển thị và lưu đơn hàng khi kết thúc giao dịch  
\+ Cho phép xem lại lịch sử mua hàng của người mua (được nhóm theo đơn hàng).

2. **Các chức năng cho người quản trị web (web-admin)**

\+ Chức năng đăng nhập & đăng xuất (sử dụng URL khác với người dùng bình thường)  
\+ Quản lý user (thêm\#đăng ký, sửa, **khoá/ mở** user)  \-  giao diện cho người quản trị web  
\+ Thêm sản phẩm: đúng phân loại \- có upload hình (có hiển thị hình ảnh trước khi thêm)  
\+ Sửa sản phẩm: hiển thị đúng thông tin trước khi sửa (đặc biệt là phân loại và hình)  
\+ Xoá sản phẩm: kiểm tra nếu sản phẩm đã được bán ra thì ẩn sản phẩm hiển thị trên web, nếu sản phẩm chưa được bán ra thì hỏi lại và tiến hành xoá sản phẩm đó.  
\+ Quản lý đơn hàng:   
\- Cập nhật tình trạng đơn hàng ( chưa xác nhận, đã xác nhận, đã giao (thành công/huỷ đơn). Trạng thái sản phẩm chỉ có thể cập nhật xuôi, không cho phép cập nhật ngược.  
\- Lọc đơn hàng theo: tình trạng đơn hàng / theo khoảng thời gian đặt hàng (từ ngày đến ngày) / theo địa điểm giao hàng (gợi ý : theo quận, huyện, thành phố )    
\- Thống kê: cho phép người quản trị nhập khoảng thời gian thống kê 5 khách hàng có mức mua hàng cao nhất trong thời gian trên, liệt kê từng đơn hàng (có link cho xem chi tiết) và  tính tổng mua. Dữ liệu được sắp xếp giảm dần theo tổng tiền mua. 