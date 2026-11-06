# TỔNG HỢP CHI TIẾT YÊU CẦU CHẤM BÀI & CÁC LỖI BỊ TRỪ ĐIỂM MÔN WEB 1

> **Bối cảnh đồ án:** Thiết kế GIAO DIỆN Website bán hàng sử dụng HTML, CSS (và một chút JS cơ bản để chuyển trang/hiện thông báo giả lập).
> **Nguyên tắc tối thượng của đồ án này:** Website **KHÔNG ĐƯỢC HOẠT ĐỘNG THẬT** (không có cơ sở dữ liệu, không dùng LocalStorage/SessionStorage hay JS để thêm/sửa/xóa/lọc dữ liệu thật dưới mọi hình thức). Tất cả chỉ là **giao diện tĩnh (mock UI)** để chuẩn bị cho môn Web 2 (viết PHP).

## PHẦN 1: CÁC YÊU CẦU CHỨC NĂNG BẮT BUỘC (THEO BAREM CHẤM ĐIỂM)

### I. Phân hệ Người dùng cuối (End-User) - 5.0 Điểm

1. **Hiển thị sản phẩm & Phân trang:**

   * Hiển thị danh sách sản phẩm theo phân loại (tối thiểu 2 phân loại, ví dụ: Giày Nike, Giày Adidas).

   * Giao diện danh sách sản phẩm bắt buộc phải có thanh **Phân trang (Pagination)** (Trang 1, 2, 3...).

2. **Hiển thị chi tiết sản phẩm:**

   * Bấm vào sản phẩm bất kỳ sẽ chuyển sang 1 trang giao diện Chi tiết sản phẩm mẫu duy nhất.

   * Phải hiển thị đầy đủ các thông tin cơ bản: Hình ảnh, Tên sản phẩm, Mã sản phẩm, **Loại sản phẩm (Danh mục)**, Giá bán, Mô tả, Số lượng, nút Thêm vào giỏ / Mua ngay.

3. **Chức năng Tìm kiếm & Lọc:**

   * **Tìm kiếm cơ bản:** Ô nhập tên sản phẩm trên thanh Header + **Nút bấm tìm kiếm** (icon kính lúp hoặc chữ Tìm kiếm).

   * **Tìm kiếm nâng cao:** Giao diện kết hợp nhiều điều kiện lọc trong 1 lần tìm kiếm (Nhập tên + Chọn phân loại/thương hiệu + Chọn khoảng giá + Nút Lọc/Tìm kiếm).

   * **Trang kết quả tìm kiếm:** Sau khi bấm tìm kiếm/lọc, phải chuyển hướng sang **trang giao diện hiển thị kết quả tìm kiếm** (có danh sách sản phẩm tìm được và có phân trang).

4. **Tài khoản khách hàng (Đăng ký / Đăng nhập / Đăng xuất):**

   * Có form Đăng ký làm người mua hàng.

   * Có form Đăng nhập.

   * Sau khi đăng nhập: Chuyển sang giao diện trang chủ ở trạng thái **đã đăng nhập** (trên Header hiển thị tên người dùng, có menu xem Hồ sơ cá nhân, Lịch sử mua hàng và nút Đăng xuất).

   * Trang **Hồ sơ cá nhân**: Phải có thông tin địa chỉ mặc định của khách hàng (để phục vụ bước thanh toán).

5. **Giỏ hàng & Thanh toán (Bán hàng):**

   * **Trang Giỏ hàng:** Hiển thị danh sách sản phẩm đang chọn mua, số lượng, đơn giá, thành tiền, tổng tiền và nút tiến hành thanh toán.

   * **Trang Thanh toán:**

     * Yêu cầu trạng thái đã đăng nhập, tự hiển thị thông tin người nhận.

     * **Địa chỉ giao hàng:** Phải có tùy chọn (Radio button) cho phép **Chọn địa chỉ mặc định của tài khoản** HOẶC **Nhập địa chỉ giao hàng mới**.

     * **Phương thức thanh toán:** Cho phép chọn hình thức chi trả (Tiền mặt khi nhận hàng COD, Chuyển khoản ngân hàng, hoặc Trực tuyến).

   * **Trang Xác nhận đơn hàng (Order Review / Kết thúc giao dịch):** Sau khi bấm "Đặt hàng ngay", phải chuyển sang trang hiển thị thông báo đặt hàng thành công kèm **chi tiết tóm tắt lại đơn hàng vừa đặt** (Mã đơn, người nhận, địa chỉ, danh sách món hàng, hình ảnh, tổng tiền).

