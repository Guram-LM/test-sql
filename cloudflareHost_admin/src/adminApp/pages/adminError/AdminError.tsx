interface AdminErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function AdminError({ message, onRetry }: AdminErrorProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-red-950 via-slate-900 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative bg-slate-900/90 backdrop-blur-xl border border-red-800/50 rounded-2xl p-10 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex flex-col items-center text-center">

          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            ოჰ არა!
          </h1>

          <p className="text-red-400 text-lg font-medium mb-6 leading-relaxed">
            {message || "სერვერთან დაკავშირება ვერ მოხერხდა"}
          </p>

          <p className="text-gray-400 text-sm mb-8">
            გთხოვთ, სცადოთ ხელახლა ან დაუკავშირდეთ ადმინისტრატორს.
          </p>

       
          {onRetry && (
            <button
              onClick={onRetry}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold rounded-xl hover:from-red-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
            >
              <svg className="w-5 h-5 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              ხელახლა ცდა
            </button>
          )}
        </div>
      </div>
    </div>
  );
}