// Homepage merchandising for the Frame & Form concept storefront.
(function () {
  const featuredCategories = [
    { id: "HG", title: "Mẫu gọn để làm quen", note: "Lựa chọn gọn nhẹ cho lần đầu thử lắp mô hình." },
    { id: "PG", title: "Mẫu cỡ lớn để trưng bày", note: "Thiết kế nổi bật, phù hợp đặt trên kệ." },
    { id: "TOOL", title: "Đồ nghề lắp ráp", note: "Kìm, dao và vật dụng giúp bạn hoàn thiện mô hình." },
  ];

  document.getElementById("home-categories").innerHTML = featuredCategories.map((category, index) => {
    const products = SHOP_PRODUCTS.filter((product) => product.category === category.id);
    const cover = products[0];
    return `
      <a class="cat-card category-feature category-feature-${index + 1}" href="${page("products.html")}?cat=${category.id}">
        <div class="category-feature-image"><img src="${asset(cover.image)}" alt="Hình minh họa: ${category.title}" loading="lazy"></div>
        <div class="category-feature-copy">
          <span class="category-count">${String(index + 1).padStart(2, "0")} / ${products.length} mẫu</span>
          <b>${category.title}</b>
          <small>${category.note}</small>
          <span class="category-arrow" aria-hidden="true">↗</span>
        </div>
      </a>`;
  }).join("");

  const studioPickIds = [1, 13, 16, 31];
  const best = studioPickIds.map((id) => SHOP_PRODUCTS.find((product) => product.id === id)).filter(Boolean);
  const homeProductCard = (product) => `
    <article class="product-card">
      <a class="product-thumb" href="${page("product.html")}?id=${product.id}">
        <img src="${asset(product.image)}" alt="Ảnh minh họa: ${escapeHtml(product.name)}" loading="lazy">
      </a>
      <div class="product-body">
        <div class="product-meta"><span>${CATEGORY_LABELS[product.category] || "Mô hình sưu tầm"}</span></div>
        <a class="product-name" href="${page("product.html")}?id=${product.id}">${escapeHtml(product.name)}</a>
        <div class="product-price"><span class="price">${money(product.price)}</span></div>
        <div class="product-actions"><button class="btn btn-dark btn-sm" data-add-cart="${product.id}">${icon("cart")} Thêm vào giỏ</button></div>
      </div>
    </article>`;
  document.getElementById("home-best").innerHTML = best.map(homeProductCard).join("");

  const featured = [22, 9, 23, 15].map((id) => SHOP_PRODUCTS.find((product) => product.id === id)).filter(Boolean);
  const hero = document.getElementById("hero-carousel");
  if (hero && featured.length) {
    const mainImage = hero.querySelector(".hero-art img");
    const sideLeft = hero.querySelector(".hero-side-image-left");
    const sideRight = hero.querySelector(".hero-side-image-right");
    const caption = hero.querySelector(".hero-copy p");
    let activeIndex = 0;
    let isAnimating = false;
    // Băng chuyền dùng ảnh nền trong suốt (products/cutout/*.webp) để mô hình đứng trực tiếp trên nền trang
    const cutout = (product) => asset(product.image.replace("products/", "products/cutout/").replace(".jpg", ".webp"));
    const renderFeatured = (index) => {
      activeIndex = (index + featured.length) % featured.length;
      const current = featured[activeIndex];
      const previous = featured[(activeIndex - 1 + featured.length) % featured.length];
      const next = featured[(activeIndex + 1) % featured.length];
      mainImage.src = cutout(current);
      mainImage.alt = `Hình minh họa: ${current.name}`;
      sideLeft.src = cutout(previous);
      sideRight.src = cutout(next);
      caption.innerHTML = `${CATEGORY_LABELS[current.category] || "Mô hình sưu tầm"}<small>${escapeHtml(current.name)}</small><b class="hero-price">${money(current.price)}</b>`;
      hero.setAttribute("aria-label", `Mẫu nổi bật ${activeIndex + 1} trên ${featured.length}: ${current.name}`);
    };
    const showFeatured = (direction) => {
      if (isAnimating) return;
      const nextIndex = (activeIndex + direction + featured.length) % featured.length;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        renderFeatured(nextIndex);
        return;
      }

      // Chuyển mẫu: trượt ngang + mờ dần, không phóng to/thu nhỏ
      isAnimating = true;
      const images = [mainImage, sideLeft, sideRight];
      const shift = direction > 0 ? -36 : 36;
      const timing = { duration: 220, easing: "ease-in", fill: "forwards" };
      const outs = images.map((img) => img.animate([
        { transform: "translateX(0)", opacity: 1 },
        { transform: `translateX(${shift}px)`, opacity: 0 },
      ], timing));
      Promise.all(outs.map((a) => a.finished)).then(async () => {
        renderFeatured(nextIndex);
        await Promise.all(images.map((img) => img.decode().catch(() => {})));
        outs.forEach((a) => a.cancel());
        const ins = images.map((img) => img.animate([
          { transform: `translateX(${-shift}px)`, opacity: 0 },
          { transform: "translateX(0)", opacity: 1 },
        ], { duration: 280, easing: "ease-out" }));
        await Promise.all(ins.map((a) => a.finished));
        isAnimating = false;
      }).catch(() => { isAnimating = false; });
    };
    document.getElementById("hero-prev").addEventListener("click", () => showFeatured(-1));
    document.getElementById("hero-next").addEventListener("click", () => showFeatured(1));
    let touchStartX = 0;
    hero.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", (event) => {
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 45) showFeatured(delta < 0 ? 1 : -1);
    }, { passive: true });
    renderFeatured(activeIndex);
  }

  bindAddToCart();
})();
