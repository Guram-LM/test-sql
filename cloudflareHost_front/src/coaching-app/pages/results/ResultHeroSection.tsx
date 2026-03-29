import { useTranslation } from 'react-i18next';

export default function ResultHeroSection() {
  const { t } = useTranslation();

  return (
<section className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden bg-linear-to-br from-stone-800 via-gray-700 to-stone-800 flex items-center">

  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-10 left-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-linear-to-br from-amber-400 to-orange-500 rounded-full filter blur-3xl animate-pulse" />
    <div className="absolute bottom-10 right-10 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-linear-to-br from-yellow-400 to-amber-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[550px] md:h-[550px] bg-linear-to-br from-amber-500 to-orange-400 rounded-full filter blur-3xl animate-pulse opacity-30" style={{ animationDelay: '0.8s' }} />
  </div>


  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-400 to-transparent" />
    <div className="absolute bottom-1/4 left-0 w-full h-px bg-linear-to-rfrom-transparent via-amber-400 to-transparent" />
  </div>

  <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border border-amber-400/15 rounded-full" />
  <div className="absolute bottom-10 right-10 w-20 h-20 md:w-32 md:h-32 border border-amber-400/15 rounded-full" />

  <div className="relative z-10 w-full max-w-4xl mx-auto text-center text-white">

    <div className="inline-block mb-6 md:mb-8">
      <div className="text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-amber-200 mb-3 font-light">
        {t('ResultsPage.heroSubtitle')}
      </div>
      <div className="w-24 md:w-32 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent mx-auto" />
      
  
      <div className="flex justify-center items-center gap-2 mt-3">
        <div className="w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <div className="w-1.5 h-1.5 bg-amber-400/50 rounded-full" />
      </div>
    </div>


    <h1 
      className="text-2xl md:text-3xl font-light leading-tight mb-6 md:mb-8 tracking-tight px-4" 
      dangerouslySetInnerHTML={{ __html: t('ResultsPage.heroTitle') }} 
    />
    
    <p className="text-sm md:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto font-light px-4 mb-10 md:mb-12">
      {t('ResultsPage.heroText')}
    </p>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto px-4">
      <div className="bg-linear-to-br from-white/8 to-white/3 backdrop-blur-sm border border-amber-400/20 rounded-xl p-5 md:p-6 hover:from-white/12 hover:to-white/6 hover:border-amber-400/30 transition-all duration-300 group">
        <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">⚖️</div>
        <div className="text-xl font-light text-amber-200 leading-snug">
          {t('herosection.emotional_balance')}
        </div>
      </div>

      <div className="bg-linear-to-br from-white/8 to-white/3 backdrop-blur-sm border border-amber-400/20 rounded-xl p-5 md:p-6 hover:from-white/12 hover:to-white/6 hover:border-amber-400/30 transition-all duration-300 group">
        <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🧘</div>
        <div className="text-xl font-light text-amber-200 leading-snug">
         {t('herosection.calm_reaction')}
        </div>
      </div>

      <div className="bg-linear-to-br from-white/8 to-white/3 backdrop-blur-sm border border-amber-400/20 rounded-xl p-5 md:p-6 hover:from-white/12 hover:to-white/6 hover:border-amber-400/30 transition-all duration-300 group">
        <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">💭</div>
        <div className="text-xl font-light text-amber-200 leading-snug">
          {t('herosection.understanding_emotions')}
        </div>
      </div>

      <div className="bg-linear-to-br from-white/8 to-white/3 backdrop-blur-sm border border-amber-400/20 rounded-xl p-5 md:p-6 hover:from-white/12 hover:to-white/6 hover:border-amber-400/30 transition-all duration-300 group">
        <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🌱</div>
        <div className="text-xl font-light text-amber-200 leading-snug">
         {t('herosection.personal_growth')}
        </div>
      </div>
    </div>

 
    <div className="mt-10 md:mt-12 flex justify-center items-center gap-2">
      <div className="w-10 md:w-16 h-px bg-linear-to-r from-transparent to-amber-400/60" />
      <div className="flex gap-1.5">
        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
        <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="w-1.5 h-1.5 bg-amber-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
      </div>
      <div className="w-10 md:w-16 h-px bg-linear-to-l from-transparent to-amber-400/60" />
    </div>
  </div>

  <style>{`
    /* Tablet styles - 768px to 1023px */
    @media (min-width: 768px) and (max-width: 1023px) {
      section {
        padding-top: 3rem;
        padding-bottom: 3rem;
      }
      
      h1 {
        font-size: 2rem;
        line-height: 1.3;
        margin-bottom: 1.75rem;
      }
      
      p {
        font-size: 1.25rem;
        margin-bottom: 2.5rem;
      }
      
      .grid {
        gap: 1rem;
      }
      
      .grid > div {
        padding: 1.25rem;
      }
    }
    
    /* iPad (820px) and 1024px specific */
    @media (min-width: 820px) and (max-width: 1024px) {
      h1 {
        font-size: 2.25rem;
        margin-bottom: 2rem;
      }
      
      p {
        font-size: 1.375rem;
        line-height: 1.7;
      }
      
      .grid {
        margin-top: 2.5rem;
        gap: 1.25rem;
      }
      
      .grid > div {
        padding: 1.5rem;
      }
      
      .grid > div > div:first-child {
        font-size: 2.5rem;
        margin-bottom: 0.75rem;
      }
      
      .grid > div > div:last-child {
        font-size: 0.9375rem;
      }
    }
    
    /* Mobile optimization */
    @media (max-width: 639px) {
      section {
        padding-top: 2rem;
        padding-bottom: 2rem;
      }
      
      h1 {
        font-size: 1.5rem;
        line-height: 1.4;
      }
      
      .grid {
        grid-template-columns: 1fr;
      }
      
      .grid > div {
        padding: 1.25rem;
      }
    }
  `}</style>
</section>
  );
}
