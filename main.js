// ============================================================
// DVK BOOKSTORE - HỆ THỐNG WEB BÁN SÁCH LUXURY
// Nhóm trưởng: Phan Thành Đạt
// ============================================================

const products = [
  ["Cây Cam Ngọt Của Tôi", "José Mauro de Vasconcelos", "Văn học", 86100, 108000, "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=85", "Bán chạy"],
  ["Tiệm Cà Phê Bên Bờ Biển", "John Strelecky", "Kỹ năng sống", 79200, 99000, "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=85", "Mới"],
  ["Tâm Lý Học Về Tiền", "Morgan Housel", "Kinh tế", 135200, 169000, "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=600&q=85", "Đề xuất"],
  ["Rừng Na Uy", "Haruki Murakami", "Văn học", 112500, 150000, "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=85", ""],
  ["Nhà Giả Kim", "Paulo Coelho", "Văn học", 63200, 79000, "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=85", "Kinh điển"],
  ["Tuổi Trẻ Đáng Giá Bao Nhiêu", "Rosie Nguyễn", "Kỹ năng sống", 72000, 90000, "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=600&q=85", ""],
  ["Muôn Kiếp Nhân Sinh", "Nguyên Phong", "Tâm linh", 126400, 158000, "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=600&q=85", ""],
  ["Dám Bị Ghét", "Koga Fumitake", "Tâm lý", 95200, 119000, "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=85", ""],
  ["Lược Sử Loài Người", "Yuval Noah Harari", "Lịch sử", 167200, 209000, "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&q=85", ""],
  ["Đi Tìm Lẽ Sống", "Viktor E. Frankl", "Tâm lý", 70400, 88000, "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=85", ""],
  ["Bắt Trẻ Đồng Xanh", "J.D. Salinger", "Văn học", 96000, 120000, "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=85", ""],
  ["Đắc Nhân Tâm", "Dale Carnegie", "Kỹ năng sống", 68000, 85000, "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=85", "Kinh điển"],
  ["Cha Giàu Cha Nghèo", "Robert Kiyosaki", "Kinh tế", 110000, 138000, "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=85", ""],
  ["Tư Duy Nhanh Và Chậm", "Daniel Kahneman", "Tâm lý", 175000, 219000, "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=85", ""],
  ["Homo Deus: Lược Sử Tương Lai", "Yuval Noah Harari", "Lịch sử", 180000, 225000, "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=85", ""],
  ["Nghĩ Giàu Làm Giàu", "Napoleon Hill", "Kinh tế", 88000, 110000, "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=85", ""],
  ["Chiến Binh Cầu Vồng", "Andrea Hirata", "Văn học", 89000, 109000, "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=85", "Cảm động"],
  ["Không Gia Đình", "Hector Malot", "Văn học", 115000, 145000, "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=85", ""],
  ["Đọc Vị Bất Kỳ Ai", "David J. Lieberman", "Tâm lý", 76000, 95000, "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=600&q=85", ""],
  ["Hành Trình Về Phương Đông", "Baird T. Spalding", "Tâm linh", 98000, 122000, "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=600&q=85", ""],
  ["Khởi Nghiệp Tinh Gọn", "Eric Ries", "Kinh tế", 128000, 160000, "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=85", "Đề xuất"],
  ["Tội Ác Và Trừng Phạt", "Fyodor Dostoevsky", "Văn học", 145000, 182000, "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=85", "Kinh điển"]
].map((item, index) => ({
  id: index + 1,
  title: item[0],
  author: item[1],
  category: item[2],
  price: item[3],
  oldPrice: item[4],
  image: item[5],
  tag: item[6],
  rating: index % 3 === 0 ? 4.9 : 4.8,
  sold: 620 + index * 120,
  stock: 25 + (index % 5) * 8,
  initialStock: 50 + (index % 5) * 10,
  hidden: false,
}));

const categories = ["Tất cả", "Văn học", "Kỹ năng sống", "Kinh tế", "Tâm lý", "Tâm linh", "Lịch sử"];

// ============================================================
// Dữ liệu người dùng & Đơn hàng mẫu
// ============================================================
const users = [
  { id: 1, name: "Nguyễn Minh Anh", email: "minhanh@gmail.com", password: "123", phone: "090 123 4567", address: "12 Võ Văn Ngân, TP. Thủ Đức, TP.HCM", status: "active" },
  { id: 2, name: "Lê Gia Hân", email: "giahan@gmail.com", password: "123", phone: "091 234 5678", address: "45 Lê Lợi, Quận 1, TP.HCM", status: "active" },
  { id: 3, name: "Trần Minh Khoa", email: "khoa@gmail.com", password: "123", phone: "098 765 4321", address: "88 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM", status: "locked" },
  { id: 4, name: "Nguyễn Hoài An", email: "hoaian@gmail.com", password: "123", phone: "093 345 6789", address: "102 Nguyễn Thị Thập, Quận 7, TP.HCM", status: "active" },
  { id: 5, name: "Phạm Thu Trang", email: "thutrang@gmail.com", password: "123", phone: "097 888 9999", address: "24 Quang Trung, Quận Gò Vấp, TP.HCM", status: "active" },
];

const orders = [
  {
    id: "DVK250518",
    userId: 2,
    userName: "Lê Gia Hân",
    userPhone: "091 234 5678",
    date: "18/05/2025",
    dateIso: "2025-05-18",
    items: [
      { id: 3, title: "Tâm Lý Học Về Tiền", author: "Morgan Housel", price: 135200, quantity: 2, image: products[2].image },
      { id: 9, title: "Lược Sử Loài Người", author: "Yuval Noah Harari", price: 167200, quantity: 2, image: products[8].image },
    ],
    total: 604800,
    address: "45 Lê Lợi, Quận 1, TP.HCM",
    payment: "Trực tuyến",
    status: "Đã giao",
  },
  {
    id: "DVK250515",
    userId: 1,
    userName: "Nguyễn Minh Anh",
    userPhone: "090 123 4567",
    date: "15/05/2025",
    dateIso: "2025-05-15",
    items: [
      { id: 1, title: "Cây Cam Ngọt Của Tôi", author: "José Mauro de Vasconcelos", price: 86100, quantity: 2, image: products[0].image },
      { id: 2, title: "Tiệm Cà Phê Bên Bờ Biển", author: "John Strelecky", price: 79200, quantity: 1, image: products[1].image },
    ],
    total: 251400,
    address: "12 Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
    payment: "Tiền mặt (COD)",
    status: "Đã giao",
  },
  {
    id: "DVK250512",
    userId: 5,
    userName: "Phạm Thu Trang",
    userPhone: "097 888 9999",
    date: "12/05/2025",
    dateIso: "2025-05-12",
    items: [
      { id: 4, title: "Rừng Na Uy", author: "Haruki Murakami", price: 112500, quantity: 2, image: products[3].image },
    ],
    total: 225000,
    address: "24 Quang Trung, Quận Gò Vấp, TP.HCM",
    payment: "Trực tuyến",
    status: "Đã xác nhận",
  },
  {
    id: "DVK250508",
    userId: 3,
    userName: "Trần Minh Khoa",
    userPhone: "098 765 4321",
    date: "08/05/2025",
    dateIso: "2025-05-08",
    items: [
      { id: 5, title: "Nhà Giả Kim", author: "Paulo Coelho", price: 63200, quantity: 3, image: products[4].image },
    ],
    total: 189600,
    address: "88 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    payment: "Tiền mặt (COD)",
    status: "Chưa xác nhận",
  },
  {
    id: "DVK250504",
    userId: 4,
    userName: "Nguyễn Hoài An",
    userPhone: "093 345 6789",
    date: "04/05/2025",
    dateIso: "2025-05-04",
    items: [
      { id: 8, title: "Dám Bị Ghét", author: "Koga Fumitake", price: 95200, quantity: 1, image: products[7].image },
      { id: 10, title: "Đi Tìm Lẽ Sống", author: "Viktor E. Frankl", price: 70400, quantity: 1, image: products[9].image },
    ],
    total: 165600,
    address: "102 Nguyễn Thị Thập, Quận 7, TP.HCM",
    payment: "Tiền mặt (COD)",
    status: "Chưa xác nhận",
  },
  {
    id: "DVK250502",
    userId: 2,
    userName: "Lê Gia Hân",
    userPhone: "091 234 5678",
    date: "02/05/2025",
    dateIso: "2025-05-02",
    items: [
      { id: 7, title: "Muôn Kiếp Nhân Sinh", author: "Nguyên Phong", price: 126400, quantity: 2, image: products[6].image },
    ],
    total: 252800,
    address: "45 Lê Lợi, Quận 1, TP.HCM",
    payment: "Trực tuyến",
    status: "Đã giao",
  },
];

// Dữ liệu mẫu Phiếu nhập kho (Admin)
const stockReceipts = [
  { id: "PN250510", date: "10/05/2025", supplier: "NXB Trẻ", creator: "Admin Phan", total: 15400000, itemsCount: 120, status: "Đã nhập kho" },
  { id: "PN250505", date: "05/05/2025", supplier: "NXB Kim Đồng", creator: "Admin Phan", total: 8900000, itemsCount: 85, status: "Đã nhập kho" },
  { id: "PN250428", date: "28/04/2025", supplier: "NXB Nhã Nam", creator: "Admin Phan", total: 22600000, itemsCount: 180, status: "Đã nhập kho" },
  { id: "PN250420", date: "20/04/2025", supplier: "NXB Phụ Nữ", creator: "Admin Phan", total: 6450000, itemsCount: 50, status: "Đã nhập kho" },
];

function getOrderDateIso(order) {
  if (order.dateIso) return order.dateIso;
  if (order.date && order.date.includes("/")) {
    const parts = order.date.split("/");
    if (parts.length === 3) return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
  }
  return order.date || "";
}

