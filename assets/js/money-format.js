// Tự thêm dấu chấm ngăn cách hàng nghìn khi gõ giá tiền: 1250000 -> 1.250.000
// Áp dụng cho mọi ô nằm trong .money-input hoặc có thuộc tính data-money.
// Chỉ định dạng chữ hiển thị, không có dữ liệu hay cơ sở dữ liệu nào.
(function () {
  function format(el) {
    var before = el.value.slice(0, el.selectionStart).replace(/\D/g, '').length;
    var digits = el.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
    var out = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (el.value === out) return;
    el.value = out;
    // đặt con trỏ lại sau đúng số chữ số vừa gõ (xóa/sửa giữa dãy số vẫn đúng chỗ)
    var i = 0, count = 0;
    while (i < out.length && count < before) { if (out.charAt(i) !== '.') count++; i++; }
    el.setSelectionRange(i, i);
  }
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el && el.matches && el.matches('.money-input input, input[data-money]')) format(el);
  });
})();