6. **Lịch sử mua hàng:**

   * Trang danh sách các đơn hàng đã đặt của người mua (Mã đơn, ngày đặt, tổng tiền, trạng thái đơn).

   * Bấm vào "Xem chi tiết" một đơn hàng sẽ mở ra trang Chi tiết đơn hàng đó.

### II. Phân hệ Người quản trị (Web Admin) - 5.0 Điểm

1. **Đăng nhập & Đăng xuất Admin:**

   * Sử dụng URL riêng biệt so với người dùng bình thường (ví dụ: `/admin/login.html`).

   * Giao diện riêng dành cho quản trị viên.

2. **Quản lý Khách hàng (User):**

   * Hiển thị danh sách người dùng.

   * Có nút **Thêm khách hàng** (mở ra form đăng ký tài khoản), Sửa thông tin, Đặt lại mật khẩu.

   * Có chức năng **Khóa / Mở khóa** tài khoản (hiển thị hộp thoại xác nhận, trạng thái hiển thị rõ là Đang hoạt động hay Bị khóa).

3. **Quản lý Sản phẩm:**

   * **Trang danh sách sản phẩm:** Hiển thị dạng bảng kèm hình ảnh, có phân trang. **Bắt buộc phải có thanh Tìm kiếm và Lọc sản phẩm** cho Admin.

   * **Thêm sản phẩm:** Mở form thêm mới, phải có chọn đúng **Phân loại (Dropdown)**, nhập giá, mô tả, và nút **Upload hình ảnh** (chọn file từ máy và có khu vực hiển thị hình ảnh/preview).

   * **Sửa sản phẩm:** Mở form giống form thêm nhưng **phải hiển thị sẵn thông tin cũ của sản phẩm** trong các ô input (đặc biệt là phải chọn sẵn đúng phân loại và hiển thị sẵn hình ảnh cũ).

   * **Xóa sản phẩm:** Phải thể hiện được 2 trường hợp (bằng popup/alert giả lập):

     * *Trường hợp 1 (Sản phẩm đã từng được bán trong đơn hàng):* Hiện thông báo chỉ cho phép **Ẩn sản phẩm** khỏi giao diện web bán hàng.

     * *Trường hợp 2 (Sản phẩm chưa từng được bán):* Hiện hộp thoại hỏi xác nhận xóa và tiến hành xóa.

4. **Quản lý Đơn hàng:**

   * Hiển thị danh sách đơn hàng, có phân trang.

   * **Bộ lọc đơn hàng:** Cho phép lọc theo **Tình trạng đơn hàng** (Chưa xử lý/Chờ xác nhận, Đã xác nhận, Đang giao, Đã giao thành công, Đã hủy), lọc theo **Khoảng thời gian đặt hàng** (Từ ngày... đến ngày...), và lọc theo **Địa điểm giao hàng** (Quận/Huyện, Thành phố).

   * **Xem chi tiết đơn hàng:** Hiển thị đầy đủ thông tin khách hàng, địa chỉ giao, danh sách sản phẩm, tổng tiền, lịch sử trạng thái.

   * **Cập nhật tình trạng đơn hàng:** Cho phép đổi trạng thái đơn hàng. *Lưu ý quy tắc đề bài:* Trạng thái chỉ được cập nhật **xuôi** theo quy trình (Chờ xác nhận $\rightarrow$ Đã xác nhận $\rightarrow$ Đã giao), không cho phép cập nhật ngược lại.

5. **Thống kê (Dashboard):**

   * Cho phép người quản trị nhập **Khoảng thời gian** (Từ ngày... đến ngày...) và bấm nút Thống kê.

   * Hiển thị danh sách **Top 5 khách hàng mua hàng cao nhất** trong khoảng thời gian đó, sắp xếp **giảm dần theo tổng tiền mua**.

   * Mỗi khách hàng trong bảng thống kê phải có **link/nút để xem danh sách các đơn hàng** của họ, và từ các đơn hàng đó bấm vào xem được **chi tiết từng đơn hàng**.