function getOrderDateDisplay(order) {
  const iso = getOrderDateIso(order);
  if (iso && iso.includes("-")) {
    const parts = iso.split("-");
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return order.date || "";
}

// ============================================================
// State quản lý ứng dụng
// Giỏ hàng được tạo sẵn dữ liệu mẫu theo yêu cầu
// ============================================================
const state = {
  admin: location.hash === "#admin",
  adminLoggedIn: false,
  adminUser: "Admin",
  category: "Tất cả",
  search: "",
  maxPrice: 220000,
  page: 1,
  // Dữ liệu mẫu có sẵn trong giỏ hàng khi mở web
  cart: [
    {
      id: 1,
      title: "Cây Cam Ngọt Của Tôi",
      author: "José Mauro de Vasconcelos",
      price: 86100,
      quantity: 1,
      image: products[0].image,
    },
    {
      id: 3,
      title: "Tâm Lý Học Về Tiền",
      author: "Morgan Housel",
      price: 135200,
      quantity: 2,
      image: products[2].image,
    },
  ],
  adminTab: "Tổng quan",
  currentUser: null,
  adminOrderFilter: {
    status: "Tất cả",
    from: "",
    to: "",
    location: "Tất cả",
  },
  adminStatFilter: {
    from: "2025-05-01",
    to: "2025-05-31",
  },
};

const app = document.querySelector("#app");
const money = (number) => `${number.toLocaleString("vi-VN")}₫`;

const icon = (name, size = 20) => {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    cart: '<path d="M3 4h2l2 10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-6H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    arrow: '<path d="m9 18 6-6-6-6"/>',
    heart: '<path d="M20 5a5 5 0 0 0-7 0l-1 1-1-1a5 5 0 0 0-7 7l8 8 8-8a5 5 0 0 0 0-7Z"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    box: '<path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z"/>',
    chart: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M17 14a7 7 0 0 1 5 7"/>',
    orders: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    logout: '<path d="m10 17 5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    warehouse: '<path d="M3 21h18M3 7l9-4 9 4v14H3V7Zm6 4h6v10H9V11Z"/>',
    fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ""}</svg>`;
};

// ============================================================
// Logo Luxury: DVK BOOKSTORE với biểu tượng cuốn sách mạ vàng
// ============================================================
function logo() {
  return `
    <div class="lux-logo">
      <div class="lux-logo-badge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M6 6h10"/>
          <path d="M6 10h10"/>
          <path d="M6 14h7"/>
        </svg>
      </div>
      <div class="lux-logo-text">
        <b>DVK</b>
        <small>BOOKSTORE</small>
      </div>
    </div>
  `;
}

function showToast(message) {
  document.querySelector(".toast")?.remove();
  document.body.insertAdjacentHTML("beforeend", `<div class="toast">${icon("check")}${message}</div>`);
  setTimeout(() => document.querySelector(".toast")?.remove(), 2500);
}

// Lọc sản phẩm
function filteredProducts() {
  return products.filter((product) => {
    if (product.hidden) return false;
    const text = `${product.title} ${product.author}`.toLowerCase();
    return text.includes(state.search.toLowerCase())
      && (state.category === "Tất cả" || product.category === state.category)
      && product.price <= state.maxPrice;
  });
}

// Danh sách thẻ sản phẩm (8 cuốn / trang)
function productCards() {
  const list = filteredProducts();
  const visible = list.slice((state.page - 1) * 8, state.page * 8);
  if (!visible.length) {
    return `<div class="empty">${icon("search", 38)}<h3>Chưa tìm thấy cuốn sách phù hợp</h3><p>Hãy thử thay đổi từ khóa hoặc khoảng giá lọc.</p></div>`;
  }
  return `<div class="product-grid">${visible.map((product) => `
    <article class="product-card">
      <div class="cover" data-detail="${product.id}">
        <img src="${product.image}" alt="Bìa sách ${product.title}" loading="lazy">
        ${product.tag ? `<span>${product.tag}</span>` : ""}
        <button class="wish" data-wish="${product.id}" title="Yêu thích">${icon("heart", 18)}</button>
        <button class="quick" data-detail="${product.id}">Xem nhanh</button>
      </div>
      <div class="card-info">
        <small>${product.category}</small>
        <h3 data-detail="${product.id}" title="${product.title}">${product.title}</h3>
        <p>${product.author}</p>
        <div class="rating"><span>★</span> ${product.rating} <i>(${product.sold})</i></div>
        <div class="price">
          <b>${money(product.price)}</b>
          <del>${money(product.oldPrice)}</del>
          <button data-add="${product.id}" title="Thêm vào giỏ">${icon("cart", 18)}</button>
        </div>
      </div>
    </article>`).join("")}</div>`;
}

// Phân trang: Bấm qua trang giữ nguyên bộ lọc, chuyển trang chính xác
function pagination() {
  const total = filteredProducts().length;
  const pageCount = Math.max(1, Math.ceil(total / 8));
  return `<div class="pagination">
    <button data-page="${state.page - 1}" ${state.page <= 1 ? "disabled" : ""}>Trước</button>
    ${Array.from({ length: pageCount }, (_, index) => `
      <button data-page="${index + 1}" class="${state.page === index + 1 ? "active" : ""}">${index + 1}</button>
    `).join("")}
    <button data-page="${state.page + 1}" ${state.page >= pageCount ? "disabled" : ""}>Sau</button>
  </div>`;
}

// Template trang người dùng
function storeTemplate() {
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return `
  <div class="storefront">
    <div class="topbar">
      <span>Miễn phí giao hàng cho đơn từ 300.000₫ · Trưởng nhóm: Phan Thành Đạt</span>
      <div>
        <button data-history>Tra cứu đơn hàng</button>
        <i></i>
        <button data-to-contact>Liên hệ</button>
        <i></i>
        <button data-admin>Kênh quản trị</button>
      </div>
    </div>
    <header>
      <button class="brand" data-home>${logo()}</button>
      <div class="search-wrap">
        ${icon("search")}
        <input id="search" value="${state.search}" placeholder="Tìm sách, tác giả (gõ để xem gợi ý, nhấn Enter để lọc)..." autocomplete="off">
        <button id="filterButton">Bộ lọc</button>
        <ul id="searchSuggestions" class="search-suggestions" hidden></ul>
        <div class="advanced-filter" id="advancedFilter" hidden>
          <div><b>Tìm kiếm nâng cao</b><button id="closeFilter">${icon("close", 16)}</button></div>
          <label>Phân loại
            <select id="filterCategory">
              ${categories.map((item) => `<option ${state.category === item ? "selected" : ""}>${item}</option>`).join("")}
            </select>
          </label>
          <label>Giá tối đa <strong id="priceText">${money(state.maxPrice)}</strong>
            <input id="priceRange" type="range" min="60000" max="220000" step="10000" value="${state.maxPrice}">
          </label>
          <button id="btnApplyAdvancedFilter" class="primary-action" style="margin-top:14px;padding:8px">Áp dụng lọc (Enter)</button>
        </div>
      </div>
      <div class="header-actions">
        <button data-account>
          ${icon("user")}
          <span>
            <small>${state.currentUser ? "Xin chào" : "Chưa đăng nhập"}</small>
            <b>${state.currentUser ? state.currentUser.name : "Đăng nhập"}</b>
          </span>
        </button>
        ${state.currentUser ? `<button data-logout style="border:0;background:transparent;color:var(--forest);font-size:11px;cursor:pointer;display:flex;align-items:center;gap:4px">${icon("logout", 16)} Đăng xuất</button>` : ""}
        <button class="cart-btn" data-cart>
          ${icon("cart")}
          <span><small>Giỏ hàng</small><b>${money(total)}</b></span>
          ${count ? `<em>${count}</em>` : ""}
        </button>
      </div>
    </header>
    <nav class="category-nav">
      <button class="all-category">${icon("menu")}Danh mục sách</button>
      ${categories.slice(1, 6).map((item) => `<button data-category="${item}" class="${state.category === item ? "active" : ""}">${item}</button>`).join("")}
      <span></span>
      <button data-notify="Mã ưu đãi đã được lưu vào sổ tay">Ưu đãi hôm nay</button>
    </nav>
    <main>
      <section class="hero">
        <div class="hero-content">
          <span class="hero-kicker">Tuần lễ đọc sách DVK 2025</span>
          <h1>Mở một trang sách,<br><em>chạm cả thế giới.</em></h1>
          <p>Tuyển tập những cuốn sách kinh điển nuôi dưỡng tâm hồn, mở rộng tư duy và đồng hành cùng bạn mỗi ngày.</p>
          <button id="explore">Khám phá ngay ${icon("arrow")}</button>
          <div class="hero-dots"><i class="active"></i><i></i><i></i></div>
        </div>
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1784753390058-7dca350296d3?auto=format&fit=crop&w=1100&q=85" alt="Kệ sách đầy nắng">
          <div class="hero-quote"><b>20%</b><span>Ưu đãi cho<br>sách chọn lọc</span></div>
        </div>
      </section>
      <section class="benefits">
        <div><span>${icon("box")}</span><p><b>Giao hàng toàn quốc</b><small>Đóng gói cẩn thận, giao nhanh</small></p></div>
        <div><span>${icon("check")}</span><p><b>Sách chính hãng</b><small>Cam kết 100% từ NXB</small></p></div>
        <div><span>↺</span><p><b>Đổi trả dễ dàng</b><small>Trong vòng 7 ngày</small></p></div>
        <div><span>◇</span><p><b>Tích điểm thành viên</b><small>Càng đọc càng nhiều ưu đãi</small></p></div>
      </section>
      <section class="catalog" id="catalog">
        <div class="section-heading">
          <div><span class="eyebrow">Được yêu thích</span><h2>Sách dành cho bạn</h2></div>
          <div class="tabs">${categories.slice(0, 5).map((item) => `<button data-category="${item}" class="${state.category === item ? "active" : ""}">${item}</button>`).join("")}</div>
        </div>
        <div id="productArea">${productCards()}${pagination()}</div>
      </section>

      <!-- Section Liên Hệ theo yêu cầu (Nhóm trưởng Phan Thành Đạt) -->
      <section class="contact-section" id="contact">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Hỗ trợ & Đồng hành</span>
            <h2>Liên hệ với DVK Bookstore</h2>
          </div>
        </div>
        <div class="contact-grid">
          <div class="leader-card">
            <span class="leader-badge">TRƯỞNG NHÓM DỰ ÁN</span>
            <h3>Phan Thành Đạt</h3>
            <p>Trưởng nhóm dự án DVK Bookstore. Chúng tôi cam kết mang đến không gian mua sắm sách tiện ích, chính hãng và hỗ trợ tận tình cho quý độc giả.</p>
            <div class="contact-details">
              <div class="contact-item"><b>Họ và tên:</b> <span>Phan Thành Đạt</span></div>
              <div class="contact-item"><b>Vai trò:</b> <span>Nhóm trưởng điều hành</span></div>
              <div class="contact-item"><b>Hotline:</b> <span>1900 2828 · 0909 123 456</span></div>
              <div class="contact-item"><b>Email:</b> <span>phanthanhdat@dvkbooks.vn</span></div>
              <div class="contact-item"><b>Địa chỉ:</b> <span>Khu Đô Thị Đại Học, TP. Thủ Đức, TP. Hồ Chí Minh</span></div>
              <div class="contact-item"><b>Giờ hỗ trợ:</b> <span>08:00 – 21:30 (Thứ 2 đến Chủ nhật)</span></div>
            </div>
          </div>
          <div class="contact-form-card">
            <h4>Gửi phản hồi cho nhóm trưởng</h4>
            <input type="text" id="contactSenderName" placeholder="Họ và tên quý khách" value="Nguyễn Văn A">
            <input type="email" id="contactSenderEmail" placeholder="Địa chỉ email" value="nguyenvana@gmail.com">
            <input type="tel" id="contactSenderPhone" placeholder="Số điện thoại" value="0901234567">
            <textarea id="contactSenderMsg" placeholder="Nội dung cần liên hệ hoặc phản hồi cho nhóm trưởng Phan Thành Đạt...">Em muốn tìm hiểu thêm về các đầu sách mới tại DVK Bookstore.</textarea>
            <button type="button" id="btnSubmitContact">Gửi thông tin liên hệ</button>
          </div>
        </div>
      </section>

      <section class="newsletter">
        <div>
          <span class="eyebrow">Thư từ DVK</span>
          <h2>Mỗi tuần một câu chuyện hay.</h2>
          <p>Nhận gợi ý sách tuyển chọn và ưu đãi riêng dành cho bạn.</p>
        </div>
        <form id="newsletter">
          <input type="email" required placeholder="Email của bạn" value="bandoc@gmail.com">
          <button type="submit">Đăng ký</button>
        </form>
      </section>
    </main>
    <footer>
      <div class="footer-brand">
        <div class="brand">${logo()}</div>
        <p>Nơi mỗi cuốn sách tìm thấy đúng người đọc của mình. Bản quyền thuộc nhóm phát triển DVK Bookstore.</p>
      </div>
      <div>
        <b>Khám phá</b>
        <a>Sách mới xuất bản</a>
        <a>Sách bán chạy nhất</a>
        <a>Tác giả tiêu biểu</a>
      </div>
      <div>
        <b>Chính sách</b>
        <a>Chính sách bảo mật</a>
        <a>Vận chuyển & Giao nhận</a>
        <a>Đổi trả 7 ngày</a>
      </div>
      <div>
        <b>Liên hệ điều hành</b>
        <a>Nhóm trưởng: Phan Thành Đạt</a>
        <a>phanthanhdat@dvkbooks.vn</a>
        <a>Hotline: 1900 2828</a>
        <a>TP. Thủ Đức, TP. Hồ Chí Minh</a>
      </div>
    </footer>
  </div>
  `;
}

function renderStore() {
  app.innerHTML = storeTemplate();
  bindStoreEvents();
}

function refreshProducts() {
  const container = document.querySelector("#productArea");
  if (container) {
    container.innerHTML = `${productCards()}${pagination()}`;
    bindProductEvents();
  }
}

// ============================================================
// Event Binding cho sản phẩm & phân trang
// Yêu cầu: Bấm "Thêm vào giỏ" chỉ hiện thông báo, không nhảy giỏ
// ============================================================
function bindProductEvents() {
  // Thêm vào giỏ: chỉ hiện thông báo "Thêm thành công"
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      showToast("Thêm thành công");
    });
  });

  document.querySelectorAll("[data-detail]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (!event.target.closest("[data-wish]") && !event.target.closest("[data-add]")) {
        showProduct(Number(element.dataset.detail));
      }
    });
  });

  document.querySelectorAll("[data-wish]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showToast("Đã thêm vào danh sách yêu thích");
    });
  });

  // Phân trang: Bấm qua trang giữ nguyên các bộ lọc
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetPage = Number(button.dataset.page);
      if (targetPage >= 1) {
        state.page = targetPage;
        refreshProducts();
        document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ============================================================
// Tìm kiếm gợi ý (Search Suggest / Autocomplete) & Phím tắt Enter
// ============================================================
function updateSearchSuggestions(keyword) {
  const suggestEl = document.querySelector("#searchSuggestions");
  if (!suggestEl) return;

  const kw = keyword.trim().toLowerCase();
  if (!kw) {
    suggestEl.hidden = true;
    suggestEl.innerHTML = "";
    return;
  }

  const matches = products.filter((p) =>
    !p.hidden && (p.title.toLowerCase().includes(kw) || p.author.toLowerCase().includes(kw))
  ).slice(0, 6);

  if (!matches.length) {
    suggestEl.innerHTML = `<li style="padding:10px 14px;color:#8a948e;font-size:11px">Không có sách phù hợp từ khóa "${keyword}"</li>`;
    suggestEl.hidden = false;
    return;
  }

  suggestEl.innerHTML = matches.map((p) => `
    <li class="suggestion-item" data-suggest-id="${p.id}">
      <img src="${p.image}" alt="${p.title}">
      <div class="sugg-info">
        <div class="sugg-title">${p.title}</div>
        <div class="sugg-author">${p.author} · <span style="color:#718276">${p.category}</span></div>
      </div>
      <div class="sugg-price">${money(p.price)}</div>
    </li>
  `).join("");

  suggestEl.hidden = false;

  suggestEl.querySelectorAll("[data-suggest-id]").forEach((item) => {
    item.addEventListener("click", () => {
      const id = Number(item.dataset.suggestId);
      const chosen = products.find((p) => p.id === id);
      if (chosen) {
        document.querySelector("#search").value = chosen.title;
        state.search = chosen.title;
        state.page = 1;
        suggestEl.hidden = true;
        refreshProducts();
        showProduct(id);
      }
    });
  });
}

function bindStoreEvents() {
  bindProductEvents();

  const searchInput = document.querySelector("#search");
  const suggestEl = document.querySelector("#searchSuggestions");

  // Gõ phím tìm kiếm -> hiện gợi ý ngay
  searchInput?.addEventListener("input", (e) => {
    state.search = e.target.value;
    state.page = 1;
    updateSearchSuggestions(e.target.value);
    refreshProducts();
  });

  // Phím tắt Enter ở ô tìm kiếm
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      suggestEl.hidden = true;
      state.page = 1;
      refreshProducts();
      document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Đóng gợi ý khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) {
      if (suggestEl) suggestEl.hidden = true;
    }
  });

  // Bộ lọc nâng cao & Phím tắt Enter
  document.querySelector("#filterButton")?.addEventListener("click", () => {
    const filterBox = document.querySelector("#advancedFilter");
    filterBox.hidden = !filterBox.hidden;
  });

  document.querySelector("#closeFilter")?.addEventListener("click", () => {
    document.querySelector("#advancedFilter").hidden = true;
  });

  document.querySelector("#filterCategory")?.addEventListener("change", (event) => {
    state.category = event.target.value;
    state.page = 1;
    refreshProducts();
  });

  document.querySelector("#priceRange")?.addEventListener("input", (event) => {
    state.maxPrice = Number(event.target.value);
    document.querySelector("#priceText").textContent = money(state.maxPrice);
    state.page = 1;
    refreshProducts();
  });

  document.querySelector("#btnApplyAdvancedFilter")?.addEventListener("click", () => {
    document.querySelector("#advancedFilter").hidden = true;
    state.page = 1;
    refreshProducts();
    document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
  });

  // Điều hướng danh mục
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      state.page = 1;
      renderStore();
      document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelector("[data-admin]")?.addEventListener("click", () => {
    location.hash = "admin";
  });

  document.querySelector("[data-home]")?.addEventListener("click", () => {
    state.category = "Tất cả";
    state.search = "";
    state.page = 1;
    renderStore();
  });

  document.querySelector("[data-cart]")?.addEventListener("click", showCart);
  document.querySelector("[data-account]")?.addEventListener("click", showAccount);

  document.querySelector("[data-history]")?.addEventListener("click", () => {
    showHistory();
  });

  document.querySelector("[data-to-contact]")?.addEventListener("click", () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  });

  document.querySelector("[data-logout]")?.addEventListener("click", () => {
    state.currentUser = null;
    renderStore();
    showToast("Đã đăng xuất. Hẹn gặp lại quý khách!");
  });

  document.querySelector("#explore")?.addEventListener("click", () => {
    document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
  });

  document.querySelector("#newsletter")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Đăng ký nhận tin thành công!");
  });

  document.querySelectorAll("[data-notify]").forEach((btn) => {
    btn.addEventListener("click", () => showToast(btn.dataset.notify));
  });

  // Nút gửi liên hệ cho nhóm trưởng Phan Thành Đạt
  document.querySelector("#btnSubmitContact")?.addEventListener("click", () => {
    showToast("Gửi tin nhắn liên hệ thành công! Trưởng nhóm Phan Thành Đạt sẽ phản hồi sớm.");
  });
}

function modal(content, className) {
  document.body.insertAdjacentHTML("beforeend", `<div class="modal-backdrop" id="modal"><div class="${className}"><button class="modal-close" data-close>${icon("close")}</button>${content}</div></div>`);
  document.querySelector("[data-close]").addEventListener("click", closeModal);
}

function closeModal() {
  document.querySelector("#modal")?.remove();
}

// Modal chi tiết sách - bấm Thêm vào giỏ chỉ hiện thông báo
function showProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  modal(`
    <div class="modal-cover"><img src="${product.image}" alt="${product.title}"></div>
    <div class="modal-detail">
      <span class="eyebrow">${product.category}</span>
      <h2>${product.title}</h2>
      <p class="modal-author">Tác giả: <b>${product.author}</b></p>
      <div class="rating big"><span>★</span> ${product.rating} <i>· Đã bán ${product.sold}</i></div>
      <div class="modal-price">${money(product.price)} <del>${money(product.oldPrice)}</del><em>-20%</em></div>
      <p class="description">Một tác phẩm văn hóa giá trị, được chọn lọc kỹ lưỡng bởi DVK Bookstore, mang đến niềm cảm hứng và tri thức tuyệt vời.</p>
      <div class="stock"><i></i>Còn ${product.stock} cuốn trong kho</div>
      <button class="primary-action" id="modalAdd">${icon("cart")}Thêm vào giỏ hàng</button>
      <small class="delivery-note">Giao hàng dự kiến 2–4 ngày · Miễn phí đổi trả trong 7 ngày</small>
    </div>
  `, "product-modal");

  document.querySelector("#modalAdd").addEventListener("click", () => {
    closeModal();
    showToast("Thêm thành công");
  });
}

// Modal xem giỏ hàng
function showCart() {
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  document.body.insertAdjacentHTML("beforeend", `
    <div class="drawer-layer" id="modal">
      <aside>
        <div class="drawer-head">
          <div><span class="eyebrow">Giỏ sách của bạn</span><h2>${state.cart.length} sản phẩm mẫu</h2></div>
          <button data-close>${icon("close")}</button>
        </div>
        <div class="cart-list">
          ${state.cart.length ? state.cart.map((item) => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.title}">
              <div>
                <h4>${item.title}</h4>
                <small>${item.author}</small>
                <b>${money(item.price)}</b>
                <div class="quantity">
                  <button data-quantity="${item.id}" data-amount="-1">−</button>
                  <span>${item.quantity}</span>
                  <button data-quantity="${item.id}" data-amount="1">+</button>
                </div>
              </div>
            </div>
          `).join("") : `<div class="empty">${icon("cart", 42)}<h3>Giỏ hàng đang trống</h3><p>Chọn một cuốn sách để bắt đầu nhé.</p></div>`}
        </div>
        ${state.cart.length ? `
          <div class="cart-bottom">
            <div><span>Tạm tính</span><b>${money(total)}</b></div>
            <small>Miễn phí giao hàng toàn quốc từ DVK Bookstore</small>
            <button id="checkout">Tiến hành đặt hàng ${icon("arrow")}</button>
          </div>
        ` : ""}
      </aside>
    </div>
  `);

  document.querySelector("[data-close]").addEventListener("click", closeModal);

  document.querySelectorAll("[data-quantity]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.cart.find((cartItem) => cartItem.id === Number(button.dataset.quantity));
      if (item) {
        item.quantity += Number(button.dataset.amount);
        state.cart = state.cart.filter((cartItem) => cartItem.quantity > 0);
        closeModal();
        showCart();
      }
    });
  });

  document.querySelector("#checkout")?.addEventListener("click", showCheckout);
}

