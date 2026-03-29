const PaidLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="border border-[#2E2820] bg-[#0D0C0A] overflow-hidden rounded-sm"
        style={{ animation: `fade-in-dark 0.4s ease both`, animationDelay: `${i * 0.07}s` }}
      >
        <div
          className="h-48"
          style={{
            animation: `shimmer-gold 1.6s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
            background: `linear-gradient(90deg, #1A1810 0%, #2C2410 40%, #C9A84C22 50%, #2C2410 60%, #1A1810 100%)`,
            backgroundSize: '200% 100%',
          }}
        />
        <div className="p-5 space-y-3">
          {[["w-3/4", 0.1], ["w-1/2", 0.2]].map(([w, delay], idx) => (
            <div
              key={idx}
              className={`h-3 ${w} rounded-full`}
              style={{
                animation: `shimmer-gold 1.6s ease-in-out infinite`,
                animationDelay: `${i * 0.1 + (delay as number)}s`,
                background: `linear-gradient(90deg, #1E1C14 0%, #2C2410 40%, #C9A84C33 50%, #2C2410 60%, #1E1C14 100%)`,
                backgroundSize: '200% 100%',
              }}
            />
          ))}
          <div
            className="h-8 w-full rounded-sm mt-4"
            style={{
              animation: `shimmer-gold 1.6s ease-in-out infinite`,
              animationDelay: `${i * 0.1 + 0.3}s`,
              background: `linear-gradient(90deg, #1E1C14 0%, #2C2410 40%, #C9A84C33 50%, #2C2410 60%, #1E1C14 100%)`,
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>
    ))}

    <style>{`
      @keyframes shimmer-gold {
        0% { background-position: 200% center; opacity: 0.6; }
        50% { opacity: 1; }
        100% { background-position: -200% center; opacity: 0.6; }
      }
      @keyframes fade-in-dark {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

export default PaidLoader;