import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import OfferButton from "../../components/button/OfferButton";

interface AboutCTAProps {
  showOffer: boolean;
  handleClick: () => void;
}

export default function AboutCTA({ showOffer, handleClick }: AboutCTAProps) {
  const { t } = useTranslation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (showOffer && offerRef.current && !offerRef.current.contains(target)) {
        handleClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOffer, handleClick]);


  const mainButtonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.97, y: 6, filter: "brightness(0.85)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "brightness(1)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 26,
        mass: 1.3,
        opacity: { duration: 0.6 },
        filter: { duration: 0.8 },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: 6,
      filter: "brightness(0.9)",
      transition: { duration: 0.35, ease: [0.42, 0, 0.58, 1] },
    },
  };


  const offerButtonsVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 26 },
    },
    exit: {
      opacity: 0,
      y: 12,
      scale: 0.97,
      transition: { duration: 0.25, ease: [0.42, 0, 0.58, 1] },
    },
  };

 return (
<div className="bg-linear-to-br from-amber-300 to-amber-400 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center text-stone-600 shadow-2xl">
  <h2 className="text-2xl sm:text-3xl md:text-3xl font-light mb-3 md:mb-4">
    {t("AboutPage.ctaTitle")}
  </h2>

  <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 opacity-95 max-w-2xl mx-auto px-4">
    {t("AboutPage.ctaSubtitle")}
  </p>

  <div className="relative inline-flex flex-col px-7 items-center gap-6 min-h-[70px]">


      {!showOffer && (
        <motion.button
          key="main-button"
          ref={triggerRef}
          onClick={handleClick}
          variants={mainButtonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={{
            scale: 1.03,
            y: -2,
            filter: "brightness(1.05)",
            boxShadow: "0 18px 40px rgba(245, 158, 11, 0.4)",
          }}
          whileTap={{ scale: 0.97 }}
          className="relative bg-white text-stone-600 px-10 py-3 md:px-12 md:py-4 rounded-full text-base sm:text-lg font-medium w-full max-w-xs focus:outline-none focus:ring-4 focus:ring-white/40 overflow-hidden"
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
          <span className="relative z-10">
            {t("AboutPage.ctaButton")}
          </span>
        </motion.button>
      )}

      {showOffer && (
        <motion.div
          key="offer-buttons"
          ref={offerRef}
          variants={offerButtonsVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center justify-center gap-4"
        >
          <OfferButton />
        </motion.div>
      )}


  </div>
</div>

  );
}