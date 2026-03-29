import { useTranslation } from "react-i18next";
import nutsa from "../../../assets/nuca.jpg";

const MobileHeader = () => {
  const {t} = useTranslation()
  return (

<div className="relative w-full py-5 overflow-hidden bg-black">

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
    <div className="relative max-w-3xl mx-auto text-center z-30 px-4">
        <p className="text-sm  text-yellow-200/90 tracking-wide uppercase ">
          {t("desktopHeader.title")} {""} {t("desktopHeader.subtitle")}
        </p>
    </div>

    <div className=" flex flex-col items-center gap-6 px-4 ">
        <div className="relative w-full max-w-sm h-96">

          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-44 h-60 transform rotate-1 shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-20">
       
            <div className="relative w-full h-full bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">

              <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, rgba(120,60,20,0.05) 1px, transparent 2px),
                                 repeating-linear-gradient(90deg, transparent 0px, rgba(120,60,20,0.05) 1px, transparent 2px)`,
                backgroundSize: '4px 4px'
              }}></div>


              <div className="absolute left-0 top-0 bottom-0 w-3 bg-linear-to-r from-amber-900/40 via-amber-800/20 to-transparent"></div>
              

              <div className="absolute inset-3 border-2 border-amber-900/20 rounded-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"></div>


              <div className="absolute top-8 left-0 right-0 px-4">
                <div className="py-2 border-t-2 border-b-2 border-amber-800/30">
                  <p className="text-center text-amber-900 font-serif font-bold text-[10px] tracking-[0.25em] uppercase shadow-sm">
                    Journal
                  </p>
                </div>
              </div>


              <div className="absolute top-16 left-3 right-3 h-24">
                <div className="absolute -inset-0.5 bg-amber-900/20 rounded-sm"></div>
                <div className="relative w-full h-full bg-white p-1 shadow-lg rounded-sm">
                  <div className="w-full h-full overflow-hidden border border-amber-900/20">
                    <img src={nutsa} alt="journal1" className="w-full h-full object-cover sepia-[0.2] contrast-[0.9]" />
                  </div>

                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-900/30"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-900/30"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-900/30"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-900/30"></div>
                </div>
              </div>


              <div className="absolute bottom-8 left-5 right-5 space-y-1.5">
                <div className="h-px bg-amber-900/20"></div>
                <div className="h-px bg-amber-900/20"></div>
                <div className="h-px bg-amber-900/20"></div>
              </div>


              <div className="absolute top-12 right-4 w-4 h-4 rounded-full bg-amber-900/10 blur-sm"></div>
              <div className="absolute bottom-14 left-5 w-5 h-5 rounded-full bg-yellow-900/8 blur-md"></div>

              <div className="absolute top-0 right-0 w-6 h-6 bg-linear-to-bl from-amber-900/10 to-transparent rounded-tr-sm"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 bg-linear-to-tr from-amber-900/10 to-transparent rounded-bl-sm"></div>
            </div>
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-full z-10">

            <div className="absolute top-4 left-8 w-64 h-16 transform -rotate-12 shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
              <div className="relative w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-sm border border-gray-700">
                <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay"></div>
                
                <div className="absolute top-0 left-0 right-0 h-2 flex justify-around items-center px-2 bg-black/60">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`top-curve-holes-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-around items-center px-2 bg-black/60">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`top-curve-holes-bottom-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute top-2 bottom-2 left-2 right-2 flex gap-0.5">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={`top-curve-frame-${idx}`} className="flex-1 relative bg-black border-x border-gray-700/50 overflow-hidden">
                      <img src={nutsa} alt={`frame${idx}`} className="w-full h-full object-cover opacity-70 grayscale-[0.3] contrast-[1.1]" style={{transform: `scale(${1 + idx * 0.05})`}} />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30"></div>
                    </div>
                  ))}
                </div>

                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-red-600 text-[7px] font-bold text-white rounded">● REC</div>
              </div>
            </div>

            <div className="absolute top-20 right-0 w-16 h-52 transform rotate-6 shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
              <div className="relative w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-sm border border-gray-700">
                <div className="absolute inset-0 bg-amber-900/20 mix-blend-overlay"></div>
                
                <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-around items-center py-2 bg-black/60">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`right-curve-holes-left-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-around items-center py-2 bg-black/60">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`right-curve-holes-right-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute left-2 right-2 top-2 bottom-2 flex flex-col gap-0.5">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={`right-curve-frame-${idx}`} className="flex-1 relative bg-black border-y border-gray-700/50 overflow-hidden">
                      <img src={nutsa} alt={`frame${idx + 4}`} className="w-full h-full object-cover opacity-70 grayscale-[0.3] contrast-[1.1]" style={{transform: `scale(${1.1 - idx * 0.05})`}} />
                      <div className="absolute inset-0 bg-linear-to-l from-transparent to-black/30"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

         
            <div className="absolute bottom-8 left-10 w-64 h-16 transform rotate-8 shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
              <div className="relative w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-sm border border-gray-700">
                <div className="absolute inset-0 bg-yellow-900/20 mix-blend-overlay"></div>
                
                <div className="absolute top-0 left-0 right-0 h-2 flex justify-around items-center px-2 bg-black/60">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`bottom-curve-holes-top-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-around items-center px-2 bg-black/60">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={`bottom-curve-holes-bottom-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute top-2 bottom-2 left-2 right-2 flex gap-0.5">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={`bottom-curve-frame-${idx}`} className="flex-1 relative bg-black border-x border-gray-700/50 overflow-hidden">
                      <img src={nutsa} alt={`frame${idx + 8}`} className="w-full h-full object-cover opacity-70 grayscale-[0.3] contrast-[1.1]" style={{transform: `scale(${1 + idx * 0.03})`}} />
                      <div className="absolute inset-0 bg-linear-to-t from-transparent to-black/30"></div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-amber-600 text-[7px] font-bold text-white rounded">● REC</div>
              </div>
            </div>


            <div className="absolute top-24 left-2 w-16 h-48 transform -rotate-8 shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
              <div className="relative w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-sm border border-gray-700">
                <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay"></div>
                
                <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-around items-center py-2 bg-black/60">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={`left-curve-holes-left-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-around items-center py-2 bg-black/60">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={`left-curve-holes-right-${i}`} className="w-1.5 h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                  ))}
                </div>

                <div className="absolute left-2 right-2 top-2 bottom-2 flex flex-col gap-0.5">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={`left-curve-frame-${idx}`} className="flex-1 relative bg-black border-y border-gray-700/50 overflow-hidden">
                      <img src={nutsa} alt={`frame${idx + 12}`} className="w-full h-full object-cover opacity-70 grayscale-[0.3] contrast-[1.1]" style={{transform: `scale(${1.05 + idx * 0.02})`}} />
                      <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/30"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-white/30 rotate-3"></div>
              <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20 -rotate-2"></div>
            </div>
          </div>
        </div>
      </div>

   <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 bg-linear-to-t from-black to-transparent pointer-events-none" />






      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center gap-2 md:gap-4 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`bottom-${i}`} className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-sm shadow-inner" />
        ))}
      </div>
    </div>
  )
}

export default MobileHeader