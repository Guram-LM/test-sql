import { useState, useRef } from "react";
import HeroHeader from "./HeroHeader";
import IntroQuote from "./IntroQuote";
import MissionBox from "./MissionBox";
import Credentials from "./Credentials";
import StorySection from "./StorySection";
import CertificatesSection from "./CertificatesSection";
import ServicesGrid from "./ServicesGrid";
import FinalMission from "./FinalMission";
import AboutCTA from "./AboutCTA";
import MediaPage from "../media/MediaPage";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function AboutPage() {
  const {t} =useTranslation()
  const [showOffer, setShowOffer] = useState(false);
  const handleClick = () => setShowOffer(prev => !prev);

  const [showMedia, setShowMedia] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);


  const handleToggleMedia = () => {
    if (showMedia && mediaRef.current) {

      mediaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });


      setTimeout(() => {
        setShowMedia(false);
      }, 350);
    } else {
      setShowMedia(true);
    }
  };

  return (
    <>

      <Helmet>
        <title>ნუცა ბახტაძე — ჩემი გზა და მისია</title>
        <meta
          name="description"
          content="გაიცანით ნუცა ბახტაძე — Six Seconds სერტიფიცირებული სპეციალისტი. განათლება, გამოცდილება, ფილოსოფია და რატომ დავიწყე ემოციური ინტელექტის ქოუჩინგი."
        />
        <link rel="canonical" href="https://nutsabakhtadze.com/about/" />

        <meta property="og:type" content="profile" />
        <meta property="og:title" content="ნუცა ბახტაძე — ემოციური ინტელექტის ქოუჩი" />
        <meta property="og:description" content="შემიძლია დაგეხმაროთ ემოციების მართვაში, თვითგაცნობაში და პროფესიულ ზრდაში." />
        <meta property="og:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" /> 
        <meta property="og:url" content="https://nutsabakhtadze.com/about/" />
        <meta property="og:locale" content="ka_GE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ნუცა ბახტაძე — ჩემი ისტორია და მისია" />
        <meta name="twitter:description" content="EQ ქოუჩი საქართველოში — განათლება, გამოცდილება და მიზანი." />
        <meta name="twitter:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta name="twitter:image:alt" content="ნუცა ბახტაძე — პორტრეტი" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-16 md:py-5 pb-15 sm:pb-16 md:pb-20">

          <HeroHeader />

    
          <div ref={mediaRef} className="relative my-16 scroll-mt-32">

            <div
              className={`
                relative bg-white shadow-xl rounded-2xl overflow-hidden
                transition-[max-height,clip-path] duration-1000 ease-in-out

                ${showMedia
                  ? "max-h-none min-[851px]:max-h-[6200px] clip-rect"
                  : "max-h-[260px] min-[851px]:max-h-[300px] clip-triangle"
                }

              `}
            >

              <MediaPage />

          
              {!showMedia && (
                <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 z-50 
                bg-linear-to-t from-white to-transparent pointer-events-none" />
              )}

              
            </div>


            <div className="flex justify-center mt-6">
              <button
                onClick={handleToggleMedia}
                className="group relative px-8 py-3 bg-linear-to-r from-amber-600 via-yellow-600 to-amber-600 
                text-white font-bold text-sm tracking-widest uppercase rounded-lg
                shadow-[0_4px_20px_rgba(217,119,6,0.4)]
                hover:shadow-[0_6px_30px_rgba(217,119,6,0.6)]
                hover:scale-105
                transition-all duration-300
                border-2 border-amber-700/50
                overflow-hidden"
              >
              
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-yellow-400/30 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                
                <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`dot-l-${i}`} className="w-1 h-1 bg-yellow-300/60 rounded-full"></div>
                  ))}
                </div>
                
              
                <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-around py-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`dot-r-${i}`} className="w-1 h-1 bg-yellow-300/60 rounded-full"></div>
                  ))}
                </div>

                <span className="relative z-10 flex items-center gap-2">
                  {showMedia ? (
                    <>
                      {t("MediaButton.close")}
                      <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
                      </svg>
                    </>
                  ) : (
                    <>
                    {t("MediaButton.open")}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>


          <IntroQuote />
          <MissionBox />
          <Credentials />
          <StorySection />
          <CertificatesSection />
          <ServicesGrid />
          <FinalMission />
          <AboutCTA showOffer={showOffer} handleClick={handleClick} />

        </div>
      </div>
  </>
  );
}
