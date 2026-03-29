import { useTranslation } from "react-i18next";

const NetworkErrorPage: React.FC = () => {
  const { t } = useTranslation();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-9999 py-15 min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 px-4 sm:px-6 sm:py-12 lg:py-16">

      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl flex flex-col items-center text-center space-y-6 sm:space-y-8 lg:space-y-10">


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


        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <h1 className="text-2xl md:text-4xl pb-2 font-extrabold bg-linear-to-r from-amber-700 via-orange-700 to-amber-800 bg-clip-text text-transparent tracking-tight">
            {t("error.title") || "უკაცრავად..."}
          </h1>

          <p className="text-xl md:text-2xl text-amber-800 font-semibold">
            {t("error.subtitle") || "ქსელთან კავშირის პრობლემა"}
          </p>

          <p className="text-sm md:text-xl text-amber-700/80 leading-relaxed max-w-xl mx-auto">
            {t("error.description") || 
              "ვერ მოხერხდა სერვერთან დაკავშირება. გთხოვთ, შეამოწმოთ ინტერნეტ კავშირი ან სცადოთ გვერდის გადატვირთვა."}
          </p>
        </div>


        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4 ">
          <button
            onClick={handleRetry}
            className="group relative inline-flex items-center justify-center gap-3 px-7 py-3 md:px-10 md:py-4 bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white text-sm md:text-xl font-bold rounded-full shadow-2xl hover:shadow-amber-500/60 transition-all duration-500 hover:scale-105"
          >
            <svg className="w-7 h-7 sm:w-8 lg:w-9 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{t("error.retry") || "გადატვირთვა"}</span>
            <div className="absolute inset-0 rounded-full bg-amber-500/40 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
          </button>

          <a
            href="/"
            className="group inline-flex items-center justify-center gap-3 px-7 py-3 md:px-10 md:py-4 bg-white/95 hover:bg-white backdrop-blur-sm text-amber-800 hover:text-amber-900 text-sm md:text-xl font-bold rounded-full shadow-2xl hover:shadow-amber-300/50 transition-all duration-500 border-2 border-amber-200"
          >
            <svg className="w-7 h-7 sm:w-8 lg:w-9 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="whitespace-nowrap">{t("error.home") || "მთავარი"}</span>
          </a>
        </div>

      </div>


      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-float { animation: float 15s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  );
};

export default NetworkErrorPage;