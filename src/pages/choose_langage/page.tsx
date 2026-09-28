import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIChooseLang } from "../../_api/choose_language";
import { OptionsChooseLang } from "../options/page";
import { pageEnterAnimation, pageExitAnimation } from "./animation";
import LoadingScreen from "../../components/LoadingScreen";

const Choose_langage = () => {
  const navigate = useNavigate();
  const [listLang, setListLang] = useState<Array<any>>([]);
  const [option, setOption] = useState<{ flag: string; country: string, ui?: any }>();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Khởi tạo các Ref để kết nối với GSAP
  const myCvRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const arrLang = await APIChooseLang();
      // Mặc định lấy từ Session Storage nếu có, không thì lấy cái đầu tiên
      const savedId = sessionStorage.getItem("selectedLangId");
      const defaultLang = arrLang.find((l: any) => l.id === savedId) || arrLang[0];
      
      setOption(defaultLang);
      setListLang(arrLang);
      setIsLoaded(true);
    })();
  }, []);

  // Lắng nghe sự kiện đổi ngôn ngữ từ con lăn
  useEffect(() => {
    const handleLangChange = (e: any) => {
      const id = e.detail;
      const selected = listLang.find(l => l.id === id);
      if (selected) {
        setOption(selected);
      }
    };
    window.addEventListener("languageChanged", handleLangChange);
    return () => window.removeEventListener("languageChanged", handleLangChange);
  }, [listLang]);

  // Kích hoạt GSAP Animation khi data đã load xong
  useEffect(() => {
    if (showContent && listLang.length > 0 && myCvRef.current && titleRef.current && pickerRef.current && buttonRef.current) {
      pageEnterAnimation(myCvRef.current, titleRef.current, pickerRef.current, buttonRef.current);
    }
  }, [showContent, listLang]);

  // Hàm xử lý khi bấm nút Start
  const handleStart = () => {
    // Không dùng sessionStorage nữa để đỡ tốn tài nguyên. 
    // Trực tiếp đọc vị trí cuộn hiện tại của con lăn để biết user đang chọn ngôn ngữ nào.
    const scrollEl = document.getElementById("real-scroll");
    let activeIndex = 0;
    
    if (scrollEl) {
      activeIndex = Math.round(scrollEl.scrollTop / 300);
    }
    
    // Lấy object ngôn ngữ tương ứng
    const selectedLanguage = listLang[activeIndex] || listLang[0];
    
    if (selectedLanguage) {
      // Lưu thẳng ID vào sessionStorage (chỉ lưu 1 lần duy nhất lúc bấm Start để phục hồi vị trí con lăn nếu back lại)
      sessionStorage.setItem("selectedLangId", selectedLanguage.id);
      
      // Lưu làm ngôn ngữ chính của toàn bộ App
      localStorage.setItem("mainLanguage", JSON.stringify(selectedLanguage));
      
      // Chạy hiệu ứng rút lui (Exit Animation)
      if (myCvRef.current && titleRef.current && pickerRef.current && buttonRef.current) {
        pageExitAnimation(
          myCvRef.current, 
          titleRef.current, 
          pickerRef.current, 
          buttonRef.current, 
          () => {
            // Sau khi hiệu ứng rút lui chạy xong mới chuyển trang
            navigate("/main");
          }
        );
      }
    }
  };

  if (!showContent) return <LoadingScreen isLoaded={isLoaded} onExited={() => setShowContent(true)} />;

  return (
    <div className="h-screen w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center font-sans relative overflow-hidden transition-colors duration-300">
      {/* Decorative background glows - visible mostly in dark mode */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 dark:bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 dark:bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 flex flex-col gap-8 items-center w-full max-w-4xl px-6">
        
        {/* Nhóm Tiêu đề */}
        <div className="flex flex-col items-center gap-2">
          {/* Tiêu đề MY CV */}
          <h1 ref={myCvRef} className="opacity-0 text-5xl md:text-8xl font-black text-indigo-600 dark:text-indigo-400 drop-shadow-xl tracking-tighter transition-all duration-300">
            {Array.from(option?.ui?.my_cv || "MY CV").map((char: any, i) => (
              <span key={i} className="inline-block my-cv-char whitespace-pre">{char}</span>
            ))}
          </h1>
          
          {/* Tiêu đề CHOOSE LANGUAGE */}
          <h2 ref={titleRef} className="opacity-0 text-xl md:text-3xl font-bold text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase transition-all duration-300">
            {Array.from(option?.ui?.choose_language || "CHOOSE LANGUAGE").map((char: any, i) => (
              <span key={i} className="inline-block title-char whitespace-pre">{char}</span>
            ))}
          </h2>
        </div>

        {/* Khung chứa Picker và Button */}
        <div className="w-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-slate-700/50 p-6 md:p-8 rounded-[2rem] shadow-xl dark:shadow-2xl transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-center">
            
            {/* Cột chứa Picker (Bên trái, 3 phần) */}
            <div ref={pickerRef} className="opacity-0 md:col-span-3 relative h-[260px] rounded-2xl bg-gray-50/50 dark:bg-white/5 overflow-hidden shadow-inner border border-gray-200 dark:border-white/10 transition-colors duration-300">
              <OptionsChooseLang list={listLang} />
            </div>

            {/* Cột chứa Button (Bên phải, 1 phần) */}
            <div ref={buttonRef} className="opacity-0 md:col-span-1 flex justify-center h-full">
              <button onClick={handleStart} className="px-8 py-4 md:py-0 w-full h-full min-h-[80px] bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xl rounded-2xl shadow-lg shadow-blue-500/30 dark:shadow-blue-900/50 transition-all hover:scale-[1.03] active:scale-95 flex flex-col md:flex-row items-center justify-center gap-3 group">
                <span>{option?.ui?.start || "Start"}</span>
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose_langage;
