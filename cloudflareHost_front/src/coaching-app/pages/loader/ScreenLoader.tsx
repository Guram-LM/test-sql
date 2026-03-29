import { motion } from "framer-motion";
import type { Transition } from "framer-motion";


const spinTransition: Transition = {
  repeat: Infinity,
  ease: "linear", 
  duration: 1.4,
};


const ScreenLoader = () => (
  <div
    className="absolute inset-0  rounded-[2.9rem] flex flex-col items-center justify-center gap-4 text-center overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, rgba(30,25,50,0.92) 0%, rgba(50,35,70,0.88) 100%)',
      backdropFilter: 'blur(6px)',
    }}
  >
    <motion.div
      className="w-12 h-12 rounded-full border-4 border-t-[#c9a84c] border-[#c9a84c]/30 shadow-lg"
      animate={{ rotate: 360 }}
      transition={spinTransition}
    />

  </div>
);

export default ScreenLoader;