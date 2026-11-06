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

  const featured = [37, 1, 2, 6, 3].map((id) => SHOP_PRODUCTS.find((product) => product.id === id)).filter(Boolean);
  const hero = document.getElementById("hero-carousel");
  if (hero && featured.length) {
    const mainImage = hero.querySelector(".hero-art img");
    const indexMark = hero.querySelector(".hero-art-index");
    const sideLeft = hero.querySelector(".hero-side-image-left");
    const sideRight = hero.querySelector(".hero-side-image-right");
    const caption = hero.querySelector(".hero-copy p");
    let activeIndex = 0;
    let isAnimating = false;
    const renderFeatured = (index) => {
      activeIndex = (index + featured.length) % featured.length;
      const current = featured[activeIndex];
      const previous = featured[(activeIndex - 1 + featured.length) % featured.length];
      const next = featured[(activeIndex + 1) % featured.length];
      mainImage.src = asset(current.image);
      mainImage.alt = `Hình minh họa: ${current.name}`;
      sideLeft.src = asset(previous.image);
      sideRight.src = asset(next.image);
      indexMark.innerHTML = `F&amp;F<br>${String(activeIndex + 1).padStart(2, "0")}`;
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

      isAnimating = true;
      const centerCard = hero.querySelector(".hero-art");
      const leftCard = hero.querySelector(".hero-side-left");
      const rightCard = hero.querySelector(".hero-side-right");
      const centerRect = centerCard.getBoundingClientRect();
      const leftRect = leftCard.getBoundingClientRect();
      const rightRect = rightCard.getBoundingClientRect();
      const center = { x: centerRect.left + centerRect.width / 2, y: centerRect.top + centerRect.height / 2 };
      const left = { x: leftRect.left + leftRect.width / 2, y: leftRect.top + leftRect.height / 2 };
      const right = { x: rightRect.left + rightRect.width / 2, y: rightRect.top + rightRect.height / 2 };
      const destinations = direction > 0
        ? [[centerCard, left, .78], [rightCard, center, 1.24], [leftCard, { x: center.x * 2 - left.x, y: left.y }, 1]]
        : [[centerCard, right, .78], [leftCard, center, 1.24], [rightCard, { x: center.x * 2 - right.x, y: right.y }, 1]];
      const motions = destinations.map(([element, destination, scale]) => {
        const rect = element.getBoundingClientRect();
        const startTransform = getComputedStyle(element).transform;
        const currentMatrix = new DOMMatrix(startTransform === "none" ? undefined : startTransform);
        const layoutCenterX = rect.left + rect.width / 2 - currentMatrix.m41;
        const layoutCenterY = rect.top + rect.height / 2 - currentMatrix.m42;
        const dx = destination.x - layoutCenterX;
        const dy = destination.y - layoutCenterY;
        return element.animate([
          { transform: startTransform === "none" ? "translate(0, 0)" : startTransform, opacity: 1 },
          { transform: `translate(${dx * .72}px, ${dy * .72}px) scale(${scale * 1.06})`, opacity: .92, offset: .72 },
          { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: .88 },
        ], { duration: 620, easing: "cubic-bezier(.12, .88, .22, 1)" });
      });
      Promise.all(motions.map((motion) => motion.finished)).then(() => {
        renderFeatured(nextIndex);
        motions.forEach((motion) => motion.cancel());
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
