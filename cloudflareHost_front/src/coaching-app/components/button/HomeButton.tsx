import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ProductButton from "./ProductButton";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface ButtonProps {
  title: string;
}

const HomeButton: React.FC<ButtonProps> = ({ title }) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current) {
        const target = event.target as Node;
        const productButtons = containerRef.current.querySelectorAll('.product-button');
        const clickedOnProductButton = Array.from(productButtons).some(btn =>
          btn.contains(target)
        );

        if (!containerRef.current.contains(target) || clickedOnProductButton) {
          setIsActive(false);
        }
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const mainButtonVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 8,
      filter: "brightness(0.7) saturate(0.8)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "brightness(1) saturate(1)",
      transition: {
        opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        scale: { 
          type: "spring", 
          stiffness: 60, 
          damping: 30, 
          mass: 1.8 
        },
        y: { 
          type: "spring", 
          stiffness: 60, 
          damping: 32, 
          mass: 2 
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 4,
      filter: "brightness(0.9)",
      transition: { 
        duration: 0.3, 
        ease: [0.42, 0, 0.58, 1] 
      },
    },
  };

  const productButtonsVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 12, 
      scale: 0.97 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 26 
      },
    },
    exit: { 
      opacity: 0, 
      y: 12, 
      scale: 0.97, 
      transition: { 
        duration: 0.25, 
        ease: [0.42, 0, 0.58, 1] 
      } 
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center min-h-[70px]"
    >
      <AnimatePresence mode="wait">
        {!isActive && (
          <motion.button
            key="main-button"
            onClick={() => setIsActive(true)}
            variants={mainButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"

            whileHover={{
              scale: 1.02,
              y: -0.4,
              filter: "brightness(1.05)",
              boxShadow: "0 18px 40px rgba(245, 158, 11, 0.4)",
            }}

            whileTap={{ scale: 0.98 }}

            transition={{ type: "spring", stiffness: 90, damping: 20, mass: 1.3 }}
            className="
              relative
              bg-[#7A4B2C] text-white font-bold
              py-4 px-12
              tracking-widest uppercase
              text-sm sm:text-base
              rounded-xl
              shadow-lg
              focus:outline-none
              overflow-hidden
              flex items-center justify-center
            "
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: [0.42, 0, 0.58, 1],
              }}
            />
            <span className="relative z-10">{t(title)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key="product-buttons"
            variants={productButtonsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="product-button absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <ProductButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeButton;