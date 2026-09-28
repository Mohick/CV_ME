import { useEffect, useRef } from "react";
import gsap from "gsap";

const LoadingScreen = ({ isLoaded, onExited }: { isLoaded?: boolean, onExited?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (dotsRef.current) {
      // Hiệu ứng các chấm nhảy múa
      tl.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to(dotsRef.current.children, {
          y: -15,
          stagger: 0.15,
          duration: 0.5,
          ease: "power1.inOut"
        });
    }
    return () => {
      tl.current?.kill();
    }
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && textRef.current && dotsRef.current) {
      // Dừng vòng lặp chấm nhảy
      tl.current?.kill();
      
      // Chạy hiệu ứng kết thúc
      const exitTl = gsap.timeline({
        onComplete: () => {
          if (onExited) onExited();
        }
      });
      
      exitTl
        // Chữ và chấm bay vọt lên và mờ đi
        .to([textRef.current, dotsRef.current], {
          y: -50,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.1
        })
        // Nền mờ dần ra
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        });
    }
  }, [isLoaded, onExited]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-colors duration-300">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div ref={textRef} className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 tracking-widest drop-shadow-sm">
          LOADING
        </div>
        <div ref={dotsRef} className="flex gap-3">
          <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
