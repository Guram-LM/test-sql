import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl max-w-md w-full mx-6 relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        <div className="h-1.5 bg-linear-to-r from-amber-500 via-orange-500 to-pink-600" />

        <button
          onClick={onClose}
          className="absolute top-5 right-7 text-gray-400 hover:text-gray-700 text-5xl font-light transition-all duration-200 hover:scale-110 z-10"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-10 pt-12 text-center">
          <div className="relative mb-8 mx-auto w-32 h-32">
            <svg width="130" height="130" viewBox="0 0 200 200" className="drop-shadow-2xl">

              <circle cx="100" cy="100" r="90" fill="none" stroke="url(#grad)" strokeWidth="8" opacity="0.25" />

              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="565"
                strokeDashoffset="565"
                className="animate-draw"
              />
              <polyline
                points="50,100 85,135 150,65"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw-check"
              />

              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#ea580c" /> 
                  <stop offset="100%" stopColor="#dc2626" /> 
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75"
                  style={{
                    animationDelay: `${i * 0.12}s`,
                    transform: `rotate(${i * 45}deg) translateX(75px)`,
                  }}
                />
              ))}
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
            {t("SuccessModal.title", "გმადლობთ!")}
          </h3>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-sm mx-auto">
            {t("SuccessModal.message", "თქვენი შეტყობინება წარმატებით გაიგზავნა. მალე დაგიკავშირდებით.")}
          </p>

          <button
            onClick={onClose}
            className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t("SuccessModal.close", "კარგი")}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          0% { stroke-dasharray: 0, 200; }
          60% { stroke-dasharray: 200, 200; }
          100% { stroke-dasharray: 200, 200; stroke-dashoffset: -100; }
        }
        .animate-draw { animation: draw 2.4s ease-out forwards; }
        .animate-draw-check { animation: draw-check 2.4s ease-out 0.7s forwards; }
      `}</style>
    </div>
  );
}