// Modal thanh toán - Bấm Đặt hàng chỉ hiện thông báo "Thanh toán thành công"
function showCheckout() {
  closeModal();
  const user = state.currentUser || { name: "Quý khách", phone: "090 123 4567", address: "12 Võ Văn Ngân, TP. Thủ Đức, TP.HCM" };
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  modal(`
    <span class="eyebrow">Hoàn tất đơn hàng</span>
    <h2>Thông tin giao hàng</h2>
    <div class="checkout-grid">
      <div>
        <h4>Địa chỉ nhận hàng</h4>
        <label class="radio-card">
          <input type="radio" name="address" value="saved" checked>
          <span><b>${user.name} · ${user.phone}</b><small>${user.address}</small></span>
        </label>
        <textarea id="newAddress" placeholder="Ghi chú giao hàng hoặc địa chỉ khác">${user.address}</textarea>
        <h4>Hình thức thanh toán</h4>
        <label class="radio-card"><input type="radio" name="payment" value="cod" checked><span><b>Thanh toán khi nhận hàng</b><small>Tiền mặt (COD)</small></span></label>
        <label class="radio-card"><input type="radio" name="payment" value="online"><span><b>Thanh toán trực tuyến</b><small>Thẻ ngân hàng / Chuyển khoản QR</small></span></label>
      </div>
      <div class="order-summary">
        <h4>Tóm tắt đơn hàng</h4>
        <p><span>Tạm tính</span><b>${money(total)}</b></p>
        <p><span>Phí vận chuyển</span><b>Miễn phí</b></p>
        <hr>
        <p class="summary-total"><span>Tổng cộng</span><b>${money(total)}</b></p>
        <button id="finishOrder">Xác nhận đặt hàng</button>
      </div>
    </div>
  `, "checkout-modal");

  document.querySelector("#finishOrder").addEventListener("click", () => {
    closeModal();
    showToast("Thanh toán thành công");
  });
}

