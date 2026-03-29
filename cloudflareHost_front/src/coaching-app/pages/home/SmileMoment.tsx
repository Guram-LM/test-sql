
import { useTranslation } from "react-i18next";

interface SmileMomentProps {
  show: boolean;
  onClose?: () => void;
}

const SmileMoment: React.FC<SmileMomentProps> = ({ show, onClose }) => {
  const {t} = useTranslation()
  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center z-999
        transition-opacity duration-1600 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${show ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >

      <div
        className={`
          absolute inset-0 bg-black/30 backdrop-blur-sm
          transition-opacity duration-1600 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${show ? "opacity-100" : "opacity-0"}
        `}
      />

      <div
        className={`
          relative max-w-sm sm:max-w-md md:max-w-lg text-center px-4
          transition-all duration-1600 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${show ? "translate-x-0 scale-100" : "translate-x-[80vw] scale-95"}
        `}
      >
 
        <div className="absolute inset-0 bg-yellow-200/30 blur-3xl rounded-full opacity-70 animate-pulse"></div>


        <div className="relative bg-white/85 backdrop-blur-md border border-yellow-200 rounded-2xl shadow-2xl  p-10 md:py-15 md:px-30  animate-[floaty_5s_ease-in-out_infinite]">

          <button
            onClick={onClose}
            aria-label="დახურვა"
            className="
              absolute top-4 right-4
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-white/70 backdrop-blur-md
              border border-yellow-200
              text-gray-600
              shadow-md
              transition-all duration-300
              hover:scale-110 hover:rotate-45 hover:bg-white hover:shadow-lg
              active:scale-95
            "
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

    
          <div className="text-6xl mb-5 animate-[breathe_3s_ease-in-out_infinite]">
            😊
          </div>

   
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-light leading-relaxed">
            {t("smileMoment.title")}
          
            
            <br />
            <span className="font-semibold md:text-4xl  text-3xl text-yellow-600">
              {t("smileMoment.action")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmileMoment;



