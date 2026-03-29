import { useTranslation } from "react-i18next";

const PaidEmpty = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    return(
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border border-[#C9A84C]/15 bg-[#0D0C0A] flex items-center justify-center">
        <span className="text-4xl opacity-80 select-none" style={{ color: '#E8B84B' }}>❦</span>
        </div>
        <div
          className="absolute inset-0 rounded-full border border-[#C9A84C]/10"
        />
      </div>
  
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-[#C9A84C]/30" />
        <p className="text-[#C9A84C] italic text-xl" >
          {lang === "ka" ? "პრემიუმ სავარჯიშოები არ მოიძებნა" : "No premium exercises found."}
        </p>
        <div className="w-8 h-px bg-[#C9A84C]/30" />
      </div>
  
      <p
        className="text-[#C9A84C] text-[10px] tracking-[4px] uppercase"
      >
        {lang === "ka" ? "მალე დაემატება" : "Coming soon"}
      </p>
  
      <style>{`
        @keyframes paid-ring {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
)
};
  
  export default PaidEmpty;