## PHẦN 2: NHỮNG LỖI SẼ BỊ TRỪ ĐIỂM ("LÊN THẸO") THẦY ĐÃ CHỈ RA TRONG VIDEO

Trong buổi chấm, thầy gọi mỗi lỗi bị trừ điểm là **"1 thẹo"**. Dưới đây là toàn bộ các lỗi thực tế mà nhóm trong video đã mắc phải hoặc thầy cảnh báo cả lớp:

### 1. Nhóm lỗi về Giao diện & Bố cục (UI/UX)

* ❌ **Lỗi 1: Không thống nhất Header giữa các trang (Trừ 1 thẹo)**

  * *Chi tiết:* Ở trang chủ (`index.html`), thanh Header có ô tìm kiếm và đầy đủ menu. Nhưng khi bấm sang trang Chi tiết sản phẩm hoặc trang Thanh toán, thanh Header lại bị biến dạng, mất ô tìm kiếm hoặc mất các nút menu (do sinh viên quên copy-paste code Header sang các file HTML khác).

  * *Yêu cầu của thầy:* Header và Footer phải giống hệt nhau, thống nhất xuyên suốt trên mọi trang của người dùng.

* ❌ **Lỗi 2: Canh chỉnh bố cục (Layout), lề lối cẩu thả, bị lệch (Trừ 1 thẹo)**

  * *Chi tiết:* Trong trang Giỏ hàng, các con số, ô nhập số lượng và nút bấm bị lệch hàng, chữ rớt dòng, nhìn tổng thể bị xộc xệch ("canh chỉnh thấy gớm", "lỗi chần dần").

  * *Yêu cầu của thầy:* Các cột trong bảng, các nút cộng/trừ số lượng, giá tiền phải được canh giữa/canh phải thẳng hàng, gọn gàng.

* ❌ **Lỗi 3: Lỗi mất hình ảnh sản phẩm / Broken Image (Trừ 1 thẹo)**

  * *Chi tiết:* Ở trang Kết thúc giao dịch (Order Review / Xác nhận đơn hàng), hình ảnh của đôi giày trong danh sách tóm tắt bị lỗi đường dẫn không hiển thị được (hiện icon ảnh vỡ).

  * *Yêu cầu của thầy:* Chấm bài chạy trực tiếp từ file HTML trên trình duyệt Chrome, phải kiểm tra kỹ đường dẫn tương đối (relative path) của toàn bộ hình ảnh ở tất cả các trang.

* ❌ **Lỗi 4: Không định dạng (Format) dấu phân cách hàng nghìn cho Giá tiền (Trừ 1 thẹo)**

  * *Chi tiết:* Trong trang Sửa sản phẩm (Admin) hoặc trong Giỏ hàng, giá tiền hiển thị dạng số trơn `2500000` hoặc `6800000` mà không có dấu chấm/phẩy phân cách (như `2.500.000 ₫`). Thầy nhận xét: *"Nhìn vô một cái là không biết 68 triệu hay 6 triệu 8, phải ngồi đếm số 0 là chết rồi"*.

  * *Yêu cầu của thầy:* Tiền tệ Việt Nam hiển thị trên giao diện (kể cả trong bảng hay phần hiển thị giá) bắt buộc phải format có dấu chấm phân cách rõ ràng.

### 2. Nhóm lỗi về Thiếu thông tin & Thiếu trang giao diện

* ❌ **Lỗi 5: Bấm Tìm kiếm nhưng không chuyển ra Trang giao diện kết quả tìm kiếm (Trừ 2 thẹo - Lỗi nặng)**

  * *Chi tiết:* Khi thầy gõ tên giày vào ô tìm kiếm và bấm Enter (hoặc bấm nút Lọc), trang web chỉ hiện thông báo *"Đang tìm kiếm..."* rồi đứng im tại trang chủ, không chuyển sang trang hiển thị kết quả tìm kiếm có phân trang.

  * *Yêu cầu của thầy:* Dù là web tĩnh không tìm kiếm thật, nhưng khi bấm nút Tìm kiếm/Lọc, **bắt buộc phải chuyển hướng (`<a>` hoặc `form action`) sang một trang HTML giao diện kết quả tìm kiếm** (ví dụ `search-result.html`) có hiển thị danh sách vài sản phẩm mẫu và thanh phân trang bên dưới.

