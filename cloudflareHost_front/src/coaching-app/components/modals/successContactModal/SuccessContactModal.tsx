import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SuccessContactModalProps {
  onClose: () => void;
}

const SuccessContactModal: React.FC<SuccessContactModalProps> = ({ onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />


      <div className="relative w-full max-w-md">

        <div className="absolute -inset-4">
          <div className="absolute inset-0 bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-pulse" />
        </div>

        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">

          <div className="h-2 bg-linear-to-r from-amber-500 via-orange-500 to-pink-600" />

          <div className="p-10 text-center">

            <div className="mb-8 relative">
              <svg width="140" height="140" viewBox="0 0 200 200" className="mx-auto drop-shadow-2xl">
                <circle cx="100" cy="100" r="90" fill="none" stroke="url(#successGradient)" strokeWidth="8" opacity="0.3" />
                
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#successGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="565"
                  strokeDashoffset="565"
                  className="animate-draw"
                />

                <polyline
                  points="50,100 85,135 150,65"
                  fill="none"
                  stroke="url(#successGradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-draw-check"
                />

                <defs>
                  <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                    className="absolute w-3 h-3 bg-amber-400 rounded-full animate-ping"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      transform: `rotate(${i * 45}deg) translateX(80px)`,
                    }}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              {t("contact.successModal.title")}
            </h2>
            <p className="text-xl text-gray-700 font-light leading-relaxed mb-2">
              {t("contact.successModal.subtitle")}
            </p>
            <p className="text-sm text-gray-500">
              {t("contact.successModal.description")}
            </p>

            <button
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {t("contact.successModal.button")}
            </button>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          0% { stroke-dasharray: 0, 200; stroke-dashoffset: 0; }
          60% { stroke-dasharray: 200, 200; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 200, 200; stroke-dashoffset: -100; }
        }
        .animate-draw { animation: draw 2.5s ease-out forwards; }
        .animate-draw-check { animation: draw-check 2.5s ease-out 0.8s forwards; }
      `}</style>
    </div>
  );
};

export default SuccessContactModal;