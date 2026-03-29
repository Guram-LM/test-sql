
import type { OfferApiCombined, OrderResult } from "../../components/interface/Interface";
import { useTranslateOrdesr } from "../../components/hook/useTranslateOrdesr";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import OrderModal from "../../components/modals/orderodal/Orderodal";
import SuccessModal from "../../components/modals/successModal/SuccessModal";
import ErrorModal from "../../components/modals/errorModal/ErrorModal";
import NetworkErrorPage from "../error/NetworkErrorPage";
import { useScrollToSection } from "../../components/hook/useScrollToSection";
import CompanyHero from "./CompanyHero";
import CompanyLoader from "./CompanyLoader";
import CompanyService from "./CompanyService";
import CompanyCta from "./CompanyCta";
import { useRateLimitStore } from "../../zustand/useRateLimitStore";
import RateLimitModal from "../../components/modals/rateLimitModal/RateLimitModal";
import { Helmet } from "react-helmet-async";
import CompanyEmpty from "./CompanyEmpty";

const ForCompaniesPage = () => {
  const { t } = useTranslation(); 
  const { offers, loading, error } = useTranslateOrdesr<OfferApiCombined>("companyoffers");
  const rateLimit = useRateLimitStore((state) => state);
  const closeRateLimit = useRateLimitStore((s) => s.close);

  useScrollToSection();


  const [selectedCourse, setSelectedCourse] = useState<OfferApiCombined | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleOrderResult = ({ success, isRateLimit }: OrderResult) => {
    setSelectedCourse(null);
  
    if (isRateLimit) {
      
      return;
    }
  
    if (success) {
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  };


  const cardThemes = [
    { gradient: "from-slate-700 to-slate-600", icon: "🎯" },
    { gradient: "from-amber-600 to-orange-600", icon: "👥" },
    { gradient: "from-stone-700 to-stone-600", icon: "📈" },
    { gradient: "from-rose-600 to-pink-700", icon: "❤️" },
    { gradient: "from-cyan-600 to-blue-700", icon: "🌊" },
    { gradient: "from-lime-600 to-green-700", icon: "🍃" },
  ];


  
  if (error) {
    return <NetworkErrorPage />;
  }
  

  return (
    <>
      <Helmet>
        <title>კორპორაციული ტრენინგები | ნუცა ბახტაძე — EQ კომპანიებისთვის</title>
        <meta
          name="description"
          content="ემოციური ინტელექტის ტრენინგები კომპანიებისთვის საქართველოში. გუნდური განვითარება, ლიდერშიპი, სტრესის მენეჯმენტი — ონლაინ და ოფლაინ."
        />
        <link rel="canonical" href="https://nutsabakhtadze.com/for-companies/" />

        <meta property="og:title" content="EQ ტრენინგები კომპანიებისთვის — ნუცა ბახტაძე" />
        <meta property="og:description" content="გაზარდეთ გუნდის პროდუქტიულობა და კომუნიკაცია ემოციური ინტელექტის განვითარებით." />
        <meta property="og:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta property="og:url" content="https://nutsabakhtadze.com/for-companies/" />
        <meta property="og:locale" content="ka_GE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="კორპორაციული EQ პროგრამები საქართველოში" />
        <meta name="twitter:description" content="ტრენინგები ბიზნესისთვის — ლიდერობა, გუნდური სამუშაო, ემოციური რეზილიენტობა." />
        <meta name="twitter:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta name="twitter:image:alt" content="კორპორაციული ტრენინგების გვერდი" />
      </Helmet>
      
      <div className=" bg-linear-to-br from-stone-50 via-gray-50 to-stone-100">



        <CompanyHero/>


        <section id="programs" className="py-20 px-8 max-w-6xl mx-auto">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-center text-gray-800 mb-4">
              {t("company.programs.title")}
            </h2>
            <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto ">
              {t("company.programs.subtitle")}
            </p>
            <div className="grid grid-cols-1 min-[820px]:grid-cols-1 min-[1200px]:grid-cols-2 gap-8">

              <CompanyLoader cardThemes={cardThemes} loading={loading} offers={offers} />

              {!loading && !error && offers.length === 0 && <CompanyEmpty/>}
              
            {!loading && !error && offers.map((program: OfferApiCombined, index: number) => {
                const theme = cardThemes[index % cardThemes.length];

                const activities: string[] = Array.isArray(program.activities)
                  ? program.activities.filter((a: string): a is string => typeof a === "string" && a.trim() !== "")
                  : [];

                const results: string[] = Array.isArray(program.results)
                  ? program.results.filter((r: string): r is string => typeof r === "string" && r.trim() !== "")
                  : [];

                const hasValidDescription = program.description && program.description.trim() !== "";
                return (
                  <div
                    key={program.id}
                    onClick={() => setSelectedCourse(program)}
                    className="relative bg-white rounded, rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
                  >
                    <div className={`bg-linear-to-br ${theme.gradient} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500" />
                      <div className="text-5xl opacity-70  pointer-events-none">
                        {theme.icon}
                      </div>
                      <div className="relative z-10 mt-7">
                        <h3 className="md:text-2xl  text-xl font-medium mb-2">{program.title}</h3>
                        <p className="md:text-xl text-sm opacity-90 mb-4">{program.programDuration}</p>
                        <div className="md:text-2xl  text-xl font-bold mb-2">{program.price} {t("company.hero.price")}</div>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                          <span className=" text-4xl">⏱️</span>
                          <span className="md:text-xl text-sm">{program.totalHours}</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:p-8 pb-5 p-1">

                    {activities.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
                          <h4 className="text-xl font-medium text-gray-800 mb-4">
                            {t("company.programs.includes")}
                          </h4>

                          <ul className="space-y-3 mb-6">
                            {activities.map((act, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-lg">
                                <span className="text-green-600 font-bold">✓</span>
                                <p className="md:text-lg text-sm font-light text-gray-600">
                                  {act}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      
                      {
                      (results.length > 0  || hasValidDescription)  && (
                      <div className="bg-stone-50 rounded-xl flex flex-col gap-5 p-4 mb-6">
                        {
                          results.length > 0 && <p className="text-xl font-medium text-gray-800  ">
                          {t("company.programs.result")}
                        </p>
                        }
                        
                        <p className="md:text-xl text-sm text-gray-600 ">{program.benefit}</p>


                        
                    {results.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 border border-gray-100">


                        <ul className="space-y-3 mb-6">
                          {results.map((act, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-lg">
                              <span className="text-gray-600 font-bold">●</span>
                              <p className="md:text-lg text-sm font-light text-gray-600">
                                {act}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}


                      { hasValidDescription && <p className="md:text-xl  whitespace-pre-line text-sm text-gray-600 ">{program.description}</p>}
                      </div>
                      )
                      }
                      <button className="w-full text-lg bg-linear-to-r from-stone-700 to-stone-600 text-white py-3 rounded-lg font-medium hover:from-stone-800 hover:to-stone-700 transition-all duration-300">
                        {t("company.programs.button")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        <CompanyService />

        <CompanyCta/>

        {rateLimit.isOpen && (
          <RateLimitModal
            message={rateLimit.message}
            retryAfter={rateLimit.retryAfter || undefined}
            onClose={closeRateLimit}
          />
        )}

  
        {selectedCourse && (
          <OrderModal
            course={{
              title: selectedCourse.title || "უსათაურო კურსი",
              price: selectedCourse.price || "0 ₾",
            }}
            onClose={() => setSelectedCourse(null)}
            onResult={handleOrderResult}
          />
        )}

        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
        {showError && <ErrorModal onClose={() => setShowError(false)} />}
      </div>
    </>
  );
};

export default ForCompaniesPage;