import React from 'react';

interface SuccessModalProps {
  message?: string;
  buttonText?: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  message = "ოპერაცია წარმატებულია!",
  buttonText = "დახურვა",
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl sm:rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-5 sm:gap-6 w-full max-w-sm transform transition-all duration-300 scale-100 border border-green-200/50">
        <span className="text-5xl sm:text-6xl text-green-500 animate-bounce">✓</span>
        <p className="text-lg sm:text-xl font-semibold text-gray-800 text-center leading-relaxed">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-3.5 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;