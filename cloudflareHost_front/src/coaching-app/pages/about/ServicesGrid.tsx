import { useTranslation } from "react-i18next";

export default function ServicesGrid() {
  const { t } = useTranslation();

  const services = [
    { icon: "🧭", title: t("AboutPage.service1Title"), text: t("AboutPage.service1Text") },
    { icon: "🌱", title: t("AboutPage.service2Title"), text: t("AboutPage.service2Text") },
    { icon: "✨", title: t("AboutPage.service3Title"), text: t("AboutPage.service3Text") },
  ];

  return (
    <>
      <h2 className="text-3xl font-light text-center text-gray-800 mb-10">{t("AboutPage.servicesTitle")}</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-amber-100">
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">{service.title}</h3>
            <p className="text-lg leading-relaxed text-gray-600">{service.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