* ❌ **Lỗi 6: Ô tìm kiếm không có nút bấm (Button) rõ ràng**

  * *Chi tiết:* Ô tìm kiếm trên Header chỉ có thẻ `<input>` mà không có nút bấm Tìm kiếm kế bên, bắt thầy phải tự đoán và bấm phím Enter.

* ❌ **Lỗi 7: Trang Chi tiết sản phẩm bị thiếu thông tin "Loại sản phẩm" (Trừ 1 thẹo)**

  * *Chi tiết:* Trong trang chi tiết đôi giày Nike Air Max, có tên, có mã SP, có giá, có mô tả nhưng lại **không có dòng hiển thị sản phẩm này thuộc Loại/Danh mục nào** (ví dụ: Loại sản phẩm: Giày Nike).

* ❌ **Lỗi 8: Trang Quản lý sản phẩm (Admin) thiếu thanh Tìm kiếm / Lọc sản phẩm (Cảnh báo trừ điểm)**

  * *Chi tiết:* Thầy nhấn mạnh trong trang Admin quản lý hàng trăm sản phẩm mà không làm ô tìm kiếm/lọc sản phẩm thì làm sao quản trị viên tìm được đồ để sửa/xóa. Bắt buộc phải vẽ giao diện thanh tìm kiếm/lọc ở đầu bảng sản phẩm Admin.

* ❌ **Lỗi 9: Lưu / Sửa dữ liệu trong Admin xong không có thông báo kết quả hoặc không chuyển trang (Trừ 1 thẹo)**

  * *Chi tiết:* Trong trang Thêm/Sửa sản phẩm của Admin, sau khi bấm nút "Lưu", trang web chỉ hiện popup hỏi *"Bạn có chắc muốn lưu?"*, khi bấm OK thì đứng im tại chỗ, không hiện thông báo *"Đã lưu thành công"* và cũng không tự động quay về trang Danh sách sản phẩm.

  * *Yêu cầu của thầy:* Bấm Lưu xong thì 1 là phải báo kết quả thành công, 2 là chuyển hướng quay về lại trang danh sách sản phẩm.

### 3. Nhóm lỗi "Làm lố" - Vi phạm quy định Web tĩnh (Trừ điểm cực nặng)

* ❌ **Lỗi 10: Viết code JavaScript cho web chạy chức năng thật (Thêm giỏ hàng thật, Lọc thật)**

  * *Chi tiết:* Khi kiểm tra nút "Thêm vào giỏ hàng" hoặc nút "Lọc sản phẩm" trong Admin, thầy nói thẳng: *"Bấm vô đây mà nó thêm thiệt là LÊN THẸO! Bấm lọc mà nó lọc được thiệt cũng TRỪ ĐIỂM nha! Giao diện thì chỉ hiện thông báo giả lập thôi, không có viết code chạy thật. Nhờ AI viết mà không dặn nó là nó viết code JS lọc thiệt luôn đó"*.

  * *Yêu cầu của thầy:* Tuyệt đối tuân thủ đề bài: **"Website không được hoạt động dưới mọi hình thức"**. Chỉ làm giao diện tĩnh và chuyển trang cứng.

## PHẦN 3: CÁC MẸO & KỸ THUẬT LÀM BÀI ĐỂ THẦY CHẤM NHANH, ĐẠT ĐIỂM TỐI ĐA

1. **Tuyệt đối BỎ thuộc tính `required` và kiểm tra định dạng (`type="email"`, JS validation) trong các thẻ `<input>` của Form:**

   * *Lý do:* Khi chấm bài (như lúc test form Đăng ký, Đăng nhập, Thêm sản phẩm), thầy muốn bấm nút một cái là qua trang luôn để kiểm tra luồng giao diện. Trong video, form của bạn sinh viên bắt `required`, bắt nhập đúng chữ `@` trong email, bắt nhập tên sản phẩm khi bấm Lưu... khiến thầy phải ngồi gõ từng chữ rất mất thời gian. Thầy đã nhắc trực tiếp: **"Mai mốt bỏ cái `required` đi, khỏi bắt nhập, để thầy bấm cái rẹt chấm cho lẹ, không cần check mấy cái đó đâu!"**

