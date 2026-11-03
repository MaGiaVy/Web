// TÀI KHOẢN: sửa thông tin cá nhân (tên), sổ địa chỉ (thêm địa chỉ khác), đổi mật khẩu
// Web tĩnh: mọi thao tác chỉ hiện thông báo, không lưu thật
(function () {
  const user = currentUser();
  const addresses = user.addresses.map((a) => ({ ...a }));
  const $ = (id) => document.getElementById(id);

  $("h-profile").innerHTML = `${icon("user")} Hồ sơ của tôi`;
  $("h-address").innerHTML = `${icon("map")} Sổ địa chỉ`;
  $("h-password").innerHTML = `${icon("key")} Đổi mật khẩu`;
  $("add-address-btn").innerHTML = `${icon("plus")} Thêm địa chỉ mới`;

  $("account-nav").innerHTML = `
    <a href="#profile" class="active">${icon("user")} Hồ sơ của tôi</a>
    <a href="#addresses">${icon("map")} Sổ địa chỉ</a>
    <a href="#password">${icon("key")} Đổi mật khẩu</a>
    <a href="orders.html">${icon("orders")} Lịch sử mua hàng</a>
    <a href="#" class="danger" data-logout>${icon("logout")} Đăng xuất</a>`;
  bindLogout($("account-nav"));
  $("account-nav").addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]:not([data-logout])');
    if (e.target.closest("[data-logout]")) e.preventDefault();
    if (!a) return;
    $("account-nav").querySelectorAll("a").forEach((x) => x.classList.toggle("active", x === a));
  });

  // ---------- Hồ sơ ----------
  function renderName(name) {
    $("side-profile").innerHTML = `<span class="avatar">${initials(name)}</span><div><b>${escapeHtml(name)}</b><small>Thành viên từ ${formatDate(user.joined)}</small></div>`;
    $("profile-head").innerHTML = `<span class="avatar">${initials(name)}</span><div><h3>${escapeHtml(name)}</h3><p>${user.email} · Thành viên Bạc</p></div>`;
  }
  function fillProfile() {
    $("pf-name").value = user.name;
    $("pf-email").value = user.email;
    $("pf-phone").value = user.phone;
    $("pf-birthday").value = user.birthday;
    $("pf-gender").innerHTML = ["Nam", "Nữ", "Khác"].map((g) =>
      `<label style="display:flex;gap:8px;align-items:center;font-weight:500"><input type="radio" name="gender" value="${g}" ${user.gender === g ? "checked" : ""}> ${g}</label>`).join("");
    renderName(user.name);
  }
  fillProfile();

  $("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Web tĩnh: chỉ hiện thông báo, không lưu thật
    const name = $("pf-name").value.trim() || user.name;
    toast("Cập nhật hồ sơ thành công", `Tên mới: ${escapeHtml(name)}`);
  });
  $("pf-reset").addEventListener("click", () => {
    fillProfile();
    toast("Đã hủy thay đổi", "Thông tin được khôi phục như ban đầu", "info");
  });

  // ---------- Sổ địa chỉ ----------
  function renderAddresses() {
    $("address-list").innerHTML = addresses.map((a) => `
      <div class="address-card ${a.isDefault ? "default" : ""}" data-id="${a.id}">
        <div class="top"><b>${escapeHtml(a.receiver)}</b><span class="muted">| ${escapeHtml(a.phone)}</span>
          <span class="chip chip-gray no-dot">${a.label}</span>${a.isDefault ? '<span class="chip chip-confirmed no-dot">Mặc định</span>' : ""}</div>
        <p>${escapeHtml(fullAddress(a))}</p>
        <div class="actions">
          ${a.isDefault ? "" : `<button class="btn btn-outline btn-sm" data-default>${icon("check")} Đặt mặc định</button>`}
          <button class="btn btn-ghost btn-sm" data-delete style="margin-left:auto;color:var(--red)">${icon("trash")} Xóa</button>
        </div>
      </div>`).join("");
  }
  renderAddresses();

  $("ad-city").innerHTML = Object.keys(LOCATIONS).map((c) => `<option>${c}</option>`).join("");
  const fillDistricts = () => { $("ad-ward").innerHTML = LOCATIONS[$("ad-city").value].map((d) => `<option>${d}</option>`).join(""); };
  fillDistricts();
  $("ad-city").addEventListener("change", fillDistricts);

  $("add-address-btn").addEventListener("click", () => {
    $("address-form").classList.add("show");
    $("ad-name").value = user.name;
    $("ad-phone").value = user.phone;
    $("ad-street").focus();
    toast("Thêm địa chỉ mới", "Điền thông tin vào biểu mẫu bên dưới", "info");
  });
  $("ad-cancel").addEventListener("click", () => {
    $("address-form").classList.remove("show");
    $("address-form").reset();
    fillDistricts();
    toast("Đã hủy thêm địa chỉ", "", "info");
  });

  // Không ràng buộc dữ liệu: ô nào để trống thì dùng giá trị mặc định
  $("address-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Web tĩnh: chỉ hiện thông báo, không thêm thật vào danh sách
    const street = $("ad-street").value.trim() || "Số nhà, tên đường";
    const text = `${street}, ${$("ad-ward").value}, ${$("ad-city").value}`;
    $("address-form").classList.remove("show");
    $("address-form").reset();
    fillDistricts();
    toast("Đã thêm địa chỉ mới", escapeHtml(text));
  });

  $("address-list").addEventListener("click", async (e) => {
    const card = e.target.closest(".address-card");
    if (!card) return;
    const addr = addresses.find((a) => a.id === Number(card.dataset.id));
    if (e.target.closest("[data-default]")) {
      toast("Đã đặt địa chỉ mặc định", fullAddress(addr));
    } else if (e.target.closest("[data-delete]")) {
      if (addr.isDefault) return toast("Không thể xóa địa chỉ mặc định", "Hãy đặt địa chỉ khác làm mặc định trước", "warning");
      const ok = await confirmDialog({ title: "Xóa địa chỉ?", message: escapeHtml(fullAddress(addr)), okText: "Xóa", danger: true });
      if (!ok) return toast("Đã hủy thao tác", "", "info");
      toast("Đã xóa địa chỉ", escapeHtml(fullAddress(addr)));
    }
  });

  $("password-form").addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Đổi mật khẩu thành công", "Lần đăng nhập sau hãy dùng mật khẩu mới");
  });

  if (location.hash === "#addresses") {
    $("account-nav").querySelectorAll("a").forEach((x) => x.classList.toggle("active", x.getAttribute("href") === "#addresses"));
  }
})();
