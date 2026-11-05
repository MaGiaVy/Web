// TÀI KHOẢN: sửa thông tin cá nhân (tên), sổ địa chỉ (thêm địa chỉ khác), đổi mật khẩu
// Web tĩnh: mọi thao tác chỉ hiện thông báo, không lưu thật
(function () {
  const user = currentUser();
  const addresses = user.addresses.map((a) => ({ ...a }));
  const $ = (id) => document.getElementById(id);
  let editingId = null; // null = đang thêm mới, số = đang sửa địa chỉ có id đó
  // Giá trị "đã lưu gần nhất" (chỉ nhớ trong trang, không lưu thật).
  // Chỉ thông báo khi giá trị nhập khác với giá trị này, rồi cập nhật lại để lần bấm sau không báo trùng.
  const saved = { name: user.name, email: user.email, phone: user.phone, birthday: user.birthday };
  let lastAddressText = null; // địa chỉ vừa thông báo gần nhất

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
    $("pf-name").value = saved.name;
    $("pf-email").value = saved.email;
    $("pf-phone").value = saved.phone;
    $("pf-birthday").value = saved.birthday;
    $("pf-gender").innerHTML = ["Nam", "Nữ", "Khác"].map((g) =>
      `<label style="display:flex;gap:8px;align-items:center;font-weight:500"><input type="radio" name="gender" value="${g}" ${user.gender === g ? "checked" : ""}> ${g}</label>`).join("");
    renderName(saved.name);
  }
  fillProfile();

  $("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Web tĩnh: chỉ hiện thông báo, không lưu thật (giá trị trong ô nhập giữ nguyên)
    const name = $("pf-name").value.trim();
    const email = $("pf-email").value.trim();
    const phone = $("pf-phone").value.trim();
    const birthday = $("pf-birthday").value;
    const changed = (name && name !== saved.name) || (email && email !== saved.email) || (phone && phone !== saved.phone) || (birthday && birthday !== saved.birthday);
    // Không có gì mới so với lần lưu trước thì không báo lại
    if (!changed) return;
    // Ghi nhận giá trị mới làm mốc, thông báo 1 lần duy nhất
    if (name) saved.name = name;
    if (email) saved.email = email;
    if (phone) saved.phone = phone;
    if (birthday) saved.birthday = birthday;
    toast("Đã cập nhật thông tin");
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
          <button class="btn btn-outline btn-sm" data-edit>${icon("edit")} Sửa</button>
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
    editingId = null;
    $("address-form").querySelector("h3").textContent = "Thêm địa chỉ mới";
    $("address-form").classList.add("show");
    $("ad-name").value = user.name;
    $("ad-phone").value = user.phone;
    $("ad-street").focus();
    toast("Thêm địa chỉ mới", "Điền thông tin vào biểu mẫu bên dưới", "info");
  });
  $("ad-cancel").addEventListener("click", () => {
    editingId = null;
    $("address-form").classList.remove("show");
    $("address-form").reset();
    fillDistricts();
    toast("Đã hủy thêm địa chỉ", "", "info");
  });

  // Không ràng buộc dữ liệu: ô nào để trống thì dùng giá trị mặc định
  $("address-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Web tĩnh: chỉ hiện thông báo, không thêm / sửa thật vào danh sách
    const street = $("ad-street").value.trim() || "Số nhà, tên đường";
    const text = `${street}, ${$("ad-ward").value}, ${$("ad-city").value}`;
    const isEdit = editingId !== null;
    editingId = null;
    $("address-form").classList.remove("show");
    $("address-form").reset();
    fillDistricts();
    // Địa chỉ giống lần vừa báo thì không báo lại
    if (text === lastAddressText) return;
    lastAddressText = text;
    toast(isEdit ? "Đã đổi địa chỉ" : "Đã thêm địa chỉ mới", escapeHtml(text));
  });

  $("address-list").addEventListener("click", async (e) => {
    const card = e.target.closest(".address-card");
    if (!card) return;
    const addr = addresses.find((a) => a.id === Number(card.dataset.id));
    if (e.target.closest("[data-edit]")) {
      editingId = addr.id;
      const f = $("address-form");
      f.querySelector("h3").textContent = "Sửa địa chỉ";
      f.classList.add("show");
      $("ad-name").value = addr.receiver;
      $("ad-phone").value = addr.phone;
      $("ad-city").value = addr.city;
      fillDistricts();
      $("ad-ward").value = addr.ward;
      $("ad-street").value = addr.street;
      $("ad-label").value = addr.label;
      $("ad-default").checked = addr.isDefault;
      f.scrollIntoView({ behavior: "smooth", block: "center" });
      toast("Sửa địa chỉ", "Chỉnh thông tin trong biểu mẫu rồi bấm Lưu địa chỉ", "info");
    } else if (e.target.closest("[data-default]")) {
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
