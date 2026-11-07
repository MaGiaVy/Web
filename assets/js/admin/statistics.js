// ============================================================
// THỐNG KÊ (ADMIN) - Web tĩnh
// ============================================================
// - Bảng Top 5 khách hàng và các thẻ KPI đã được hard-code trực tiếp trong statistics.html.
// - Không sử dụng JavaScript để tính toán hay lọc dữ liệu thật từ cơ sở dữ liệu.
// - Nút "Thống kê" và các nút chọn nhanh khoảng thời gian chỉ hiển thị thông báo toast giả lập.
(function () {
  const $ = (id) => document.getElementById(id);

  // Mở sang trang danh sách đơn hàng của khách khi bấm "Xem danh sách đơn hàng"
  const tbody = $("st-body");
  if (tbody) {
    tbody.addEventListener("click", (e) => {
      const link = e.target.closest("[data-view]");
      if (!link) return;
      e.preventDefault();
      toastThenGo(link.getAttribute("href"), "Đang mở danh sách đơn hàng", `Khách hàng: ${link.dataset.view}`, "info");
    });
  }

  // Bấm nút "Thống kê": chỉ hiển thị thông báo mô phỏng thành công
  const form = $("stat-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const from = $("st-from").value, to = $("st-to").value;
      toast("Đã thống kê dữ liệu!", `Khoảng thời gian: ${from ? formatDate(from) : "..."} đến ${to ? formatDate(to) : "..."}`);
    });
  }

  // Các nút chọn nhanh thời gian (30 ngày gần nhất, Tháng này)
  document.querySelectorAll("[data-preset]").forEach((btn) => btn.addEventListener("click", () => {
    const end = new Date(2026, 10, 2);
    const start = btn.dataset.preset === "month" ? new Date(2026, 10, 1) : new Date(end.getTime() - 29 * 86400000);
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    $("st-from").value = iso(start);
    $("st-to").value = iso(end);
    toast(`Đã chọn ${btn.textContent.toLowerCase()}`, `Từ ${formatDate(iso(start))} đến ${formatDate(iso(end))}`, "info");
  }));
})();