2. **Cách xử lý đúng chuẩn cho trạng thái Chưa đăng nhập & Đã đăng nhập:**

   * Bạn chỉ cần tạo 2 file trang chủ: `index.html` (Header có nút Đăng ký / Đăng nhập) và `index-logged.html` (Header hiển thị "Xin chào, Nguyễn Văn A", có nút Hồ sơ, Lịch sử đơn hàng, Đăng xuất).

   * Trong form Đăng nhập (`login.html`), nút "Đăng nhập" chỉ cần là một thẻ `<a href="index-logged.html">` (hoặc `<form action="index-logged.html">`). Bấm vào là nhảy thẳng qua trang đã đăng nhập, không cần kiểm tra mật khẩu gì cả.

3. **Chỉ cần làm 1 trang mẫu đại diện cho các trang Chi tiết / Sửa:**

   * Có 20 sản phẩm trên trang chủ thì cả 20 nút "Xem chi tiết" đều trỏ về **đúng 1 file `product-detail.html`** (ví dụ hiển thị đôi Nike Air Max).

   * Trong lịch sử mua hàng có 4 đơn hàng, cả 4 nút "Xem chi tiết" đều trỏ về **đúng 1 file `order-detail.html`**.

   * Trong Admin, bấm nút "Sửa" ở bất kỳ sản phẩm nào cũng chỉ cần mở ra **1 trang `edit-product.html`** đã điền sẵn dữ liệu mẫu của 1 sản phẩm. Thầy hoàn toàn đồng ý và khuyến khích cách làm này vì bản chất qua môn PHP cũng chỉ viết 1 trang rồi truyền mã ID.

4. **Mẹo thiết kế giao diện phần Thống kê Top 5 khách hàng (Trong Admin):**

   * Thay vì nhồi nhét toàn bộ các nút mã đơn hàng (`#DH01`, `#DH02`, `#DH03`...) nằm chồng chất trong 1 ô của bảng thống kê (thầy nhận xét làm vậy lỡ khách mua 100 đơn thì sẽ bị vỡ giao diện, nhảy "tè le hột me"), bạn nên làm như sau:

   * Bảng Top 5 chỉ hiển thị: `STT | Tên khách hàng | Số lượng đơn hàng (VD: 5 đơn) | Tổng tiền mua | Nút [Xem danh sách đơn]`.

   * Khi bấm vào `[Xem danh sách đơn]` mới mở ra danh sách các đơn hàng của khách đó, rồi từ danh sách đó mới bấm xem chi tiết từng đơn. Giao diện sẽ cực kỳ sạch đẹp và được thầy khen!

## PHẦN 4: GIẢI ĐÁP CHI TIẾT CÁC THẮC MẮC THƯỜNG GẶP (Q&A TỪ THỰC TẾ CHẤM BÀI)

### Câu 1: Khi bấm "Tìm kiếm cơ bản" hoặc "Lọc sản phẩm nâng cao" thì sẽ chuyển ra trang kết quả riêng hay đứng yên ở trang đầu tiên (trang chủ)?

* **Trả lời:** **Bắt buộc phải chuyển hướng sang một trang giao diện Kết quả tìm kiếm riêng (có phân trang)**, tuyệt đối không được đứng yên ở trang chủ và chỉ hiện thông báo.

* **Dẫn chứng từ video:** Nhóm trong video khi bấm Tìm kiếm và Lọc nâng cao chỉ hiện thông báo *"Đang tìm kiếm..."* / *"Đã lọc danh sách sản phẩm"* rồi đứng im tại trang chủ, kết quả là bị thầy **trừ 2 thẹo**. Thầy giải thích rõ: *"Đang tìm có nghĩa là thiếu cái giao diện kết quả tìm kiếm hiểu chưa? Mày có thể hiện 'đang tìm' nhưng mà phải ra cái trang giao diện kết quả tìm kiếm"*.

### Câu 2: Trang HTML Kết quả tìm kiếm / Lọc nâng cao đó có cần hiển thị đúng kết quả theo từ khóa hay điều kiện mà người dùng vừa chọn không?

* **Trả lời:** **Hoàn toàn KHÔNG cần** (và không được phép lọc thật bằng JS). Bạn chỉ cần tạo sẵn 1 file cố định (ví dụ `search-result.html`) và hard-code (viết cứng) sẵn khoảng 4 – 8 sản phẩm mẫu trong đó kèm thanh phân trang.

