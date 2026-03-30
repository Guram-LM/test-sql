export default function AdminLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative text-center">
   
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-8 border-slate-700 border-t-purple-500 animate-spin" />
          <div className="absolute inset-4 rounded-full border-8 border-slate-800 border-t-indigo-500 animate-spin animation-reverse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          ადმინ პანელი
        </h2>
        <p className="text-purple-300 text-lg font-medium">
          იტვირთება მონაცემები...
        </p>

       
        <div className="flex justify-center gap-3 mt-6">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-100" />
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  );
}