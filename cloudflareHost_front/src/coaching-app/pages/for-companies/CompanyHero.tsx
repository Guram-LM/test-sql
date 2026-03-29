import { useTranslation } from "react-i18next";


const CompanyHero = () => {
    const { t } = useTranslation();
  return (
     <section className="relative py-16 px-4 md:py-20 md:px-8 overflow-hidden flex items-center pt-8 pb-8 md:pt-20 md:pb-20 lg:pt-20 lg:pb-20">
  <div className="absolute inset-0 bg-linear-to-r from-slate-800 via-stone-700 to-slate-800 opacity-95" />
  
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-amber-400 rounded-full filter blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-orange-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-amber-500 rounded-full filter blur-3xl animate-pulse opacity-30" style={{ animationDelay: '1s' }} />
  </div>

  <div className="absolute top-0 left-0 w-full h-full opacity-20">
    <div className="absolute top-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-400 to-transparent" />
    <div className="absolute bottom-1/4 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-400 to-transparent" />
  </div>

  <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border border-amber-400/20 rounded-full" />
  <div className="absolute top-14 left-14 w-16 h-16 md:w-24 md:h-24 border border-amber-400/10 rounded-full" />
  <div className="absolute bottom-10 right-10 w-20 h-20 md:w-32 md:h-32 border border-amber-400/20 rounded-full" />
  <div className="absolute bottom-14 right-14 w-16 h-16 md:w-24 md:h-24 border border-amber-400/10 rounded-full" />

  <div className="relative w-full z-10">
    <div className="relative max-w-5xl text-center mx-auto mb-6 md:mb-8">
      <div className="text-sm uppercase tracking-[0.25em] md:tracking-[0.3em] text-amber-200 mb-3 md:mb-4 font-light">
        {t("company.hero.offertitle")}
      </div>
      <div className="w-24 md:w-32 h-0.5 bg-linear-to-r from-transparent via-amber-400 to-transparent mx-auto mb-3 md:mb-4" />
      
      <div className="flex justify-center items-center gap-4 mb-2">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
      </div>
    </div>

    <div className="relative max-w-5xl flex flex-col gap-4 md:gap-4 mx-auto text-center text-white px-4">
      <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2 leading-tight">
        {t("company.hero.title")}
      </h1>
      
      <p className="text-sm md:text-lg text-gray-200 font-light leading-relaxed">
        {t("company.hero.subtitle")}
      </p>
      
      <p className=" text-sm md:text-lg mx-auto leading-relaxed md:leading-loose text-gray-300 px-2 md:px-4">
        {t("company.hero.description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 max-w-5xl mx-auto w-full">
        <div className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-lg p-5 md:p-6 hover:bg-white/10 transition-all duration-300">
          <div className="text-xl font-light text-amber-400 mb-2">
            {t('herosection.transformation')}
          </div>
          <div className="text-3xl md:text-4xl">
            🕊️
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-lg p-5 md:p-6 hover:bg-white/10 transition-all duration-300">
          <div className="text-xl font-light text-amber-400 mb-2">
            {t('herosection.inner_peace')}
          </div>
          <div className="text-3xl md:text-4xl">
            🧘
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-lg p-5 md:p-6 hover:bg-white/10 transition-all duration-300">
          <div className="text-xl font-light text-amber-400 mb-2">
            {t('herosection.support')}
          </div>
          <div className="text-3xl md:text-4xl">
            🦋
          </div>
        </div>
      </div>

      <div id="offers" className="mt-8 md:mt-10 flex justify-center items-center gap-2">
        <div className="w-8 md:w-12 h-px bg-linear-to-r from-transparent to-amber-400" />
        <div className="w-2 h-2 bg-amber-400 rounded-full" />
        <div className="w-2 h-2 bg-amber-400/50 rounded-full" />
        <div className="w-2 h-2 bg-amber-400/30 rounded-full" />
        <div className="w-8 md:w-12 h-px bg-linear-to-l from-transparent to-amber-400" />
      </div>
    </div>
  </div>

</section>
  )
}

export default CompanyHero