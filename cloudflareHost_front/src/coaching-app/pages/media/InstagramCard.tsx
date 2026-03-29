import PaperNote from "./PaperNote";

interface InstagramItem {
  id: number;
  title: string;
  link: string;
  image: string;
}

interface InstagramCardProps {
  instagram: InstagramItem[];
}



const InstagramCard = ({ instagram }: InstagramCardProps) => {

  return (
    <>
    {instagram.map(item => (
      <div
        key={item.id}
        className="relative group mb-35"
      >
        
          <div className="relative w-full max-w-xs mx-auto">
            
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-linear-to-b from-yellow-600/40 to-yellow-600/80 rounded-full"></div>
            
            
            <div className="relative w-20 h-20 md:w-30 md:h-30 mx-auto mt-8">
              <div className="relative w-full h-full bg-linear-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-[0_15px_40px_rgba(193,53,132,0.5)] group-hover:shadow-[0_20px_50px_rgba(193,53,132,0.7)] transition-all duration-700 flex items-center justify-center border-4 border-pink-400/40 group-hover:scale-105">
                
                <svg className="w-10 h-10 md:w-15 md:h-15 text-white drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                
                <div className="absolute inset-2 bg-linear-to-br from-purple-300/20 to-transparent rounded-full"></div>
                <div className="absolute inset-0 bg-linear-to-tr from-purple-300/0 via-pink-200/10 to-orange-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>

            <div className="absolute top-22 md:top-33 left-1/2 -translate-x-1/2 w-0.5 h-6.5 md:h-10 bg-linear-to-b from-yellow-600/80 to-yellow-600/40 rounded-full"></div>
            <a 
              href={item.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >


            <div className="relative mt-10 md:mt-15 animate-sway-slow">
              
  

            
              <div className="relative w-55 md:w-60 h-16  mx-auto shadow-[0_10px_20px_rgba(0,0,0,0.6)] animate-swing-gentle-reverse" style={{animationDelay: '1.6s'}}>
                <div className="relative w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-sm border border-gray-700">
                  <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay"></div>
                  
                  <div className="absolute top-0 left-0 right-0 h-1.5 md:h-2 flex justify-around items-center px-1.5 md:px-2 bg-black/60">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`ig-bot-top-${i}`} className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1.5 md:h-2 flex justify-around items-center px-1.5 md:px-2 bg-black/60">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`ig-bot-bottom-${i}`} className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-950 rounded-sm border border-gray-800" />
                    ))}
                  </div>

                  <div className="absolute top-1.5 md:top-2 bottom-1.5 md:bottom-2 left-1.5 md:left-2 right-1.5 md:right-2 flex gap-0.5">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div key={`ig-bot-frame-${idx}`} className="flex-1 relative bg-black border-x border-gray-700/50 overflow-hidden">
                        <img src={item.image} alt={`frame${idx + 3}`} className="w-full h-full object-cover opacity-70 grayscale-[0.3] contrast-[1.1]" />
                        <div className="absolute inset-0 bg-linear-to-bl from-transparent to-black/30"></div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-0.5 md:bottom-1 left-0.5 md:left-1 px-1 md:px-1.5 py-0.5 bg-linear-to-r from-pink-600 to-orange-600 text-[6px] md:text-[7px] font-bold text-white rounded">● REC</div>
                </div>

                <PaperNote title={item.title}/>



              </div>

            </div>

            </a>
          </div>
        
      </div>
    ))}
    
    </>
    
  )
}

export default InstagramCard
