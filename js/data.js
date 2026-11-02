// ============================================================
// DVK GUNPLA - DỮ LIỆU MẪU (KHÔNG CÓ CƠ SỞ DỮ LIỆU)
// Toàn bộ dữ liệu được viết sẵn trong file này.
// Mọi thao tác trên web chỉ hiện thông báo, không lưu thật.
// ============================================================

const CATEGORIES = [
  { id: "HG", name: "High Grade", scale: "1/144", desc: "Dễ lắp, giá mềm, hợp cho người mới bắt đầu." },
  { id: "RG", name: "Real Grade", scale: "1/144", desc: "Nhỏ gọn nhưng chi tiết như mô hình lớn." },
  { id: "MG", name: "Master Grade", scale: "1/100", desc: "Khung xương bên trong, cử động linh hoạt." },
  { id: "PG", name: "Perfect Grade", scale: "1/60", desc: "Đẳng cấp cao nhất, kích thước ấn tượng." },
  { id: "SD", name: "Super Deformed", scale: "SD", desc: "Phong cách chibi dễ thương, lắp nhanh." },
  { id: "TOOL", name: "Dụng cụ & Sơn", scale: "", desc: "Kìm, bút kẻ lằn, giấy nhám, sơn phủ..." },
];

// Khoảng giá dùng cho tìm kiếm nâng cao
const PRICE_RANGES = [
  { id: "duoi-500", label: "Dưới 500.000đ", min: 0, max: 499999 },
  { id: "500-1tr", label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
  { id: "1tr-3tr", label: "1.000.000đ - 3.000.000đ", min: 1000001, max: 3000000 },
  { id: "tren-3tr", label: "Trên 3.000.000đ", min: 3000001, max: Infinity },
];

// [id, tên, mã/series, phân loại, giá, giá cũ, tồn kho, đã bán, kiểu hình, mô tả ngắn]
const PRODUCTS = [
  [1, "RX-78-2 Gundam (Revive)", "Mobile Suit Gundam", "HG", 350000, 390000, 42, 318, "gundam:rx78", "Phiên bản Revive của chiếc Gundam huyền thoại, khớp cử động tốt, màu nhựa chuẩn."],
  [2, "Gundam Aerial", "The Witch from Mercury", "HG", 420000, 0, 35, 276, "gundam:aerial", "Nhân vật chính của series Witch from Mercury với các khiên Bit có thể tháo rời."],
  [3, "Gundam Barbatos Lupus Rex", "Iron-Blooded Orphans", "HG", 380000, 0, 28, 201, "gundam:barbatos", "Dáng đứng hoang dã, móng vuốt và đuôi roi đặc trưng."],
  [4, "Zaku II Char's Custom", "Mobile Suit Gundam", "HG", 360000, 0, 30, 189, "mono:char", "Chiếc Zaku đỏ nhanh gấp ba lần của Char Aznable."],
  [5, "Gundam Calibarn", "The Witch from Mercury", "HG", 480000, 520000, 18, 143, "gundam:calibarn", "Thiết kế thanh mảnh, đi kèm bộ Bit Staves trong suốt."],
  [6, "Gundam Exia", "Mobile Suit Gundam 00", "HG", 300000, 0, 40, 256, "gundam:exia", "Bảy thanh kiếm GN, màu xanh trắng kinh điển của series 00."],
  [7, "Strike Freedom Gundam", "Gundam SEED Destiny", "HG", 520000, 0, 25, 233, "gundam:freedom", "Đôi cánh vàng DRAGOON tháo rời, phiên bản Revive."],
  [8, "Unicorn Gundam (Destroy Mode)", "Gundam Unicorn", "HG", 450000, 0, 22, 164, "unicorn:unicorn", "Khung Psycho-frame đỏ dạng trong, sừng chữ V mở rộng."],
  [9, "Wing Gundam", "Gundam Wing", "HG", 320000, 0, 33, 147, "gundam:wing", "Có thể chuyển đổi sang dạng Bird Mode."],
  [10, "Gundam Lfrith", "The Witch from Mercury", "HG", 390000, 0, 20, 0, "gundam:lfrith", "Hàng mới về - phối màu trắng hồng thanh lịch."],
  [11, "RX-78-2 Gundam Ver.2.0", "Mobile Suit Gundam", "RG", 750000, 820000, 26, 154, "gundam:rx78", "Khung Advanced MS Joint giúp tạo dáng cực kỳ linh hoạt."],
  [12, "Strike Freedom Gundam", "Gundam SEED Destiny", "RG", 850000, 0, 19, 211, "gundam:freedom", "Khung trong mạ vàng, cánh xòe đẹp mắt."],
  [13, "Nu Gundam", "Char's Counterattack", "RG", 1150000, 1290000, 15, 132, "gundam:nu", "Sáu Fin Funnel lớn, khung Psycho-frame chi tiết."],
  [14, "Unicorn Gundam", "Gundam Unicorn", "RG", 1050000, 0, 17, 98, "unicorn:unicorn", "Chuyển đổi Unicorn Mode - Destroy Mode ngay trên một mô hình."],
  [15, "Wing Gundam Zero EW", "Gundam Wing Endless Waltz", "RG", 780000, 0, 21, 120, "gundam:wing", "Đôi cánh thiên thần với lông vũ tách rời từng lớp."],
  [16, "Sazabi", "Char's Counterattack", "RG", 1350000, 0, 12, 87, "mono:sazabi", "Khối giáp đỏ đồ sộ, mono-eye có thể di chuyển."],
  [17, "Zaku II Mass Production", "Mobile Suit Gundam", "RG", 650000, 0, 24, 76, "mono:zaku", "Phiên bản sản xuất hàng loạt với ống dẫn khí linh hoạt."],
  [18, "Gundam Exia", "Mobile Suit Gundam 00", "RG", 720000, 0, 20, 102, "gundam:exia", "Đi kèm sticker hiệu ứng và GN Sword mở rộng."],
  [19, "Hi-Nu Gundam", "Beltorchika's Children", "RG", 1250000, 0, 14, 93, "gundam:hinu", "Fin Funnel dạng cánh, phối màu xanh tím sang trọng."],
  [20, "Destiny Gundam", "Gundam SEED Destiny", "RG", 880000, 0, 16, 0, "gundam:destiny", "Hàng mới về - cánh Wings of Light đỏ rực."],
  [21, "Freedom Gundam Ver.2.0", "Gundam SEED", "MG", 1250000, 0, 14, 88, "gundam:freedom", "Khung xương đầy đủ, cánh xòe 10 cánh tuyệt đẹp."],
  [22, "Gundam Barbatos", "Iron-Blooded Orphans", "MG", 1150000, 0, 13, 74, "gundam:barbatos", "Lộ rõ khung Gundam Frame bên trong, kèm Mace khổng lồ."],
  [23, "Sazabi Ver.Ka", "Char's Counterattack", "MG", 2400000, 2650000, 8, 61, "mono:sazabi", "Thiết kế của Hajime Katoki, kèm decal nước cao cấp."],
  [24, "Nu Gundam Ver.Ka", "Char's Counterattack", "MG", 2300000, 0, 9, 57, "gundam:nu", "Fin Funnel có thể tạo dáng tấn công độc lập."],
  [25, "Gundam Exia", "Mobile Suit Gundam 00", "MG", 1100000, 0, 15, 69, "gundam:exia", "Có đèn LED cho cụm GN Drive (bán kèm riêng)."],
  [26, "Zaku II Ver.2.0", "Mobile Suit Gundam", "MG", 950000, 0, 18, 53, "mono:zaku", "Bản 2.0 với tỷ lệ cơ thể cân đối hơn."],
  [27, "Unicorn Gundam Ver.Ka", "Gundam Unicorn", "MG", 1650000, 0, 11, 66, "unicorn:unicorn", "Psycho-frame tách màu rõ nét, chuyển đổi hoàn chỉnh."],
  [28, "Strike Freedom Full Burst", "Gundam SEED Destiny", "MG", 1450000, 0, 10, 48, "gundam:freedom", "Khung mạ vàng, tư thế Full Burst đặc trưng."],
  [29, "Wing Gundam Zero EW Ver.Ka", "Gundam Wing Endless Waltz", "MG", 1550000, 0, 12, 59, "gundam:wing", "Cánh lông vũ tỉ mỉ, kèm Twin Buster Rifle."],
  [30, "RX-78-2 Gundam Ver.3.0", "Mobile Suit Gundam", "MG", 1050000, 0, 16, 0, "gundam:rx78", "Hàng mới về - giáp mở để lộ khung trong."],
  [31, "RX-78-2 Gundam Unleashed", "Mobile Suit Gundam", "PG", 6500000, 7200000, 5, 23, "gundam:rx78", "Đỉnh cao Gunpla với hơn 1.000 chi tiết và hệ thống đèn LED."],
  [32, "Strike Freedom Gundam", "Gundam SEED Destiny", "PG", 5200000, 0, 4, 18, "gundam:freedom", "Khung mạ vàng sang trọng, cánh DRAGOON kích thước lớn."],
  [33, "Unicorn Gundam", "Gundam Unicorn", "PG", 6800000, 0, 3, 15, "unicorn:unicorn", "Hỗ trợ bộ LED chuyển đổi Psycho-frame phát sáng."],
  [34, "Gundam Exia", "Mobile Suit Gundam 00", "PG", 4800000, 0, 6, 21, "gundam:exia", "Đèn LED tích hợp, chi tiết cơ khí cực kỳ dày đặc."],
  [35, "00 Raiser", "Mobile Suit Gundam 00", "PG", 5900000, 0, 4, 12, "gundam:raiser", "Kết hợp 00 Gundam và O Raiser, kích thước đồ sộ."],
  [36, "Wing Gundam Zero EW", "Gundam Wing Endless Waltz", "PG", 4500000, 0, 5, 0, "gundam:wing", "Hàng mới về - cánh lông vũ khép mở như thật."],
  [37, "SDEX RX-78-2 Gundam", "Mobile Suit Gundam", "SD", 180000, 0, 60, 412, "gundam:rx78", "Phiên bản chibi nhỏ xinh, lắp trong 30 phút."],
  [38, "SDCS Strike Freedom", "Gundam SEED Destiny", "SD", 250000, 0, 45, 265, "gundam:freedom", "Khung Cross Silhouette, đổi được tỉ lệ cơ thể."],
  [39, "SDCS Unicorn Gundam", "Gundam Unicorn", "SD", 260000, 0, 38, 198, "unicorn:unicorn", "Unicorn dạng SD với khung Cross Silhouette."],
  [40, "BB Senshi Sazabi", "Char's Counterattack", "SD", 220000, 0, 32, 176, "mono:sazabi", "Sazabi phiên bản BB Senshi dễ thương."],
  [41, "SDEX Gundam Barbatos", "Iron-Blooded Orphans", "SD", 180000, 0, 50, 233, "gundam:barbatos", "Kèm Mace thu nhỏ, màu sắc tách sẵn."],
  [42, "SDEX Wing Gundam Zero EW", "Gundam Wing Endless Waltz", "SD", 180000, 0, 47, 210, "gundam:wing", "Đôi cánh trắng nhỏ gọn, dễ trưng bày."],
  [43, "SDEX Gundam Exia", "Mobile Suit Gundam 00", "SD", 180000, 0, 44, 187, "gundam:exia", "Exia phiên bản SD với GN Sword gập được."],
  [44, "SDCS Gundam Aerial", "The Witch from Mercury", "SD", 280000, 0, 30, 0, "gundam:aerial", "Hàng mới về - Aerial chibi kèm khiên Bit."],
  [45, "Kìm cắt GodHand SPN-120", "Dụng cụ cắt", "TOOL", 1150000, 1250000, 14, 96, "tool:nipper", "Kìm một lưỡi siêu bén, vết cắt phẳng gần như không để lại dấu trắng."],
  [46, "Bộ bút kẻ lằn Gundam Marker", "Bút kẻ lằn", "TOOL", 150000, 0, 80, 340, "tool:marker", "Bộ 3 bút đen, xám, nâu cho đường kẻ mảnh và đều."],
  [47, "Bút kẻ lằn chìm Panel Line", "Bút kẻ lằn", "TOOL", 45000, 0, 120, 512, "tool:marker", "Mực chảy vào rãnh, lau sạch phần thừa dễ dàng."],
  [48, "Dao mũi nhọn kỹ thuật 30°", "Dụng cụ cắt", "TOOL", 85000, 0, 70, 284, "tool:knife", "Dùng để gọt bavia và cắt decal chính xác."],
  [49, "Bộ giấy nhám 6 cấp độ", "Dụng cụ mài", "TOOL", 60000, 0, 150, 455, "tool:sand", "Từ độ nhám 400 đến 2000, xử lý vết cắt hoàn hảo."],
  [50, "Sơn phủ Mr. Hobby Top Coat (mờ)", "Sơn phủ", "TOOL", 180000, 0, 40, 198, "tool:spray", "Phủ mờ giúp mô hình trông như thật, che dấu kẻ lằn."],
  [51, "Đế trưng bày Action Base 1", "Phụ kiện", "TOOL", 150000, 0, 55, 167, "tool:base", "Đế tạo dáng bay cho HG, RG và MG."],
  [52, "Bộ dụng cụ lắp ráp cơ bản 8 món", "Bộ dụng cụ", "TOOL", 320000, 0, 35, 0, "tool:kit", "Hàng mới về - đủ kìm, dao, nhíp, nhám cho người mới."],
].map(([id, name, series, category, price, oldPrice, stock, sold, art, desc]) => ({
  id, name, series, category, price, oldPrice, stock, sold, art, desc,
  image: "images/products/p" + String(id).padStart(2, "0") + ".svg",
  rating: sold > 250 ? 4.9 : sold > 0 ? 4.8 : 5.0,
  isNew: sold === 0,
}));

// ============================================================
// NGƯỜI DÙNG MẪU
// ============================================================
const USERS = [
  {
    id: 1, name: "Nguyễn Minh Anh", email: "minhanh@gmail.com", phone: "0901 234 567", password: "123456",
    status: "active", joined: "2025-12-10", gender: "Nam", birthday: "2004-05-18",
    addresses: [
      { id: 1, receiver: "Nguyễn Minh Anh", phone: "0901 234 567", street: "12 Võ Văn Ngân", ward: "P. Linh Chiểu", district: "TP. Thủ Đức", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" },
      { id: 2, receiver: "Nguyễn Minh Anh", phone: "0901 234 567", street: "45 Nguyễn Huệ", ward: "P. Bến Nghé", district: "Quận 1", city: "TP. Hồ Chí Minh", isDefault: false, label: "Công ty" },
    ],
  },
  {
    id: 2, name: "Lê Gia Hân", email: "giahan@gmail.com", phone: "0912 345 678", password: "123456",
    status: "active", joined: "2026-01-05", gender: "Nữ", birthday: "2003-09-02",
    addresses: [{ id: 1, receiver: "Lê Gia Hân", phone: "0912 345 678", street: "88 Trần Duy Hưng", ward: "P. Trung Hòa", district: "Quận Cầu Giấy", city: "Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 3, name: "Trần Minh Khoa", email: "minhkhoa@gmail.com", phone: "0987 654 321", password: "123456",
    status: "locked", joined: "2026-02-14", gender: "Nam", birthday: "2002-11-20",
    addresses: [{ id: 1, receiver: "Trần Minh Khoa", phone: "0987 654 321", street: "210 Điện Biên Phủ", ward: "P. 15", district: "Quận Bình Thạnh", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 4, name: "Phạm Thu Trang", email: "thutrang@gmail.com", phone: "0935 111 222", password: "123456",
    status: "active", joined: "2026-03-01", gender: "Nữ", birthday: "2005-01-30",
    addresses: [{ id: 1, receiver: "Phạm Thu Trang", phone: "0935 111 222", street: "15 Bạch Đằng", ward: "P. Thạch Thang", district: "Quận Hải Châu", city: "Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 5, name: "Võ Quốc Bảo", email: "quocbao@gmail.com", phone: "0908 777 888", password: "123456",
    status: "active", joined: "2026-03-22", gender: "Nam", birthday: "2001-07-07",
    addresses: [{ id: 1, receiver: "Võ Quốc Bảo", phone: "0908 777 888", street: "102 Nguyễn Thị Thập", ward: "P. Tân Phú", district: "Quận 7", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 6, name: "Đặng Hoàng Long", email: "hoanglong@gmail.com", phone: "0966 333 444", password: "123456",
    status: "active", joined: "2026-04-18", gender: "Nam", birthday: "2000-12-12",
    addresses: [{ id: 1, receiver: "Đặng Hoàng Long", phone: "0966 333 444", street: "36 Tây Sơn", ward: "P. Quang Trung", district: "Quận Đống Đa", city: "Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 7, name: "Huỳnh Ngọc Mai", email: "ngocmai@gmail.com", phone: "0938 222 999", password: "123456",
    status: "active", joined: "2026-05-09", gender: "Nữ", birthday: "2004-03-25",
    addresses: [{ id: 1, receiver: "Huỳnh Ngọc Mai", phone: "0938 222 999", street: "24 Quang Trung", ward: "P. 10", district: "Quận Gò Vấp", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 8, name: "Bùi Tuấn Kiệt", email: "tuankiet@gmail.com", phone: "0977 456 123", password: "123456",
    status: "active", joined: "2026-06-21", gender: "Nam", birthday: "2003-06-16",
    addresses: [{ id: 1, receiver: "Bùi Tuấn Kiệt", phone: "0977 456 123", street: "9 Võ Nguyên Giáp", ward: "P. Phước Mỹ", district: "Quận Sơn Trà", city: "Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
];

// Tỉnh/thành và quận/huyện (dùng cho nhập địa chỉ mới và lọc đơn hàng theo địa điểm)
const LOCATIONS = {
  "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 5", "Quận 7", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Tân Bình", "TP. Thủ Đức"],
  "Hà Nội": ["Quận Ba Đình", "Quận Cầu Giấy", "Quận Đống Đa", "Quận Hoàn Kiếm", "Quận Hai Bà Trưng"],
  "Đà Nẵng": ["Quận Hải Châu", "Quận Sơn Trà", "Quận Thanh Khê", "Quận Ngũ Hành Sơn"],
};

// Người dùng đang đăng nhập (giao diện mẫu)
const CURRENT_USER_ID = 1;

// ============================================================
// TRẠNG THÁI ĐƠN HÀNG - chỉ được cập nhật xuôi
// ============================================================
const ORDER_STATUS = {
  pending: { label: "Chưa xác nhận", next: ["confirmed", "cancelled"] },
  confirmed: { label: "Đã xác nhận", next: ["delivered", "cancelled"] },
  delivered: { label: "Đã giao thành công", next: [] },
  cancelled: { label: "Đã hủy", next: [] },
};

const PAYMENT_METHODS = {
  cod: "Thanh toán tiền mặt khi nhận hàng (COD)",
  bank: "Chuyển khoản trực tuyến",
};

// [mã đơn, mã khách, ngày giờ đặt, trạng thái, thanh toán, địa chỉ số, [[mã SP, số lượng]], ghi chú]
const ORDERS = [
  ["DH26080501", 1, "2026-08-05 09:12", "delivered", "cod", 1, [[1, 1], [46, 1]], ""],
  ["DH26080808", 3, "2026-08-08 20:41", "delivered", "cod", 1, [[2, 1], [3, 1]], ""],
  ["DH26081203", 2, "2026-08-12 14:05", "delivered", "bank", 1, [[31, 1]], "Gói kỹ giúp mình nhé"],
  ["DH26081815", 4, "2026-08-18 10:30", "delivered", "bank", 1, [[34, 1], [51, 1]], ""],
  ["DH26082010", 1, "2026-08-20 19:02", "cancelled", "cod", 1, [[33, 1]], ""],
  ["DH26082506", 5, "2026-08-25 08:47", "delivered", "cod", 1, [[32, 1]], ""],
  ["DH26090107", 6, "2026-09-01 16:20", "delivered", "cod", 1, [[5, 1], [7, 1], [4, 1]], ""],
  ["DH26090312", 1, "2026-09-03 12:15", "delivered", "bank", 2, [[23, 1]], "Giao giờ hành chính"],
  ["DH26091102", 5, "2026-09-11 21:10", "delivered", "bank", 1, [[21, 1], [29, 1]], ""],
  ["DH26091409", 3, "2026-09-14 11:33", "cancelled", "bank", 1, [[24, 1]], ""],
  ["DH26091905", 8, "2026-09-19 09:58", "delivered", "bank", 1, [[25, 1], [27, 1]], ""],
  ["DH26092205", 2, "2026-09-22 15:44", "delivered", "cod", 1, [[22, 1], [45, 1]], ""],
  ["DH26092808", 7, "2026-09-28 18:25", "delivered", "bank", 1, [[40, 2], [41, 1]], ""],
  ["DH26100304", 4, "2026-10-03 13:07", "delivered", "cod", 1, [[38, 2], [39, 1]], ""],
  ["DH26101203", 6, "2026-10-12 10:16", "cancelled", "cod", 1, [[35, 1]], ""],
  ["DH26101507", 1, "2026-10-15 20:30", "confirmed", "cod", 1, [[12, 1], [47, 2]], ""],
  ["DH26101809", 7, "2026-10-18 17:52", "delivered", "cod", 1, [[8, 1], [9, 1]], ""],
  ["DH26102009", 5, "2026-10-20 09:05", "delivered", "cod", 1, [[14, 1]], ""],
  ["DH26102204", 8, "2026-10-22 22:14", "delivered", "cod", 1, [[33, 1]], ""],
  ["DH26102506", 6, "2026-10-25 14:40", "confirmed", "bank", 1, [[16, 1], [50, 1]], ""],
  ["DH26102811", 2, "2026-10-28 19:20", "pending", "cod", 1, [[15, 1]], ""],
  ["DH26103002", 4, "2026-10-30 08:12", "confirmed", "bank", 1, [[26, 1]], ""],
  ["DH26110103", 5, "2026-11-01 11:48", "pending", "cod", 1, [[11, 1], [48, 1]], ""],
  ["DH26110104", 8, "2026-11-01 15:26", "pending", "bank", 1, [[18, 1], [46, 1]], ""],
  ["DH26110201", 1, "2026-11-02 10:05", "pending", "bank", 1, [[13, 1], [37, 2], [49, 1]], "Gọi trước khi giao"],
].map(([id, userId, datetime, status, payment, addressId, items, note]) => {
  const user = USERS.find((u) => u.id === userId);
  const address = user.addresses.find((a) => a.id === addressId);
  const lines = items.map(([productId, qty]) => {
    const p = PRODUCTS.find((x) => x.id === productId);
    return { productId, qty, price: p.price };
  });
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const shipping = subtotal >= 1000000 ? 0 : 30000;
  return {
    id, userId, datetime, status, payment, note,
    address: { ...address },
    items: lines,
    subtotal, shipping, total: subtotal + shipping,
  };
});

// Giỏ hàng mẫu của người đang đăng nhập
const SAMPLE_CART = [
  { productId: 13, qty: 1 },
  { productId: 37, qty: 2 },
  { productId: 49, qty: 1 },
];

// Trang kết quả tìm kiếm cố định (web tĩnh không lọc thật: tìm gì cũng ra danh sách này)
const SEARCH_RESULT_IDS = [1, 11, 21, 31, 37, 7, 12, 28, 38, 8, 14, 27];

// Đơn hàng vừa đặt (hiển thị ở trang đặt hàng thành công)
const LAST_ORDER_ID = "DH26110201";

// Cho phép script Node đọc dữ liệu để tạo hình (không ảnh hưởng trình duyệt)
if (typeof module !== "undefined") module.exports = { PRODUCTS, CATEGORIES };
