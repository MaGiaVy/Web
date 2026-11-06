# TÀI LIỆU THIẾT KẾ NÂNG CẤP GIAO DIỆN: ĐẠI THIÊN HÀ VŨ TRỤ GUNDAM (FULL GALAXY EXPERIENCE)

> **Dự án:** DVK Gunpla Store (Môn Lập trình Web 1 - Website giao diện tĩnh)  
> **Tài liệu:** Thiết kế chi tiết & Đặc tả kỹ thuật toàn trang: Đại Thiên Hà Vũ Trụ, Banner & Khối Sản Phẩm Chống Chìm  
> **Tệp:** `DESIGN.md` (Thư mục gốc dự án)  
> **Trạng thái:** Đã thống nhất & Phê duyệt thiết kế (Approved)  
> **Ngày cập nhật:** 06/11/2026  

---

## 1. Mục Đích & Tầm Nhìn Thiết Kế (Vision & Intent)

### 1.1. Bối cảnh
Website **DVK Gunpla** hiện đang sử dụng giao diện tĩnh phục vụ môn học Lập trình Web 1. Giao diện ban đầu mang phong cách thương mại điện tử cơ bản (nền xám sáng, banner SVG đơn sắc), chưa truyền tải được cảm giác hoành tráng, cuốn hút và tính chất cơ khí viễn tưởng (Sci-Fi / Mecha) đặc trưng của vũ trụ anime Gundam.

### 1.2. Tầm nhìn thiết kế
Nâng cấp toàn bộ trải nghiệm trang chủ thành **Đại Không Gian Thiên Hà (Full Galaxy Cosmos)**:
- Người dùng khi bước vào trang web như được dịch chuyển ra ngoài không gian vũ trụ sâu thẳm: nơi có hàng ngàn vì sao lấp lánh, dải tinh vân tím hồng kỳ ảo, quầng sáng Mặt Trời rực rỡ và địa cầu Trái Đất xanh biếc.
- Phần banner tái hiện sinh động cuộc đại chiến không gian kinh điển giữa **Nu Gundam** và **MSN-04 Sazabi**.
- **Yêu cầu sống còn (Critical Constraint):** Dù nền thiên hà rất rực rỡ và nhiều sao, các khối thông tin, thanh điều hướng và đặc biệt là **khối danh sách sản phẩm bên dưới tuyệt đối không được bị chìm hay rối mắt**.
- **Ràng buộc học thuật:** Giữ nguyên 100% cấu trúc logic, đường link điều hướng, bộ lọc phân loại, giỏ hàng, dữ liệu tĩnh (`assets/js/data.js`), và không sử dụng bất kỳ thư viện hay framework bên ngoài nào.

---

## 2. Mục Tiêu, Phi Mục Tiêu & Ràng Buộc Cốt Lõi

### 2.1. Mục Tiêu (Goals)
1. **Hình nền thiên hà ngàn sao toàn trang:** Tích hợp ảnh thiên hà chất lượng cao (`assets/images/deep-space-galaxy.jpg`) với mật độ sao dày đặc, lõi thiên hà xoắn ốc và tinh vân tím hồng rực rỡ theo đúng ảnh tham khảo thực tế.
2. **Hiệu ứng thiên thể sống động:** Bổ sung quầng sáng Mặt Trời (Solar Flare) góc trên và địa cầu Trái Đất xanh biếc (Earth Marble) cùng Mặt Trăng bên cạnh khu vực sản phẩm.
3. **Hero Banner Đại Chiến Không Gian:** Tích hợp tranh minh họa đọ kiếm saber (`assets/images/gundam-space-battle.jpg`), lớp phủ gradient chống chói chữ.
4. **Typography đồng bộ 100% (Phương án 2):** Sử dụng duy nhất phông chữ cơ khí **Chakra Petch** cho toàn bộ tiêu đề, nhãn dán, nút bấm và số liệu.
5. **Cặp nút bấm hành động thuần chữ (Clean Typography):** Loại bỏ toàn bộ icon tia sét, gươm, mũi tên rườm rà.
   - Nút chính *"MUA SẮM NGAY"*: Lõi đen cơ khí `#080e22` chống chìm, viền neon phát sáng chuyển sắc 3 màu (Cyan `#38bdf8` $\rightarrow$ Tím `#818cf8` $\rightarrow$ Đỏ Crimson `#f43f5e`).
   - Nút phụ *"XEM DÒNG PG"*: Nền kính tối mờ cơ khí (`rgba(15, 23, 42, 0.85)`).
