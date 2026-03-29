import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ScreenCardError = () => {
    const {t} = useTranslation()
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0d0000] text-[#c9a84c] overflow-hidden p-6">

      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 50% 50%, #c9a84c22 0%, transparent 70%)",
        }}
      />

   
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8 text-8xl sm:text-9xl drop-shadow-[0_0_20px_rgba(201,168,76,0.5)]"
      >
        😏
      </motion.div>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.95 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-xl sm:text-2xl font-medium text-center tracking-wide leading-relaxed drop-shadow-md"
        style={{ textShadow: "0 0 15px rgba(201,168,76,0.6)" }}
      >
        {t("screenCardError.cardSays")} <br />
        {t("screenCardError.cardDoesntWantWork")} 
      </motion.p>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-6 text-sm opacity-70 font-light tracking-wider"
      >
        {t("screenCardError.wakeHope")} 
      </motion.p>


    </div>
  );
};

export default ScreenCardError;