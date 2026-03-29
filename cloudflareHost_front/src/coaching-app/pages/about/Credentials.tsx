import { useTranslation } from "react-i18next";

export default function Credentials() {
  const { t } = useTranslation();

  return (
    <div className="bg-linear-to-br from-gray-800 to-gray-700 text-white rounded-2xl p-8 sm:p-12 mb-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-light mb-4">{t("AboutPage.credentialsTitle")}</h2>
      <p className="text-base sm:text-lg leading-relaxed text-gray-100 max-w-3xl mx-auto">
        {t("AboutPage.credentialsText")}
      </p>
    </div>
  );
}