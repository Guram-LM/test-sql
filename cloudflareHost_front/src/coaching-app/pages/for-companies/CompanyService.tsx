import { useTranslation } from "react-i18next";

const CompanyService = () => {

    const { t } = useTranslation();
    
    const additionalServices = [
    {
      title: <span className="text-lg">{t("company.additionalServices.items.0.title")}</span>,
      description: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.0.description")}</span>,
      icon: '🏆',
      buletTitle: <span className="text-sm">{t("company.additionalServices.items.0.buletTitle")}</span>,
      bulet1: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.0.bulet1")}</span>,
      bulet2: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.0.bulet2")}</span>,
      bulet3: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.0.bulet3")}</span>,
    },
    {
      title: <span className="text-lg">{t("company.additionalServices.items.1.title")}</span>,
      description: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.1.description")}</span>,
      icon: '🎯',
       buletTitle: <span className="text-sm">{t("company.additionalServices.items.0.buletTitle")}</span>,
      bulet1: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.1.bulet4")}</span>,
      bulet2: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.1.bulet5")}</span>,
      bulet3: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.1.bulet6")}</span>,
    },
    {
      title: <span className="text-lg">{t("company.additionalServices.items.2.title")}</span>,
      description: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.2.description")}</span>,
      icon: '👨‍🏫',
       buletTitle: <span className="text-sm">{t("company.additionalServices.items.0.buletTitle")}</span>,
      bulet1: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.2.bulet7")}</span>,
      bulet2: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.2.bulet8")}</span>,
      bulet3: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.2.bulet9")}</span>,
    },
    {
      title: <span className="text-lg">{t("company.additionalServices.items.3.title")}</span>,
      description: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.3.description")}</span>,
      icon: '📊',
       buletTitle: <span className="text-sm">{t("company.additionalServices.items.0.buletTitle")}</span>,
      bulet1: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.3.bulet10")}</span>,
      bulet2: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.3.bulet11")}</span>,
      bulet3: <span className="text-sm text-gray-700 leading-relaxed italic">{t("company.additionalServices.items.3.bulet12")}</span>,
    },
  ];
  return (
    <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center text-gray-800 mb-4">
            {t("company.additionalServices.title")}
          </h2>
          <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto ">
            {t("company.additionalServices.subtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 min-[1200px]:grid-cols-4 gap-6">
            {additionalServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-stone-50 to-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-linear-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-3xl mb-4">
                  {service.icon}
                </div>
                <h3 className="font-medium text-gray-800 mb-2">{service.title}</h3>
                <p>{service.description}</p>
                 <p>{service.buletTitle}</p>
                  <p>{service.bulet1}</p>
                   <p>{service.bulet2}</p>
                    <p>{service.bulet3}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default CompanyService