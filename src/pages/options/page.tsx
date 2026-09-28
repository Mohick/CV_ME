import { useEffect, useRef } from "react";
import { setupScrollAnimation } from "./animation";

const OptionsChooseLang = ({
  list,
}: {
  list: Array<{ flag: string; country: string; id?: string }>;
}) => {
  const realScrollRef = useRef<HTMLDivElement>(null);
  const fakeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (realScrollRef.current && fakeScrollRef.current) {
      // 1. Phục hồi vị trí cuộn đã chọn từ Session Storage theo ID
      const savedId = sessionStorage.getItem("selectedLangId");
      let initialIndex = 0;
      if (savedId) {
        const foundIndex = list.findIndex((item) => item.id === savedId);
        if (foundIndex !== -1) initialIndex = foundIndex;
      }
      
      // Mỗi item trong real-scroll cao 300px, nhân lên để ra vị trí cần cuộn
      realScrollRef.current.scrollTop = initialIndex * 300;

      // 2. Gọi hàm setup animation từ file tách biệt
      const cleanup = setupScrollAnimation(
        realScrollRef.current,
        fakeScrollRef.current,
      );
      return cleanup; // Dọn dẹp sự kiện khi component bị unmount
    }
  }, []);

  return (
    <div className="relative h-full w-full flex overflow-hidden justify-center items-center [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
      <div
        id="real-scroll"
        ref={realScrollRef}
        className=" h-full opacity-0 snap-y overflow-y-scroll relative z-20 w-full no-scrollbar"
      >
        {list.map((item, index) => (
          <div
            key={index}
            data-index={index}
            data-id={item.id}
            className="flex h-[300px] w-full items-center justify-center gap-2 snap-center shrink-0"
          >
            <div>{item.flag}</div>
            <div>{item.country}</div>
          </div>
        ))}
      </div>

      {/* Khung Highlight ở giữa (Trang trí) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[85%] h-[52px] rounded-2xl bg-gradient-to-r from-indigo-500/10 via-blue-500/20 to-indigo-500/10 dark:from-indigo-400/10 dark:via-cyan-400/20 dark:to-indigo-400/10 border border-indigo-400/40 dark:border-cyan-300/30 shadow-[0_0_20px_rgba(99,102,241,0.2)] dark:shadow-[0_0_20px_rgba(34,211,238,0.15)] pointer-events-none z-10"></div>

      {/* Trục cuộn ảo Fake Scroll (Chứa chữ) */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-10 pointer-events-none z-20">
        <div id="fake-scroll" ref={fakeScrollRef} className="h-full w-full">
          {list.map((item, index) => (
            <div
              key={index}
              data-index={index}
              data-id={item.id}
              className="flex gap-3 h-10 w-full items-center justify-center shrink-0 transition-all duration-300 ease-out"
            >
              <div className="text-2xl drop-shadow-md">{item.flag}</div>
              <div className="text-nowrap tracking-wide">{item.country}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { OptionsChooseLang };
