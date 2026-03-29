import { useTranslation } from "react-i18next";

const FreeEmpty = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    return(
  
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border border-[#C9A84C]/20 bg-[#FFFDF8] flex items-center justify-center">
          <span className="text-4xl opacity-25 select-none">❧</span>
        </div>
        <div
          className="absolute inset-0 rounded-full border border-[#C9A84C]/10"
        />
      </div>
  
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-[#C9A84C]/40" />
        <p className="text-[#9A8E7A] italic text-xl">
          {lang === "ka" ? "სავარჯიშოები არ მოიძებნა" : "No exercises found."}
        </p>
        <div className="w-8 h-px bg-[#C9A84C]/40" />
      </div>
  
      <p className="text-[#B0A090] text-xs tracking-[3px] uppercase">
        {lang === "ka" ? "მალე დაემატება" : "Coming soon"}
      </p>
  
      <style>{`
        @keyframes empty-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
    )
};
  
  export default FreeEmpty;