* **Cách làm chuẩn:**

  1. Tạo file `search-result.html`, giữ nguyên Header và Footer giống hệt trang chủ.

  2. Phần thân trang có tiêu đề rõ ràng, ví dụ: *"Kết quả tìm kiếm / lọc sản phẩm (Tìm thấy 8 sản phẩm phù hợp)"*, bên dưới hiển thị vài sản phẩm mẫu và **thanh phân trang (1, 2, 3...)** ở đáy.

  3. Gắn link/form của cả thanh Tìm kiếm trên Header lẫn nút "Lọc" ở bộ lọc nâng cao trỏ thẳng về `search-result.html`. Dù thầy có gõ chữ `"aaaa"`, chọn hãng `"Adidas"` hay khoảng giá nào thì khi bấm nút, trình duyệt cứ nhảy qua trang `search-result.html` cố định này là đạt 100% yêu cầu. Nếu bạn dùng JS để lọc ra đúng sản phẩm thật thì sẽ bị trừ điểm vì vi phạm quy tắc web tĩnh!

### Câu 3: Khi User sửa thông tin cá nhân (hoặc Admin sửa thông tin User/Sản phẩm) thì bấm Lưu có cần cập nhật dữ liệu thiệt không?

* **Trả lời:** **Hoàn toàn KHÔNG cần cập nhật thiệt** (không cần dùng JS hay `localStorage` để lưu lại dữ liệu mới).

* **Dẫn chứng từ video:**

  * **Ở phía User (Trang Hồ sơ của tôi):** Thầy mở trang Hồ sơ cá nhân lên và chỉ kiểm tra xem trong các ô `<input>` đã được điền sẵn dữ liệu mẫu hay chưa (Ví dụ: *Nguyễn Văn A*, email, và đặc biệt là phải có **Địa chỉ giao hàng mặc định** để khớp với lựa chọn "Sử dụng địa chỉ mặc định" bên trang Thanh toán). Thầy thấy có hiển thị sẵn địa chỉ và nút "Lưu thay đổi" là chấm Đúng luôn, không cần dữ liệu phải biến đổi thật.

  * **Ở phía Admin (Trang Sửa sản phẩm / Sửa User):** Yêu cầu bắt buộc là khi mở form Sửa lên, các ô input phải có sẵn thông tin cũ (dùng thuộc tính `value="..."` trong HTML, chọn sẵn `selected` cho Loại sản phẩm và hiện sẵn ảnh cũ). Khi bấm nút **"Lưu"**, chỉ cần hiện `alert("Cập nhật thành công!")` hoặc chuyển hướng quay về trang Danh sách là đạt điểm tối đa. Thầy dặn rõ: *"Lưu xong nó báo kết quả hoặc quay về trang danh sách là được, mà không có thêm/sửa được gì hết nha!"*.

## PHẦN 5: 10 LƯU Ý "NGẦM" CỰC KỲ QUAN TRỌNG KHÁC (ĐỂ TRÁNH MẤT ĐIỂM OAN)

### 1. Chạy trực tiếp từ file `index.html` trên Chrome (Tuyệt đối không phụ thuộc Live Server)

* Trong tờ đề bài và trên thanh địa chỉ trình duyệt của thầy có ghi rõ: **"Chấm bài trên web browser Chrome, truy cập từ file html index trên thư mục gốc"** (đường dẫn dạng `file:///C:/Users/.../index.html`).

* **Lưu ý sống còn:** Nhiều bạn code trên VS Code hay dùng tiện ích *Live Server* (`http://127.0.0.1:5500/...`) và viết đường dẫn tuyệt đối có dấu gạch chéo ở đầu (ví dụ: `/assets/img/giay.jpg` hoặc `/pages/cart.html`). Khi thầy mở trực tiếp bằng cách nhấp đúp vào file `index.html` trong thư mục máy tính, các đường dẫn bắt đầu bằng dấu `/` sẽ bị lỗi mất hình hoặc không chuyển trang được (như lỗi mất hình ở trang đặt hàng thành công trong video 1). Bạn bắt buộc phải dùng **đường dẫn tương đối** (ví dụ: `./assets/img/...` hoặc `../assets/img/...`) và tự kiểm tra bằng cách nhấp đúp trực tiếp vào file `index.html` ngoài Folder trước khi nộp.

### 2. Trang đăng nhập Admin phải tách riêng URL với User

