
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useVideos } from "../../components/hook/useVideos";
import { useInView } from "../../components/hook/useInView";
import type { Video } from "../../components/interface/Interface";
import SectionLoader from "./SectionLoader";
import SectionEmpty from "./SectionEmpty";


const VideoMedia = () => {
  const {t, i18n } = useTranslation();
  const lang = i18n.language;

  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [tvOn, setTvOn] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(0);

  const {ref, isVisible} = useInView()
  const {data, isLoading, isError } = useVideos(isVisible)

  const videos = data || []


  const handleVideoClick = (video:Video, index:number) => {
    setActiveVideo(video);
    setCurrentChannel(index);
    setTvOn(false);
    setTimeout(() => setTvOn(true), 100);
  };

  const togglePower = () => {
    if (tvOn) {
      setTvOn(false);
      setTimeout(() => setActiveVideo(null), 500);
    }
  };

  const changeChannel = (direction:number) => {
    if (!tvOn) return;
    const newIndex = (currentChannel + direction + videos.length) % videos.length;
    setCurrentChannel(newIndex);
    setActiveVideo(videos[newIndex]);
    setTvOn(false);
    setTimeout(() => setTvOn(true), 100);
  };

  const getThumbnail = (video: Video) => {
    if (video.image_url) return video.image_url;
  };


  return (
    <div 
      ref={ref}
      className="flex justify-center items-start text-black py-10 md:pb-20"
    >
      <div className="max-w-6xl w-full text-center px-4">

        
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-20 bg-linear-to-r from-transparent via-yellow-900 to-transparent" />
              <svg className="w-12 h-12 text-yellow-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
              </svg>
              <div className="h-px w-20 bg-linear-to-r from-transparent via-yellow-900 to-transparent" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="bg-clip-text  text-yellow-900">
             {t("videoMedia.sectionTitle")}
            </span>
          </h1>
          
          <p className="text-yellow-900 text-xl tracking-[0.3em] uppercase font-light">
            {t("videoMedia.sectionSubtitle")}
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-1 bg-yellow-900 rounded-full transition-all duration-700"
                style={{
                  width: i === 0 ? "30px" : "30px",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {isLoading && <SectionLoader />}

        {isError && <SectionEmpty  />}

        {!isLoading && !isError && videos.length === 0 && (
          <SectionEmpty  />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          

          {videos.map((v, index) => (
            <div
              key={v.id}
              onClick={() => handleVideoClick(v, index)}
              className="relative cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ height: '220px' }}
            >
  
              <div className="absolute right-0 top-0 z-20">
                <div className="relative">

                  <div className="w-32 h-32 rounded-full bg-linear-to-br from-zinc-400 via-zinc-500 to-zinc-600 shadow-2xl flex items-center justify-center relative">
                    
                    <div className="absolute inset-0 rounded-full" style={{
                      background: 'repeating-conic-gradient(from 0deg, transparent 0deg 20deg, rgba(0,0,0,0.2) 20deg 40deg)'
                    }}></div>
                    

                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-700 shadow-inner relative z-10">
                      <img 
                        src={getThumbnail(v)} 
                        alt={lang === "ka" ? v.title_ka : v.title_en}
                        className="w-full h-full object-cover"
                      />


                      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-black/30"></div>
                    </div>

                    <div className="absolute w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-900 shadow-lg z-20"></div>
                    

                    <div className="absolute w-2.5 h-2.5 rounded-full bg-zinc-950 z-30"></div>
                  </div>
                </div>
              </div>


              <div className="absolute bottom-0 left-0 right-24 h-20">



            <div className=" bottom-0 left-0 right-8 h-16 bg-linear-to-r from-zinc-700 via-zinc-600 to-zinc-700 shadow-xl relative overflow-hidden">

 
            <div className="absolute inset-2 flex gap-2 z-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-black rounded-sm overflow-hidden border border-zinc-900"
                >
                  <img
                    src={getThumbnail(v)}
                    alt={lang === "ka" ? v.title_ka : v.title_en}
                    className="w-full h-full object-cover"
                  />

                </div>
              ))}
            </div>


            <div className="absolute left-0 right-0 top-1 flex justify-evenly px-2 z-10">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-zinc-900 rounded-sm" />
              ))}
            </div>


            <div className="absolute left-0 right-0 bottom-1 flex justify-evenly px-2 z-10">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-zinc-900 rounded-sm" />
              ))}
            </div>

        </div>






                <div className="absolute right-0 bottom-0 w-24 h-32 origin-bottom-left" 
                     style={{ transform: 'rotate(-35deg) translateX(8px)' }}>
                  <div className="w-full h-full bg-linear-to-t from-zinc-700 via-zinc-600 to-zinc-500 shadow-2xl relative rounded-t-lg">

                    <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-evenly">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-zinc-900 rounded-sm"></div>
                      ))}
                    </div>
                    

                    <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-evenly">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-zinc-900 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>


              <div className="absolute right-8 top-36 w-56 z-10">
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg p-3 border border-zinc-700 shadow-xl">
                  <h2 className="text-amber-200 font-bold text-sm mb-1.5">{lang === "ka" ? v.title_ka : v.title_en}</h2>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {lang === "ka" ? v.description_ka : v.description_en}
                  </p>
                </div>
              </div>


              <div className="absolute right-16 top-28 w-1 h-12 bg-linear-to-b from-zinc-600 to-zinc-700 z-5"></div>

            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              togglePower();
            }
          }}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-0.5 h-12 bg-linear-to-t from-zinc-600 to-zinc-400 rounded-full shadow-lg origin-bottom" 
                   style={{transform: 'rotate(-25deg)'}} />
              <div className="w-0.5 h-12 bg-linear-to-t from-zinc-600 to-zinc-400 rounded-full shadow-lg origin-bottom"
                   style={{transform: 'rotate(25deg)'}} />
            </div>

      
            <div className="relative w-162.5 max-w-[90vw] bg-linear-to-b from-[#8B7355] via-[#6B5444] to-[#4A3728] rounded-3xl p-6 shadow-2xl">
              
          
              <div className="absolute inset-0 rounded-3xl opacity-30 mix-blend-overlay pointer-events-none" 
                   style={{
                     backgroundImage: `repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 2px, #000 3px),
                                      repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 2px, #000 3px)`
                   }} />
      
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              
          
              <div className="flex justify-center items-start mb-3">
                <div className="text-amber-200/80 font-serif text-lg tracking-widest">SONY</div>
              </div>

           
              <div className="relative bg-black p-5 rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
                
             
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none z-10" />
                
     
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
                  
 
                  {!tvOn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-30">
                      <div className="w-1 h-full bg-white animate-pulse" style={{
                        animation: 'expand 0.3s ease-out forwards',
                      }} />
                    </div>
                  )}
                  
                  {activeVideo?.youtube_embed && tvOn && (
                   <iframe
                    src={`${activeVideo.youtube_embed}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`}
                    title={lang === "ka" ? activeVideo.title_ka : activeVideo.title_en}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full rounded-xl border-0"
                  />
                  )}


      
                  <div className="pointer-events-none absolute inset-0 z-20" 
                       style={{
                         backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.15) 3px)',
                       }} />
                       <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent z-20" />
                  
      
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] rounded-xl z-20" />
                  
       
                  <div className="pointer-events-none absolute inset-0 z-20"
                       style={{
                         background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)'
                       }} />
                </div>
              </div>

       
              <div className="mt-5 flex justify-center items-center gap-6">
                
        
                <button 
                  onClick={togglePower}
                  className="flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition"
                >
                  <div className={`w-5 h-5 rounded-full shadow-lg transition-all ${
                    tvOn ? 'bg-red-500 shadow-red-500/50' : 'bg-red-900 shadow-red-900/30'
                  }`} />
                  <span className="text-[9px] text-amber-200/60 mt-0.5">POWER</span>
                </button>
                
            
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => changeChannel(-1)}
                    disabled={!tvOn}
                    className={`w-12 h-12 rounded-full bg-linear-to-br from-amber-800 to-amber-950 shadow-lg border-2 border-amber-900 flex items-center justify-center transition ${
                      tvOn ? 'hover:scale-110 cursor-pointer active:scale-95' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-white text-xl font-bold">◄</div>
                  </button>
                  
                  <div className="flex flex-col items-center px-3">
                    <span className="text-[9px] text-amber-200/60">CHANNEL</span>
                    <div className="text-amber-200 text-sm font-mono mt-0.5">{currentChannel + 1}/{videos.length}</div>
                  </div>
                  
                  <button 
                    onClick={() => changeChannel(1)}
                    disabled={!tvOn}
                    className={`w-12 h-12 rounded-full bg-linear-to-br from-amber-800 to-amber-950 shadow-lg border-2 border-amber-900 flex items-center justify-center transition ${
                      tvOn ? 'hover:scale-110 cursor-pointer active:scale-95' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-white text-xl font-bold">►</div>
                  </button>
                </div>
              </div>

              <div className="mt-3 mx-auto w-24 h-6 bg-linear-to-b from-zinc-900 to-black rounded-lg"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #333 1px, #000 2px)',
                   }} />
            </div>

        
            <div className="absolute -bottom-2 left-1/4 w-12 h-4 bg-linear-to-b from-[#4A3728] to-[#2A1F18] rounded-b-lg shadow-xl" />
            <div className="absolute -bottom-2 right-1/4 w-12 h-4 bg-linear-to-b from-[#4A3728] to-[#2A1F18] rounded-b-lg shadow-xl" />
          </div>

          <style>{`
            @keyframes expand {
              0% { width: 2px; }
              50% { width: 100%; height: 100%; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}


export default VideoMedia