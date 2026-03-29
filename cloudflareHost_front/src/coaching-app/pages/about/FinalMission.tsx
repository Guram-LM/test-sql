import { useTranslation } from "react-i18next";

export default function FinalMission() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-linear-to-br from-stone-50 to-amber-50 rounded-2xl p-8 sm:p-12 mb-10 border-l-4 border-amber-400 overflow-hidden">
      <div className="absolute top-2 left-4 sm:top-0 sm:left-8 text-7xl sm:text-9xl text-amber-300/30 font-serif leading-none">"</div>
      <p className="relative text-base sm:text-lg leading-loose text-gray-700 pl-8 sm:pl-0">
        {t("AboutPage.finalMission")}
      </p>
    </div>
  );
}