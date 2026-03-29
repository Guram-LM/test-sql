import { motion } from "framer-motion";

const ScreenCardLoader = () => {
  const dots = 5;
  const dotVariants = {
    animate: (i: number) => ({
      scale: [1, 1.4, 1],
      opacity: [0.4, 1, 0.4],
      x: ["-120%", "120%"],
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: [0.65, 0.05, 0.36, 1] as const,
        delay: i * 0.22,
      },
    }),
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0f0f0f] overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle at 50% 50%, #c9a84c22 0%, transparent 70%)",
        }}
      />


      <div className="relative flex items-center justify-center gap-6">
        {Array.from({ length: dots }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={dotVariants}
            animate="animate"
            className="w-6 h-6 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, #fff8e1, #c9a84c 50%, #b8975e)",
              boxShadow: "0 0 30px rgba(201,168,76,0.6), inset 0 0 10px rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>


      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(201,168,76,0.08), transparent)",
        }}
      />
    </div>
  );
};

export default ScreenCardLoader;