import React from 'react';
import type { i18n as I18nType } from 'i18next';

interface Language {
  code: string;
  label: string;
}

interface LanguageButtonProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  i18n: I18nType;
  languages: Language[];
  changeLanguage: (lng: string) => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  open,
  setOpen,
  i18n,
  languages,
  changeLanguage,
}) => {
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-gray-800 to-gray-900 text-white rounded-full shadow-lg hover:shadow-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
          />
        </svg>
        <span className="font-semibold text-sm">
          {languages.find((l) => l.code === i18n.language)?.label || 'English'}
        </span>
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full text-left px-5 py-3 text-sm transition-all duration-200
                  ${
                    i18n.language === lang.code
                    ? 'bg-linear-to-r from-yellow-50 to-yellow-100 font-semibold text-yellow-800 border-l-4 border-yellow-600'
                    : 'hover:bg-gray-50 text-gray-800'
                  }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageButton;