import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";

import { useFeedbackImages } from "../../components/hook/useFeedbackImages";
import ScreenLoader from "../loader/ScreenLoader";
import ScreenError from "../error/ScreenError";
import { useTranslation } from "react-i18next";
import { useInView } from "../../components/hook/useInView";


const easeConfig: Transition = { type: "spring", stiffness: 260, damping: 28, mass: 0.8 };
const softEase: Transition  = { type: "spring", stiffness: 160, damping: 22, mass: 1 };

const Feedback: React.FC = () => {

  const {t} = useTranslation()

  const { ref, isVisible } = useInView();

  const { data:images = [],  isLoading, isError } = useFeedbackImages(isVisible);


  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);


  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(prev => prev !== null ? (prev - 1 + images.length) % images.length : 0);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(prev => prev !== null ? (prev + 1) % images.length : 0);
  };




  
  return (
    <div 
      ref={ref} 
      className=" w-full relative overflow-hidden flex flex-col items-center justify-center p-6 md:p-12 pb-25 md:pb-35"
    >

       <div className="relative z-10 text-center  my-10 mb-20">
          <h2
            className="text-white text-2xl  md:text-4xl leading-none"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontStyle: 'italic',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#c9a84c',
            }}
          >
            {t("feedback.title")}
          </h2>




          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 sm:w-24 bg-linear-to-r from-transparent to-[#c9a84c]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <div className="h-px w-16 sm:w-24 bg-linear-to-l from-transparent to-[#c9a84c]" />
          </div>
        </div>


      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-20"
             style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full opacity-15"
             style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full opacity-10"
             style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>


      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                   backgroundSize: "200px 200px" }} />

      <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full relative z-10"
  initial="hidden"
  animate="visible"
  variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
>
  {isLoading || isError || images.length === 0 ? (

    Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={`placeholder-${i}`}
        className="flex items-center justify-center"
        variants={{
          hidden: { opacity: 0, y: 40, scale: 0.92 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { ...easeConfig } },
        }}
      >
        <div className="relative z-10 w-full">
          <IphoneFrame
            image=""              
            isLoading={isLoading}
            error={!isLoading}
          />
        </div>
      </motion.div>
    ))
  ) : (

    images.map((img: { id: number; image_url: string }, index: number) => (
      <motion.div
        key={img.id}
        layoutId={`phone-${img.id}`}
        onClick={() => setSelected(index)}
        onHoverStart={() => setHovered(index)}
        onHoverEnd={() => setHovered(null)}
        className="cursor-pointer flex items-center justify-center"
        variants={{
          hidden: { opacity: 0, y: 40, scale: 0.92 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { ...easeConfig } }
        }}
        whileHover={{ scale: 1.04, y: -6 }}
        transition={easeConfig}
      >
        <motion.div
          className="absolute w-48 h-16 rounded-full z-0"
          style={{ bottom: -20, filter: "blur(30px)", background: "radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, transparent 70%)" }}
          animate={{ opacity: hovered === index ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <div className="relative z-10 w-full">
          <IphoneFrame 
            image={img.image_url} 
            isLoading={false}
            error={null}
          />
        </div>
      </motion.div>
    ))
  )}
</motion.div>


      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setSelected(null)}
          >

            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(5,5,10,0.85)", backdropFilter: "blur(28px) saturate(1.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />


           {selected !== null && images[selected] && (
              <motion.div
                layoutId={`phone-${images[selected].id}`} 
                onClick={e => e.stopPropagation()}
                className="relative z-10"
                transition={softEase}
              >
                <div className="max-h-[90vh] w-[min(85vw,340px)]">
                  <IphoneFrame 
                    image={images[selected].image_url} 
                    large 
                    isLoading={isLoading}
                    error={isError}
                  />
                </div>
              </motion.div>
            )}




            <motion.button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: -45 }}
              transition={{ delay: 0.15, ...easeConfig }}
              whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.92 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </motion.button>


            {[{ dir: -1, side: "left-4 md:left-8", label: "←", fn: handlePrev },
              { dir:  1, side: "right-4 md:right-8", label: "→", fn: handleNext }]
              .map(({ side, label, fn }) => (
                <motion.button
                  key={label}
                  onClick={fn}
                  className={`absolute ${side} top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white/80 font-light text-lg`}
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
                  initial={{ opacity: 0, x: label === "←" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, ...easeConfig }}
                  whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.14)" }}
                  whileTap={{ scale: 0.92 }}
                >
                  {label}
                </motion.button>
              ))}

   
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              {images.map((_: { id: number; image_url: string }, i: number) => (
                <motion.button
                  key={i}
                  onClick={e => { e.stopPropagation(); setSelected(i); }}
                  animate={{ width: i === selected ? 20 : 6, opacity: i === selected ? 1 : 0.35 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="h-1.5 rounded-full bg-white cursor-pointer"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};











interface IphoneFrameProps {
  image: string;
  large?: boolean;
  isLoading?: boolean;
  error?: any;
}

const IphoneFrame: React.FC<IphoneFrameProps> = ({ image, large = false, error, isLoading }) => {

  return (
    <div className={`relative bg-[#0a0a0a] rounded-[3.2rem] w-full aspect-9/17
      ${large ? "" : "shadow-[0_20px_60px_rgba(0,0,0,0.7),0_4px_16px_rgba(0,0,0,0.4)]"}
      border border-[#2a2a2a]`}
         style={large ? {
           boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.03)"
         } : {}}>


      <div className="absolute top-3 left-2 right-2 z-30 px-5 flex items-center justify-between text-white/90 text-[10px] font-medium tracking-wide">
        <span style={{ fontVariantNumeric: "tabular-nums" }}>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5 items-end">
            {[3, 5, 7, 9].map((h, i) => (
              <span key={i} className="w-[2.5px] rounded-sm bg-white/80" style={{ height: h }} />
            ))}
          </div>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <rect x="0.5" y="0.5" width="13" height="9" rx="2.5" stroke="white" strokeOpacity="0.7" strokeWidth="1"/>
            <rect x="14" y="3" width="2" height="4" rx="1" fill="white" fillOpacity="0.5"/>
            <rect x="1.5" y="1.5" width="10" height="7" rx="1.5" fill="white" fillOpacity="0.9"/>
          </svg>
        </div>
      </div>


      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <div className="mt-2 w-28 h-7 bg-black rounded-[22px]" />
      </div>

 
      <div className="absolute inset-0.75 rounded-[2.9rem] overflow-hidden bg-black">
        {isLoading ? (
          <ScreenLoader />
        ) : error ? (
          <ScreenError />
        ) : (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt="iPhone screen"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            <div
              className="absolute inset-0 rounded-[2.9rem]"
              style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)" }}
            />
          </div>
        )}
      </div>


      {large && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-30" />
      )}

 
      <div className="pointer-events-none absolute inset-0 rounded-[3.2rem] overflow-hidden">
        <div className="absolute inset-0 rounded-[3.2rem]"
             style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)" }} />
      </div>


      <div className="pointer-events-none absolute inset-0 rounded-[3.2rem]"
           style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(0,0,0,0.4)" }} />
    </div>
  );
};

export default Feedback;