import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import OfferButton from "../../components/button/OfferButton";

export default function CtaSection() {
  const { t } = useTranslation();
  const [showOrderButton, setShowOrderButton] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (showOrderButton && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShowOrderButton(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOrderButton]);


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
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 26 } },
    exit: { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.25, ease: [0.42, 0, 0.58, 1] } },
  };
  return (
    <section className="sm:py-20 md:py-10 px-4 sm:px-6 md:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="bg-linear-to-br from-amber-300 to-amber-400 rounded-2xl p-12 md:p-16 text-center text-stone-600 shadow-2xl">

      <h2 className="text-3xl md:text-4xl font-light mb-6">
        {t("ResultsPage.ctaTitle")}
      </h2>

      <p className="text-xl mb-10 opacity-95">
        {t("ResultsPage.ctaText")}
      </p>

      <div className="relative inline-flex flex-col items-center min-h-[70px]">
        <AnimatePresence mode="wait" initial={false}>

          {!showOrderButton && (
            <motion.button
              key="cta-button"
              onClick={() => setShowOrderButton(true)}
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
              className="
                bg-white text-stone-600 md:px-12 px-9 md:py-4 py-2.5 rounded-full text-lg font-medium
                w-full max-w-xs focus:outline-none focus:ring-4 focus:ring-white/40
                overflow-hidden
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
              <span className="relative z-10">
                {t("ResultsPage.ctaButton")}
              </span>
            </motion.button>
          )}

          {showOrderButton && (
            <motion.div
              key="order-buttons"
              ref={dropdownRef}
              variants={offerButtonsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center gap-4"
            >
              <OfferButton />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  </div>
</section>

  );
}