6. **Hệ thống khoang sản phẩm Titan Hangar Pods chống chìm tuyệt đối:** Thẻ sản phẩm lõi đặc `#070d20` độ đục 100% kết hợp đệm sáng vòm Spotlight chiếu sau lưng mô hình, viền phản quang Cyan và giá đỏ phát quang.

### 2.2. Phi Mục Tiêu (Non-Goals)
- Không can thiệp vào router, query params (`pages/products.html?cat=PG`), hay logic đặt hàng.
- Không thay đổi bảng cấu trúc dữ liệu sản phẩm trong `assets/js/data.js`.
- Không can thiệp vào trang quản trị `pages/admin/` hay giỏ hàng/thanh toán.

### 2.3. Chống Mục Tiêu (Anti-Goals - Những điều cấm kỵ)
- **CẤM cài đặt thư viện/framework bên ngoài:** Không npm, không Tailwind CDN, Bootstrap, jQuery, Three.js, hay Canvas nặng nề.
- **CẤM dùng thẻ sản phẩm trong suốt:** Nền thẻ sản phẩm phải đặc hoàn toàn để ngăn các vì sao nền xuyên qua làm rối mắt người dùng.
- **CẤM chèn icon vào nút bấm:** Giữ các nút bấm thuần chữ hiện đại, sang trọng chuẩn typography mecha.

---

## 3. Hệ Thống Màu Sắc & Typography

### 3.1. Bảng màu (Color Palette)

| Tên màu | Mã Hex / RGBA | Vai trò & Ứng dụng |
| :--- | :--- | :--- |
| **Deep Space Void** | `#02040a` | Tông màu nền đen sâu thẳm của không gian vũ trụ |
| **Cosmic Cyan** | `#38bdf8` | Điểm bắt đầu dải gradient, viền phản quang, số liệu "52+", vòm sáng Spotlight |
| **Cosmic Purple** | `#818cf8` | Điểm giữa dải gradient, số liệu "6.000+", ánh sáng viền |
| **Crimson Red** | `#f43f5e` | Điểm kết thúc gradient, giá bán sản phẩm phát quang, huy hiệu giảm giá |
| **Solid Core Navy** | `#080e22` | Lõi nền nút chính "MUA SẮM NGAY" (độ đậm 100%), chống chìm nền |
| **Titanium Pod Core**| `#070d20` | Nền đặc 100% của thẻ sản phẩm, triệt tiêu hoàn toàn hiện tượng xuyên thấu sao |
| **Solar Amber** | `#f59e0b` | Quầng nhiệt của Mặt Trời và ngôi sao đánh giá |
| **Earth Cyan Glow** | `rgba(56, 189, 248, 0.4)` | Vòm khí quyển phát sáng quanh địa cầu Trái Đất |

### 3.2. Hệ thống Typography (Đồng Bộ 100% Chakra Petch)

| Thành phần | Cỡ chữ / Font-weight | Màu sắc | Kiểu hiển thị |
| :--- | :--- | :--- | :--- |
| **Logo DVK GUNPLA** | 24px (1.5rem) / ExtraBold 800 | `#38bdf8` & `#ffffff` | In hoa, letter-spacing: 0.08em, text-shadow neon |
| **Eyebrow Badge** | 12px (0.76rem) / Bold 700 | `#c7d2fe` | In hoa, letter-spacing: 0.08em |
| **Tiêu đề Banner dòng 1** | 44px - 50px / ExtraBold 800 | `#ffffff` | In hoa, "LẮP RÁP HUYỀN THOẠI" |
| **Tiêu đề Banner dòng 2** | 44px - 50px / ExtraBold 800 | Gradient 3 màu | In hoa, "VŨ TRỤ GUNDAM" (text-fill-color transparent) |
| **Mô tả Banner** | 16px (1.02rem) / Medium 500 | `#cbd5e1` | Dòng cao 1.6, tối đa rộng 600px |
| **Nút bấm chính & phụ** | 15px (0.95rem) / Bold 700 | `#ffffff` & `#e2e8f0` | In hoa, letter-spacing: 0.06em, thuần chữ |
| **Tiêu đề mục Sản phẩm** | 30px (1.9rem) / ExtraBold 800 | Gradient 3 màu | In hoa, "Sản phẩm BÁN CHẠY" |
| **Tên sản phẩm (Card)** | 16px (1rem) / Bold 700 | `#ffffff` (hover: `#38bdf8`) | In đậm cơ khí, tối đa 2 dòng |
| **Giá tiền sản phẩm** | 20px (1.25rem) / ExtraBold 800| `#f43f5e` | Phát quang nhẹ (`text-shadow`), cực kỳ nổi bật |

