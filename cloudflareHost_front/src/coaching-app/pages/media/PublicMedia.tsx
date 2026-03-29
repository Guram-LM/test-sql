import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../../components/hook/useInView';
import { usePublicMedia } from '../../components/hook/usePublicMedia';
import SectionLoader from './SectionLoader';
import SectionEmpty from './SectionEmpty';


const PublicMedia = () => {
  const {t, i18n } = useTranslation();
  const lang = i18n.language;
  const [openMagazine, setOpenMagazine] = useState<number | null>(null);

  const { ref, isVisible} = useInView()
  const { data, isLoading, isError } = usePublicMedia(isVisible)

  const getLuminance = (hex: string): number => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b);
  };

  const getTextColor = (bgHex: string): string => {
    return getLuminance(bgHex) > 160 ? '#000000' : '#ffffff';
  };


  const getSafeBackground = (preferredColor: string, fallbackColor: string): string => {
    return getLuminance(preferredColor) > 220 ? fallbackColor : preferredColor;
  };

  const colors = [
    {
      color: "#000000",
      accentColor: "#D4AF37", 
    },
    {
      color: "#FFCC00",
      accentColor: "#000000",
    },
    {
      color: "#000000",
      accentColor: "#FF0000", 
    },
    {
      color: "#1E3A8A",
      accentColor: "#FACC15", 
    },
    {
      color: "#7C2D12",
      accentColor: "#F97316",
    },
  ];

  const magazines =
  data?.map((item, index) => {
    const colorSet = colors[index % colors.length]; 

    return {
      id: item.id,
      name: lang === "ka" ? item.MagazineName_ka : item.MagazineName_en, 
      cover: item.image_url, 
      title: lang === "ka" ? item.title_ka : item.title_en,
      subtitle: lang === "ka" ? item.subtitle_ka : item.subtitle_en, 
      author: t("publicMedia.magazines.0.author"),
      date: new Date(item.created_at).toLocaleDateString(),
      price: "€ 00.00",
      excerpt:
        lang === "ka"
          ? item.description_ka
          : item.description_en,
      link: item.article_url,
      color: colorSet.color,
      accentColor: colorSet.accentColor,
      barcode: "978-000000-00-0",
    };
  }) ?? [];

  return (
    <div
      ref={ref} 
      className="py-20 px-4 bg-linear-to-b from-amber-50 via-white to-amber-50"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-20 bg-linear-to-r from-transparent via-yellow-900 to-transparent" />
              
              <svg
                className="w-14 h-14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FACC15" />
                    <stop offset="50%" stopColor="#CA8A04" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>
                </defs>

                <path
                  d="M4 5a2 2 0 012-2h11a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                  stroke="url(#goldGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M8 7h5M8 11h10M8 15h10"
                  stroke="url(#goldGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="h-px w-20 bg-linear-to-r from-transparent via-yellow-900 to-transparent" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="bg-clip-text text-yellow-900">
             {t("publicMedia.sectionTitle")}
            </span>
          </h1>
          
          <p className="text-yellow-900 text-xl tracking-[0.3em] uppercase font-light">
         {t("publicMedia.sectionSubtitle")}
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-1 bg-yellow-900 rounded-full"
                style={{
                  width: i === 0 ? "30px" : "30px",
                }}
              />
            ))}
          </div>
        </div>

        {isLoading && <SectionLoader />}

        {isError && <SectionEmpty  />}

        {!isLoading && !isError && magazines.length === 0 && (
          <SectionEmpty  />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 max-w-6xl mx-auto">
          {magazines.map((magazine, ind) => {


            const nameBg = magazine.color;
            const nameText = getTextColor(nameBg);
            const nameFilter = getLuminance(nameBg) > 160 ? 'none' : 'brightness(0) invert(1)';

            const dateBg = magazine.color;
            const dateText = getTextColor(dateBg);

            const priceBg = getSafeBackground(magazine.accentColor, magazine.color);
            const priceText = getTextColor(priceBg);

            const subtitleBg = getSafeBackground(magazine.accentColor, magazine.color);
            const subtitleText = getTextColor(subtitleBg);

            const backBg = magazine.color;
            const backNameFilter = getLuminance(backBg) > 160 ? 'none' : 'brightness(0) invert(1)';
            const backTitleText = getTextColor(backBg);
            const backExcerptText = getTextColor(backBg);

            const backAuthorColor = getSafeBackground(magazine.accentColor, magazine.color);
            const backAuthorText = getTextColor(backAuthorColor);

            const btnBg = getSafeBackground(magazine.accentColor, magazine.color);
            const btnText = getTextColor(btnBg);

            return (
              <div
                key={magazine.id}
                className="group cursor-pointer perspective-[2000px]"
                onMouseEnter={() => setOpenMagazine(magazine.id)}
                onMouseLeave={() => setOpenMagazine(null)}
              >
                <div className="relative preserve-3d">
                  <div className={`relative transition-all duration-1000 origin-right ${
                    openMagazine === magazine.id 
                      ? 'rotateY-[-160deg] shadow-2xl' 
                      : 'rotateY-0 shadow-xl'
                  }`} style={{ transformStyle: 'preserve-3d' }}>
                    <div className="bg-white rounded-sm overflow-hidden transform transition-all duration-500">

                      <div className="relative h-150 overflow-hidden">

                        <img 
                          src={magazine.cover}
                          alt={magazine.name}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60"></div>
                        
                        <div className="absolute top-0 left-0 right-0 p-3">

                          <div 
                            className="mb-3 px-4 py-2 inline-block"
                            style={{ backgroundColor: nameBg }}
                          >
                            <h2 
                              className="h-8 w-auto object-contain"
                              style={{ 
                                filter: nameFilter,
                                color: nameText
                              }}
                            >
                              {magazine.name}
                            </h2>
                          </div>

                          <div 
                            className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded"
                            style={{ 
                              backgroundColor: priceBg,
                              color: priceText
                            }}
                          >
                            {magazine.price}
                          </div>

                          <div className="flex justify-between items-start">
                            <div 
                              className="text-xs font-bold px-3 py-1 rounded"
                              style={{ 
                                backgroundColor: dateBg,
                                color: dateText
                              }}
                            >
                              {magazine.date}
                            </div>
                          </div>
                        </div>

                        {magazine.subtitle && (
                          <div 
                            className={`absolute ${ind === 1 ? "top-1/4" : "top-1/3"} left-0 right-0 px-6 py-3 transform -skew-y-3`}
                            style={{ backgroundColor: subtitleBg }}
                          >
                            <p 
                              className="text-sm font-bold uppercase tracking-widest text-center"
                              style={{ color: subtitleText }}
                            >
                              {magazine.subtitle}
                            </p>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black via-black/90 to-transparent">
                          <div className="space-y-3">
                            <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white drop-shadow-2xl tracking-tight">
                              {magazine.title}
                            </h3>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                                 {t("publicMedia.authorLabel")}
                                </p>
                                <p className="text-sm font-semibold text-white">
                                  {magazine.author}
                                </p>
                              </div>
                              
                              <div className="bg-white px-2 py-1 rounded">
                                <svg className="w-16 h-8" viewBox="0 0 100 40">
                                  <rect x="2" y="5" width="2" height="30" fill="black"/>
                                  <rect x="6" y="5" width="1" height="30" fill="black"/>
                                  <rect x="9" y="5" width="3" height="30" fill="black"/>
                                  <rect x="14" y="5" width="1" height="30" fill="black"/>
                                  <rect x="17" y="5" width="2" height="30" fill="black"/>
                                  <rect x="21" y="5" width="1" height="30" fill="black"/>
                                  <rect x="24" y="5" width="3" height="30" fill="black"/>
                                  <rect x="29" y="5" width="2" height="30" fill="black"/>
                                  <rect x="33" y="5" width="1" height="30" fill="black"/>
                                  <rect x="36" y="5" width="2" height="30" fill="black"/>
                                  <rect x="40" y="5" width="3" height="30" fill="black"/>
                                  <rect x="45" y="5" width="1" height="30" fill="black"/>
                                  <rect x="48" y="5" width="2" height="30" fill="black"/>
                                  <rect x="52" y="5" width="1" height="30" fill="black"/>
                                  <rect x="55" y="5" width="3" height="30" fill="black"/>
                                  <rect x="60" y="5" width="2" height="30" fill="black"/>
                                  <rect x="64" y="5" width="1" height="30" fill="black"/>
                                  <rect x="67" y="5" width="2" height="30" fill="black"/>
                                  <rect x="71" y="5" width="3" height="30" fill="black"/>
                                  <rect x="76" y="5" width="1" height="30" fill="black"/>
                                  <rect x="79" y="5" width="2" height="30" fill="black"/>
                                  <rect x="83" y="5" width="1" height="30" fill="black"/>
                                  <rect x="86" y="5" width="3" height="30" fill="black"/>
                                  <rect x="91" y="5" width="2" height="30" fill="black"/>
                                  <rect x="95" y="5" width="1" height="30" fill="black"/>
                                </svg>
                                <p className="text-[6px] text-center text-black mt-0.5 font-mono">
                                  {magazine.barcode}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute inset-0 border-[6px] border-white/5 pointer-events-none"></div>
                        <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
                      </div>

                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-linear-to-r from-black/40 to-transparent"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-linear-to-l from-black/20 to-transparent"></div>
                      
                      <div className="absolute inset-0 backface-hidden rotateY-180" style={{ backgroundColor: '#f5f5f5' }}>
                        <div className="h-full p-8 flex items-center justify-center">
                          <p className="text-gray-400 text-sm italic">Inside Cover</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`absolute top-0 right-0 w-full transition-all duration-1000 ${
                    openMagazine === magazine.id 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-5 pointer-events-none'
                  }`}>
                    <div 
                      className="h-150 rounded-sm p-8 flex flex-col justify-between shadow-2xl"
                      style={{ backgroundColor: backBg }}
                    >
                      <div>
                        <div className="mb-6">
                          <h2
                            className="h-10 w-auto object-contain mb-4"
                            style={{ filter: backNameFilter }}
                          >
                            {magazine.name}
                          </h2>
                        </div>
   
                        <h3 
                          className="text-2xl font-bold mb-3 leading-tight"
                          style={{ color: backTitleText }}
                        >
                          {magazine.title}
                        </h3>

                        <p 
                          className="text-sm mb-2 font-semibold"
                          style={{ color: backAuthorText === '#000000'
                            ? getSafeBackground(magazine.accentColor, magazine.color)
                            : magazine.accentColor 
                          }}
                        >
                          {magazine.author}
                        </p>

                        <p 
                          className="text-sm leading-relaxed mb-6 opacity-90"
                          style={{ color: backExcerptText }}
                        >
                          {magazine.excerpt}
                        </p>
                      </div>
                      
        
                      <a
                        href={magazine.link}
                        target='blank'
                        className="inline-block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: btnBg,
                          color: btnText
                        }}
                      >
                       {t("publicMedia.readMore")} 
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .perspective-\[2000px\] {
          perspective: 2000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .rotateY-0 {
          transform: rotateY(0deg);
        }
        
        .rotateY-\[-160deg\] {
          transform: rotateY(-160deg);
        }
        
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        
        .origin-right {
          transform-origin: right center;
        }
      `}</style>
    </div>
  );
};

export default PublicMedia;