import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import type { i18n as I18nType } from 'i18next';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  label: string;
}

interface NavigationType {
  name: string;
  url?: string;
  subMenu?: { name: string; url: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  nav: NavigationType[];
  i18n: I18nType;
  languages: Language[];
  changeLanguage: (lng: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  nav,
  i18n,
  languages,
  changeLanguage,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
   
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-linear-to-br from-[#FFFDF6] to-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <span className="text-xl font-bold text-gray-900">{ t("Header-Nav.title")}</span>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {nav.map((item, index) => (
              <div key={item.name}>
                {item.subMenu ? (
                  <div>
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className="w-full flex items-center justify-between px-6 py-4 text-gray-900 hover:bg-yellow-50 transition-colors font-medium"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          expandedIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedIndex === index ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      {item.subMenu.map((sub) => (
                        <NavLink
                          key={sub.url}
                          to={sub.url}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `block px-10 py-3 transition-colors ${
                              isActive
                                ? 'bg-yellow-100 text-yellow-800 font-semibold border-l-4 border-yellow-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.url!}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-6 py-4 transition-colors font-medium ${
                        isActive
                          ? 'bg-yellow-100 text-yellow-800 font-semibold border-l-4 border-yellow-600'
                          : 'text-gray-900 hover:bg-yellow-50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-gray-200 pt-4 mt-4 pb-6 bg-white/80 backdrop-blur-sm">
            <div className="text-sm font-semibold text-gray-500 mb-2 px-6">ენა / Language</div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  onClose();
                }}
                className={`w-full text-left px-6 py-3 transition-colors ${
                  i18n.language === lang.code
                    ? 'bg-yellow-100 text-yellow-800 font-semibold border-l-4 border-yellow-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;