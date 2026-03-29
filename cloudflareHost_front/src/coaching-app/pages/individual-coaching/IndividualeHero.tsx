import { useTranslation } from "react-i18next";


const IndividualeHero = () => {
    const { t } = useTranslation();
  return (
    <section className="relative py-16 px-4 md:py-20 md:px-8 overflow-hidden flex items-center md:pt-20 md:pb-20 pt-8 pb-8 lg:pt-20 lg:pb-20">
        <div className="absolute inset-0 bg-linear-to-r from-slate-800 via-stone-700 to-slate-800 opacity-95" />
        

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-amber-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-orange-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-amber-500 rounded-full filter blur-3xl animate-pulse opacity-20" style={{ animationDelay: '1.5s' }} />
        </div>


        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-1/3 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-400/50 to-transparent" />
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-400/50 to-transparent" />
        </div>


        <div className="absolute top-8 right-8 w-24 h-24 md:w-40 md:h-40 border border-amber-400/10 rounded-full" />
        <div className="absolute top-12 right-12 w-16 h-16 md:w-28 md:h-28 border border-amber-400/5 rounded-full" />
        <div className="absolute bottom-8 left-8 w-24 h-24 md:w-40 md:h-40 border border-amber-400/10 rounded-full" />

        <div className="relative w-full z-10">

          <div className="relative max-w-5xl text-center mx-auto mb-8 md:mb-10">
            <div className="text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-amber-200 mb-3 font-light">
              {t("IndividualCoachingPage.hero.offertitle")}
            </div>
            <div className="w-24 md:w-32 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent mx-auto" />
            

            <div className="flex justify-center items-center gap-3 mt-4">
              <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full" />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-amber-400/60 rounded-full" />
            </div>
          </div>


          <div className="relative max-w-4xl mx-auto text-center text-white px-4">
            <h1 className="text-2xl md:text-3xl font-light leading-tight mb-6 md:mb-8 tracking-tight ">
              {t('IndividualCoachingPage.hero.title')}
            </h1>
            
            <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
              <p className="text-sm md:text-lg font-light text-gray-200 max-w-3xl mx-auto">
                {t('IndividualCoachingPage.hero.text')}
              </p>
         
              <p className="text-sm md:text-lg font-light text-gray-200 max-w-3xl mx-auto">
                {t('IndividualCoachingPage.hero.text5')}
              </p>
              <p className="text-sm md:text-lg font-light text-gray-200 max-w-3xl mx-auto">
                {t('IndividualCoachingPage.hero.text6')}
              </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12 max-w-3xl mx-auto">
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-amber-400/20 rounded-xl p-4 md:p-5 hover:from-white/15 hover:to-white/8 hover:border-amber-400/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl mb-2">💫</div>
                <div className="text-xl font-light text-amber-300">{t('herosection.personal_growth')}</div>
              </div>
              
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-amber-400/20 rounded-xl p-4 md:p-5 hover:from-white/15 hover:to-white/8 hover:border-amber-400/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl mb-2">🎯</div>
                <div className="text-xl font-light text-amber-300">{t('herosection.goal_achievement')}</div>
              </div>
              
              <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-amber-400/20 rounded-xl p-4 md:p-5 hover:from-white/15 hover:to-white/8 hover:border-amber-400/30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl mb-2">✨</div>
                <div className="text-xl font-light text-amber-300"> {t('herosection.quality_of_life')}</div>
              </div>
            </div>


            <div id="offers" className="mt-10 md:mt-12 flex justify-center items-center gap-2">
              <div className="w-12 md:w-16 h-px bg-linear-to-r from-transparent to-amber-400/50" />
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-amber-400/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 bg-amber-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <div className="w-12 md:w-16 h-px bg-linear-to-l from-transparent to-amber-400/50" />
            </div>
          </div>
        </div>


      </section>
  )
}

export default IndividualeHero