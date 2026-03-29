// AppErrorBoundary.tsx
import React from "react";

class AppErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 text-center px-4">
          <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-amber-600 shadow-2xl animate-spin-slow" />
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-amber-50 to-orange-100" />
          <div className="absolute inset-4 rounded-full bg-white/40 backdrop-blur-sm animate-ping-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-linear-to-br from-amber-600 to-orange-700 rounded-2xl shadow-2xl flex items-center justify-center">
              <span className="text-4xl font-black text-white">N</span>
              <div className="absolute -top-1 -right-1 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <span className="text-3xl font-bold text-white">!</span>
              </div>
            </div>
          </div>
        </div>
          <h1 className="text-2xl font-bold text-amber-800 mb-4">
            უკაცრავად...
          </h1>
          <p className="text-amber-700 mb-8">
            აპლიკაციის ჩატვირთვა ვერ მოხერხდა
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors"
          >
            გადატვირთვა
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;