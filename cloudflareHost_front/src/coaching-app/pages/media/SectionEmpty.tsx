import { useTranslation } from "react-i18next";

const SectionEmpty = ({ message }: { message?: string }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
  
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-amber-50 border-2 border-yellow-900/20">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="emptyGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
              </defs>
              <path
                d="M4 5a2 2 0 012-2h11a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                stroke="url(#emptyGold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 2"
              />
              <path d="M9 12h6M12 9v6" stroke="url(#emptyGold)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <div
            className="absolute inset-0 rounded-full border-2 border-yellow-900/10"
            style={{ animation: "empty-pulse 3s ease-in-out infinite" }}
          />
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-16 bg-linear-to-r from-transparent via-yellow-900/40 to-transparent" />
          <div className="h-1 w-1 rounded-full bg-yellow-900/40" />
          <div className="h-px w-16 bg-linear-to-r from-transparent via-yellow-900/40 to-transparent" />
        </div>

        <h3 className="text-yellow-900 font-semibold text-lg tracking-wide mb-2">
          
          {lang === "ka" ? "კონტენტი არ მოიძებნა": "No content found."}
        </h3>

        <p className="text-yellow-900/60 text-sm tracking-[0.15em] text-center max-w-xs font-light">
          {message ??  lang === "ka" ? "ამჟამად ინფორმაცია არ არის ხელმისაწვდომი": "No information is currently available."}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-1 w-7 bg-yellow-900/30 rounded-full" />
          ))}
        </div>
  
        <style>{`
          @keyframes empty-pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0; }
          }
        `}</style>
      </div>
    );
  };
  
  export default SectionEmpty;