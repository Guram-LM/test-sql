import { useTranslation } from "react-i18next";
import CertificateSlider from "./Slider";

export default function CertificatesSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-linear-to-br from-stone-50 to-amber-50 rounded-2xl p-4 sm:p-12 mb-10 md:mb-16 border-l-4 border-amber-400 shadow-lg overflow-hidden">
      <div className="absolute top-2 left-4 sm:top-0 sm:left-8 text-7xl sm:text-9xl text-amber-300/30 font-serif leading-none">"</div>
      <h2 className="relative text-2xl sm:text-3xl font-light text-center text-gray-800 mb-6 md:mb-10">
        {t("AboutPage.certificatesTitle")}
      </h2>
      <p className="text-center text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-8 md:mb-12">
        {t("AboutPage.certificatesDescription")}
      </p>
      <CertificateSlider />
    </section>
  );
}