---

## 4. Đặc Tả Giải Pháp Chống Chìm Cho Sản Phẩm (Anti-Sink Specifications)

Để giải quyết triệt để yêu cầu: *"vũ trụ rộng lớn có sao, hành tinh nhưng các sản phẩm không bị chìm"*:

1. **Lõi Titan Đen Cơ Khí `#070d20` (Độ đục 100%):**
   - Thẻ sản phẩm không dùng bất kỳ hiệu ứng kính mờ hay độ trong suốt nào cho phần nền nội dung.
   - Khi lướt qua dải ngân hà hay cụm sao dày đặc, các ngôi sao sẽ nằm hoàn toàn phía sau lớp hợp kim này, giúp văn bản và giá tiền luôn đạt độ sắc nét và tương phản tuyệt đối.
2. **Đệm Sáng Vòm Spotlight (Backlight Dome):**
   - Đằng sau mỗi hình ảnh mô hình Gunpla (`assets/images/products/pXX.svg`), áp dụng một vệt sáng tròn tỏa từ tâm:
     `background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.25) 0%, rgba(129, 140, 248, 0.1) 45%, #040816 80%);`
   - Nhờ có luồng sáng này, các mô hình tông màu trắng (như RX-78-2, Nu Gundam, Aerial) hay tông đỏ/đen (như Sazabi, Zaku) đều nổi bật đường viền sắc nét như đang được rọi đèn trên sân khấu triển lãm.
3. **Đường Viền Phản Quang Kép & Đổ Bóng Tách Lớp:**
   - Viền thẻ sử dụng dải màu Cyan cơ khí: `border: 1px solid rgba(56, 189, 248, 0.4)`.
   - Đổ bóng sâu đa tầng: `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 15px rgba(2, 6, 23, 0.9)`.
   - Khi hover: Viền sáng bừng lên `box-shadow: 0 22px 45px rgba(56, 189, 248, 0.3)` và nâng nhẹ lên 7px.

---

## 5. Đặc Tả Mã Nguồn Mẫu (HTML5 & CSS3 Pure)

### 5.1. Cấu Trúc HTML Nâng Cấp (`index.html`)

```html
<!-- Cửa sổ Đại Vũ Trụ Toàn Trang -->
<body data-page="home" class="cosmos-universe-body">
  
  <!-- Lớp thiên thể vũ trụ (Mặt Trời, Trái Đất, Mặt Trăng) -->
  <div class="celestial-orbit-overlay" aria-hidden="true">
    <div class="solar-flare-beacon"></div>
    <div class="earth-marble"></div>
  </div>

  <div id="site-header"></div>

  <main class="container cosmos-main-content">
    
    <!-- 1. Hero Banner: Đại Chiến Không Gian -->
    <section class="hero hero-cosmic-banner">
      <div class="hero-cosmic-inner">
        
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">GUNPLA CHÍNH HÃNG BANDAI · ĐẠI CHIẾN KHÔNG GIAN</span>
        </div>

        <h1 class="hero-cosmic-title">
          LẮP RÁP HUYỀN THOẠI <br>
          <span class="text-cosmic-gradient">VŨ TRỤ GUNDAM</span>
        </h1>

        <p class="hero-cosmic-desc">
          Hơn 50 mẫu Gundam từ HG cho người mới đến PG cho dân sưu tầm, kèm đầy đủ dụng cụ và sơn để hoàn thiện mô hình như ý.
        </p>

        <!-- Nút bấm thuần chữ (không icon) -->
        <div class="hero-cosmic-cta">
          <div class="btn-cosmic-wrapper">
            <a class="btn-cosmic-primary" href="pages/products.html">MUA SẮM NGAY</a>
          </div>
          <a class="btn-cosmic-secondary" href="pages/products.html?cat=PG">XEM DÒNG PG</a>
        </div>

        <!-- Thống kê gốc -->
        <div class="hero-cosmic-stats">
          <div class="stat-item stat-cyan"><b>52+</b><span>Mẫu mô hình</span></div>
          <div class="stat-item stat-purple"><b>6.000+</b><span>Khách hàng</span></div>
          <div class="stat-item stat-red"><b>100%</b><span>Hàng chính hãng</span></div>
        </div>

      </div>
    </section>

    <!-- 2. Cam kết USP -->
    <section class="cosmos-usp-grid" id="usp"></section>

    <!-- 3. Khu vực Sản phẩm Bán Chạy (Chống chìm) -->
    <section class="section">
      <div class="products-header-bar">
        <div>
          <span class="eyebrow-cosmic">HOTTEST MOBILE SUITS · UNIVERSAL CENTURY</span>
          <h2 class="title-cosmic">Sản phẩm <span>bán chạy</span></h2>
          <p class="desc-cosmic">Trang bị các cỗ máy chiến đấu tinh nhuệ với chi tiết sắc nét và vũ khí đầy đủ</p>
        </div>
        <a class="link-cosmic" href="pages/products.html">Xem tất cả sản phẩm →</a>
      </div>
      <div class="cosmos-products-grid" id="home-best"></div>
    </section>

  </main>

  <div id="site-footer"></div>
</body>
```

