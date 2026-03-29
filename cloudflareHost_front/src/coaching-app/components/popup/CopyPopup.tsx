const CopyPopup = () => {
  return (
    <div
      className="
        absolute
        -top-12
        left-1/2
        -translate-x-1/2
        z-20
        animate-fadeCloud
        pointer-events-none
      "
    >
      <div
        className="
          relative
          bg-gray-100
          px-5 py-2
          rounded-full
          shadow-lg
          text-gray-800
          font-medium
          flex items-center gap-2
        "
      >
         Copy
        <span
          className="
            absolute
            left-1/2
            -bottom-1.5
            -translate-x-1/2
            w-3 h-3
            bg-gray-100
            rotate-45
          "
        />
      </div>
    </div>
  );
};

export default CopyPopup;
