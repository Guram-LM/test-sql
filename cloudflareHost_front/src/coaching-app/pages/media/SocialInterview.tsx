
import FacebookCard from "./FacebookCard";
import InstagramCard from "./InstagramCard";
import LinkedInCard from "./LinkedInCard";
import { useTranslation } from "react-i18next";
import { useSocialMedia } from "../../components/hook/useSocialMedia";
import { useInView } from "../../components/hook/useInView";
import SectionLoader from "./SectionLoader";
import SectionEmpty from "./SectionEmpty";



const SocialMediaSection = () => {
  const {t} = useTranslation()



  const {i18n} =useTranslation()
  const lang = i18n.language

  const {ref, isVisible} = useInView()

  const {data, isLoading, isError} = useSocialMedia(isVisible)

  const facebook = data?.filter(item => item.platform === "facebook").map(item => ({
    id: item.id,
    title: lang === "ka" ? item.title_ka : item.title_en,
    link: item.link,
    image: item.image_url

  })) || []


  const magazines = data?.filter(item => item.platform === "linkedin")?.map((item) => ({
    id: item.id,
    title: lang === "ka" ? item.title_ka : item.title_en,
    data: new Date(item.created_at).toLocaleDateString(),
    description: lang === "ka" ? item.description_ka : item.description_en,
    link: item.link,
    image: item.image_url
  })) || []


  const instagram = data?.filter(item => item.platform === "instagram")?.map(item =>({
    id: item.id,
    title: lang === "ka" ? item.title_ka : item.title_en,
    link: item.link,
    image: item.image_url

  })) || [];








  return (
    <div 
      ref={ref}
      className="relative w-full min-h-screen py-20  overflow-hidden "
    >
      
  
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.02) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255,255,255,0.02) 3px
          )`
        }}
      />

   


 
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-0">
        
    
           <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-20 bg-linear-to-r from-transparent via-yellow-900 to-transparent" />
              
                <svg
                  className="w-14 h-14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FACC15" />
                      <stop offset="50%" stopColor="#CA8A04" />
                      <stop offset="100%" stopColor="#78350F" />
                    </linearGradient>
                  </defs>


                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="url(#goldGradient)"
                    strokeWidth="1.5"
                  />

 
                  <path
                    d="M12 3c3 3.5 3 14 0 18c-3-3.5-3-14 0-18z"
                    stroke="url(#goldGradient)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />

                
                  <path
                    d="M3 12h18"
                    stroke="url(#goldGradient)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />

                  <path
                    d="M5 8h14M5 16h14"
                    stroke="url(#goldGradient)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>

              <div className="h-px w-20 bg-linear-to-r from-transparent via-yellow-900 to-transparent" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="bg-clip-text  text-yellow-900">
             {t("socialMedia.sectionTitle")}
            </span>
          </h1>
          
          <p className="text-yellow-900 text-xl tracking-[0.3em] uppercase font-light">
           {t("socialMedia.sectionSubtitle")}
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-1 bg-yellow-900 rounded-full transition-all duration-700"
                style={{
                  width: i === 0 ? "30px" : "30px",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {isLoading && <SectionLoader />}

        {isError && <SectionEmpty  />}

        {!isLoading && !isError && facebook.length === 0 && magazines.length === 0 && instagram.length === 0&& (
          <SectionEmpty  />
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-1  max-w-6xl mx-auto pb-15">

        

        <FacebookCard facebook={facebook}/>
        <InstagramCard  instagram={instagram}/>
        <LinkedInCard magazines={magazines}/>

      </div>

   
       
      </div>



      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

    
      <style>{`
        @keyframes sway-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }

        @keyframes swing-gentle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        @keyframes swing-gentle-reverse {
          0%, 100% { transform: rotate(2deg); }
          50% { transform: rotate(-2deg); }
        }

        .animate-sway-slow {
          animation: sway-slow 6s ease-in-out infinite;
        }

        .animate-swing-gentle {
          animation: swing-gentle 4s ease-in-out infinite;
        }

        .animate-swing-gentle-reverse {
          animation: swing-gentle-reverse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SocialMediaSection;