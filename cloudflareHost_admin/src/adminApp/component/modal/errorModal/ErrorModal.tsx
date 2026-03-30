import React from 'react'

interface ErrorModalProps {
  message?: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message = "ოპერაცია ვერ შესრულდა!", onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl sm:rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-5 sm:gap-6 w-full max-w-sm transform transition-all duration-300 scale-100 border border-red-200/50">
        <span className="text-5xl sm:text-6xl text-red-500 animate-pulse">✗</span>
        <p className="text-lg sm:text-xl font-semibold text-gray-800 text-center leading-relaxed">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          დახურვა
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;