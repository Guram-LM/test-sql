import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  const { t } = useTranslation();

  return (
    <div className="fixed py-25 inset-0 z-9999 flex items-center justify-center overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-amber-100">
     

      <div className="relative text-center px-6 max-w-4xl mx-auto">

       <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 shadow-2xl animate-spin-slow" />
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-amber-50 to-orange-100" />
          <div className="absolute inset-4 rounded-full bg-white/40 backdrop-blur-sm animate-ping-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-linear-to-br from-amber-600 to-orange-700 rounded-2xl shadow-2xl flex items-center justify-center">
              <span className="text-4xl font-black text-white">N</span>
              <div className="absolute -top-1 -right-1 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <span className="text-3xl font-bold text-white">!</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl pb-2 font-extrabold bg-linear-to-r from-amber-700 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-6 tracking-tight">
          {t("appError.errorTitle") || "უკაცრავად..."}
        </h1>

        <p className="text-xl md:text-2xl text-amber-800 font-semibold mb-6">
          {t("appError.errorMessage") || "აპლიკაციის ჩატვირთვა ვერ მოხერხდა"}
          
        </p>

        <p className="text-sm md:text-xl text-amber-700/80 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
          
          {t("appError.errorDeskription") || "შესაძლოა ინტერნეტთან კავშირი გაწყდა ან გამოვიდა ახალი ვერსია"}
        </p>

        <button
          onClick={handleRetry}
          className="group relative inline-flex items-center gap-4 px-8 md:py-4 py-3 bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-sm md:text-xl font-bold rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
        >
          <span>{t("appError.errotButtonText") || "გადატვირთვა"}</span>
          <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          
          <div className="absolute inset-0 rounded-full bg-amber-500/40 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
        </button>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  );
};

export default ErrorPage;