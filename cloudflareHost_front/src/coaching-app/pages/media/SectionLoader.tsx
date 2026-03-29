import { useTranslation } from "react-i18next";

const SectionLoader = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">

        <div className="relative w-24 h-24 mb-8">

          <div className="absolute inset-0 rounded-full border-4 border-yellow-900/20" />

          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-700 border-r-yellow-600"
            style={{ animation: "spin 1.2s cubic-bezier(0.4,0,0.2,1) infinite" }}
          />

          <div className="absolute inset-3 rounded-full border-2 border-yellow-900/30"
            style={{ animation: "pulse-ring 1.8s ease-in-out infinite" }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animation: "fade-breath 1.8s ease-in-out infinite" }}
            >
              <defs>
                <linearGradient id="loaderGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
              </defs>
              <path
                d="M4 5a2 2 0 012-2h11a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                stroke="url(#loaderGold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 7h5M8 11h10M8 15h10"
                stroke="url(#loaderGold)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 w-7 bg-yellow-900 rounded-full"
              style={{
                animation: `dot-wave 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
  

        <p
          className="text-yellow-900/70 text-sm tracking-[0.25em] uppercase font-light"
          style={{ animation: "fade-breath 2s ease-in-out infinite" }}
        >
          
          {lang === "ka" ? "იტვირთება... ": "Loading..."}
        </p>
  
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.15); opacity: 0.9; }
          }
          @keyframes fade-breath {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          @keyframes dot-wave {
            0%, 100% { opacity: 0.25; transform: scaleX(0.7); }
            50% { opacity: 1; transform: scaleX(1); }
          }
        `}</style>
      </div>
    );
  };
  
  export default SectionLoader;