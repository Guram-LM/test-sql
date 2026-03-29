import { useTranslation } from "react-i18next";
import nutsa from "../../../assets/nuca.jpg";

const DesktopHeader = () => {
  const {t}=useTranslation()
  return (
        <div className="relative w-full py-24 md:py-28 overflow-hidden bg-black">

      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.02) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255,255,255,0.02) 3px
          )`
        }}
      />
     
      <div className="hidden md:block">
 
        <div className="absolute left-8 top-8 w-52 h-72 transform -rotate-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-10">
          <div className="relative w-full h-full bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-sm">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,69,19,0.03) 2px, rgba(139,69,19,0.03) 4px)`
            }}></div>

            <div className="absolute top-0 left-0 right-0 h-3 bg-linear-to-b from-amber-900 via-amber-800 to-amber-700 border-b border-amber-950/50"></div>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-linear-to-t from-amber-900 via-amber-800 to-amber-700 border-t border-amber-950/50"></div>
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-linear-to-r from-amber-900 via-amber-800 to-amber-700 border-r border-amber-950/50"></div>
            <div className="absolute top-0 right-0 bottom-0 w-3 bg-linear-to-l from-amber-900 via-amber-800 to-amber-700 border-l border-amber-950/50"></div>

            <div className="absolute top-8 left-0 right-0 py-3 bg-linear-to-r from-amber-800/40 via-amber-700/60 to-amber-800/40 border-y border-amber-900/30">
              <p className="text-center text-amber-900 font-serif font-bold text-sm tracking-[0.3em] uppercase">Journal</p>
            </div>

            <div className="absolute top-24 left-6 right-6 h-36">
              <div className="absolute -inset-1 bg-black/20 blur-sm"></div>
              <div className="relative w-full h-full bg-white p-2 shadow-lg">
                <div className="w-full h-full overflow-hidden border border-gray-300">
                  <img src={nutsa} alt="journal1" className="w-full h-full object-cover sepia-[0.15] contrast-[0.95]" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 left-8 right-8 space-y-3">
              <div className="relative">
                <div className="h-px bg-gray-400/30"></div>
                <div className="absolute left-2 -top-2 text-xs text-gray-600/60 font-handwriting italic">memories...</div>
              </div>
              <div className="h-px bg-gray-400/30"></div>
              <div className="h-px bg-gray-400/30"></div>
              <div className="h-px bg-gray-400/30"></div>
            </div>

            <div className="absolute right-0 top-3 bottom-3 w-1.5 bg-linear-to-r from-amber-900/40 via-amber-800/20 to-transparent"></div>
            <div className="absolute top-16 right-8 w-8 h-8 rounded-full bg-amber-900/10 blur-md"></div>
            <div className="absolute bottom-20 left-10 w-12 h-12 rounded-full bg-amber-800/8 blur-lg"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-900/20 rounded-tr-sm"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-900/20 rounded-bl-sm"></div>
          </div>
        </div>

        <div className="absolute left-24 top-12 w-52 h-72 transform rotate-1 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-20">
          <div className="relative w-full h-full bg-linear-to-br from-yellow-50 via-amber-50 to-yellow-100 rounded-sm">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,69,19,0.03) 2px, rgba(139,69,19,0.03) 4px)`
            }}></div>
            
            <div className="absolute top-0 left-0 right-0 h-3 bg-linear-to-b from-yellow-900 via-yellow-800 to-yellow-700 border-b border-yellow-950/50"></div>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-linear-to-t from-yellow-900 via-yellow-800 to-yellow-700 border-t border-yellow-950/50"></div>
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-linear-to-r from-yellow-900 via-yellow-800 to-yellow-700 border-r border-yellow-950/50"></div>
            <div className="absolute top-0 right-0 bottom-0 w-3 bg-linear-to-l from-yellow-900 via-yellow-800 to-yellow-700 border-l border-yellow-950/50"></div>

            <div className="absolute top-8 left-0 right-0 py-3 bg-linear-to-r from-yellow-800/40 via-yellow-700/60 to-yellow-800/40 border-y border-yellow-900/30">
              <p className="text-center text-yellow-900 font-serif font-bold text-sm tracking-[0.3em] uppercase">Memories</p>
            </div>

            <div className="absolute top-24 left-6 right-6 h-36">
              <div className="absolute -inset-1 bg-black/20 blur-sm"></div>
              <div className="relative w-full h-full bg-white p-2 shadow-lg">
                <div className="w-full h-full overflow-hidden border border-gray-300">
                  <img src={nutsa} alt="journal2" className="w-full h-full object-cover sepia-[0.15] contrast-[0.95]" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 left-8 right-8 space-y-3">
              <div className="relative">
                <div className="h-px bg-gray-400/30"></div>
                <div className="absolute left-2 -top-2 text-xs text-gray-600/60 font-handwriting italic">stories...</div>
              </div>
              <div className="h-px bg-gray-400/30"></div>
              <div className="h-px bg-gray-400/30"></div>
              <div className="h-px bg-gray-400/30"></div>
            </div>

            <div className="absolute right-0 top-3 bottom-3 w-1.5 bg-linear-to-r from-yellow-900/40 via-yellow-800/20 to-transparent"></div>
            <div className="absolute top-20 right-10 w-10 h-10 rounded-full bg-yellow-900/10 blur-md"></div>
            <div className="absolute bottom-24 left-8 w-14 h-14 rounded-full bg-yellow-800/8 blur-lg"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-yellow-900/20 rounded-tr-sm"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-yellow-900/20 rounded-bl-sm"></div>
          </div>
        </div>


        <div className="absolute right-8 top-16 w-60 h-36 transform -rotate-1 shadow-2xl z-10">
          <div className="relative w-full h-full overflow-hidden rounded-lg border-4 border-amber-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img src={nutsa} alt="video1" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
            
            <div className="absolute left-1 top-0 bottom-0 w-2 flex flex-col justify-around py-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`perf-l1-${i}`} className="w-1.5 h-1.5 bg-black/60 rounded-full" />
              ))}
            </div>
            <div className="absolute right-1 top-0 bottom-0 w-2 flex flex-col justify-around py-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`perf-r1-${i}`} className="w-1.5 h-1.5 bg-black/60 rounded-full" />
              ))}
            </div>

            <div className="absolute bottom-2 left-2 px-2 py-1 bg-amber-600/90 text-xs font-bold text-white rounded shadow-md backdrop-blur-sm">
              ● REC
            </div>
          </div>
        </div>

        <div className="absolute right-24 top-20 w-60 h-36 transform rotate-1 shadow-2xl z-20">
          <div className="relative w-full h-full overflow-hidden rounded-lg border-4 border-yellow-700/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img src={nutsa} alt="video2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
            
            <div className="absolute left-1 top-0 bottom-0 w-2 flex flex-col justify-around py-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`perf-l2-${i}`} className="w-1.5 h-1.5 bg-black/60 rounded-full" />
              ))}
            </div>
            <div className="absolute right-1 top-0 bottom-0 w-2 flex flex-col justify-around py-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`perf-r2-${i}`} className="w-1.5 h-1.5 bg-black/60 rounded-full" />
              ))}
            </div>

            <div className="absolute bottom-2 left-2 px-2 py-1 bg-yellow-600/90 text-xs font-bold text-white rounded shadow-md backdrop-blur-sm">
              ● REC
            </div>
          </div>
        </div>
      </div>

     
      

      <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 bg-linear-to-t from-black to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center z-30 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] mb-3">
          {t("desktopHeader.title")}
        </h1>
        <p className="text-sm md:text-lg text-yellow-200/90 tracking-wide uppercase mb-6">
         {t("desktopHeader.subtitle")}
        </p>
      </div>

      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center gap-2 md:gap-4 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`top-${i}`} className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-sm shadow-inner" />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center gap-2 md:gap-4 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`bottom-${i}`} className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-sm shadow-inner" />
        ))}
      </div>
    </div>
  )
}

export default DesktopHeader