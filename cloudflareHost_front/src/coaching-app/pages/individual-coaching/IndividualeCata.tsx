import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const IndividualeCata = () => {
    const { t } = useTranslation();
  return (
    <section className="py-20 px-8 bg-linear-to-br from-stone-800 via-slate-700 to-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl  font-light mb-6">
            {t('IndividualCoachingPage.bottom.title')}
          </h2>
          <p className="md:text-lg text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t('IndividualCoachingPage.bottom.text')}
          </p>
          <p className="md:text-lg text-sm leading-relaxed text-gray-200 mb-10 max-w-3xl mx-auto">
            {t('IndividualCoachingPage.hero.text3')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link to={"/contact"} className="bg-[#7A4B2C] text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105">
              {t("company.cta.secondaryButton")}
            </Link>
          </div>
        </div>
      </section>
  )
}

export default IndividualeCata