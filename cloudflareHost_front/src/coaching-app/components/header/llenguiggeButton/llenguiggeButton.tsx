import { useTranslation } from 'react-i18next';
import { useState } from 'react';


const LanguageButton = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language
  const [activeLang, setActiveLang] = useState(lang);
  return (
    <div className="relative inline-block text-left">
      <div className="flex justify-end items-center">
            <div className="bg-[#EDE8DF] p-1 rounded-xl flex">
              {['ka', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setActiveLang(l);
                    i18n.changeLanguage(l);
                  }}
                  className={`px-5 py-2 text-xs tracking-widest font-mono rounded-lg transition-all ${
                    activeLang === l
                      ? 'bg-white shadow text-[#B8860B]'
                      : 'text-[#9B8E7F] hover:text-[#1A1410]'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
    </div>
  );
};

export default LanguageButton;