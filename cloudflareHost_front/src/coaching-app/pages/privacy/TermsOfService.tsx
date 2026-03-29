import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
export default function TermsOfService() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>სერვისის პირობები | ნუცა ბახტაძე</title>
        <meta
          name="description"
          content="ნუცა ბახტაძეს სერვისის პირობები — ქოუჩინგის, ტრენინგებისა და ონლაინ კურსების გამოყენების წესები და პირობები."
        />
        <link rel="canonical" href="https://nutsabakhtadze.com/terms-of-service/" />
      </Helmet>
      
      <div className="flex-1 bg-linear-to-br from-amber-50 via-stone-100 to-amber-100 flex flex-col">
        <div className="max-w-3xl mx-auto w-full px-4 md:px-6 pt-16 md:pt-20 pb-10 space-y-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-bold text-center text-gray-800 tracking-wide">
            {t("terms.title")}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-center md:text-left">
            {t("terms.intro")}
          </p>
          <section className="space-y-5">
            <h2 className="text-xl md:text-2xl font-semibold text-[#D4AF37]">
              {t("terms.bookingTitle")}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {t("terms.bookingText")}
            </p>
          </section>
          <section className="space-y-5">
            <h2 className="text-xl md:text-2xl font-semibold text-[#D4AF37]">
              {t("terms.cancelTitle")}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {t("terms.cancelText")}
            </p>
          </section>
          <p className="text-center text-gray-500 text-sm md:text-base pt-16 pb-8">
            {t("terms.updated")}: {new Date().toLocaleDateString("ka-GE")}
          </p>
        </div>
        <div className="flex-1 min-h-0" />
      </div>
    </>
  );
}