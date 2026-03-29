import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>პირადი მონაცემების დაცვა | ნუცა ბახტაძე</title>
        <meta
          name="description"
          content="პოლიტიკა პერსონალური მონაცემების დამუშავებისა და დაცვის შესახებ. შესაბამისობა საქართველოს კანონმდებლობასთან."
        />
        <link rel="canonical" href="https://nutsabakhtadze.com/privacy/" />
      </Helmet>

      <section className="
        bg-linear-to-br from-amber-50 via-stone-100 to-amber-100 py-16 lg:py-20 xl:py-32 transition-all duration-300">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 xl:mb-20">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-extrabold tracking-tight mb-6
              bg-linear-to-r from-[#D4AF37] via-amber-600 to-[#D4AF37]
              bg-clip-text text-transparent drop-shadow-md pb-3">
              {t("privacy.title")}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t("privacy.intro")}
            </p>
          </div>
          <div className="space-y-12 lg:space-y-16 xl:space-y-20 text-gray-800">
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-2xl font-semibold text-[#D4AF37] mb-6">
                {t("privacy.collectTitle")}
              </h2>
              <ul className="space-y-3 lg:space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed pl-6 list-disc">
                {(t("privacy.collectList", { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="marker:text-amber-600">{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-2xl font-semibold text-[#D4AF37] mb-6">
                {t("privacy.usageTitle")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700">
                {t("privacy.usageText")}
              </p>
            </section>
            <section>
              <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-2xl font-semibold text-[#D4AF37] mb-6">
                {t("privacy.rightsTitle")}, Georgia
              </h2>
              <ul className="space-y-3 lg:space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed pl-6 list-disc">
                {(t("privacy.rightsList", { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="marker:text-amber-600">{item}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className="mt-16 lg:mt-20 xl:mt-24 text-center">
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 italic">
              {t("privacy.updated")}: {new Date().toLocaleDateString("ka-GE", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}