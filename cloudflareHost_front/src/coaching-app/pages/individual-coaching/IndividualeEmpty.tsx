import { useTranslation } from "react-i18next";

const IndividualeEmpty = () => {
    
    const { i18n } = useTranslation();
    const lang = i18n.language;

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-32 gap-6">

      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200/60 shadow-lg flex items-center justify-center">
          <span className="text-4xl select-none opacity-30">👥</span>
        </div>
        <div
          className="absolute inset-0 rounded-2xl border border-amber-200/40"
          style={{ animation: "ind-ring 3s ease-in-out infinite" }}
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full opacity-40" />
        <p className="text-gray-500 font-light text-xl">
        {lang === "ka" ? "პროგრამები არ მოიძებნა" : "No programs found"}
        </p>
      </div>

      <p className="text-gray-400 text-sm tracking-widest uppercase font-light">
        {lang === "ka" ? "მალე დაემატება" : "Coming soon"}
      </p>

      <style>{`
        @keyframes ind-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default IndividualeEmpty;