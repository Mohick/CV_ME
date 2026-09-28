export const setupScrollAnimation = (
  realScrollEl: HTMLElement,
  fakeScrollEl: HTMLElement,
) => {
  const handleScroll = () => {
    // Chiều cao cố định của item real-scroll
    const realItemHeight = 300;
    const fakeItemHeight = 40;
    const scrollTop = realScrollEl.scrollTop;

    // 1. Đồng bộ cuộn (kéo fake scroll lên/xuống)
    const translateY = (scrollTop / realItemHeight) * fakeItemHeight;
    fakeScrollEl.style.transform = `translateY(-${translateY}px)`;

    // 2. Tính toán item nào đang nằm ở vị trí trung tâm
    const activeIndex = Math.round(scrollTop / realItemHeight);

    // Lưu lại ID vào sessionStorage (Chỉ lưu khi index thực sự thay đổi để tối ưu hiệu suất)
    if ((realScrollEl as any)._lastActiveIndex !== activeIndex) {
      (realScrollEl as any)._lastActiveIndex = activeIndex;
      
      const fakeItems = fakeScrollEl.children;
      const activeItem = fakeItems[activeIndex] as HTMLElement;
      if (activeItem) {
        const id = activeItem.getAttribute("data-id");
        if (id) {
          // Bắn sự kiện ra ngoài để React Component có thể hứng được
          window.dispatchEvent(new CustomEvent("languageChanged", { detail: id }));
        }
      }
    }

    // 3. Thay đổi Class (Thêm/Gỡ) cho từng item
    const fakeItems = fakeScrollEl.children;
    for (let i = 0; i < fakeItems.length; i++) {
      const item = fakeItems[i] as HTMLElement;

      // Mẹo: Thêm transition-all vào item sẵn trong JSX để khi class đổi nó sẽ tự hiệu ứng mượt
      if (i === activeIndex) {
        // Item ở giữa: Chữ đậm, màu gradient tím/xanh, to hơn, có ánh sáng (Glow)
        item.classList.add(
          "text-indigo-600",
          "dark:text-cyan-400",
          "font-black",
          "scale-[1.2]",
          "drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]"
        );
        item.classList.remove("text-slate-500", "scale-[0.8]", "opacity-50");
      } else {
        // Item bên ngoài: Chữ xám, scale nhỏ lại, hơi mờ
        item.classList.remove(
          "text-indigo-600",
          "dark:text-cyan-400",
          "font-black",
          "scale-[1.2]",
          "drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]"
        );
        item.classList.add("text-slate-500", "scale-[0.8]", "opacity-50");
      }
    }
  };

  // Gắn sự kiện cuộn
  realScrollEl.addEventListener("scroll", handleScroll);

  // Chạy ngay lần đầu tiên để setup item đầu tiên màu xanh
  handleScroll();

  // Trả về hàm cleanup để gỡ event khi component unmount
  return () => {
    realScrollEl.removeEventListener("scroll", handleScroll);
  };
};
