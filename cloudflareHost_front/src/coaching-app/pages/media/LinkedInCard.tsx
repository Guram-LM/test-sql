import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MagazineItem {
  id: number;
  title: string;
  data: string;
  description: string;
  link: string;
  image: string;
};
interface LinkedInCardProps {
  magazines: MagazineItem[];
}
const LinkedInCard: React.FC<LinkedInCardProps> = ({ magazines }) => {
  const {t} =useTranslation()
  

  const [openModal, setOpenModal] = useState<number | null>(null);



  return (
    <>
       {magazines.map((mag) => (
        <div
          key={mag.id}
          className="relative group"
        >

        <div className="relative w-full max-w-xs mx-auto">
        
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-linear-to-b from-yellow-600/40 to-yellow-600/80 rounded-full" />


          <div className="relative w-20 h-20 md:w-30 md:h-30 mx-auto mt-8">
            <div className="relative w-full h-full bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 rounded-full shadow-[0_15px_40px_rgba(0,119,181,0.5)] group-hover:shadow-[0_20px_50px_rgba(0,119,181,0.7)] transition-all duration-700 flex items-center justify-center border-4 border-blue-500/40 group-hover:scale-105">
              <svg
                className="w-10 h-10 md:w-15 md:h-15 text-white drop-shadow-2xl"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>

              <div className="absolute inset-2 bg-linear-to-br from-blue-400/20 to-transparent rounded-full" />
              <div className="absolute inset-0 bg-linear-to-tr from-blue-400/0 via-blue-300/10 to-blue-200/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>

          
          <div className="absolute top-22 md:top-33 left-1/2 -translate-x-1/2 w-0.5 h-6.5 md:h-10 bg-linear-to-b from-yellow-600/80 to-yellow-600/40 rounded-full" />

          <div className="relative mt-10 md:mt-15 animate-sway-slow">
            
              <div
                className="relative w-40 h-50 md:w-42 md:h-54 mx-auto mb-6 last:mb-0 transform shadow-[0_12px_30px_rgba(0,0,0,0.5)] animate-swing-gentle cursor-pointer"
                style={{ animationDelay: mag.id === 1 ? '0s' : '1.2s' }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenModal(mag.id);
                }}
              >
                <div className="relative w-full h-full bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_2px_14px_rgba(0,0,0,0.15)] transition-shadow duration-400">

                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, rgba(120,60,20,0.05) 1px, transparent 2px),
                                        repeating-linear-gradient(90deg, transparent 0px, rgba(120,60,20,0.05) 1px, transparent 2px)`,
                      backgroundSize: '3px 3px',
                    }}
                  />

                  <div className="absolute inset-2 border-2 border-amber-900/20 rounded-sm" />
                    
                    
                    <p className="absolute left-6 top-4 text-amber-800/90 text-[8px] md:text-[9px]">
                      𝓔𝓠 𝓒𝓸𝓪𝓬𝓱
                    </p>
                  <div className="absolute top-9 left-2 right-2 h-25 md:h-25 px-2.5">
                    <div className="relative w-full h-full bg-white p-0.5 shadow-lg rounded-sm overflow-hidden">
                      <img
                        src={mag.image}
                        alt={mag.title}
                        className="w-full h-full object-cover sepia-[0.15] contrast-[0.92] hover:sepia-0 hover:contrast-100 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-2 right-2 text-center">
                    <p className="text-amber-900 font-serif font-bold text-[9px] md:text-[10px] leading-tight tracking-wide">
                      {mag.title}
                    </p>
                    <p className="text-amber-800/90 text-[8px] md:text-[9px] mt-0.5">
                      {mag.data}
                    </p>
                  </div>
                </div>
              </div>
            
          </div>

        </div>





        {openModal !== null && (
        <div
          className="fixed inset-2 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-lg shadow-2xl overflow-hidden border-2 border-[#d4c5a9] bg-linear-to-br from-[#f5f5dc] via-[#f0ead6] to-[#e8dcc4]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-1 left-0 right-0 h-4 flex justify-center pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 16" preserveAspectRatio="none">
                <path 
                  d="M0,10 Q20,4 40,10 T80,10 T120,10 T160,10 T200,10 T240,10 T280,10 T320,10 T360,10 T400,10 L400,16 L0,16 Z" 
                  fill="#f5f5dc"
                  stroke="#d4c5a9"
                  strokeWidth="0.8"
                />
              </svg>
            </div>

            
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,115,85,0.03) 2px, rgba(139,115,85,0.03) 4px)`
            }}></div>

            
            <div className="absolute top-0 left-0 w-12 h-12 bg-linear-to-br from-[#d4c5a9]/40 to-transparent"></div>
            <div className="absolute top-0 right-0 w-12 h-12 bg-linear-to-bl from-[#d4c5a9]/40 to-transparent"></div>

        
            <div className="absolute inset-0 shadow-inner pointer-events-none"></div>

            <div className="relative p-8 md:p-10 pt-12">
              <button
                onClick={() => setOpenModal(null)}
                className="absolute top-4 right-5 text-[#4a3728] hover:text-[#6b4e31] text-3xl font-bold transition-colors"
              >
                ×
              </button>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#4a3728] mb-4 tracking-wide border-b-2 border-dashed border-[#8b7355]/30 pb-3">
                {magazines.find(m => m.id === openModal)?.title}
              </h3>


              <p className="text-[#8b7355] text-sm mb-6">
                {t("socialMediaCards.linkedIn.0.publition")} {magazines.find(m => m.id === openModal)?.data}
              </p>

              <p className="text-[#5a4a3a] leading-relaxed mb-10 font-serif text-base">
                {magazines.find(m => m.id === openModal)?.description}
              </p>

              <div className="text-center">
                <a
                  href={magazines.find(m => m.id === openModal)?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-linear-to-r from-[#6b4e31] to-[#8b7355] hover:from-[#8b7355] hover:to-[#a68c6e] text-[#f5f0e1] font-bold text-lg rounded-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border border-[#d4c5a9]/50"
                >
                  {t("socialMediaCards.linkedIn.0.fullLinkText")}
                </a>
              </div>
            </div>

            
            <div className="absolute -right-1 top-2 bottom-2 w-2 bg-linear-to-r from-[#8b7355]/20 to-transparent pointer-events-none"></div>
            <div className="absolute -left-1 top-2 bottom-2 w-2 bg-linear-to-l from-[#8b7355]/20 to-transparent pointer-events-none"></div>

            
            <div className="absolute -bottom-2 left-4 right-4 h-3 bg-linear-to-b from-black/20 to-transparent blur-sm rounded-full pointer-events-none"></div>
          </div>
        </div>
        )}
        </div>
       ))}
    </>
   
  );
};

export default LinkedInCard;
