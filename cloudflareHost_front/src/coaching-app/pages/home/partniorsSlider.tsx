import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const mediaNames = [
  "EURONEWS GEORGIA",
  "OK MAGAZINE",
  "ENTREPRENEUR",
  "BUSINESS INSIDER GEORGIA",
  "FORBES",
  "BLOOMBERG",
  "CNN BUSINESS",
  "THE GUARDIAN",
];
export default function PartniorsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaNames.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const prevIndex = (currentIndex - 1 + mediaNames.length) % mediaNames.length;
  const nextIndex = (currentIndex + 1) % mediaNames.length;
  return (
    <section
      className="relative overflow-visible mt-5"
      style={{
        clipPath:
          "polygon(0 4%, 10% 0%, 20% 2%, 30% 0%, 40% 3%, 50% 0%, 60% 2%, 70% 0%, 80% 3%, 90% 0%, 100% 4%, 100% 96%, 90% 100%, 80% 97%, 70% 100%, 60% 98%, 50% 100%, 40% 97%, 30% 100%, 20% 98%, 10% 100%, 0 96%)",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-amber-50 via-stone-100 to-amber-100 "></div>
      <div className="absolute top-0 left-0 w-full z-20">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20">
          <defs>
            <linearGradient id="topWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF4C2" />
              <stop offset="15%" stopColor="#FFD966" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="65%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#FFD966" />
              <stop offset="100%" stopColor="#FFF4C2" />
            </linearGradient>
            <linearGradient id="topWaveBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 Q180,10 360,40 T720,40 T1080,40 T1440,40"
            fill="none"
            stroke="url(#topWaveGold)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 12px rgba(255,220,150,0.8))"
            }}
          />
          <path
            d="M0,55 Q240,30 480,55 T960,55 T1440,55"
            fill="none"
            stroke="url(#topWaveBlue)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="relative z-10 py-32 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          ></div>
        </div>
        <div className="text-center mb-16">
  <h2
    className="bg-clip-text text-stone-400 text-xl font-bold tracking-[0.3em] uppercase mb-4"
    style={{ textShadow: "0 0 20px rgba(255,220,150,0.5)" }}
  >
    {t("slider.title")}
  </h2>
  <div className="h-px w-48 mx-auto bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
</div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-linear-to-br from-gray-900 via-black to-blue-950 rounded-3xl p-12 border border-yellow-600/10 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-yellow-500/30 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-blue-500/30 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-blue-500/30 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-yellow-500/30 rounded-br-3xl"></div>
            <div className="relative h-96 flex items-center justify-center overflow-hidden">
              <div
                className="flex flex-col items-center gap-10 transition-all duration-500 ease-in-out"
                style={{
                  transform: isAnimating ? "translateY(-20px)" : "translateY(0)",
                  opacity: isAnimating ? 0.5 : 1,
                }}
              >
                <div className="text-gray-400 text-lg md:text-xl font-light tracking-wide transition-all duration-500 opacity-40 scale-90 text-center">
                  {mediaNames[prevIndex]}
                </div>
                <div className="relative px-12 py-8">
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-600/10 via-yellow-500/20 to-blue-600/10 rounded-2xl blur-xl"></div>
                 <div
                className="relative text-4xl md:text-6xl font-bold tracking-wide text-center max-w-md leading-tight"
                style={{

                  background: "linear-gradient(135deg, #FFD966 0%, #D4AF37 50%, #3B82F6 100%)",
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent", 
                  filter: "drop-shadow(0 0 15px rgba(245,222,179,0.3))", 
                  color: "#D4AF37",
                }}
              >
  {mediaNames[currentIndex]}
</div>
                  <div className="mt-6 h-1 w-full `bg-linear-to-r from-transparent via-yellow-500 to-transparent opacity-50 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-lg md:text-xl font-light tracking-wide transition-all duration-500 opacity-40 scale-90 text-center">
                  {mediaNames[nextIndex]}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {mediaNames.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-10" : "w-2"}`}
                  style={{
                    background: idx === currentIndex
                      ? "linear-gradient(90deg, #FFD966 0%, #D4AF37 50%, #3B82F6 100%)"
                      : "#374151",
                    boxShadow: idx === currentIndex ? "0 0 12px rgba(255,217,102,0.5)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-20">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20">
          <defs>
            <linearGradient id="bottomWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF4C2" />
              <stop offset="15%" stopColor="#FFD966" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="65%" stopColor="#D4AF37" />
              <stop offset="85%" stopColor="#FFD966" />
              <stop offset="100%" stopColor="#FFF4C2" />
            </linearGradient>
            <linearGradient id="bottomWaveBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 Q180,70 360,40 T720,40 T1080,40 T1440,40"
            fill="none"
            stroke="url(#bottomWaveGold)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 12px rgba(255,220,150,0.8))"
            }}
          />
          <path
            d="M0,25 Q240,50 480,25 T960,25 T1440,25"
            fill="none"
            stroke="url(#bottomWaveBlue)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: i % 2 === 0 ? "#FFD966" : "#3B82F6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(30px, -50px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}