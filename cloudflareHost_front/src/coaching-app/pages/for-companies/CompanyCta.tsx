import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CompanyCta = () => {
    const { t } = useTranslation();
  return (
          <section className="py-20 px-8 bg-linear-to-br from-slate-800 via-stone-700 to-slate-800 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                {t("company.cta.title")}
              </h2>
              <p className="text-gray-300 mb-10 leading-relaxed md:text-lg text-sm">
                {t("company.cta.text")}
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

export default CompanyCta