import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  message: string;
  retryAfter?: number;
  onClose: () => void;
};

const RateLimitModal: React.FC<Props> = ({ retryAfter, onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
    
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
        onClick={onClose} 
      />

      <div className="relative bg-linear-to-br from-gray-900 to-gray-950 rounded-3xl p-10 max-w-md w-full mx-4 border border-amber-600/30 shadow-2xl shadow-amber-900/50 transform transition-all duration-300 scale-100 pointer-events-auto">

   
        <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none" />

        <div className="flex justify-center mb-8 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-xl pointer-events-none" />
            <div className="relative bg-linear-to-br from-amber-500 to-amber-600 p-6 rounded-full shadow-lg shadow-amber-900/50">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-amber-400 text-center mb-4 tracking-wide relative z-10">
          {t("RateLimitModal.title")}
        </h2>

        <p className="text-gray-300 text-center text-lg leading-relaxed mb-6 relative z-10">
          {t("RateLimitModal.worning")}
        </p>

        {retryAfter && (
          <p className="text-amber-300 text-center text-base font-medium mb-8 relative z-10">
            {t("RateLimitModal.waiting")} <span className="font-bold">{retryAfter}</span> {t("RateLimitModal.second")}
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold py-4 rounded-xl text-lg hover:from-amber-500 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-900/40 focus:outline-none focus:ring-4 focus:ring-amber-500/30 relative z-10"
        >
          {t("RateLimitModal.button")}
        </button>
      </div>
    </div>
  );
};

export default RateLimitModal;
