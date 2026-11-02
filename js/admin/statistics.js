// THỐNG KÊ: top 5 khách hàng mua nhiều nhất trong khoảng thời gian
// Mỗi khách chỉ hiện số đơn + tổng tiền; bấm "Xem danh sách đơn hàng" để sang trang danh sách đơn (mỗi đơn có link chi tiết)
(function () {
  const $ = (id) => document.getElementById(id);
  $("st-submit").innerHTML = `${icon("chart")} Thống kê`;

  function compute(from, to) {
    const inRange = ORDERS.filter((o) => {
      const day = o.datetime.slice(0, 10);
      return o.status !== "cancelled" && (!from || day >= from) && (!to || day <= to);
    });
    const byUser = {};
    inRange.forEach((o) => {
      if (!byUser[o.userId]) byUser[o.userId] = { user: getUser(o.userId), orders: [], total: 0 };
      byUser[o.userId].orders.push(o);
      byUser[o.userId].total += o.total;
    });
    const ranking = Object.values(byUser).sort((a, b) => b.total - a.total);
    return { inRange, ranking, top: ranking.slice(0, 5) };
  }

  function render() {
    let from = $("st-from").value;
    let to = $("st-to").value;
    if (from && to && from > to) {
      [from, to] = [to, from];
      $("st-from").value = from; $("st-to").value = to;
      toast("Khoảng ngày bị ngược", "Hệ thống đã tự đổi lại cho đúng", "warning");
    }
    const { inRange, ranking, top } = compute(from, to);
    const revenue = inRange.reduce((s, o) => s + o.total, 0);
    const topSum = top.reduce((s, r) => s + r.total, 0);

    $("st-kpis").innerHTML = [
      ["wallet", "Tổng giá trị đơn", money(revenue), `${from ? formatDate(from) : "..."} - ${to ? formatDate(to) : "..."}`],
      ["orders", "Số đơn hàng", inRange.length, "Không tính đơn đã hủy"],
      ["users", "Khách có mua hàng", ranking.length, "Trong khoảng thời gian trên"],
      ["medal", "Top 5 đóng góp", revenue ? Math.round((topSum / revenue) * 100) + "%" : "0%", `${money(topSum)} từ 5 khách hàng`],
    ].map(([ic, label, value, sub]) => `
      <div class="card kpi"><div class="kpi-icon">${icon(ic)}</div>
        <div><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-sub">${sub}</div></div></div>`).join("");

    $("st-title").innerHTML = `${icon("medal")} Top 5 khách hàng mua nhiều nhất`;
    $("st-body").innerHTML = top.length ? top.map((r, i) => {
      const share = revenue ? Math.round((r.total / revenue) * 100) : 0;
      return `
        <tr>
          <td class="center"><span class="rank rank-${i + 1}">${i + 1}</span></td>
          <td><div class="cell-user"><span class="avatar">${initials(r.user.name)}</span><div><b>${escapeHtml(r.user.name)}</b><small>${r.user.email}</small></div></div></td>
          <td class="center num"><b>${r.orders.length}</b> đơn</td>
          <td><div class="share"><div class="share-bar"><span style="width:${share}%"></span></div>${share}%</div></td>
          <td class="right num"><b class="text-red" style="font-size:16px">${money(r.total)}</b></td>
          <td class="right"><a class="btn btn-dark btn-sm" data-view="${escapeHtml(r.user.name)}" href="orders.html?user=${r.user.id}&from=${from}&to=${to}">${icon("orders")} Xem danh sách đơn hàng</a></td>
        </tr>`;
    }).join("") : `<tr><td colspan="6"><div class="empty-state">${icon("chart")}<h3>Không có dữ liệu</h3><p>Không có đơn hàng nào trong khoảng thời gian này.</p></div></td></tr>`;
    return top.length;
  }

  // Mở sang trang danh sách đơn hàng của khách (trong khoảng thời gian đã chọn)
  $("st-body").addEventListener("click", (e) => {
    const link = e.target.closest("[data-view]");
    if (!link) return;
    e.preventDefault();
    toastThenGo(link.getAttribute("href"), "Đang mở danh sách đơn hàng", `Khách hàng: ${link.dataset.view}`, "info");
  });

  $("stat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const n = render();
    toast("Thống kê hoàn tất", n ? `Đã tìm ra top ${n} khách hàng` : "Không có dữ liệu trong khoảng thời gian này", n ? "success" : "warning");
  });

  document.querySelectorAll("[data-preset]").forEach((btn) => btn.addEventListener("click", () => {
    const end = new Date(2026, 10, 2);
    const start = btn.dataset.preset === "month" ? new Date(2026, 10, 1) : new Date(end.getTime() - 29 * 86400000);
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    $("st-from").value = iso(start);
    $("st-to").value = iso(end);
    const n = render();
    toast(`Thống kê ${btn.textContent.toLowerCase()}`, `${n} khách hàng có phát sinh đơn`, "info");
  }));

  render();
})();