* Trong bảng tiêu chí của thầy có ghi rõ phần Admin: *"Chức năng đăng nhập & đăng xuất (sử dụng URL khác với người dùng bình thường)"*.

* Nghĩa là bạn phải tạo riêng một trang đăng nhập cho Admin (ví dụ: `admin-login.html` hoặc `admin/login.html`), tuyệt đối không được dùng chung form đăng nhập với khách hàng rồi biện giải là "nhập tài khoản admin thì nó nhảy qua trang admin".

### 3. Logic "Xóa sản phẩm" trong Admin (Phải làm đủ 2 trường hợp)

* Đề bài quy định rất kỹ: *"Xóa sản phẩm: kiểm tra nếu sản phẩm đã được bán ra thì **ẩn sản phẩm** không hiển thị lên web; nếu sản phẩm chưa được bán ra thì **hỏi lại và tiến hành xóa** sản phẩm"*.

* Trong video 2 (phút 04:36), khi thầy bấm vào các sản phẩm trong danh sách Admin, nhóm bạn đó đã thiết kế sẵn 2 nút/trạng thái khác nhau trên các dòng: có dòng sản phẩm hiện nút **"Ẩn"** (bấm vào hiện `confirm` báo sản phẩm đã có đơn hàng, hỏi có muốn ẩn không), có dòng hiện nút **"Xóa"** (bấm vào hiện `confirm` báo sản phẩm chưa bán, hỏi có chắc chắn muốn xóa vĩnh viễn không). Bạn nhớ làm đủ cả 2 trường hợp thông báo `confirm` này ở danh sách sản phẩm Admin để thầy bấm thử thấy hợp lý.

### 4. Cách xử lý "Giá tiền" khi Sửa sản phẩm trong Admin

* Ở video 2 (phút 04:14), thầy chỉ ra một chi tiết rất tinh tế ở trang **Sửa sản phẩm**: Nếu ô nhập giá tiền chỉ để số trơn kiểu `2500000`, người quản trị nhìn vào sẽ phải ngồi đếm số `0` xem là 2 triệu rưỡi hay 25 triệu.

* Thầy dặn phải **format (định dạng) hiển thị** có dấu chấm phân cách (ví dụ để `<input type="text" value="2.500.000">`) hoặc có phần hiển thị số tiền đã format ngay kế bên để nhìn vào là đọc được giá ngay.

* Ngoài ra, đề bài có dòng: *"Trạng thái sản phẩm chỉ có thể cập nhật/xuất, không cho phép cập nhật ngược..."* — bạn nhớ để ý các trường thông tin tồn kho/giá bán hiển thị sẵn đầy đủ khi vào form Sửa.

### 5. Không bật kiểm tra rỗng (Validate) vô lý ở các form Admin

* Khi thầy vào trang **Thêm sản phẩm** (video 2, phút 03:20), thầy muốn bấm nút **"Lưu"** ngay lập tức để xem luồng chạy thế nào, không muốn mất công gõ từng ô.

* Nhưng bài của nhóm trong video lại viết JS bắt lỗi *"Vui lòng nhập tên sản phẩm!"*, ép thầy phải quay lại gõ chữ vào rồi mới cho bấm Lưu. Thầy nhắc luôn: *"Không cần xét mấy cái đó đâu các bạn!"*. Vì vậy ở cả form Đăng nhập, Đăng ký, Thanh toán và Thêm/Sửa của Admin, bạn **đừng gài `required` hay viết JS chặn bắt phải nhập**, cứ để bấm nút một phát là chạy qua bước tiếp theo luôn cho thầy chấm lẹ.

### 6. Bắt buộc phải thông báo kết quả hoặc chuyển trang sau khi bấm "Lưu"

* Tiếp nối ý trên, sau khi bấm nút **Lưu** ở trang Thêm/Sửa sản phẩm, bài trong video chỉ hiện câu hỏi `confirm("Bạn có chắc muốn lưu?")`, khi thầy bấm OK thì trang đứng im ru, không báo thành công cũng không chuyển trang — thế là bị thầy ghi sổ trừ điểm ("lên thẹo").

