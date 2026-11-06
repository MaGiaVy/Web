// EMAIL KHÁCH HÀNG (web tĩnh): soạn email thông báo chương trình / mã giảm giá
// Lưu nháp, Gửi thử, Gửi đều chỉ hiện thông báo; khung xem trước cập nhật theo nội dung đang gõ
(function () {
  const $ = (id) => document.getElementById(id);

  // Số người nhận của từng nhóm, tính từ dữ liệu mẫu
  const valid = ORDERS.filter((o) => o.status !== "cancelled");
  const lastOrderOf = (u) => valid.filter((o) => o.userId === u.id).map((o) => o.datetime.slice(0, 10)).sort().pop();
  const active = USERS.filter((u) => u.status !== "locked");
  const audienceUsers = {
    all: active,
    buyers: active.filter((u) => lastOrderOf(u)),
    new: active.filter((u) => !lastOrderOf(u)),
  };

  // ---------- Ô số liệu ----------
  const sent = EMAIL_CAMPAIGNS.filter((c) => c.status === "sent");
  const totalSent = sent.reduce((s, c) => s + c.sent, 0);
  const totalOpened = sent.reduce((s, c) => s + c.opened, 0);
  $("mail-kpis").innerHTML = [
    ["mail", "Chiến dịch đã gửi", sent.length, `${EMAIL_CAMPAIGNS.length - sent.length} bản nháp`, "kpi-blue"],
    ["users", "Tổng lượt email đã gửi", totalSent, `cộng dồn ${sent.length} chiến dịch`, "kpi-purple"],
    ["eye", "Tỉ lệ mở trung bình", `${totalSent ? Math.round((totalOpened / totalSent) * 100) : 0}%`, `${totalOpened} lượt mở`, "kpi-green"],
  ].map(([ic, label, value, sub, color]) => `
    <div class="card kpi"><div class="kpi-icon ${color}">${icon(ic)}</div>
      <div><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div></div>`).join("");

  // ---------- Soạn email ----------
  $("h-compose").innerHTML = `${icon("edit")} Soạn email mới`;
  $("ml-send").innerHTML = `${icon("mail")} Gửi email`;
  $("ml-audience").innerHTML = Object.entries(EMAIL_AUDIENCES)
    .map(([k, label]) => `<option value="${k}">${label} (${audienceUsers[k].length} người)</option>`).join("");
  $("ml-coupon").innerHTML = `<option value="">Không kèm mã</option>` +
    COUPONS.filter((c) => c.status === "active").map((c) => `<option value="${c.code}">${c.code} – ${couponValueText(c)}</option>`).join("");

  // Nội dung mẫu theo chương trình đang chạy
  function fillTemplate() {
    $("ml-subject").value = `${PROMOTION.name}: giảm đến ${maxSaleDiscount()}% cho góc sưu tầm của bạn`;
    $("ml-audience").value = "all";
    $("ml-coupon").value = "GUNPLA10";
    $("ml-body").value = `Chào bạn,\n\n${PROMOTION.name} đã bắt đầu tại Frame & Form! Nhiều mẫu đang được giảm đến ${maxSaleDiscount()}%, cùng nhiều ưu đãi cho người yêu sưu tầm.\n\nHẹn gặp bạn tại cửa hàng.\nFrame & Form`;
  }
  function renderPreview() {
    const c = COUPONS.find((x) => x.code === $("ml-coupon").value);
    const body = escapeHtml($("ml-body").value).replace(/\n/g, "<br>");
    $("ml-preview").innerHTML = `
      <div class="mail-meta"><small>Từ</small><b>Frame &amp; Form &lt;${STORE_INFO.email}&gt;</b></div>
      <div class="mail-meta"><small>Đến</small><b>${EMAIL_AUDIENCES[$("ml-audience").value]}</b></div>
      <div class="mail-meta"><small>Tiêu đề</small><b>${escapeHtml($("ml-subject").value) || "(chưa có tiêu đề)"}</b></div>
      <div class="mail-sheet">
        <div class="mail-brand">FRAME <em>&amp; FORM</em></div>
        <p>${body || "<span class='muted'>(chưa có nội dung)</span>"}</p>
        ${c ? `<div class="mail-coupon"><small>Mã giảm giá của bạn</small><b>${c.code}</b><span>${escapeHtml(c.desc)}</span></div>` : ""}
        <span class="mail-btn">Mua sắm ngay</span>
        <small class="mail-foot">${storeAddress()} · Hotline ${STORE_INFO.hotline}</small>
      </div>`;
  }
  fillTemplate();
  renderPreview();
  ["ml-subject", "ml-body"].forEach((id) => $(id).addEventListener("input", renderPreview));
  ["ml-audience", "ml-coupon"].forEach((id) => $(id).addEventListener("change", renderPreview));

  $("ml-draft").addEventListener("click", () => toast("Đã lưu bản nháp", escapeHtml($("ml-subject").value)));
  $("mail-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const n = audienceUsers[$("ml-audience").value].length;
    const ok = await confirmDialog({
      title: "Gửi email này?",
      message: `Email sẽ được gửi tới <b>${n} khách</b> (${EMAIL_AUDIENCES[$("ml-audience").value].toLowerCase()}).`,
      okText: "Gửi ngay", cancelText: "Để sau", iconName: "mail",
    });
    if (!ok) return toast("Chưa gửi email", "Bạn có thể lưu nháp để gửi sau", "info");
    toast("Đã gửi email", `${escapeHtml($("ml-subject").value)} · ${n} người nhận`);
  });

  // ---------- Danh sách chiến dịch ----------
  $("h-campaigns").innerHTML = `${icon("orders")} Các email đã tạo`;
  // Bản nháp lên đầu, sau đó email mới gửi trước
  const campaigns = [...EMAIL_CAMPAIGNS].sort((a, b) => (a.status === "draft") !== (b.status === "draft") ? (a.status === "draft" ? -1 : 1) : b.date.localeCompare(a.date));
  pagedList($("mail-body"), $("mail-foot"), campaigns, (m) => `<tr>
      <td><b>${escapeHtml(m.subject)}</b></td>
      <td>${EMAIL_AUDIENCES[m.audience]}</td>
      <td>${m.coupon ? `<span class="coupon-code">${m.coupon}</span>` : `<span class="muted">—</span>`}</td>
      <td class="nowrap">${m.date ? formatDateTime(m.date) : `<span class="muted">Chưa gửi</span>`}</td>
      <td class="center num">${m.sent || "—"}</td>
      <td class="center num">${m.sent ? Math.round((m.opened / m.sent) * 100) + "%" : "—"}</td>
      <td>${m.status === "sent" ? `<span class="chip chip-delivered">Đã gửi</span>` : `<span class="chip chip-gray">Bản nháp</span>`}</td>
      <td class="right nowrap">${m.status === "draft"
        ? `<button class="btn btn-dark btn-sm" data-open="${m.id}">${icon("edit")} Mở bản nháp</button>`
        : `<button class="btn btn-outline btn-sm" data-open="${m.id}">${icon("copy")} Dùng lại</button>`}</td>
    </tr>`, "email đã tạo");
  $("mail-body").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    const m = EMAIL_CAMPAIGNS.find((x) => x.id === Number(btn.dataset.open));
    $("ml-subject").value = m.subject;
    $("ml-audience").value = m.audience;
    $("ml-coupon").value = m.coupon;
    renderPreview();
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast(m.status === "draft" ? "Đã mở bản nháp" : "Đã chép nội dung email", escapeHtml(m.subject), "info");
  });
})();
