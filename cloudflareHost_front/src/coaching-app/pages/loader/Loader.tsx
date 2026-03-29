export default function Loader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-linear-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="relative text-center">
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 shadow-2xl animate-spin-slow" />
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-amber-50 to-orange-100" />
          <div className="absolute inset-4 rounded-full bg-white/40 backdrop-blur-sm animate-ping-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-linear-to-br from-amber-600 to-orange-700 rounded-2xl shadow-2xl flex items-center justify-center">
              <span className="text-4xl font-black text-white">N</span>
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-linear-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent pb-2 mb-2">
          CouchingApp.com
        </h2>
        <div className="mt-6 text-center">
            <p className="text-amber-700 font-medium text-xl tracking-wider inline-block">
                იტვირთება
            </p>
            <span className="inline-block ml-4 align-middle">
                <div className="flex justify-center gap-3">
                <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce delay-200" />
                </div>
            </span>
        </div>
      </div>
    </div>
  );
}