// ============================================================
// Đăng nhập / Đăng ký Khách hàng:
// Có sẵn mẫu email/mật khẩu, nhập gì cũng cho vào
// ============================================================
function showAccount() {
  if (state.currentUser) {
    const u = state.currentUser;
    modal(`
      <div class="account-art">
        <div class="brand">${logo()}</div>
        <h2>Chào bạn,<br>${u.name}.</h2>
        <p>Thành viên thân thiết của DVK Bookstore. Cảm ơn bạn đã đồng hành cùng văn hóa đọc.</p>
      </div>
      <div class="account-form">
        <span class="eyebrow">Tài khoản khách hàng</span>
        <h2>Thông tin cá nhân</h2>
        <div style="margin:16px 0;font-size:13px;line-height:2;color:var(--ink);background:#f6f6f1;padding:16px;border-radius:8px">
          <div><b style="color:var(--forest)">Họ và tên:</b> ${u.name}</div>
          <div><b style="color:var(--forest)">Email:</b> ${u.email}</div>
          <div><b style="color:var(--forest)">Số điện thoại:</b> ${u.phone}</div>
          <div><b style="color:var(--forest)">Địa chỉ:</b> ${u.address}</div>
        </div>
        <button class="primary-action" id="myOrdersBtn">${icon("orders")} Xem lịch sử mua hàng</button>
        <button type="button" class="text-btn" id="logoutProfileBtn" style="margin-top:12px;color:#ba6654">${icon("logout", 16)} Đăng xuất tài khoản</button>
      </div>
    `, "account-modal");

    document.querySelector("#myOrdersBtn")?.addEventListener("click", () => {
      closeModal();
      showHistory();
    });
    document.querySelector("#logoutProfileBtn")?.addEventListener("click", () => {
      state.currentUser = null;
      closeModal();
      renderStore();
      showToast("Đã đăng xuất thành công!");
    });
    return;
  }

  const artHtml = `
    <div class="account-art">
      <div class="brand">${logo()}</div>
      <h2>Chào bạn,<br>người yêu sách.</h2>
      <p>Hệ thống hỗ trợ tài khoản mẫu sẵn. Quý khách có thể bấm Đăng nhập ngay hoặc nhập bất kỳ thông tin nào.</p>
    </div>
  `;

  // Cho sẵn email và mật khẩu mẫu, nhập gì cũng cho vào
  const loginHtml = `
    <form class="account-form" id="accountForm">
      <span class="eyebrow">Chào mừng đến DVK</span>
      <h2>Đăng nhập</h2>
      <label>Email khách hàng
        <input type="text" id="loginEmail" required value="khachhang@dvkbooks.vn" placeholder="Nhập bất kỳ email nào">
      </label>
      <label>Mật khẩu
        <input type="password" id="loginPassword" required value="123456" placeholder="Nhập bất kỳ mật khẩu nào">
      </label>
      <small style="color:var(--muted);display:block;margin-top:6px;font-size:11px">Hệ thống đã điền sẵn tài khoản mẫu, nhập bất kỳ thông tin nào cũng được chấp nhận.</small>
      <button class="primary-action" type="submit">Đăng nhập</button>
      <button type="button" class="text-btn" id="switchToRegister">Chưa có tài khoản? Đăng ký ngay</button>
      <button type="button" class="order-link" id="accountHistory">${icon("orders")} Xem lịch sử mua hàng</button>
    </form>
  `;

  const registerHtml = `
    <form class="account-form" id="registerForm">
      <span class="eyebrow">Tạo tài khoản mới</span>
      <h2>Đăng ký</h2>
      <label>Họ và tên<input id="regName" required value="Nguyễn Văn A" placeholder="Nhập họ tên"></label>
      <label>Email<input type="email" id="regEmail" required value="nguyenvana@gmail.com" placeholder="Nhập email"></label>
      <label>Số điện thoại<input id="regPhone" required value="0901234567" placeholder="Số điện thoại"></label>
      <label>Địa chỉ<input id="regAddress" required value="12 Võ Văn Ngân, TP. Thủ Đức" placeholder="Địa chỉ"></label>
      <label>Mật khẩu<input type="password" id="regPassword" required value="123456" placeholder="Mật khẩu"></label>
      <button class="primary-action" type="submit">Tạo tài khoản</button>
      <button type="button" class="text-btn" id="switchToLogin">Đã có tài khoản? Đăng nhập</button>
    </form>
  `;

  modal(artHtml + loginHtml, "account-modal");

  function bindLogin() {
    document.querySelector("#accountForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#loginEmail").value.trim() || "khachhang@dvkbooks.vn";
      // Nhập cái gì cũng cho vào
      const found = users.find((u) => u.email === email) || {
        id: 99,
        name: email.split("@")[0] || "Quý khách",
        email,
        phone: "090 123 4567",
        address: "TP. Hồ Chí Minh",
        status: "active"
      };
      state.currentUser = found;
      closeModal();
      renderStore();
      showToast(`Đăng nhập thành công! Chào mừng ${state.currentUser.name}`);
    });

    document.querySelector("#switchToRegister")?.addEventListener("click", () => {
      document.querySelector(".account-modal").innerHTML = `<button class="modal-close" data-close>${icon("close")}</button>` + artHtml + registerHtml;
      document.querySelector("[data-close]").addEventListener("click", closeModal);
      bindRegister();
    });

    document.querySelector("#accountHistory")?.addEventListener("click", () => {
      closeModal();
      showHistory();
    });
  }

  function bindRegister() {
    document.querySelector("#registerForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      closeModal();
      showToast("Đăng ký thành công");
    });

    document.querySelector("#switchToLogin")?.addEventListener("click", () => {
      document.querySelector(".account-modal").innerHTML = `<button class="modal-close" data-close>${icon("close")}</button>` + artHtml + loginHtml;
      document.querySelector("[data-close]").addEventListener("click", closeModal);
      bindLogin();
    });
  }

  bindLogin();
}

