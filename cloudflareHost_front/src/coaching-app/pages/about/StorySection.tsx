import { useTranslation } from "react-i18next";

export default function StorySection() {
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-light text-center text-gray-800 mb-10">{t("AboutPage.storyTitle")}</h2>
      <div className="space-y-6 text-lg leading-loose text-gray-700">
        <p>{t("AboutPage.storyText1")}</p>
        <p className="font-medium adient-to-r from-transparent via-slate-700" />
        <p className="text-xl sm:text-2xl text-center bg-linear-to-r from-stone-800 via-slate-700 to-stone-800 bg-clip-text text-transparent">
          {t("AboutPage.storyText2")}
        </p>

      </div>
    </div>
  );
}