### 5.2. Khung CSS Nâng Cấp (`assets/css/style.css`)

```css
/* ============================================================
   ĐẠI THIÊN HÀ VŨ TRỤ GUNDAM (100% CHAKRA PETCH & PURE CSS)
   ============================================================ */

/* Nền đại vũ trụ ngàn sao toàn trang */
.cosmos-universe-body {
  background-color: #02040a;
  background-image: 
    linear-gradient(180deg, rgba(2, 4, 10, 0.4) 0%, rgba(2, 4, 10, 0.7) 50%, rgba(2, 4, 10, 0.88) 100%),
    url('../images/deep-space-galaxy.jpg');
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Cố định vũ trụ khi cuộn */
  color: #f8fafc;
  overflow-x: hidden;
}

/* Thiên thể: Quầng sáng Mặt Trời */
.solar-flare-beacon {
  position: absolute;
  top: -50px;
  left: -50px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0%, #fef08a 25%, #f59e0b 50%, rgba(239, 68, 68, 0.25) 75%, transparent 100%);
  box-shadow: 0 0 140px rgba(245, 158, 11, 0.5), 0 0 280px rgba(251, 191, 36, 0.3);
  opacity: 0.8;
  pointer-events: none;
  z-index: 1;
}

/* Thiên thể: Địa cầu Trái Đất (Blue Marble) bên khu vực sản phẩm */
.earth-marble {
  position: absolute;
  top: 720px;
  right: 30px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: 
    radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4) 0%, transparent 25%),
    radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 35%, #0369a1 60%, #0f172a 85%, #020617 100%);
  box-shadow: 
    inset -25px -25px 45px rgba(0, 0, 0, 0.95),
    inset 12px 12px 25px rgba(186, 230, 253, 0.65),
    0 0 50px rgba(56, 189, 248, 0.4),
    0 0 120px rgba(2, 132, 199, 0.2);
  opacity: 0.85;
  pointer-events: none;
  z-index: 1;
}

/* Hero Banner Đại Chiến */
.hero-cosmic-banner {
  position: relative;
  min-height: 510px;
  background-image: 
    linear-gradient(90deg, rgba(2, 6, 23, 0.96) 0%, rgba(2, 6, 23, 0.8) 46%, rgba(2, 6, 23, 0.25) 100%),
    url('../images/gundam-space-battle.jpg');
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  padding: 52px 48px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  margin-bottom: 32px;
  border: 1px solid rgba(56, 189, 248, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
}

.hero-cosmic-banner * {
  font-family: var(--font-display) !important;
}

/* Tiêu đề chuyển sắc 3 màu */
.text-cosmic-gradient {
  background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #f43f5e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

/* Nút bấm chính: Viền Gradient 3 màu + Lõi Đen Cơ Khí */
.btn-cosmic-wrapper {
  position: relative;
  padding: 2px;
  border-radius: 10px;
  background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #f43f5e 100%);
  box-shadow: 0 0 25px rgba(129, 140, 248, 0.55), 0 0 12px rgba(56, 189, 248, 0.35);
  display: inline-block;
}

.btn-cosmic-primary {
  display: inline-block;
  background: #080e22;
  color: #ffffff;
  text-decoration: none;
  padding: 13px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: background 0.25s ease, transform 0.2s ease;
}

.btn-cosmic-primary:hover {
  background: #0e173a;
  transform: translateY(-1px);
}

/* Nút phụ: Nền kính tối mờ */
.btn-cosmic-secondary {
  display: inline-block;
  background: rgba(15, 23, 42, 0.85);
  color: #e2e8f0;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 13px 26px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14.5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition: all 0.25s ease;
}

.btn-cosmic-secondary:hover {
  background: rgba(30, 41, 59, 0.95);
  border-color: rgba(255, 255, 255, 0.45);
  transform: translateY(-1px);
}

/* THẺ SẢN PHẨM TITANIUM POD (CHỐNG CHÌM TUYỆT ĐỐI) */
.product-card {
  background: #070d20 !important; /* Lõi đặc 100%, không bị xuyên thấu sao */
  border: 1px solid rgba(56, 189, 248, 0.4) !important;
  border-radius: 14px !important;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 15px rgba(2, 6, 23, 0.9) !important;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease !important;
}

.product-card:hover {
  transform: translateY(-7px) !important;
  border-color: #38bdf8 !important;
  box-shadow: 0 22px 45px rgba(56, 189, 248, 0.3), 0 0 25px rgba(56, 189, 248, 0.2) !important;
}

/* Đệm sáng vòm Spotlight đằng sau mô hình */
.product-thumb {
  background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.25) 0%, rgba(129, 140, 248, 0.1) 45%, #040816 80%) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.product-thumb img {
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.9));
}

/* Tên & Giá phát quang */
.product-name {
  color: #ffffff !important;
  font-family: var(--font-display) !important;
  font-weight: 700 !important;
}

.product-name:hover {
  color: #38bdf8 !important;
}

.product-price .price {
  color: #f43f5e !important;
  text-shadow: 0 0 14px rgba(244, 63, 94, 0.5) !important;
  font-family: var(--font-display) !important;
  font-weight: 800 !important;
}

/* Nút thêm giỏ hàng Mecha */
.product-actions .btn {
  background: #0d152e !important;
  color: #38bdf8 !important;
  border: 1px solid rgba(56, 189, 248, 0.45) !important;
  font-family: var(--font-display) !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  transition: all 0.25s ease !important;
}

.product-actions .btn:hover {
  background: linear-gradient(90deg, #38bdf8 0%, #818cf8 100%) !important;
  color: #020617 !important;
  border-color: transparent !important;
  box-shadow: 0 0 24px rgba(56, 189, 248, 0.65) !important;
}
```