* **Cách làm đúng ý thầy:** Khi bấm Lưu $\rightarrow$ Hiện hộp thoại `confirm` xác nhận (nếu cần) $\rightarrow$ Bấm OK xong thì **1 là hiện thông báo `alert("Đã lưu sản phẩm thành công!")`**, **2 là tự động chuyển hướng (`window.location.href = "products.html"`) quay về lại trang Danh sách sản phẩm**.

### 7. Đầy đủ 3 tiêu chí lọc ở trang "Quản lý đơn hàng" của Admin

* Trong đề bài phần Quản lý đơn hàng yêu cầu có các bộ lọc trên giao diện:

  1. Lọc theo **tình trạng đơn hàng** (Chưa xác nhận, Đã xác nhận, Đã giao thành công, Đã hủy).

  2. Lọc theo **khoảng thời gian đặt hàng** (Từ ngày ... đến ngày ...).

  3. Lọc theo **địa điểm giao hàng** (theo Quận/Huyện, Thành phố).

* Bạn nhớ kiểm tra xem thanh công cụ phía trên bảng Quản lý đơn hàng đã vẽ đủ các ô chọn (`<select>`, `<input type="date">`) cho cả 3 tiêu chí này kèm nút "Lọc" hay chưa (chỉ cần vẽ đủ giao diện bộ lọc, không cần lọc thật).

### 8. Cách trình bày bảng "Thống kê Top 5 khách hàng" cho sạch đẹp

* Đề bài yêu cầu: *"Nhập khoảng thời gian $\rightarrow$ Thống kê 5 khách hàng có mức mua hàng cao nhất $\rightarrow$ Liệt kê từng đơn hàng (có link xem chi tiết) và tính tổng mua $\rightarrow$ Sắp xếp giảm dần theo tổng tiền mua"*.

* Trong video 3 (phút 00:34 - 01:18), nhóm bạn đó nhét tất cả các nút mã đơn hàng (`#DH01`, `#DH02`, `#DH03`...) vào chung một ô trên bảng. Thầy không trừ điểm nhưng góp ý thẳng: Nếu một khách mua vài chục đơn thì các nút đó sẽ tràn làm bể/xấu giao diện ("nhảy tè le hột me").

* **Cách làm đẹp nhất theo lời thầy:** Ở cột Đơn hàng trong bảng Top 5, bạn chỉ ghi **số lượng đơn** (ví dụ: `3 đơn hàng`) kèm một nút/link **"Xem danh sách đơn hàng"** kế bên $\rightarrow$ Bấm vào đó mới bung ra danh sách các đơn của khách đó $\rightarrow$ Rồi bấm vào từng đơn mới xem chi tiết đơn hàng.

### 9. Đồng bộ trạng thái "Đã đăng nhập" (Bắt buộc khi Mua hàng & Thanh toán)

* Đề bài yêu cầu ở phần Giỏ hàng/Thanh toán: *"Yêu cầu phải đăng nhập và tự hiển thị thông tin người đăng nhập"*.

* Như thầy đã chỉ ra ở video 1 (phút 04:10), mẹo làm web tĩnh là tạo 2 trang chủ: `index.html` (chưa đăng nhập - trên Header hiện nút *Đăng nhập / Đăng ký*) và `index1.html` (đã đăng nhập - trên Header hiện *Tên User / Hồ sơ / Lịch sử mua hàng / Đăng xuất*). Khi vào trang Giỏ hàng, Thanh toán, Hồ sơ và Lịch sử đơn hàng, bạn nhớ giữ nguyên thanh Header của trạng thái **đã đăng nhập** để hợp thức hóa quy định này.

### 10. Tuyệt đối gỡ bỏ các tính năng "chạy thật" bằng JS / LocalStorage (nếu dùng AI sinh code)

* Thầy đã cảnh báo rất gắt ở cả phần Giỏ hàng (video 1, phút 05:28: *"Bấm vô Thêm vào giỏ mà nó thêm thiệt là lên thẹo!"*) và phần Lọc Admin (video 2, phút 01:55: *"Bấm lọc được cũng trừ điểm nha!"*).

* Nếu bạn có nhờ AI sinh code mà AI tự động viết hàm `localStorage` để lưu giỏ hàng thật, hay dùng hàm `.filter()` của JS để ẩn/hiện dòng trong bảng khi gõ tìm kiếm, bạn **nhất định phải xóa phần xử lý động đó đi**, chỉ giữ lại thông báo `alert`/toast và chuyển trang HTML tĩnh thôi.