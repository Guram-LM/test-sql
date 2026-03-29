import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ErrorPage404 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 px-4 sm:px-6">


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

  
        <h1 className="text-4xl  md:text-7xl  font-extrabold bg-linear-to-r from-amber-700 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tighter animate-pulse">
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-bold text-amber-800 mb-4 sm:mb-6">
          
          {t("error404.errorTitle404") || "გვერდი ვერ მოიძებნა"}
        </h2>

        <p className="text-sm md:text-lg text-amber-700/80 mb-10 sm:mb-12 max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
          
          {t("error404.errorMessage404") || "გვერდი, რომელსაც ეძებთ, არ არსებობს ან გადატანილია სხვა მისამართზე."}
        </p>


        <button
          onClick={() => navigate('/')}
          className="group relative inline-flex items-center gap-3  px-7 py-3  md:px-10 md:py-5 bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white text-sm md:text-lg font-bold rounded-full shadow-2xl hover:shadow-amber-500/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
        >
          <span>{t("error404.errotButtonText404") || "მთავარ გვერდზე"}</span>
          <svg className="w-7 h-7 sm:w-8 md:w-9 lg:w-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="9 22 9 12 15 12 15 22" />
          </svg>
          
          <div className="absolute inset-0 rounded-full bg-amber-500/40 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
        </button>

    
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          {[...Array(window.innerWidth < 640 ? 20 : 40)].map((_, i) => (
            <div
              key={i}
              className="absolute text-amber-600 font-mono text-xs opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `matrixFall ${8 + Math.random() * 8}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {Math.random().toString(36).substring(2, 8).toUpperCase()}
            </div>
          ))}
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
        @keyframes matrixFall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-float { animation: float 16s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  );
};

export default ErrorPage404;