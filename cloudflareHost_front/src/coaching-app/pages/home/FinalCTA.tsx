import { useTranslation } from 'react-i18next';
import HomeButton from '../../components/button/HomeButton';

export default function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section className="relative py-16 sm:py-24 md:py-28 lg:py-32 xl:py-40 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center text-4xl font-bold bg-linear-to-br from-stone-800 via-slate-700 to-stone-800 bg-clip-text text-transparentoverflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-orange-200 via-amber-300 to-amber-300 opacity-70" />
      <div className="relative z-10">
        <p className="text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed mb-5 sm:mb-6 md:mb-8 text-stone-600 max-w-4xl mx-auto px-4">{t("HomePage.finalCTAText")}</p>
        <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl  mb-8 sm:mb-10 md:mb-12 font-normal max-w-5xl mx-auto leading-snug tracking-tight px-4">{t("HomePage.finalCTATitle")}</h2>
        <HomeButton title="HomePage.finalCTAButton" />
      </div>
    </section>
  );
}