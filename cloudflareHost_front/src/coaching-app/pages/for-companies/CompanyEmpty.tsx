import { useTranslation } from "react-i18next";

  const CompanyEmpty = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language;

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-32 gap-6">

      <div className="relative">
        <div className="w-20 h-20 rounded-2xl border border-gray-200 bg-white shadow-lg flex items-center justify-center">
          <span className="text-4xl select-none opacity-30">🎯</span>
        </div>
        <div
          className="absolute inset-0 rounded-2xl border border-gray-200"
          style={{ animation: "co-ring 3s ease-in-out infinite" }}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-stone-300" />
        <p className="text-gray-500 font-light text-xl">
        {lang === "ka" ? "პროგრამები არ მოიძებნა" : "No programs found"}
        </p>
        <div className="w-8 h-px bg-stone-300" />
      </div>

      <p className="text-gray-400 text-sm tracking-widest uppercase font-light">
      {lang === "ka" ? "მალე დაემატება" : "Coming soon"}
      </p>

      <style>{`
        @keyframes co-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CompanyEmpty;