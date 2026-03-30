import { useState, useEffect } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6;
  const hours = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

  return (
    <div className="flex items-center justify-center rounded-2xl ">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 blur-3xl opacity-40 animate-pulse"></div>
        
        <div className="relative w-90 h-90 rounded-full bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 shadow-2xl flex items-center justify-center border-8 border-white/10">
          
          <div className="absolute w-full h-full rounded-full border-4 border-white/5"></div>
          <div className="absolute w-[95%] h-[95%] rounded-full border-2 border-white/10"></div>
          
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm"></div>

          {[...Array(12)].map((_, i) => (
            <div key={`hour-${i}`} className="absolute" style={{ transform: `rotate(${i * 30}deg)` }}>
              <div 
                className={`w-1.5 ${i % 3 === 0 ? 'h-6' : 'h-4'} ${i % 3 === 0 ? 'bg-white' : 'bg-white/70'} rounded-full shadow-lg`}
                style={{
                  transform: 'translateY(-138px)',
                }}
              />
            </div>
          ))}

          {[...Array(60)].map((_, i) => {
            if (i % 5 !== 0) {
              return (
                <div key={`min-${i}`} className="absolute" style={{ transform: `rotate(${i * 6}deg)` }}>
                  <div 
                    className="w-0.5 h-2 bg-white/40 rounded-full"
                    style={{
                      transform: 'translateY(-136px)',
                    }}
                  />
                </div>
              );
            }
            return null;
          })}

          {[12, 3, 6, 9].map((num) => {
            const angle = (num === 12 ? 0 : num * 30) - 90;
            const radius = 110;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            return (
              <div
                key={num}
                className="absolute text-white font-bold text-2xl"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                {num}
              </div>
            );
          })}

          <div
            className="absolute bottom-1/2 left-1/2 w-3 h-24 -ml-1.5 bg-gradient-to-t from-white to-white/90 rounded-full origin-bottom shadow-2xl"
            style={{
              transform: `translateX(-50%) rotate(${hours}deg)`,
              transition: "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          >
            <div className="absolute inset-0 bg-white/40 blur-sm rounded-full"></div>
          </div>

          <div
            className="absolute bottom-1/2 left-1/2 w-2.5 h-32 -ml-1.25 bg-gradient-to-t from-white to-white/95 rounded-full origin-bottom shadow-2xl"
            style={{
              transform: `translateX(-50%) rotate(${minutes}deg)`,
              transition: "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          >
            <div className="absolute inset-0 bg-white/40 blur-sm rounded-full"></div>
          </div>

          <div
            className="absolute bottom-1/2 left-1/2 w-1 h-36 -ml-0.5 origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${seconds}deg)`,
              transition: "transform 0.05s linear",
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-rose-500 via-pink-400 to-red-400 rounded-full shadow-2xl">
              <div className="absolute inset-0 bg-red-300/60 blur-md rounded-full"></div>
            </div>

            <div className="absolute -bottom-4 left-1/2 -ml-2 w-4 h-4 bg-rose-500 rounded-full shadow-lg"></div>
          </div>

          <div className="absolute w-8 h-8 bg-gradient-to-br from-white to-gray-200 rounded-full shadow-2xl z-20 flex items-center justify-center">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full"></div>
          </div>


          <div className="absolute w-60 h-60 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute w-48 h-48 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: '2s' }}></div>
        </div>

        <div className="absolute inset-0 top-4 rounded-full bg-black/40 blur-2xl -z-10"></div>
      </div>
    </div>
  );
};

export default AnalogClock;