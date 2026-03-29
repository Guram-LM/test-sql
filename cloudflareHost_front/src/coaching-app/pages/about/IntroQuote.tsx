import { useTranslation } from "react-i18next";

export default function IntroQuote() {
  const { t } = useTranslation();

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 mb-10 border border-white/80">
      <p className="text-xl sm:text-2xl leading-relaxed text-gray-700 text-center font-light">
        {t("AboutPage.introQuote")}
      </p>
    </div>
  );
}