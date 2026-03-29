import { useTranslation } from 'react-i18next';
import nuc from '../../../assets/nuc.jpg';
import HomeButton from '../../components/button/HomeButton';


export default function HomeHeroSection() {
  const { t } = useTranslation();


return (

    <section className="relative py-8 md:py-18 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-32 max-w-7xl mx-auto h-full">
        <div className="flex-none w-full max-w-85 sm:max-w-105 lg:max-w-none lg:w-5/12 xl:w-5/12 relative z-10">
          <div className="relative w-full aspect-4/5 shadow-2xl rounded-[35px] sm:rounded-[40px] lg:rounded-[50px] rotate-3 sm:rotate-6 overflow-hidden backdrop-blur border-2 border-white/40">
             

              <img
                  src={nuc}
                  alt="ნუცა ბახტაძე"
                  width={530}
                  height={620}
                  loading="eager"
                  decoding="async"
                  {...({ fetchpriority: 'high' } as any)} 
                />


            <div className="absolute inset-0 bg-linear-to-t from-amber-900/20 to-transparent opacity-40"></div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-stone-600 rounded-full blur-2xl opacity-40"></div>
        </div>
        <div className="flex-1 w-full text-center lg:text-left relative z-10">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl leading-tight mb-6 sm:mb-8 md:mb-10 font-light tracking-tight text-gray-800">
            {t("HomePage.heroTitle")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 text-gray-600 max-w-2xl mx-auto lg:mx-0">
            {t("HomePage.heroText")}
          </p>
   
          <HomeButton title="HomePage.heroButton" />
       
          
          
        </div>
      </div>
    </section>
  );
}
