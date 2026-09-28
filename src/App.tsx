import { useEffect } from "react";
import "./App.css";
import RouteApp from "./route";

function App() {
  // 1. Đọc Session Storage khi App vừa load để phục hồi trạng thái sáng/tối
  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 2. Hàm Toggle Theme có hiệu ứng Bong bóng bung ra (View Transitions API)
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = document.documentElement.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";

    // Lưu vào session ngay lập tức
    sessionStorage.setItem("theme", nextTheme);

    // Nếu trình duyệt cũ không hỗ trợ View Transition thì đổi màu liền
    if (!document.startViewTransition) {
      document.documentElement.classList.toggle("dark");
      return;
    }

    // Lấy tọa độ con trỏ chuột lúc click để làm tâm bong bóng
    const x = e.clientX;
    const y = e.clientY;
    // Tính bán kính lớn nhất để bong bóng có thể che phủ toàn màn hình
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Bắt đầu quá trình chụp màn hình chuyển cảnh
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle("dark");
    });

    // Khi DOM vừa update xong (chuẩn bị vẽ), ta add animation bong bóng
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 800,
          easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Hiệu ứng spring/nảy cao su
          // Nếu đang bật DarkMode thì vẽ bong bóng Dark đè lên lớp Light, và ngược lại
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <main className="">
      {/* Nút Toggle Theme (Góc dưới cùng bên phải) */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white dark:bg-slate-800 shadow-xl shadow-slate-200 dark:shadow-slate-900 text-slate-800 dark:text-white border border-gray-200 dark:border-gray-700 transition-all hover:scale-110 active:scale-95"
      >
        {/* Icon Mặt trăng */}
        <svg
          className="w-6 h-6 block dark:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>

        {/* Icon Mặt trời */}
        <svg
          className="w-6 h-6 hidden dark:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      <RouteApp />
    </main>
  );
}

export default App;
