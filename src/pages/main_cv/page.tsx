import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PapperCV from "./content_cv/page";
import LoadingScreen from "../../components/LoadingScreen";
import { APICVData } from "../../_api/choose_language";

gsap.registerPlugin(ScrollTrigger);

const CV_Page = () => {
  const [lang, setLang] = useState<any>(null);
  const [cvData, setCvData] = useState<any>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mainLanguage");
    if (saved) {
      setLang(JSON.parse(saved));
    }

    // Tải dữ liệu CV
    (async () => {
      const data = await APICVData();
      setCvData(data);
      setIsLoaded(true);
    })();
  }, []);

  // Chỉ thiết lập ScrollTrigger sau khi cvData đã tải xong và animation loading đã kết thúc
  useEffect(() => {
    if (!showContent || !cvData) return;
    
    if (cvRef.current && containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", 
          end: "bottom bottom", 
          scrub: 1.2, 
          invalidateOnRefresh: true, // Cho phép tính toán lại khi resize màn hình
        },
      });

      // Trạng thái ban đầu: Rất nhỏ và tụt xuống một chút (y: 100)
      gsap.set(cvRef.current, { 
        scale: 0.15,
        rotationX: 45,
        transformOrigin: "center top",
        transformPerspective: 1000,
        y: 100
      });

      // Pha 1: Từ từ phóng to tờ CV lên lấp đầy màn hình (Tự động canh tỷ lệ cho Mobile)
      tl.to(cvRef.current, {
        scale: () => {
          const padding = 32; 
          return Math.min(1, (window.innerWidth - padding) / 1024);
        },
        rotationX: 0,
        y: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, "start")
      // Mờ dần chữ "Cuộn chuột" đi khi tờ giấy bay lên
      .to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      }, "start")
      // Pha 2: Nghỉ một chút xíu
      .to({}, { duration: 0.2 })
      // Pha 3: Cuộn dọc đọc CV
      .to(cvRef.current, {
        y: () => {
          const scale = Math.min(1, (window.innerWidth - 32) / 1024);
          const cvHeight = (cvRef.current?.offsetHeight || 0) * scale;
          const windowHeight = window.innerHeight;
          return cvHeight > windowHeight ? -(cvHeight - windowHeight + 100) : 0;
        },
        duration: 3.5, 
        ease: "none"
      });
      
      // Animation xuất hiện ban đầu cho dòng chữ "Cuộn chuột để nhặt CV" (Dùng Clip-path bóc tách)
      if (textRef.current) {
        // Thiết lập trạng thái ban đầu bị cắt ngang
        gsap.set(textRef.current.children, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: 0,
          y: 30
        });

        // Hiệu ứng vuốt ngược lên (reveal)
        gsap.to(textRef.current.children, 
          { 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            y: 0, 
            opacity: 1, 
            duration: 1.5, 
            stagger: 0.2, 
            ease: "power4.out",
            delay: 0.3 
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [showContent, cvData]);

  if (!showContent) return <LoadingScreen isLoaded={isLoaded} onExited={() => setShowContent(true)} />;

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Màn hình đầu tiên (Hero Section) */}
      <div ref={textContainerRef} className="h-screen w-full flex flex-col items-center justify-center relative z-10 print:hidden">
        <div ref={textRef} className="flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold uppercase tracking-[0.3em] mb-4 text-slate-500 dark:text-slate-400">
            {lang?.ui?.scroll_to_pick || "Cuộn chuột để nhặt CV"}
          </span>
          <svg className="w-8 h-8 animate-bounce text-indigo-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Khu vực chứa CV kéo dài 4 màn hình */}
      <div ref={containerRef} className="h-[400vh] w-full relative z-20">
        
        {/* Sticky Container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex justify-center items-start pt-10">
          
          <div ref={cvRef} className="w-full flex justify-center will-change-transform">
            <PapperCV lang={lang} cvData={cvData} />
          </div>

        </div>
      </div>

      {/* Nút Xuất PDF (Góc dưới cùng bên trái) */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-6 left-6 z-50 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-xl shadow-slate-200 dark:shadow-slate-900/50 text-white font-bold tracking-wide border border-slate-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group print:hidden"
        title="Export to PDF"
      >
        <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>{lang?.ui?.export_pdf || "Xuất PDF"}</span>
      </button>

      {/* Nút quay lại trang chọn ngôn ngữ */}
      <Link
        to="/"
        className="fixed bottom-6 right-24 z-50 p-4 rounded-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/50 text-white border border-transparent transition-all hover:scale-110 active:scale-95 group print:hidden"
        title="Đổi ngôn ngữ"
      >
        <svg 
          className="w-6 h-6 transform transition-transform group-hover:-rotate-90" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      </Link>

    </div>
  );
};

export default CV_Page;
