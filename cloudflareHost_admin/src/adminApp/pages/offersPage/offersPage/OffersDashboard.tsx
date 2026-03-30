import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOffers } from "../../../component/hook/useOffers";


const OffersDashboard: React.FC = () => {
  const navigate = useNavigate();

  const {
    offers: companyOffers,
    loading: loadingCompany,
    error: errorCompany,
    fetchOffers: fetchCompanyOffers,
  } = useOffers("companyoffers");

  const {
    offers: individualOffers,
    loading: loadingIndividual,
    error: errorIndividual,
    fetchOffers: fetchIndividualOffers,
  } = useOffers("individualoffersOrder");

  const [currentCompany, setCurrentCompany] = useState(0);
  const [currentIndividual, setCurrentIndividual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (companyOffers.length > 0)
        setCurrentCompany((prev) => (prev + 1) % companyOffers.length);
      if (individualOffers.length > 0)
        setCurrentIndividual((prev) => (prev + 1) % individualOffers.length);
    }, 60000);
    return () => clearInterval(interval);
  }, [companyOffers, individualOffers]);

  useEffect(() => {
    fetchCompanyOffers();
    fetchIndividualOffers();
  }, []);

  const handlePrev = (type: "company" | "individual") => {
    if (type === "company") {
      setCurrentCompany((prev) =>
        prev === 0 ? companyOffers.length - 1 : prev - 1
      );
    } else {
      setCurrentIndividual((prev) =>
        prev === 0 ? individualOffers.length - 1 : prev - 1
      );
    }
  };

  const handleNext = (type: "company" | "individual") => {
    if (type === "company") {
      setCurrentCompany((prev) => (prev + 1) % companyOffers.length);
    } else {
      setCurrentIndividual((prev) => (prev + 1) % individualOffers.length);
    }
  };

  return (

    
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pb-10">

      

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-5 sm:top-40 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-10 sm:-bottom-8 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
   
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl pb-2 font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
            შეთავაზებების მართვა
          </h1>
          <p className="text-purple-200 text-base sm:text-lg">
            შექმენი და მართე შენი შეთავაზებები ერთ ადგილას
          </p>
        </div>

 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
      
          <div
            onClick={() => navigate("/createIndividualOffers")}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-linear-to-r from-amber-500 via-orange-500 to-rose-600 p-1 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-amber-500/50"
          >
            <div className="relative h-full rounded-3xl bg-linear-to-r from-amber-500/90 via-orange-500/90 to-rose-600/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="inline-block p-2.5 sm:p-3 bg-white/20 rounded-2xl mb-4 sm:mb-6 backdrop-blur-sm">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">
                  ინდივიდუალური შეთავაზება
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  დაამატე ახალი პერსონალური შეთავაზება მომხმარებლებისთვის
                </p>
                <div className="mt-4 sm:mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="mr-2 text-sm sm:text-base">შექმნა</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

  
          <div
            onClick={() => navigate("/createCompanylOffers")}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-blue-500/50"
          >
            <div className="relative h-full rounded-3xl bg-linear-to-r from-blue-500/90 via-indigo-500/90 to-purple-600/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="inline-block p-2.5 sm:p-3 bg-white/20 rounded-2xl mb-4 sm:mb-6 backdrop-blur-sm">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">
                  კომპანიის შეთავაზება
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  შექმენი ახალი შეთავაზება ორგანიზაციებისთვის და გუნდებისთვის
                </p>
                <div className="mt-4 sm:mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
                  <span className="mr-2 text-sm sm:text-base">შექმნა</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
  
          <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-5 sm:mb-6">
                <div className="p-2 bg-linear-to-r from-amber-400 to-orange-500 rounded-xl mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  ინდივიდუალური შეთავაზებები
                </h3>
              </div>

              {loadingIndividual ? (
                <div className="flex items-center justify-center py-10 sm:py-12">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : errorIndividual ? (
                <div className="bg-white/5 rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-purple-300 text-base sm:text-lg">შეთავაზებები არ მოიძებნა</p>
                </div>
              ) : individualOffers.length > 0 ? (
                <div className="relative">
                  <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 min-h-[180px] sm:min-h-[220px] flex flex-col justify-center transition-all duration-500">
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                      {individualOffers[currentIndividual]?.title_ka}
                    </h4>
                    <p className="text-purple-200 text-sm sm:text-lg leading-relaxed line-clamp-4">
                      {individualOffers[currentIndividual]?.Program_ka}
                    </p>

                    <div className="flex items-center justify-between mt-4 sm:mt-6">
                      <div className="flex space-x-2">
                        {individualOffers.map((_, index) => (
                          <div
                            key={index}
                            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                              index === currentIndividual
                                ? 'w-6 sm:w-8 bg-amber-400'
                                : 'w-1.5 sm:w-2 bg-white/30'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className="text-purple-300 text-xs sm:text-sm">
                        {currentIndividual + 1} / {individualOffers.length}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePrev("individual")}
                    className="absolute top-1/2 -left-3 sm:-left-4 transform -translate-y-1/2 bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 rounded-full p-2.5 sm:p-3 shadow-lg opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 touch-manipulation"
                    aria-label="წინა"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleNext("individual")}
                    className="absolute top-1/2 -right-3 sm:-right-4 transform -translate-y-1/2 bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 rounded-full p-2.5 sm:p-3 shadow-lg opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 touch-manipulation"
                    aria-label="შემდეგი"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="bg-white/5 rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-purple-300 text-base sm:text-lg">შეთავაზებები არ მოიძებნა</p>
                </div>
              )}
            </div>
          </div>

    
          <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-5 sm:mb-6">
                <div className="p-2 bg-linear-to-r from-blue-400 to-indigo-500 rounded-xl mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  კომპანიის შეთავაზებები
                </h3>
              </div>

              {loadingCompany ? (
                <div className="flex items-center justify-center py-10 sm:py-12">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : errorCompany ? (
                <div className="bg-white/5 rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-purple-300 text-base sm:text-lg">შეთავაზებები არ მოიძებნა</p>
                </div>
              ) : companyOffers.length > 0 ? (
                <div className="relative">
                  <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 min-h-[180px] sm:min-h-[220px] flex flex-col justify-center transition-all duration-500">
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                      {companyOffers[currentCompany]?.title_ka}
                    </h4>
                    <p className="text-purple-200 text-sm sm:text-lg leading-relaxed line-clamp-4">
                      {companyOffers[currentCompany]?.programDuration_ka}
                    </p>
                    <p className="text-purple-200 text-sm sm:text-lg leading-relaxed line-clamp-4">
                      {companyOffers[currentCompany]?.totalHours_ka}
                    </p>

                    <div className="flex items-center justify-between mt-4 sm:mt-6">
                      <div className="flex space-x-2">
                        {companyOffers.map((_, index) => (
                          <div
                            key={index}
                            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                              index === currentCompany
                                ? 'w-6 sm:w-8 bg-blue-400'
                                : 'w-1.5 sm:w-2 bg-white/30'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <span className="text-purple-300 text-xs sm:text-sm">
                        {currentCompany + 1} / {companyOffers.length}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePrev("company")}
                    className="absolute top-1/2 -left-3 sm:-left-4 transform -translate-y-1/2 bg-linear-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 rounded-full p-2.5 sm:p-3 shadow-lg opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 touch-manipulation"
                    aria-label="წინა"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleNext("company")}
                    className="absolute top-1/2 -right-3 sm:-right-4 transform -translate-y-1/2 bg-linear-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 rounded-full p-2.5 sm:p-3 shadow-lg opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 touch-manipulation"
                    aria-label="შემდეგი"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="bg-white/5 rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-purple-300 text-base sm:text-lg">შეთავაზებები არ მოიძებნა</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default OffersDashboard;