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
  { id: "duoi-500", label: "Dưới 500.000đ", min: 0, max: 500000 },
  { id: "500-1tr", label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
  { id: "1tr-3tr", label: "1.000.000đ - 3.000.000đ", min: 1000000, max: 3000000 },
  { id: "tren-3tr", label: "Trên 3.000.000đ", min: 3000000, max: Infinity },
];

// [id, tên, mã/series, phân loại, giá, giá cũ, tồn kho, đã bán, kiểu hình, mô tả ngắn]
// Sản phẩm đã có người mua nên bị ẩn (không xóa được): admin vẫn thấy, khách hàng không thấy
const HIDDEN_PRODUCT_IDS = [42, 43];

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
  hidden: HIDDEN_PRODUCT_IDS.includes(id),
}));

// Sản phẩm đang bán (trang khách hàng chỉ dùng danh sách này)
const SHOP_PRODUCTS = PRODUCTS.filter((p) => !p.hidden);

// ============================================================
// NGƯỜI DÙNG MẪU
// ============================================================
const USERS = [
  {
    id: 1, name: "Nguyễn Minh Anh", email: "minhanh@gmail.com", phone: "0901 234 567", password: "123456",
    status: "active", joined: "2025-12-10", gender: "Nam", birthday: "2004-05-18",
    addresses: [
      { id: 1, receiver: "Nguyễn Minh Anh", phone: "0901 234 567", street: "12 Võ Văn Ngân", ward: "Phường Thủ Đức", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" },
      { id: 2, receiver: "Nguyễn Minh Anh", phone: "0901 234 567", street: "45 Nguyễn Huệ", ward: "Phường Sài Gòn", city: "TP. Hồ Chí Minh", isDefault: false, label: "Công ty" },
    ],
  },
  {
    id: 2, name: "Lê Gia Hân", email: "giahan@gmail.com", phone: "0912 345 678", password: "123456",
    status: "active", joined: "2026-01-05", gender: "Nữ", birthday: "2003-09-02",
    addresses: [{ id: 1, receiver: "Lê Gia Hân", phone: "0912 345 678", street: "88 Trần Duy Hưng", ward: "Phường Yên Hòa", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 3, name: "Trần Minh Khoa", email: "minhkhoa@gmail.com", phone: "0987 654 321", password: "123456",
    status: "locked", lockReason: "Không nhận hàng COD", lockNote: "2 đơn COD liên tiếp không nhận hàng (14/09 và 27/09)", lockedAt: "2026-10-03", joined: "2026-02-14", gender: "Nam", birthday: "2002-11-20",
    addresses: [{ id: 1, receiver: "Trần Minh Khoa", phone: "0987 654 321", street: "210 Điện Biên Phủ", ward: "Phường Thạnh Mỹ Tây", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 4, name: "Phạm Thu Trang", email: "thutrang@gmail.com", phone: "0935 111 222", password: "123456",
    status: "active", joined: "2026-03-01", gender: "Nữ", birthday: "2005-01-30",
    addresses: [{ id: 1, receiver: "Phạm Thu Trang", phone: "0935 111 222", street: "15 Bạch Đằng", ward: "Phường Hải Châu", city: "TP. Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 5, name: "Võ Quốc Bảo", email: "quocbao@gmail.com", phone: "0908 777 888", password: "123456",
    status: "active", joined: "2026-03-22", gender: "Nam", birthday: "2001-07-07",
    addresses: [{ id: 1, receiver: "Võ Quốc Bảo", phone: "0908 777 888", street: "102 Nguyễn Thị Thập", ward: "Phường Tân Mỹ", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 6, name: "Đặng Hoàng Long", email: "hoanglong@gmail.com", phone: "0966 333 444", password: "123456",
    status: "active", joined: "2026-04-18", gender: "Nam", birthday: "2000-12-12",
    addresses: [{ id: 1, receiver: "Đặng Hoàng Long", phone: "0966 333 444", street: "36 Tây Sơn", ward: "Phường Đống Đa", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 7, name: "Huỳnh Ngọc Mai", email: "ngocmai@gmail.com", phone: "0938 222 999", password: "123456",
    status: "active", joined: "2026-05-09", gender: "Nữ", birthday: "2004-03-25",
    addresses: [{ id: 1, receiver: "Huỳnh Ngọc Mai", phone: "0938 222 999", street: "24 Quang Trung", ward: "Phường Gò Vấp", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 8, name: "Bùi Tuấn Kiệt", email: "tuankiet@gmail.com", phone: "0977 456 123", password: "123456",
    status: "active", joined: "2026-06-21", gender: "Nam", birthday: "2003-06-16",
    addresses: [{ id: 1, receiver: "Bùi Tuấn Kiệt", phone: "0977 456 123", street: "9 Võ Nguyên Giáp", ward: "Phường An Hải", city: "TP. Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 9, name: "Ngô Thanh Tùng", email: "thanhtung@gmail.com", phone: "0903 118 245", password: "123456",
    status: "active", joined: "2026-06-28", gender: "Nam", birthday: "2001-03-12",
    addresses: [{ id: 1, receiver: "Ngô Thanh Tùng", phone: "0903 118 245", street: "45 Lê Lợi", ward: "Phường Bến Thành", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 10, name: "Đỗ Khánh Linh", email: "khanhlinh@gmail.com", phone: "0914 552 310", password: "123456",
    status: "active", joined: "2026-07-03", gender: "Nữ", birthday: "2004-08-25",
    addresses: [{ id: 1, receiver: "Đỗ Khánh Linh", phone: "0914 552 310", street: "17 Kim Mã", ward: "Phường Ngọc Hà", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 11, name: "Lý Gia Bảo", email: "giabao@gmail.com", phone: "0938 664 102", password: "123456",
    status: "locked", lockReason: "Thông tin sai", lockNote: "Số điện thoại không liên lạc được", lockedAt: "2026-07-08", joined: "2026-07-05", gender: "Nam", birthday: "2006-01-09",
    addresses: [{ id: 1, receiver: "Lý Gia Bảo", phone: "0938 664 102", street: "102 Hai Bà Trưng", ward: "Phường Tân Định", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 12, name: "Trương Mỹ Duyên", email: "myduyen@gmail.com", phone: "0905 773 418", password: "123456",
    status: "active", joined: "2026-07-09", gender: "Nữ", birthday: "2003-12-01",
    addresses: [{ id: 1, receiver: "Trương Mỹ Duyên", phone: "0905 773 418", street: "56 Nguyễn Văn Linh", ward: "Phường Thanh Khê", city: "TP. Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 13, name: "Phan Đức Thịnh", email: "ducthinh@gmail.com", phone: "0967 201 556", password: "123456",
    status: "active", joined: "2026-07-14", gender: "Nam", birthday: "2002-04-17",
    addresses: [{ id: 1, receiver: "Phan Đức Thịnh", phone: "0967 201 556", street: "8 Cách Mạng Tháng Tám", ward: "Phường Bàn Cờ", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 14, name: "Vũ Hải Yến", email: "haiyen@gmail.com", phone: "0983 445 129", password: "123456",
    status: "active", joined: "2026-07-18", gender: "Nữ", birthday: "2005-06-30",
    addresses: [{ id: 1, receiver: "Vũ Hải Yến", phone: "0983 445 129", street: "33 Xuân Thủy", ward: "Phường Cầu Giấy", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 15, name: "Hồ Quang Huy", email: "quanghuy@gmail.com", phone: "0916 338 740", password: "123456",
    status: "locked", lockReason: "Tài khoản ảo", lockNote: "Tạo nhiều tài khoản để nhận mã giảm giá", lockedAt: "2026-07-25", joined: "2026-07-22", gender: "Nam", birthday: "2000-10-21",
    addresses: [{ id: 1, receiver: "Hồ Quang Huy", phone: "0916 338 740", street: "71 Nguyễn Trãi", ward: "Phường Chợ Quán", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 16, name: "Dương Ngọc Hân", email: "ngochan@gmail.com", phone: "0942 129 663", password: "123456",
    status: "active", joined: "2026-07-27", gender: "Nữ", birthday: "2004-02-14",
    addresses: [{ id: 1, receiver: "Dương Ngọc Hân", phone: "0942 129 663", street: "19 Hoàng Quốc Việt", ward: "Phường Nghĩa Đô", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 17, name: "Mai Xuân Phúc", email: "xuanphuc@gmail.com", phone: "0909 870 214", password: "123456",
    status: "active", joined: "2026-08-02", gender: "Nam", birthday: "2003-09-05",
    addresses: [{ id: 1, receiver: "Mai Xuân Phúc", phone: "0909 870 214", street: "5 Ngô Quyền", ward: "Phường Sơn Trà", city: "TP. Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 18, name: "Châu Bảo Ngọc", email: "baongoc@gmail.com", phone: "0932 556 081", password: "123456",
    status: "active", joined: "2026-08-06", gender: "Nữ", birthday: "2006-05-19",
    addresses: [{ id: 1, receiver: "Châu Bảo Ngọc", phone: "0932 556 081", street: "128 Phan Văn Trị", ward: "Phường Hạnh Thông", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 19, name: "Tạ Minh Trí", email: "minhtri@gmail.com", phone: "0971 310 928", password: "123456",
    status: "locked", lockReason: "Không nhận hàng COD", lockNote: "Cả 3 đơn COD đều không nhận hàng", lockedAt: "2026-10-10", joined: "2026-08-11", gender: "Nam", birthday: "2002-11-11",
    addresses: [{ id: 1, receiver: "Tạ Minh Trí", phone: "0971 310 928", street: "64 Láng Hạ", ward: "Phường Láng", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 20, name: "Lâm Thảo Vy", email: "thaovy@gmail.com", phone: "0918 204 667", password: "123456",
    status: "active", joined: "2026-08-15", gender: "Nữ", birthday: "2005-03-03",
    addresses: [{ id: 1, receiver: "Lâm Thảo Vy", phone: "0918 204 667", street: "22 Trường Chinh", ward: "Phường Tân Sơn Nhất", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 21, name: "Kiều Anh Dũng", email: "anhdung@gmail.com", phone: "0961 447 390", password: "123456",
    status: "active", joined: "2026-08-20", gender: "Nam", birthday: "2001-07-28",
    addresses: [{ id: 1, receiver: "Kiều Anh Dũng", phone: "0961 447 390", street: "90 Lê Duẩn", ward: "Phường Hải Châu", city: "TP. Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 22, name: "Đinh Phương Thảo", email: "phuongthao@gmail.com", phone: "0936 718 205", password: "123456",
    status: "active", joined: "2026-08-26", gender: "Nữ", birthday: "2003-01-16",
    addresses: [{ id: 1, receiver: "Đinh Phương Thảo", phone: "0936 718 205", street: "14 Bạch Mai", ward: "Phường Bạch Mai", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 23, name: "Quách Tấn Phát", email: "tanphat@gmail.com", phone: "0908 562 731", password: "123456",
    status: "locked", lockReason: "Đánh giá sai sự thật", lockNote: "Đăng nhiều đánh giá 1 sao cho sản phẩm chưa mua", lockedAt: "2026-09-20", joined: "2026-09-01", gender: "Nam", birthday: "2004-12-08",
    addresses: [{ id: 1, receiver: "Quách Tấn Phát", phone: "0908 562 731", street: "37 Kha Vạn Cân", ward: "Phường Linh Xuân", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 24, name: "La Thị Thu Hà", email: "thuha@gmail.com", phone: "0912 683 054", password: "123456",
    status: "active", joined: "2026-09-07", gender: "Nữ", birthday: "2002-08-09",
    addresses: [{ id: 1, receiver: "La Thị Thu Hà", phone: "0912 683 054", street: "6 Tôn Đức Thắng", ward: "Phường Cửa Nam", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 25, name: "Nguyễn Hoàng Nam", email: "hoangnam@gmail.com", phone: "0989 027 413", password: "123456",
    status: "active", joined: "2026-09-12", gender: "Nam", birthday: "2005-10-24",
    addresses: [{ id: 1, receiver: "Nguyễn Hoàng Nam", phone: "0989 027 413", street: "150 Phạm Văn Đồng", ward: "Phường Hiệp Bình", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 26, name: "Trần Bảo Châu", email: "baochau@gmail.com", phone: "0947 391 862", password: "123456",
    status: "active", joined: "2026-09-18", gender: "Nữ", birthday: "2006-04-02",
    addresses: [{ id: 1, receiver: "Trần Bảo Châu", phone: "0947 391 862", street: "11 Võ Văn Kiệt", ward: "Phường An Hải", city: "TP. Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 27, name: "Lê Văn Hậu", email: "vanhau@gmail.com", phone: "0965 830 147", password: "123456",
    status: "active", joined: "2026-09-25", gender: "Nam", birthday: "2000-06-13",
    addresses: [{ id: 1, receiver: "Lê Văn Hậu", phone: "0965 830 147", street: "48 Phan Đăng Lưu", ward: "Phường Gia Định", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 28, name: "Phạm Gia Huy", email: "giahuy@gmail.com", phone: "0923 615 309", password: "123456",
    status: "locked", lockReason: "Khách yêu cầu khóa", lockNote: "Khách gửi email yêu cầu tạm khóa tài khoản", lockedAt: "2026-10-20", joined: "2026-10-04", gender: "Nam", birthday: "2004-09-27",
    addresses: [{ id: 1, receiver: "Phạm Gia Huy", phone: "0923 615 309", street: "27 Lý Thường Kiệt", ward: "Phường Hoàn Kiếm", city: "TP. Hà Nội", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 29, name: "Võ Thị Kim Ngân", email: "kimngan@gmail.com", phone: "0902 448 576", password: "123456",
    status: "active", joined: "2026-10-15", gender: "Nữ", birthday: "2003-05-21",
    addresses: [{ id: 1, receiver: "Võ Thị Kim Ngân", phone: "0902 448 576", street: "3 Nguyễn Tri Phương", ward: "Phường Hòa Cường", city: "TP. Đà Nẵng", isDefault: true, label: "Nhà riêng" }],
  },
  {
    id: 30, name: "Hà Minh Quân", email: "minhquan@gmail.com", phone: "0976 254 830", password: "123456",
    status: "active", joined: "2026-10-29", gender: "Nam", birthday: "2005-02-11",
    addresses: [{ id: 1, receiver: "Hà Minh Quân", phone: "0976 254 830", street: "81 Hậu Giang", ward: "Phường Chợ Lớn", city: "TP. Hồ Chí Minh", isDefault: true, label: "Nhà riêng" }],
  },
];

// Đơn vị hành chính 2 cấp theo quy định mới (từ 01/07/2025): Tỉnh/Thành phố -> Phường/Xã
// (bỏ cấp quận/huyện). Dùng cho nhập địa chỉ mới và lọc đơn hàng theo địa điểm
const LOCATIONS = {
  "TP. Hồ Chí Minh": ["Phường Sài Gòn", "Phường Bến Thành", "Phường Tân Định", "Phường Bàn Cờ", "Phường Chợ Quán", "Phường Chợ Lớn",
    "Phường Tân Mỹ", "Phường Tân Hưng", "Phường Thạnh Mỹ Tây", "Phường Gia Định", "Phường Gò Vấp", "Phường Hạnh Thông",
    "Phường Tân Sơn Nhất", "Phường Bảy Hiền", "Phường Thủ Đức", "Phường Linh Xuân", "Phường Hiệp Bình", "Phường Thủ Dầu Một"],
  "TP. Hà Nội": ["Phường Ba Đình", "Phường Ngọc Hà", "Phường Hoàn Kiếm", "Phường Cửa Nam", "Phường Cầu Giấy", "Phường Nghĩa Đô",
    "Phường Yên Hòa", "Phường Đống Đa", "Phường Láng", "Phường Kim Liên", "Phường Hai Bà Trưng", "Phường Bạch Mai"],
  "TP. Đà Nẵng": ["Phường Hải Châu", "Phường Hòa Cường", "Phường Thanh Khê", "Phường Sơn Trà", "Phường An Hải", "Phường Ngũ Hành Sơn",
    "Phường Hòa Khánh", "Phường Tam Kỳ", "Phường Hội An"],
};

// Người dùng đang đăng nhập (giao diện mẫu)
const CURRENT_USER_ID = 1;

// ============================================================
// TRẠNG THÁI ĐƠN HÀNG - chỉ đi tới (next), không quay lại
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

// Lý do của các đơn đã hủy: [lý do, ghi chú]
const CANCEL_REASONS = {
  DH26082010: ["Khách yêu cầu hủy", "Khách đặt nhầm sản phẩm"],
  DH26082919: ["Khách không nhận hàng", "Shipper gọi nhiều lần không nghe máy"],
  DH26091409: ["Khách không nhận hàng", "Khách từ chối nhận khi shipper giao tới"],
  DH26091719: ["Khách không nhận hàng", "Shipper gọi nhiều lần không nghe máy"],
  DH26092703: ["Khách không nhận hàng", "Khách hẹn lại rồi không nhận"],
  DH26100819: ["Khách không nhận hàng", "Không liên lạc được khách"],
  DH26101203: ["Sản phẩm hết hàng", "Đã gọi báo khách, khách đồng ý hủy"],
};

// [mã đơn, mã khách, ngày giờ đặt, trạng thái, thanh toán, địa chỉ số, [[mã SP, số lượng]], ghi chú]
const ORDERS = [
  ["DH26080501", 1, "2026-08-05 09:12", "delivered", "cod", 1, [[1, 1], [46, 1]], ""],
  ["DH26080808", 3, "2026-08-08 20:41", "delivered", "cod", 1, [[2, 1], [3, 1]], ""],
  ["DH26081203", 2, "2026-08-12 14:05", "delivered", "bank", 1, [[31, 1]], "Gói kỹ giúp mình nhé"],
  ["DH26081815", 4, "2026-08-18 10:30", "delivered", "bank", 1, [[34, 1], [51, 1]], ""],
  ["DH26082010", 1, "2026-08-20 19:02", "cancelled", "cod", 1, [[33, 1]], ""],
  ["DH26082506", 5, "2026-08-25 08:47", "delivered", "cod", 1, [[32, 1]], ""],
  ["DH26082919", 19, "2026-08-29 20:05", "cancelled", "cod", 1, [[10, 1]], ""],
  ["DH26090107", 6, "2026-09-01 16:20", "delivered", "cod", 1, [[5, 1], [7, 1], [4, 1]], ""],
  ["DH26090312", 1, "2026-09-03 12:15", "delivered", "bank", 2, [[23, 1]], "Giao giờ hành chính"],
  ["DH26091102", 5, "2026-09-11 21:10", "delivered", "bank", 1, [[21, 1], [29, 1]], ""],
  ["DH26091409", 3, "2026-09-14 11:33", "cancelled", "cod", 1, [[24, 1]], ""],
  ["DH26091719", 19, "2026-09-17 22:40", "cancelled", "cod", 1, [[17, 1], [46, 1]], ""],
  ["DH26091905", 8, "2026-09-19 09:58", "delivered", "bank", 1, [[25, 1], [27, 1]], ""],
  ["DH26092205", 2, "2026-09-22 15:44", "delivered", "cod", 1, [[22, 1], [45, 1]], ""],
  ["DH26092703", 3, "2026-09-27 21:15", "cancelled", "cod", 1, [[6, 1], [44, 1]], ""],
  ["DH26092808", 7, "2026-09-28 18:25", "delivered", "bank", 1, [[40, 2], [41, 1]], ""],
  ["DH26100304", 4, "2026-10-03 13:07", "delivered", "cod", 1, [[38, 2], [39, 1]], ""],
  ["DH26100819", 19, "2026-10-08 19:30", "cancelled", "cod", 1, [[19, 1]], "Giao buổi tối"],
  ["DH26101203", 6, "2026-10-12 10:16", "cancelled", "cod", 1, [[35, 1]], ""],
  ["DH26101507", 1, "2026-10-15 20:30", "confirmed", "cod", 1, [[12, 1], [47, 2]], ""],
  ["DH26101809", 7, "2026-10-18 17:52", "delivered", "cod", 1, [[8, 1], [9, 1]], ""],
  ["DH26102009", 5, "2026-10-20 09:05", "delivered", "cod", 1, [[14, 1]], ""],
  ["DH26102204", 8, "2026-10-22 22:14", "delivered", "cod", 1, [[33, 1]], ""],
  ["DH26102506", 6, "2026-10-25 14:40", "confirmed", "bank", 1, [[16, 1], [50, 1]], ""],
  ["DH26102811", 2, "2026-10-28 19:20", "pending", "cod", 1, [[15, 1]], ""],
  ["DH26103002", 4, "2026-10-30 08:12", "confirmed", "bank", 1, [[26, 1]], ""],
  ["DH26103105", 4, "2026-10-31 16:40", "confirmed", "bank", 1, [[2, 1], [13, 1], [37, 3], [46, 2], [47, 4], [49, 2]], "Giao giờ hành chính, gọi trước 15 phút"],
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
    cancelReason: CANCEL_REASONS[id] ? { reason: CANCEL_REASONS[id][0], note: CANCEL_REASONS[id][1] } : null,
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
const SEARCH_RESULT_IDS = [1, 11, 21, 31, 37, 7, 12, 28, 38, 8, 14, 27, 33, 39, 2, 45];

// Đơn hàng vừa đặt (hiển thị ở trang đặt hàng thành công)
const LAST_ORDER_ID = "DH26110201";

// Cho phép script Node đọc dữ liệu để tạo hình (không ảnh hưởng trình duyệt)
if (typeof module !== "undefined") module.exports = { PRODUCTS, CATEGORIES };