// Modal Lịch sử mua hàng
function showHistory() {
  const list = orders;
  const historyRows = list.length
    ? list.map((o) => `
      <div class="history-order">
        <div><b>Đơn #${o.id}</b><small>Đặt ngày ${getOrderDateDisplay(o)}</small></div>
        <span>${o.status}</span>
        <strong>${money(o.total)}</strong>
        <button class="detail-btn" data-order-id="${o.id}">Chi tiết ${icon("arrow", 15)}</button>
      </div>
    `).join("")
    : `<div class="empty">${icon("orders", 38)}<h3>Chưa có đơn hàng nào</h3></div>`;

  modal(`<span class="eyebrow">Hệ thống DVK</span><h2>Lịch sử mua hàng (${list.length} đơn)</h2>${historyRows}`, "history-modal");

  document.querySelectorAll(".detail-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const order = orders.find((o) => o.id === btn.dataset.orderId);
      if (!order) return;
      closeModal();
      const itemRows = order.items.map((item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="">
          <div><h4>${item.title}</h4><small>${item.author}</small><b>${money(item.price)} × ${item.quantity}</b></div>
        </div>
      `).join("");

      modal(`
        <span class="eyebrow">Chi tiết đơn hàng</span>
        <h2>Đơn #${order.id}</h2>
        <div style="font-size:12px;color:var(--muted);line-height:1.8;margin:10px 0 15px">
          <p style="margin:3px 0"><b style="color:var(--ink)">Ngày đặt:</b> ${getOrderDateDisplay(order)}</p>
          <p style="margin:3px 0"><b style="color:var(--ink)">Người nhận:</b> ${order.userName}</p>
          <p style="margin:3px 0"><b style="color:var(--ink)">Địa chỉ giao:</b> ${order.address}</p>
          <p style="margin:3px 0"><b style="color:var(--ink)">Hình thức thanh toán:</b> ${order.payment}</p>
          <p style="margin:3px 0"><b style="color:var(--ink)">Trạng thái:</b> <span class="status" style="display:inline-block">${order.status}</span></p>
        </div>
        <div class="cart-list" style="max-height:220px;overflow:auto">${itemRows}</div>
        <div class="cart-bottom" style="position:static;border-top:1px solid #e5e5dd;margin-top:12px;padding-top:12px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span>Tổng cộng</span>
            <b style="font-size:16px;color:var(--forest)">${money(order.total)}</b>
          </div>
          <button class="primary-action" id="backToOrders" style="margin-top:12px">Quay lại danh sách đơn</button>
        </div>
      `, "history-modal");

      document.querySelector("#backToOrders")?.addEventListener("click", () => {
        closeModal();
        showHistory();
      });
    });
  });
}

// ============================================================
// KÊNH QUẢN TRỊ VIÊN (ADMIN)
// Bổ sung: Tồn kho, Xuất Excel, Phiếu nhập
// Tất cả thao tác bấm đều hiện thông báo theo yêu cầu
// ============================================================

function renderAdminLogin() {
  app.innerHTML = `
    <div class="admin-shell" style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px">
      <div class="admin-orb one"></div>
      <div class="admin-orb two"></div>
      <div class="glass-card" style="width:min(440px, 92vw);padding:40px 30px;position:relative;z-index:10;color:white;border-radius:18px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
          <div class="lux-logo-badge" style="width:42px;height:42px">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              <path d="M6 6h10"/>
              <path d="M6 10h10"/>
            </svg>
          </div>
          <div>
            <b style="font-family:'Playfair Display',serif;font-size:20px;letter-spacing:.05em">DVK BOOKSTORE</b>
            <small style="display:block;font-size:8px;letter-spacing:.25em;color:#f3d67b">KÊNH QUẢN TRỊ VIÊN</small>
          </div>
        </div>
        <h2 style="margin:0 0 8px;font-size:22px;color:white">Đăng nhập Quản trị</h2>
        <p style="margin:0 0 20px;font-size:12px;color:#a8beb5">Đã điền sẵn thông tin mẫu. Quý quản trị có thể nhập bất kỳ thông tin nào để đăng nhập.</p>
        <form id="adminLoginForm" style="display:flex;flex-direction:column;gap:14px">
          <label style="display:flex;flex-direction:column;gap:6px;font-size:12px;color:#a8beb5">
            Tài khoản quản trị
            <input id="adminUserInput" required placeholder="admin" value="admin" style="padding:11px 14px;border-radius:6px;border:1px solid #ffffff25;background:#ffffff10;color:white;outline:none;font-size:13px">
          </label>
          <label style="display:flex;flex-direction:column;gap:6px;font-size:12px;color:#a8beb5">
            Mật khẩu
            <input type="password" id="adminPassInput" required placeholder="••••••••" value="admin" style="padding:11px 14px;border-radius:6px;border:1px solid #ffffff25;background:#ffffff10;color:white;outline:none;font-size:13px">
          </label>
          <button type="submit" class="admin-primary" style="margin-top:10px;padding:12px;font-size:13px;font-weight:600">Đăng nhập vào Kênh quản trị</button>
          <button type="button" id="backToStoreBtn" style="padding:10px;border:0;background:transparent;color:#b9ccc4;cursor:pointer;font-size:12px">← Quay lại trang bán sách</button>
        </form>
      </div>
    </div>
  `;

  document.querySelector("#adminLoginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const userVal = document.querySelector("#adminUserInput")?.value?.trim() || "Admin";
    state.adminLoggedIn = true;
    state.adminUser = userVal;
    renderAdmin();
    showToast(`Chào mừng ${state.adminUser}! Đăng nhập quản trị thành công`);
  });

  document.querySelector("#backToStoreBtn")?.addEventListener("click", () => {
    state.admin = false;
    location.hash = "";
    renderStore();
  });
}

function renderAdmin() {
  if (!state.adminLoggedIn) {
    renderAdminLogin();
    return;
  }

  // Bổ sung Tab Tồn kho và Phiếu nhập theo yêu cầu
  const menu = [
    ["Tổng quan", "chart"],
    ["Sản phẩm", "box"],
    ["Tồn kho", "warehouse"],
    ["Phiếu nhập", "fileText"],
    ["Đơn hàng", "orders"],
    ["Người dùng", "users"],
    ["Thống kê", "chart"]
  ];

  app.innerHTML = `
    <div class="admin-shell">
      <div class="admin-orb one"></div>
      <div class="admin-orb two"></div>
      <aside class="admin-sidebar glass-card">
        <div class="admin-logo">
          <div class="lux-logo-badge" style="width:36px;height:36px">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              <path d="M6 6h10"/>
              <path d="M6 10h10"/>
            </svg>
          </div>
          <div><b>DVK</b><small>ADMIN PANEL</small></div>
        </div>
        <nav>
          ${menu.map((item) => `
            <button data-tab="${item[0]}" class="${state.adminTab === item[0] ? "active" : ""}">
              ${icon(item[1])}${item[0]}
            </button>
          `).join("")}
        </nav>
        <div class="admin-profile">
          <div style="background:#5f9877;color:white;font-weight:bold;width:34px;height:34px;display:grid;place-items:center;border-radius:50%">AD</div>
          <p><b>${state.adminUser || "Quản trị viên"}</b><small>Toàn quyền hệ thống</small></p>
          <button data-admin-logout title="Đăng xuất">${icon("logout")}</button>
        </div>
      </aside>
      <main class="admin-main">
        <header>
          <div>
            <span class="eyebrow">DVK Bookstore Management</span>
            <h1>${state.adminTab}</h1>
          </div>
          <div class="admin-header-actions">
            <button class="admin-primary" data-admin-to-store style="background:transparent;border:1px solid #ffffff30;color:white">
              Về trang bán hàng
            </button>
            ${state.adminTab === "Sản phẩm" ? `<button class="admin-primary" id="btnAdminAddBook">${icon("plus")} Thêm sản phẩm</button>` : ""}
            ${state.adminTab === "Tồn kho" ? `<button class="btn-excel" id="btnExcelStock">${icon("download", 16)} Xuất Excel tồn kho</button>` : ""}
            ${state.adminTab === "Phiếu nhập" ? `<button class="admin-primary" id="btnCreateReceipt">${icon("plus")} Tạo phiếu nhập mới</button>` : ""}
            ${state.adminTab === "Đơn hàng" ? `<button class="btn-excel" id="btnExcelOrders">${icon("download", 16)} Xuất Excel đơn hàng</button>` : ""}
            ${state.adminTab === "Người dùng" ? `<button class="admin-primary" id="btnAdminAddUser">${icon("plus")} Thêm người dùng</button>` : ""}
            ${state.adminTab === "Thống kê" ? `<button class="btn-excel" id="btnExcelStats">${icon("download", 16)} Xuất báo cáo Excel</button>` : ""}
          </div>
        </header>
        ${adminContent()}
      </main>
    </div>
  `;

  bindAdminEvents();
}

function bindAdminEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.adminTab = button.dataset.tab;
      renderAdmin();
    });
  });

  document.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
    state.adminLoggedIn = false;
    state.admin = false;
    location.hash = "";
    renderStore();
    showToast("Đã đăng xuất khỏi Kênh quản trị");
  });

  document.querySelector("[data-admin-to-store]")?.addEventListener("click", () => {
    state.admin = false;
    location.hash = "";
    renderStore();
  });

  // Xuất Excel: bấm là hiện thông báo thành công
  document.querySelectorAll("#btnExcelStock, #btnExcelOrders, #btnExcelStats").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast("Xuất file Excel thành công!");
    });
  });

  // Sự kiện từng tab
  if (state.adminTab === "Tổng quan") {
    document.querySelector("#btnViewAllOrders")?.addEventListener("click", () => {
      state.adminTab = "Đơn hàng";
      renderAdmin();
    });
    document.querySelectorAll("[data-admin-order-id]").forEach((btn) => {
      btn.addEventListener("click", () => showAdminOrderDetail(btn.dataset.adminOrderId));
    });
  } else if (state.adminTab === "Sản phẩm") {
    document.querySelector("#btnAdminAddBook")?.addEventListener("click", showAddProduct);
    document.querySelectorAll("[data-edit-product]").forEach((btn) => {
      btn.addEventListener("click", () => showEditProduct(Number(btn.dataset.editProduct)));
    });
    document.querySelectorAll("[data-delete-product]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("Đã xóa thành công");
      });
    });
  } else if (state.adminTab === "Tồn kho") {
    document.querySelector("#btnCheckInventory")?.addEventListener("click", () => {
      showToast("Đã kiểm kê và đồng bộ tồn kho thành công!");
    });
    document.querySelectorAll("[data-quick-stock]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("Cập nhật tồn kho thành công!");
      });
    });
  } else if (state.adminTab === "Phiếu nhập") {
    document.querySelector("#btnCreateReceipt")?.addEventListener("click", showCreateReceiptModal);
    document.querySelectorAll("[data-receipt-detail]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("Đã hiển thị chi tiết phiếu nhập kho");
      });
    });
  } else if (state.adminTab === "Đơn hàng") {
    document.querySelector("#btnApplyOrderFilter")?.addEventListener("click", () => {
      state.adminOrderFilter.status = document.querySelector("#filterOrderStatus").value;
      state.adminOrderFilter.from = document.querySelector("#filterOrderFrom").value;
      state.adminOrderFilter.to = document.querySelector("#filterOrderTo").value;
      state.adminOrderFilter.location = document.querySelector("#filterOrderLocation").value;
      renderAdmin();
    });

    document.querySelector("#btnResetOrderFilter")?.addEventListener("click", () => {
      state.adminOrderFilter = { status: "Tất cả", from: "", to: "", location: "Tất cả" };
      renderAdmin();
    });

    document.querySelectorAll("[data-admin-order-id]").forEach((btn) => {
      btn.addEventListener("click", () => showAdminOrderDetail(btn.dataset.adminOrderId));
    });

    document.querySelectorAll("[data-advance-order]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("Cập nhật trạng thái đơn hàng thành công");
      });
    });
  } else if (state.adminTab === "Người dùng") {
    document.querySelector("#btnAdminAddUser")?.addEventListener("click", showAddUser);
    document.querySelector("#btnAdminAddUserInline")?.addEventListener("click", showAddUser);
    document.querySelectorAll("[data-toggle-user]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("Đã cập nhật trạng thái tài khoản thành công");
      });
    });
    document.querySelectorAll("[data-edit-user]").forEach((btn) => {
      btn.addEventListener("click", () => showEditUser(Number(btn.dataset.editUser)));
    });
  } else if (state.adminTab === "Thống kê") {
    document.querySelector("#btnGenStatReport")?.addEventListener("click", () => {
      showToast("Đã tạo báo cáo thống kê mới nhất");
    });
    document.querySelectorAll("[data-view-customer-orders]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showCustomerOrdersModal(btn.dataset.viewCustomerOrders);
      });
    });
  }
}

function adminContent() {
  if (state.adminTab === "Tổng quan") {
    const totalRev = orders.filter((o) => o.status !== "Hủy đơn").reduce((s, o) => s + o.total, 0);
    const totalBooksInStock = products.reduce((s, p) => s + p.stock, 0);

    return `
      <div class="stat-grid">
        <div class="stat-card glass-card">
          <div><span>Doanh thu hệ thống</span><strong>${money(totalRev)}</strong><small>Từ các đơn hàng thành công</small></div>
          <i>${icon("chart")}</i>
        </div>
        <div class="stat-card glass-card">
          <div><span>Tổng đơn hàng</span><strong>${orders.length}</strong><small>${orders.filter((o) => o.status === "Chưa xác nhận").length} đơn chờ duyệt</small></div>
          <i>${icon("orders")}</i>
        </div>
        <div class="stat-card glass-card">
          <div><span>Tổng tồn kho</span><strong>${totalBooksInStock}</strong><small>${products.length} đầu sách đang lưu kho</small></div>
          <i>${icon("warehouse")}</i>
        </div>
        <div class="stat-card glass-card">
          <div><span>Khách hàng</span><strong>${users.length}</strong><small>Thành viên đăng ký</small></div>
          <i>${icon("users")}</i>
        </div>
      </div>

      <section class="glass-card table-panel" style="margin-top:20px">
        <div class="panel-title">
          <div><span>Đơn hàng mới</span><h3>5 Đơn hàng gần đây</h3></div>
          <button id="btnViewAllOrders" class="admin-primary" style="padding:6px 12px;font-size:11px">Xem tất cả đơn</button>
        </div>
        <div class="data-table">
          <div class="table-row table-head">
            <span>Mã đơn</span><span>Khách hàng</span><span>Ngày đặt</span><span>Tổng tiền</span><span>Trạng thái</span><span>Chi tiết</span>
          </div>
          ${orders.slice(0, 5).map((o) => `
            <div class="table-row">
              <b>${o.id}</b>
              <span>${o.userName}</span>
              <span>${getOrderDateDisplay(o)}</span>
              <b>${money(o.total)}</b>
              <span class="status ${o.status.toLowerCase().replace(/\s+/g, '-')}">${o.status}</span>
              <button data-admin-order-id="${o.id}" style="padding:4px 8px;border:1px solid #ffffff25;border-radius:4px;background:#ffffff10;color:white;cursor:pointer">Xem</button>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (state.adminTab === "Sản phẩm") {
    return `
      <section class="glass-card table-panel admin-page-panel">
        <div class="panel-title">
          <div><span>Kho sách (${products.length} cuốn)</span><h3>Danh sách sản phẩm</h3></div>
        </div>
        <div class="product-admin-grid">
          ${products.map((product) => `
            <article style="position:relative">
              <img src="${product.image}" alt="${product.title}">
              <div>
                <b>${product.title}</b>
                <small>${product.author} · <span style="color:#dbe8c7">${product.category}</span></small>
                <strong>${money(product.price)}</strong>
                <span style="font-size:10px">Tồn kho: ${product.stock} · Đã bán: ${product.sold || 0}</span>
                <span style="color:#9fd3ab;font-size:10px;display:block;margin-top:2px">[Đang bán tại DVK]</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:6px">
                <button data-edit-product="${product.id}">Sửa</button>
                <button data-delete-product="${product.id}" style="color:#e5988c;border-color:#e5988c40">Xóa</button>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  // TAB MỚI: TỒN KHO (Yêu cầu 9)
  if (state.adminTab === "Tồn kho") {
    return `
      <div class="filter-row glass-card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div>
          <span style="font-size:13px;color:white;font-weight:600">Báo cáo & Kiểm kê kho sách DVK Bookstore</span>
          <p style="margin:4px 0 0;font-size:11px;color:#a8beb5">Theo dõi chi tiết số lượng tồn, nhập xuất theo thời gian thực.</p>
        </div>
        <div style="display:flex;gap:8px">
          <button class="admin-primary" id="btnCheckInventory">${icon("check", 16)} Kiểm kê kho</button>
        </div>
      </div>

      <section class="glass-card table-panel admin-page-panel">
        <div class="panel-title">
          <div><span>Tổng cộng ${products.length} đầu sách</span><h3>Bảng theo dõi tồn kho chi tiết</h3></div>
        </div>
        <div class="data-table">
          <div class="table-row table-head" style="grid-template-columns: 0.6fr 1.6fr 1fr 0.8fr 0.8fr 0.8fr 1fr 1fr">
            <span>Mã</span><span>Tên sách</span><span>Thể loại</span><span>Tồn đầu</span><span>Đã nhập</span><span>Đã bán</span><span>Tồn hiện tại</span><span>Thao tác</span>
          </div>
          ${products.map((p) => {
            const inStock = p.stock;
            const imported = p.initialStock || 50;
            const isLow = inStock <= 15;
            return `
              <div class="table-row" style="grid-template-columns: 0.6fr 1.6fr 1fr 0.8fr 0.8fr 0.8fr 1fr 1fr">
                <b>#${p.id}</b>
                <span style="color:white;font-weight:600">${p.title}</span>
                <span>${p.category}</span>
                <span>${imported}</span>
                <span style="color:#9fd3ab">+${imported - inStock + (p.sold % 20)}</span>
                <span style="color:#e5988c">-${p.sold}</span>
                <b style="color:${isLow ? "#e5c18c" : "#9fd3ab"};font-size:10px">${inStock} cuốn ${isLow ? "(Sắp hết)" : ""}</b>
                <div>
                  <button data-quick-stock="${p.id}" style="padding:4px 8px;border:1px solid #ffffff25;background:#ffffff12;color:white;border-radius:4px;cursor:pointer">Nhập thêm</button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  // TAB MỚI: PHIẾU NHẬP (Yêu cầu 9)
  if (state.adminTab === "Phiếu nhập") {
    return `
      <section class="glass-card table-panel admin-page-panel">
        <div class="panel-title">
          <div><span>Hệ thống ghi nhận ${stockReceipts.length} phiếu nhập</span><h3>Quản lý phiếu nhập kho</h3></div>
        </div>
        <div class="data-table">
          <div class="table-row table-head" style="grid-template-columns: 1fr 1.2fr 1.4fr 1.2fr 1.2fr 1fr 1fr">
            <span>Mã phiếu</span><span>Ngày nhập</span><span>Nhà cung cấp</span><span>Người tạo</span><span>Tổng tiền nhập</span><span>Số lượng</span><span>Thao tác</span>
          </div>
          ${stockReceipts.map((r) => `
            <div class="table-row" style="grid-template-columns: 1fr 1.2fr 1.4fr 1.2fr 1.2fr 1fr 1fr">
              <b>${r.id}</b>
              <span>${r.date}</span>
              <span style="color:white">${r.supplier}</span>
              <span>${r.creator}</span>
              <b style="color:#dbe8c7">${money(r.total)}</b>
              <span>${r.itemsCount} cuốn</span>
              <div>
                <button data-receipt-detail="${r.id}" style="padding:4px 8px;border:1px solid #ffffff25;background:#ffffff10;color:white;border-radius:4px;cursor:pointer">Xem</button>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (state.adminTab === "Đơn hàng") {
    const f = state.adminOrderFilter;
    const filteredOrders = orders.filter((o) => {
      if (f.status !== "Tất cả" && o.status !== f.status) return false;
      const iso = getOrderDateIso(o);
      if (f.from && iso < f.from) return false;
      if (f.to && iso > f.to) return false;
      if (f.location !== "Tất cả" && !o.address.toLowerCase().includes(f.location.toLowerCase())) return false;
      return true;
    });

    return `
      <div class="filter-row glass-card" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)) auto;gap:10px;align-items:end">
        <div>
          <span style="font-size:11px;color:#a8beb5">Tình trạng</span>
          <select id="filterOrderStatus" style="padding:8px;border-radius:6px;background:#ffffff10;color:white;border:1px solid #ffffff25">
            ${["Tất cả", "Chưa xác nhận", "Đã xác nhận", "Đã giao", "Hủy đơn"].map((st) => `
              <option value="${st}" ${f.status === st ? "selected" : ""} style="background:#193b2d;color:white">${st}</option>
            `).join("")}
          </select>
        </div>
        <div>
          <span style="font-size:11px;color:#a8beb5">Từ ngày</span>
          <input type="date" id="filterOrderFrom" value="${f.from}" style="padding:7px;border-radius:6px;background:#ffffff10;color:white;border:1px solid #ffffff25">
        </div>
        <div>
          <span style="font-size:11px;color:#a8beb5">Đến ngày</span>
          <input type="date" id="filterOrderTo" value="${f.to}" style="padding:7px;border-radius:6px;background:#ffffff10;color:white;border:1px solid #ffffff25">
        </div>
        <div>
          <span style="font-size:11px;color:#a8beb5">Khu vực giao</span>
          <select id="filterOrderLocation" style="padding:8px;border-radius:6px;background:#ffffff10;color:white;border:1px solid #ffffff25">
            ${["Tất cả", "Thủ Đức", "Quận 1", "Bình Thạnh", "Quận 7", "Gò Vấp"].map((loc) => `
              <option value="${loc}" ${f.location === loc ? "selected" : ""} style="background:#193b2d;color:white">${loc === "Tất cả" ? "Tất cả khu vực" : loc}</option>
            `).join("")}
          </select>
        </div>
        <div style="display:flex;gap:6px">
          <button class="admin-primary" id="btnApplyOrderFilter" style="padding:8px 14px">Lọc</button>
          <button id="btnResetOrderFilter" style="padding:8px 12px;border:1px solid #ffffff25;background:transparent;color:#b9ccc4;border-radius:6px;cursor:pointer">Đặt lại</button>
        </div>
      </div>

      <section class="glass-card table-panel admin-page-panel">
        <div class="panel-title">
          <div><span>Tìm thấy ${filteredOrders.length} đơn hàng</span><h3>Quản lý đơn hàng</h3></div>
        </div>
        <div class="data-table">
          <div class="table-row table-head" style="grid-template-columns: 1fr 1.2fr 0.9fr 1fr 1.5fr 1fr 1.6fr">
            <span>Mã đơn</span><span>Khách hàng</span><span>Ngày đặt</span><span>Tổng tiền</span><span>Địa chỉ</span><span>Trạng thái</span><span>Cập nhật trạng thái</span>
          </div>
          ${filteredOrders.length ? filteredOrders.map((o) => `
            <div class="table-row" style="grid-template-columns: 1fr 1.2fr 0.9fr 1fr 1.5fr 1fr 1.6fr">
              <b>${o.id}</b>
              <span>${o.userName}</span>
              <span>${getOrderDateDisplay(o)}</span>
              <b>${money(o.total)}</b>
              <span style="font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${o.address}">${o.address}</span>
              <span class="status ${o.status.toLowerCase().replace(/\s+/g, '-')}">${o.status}</span>
              <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                <button data-admin-order-id="${o.id}" style="padding:3px 6px;font-size:9px;border:1px solid #ffffff25;border-radius:4px;background:#ffffff10;color:white">Xem</button>
                ${o.status === "Chưa xác nhận" ? `
                  <button data-advance-order="${o.id}" style="padding:3px 6px;font-size:9px;border:1px solid #9fd3ab;border-radius:4px;background:#5f987730;color:#9fd3ab">Xác nhận</button>
                  <button data-advance-order="${o.id}" style="padding:3px 6px;font-size:9px;border:1px solid #e5988c;border-radius:4px;background:#ba665430;color:#e5988c">Hủy</button>
                ` : ""}
                ${o.status === "Đã xác nhận" ? `
                  <button data-advance-order="${o.id}" style="padding:3px 6px;font-size:9px;border:1px solid #9fd3ab;border-radius:4px;background:#5f987730;color:#9fd3ab">Đã giao</button>
                  <button data-advance-order="${o.id}" style="padding:3px 6px;font-size:9px;border:1px solid #e5988c;border-radius:4px;background:#ba665430;color:#e5988c">Hủy</button>
                ` : ""}
                ${(o.status === "Đã giao" || o.status === "Hủy đơn") ? `<small style="color:#718d82;font-size:9px">${o.status === "Đã giao" ? "✓ Hoàn tất" : "✕ Đã hủy"}</small>` : ""}
              </div>
            </div>
          `).join("") : `<div class="empty" style="padding:30px;text-align:center;color:#a8beb5">Không tìm thấy đơn hàng nào phù hợp.</div>`}
        </div>
      </section>
    `;
  }

  if (state.adminTab === "Người dùng") {
    return `
      <section class="glass-card table-panel admin-page-panel">
        <div class="panel-title">
          <div><span>${users.length} tài khoản</span><h3>Quản lý người dùng</h3></div>
          <button class="admin-primary" id="btnAdminAddUserInline">${icon("plus")} Thêm người dùng</button>
        </div>
        <div class="user-list">
          ${users.map((u) => {
            const initials = u.name.split(" ").slice(-2).map((p) => p[0]).join("") || "U";
            const isLocked = u.status === "locked";
            return `
              <div>
                <i>${initials}</i>
                <p>
                  <b>${u.name}</b>
                  <small>${u.email} · ${u.phone} · ${u.address}</small>
                </p>
                <span class="${isLocked ? "locked" : ""}">${isLocked ? "Đã khóa" : "Đang hoạt động"}</span>
                <button data-toggle-user="${u.id}">${isLocked ? "Mở khóa" : "Khóa"}</button>
                <button data-edit-user="${u.id}">Sửa</button>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  if (state.adminTab === "Thống kê") {
    const f = state.adminStatFilter;
    const validOrders = orders.filter((o) => o.status !== "Hủy đơn");
    const customerMap = {};
    validOrders.forEach((o) => {
      const key = o.userId || o.userName;
      if (!customerMap[key]) {
        customerMap[key] = {
          id: key,
          name: o.userName,
          phone: o.userPhone || "",
          orders: [],
          totalSpent: 0,
        };
      }
      customerMap[key].orders.push(o);
      customerMap[key].totalSpent += o.total;
    });

    const topCustomers = Object.values(customerMap).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
    const periodRev = validOrders.reduce((s, o) => s + o.total, 0);

    return `
      <div class="filter-row glass-card" style="display:flex;align-items:end;gap:12px;flex-wrap:wrap">
        <div>
          <span style="font-size:11px;color:#a8beb5">Từ ngày</span>
          <input type="date" id="statFromDate" value="${f.from}" style="padding:8px;border-radius:6px;background:#ffffff10;color:white;border:1px solid #ffffff25">
        </div>
        <span>đến</span>
        <div>
          <span style="font-size:11px;color:#a8beb5">Đến ngày</span>
          <input type="date" id="statToDate" value="${f.to}" style="padding:8px;border-radius:6px;background:#ffffff10;color:white;border:1px solid #ffffff25">
        </div>
        <button class="admin-primary" id="btnGenStatReport" style="padding:9px 18px">Tạo báo cáo thống kê</button>
      </div>

      <section class="glass-card table-panel admin-page-panel">
        <div class="panel-title">
          <div>
            <span>Thời gian: ${f.from.split("-").reverse().join("/")} → ${f.to.split("-").reverse().join("/")}</span>
            <h3>Top 5 khách hàng có mức mua hàng cao nhất</h3>
          </div>
          <strong>Tổng doanh thu: ${money(periodRev)}</strong>
        </div>
        <div class="leaderboard">
          ${topCustomers.map((c, index) => `
            <div>
              <em>0${index + 1}</em>
              <i>${c.name.split(" ").slice(-2).map((p) => p[0]).join("") || "KH"}</i>
              <p>
                <b>${c.name} ${c.phone ? `<small style="display:inline;color:#9fb3ab">(${c.phone})</small>` : ""}</b>
                <button class="detail-btn" data-view-customer-orders="${c.id}" style="color:#dbe8c7;text-decoration:underline">Xem các đơn (${c.orders.length} đơn)</button>
              </p>
              <span>${c.orders.length} đơn hàng</span>
              <strong>${money(c.totalSpent)}</strong>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  return "";
}

// ============================================================
// Các Modal Quản trị (Admin Modals)
// Quy tắc yêu cầu 6, 7, 12: Thao tác chỉ hiện thông báo
// ============================================================

// 1. Thêm sản phẩm
function showAddProduct() {
  modal(`
    <span class="eyebrow">Kho sách DVK</span>
    <h2>Thêm đầu sách mới</h2>
    <form class="admin-form" id="productForm">
      <label>Tên sách<input required id="addTitle" value="Nghệ Thuật Tư Duy Rành Mạch" placeholder="Nhập tên sách"></label>
      <label>Tác giả<input required id="addAuthor" value="Rolf Dobelli" placeholder="Tên tác giả"></label>
      <label>Phân loại
        <select id="addCategory">
          ${categories.slice(1).map((item) => `<option value="${item}">${item}</option>`).join("")}
        </select>
      </label>
      <label>Giá bán (VNĐ)<input required type="number" id="addPrice" value="125000" min="1000"></label>
      <label>Số lượng tồn kho<input required type="number" id="addStock" value="30" min="1"></label>
      <button class="admin-primary" type="submit" style="margin-top:16px">Lưu sản phẩm vào kho</button>
    </form>
  `, "admin-modal glass-card");

  document.querySelector("#productForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    showToast("Đã thêm thành công");
  });
}

// 2. Sửa sản phẩm
function showEditProduct(id) {
  const product = products.find((p) => p.id === id) || products[0];
  modal(`
    <span class="eyebrow">Kho sách DVK</span>
    <h2>Chỉnh sửa đầu sách #${product.id}</h2>
    <form class="admin-form" id="editProductForm">
      <label>Tên sách<input required id="editTitle" value="${product.title}"></label>
      <label>Tác giả<input required id="editAuthor" value="${product.author}"></label>
      <label>Phân loại
        <select id="editCategory">
          ${categories.slice(1).map((item) => `
            <option value="${item}" ${product.category === item ? "selected" : ""}>${item}</option>
          `).join("")}
        </select>
      </label>
      <label>Giá bán (VNĐ)<input required type="number" id="editPrice" value="${product.price}"></label>
      <label>Số lượng tồn kho<input required type="number" id="editStock" value="${product.stock}"></label>
      <button class="admin-primary" type="submit" style="margin-top:16px">Lưu thay đổi</button>
    </form>
  `, "admin-modal glass-card");

  document.querySelector("#editProductForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    showToast("Đã cập nhật thành công");
  });
}

// 3. Tạo phiếu nhập kho mới (Yêu cầu 9)
function showCreateReceiptModal() {
  modal(`
    <span class="eyebrow">Quản lý nhập hàng</span>
    <h2>Tạo phiếu nhập kho mới</h2>
    <form class="admin-form" id="receiptForm">
      <label>Nhà cung cấp
        <select id="recSupplier">
          <option>NXB Trẻ</option>
          <option>NXB Kim Đồng</option>
          <option>NXB Nhã Nam</option>
          <option>NXB Phụ Nữ</option>
          <option>NXB Lao Động</option>
        </select>
      </label>
      <label>Người lập phiếu<input required id="recCreator" value="${state.adminUser || 'Admin Phan'}"></label>
      <label>Chọn sách nhập
        <select id="recBook">
          ${products.map((p) => `<option value="${p.id}">${p.title} (${money(p.price)})</option>`).join("")}
        </select>
      </label>
      <label>Số lượng nhập (cuốn)<input required type="number" id="recQuantity" value="50" min="1"></label>
      <label>Đơn giá nhập dự tính<input required type="number" id="recCost" value="65000" min="1000"></label>
      <label>Ghi chú lô hàng<input id="recNote" placeholder="Ví dụ: Nhập bổ sung tuần 3 tháng 5"></label>
      <button class="admin-primary" type="submit" style="margin-top:16px">Xác nhận nhập kho</button>
    </form>
  `, "admin-modal glass-card");

  document.querySelector("#receiptForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    showToast("Tạo phiếu nhập hàng thành công!");
  });
}

// 4. Thêm người dùng
function showAddUser() {
  modal(`
    <span class="eyebrow">Quản lý người dùng</span>
    <h2>Thêm người dùng mới</h2>
    <form class="admin-form" id="addUserForm">
      <label>Họ và tên<input required id="addUserName" value="Lâm Quốc Bảo"></label>
      <label>Email<input required type="email" id="addUserEmail" value="quocbao@gmail.com"></label>
      <label>Số điện thoại<input required id="addUserPhone" value="0988776655"></label>
      <label>Địa chỉ<input required id="addUserAddress" value="36 Quang Trung, Gò Vấp, TP.HCM"></label>
      <button class="admin-primary" type="submit" style="margin-top:16px">Tạo tài khoản</button>
    </form>
  `, "admin-modal glass-card");

  document.querySelector("#addUserForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    showToast("Đã thêm người dùng thành công");
  });
}

// 5. Sửa người dùng
function showEditUser(id) {
  const u = users.find((user) => user.id === id) || users[0];
  modal(`
    <span class="eyebrow">Quản lý người dùng</span>
    <h2>Sửa thông tin #${u.id} - ${u.name}</h2>
    <form class="admin-form" id="editUserForm">
      <label>Họ và tên<input required id="editUserName" value="${u.name}"></label>
      <label>Email<input required type="email" id="editUserEmail" value="${u.email}"></label>
      <label>Số điện thoại<input required id="editUserPhone" value="${u.phone}"></label>
      <label>Địa chỉ<input required id="editUserAddress" value="${u.address}"></label>
      <button class="admin-primary" type="submit" style="margin-top:16px">Lưu thay đổi</button>
    </form>
  `, "admin-modal glass-card");

  document.querySelector("#editUserForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    showToast("Đã cập nhật thông tin thành công");
  });
}

// 6. Chi tiết đơn hàng Admin
function showAdminOrderDetail(orderId) {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  const itemRows = order.items.map((item) => `
    <div class="cart-item" style="padding:10px 0;border-bottom:1px solid #ffffff15">
      <img src="${item.image}" alt="${item.title}" style="width:48px;height:64px;object-fit:cover;border-radius:4px">
      <div style="flex:1">
        <h4 style="margin:0 0 4px;font-size:13px;color:white">${item.title}</h4>
        <small style="color:#a8beb5">${item.author}</small>
        <b style="display:block;margin-top:4px;color:#dbe8c7">${money(item.price)} × ${item.quantity} = ${money(item.price * item.quantity)}</b>
      </div>
    </div>
  `).join("");

  modal(`
    <span class="eyebrow">Chi tiết đơn hàng Admin</span>
    <h2 style="color:white;margin-bottom:12px">Đơn #${order.id}</h2>
    <div style="font-size:12px;color:#a8beb5;line-height:1.9;margin-bottom:15px">
      <p style="margin:2px 0"><b style="color:white">Khách hàng:</b> ${order.userName} ${order.userPhone ? `· ${order.userPhone}` : ""}</p>
      <p style="margin:2px 0"><b style="color:white">Địa chỉ giao:</b> ${order.address}</p>
      <p style="margin:2px 0"><b style="color:white">Ngày đặt:</b> ${getOrderDateDisplay(order)}</p>
      <p style="margin:2px 0"><b style="color:white">Thanh toán:</b> ${order.payment}</p>
      <p style="margin:2px 0"><b style="color:white">Trạng thái:</b> <span class="status ${order.status.toLowerCase().replace(/\s+/g, '-')}">${order.status}</span></p>
    </div>
    <div style="max-height:220px;overflow:auto;margin-bottom:14px">
      ${itemRows}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #ffffff25;padding-top:12px">
      <span style="color:#a8beb5">Tổng giá trị đơn:</span>
      <b style="font-size:17px;color:#dbe8c7">${money(order.total)}</b>
    </div>
  `, "admin-modal glass-card");
}

// 7. Xem đơn khách trong thống kê
function showCustomerOrdersModal(customerKey) {
  const customerOrders = orders.filter((o) => {
    const key = o.userId || o.userName;
    return String(key) === String(customerKey) || o.userName === customerKey;
  });

  const first = customerOrders[0];
  const name = first ? first.userName : customerKey;
  const total = customerOrders.reduce((s, o) => s + o.total, 0);

  modal(`
    <span class="eyebrow">Thống kê chi tiết</span>
    <h2 style="color:white;margin-bottom:6px">Đơn hàng của: ${name}</h2>
    <p style="font-size:12px;color:#a8beb5;margin-bottom:14px">Tổng chi tiêu: <b style="color:#dbe8c7">${money(total)}</b> (${customerOrders.length} đơn hàng)</p>
    <div style="max-height:300px;overflow:auto">
      ${customerOrders.map((o) => `
        <div style="background:#ffffff08;border:1px solid #ffffff15;border-radius:8px;padding:12px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <b style="color:white">#${o.id}</b>
            <span class="status ${o.status.toLowerCase().replace(/\s+/g, '-')}">${o.status}</span>
          </div>
          <p style="margin:2px 0;font-size:11px;color:#a8beb5">Ngày đặt: ${getOrderDateDisplay(o)} · Địa chỉ: ${o.address}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
            <b style="color:#dbe8c7">${money(o.total)}</b>
            <button class="admin-order-sub-detail" data-sub-id="${o.id}" style="padding:4px 8px;font-size:10px;border:1px solid #ffffff30;border-radius:4px;background:#ffffff10;color:white;cursor:pointer">Xem sản phẩm</button>
          </div>
        </div>
      `).join("")}
    </div>
  `, "admin-modal glass-card");

  document.querySelectorAll(".admin-order-sub-detail").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal();
      showAdminOrderDetail(btn.dataset.subId);
    });
  });
}

// ============================================================
// Điều hướng & Khởi tạo (Router)
// ============================================================
function handleRoute() {
  state.admin = location.hash === "#admin";
  if (state.admin) {
    if (!state.adminLoggedIn) {
      renderAdminLogin();
    } else {
      renderAdmin();
    }
  } else {
    renderStore();
  }
}

addEventListener("hashchange", handleRoute);
handleRoute();
