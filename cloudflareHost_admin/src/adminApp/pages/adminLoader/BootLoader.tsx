export default function BootLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">

    
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-32 right-0 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative text-center">

        <div className="relative w-40 h-40 mx-auto mb-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-purple-500 animate-spin" />
          <div className="absolute inset-4 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin [animation-direction:reverse] animation-duration-3000" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl animate-ping" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-2xl flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 15.466v-.8a2 2 0 10-4 0v.8c0 .268-.037.534-.107.79l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            ADMIN PANEL
          </span>
        </h1>

        <p className="text-purple-300 text-xl font-medium tracking-wider">
          სისტემა იტვირთება...
        </p>

        <div className="mt-10 w-80 mx-auto">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-progress" />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-purple-500 rounded-full animate-bounce shadow-lg shadow-purple-500/50"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}