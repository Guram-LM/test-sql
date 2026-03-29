
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { motion, type Transition, type Variants,  } from "framer-motion";

interface NavigationType {
  name: string;
  url: string;
}

export default function OfferButton() {
  const { t } = useTranslation();

  const nav: NavigationType[] = [
    { name: t("Header-Nav.for-companies"), url: "/for-companies?target=offers" },
    { name: t("Header-Nav.coaching"), url: "/individual-coaching?target=offers" },
  ];

  const ease: [number, number, number, number] = [0.42, 0, 0.58, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.15,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: -20,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 1.1,
        opacity: { duration: 0.6, ease },
        filter: { duration: 0.5, ease },
      } as Transition,
    },
  };

  const hoverEffect: {
  y: number;
  scale: number;
  transition: Transition;
} = {
  y: -6,
  scale: 1.04,
  transition: {
    type: "spring",
    stiffness: 250,
    damping: 20,
  },
};



  return (
    <motion.div
      className="flex flex-col md:flex-row gap-3 w-full max-w-xs md:max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1200px" }}
    >
      {nav.map((e) => (
        <motion.div
          key={e.url}
          variants={buttonVariants}
          whileHover={hoverEffect}
          whileTap={{ scale: 0.97 }}
        >

            <NavLink
              to={e.url}
              className="px-8 md:py-4 py-3 bg-white text-stone-600 rounded-full font-medium text-base shadow-md hover:shadow-xl transition-all duration-300 text-center border border-amber-300 w-full block"
            >
              {e.name}
            </NavLink>
          
        </motion.div>
      ))}
    </motion.div>
  );
}