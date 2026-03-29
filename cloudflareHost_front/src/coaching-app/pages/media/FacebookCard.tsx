import type React from "react";
import PaperNote from "./PaperNote";

interface FacebookItem {
  id: number;
  title: string;
  link: string;
  image: string;
}

interface FacebookCardProps {
  facebook: FacebookItem[];
}

const FacebookCard: React.FC<FacebookCardProps> = ({ facebook }) => {
  

  return (
    <>
      {
        facebook.map(item => (
          <div
          key={item.id}
          className="relative group mb-30 "
         >
          
          <div className="relative w-full max-w-xs mx-auto">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-linear-to-b from-yellow-600/40 to-yellow-600/80 rounded-full"></div>
            
          
            <div className="relative w-20 h-20 md:w-30 md:h-30 mx-auto mt-8">
              <div className="relative w-full h-full bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-[0_15px_40px_rgba(59,89,152,0.5)] group-hover:shadow-[0_20px_50px_rgba(59,89,152,0.7)] transition-all duration-700 flex items-center justify-center border-4 border-blue-400/40 group-hover:scale-105">
            
                <svg className="w-10 h-10 md:w-15 md:h-15 text-white drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                
                <div className="absolute inset-2 bg-linear-to-br from-blue-300/20 to-transparent rounded-full"></div>
                <div className="absolute inset-0 bg-linear-to-tr from-blue-300/0 via-blue-200/10 to-blue-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
            <div className="absolute top-22 md:top-33 left-1/2 -translate-x-1/2 w-0.5 h-6.5 md:h-10 bg-linear-to-b from-yellow-600/80 to-yellow-600/40 rounded-full"></div>
            <a 
              href={item.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              
              <div className="relative mt-10 md:mt-15 animate-sway-slow group-hover:animate-none">
                <div className="relative w-55 md:w-60 h-16 mx-auto shadow-[0_10px_20px_rgba(0,0,0,0.6)] animate-swing-gentle-reverse group-hover:animate-none" style={{animationDelay: '1.3s'}}>
                  <div className="relative w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-sm border border-gray-700">
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                    
                    <div className="absolute top-0 left-0 right-0 h-1.5 md:h-2 flex justify-around items-center px-1.5 md:px-2 bg-black/60">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={`fb-bot-top-${i}`} className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1.5 md:h-2 flex justify-around items-center px-1.5 md:px-2 bg-black/60">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={`fb-bot-bottom-${i}`} className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                      ))}
                    </div>

                    <div className="absolute top-1.5 md:top-2 bottom-1.5 md:bottom-2 left-1.5 md:left-2 right-1.5 md:right-2 flex gap-0.5">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={`fb-bot-frame-${idx}`} className="flex-1 relative bg-black border-x border-gray-700/50 overflow-hidden">
                          <img src={item.image} alt={`frame${idx + 3}`} className="w-full h-full object-cover opacity-70 grayscale-[0.3] contrast-[1.1]" />
                          <div className="absolute inset-0 bg-linear-to-t from-transparent to-black/30"></div>
                        </div>
                      ))}
                    </div>

                    <div className="absolute top-0.5 md:top-1 right-0.5 md:right-1 px-1 md:px-1.5 py-0.5 bg-red-600 text-[6px] md:text-[7px] font-bold text-white rounded">● REC</div>
                  </div>

                  <PaperNote title={item.title}/>

                </div>
              </div>

            </a>

            
      
          </div>
         
          </div>
        ))
      }

    </>
    
  )
}

export default FacebookCard 