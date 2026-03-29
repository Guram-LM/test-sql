import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Translate from "./llenguiggeButton/Translate";

export default function MediumHeader() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { name: t("Header-Nav.main"), url: "/" },
    { name: t("Header-Nav.about"), url: "/about" },
    { name: t("Header-Nav.coaching"), url: "/individual-coaching" },
    { name: t("Header-Nav.for-companies"), url: "/for-companies" },
    { name: t("Header-Nav.results"), url: "/results"},
    { name: t("Header-Nav.contact"), url: "/contact" },
  ];


  return (
    <header className="hidden lg:block xl:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-6 py-4 items-center justify-between flex">

        <div className="shrink-0">
          <Logo />
        </div>


        <div className="inline-block">

          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center py-3 px-35 rounded-3xl overflow-hidden transition-all duration-500 group hover:scale-105 hover:shadow-2xl"
            style={{
              background: isOpen
                ? 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)'
                : 'linear-gradient(135deg, #FFFFFF 0%, #FEF3C7 100%)',
            }}
          >

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-linear-to-r from-amber-300 via-orange-300 to-amber-300 animate-pulse" />
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/20 to-transparent" />
            </div>

            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
                isOpen ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
              }`} />
            </div>
           
            <div className="relative mt-2 w-full max-w-52 flex justify-center">

              <div className={`absolute top-1/2 -translate-y-1/2 w-full h-0.5 transition-all duration-500 ${
                isOpen
                  ? 'bg-white/80 shadow-lg shadow-white/50'
                  : 'bg-linear-to-r from-amber-300 via-orange-400 to-amber-300 group-hover:h-1 group-hover:shadow-lg group-hover:shadow-amber-400/50'
              }`} />
              <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ${
                isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100 group-hover:scale-125'
              }`}>
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-amber-400 to-orange-400 opacity-20 animate-ping" />
              </div>
    
              <div className={`relative px-4 py-2 rounded-full transition-all duration-500 ${
                isOpen
                  ? 'bg-white/20 backdrop-blur-sm shadow-inner'
                  : 'bg-linear-to-r from-amber-100 to-orange-100 group-hover:bg-linear-to-r group-hover:from-amber-200 group-hover:to-orange-200'
              }`}>
                <svg
                  className={`w-7 h-7 transition-all duration-500 ${
                    isOpen
                      ? 'text-white rotate-180 scale-110 drop-shadow-lg'
                      : 'text-amber-600 group-hover:text-orange-600 group-hover:scale-125 group-hover:drop-shadow-md'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                    className={isOpen ? '' : 'group-hover:animate-bounce'}
                  />
                </svg>
              </div>
            </div>

            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400 opacity-60 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400 opacity-60 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
          </button>


          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
            >
              <div className="flex gap-1 p-3 bg-linear-to-r from-amber-50 to-orange-50">
                {navItems.map((item) => (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    className={({ isActive }) =>
                      `px-6 py-3 rounded-xl font-medium text-gray-800 whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-white text-amber-600 shadow-md font-bold"
                          : "hover:bg-white/70 hover:text-amber-600"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
     
        <div className="shrink-0">
          <Translate />
        </div>
      </div>
    </header>
  );
}