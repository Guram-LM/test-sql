import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export default function HomeMethodsSection() {
  const { t } = useTranslation();
  const methods: string[] = Array.isArray(t("HomePage.methods", { returnObjects: true }))
  ? t("HomePage.methods", { returnObjects: true }) as string[]
  : []
  return (
    <section className="relative bg-linear-to-br from-gray-800 via-gray-700 to-gray-800 py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 text-white text-center overflow-hidden">
      <div className="absolute top-20 left-10 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-yellow-500/10 rounded-full blur-3xl opacity-60"></div>
      <div className="relative z-10">
        <h3 className="text-lg sm:text-xl md:text-xl italic mb-4 sm:mb-5 font-light tracking-wide text-gray-200 max-w-2xl mx-auto px-4">
          {t("HomePage.methodsTitle")}
        </h3>
        <h2 className="text-base sm:text-lg md:text-lg mb-12 sm:mb-16 md:mb-20 tracking-widest uppercase text-amber-300 font-medium">
          {t("HomePage.methodsSubtitle")}
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-20 max-w-6xl mx-auto px-2 sm:px-6">
          {methods.map((method, i) => {
            let link = "#";
            if (method.startsWith("COACHING")) link = "/individual-coaching?target=offers";
            else if (method.startsWith("SPEAKING")) link = "/for-companies?target=offers"; 
            return (
              <div key={i} className="relative group"> 
                <Link
                  to={link}
                  className="block bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.3)]"
                >
                  <div className="relative">
                    <span className="block text-base sm:text-lg md:text-xl uppercase tracking-wider sm:tracking-widest font-medium text-white group-hover:text-amber-300 transition-colors duration-300 pb-3">
                      {method}
                    </span>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[3px] bg-linear-to-r from-amber-400 via-yellow-400 to-amber-400 group-hover:w-3/4 transition-all duration-700 ease-out rounded-full"></div>
                  </div>
                  <div className="mt-6 sm:mt-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                      className="w-6 h-6 mx-auto text-stone-600 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 sm:mt-16 md:mt-20 flex items-center justify-center gap-3">
          <div className="w-12 sm:w-20 h-0.5 bg-linear-to-r from-transparent to-amber-400/50"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="w-12 sm:w-20 h-0.5 bg-linear-to-l from-transparent to-amber-400/50"></div>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}