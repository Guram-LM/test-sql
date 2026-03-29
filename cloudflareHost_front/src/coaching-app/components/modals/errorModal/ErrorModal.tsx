import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ErrorModalProps {
  onClose: () => void;
}

export default function ErrorModal({ onClose }: ErrorModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl max-w-md w-full mx-6 relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">

        <div className="h-1.5 bg-linear-to-r from-red-500 via-rose-500 to-pink-600" />
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
              <circle cx="100" cy="100" r="90" fill="none" stroke="url(#errGrad)" strokeWidth="8" opacity="0.25" />

              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#errGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="565"
                strokeDashoffset="565"
                className="animate-draw-error"
              />

              <path
                d="M100 60 L115 100 L85 100 Z"
                fill="url(#errGrad)"
                className="animate-pulse"
              />
              <rect x="92" y="110" width="16" height="45" rx="8" fill="url(#errGrad)" />

              <defs>
                <linearGradient id="errGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" /> 
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-red-400 rounded-full animate-ping opacity-70"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    transform: `rotate(${i * 45}deg) translateX(75px)`,
                  }}
                />
              ))}
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
            {t("ErrorModal.title", "უკაცრავად...")}
          </h3>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-sm mx-auto">
            {t("ErrorModal.defaultMessage", "რაღაც შეცდომა მოხდა. გთხოვთ, სცადოთ მოგვიანებით.")}
          </p>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t("ErrorModal.close", "კარგი")}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes draw-error {
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-error {
          animation: draw-error 2.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}