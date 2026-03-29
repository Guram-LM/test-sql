import { useEffect, useRef } from "react";


const PaperNote = ({ title }: { title: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

      if (!atTop && !atBottom) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="absolute top-full -z-50 mt-7 md:mt-6 left-1/2 -translate-x-1/2 w-56 md:w-64 opacity-100 group-hover:opacity-100 transition-all duration-500 ease-out transform -translate-y-1 pointer-events-none">
        <div className="relative">
        <div className="absolute -top-2 left-0 right-0 h-3 flex justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 12" preserveAspectRatio="none">
            <path
                d="M0,8 Q10,2 20,8 T40,8 T60,8 T80,8 T100,8 T120,8 T140,8 T160,8 T180,8 T200,8 L200,12 L0,12 Z"
                fill="#F5F5DC"
                stroke="#D4C5A9"
                strokeWidth="0.5"
            />
            </svg>
        </div>

        <div className="relative bg-linear-to-br from-[#F5F5DC] via-[#F0EAD6] to-[#E8DCC4] rounded-lg shadow-2xl border-2 border-[#D4C5A9] overflow-hidden">
            <div
            className="absolute inset-0 opacity-30"
            style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,115,85,0.03) 2px, rgba(139,115,85,0.03) 4px)`,
            }}
            ></div>

            <div className="absolute top-0 left-0 w-8 h-8 bg-linear-to-br from-[#D4C5A9]/40 to-transparent"></div>
            <div className="absolute top-0 right-0 w-8 h-8 bg-linear-to-bl from-[#D4C5A9]/40 to-transparent"></div>
            <div className="absolute inset-0 shadow-inner pointer-events-none"></div>

            <div
            ref={scrollRef}
            className="relative px-5 py-2 space-y-3"
            style={{
                height: "120px",
                overflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(139,115,85,0.45) #F0EAD6",
            }}
            >
            
            <style>{`
                .paper-scroll-${scrollRef.current?.dataset?.id ?? "x"}::-webkit-scrollbar { width: 4px; }
            `}</style>

            <p className="text-xs md:text-sm text-[#5A4A3A] leading-relaxed font-serif">
                {title}
            </p>

            <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-linear-to-tl from-[#8B7355]/10 to-transparent rounded-tl-full"></div>
            <div className="absolute -top-1 -left-1 w-12 h-12 bg-linear-to-br from-[#8B7355]/10 to-transparent rounded-br-full"></div>
            </div>

            <div className="absolute -right-1 top-2 bottom-2 w-1 bg-linear-to-r from-[#8B7355]/20 to-transparent"></div>
            <div className="absolute -left-1 top-2 bottom-2 w-1 bg-linear-to-l from-[#8B7355]/20 to-transparent"></div>
        </div>

        <div className="absolute -bottom-1 left-2 right-2 h-2 bg-linear-to-b from-black/20 to-transparent blur-sm rounded-full"></div>
        </div>
    </div>
  );
};

export default PaperNote