import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ScreenError = () => {
  const {t} = useTranslation()
  return (
    <div 
      className="absolute rounded-[2.9rem] inset-0 flex flex-col items-center justify-center gap-5 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(30,25,50,0.9) 0%, rgba(50,35,70,0.85) 100%)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <motion.div
        animate={{ rotate: [0, -8, 8, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="text-9xl mb-2"
      >
        🥺💤
      </motion.div>

      <motion.p
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-xl font-medium text-[#c9a84c]"
      >
        {t("screenError.phoneTired")}
      </motion.p>

      <motion.p className="text-lg text-[#c9a84c]">
        {t("screenError.phoneWakePromise")}
      </motion.p>
    </div>
  )
};

export default ScreenError