---

## 6. Danh Mục Tài Nguyên Cần Thiết (Assets Inventory)

1. **Ảnh nền đại vũ trụ ngàn sao:** `assets/images/deep-space-galaxy.jpg` (Đã lưu vào thư mục `assets/images/`).
2. **Ảnh nền banner đại chiến:** `assets/images/gundam-space-battle.jpg` (Đã lưu vào thư mục `assets/images/`).
3. **Phông chữ nội bộ:**
   - `assets/fonts/ChakraPetch-Bold.ttf` (Đã có sẵn).
   - `assets/fonts/ChakraPetch-SemiBold.ttf` (Đã có sẵn).

---

## 7. Trạng Thái Hoàn Thành & Lộ Trình Triển Khai (Status & Roadmap)

- [x] Brainstorm định hướng hình ảnh vũ trụ Gundam (Đã chốt).
- [x] Tạo ảnh đại chiến Nu Gundam vs Sazabi bằng AI (Đã hoàn thành).
- [x] Tạo ảnh đại vũ trụ ngàn sao và tinh vân rực rỡ theo ảnh tham khảo (Đã hoàn thành).
- [x] Thiết kế nút bấm thuần chữ không icon, viền phát sáng 3 màu (Đã hoàn thành).
- [x] Thống nhất phông chữ cơ khí đồng bộ 100% `Chakra Petch` (Đã hoàn thành).
- [x] Thiết kế khoang trưng bày sản phẩm chống chìm: Lõi Titan `#070d20` + đệm sáng Spotlight (Đã hoàn thành).
- [x] Cập nhật toàn bộ tài liệu thiết kế đặc tả chi tiết vào `DESIGN.md`.

*Tài liệu này là căn cứ kỹ thuật chính thức và duy nhất để triển khai mã nguồn khi có lệnh cập nhật.*
