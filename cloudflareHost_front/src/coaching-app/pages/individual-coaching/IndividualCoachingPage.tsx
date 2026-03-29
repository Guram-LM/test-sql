import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderModal from "../../components/modals/orderodal/Orderodal";
import SuccessModal from "../../components/modals/successModal/SuccessModal";
import ErrorModal from "../../components/modals/errorModal/ErrorModal";
import { useTranslateOrdesr } from "../../components/hook/useTranslateOrdesr";
import type { OfferApiCombined, OrderResult } from "../../components/interface/Interface";
import { useTranslation } from "react-i18next";
import { useScrollToSection } from "../../components/hook/useScrollToSection";
import IndividualeHero from "./IndividualeHero";
import IndividualeLoader from "./IndividualeLoader";
import IndividualeCata from "./IndividualeCata";
import { useRateLimitStore } from "../../zustand/useRateLimitStore";
import RateLimitModal from "../../components/modals/rateLimitModal/RateLimitModal";
import NetworkErrorPage from "../error/NetworkErrorPage";
import { Helmet } from "react-helmet-async";
import IndividualeEmpty from "./IndividualeEmpty";

export default function IndividualCoachingPage() {
  const location = useLocation();
  const { t } = useTranslation();

  const { offers, loading, error } = useTranslateOrdesr<OfferApiCombined>("individualoffersOrder");
  const rateLimit = useRateLimitStore((state) => state);
  const closeRateLimit = useRateLimitStore((s) => s.close);

  useScrollToSection();

  const [selectedCourse, setSelectedCourse] = useState<OfferApiCombined | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);


  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
  
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
      }
    }
  }, [location, offers]);


  const handleCardClick = (offer: OfferApiCombined) => {
  if (rateLimit.isOpen) {
    return;
  }
  setSelectedCourse(offer); 
};


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


  if (error) return <NetworkErrorPage />;

  return (
    <>
      <Helmet>
        <title>პერსონალური ქოუჩინგი — ნუცა ბახტაძე</title>
        <meta
          name="description"
          content="1:1 სესიები ემოციების გაცნობიერებისთვის, სტრესის შემცირებისთვის და პირადი ზრდისთვის. ინდივიდუალური მიდგომა თითოეული ადამიანისთვის."
        />
        <link rel="canonical" href="https://nutsabakhtadze.com/individual-coaching/" />

        <meta property="og:title" content="ინდივიდუალური EQ ქოუჩინგი — ნუცა ბახტაძე" />
        <meta property="og:description" content="პერსონალური მხარდაჭერა ემოციების გაცნობიერებისა და ცხოვრების ხარისხის გასაუმჯობესებლად." />
        <meta property="og:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta property="og:url" content="https://nutsabakhtadze.com/individual-coaching/" />
        <meta property="og:locale" content="ka_GE" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="პერსონალური ქოუჩინგი EQ-ზე" />
        <meta name="twitter:description" content="1:1 სესიები თვითგანვითარებისა და ემოციური ბალანსისთვის." />
        <meta name="twitter:image" content="https://nutsabakhtadze.com/cover-v2.jpeg" />
        <meta name="twitter:image:alt" content="ინდივიდუალური ქოუჩინგის გვერდი" />
      </Helmet>

      <div className="bg-linear-to-br from-gray-50 via-stone-50 to-gray-100">
        <IndividualeHero />

        <section id="programs" className="py-20 px-8 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="md:text-3xl text-xl font-light text-gray-800 mb-6">
              {t("IndividualCoachingPage.programs.title")}
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 min-[820px]:grid-cols-1 min-[1200px]:grid-cols-2 gap-10 max-w-6xl mx-auto">
        
            <IndividualeLoader loading={loading} />

            {!loading && !error && offers.length === 0 && <IndividualeEmpty/>}
            {!loading &&
              offers.map((offer: OfferApiCombined, index) => {
                const activities: string[] = Array.isArray(offer.activities)
                  ? offer.activities.filter(
                      (act: string): act is string => typeof act === "string" && act.trim() !== ""
                    )
                  : [];

                const results: string[] = Array.isArray(offer.results)
                  ? offer.results.filter(
                      (r: string): r is string => typeof r === "string" && r.trim() !== ""
                    )
                  : [];

                const hasValidDescription = typeof offer.description === "string" && offer.description.trim()
                return (
                  <div
                    key={offer.id}
                    onClick={() => handleCardClick(offer)}
                    className="cursor-pointer bg-linear-to-br from-stone-50 to-gray-50 rounded-3xl shadow-xl md:p-10 px-4 py-5 border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div>
                      <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
                        👥
                      </div>

                      <h3 className="text-2xl font-medium text-gray-800 mb-2">{offer.title}</h3>
                      <h3 className="text-2xl font-medium text-gray-800 mb-10">{offer.Program}</h3>

                  
                      {activities.length > 0 && (
                        <div className="bg-stone-50 rounded-xl flex flex-col gap-5 mb-6">
                          <p className="text-xl font-medium text-gray-800">
                            {index === 1 ? (t("IndividualCoachingPage.programs.activities1")) : (t("IndividualCoachingPage.programs.activities")) } 
                          </p>
                          <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <ul className="space-y-3">
                              {activities.map((act, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-lg">
                                  <span className="text-amber-600 font-bold">✓</span>
                                  <p className="md:text-lg text-sm font-light text-gray-600">
                                    {act}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

          
                      {offer.totalHours && (
                        <div className="font-medium text-gray-800 mb-6 text-lg">
                          {t("IndividualCoachingPage.programs.duration")} {offer.totalHours}
                        </div>
                      )}

            
                      {(results.length > 0 || hasValidDescription) && (
                        <div className="bg-stone-50 rounded-xl flex flex-col gap-5 mb-6">
                          {results.length > 0 && (
                            <>
                              <p className="text-xl font-medium text-gray-800">
                                {t("company.programs.result")}
                              </p>
                              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                                <ul className="space-y-3">
                                  {results.map((res, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-lg">
                                      <span className="text-gray-600 font-bold">●</span>
                                      <p className="md:text-lg text-sm font-light text-gray-600">
                                        {res}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}
                          {hasValidDescription && (
                            <p className="md:text-xl text-sm whitespace-pre-line text-gray-600">{offer.description}</p>
                          )}
                        </div>
                      )}

                      <h4 className="text-lg text-gray-500 mt-10 mb-5 md:mt-15">
                        <span className="text-gray-800">
                          {t("IndividualCoachingPage.programs.duration")}
                        </span>{" "}
                        {offer.programDuration}
                      </h4>
                      <div className="text-3xl font-light text-gray-800 mb-6">
                        {offer.price} {t("company.hero.price")}
                      </div>
                    </div>

                    <button className="w-full text-lg bg-linear-to-r from-stone-700 to-stone-600 text-white py-3 rounded-lg font-medium hover:from-stone-800 hover:to-stone-700 transition-all duration-300">
                      {t("company.programs.button")}
                    </button>
                  </div>
                );
              })}
          </div>
        </section>

        <IndividualeCata />

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
}
