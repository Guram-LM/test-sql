import nutsa from "../../../assets/nuca.jpg";
import { useTranslation } from "react-i18next";

export default function HeroHeader() {
  const { t } = useTranslation();

  return (
    <header className="py-5 relative overflow-hidden flex items-center justify-center">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700">
        <div className="grid lg:grid-cols-2 md:gap-12 gap-7 items-center">
          
    
          <div className="order-1 lg:order-2">
            <div className="relative w-full max-w-md mx-auto aspect-4/5"> 
              <div className="rounded-3xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.03]">
                

                  <img
                    src={nutsa}
                    alt={t("AboutPage.headerName")}
                    width={390}
                    height={455}
                    loading="eager"
                    decoding="async"
                    {...({ fetchpriority: 'high' } as any)} 
                    
                    className="w-full h-full object-cover"
                  /> 
                
              </div>
            </div>
          </div>

         
          <div className="order-2 lg:order-1 text-center space-y-6">
            <h1 className="text-3xl font-bold text-stone-600 leading-snug">
              {t("AboutPage.headerName")}
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-12 h-0.5 bg-stone-500/40" />
              <p className="text-xl italic text-stone-600">
                {t("AboutPage.sectotSubTitle")}
              </p>
              <span className="w-12 h-0.5 bg-stone-500/40" />
            </div>
            <p className="text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t("AboutPage.headerSubtitlePart1")}     
              <a
                href="https://senja.io/p/six-seconds/t/dc17f97d-e526-4236-b1da-c378b560b845"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#8B4513] text-[#8B4513] hover:opacity-80 transition"
              >
                {t("AboutPage.sixSeconds")}
              </a>
              {t("AboutPage.headerSubtitlepart2")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}