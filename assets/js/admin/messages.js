// LỜI NHẮN LIÊN HỆ (web tĩnh): khách gửi từ trang Liên hệ
// Phản hồi / Đánh dấu đã phản hồi chỉ hiện thông báo, trạng thái giữ nguyên
(function () {
  const $ = (id) => document.getElementById(id);
  const fresh = CONTACT_MESSAGES.filter((m) => m.status === "new").length;
  $("h-messages").innerHTML = `${icon("note")} Lời nhắn từ khách <span class="muted">· ${fresh} mới / ${CONTACT_MESSAGES.length} lời nhắn</span>`;

  pagedList($("msg-list"), $("msg-foot"), CONTACT_MESSAGES, (m) => `
    <article class="message-item ${m.status === "new" ? "is-new" : ""}">
      <div class="cell-user"><span class="avatar">${initials(m.name)}</span><div><b>${escapeHtml(m.name)}</b><small>${m.phone} · ${m.email}</small></div></div>
      <p class="message-text">${escapeHtml(m.message)}</p>
      <div class="message-side">
        <small>${formatDateTime(m.date)}</small>
        ${m.status === "new" ? `<span class="chip chip-pending">Mới</span>` : `<span class="chip chip-delivered">Đã phản hồi</span>`}
      </div>
      <div class="message-actions">
        <button class="btn ${m.status === "new" ? "btn-dark" : "btn-outline"} btn-sm" data-reply="${m.id}">${icon("mail")} Phản hồi</button>
        ${m.status === "new" ? `<button class="btn btn-outline btn-sm" data-done="${m.id}">${icon("check")} Đánh dấu đã phản hồi</button>` : ""}
      </div>
    </article>`, "lời nhắn");

  $("msg-list").addEventListener("click", async (e) => {
    const reply = e.target.closest("[data-reply]");
    const done = e.target.closest("[data-done]");
    if (!reply && !done) return;
    const m = CONTACT_MESSAGES.find((x) => x.id === Number((reply || done).dataset.reply || (reply || done).dataset.done));
    if (done) return toast("Đã đánh dấu đã phản hồi", `Lời nhắn của ${escapeHtml(m.name)}`);

    const asking = confirmDialog({
      title: `Phản hồi ${escapeHtml(m.name)}`,
      message: `Email sẽ được gửi tới <b>${m.email}</b>.`,
      body: `<label class="field"><span>Nội dung phản hồi</span>
        <textarea class="textarea" id="reply-text" rows="4">Chào ${escapeHtml(m.name)},\n\nCảm ơn bạn đã liên hệ Frame & Form. </textarea></label>`,
      okText: "Gửi phản hồi", cancelText: "Hủy", iconName: "mail",
    });
    const ok = await asking;
    if (!ok) return toast("Chưa gửi phản hồi", "", "info");
    toast("Đã gửi phản hồi", `Tới ${m.email}`);
  });
})();
