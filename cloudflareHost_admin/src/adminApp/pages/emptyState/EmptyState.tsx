import React from 'react';

interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: React.ReactNode; 
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-8 px-4">
      <div className="text-center max-w-md mx-auto">
     
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-linear-to-br from-amber-500 to-amber-600 p-8 rounded-full shadow-2xl shadow-amber-900/50">
            {icon || (
            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-1.5-1.5H5.5L4 7m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0H4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2-8v8" />
            </svg>
            )}
          </div>
        </div>

       
        <h3 className="text-3xl font-bold text-white mb-4">{message}</h3>


       
        <div className="mt-10 flex justify-center">
          <div className="w-32 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;