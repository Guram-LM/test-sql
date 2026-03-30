import MediaSection from "./MediaSection";
import AboutSection from "./AboutSection";
import MissionVideo from "./MissionVideo";
import PalmSection from "./PalmSection";
import FinalCTA from "./FinalCTA";
import HomeMethodsSection from "./HomeMethodsSection";
import HomeHeroSection from "./HomeHeroSection";
import { Helmet } from "react-helmet-async";
import Feedback from "./Feedback";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Pdf from "../pdfs/pdf";
import OnlineEvent from "../event/OnlineEvent";
import OfflineEvent from "../event/OfflineEvent";
import MotivationalPosts from "../motivational-posts/MotivationalPosts";
import EventsSpace from "../user/profile-page/EventsSpace";


export default function HomePage() {

  const {t} = useTranslation()

  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

 
  const contentRef = useRef<HTMLDivElement>(null);


  const [maxHeight, setMaxHeight] = useState("1120px");

  useEffect(() => {
    if (!contentRef.current) return;

    if (showFeedback) {
      setMaxHeight(contentRef.current.scrollHeight + "px");
    } else {
      setMaxHeight("1120px");
    }
  }, [showFeedback]);


  const handleToggleFeedback = () => {
    if (showFeedback && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        setShowFeedback(false);
      }, 350);
    } else {
      setShowFeedback(true);
    }
  };
  

  return (
    <main className="font-serif text-gray-800">

      <Helmet>
        <title>ნუცა ბახტაძე — ემოციური ინტელექტის ქოუჩი საქართველოში</title>
        <meta name="description" content="ნუცა ბახტაძე — სერტიფიცირებული ქოუჩი. ინდივიდუალური სესიები, კორპორაციული ტრენინგები და ონლაინ კურსები ემოციების მართვისა და თვითგანვითარებისთვის." />
        <link rel="canonical" href="https://nutsabakhtadze.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ნუცა ბახტაძე — ემოციური ინტელექტის ქოუჩინგი" />
        <meta property="og:description" content="დაუმეგობრდი შენს ემოციებს. პროფესიული ქოუჩინგი, ტრენინგები და ონლაინ კურსები საქართველოში." />
        <meta property="og:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta property="og:url" content="https://nutsabakhtadze.com/" />
        <meta property="og:locale" content="ka_GE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ნუცა ბახტაძე — EQ ქოუჩინგი საქართველოში" />
        <meta name="twitter:description" content="ემოციური ინტელექტი, თვითგანვითარება და სტრესის მართვა — პროფესიონალური მხარდაჭერა." />
        <meta name="twitter:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta name="twitter:image:alt" content="ნუცა ბახტაძე — ემოციური ინტელექტის ქოუჩის მთავარი გვერდი" />
      </Helmet>

      <HomeHeroSection />
      
      <MediaSection />
      <MotivationalPosts />
      <AboutSection />
     
      <MissionVideo />
      <EventsSpace/>
      <OnlineEvent />
      <OfflineEvent />
      
      
       <Pdf />

      <div ref={feedbackRef} className="relative scroll-mt-32">

        <div
          style={{ maxHeight }}
          className={`
            relative bg-white rounded-3xl shadow-xl overflow-hidden
            transition-[max-height] duration-1000 ease-in-out
          `}
        >

   
          <div ref={contentRef}>
            <Feedback />
          </div>

          {!showFeedback && (
           <div className="absolute inset-0 z-40 pointer-events-none">


              <div className="block sm:hidden absolute inset-0">

                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to bottom, transparent 92%, rgba(255,251,242,0.55) 58%, rgba(255,248,235,0.92) 72%, #fff8ee 82%)"
                }} />

                <div className="absolute bottom-0 left-0 right-0" style={{
                  height: "calc(12.5% + 80px)",
                  background: "rgba(255,252,248,0.2)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }} />

                <div className="absolute bottom-0 left-0 right-0" style={{
                  height: "12.5%",
                  background: "#fff8ee",
                  clipPath: "ellipse(115% 100% at 50% 100%)",
                }} />

                <div className="absolute left-0 right-0" style={{
                  bottom: "calc(12.5% + 80px - 4px)",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.7) 20%, rgba(253,230,138,1) 50%, rgba(245,158,11,0.7) 80%, transparent 100%)",
                  filter: "blur(0.5px)",
                  animation: "goldPulse 2.5s ease-in-out infinite",
                }} />

                <div className="absolute" style={{
                  bottom: "calc(12.5% + 80px - 4px)",
                  left: 0,
                  width: "35%",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
                  animation: "shimmerSweep 2.4s ease-in-out infinite",
                }} />

              </div>

  
              <div className="hidden sm:block absolute inset-0">

                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to bottom, transparent 62%, rgba(255,255,255,0.55) 76%, white 88%)"
                }} />

                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 360" preserveAspectRatio="none" style={{ display: "block" }}>
                  <path d="M0,200 C180,320 380,100 620,230 C820,340 980,80 1160,160 C1280,210 1380,80 1440,60 L1440,360 L0,360 Z" fill="white" />
                </svg>

                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 360" preserveAspectRatio="none" style={{ display: "block", opacity: 0.35 }}>
                  <path d="M0,230 C200,340 420,130 660,250 C870,350 1020,110 1200,185 C1320,230 1400,100 1440,85 L1440,360 L0,360 Z" fill="#fde68a" />
                </svg>

              </div>

            </div>
          )}

        </div>

 
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-40 w-65 h-15.5">
          <button onClick={handleToggleFeedback} className="relative w-full h-full group overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 70" preserveAspectRatio="none">
              <polygon points="0,20 20,0 240,0 260,20 240,70 20,70" fill="url(#facetGradient)" />
              <defs>
                <linearGradient id="facetGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fbbf24"/>
                  <stop offset="50%" stopColor="#f59e0b"/>
                  <stop offset="100%" stopColor="#fbbf24"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="relative z-10 flex items-center justify-center h-full text-white font-bold text-lg tracking-wide cursor-pointer">
              {showFeedback ? t("sectionCollapseButton.close"): t("sectionCollapseButton.viewReviews")}
            </span>
          </button>
        </div>

      </div>

      <style>{`
        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(400%);  }
          100% { transform: translateX(400%);  }
        }
        @keyframes goldPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1;   }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateX(-50%) translateY(0px);  opacity: 0.85; }
          50%       { transform: translateX(-50%) translateY(6px);  opacity: 1;    }
        }
      `}</style>

      <HomeMethodsSection />
      <PalmSection />
      <FinalCTA />
    </main>
  );
}
