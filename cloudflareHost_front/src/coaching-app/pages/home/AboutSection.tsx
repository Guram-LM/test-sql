import { useTranslation } from 'react-i18next';
import nutsa from '../../../assets/nutsa.jpeg';
import HomeButton from '../../components/button/HomeButton';





export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center max-w-7xl mx-auto">
 
        <div className="flex-none w-full max-w-[320px] sm:max-w-95 mx-auto lg:mx-0 lg:w-5/12 xl:w-4/12 relative group">
          <div className="lg:hidden">
            <div className="absolute -inset-2 bg-linear-to-br from-amber-400/40 to-orange-500/30 rounded-full blur-2xl opacity-70 transition-opacity duration-500"></div>
            <div className="relative aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white/70 backdrop-blur">
              

                <img
                  src={nutsa}
                  alt="ნუცა ბახტაძე"
                  width={390}
                  height={455}
                  loading='lazy'
                  decoding='async'
                  {...({ fetchpriority: 'low' } as any)} 
                  className="w-full h-full object-cover"
                />
    

              <div className="absolute inset-3 rounded-full ring-2 ring-amber-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl opacity-60 group-hover:opacity-90 group-hover:scale-125 transition-all duration-500"></div>
          </div>
          <div className="hidden lg:block w-full aspect-square rounded-full overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-700">
            <img
              src={nutsa}
              alt="ნუცა ბახტაძე"
              width={390}
              height={455}
              loading='lazy'
              decoding='async'
              {...({ fetchpriority: 'low' } as any)} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        <div className="flex-1 w-full text-center lg:text-left">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-3x xl:text-3xl mb-6 sm:mb-8 md:mb-10 tracking-tight text-stone-700 font-light opacity-0 animate-fade-in">
            {t("HomePage.aboutTitle")}
          </h2>
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            <p className="opacity-0 animate-fade-in animation-delay-200">
              {t("HomePage.aboutText1")}
             <a
                href="https://www.6seconds.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#8B4513] text-[#8B4513] hover:opacity-80 transition"
              >
                {t("HomePage.aboutTextsixsecoundlink")}
              </a>

              {t("HomePage.aboutTextsixsecoundtext")}
              
            </p>
            <p className="whitespace-pre-line font-medium text-stone-600 opacity-0 animate-fade-in animation-delay-400">
              {t("HomePage.aboutTextInserted")}
            </p>
            <p className="opacity-0 animate-fade-in animation-delay-600">
              {t("HomePage.aboutText2")}
            </p>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
            <HomeButton title="HomePage.aboutButton" />
          </div>
        </div>
      </div>
    </section>
  );
}


const style = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fadeIn 0.7s ease-out forwards; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-600 { animation-delay: 0.6s; }
  .animation-delay-800 { animation-delay: 0.8s; }
`;
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = style;
  document.head.appendChild(styleSheet);
}
