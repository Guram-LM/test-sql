interface ConfirmModalProps {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  message = "ნამდვილად გსურთ წაშლა?",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl sm:rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-6 sm:gap-8 w-full max-w-md transform transition-transform duration-300 scale-100 border border-gray-200">
        <p className="text-lg sm:text-xl font-semibold text-gray-800 text-center leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto flex-1 px-6 py-3.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition shadow-md hover:shadow-lg active:scale-95"
          >
            წაშლა
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:w-auto flex-1 px-6 py-3.5 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition shadow-md hover:shadow-lg active:scale-95"
          >
            გაუქმება
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;