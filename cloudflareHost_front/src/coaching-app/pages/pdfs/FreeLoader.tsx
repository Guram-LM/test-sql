const FreeLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-sm border border-[#E0D8C4] bg-[#FFFDF8] overflow-hidden"
          style={{ animation: `fade-in 0.4s ease both`, animationDelay: `${i * 0.07}s` }}
        >
          <div className="h-48 bg-[#F0E8D4]" style={{ animation: 'shimmer-light 1.8s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
          <div className="p-5 space-y-3">
            <div className="h-3 w-3/4 rounded-full bg-[#E8DFC8]" style={{ animation: 'shimmer-light 1.8s ease-in-out infinite', animationDelay: `${i * 0.1 + 0.1}s` }} />
            <div className="h-3 w-1/2 rounded-full bg-[#E8DFC8]" style={{ animation: 'shimmer-light 1.8s ease-in-out infinite', animationDelay: `${i * 0.1 + 0.2}s` }} />
            <div className="h-8 w-full rounded-sm bg-[#E8DFC8] mt-4" style={{ animation: 'shimmer-light 1.8s ease-in-out infinite', animationDelay: `${i * 0.1 + 0.3}s` }} />
          </div>
          <style>{`
            @keyframes shimmer-light {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
  
  export default FreeLoader;