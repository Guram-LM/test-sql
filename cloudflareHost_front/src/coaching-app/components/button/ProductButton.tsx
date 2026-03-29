import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, type Variants, type Transition } from 'framer-motion';

interface ProductButtonProps {
  className?: string;
}

const ProductButton: React.FC<ProductButtonProps> = ({ className }) => {
  const { t } = useTranslation();

  const ease: [number, number, number, number] = [0.42, 0, 0.58, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
        when: 'beforeChildren',
      } as Transition,
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 120,
        mass: 1,
        duration: 1.2,
        opacity: { duration: 0.8, ease },
      } as Transition,
    },
  };

  const hoverEffect = {
    scale: 1.02,
    y: -2,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    } as Transition,
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 min-[820px]:grid-cols-2 justify-center md:gap-5 gap-3 ${className}`}
    >
     
      <motion.div variants={buttonVariants} whileHover={hoverEffect} whileTap={{ scale: 0.98 }}>
        <Link
          to="/individual-coaching?target=offers"
          className="block w-full text-center bg-[#7A4B2C] text-white py-3.5 sm:py-4 min-[820px]:py-4 px-8 sm:px-10 min-[820px]:px-12 no-underline tracking-widest uppercase text-sm sm:text-base mt-6 sm:mt-7 min-[820px]:mt-5 rounded-xl shadow-lg hover:shadow-amber-500/40 transition-shadow duration-300 overflow-hidden relative group whitespace-nowrap"
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t('Header-Nav.coaching')}
          </span>
        </Link>
      </motion.div>

    
      <motion.div variants={buttonVariants} whileHover={hoverEffect} whileTap={{ scale: 0.98 }}>
        <Link
          to="/for-companies?target=offers"
          className="block w-full text-center bg-[#7A4B2C] text-white py-3.5 sm:py-4 min-[820px]:py-4 px-8 sm:px-10 min-[820px]:px-12 no-underline tracking-widest uppercase text-sm sm:text-base  min-[820px]:mt-7 rounded-xl shadow-lg hover:shadow-amber-500/40 transition-shadow duration-300 overflow-hidden relative group whitespace-nowrap"
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, delay: 0.5, ease }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t('Header-Nav.for-companies')}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProductButton;