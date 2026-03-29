import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Translate from "./llenguiggeButton/Translate";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import MediumHeader from './MediumHeader';
import UserMenu from './user/UserMenu';


interface NavigationType {
  name: string;
  url?: string;
  subMenu?: { name: string; url: string }[];
}

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ka', label: 'ქართული' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const nav: NavigationType[] = [
    { name: t("Header-Nav.main"), url: "/" },
    { name: t("Header-Nav.about"), url: "/about" }, 
    {
      name: t("Header-Nav.courses"),
      subMenu: [
        { name: t("Header-Nav.coaching"), url: "/individual-coaching" },
        { name: t("Header-Nav.for-companies"), url: "/for-companies" },
      ],
    },
    { name: t("Header-Nav.results"), url: "/results" },
    { name: t("Header-Nav.contact"), url: "/contact" },
  ];


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setShowHeader(true); 
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`
          bg-[#FFFDF6] text-gray-700 px-7 py-2 rounded-lg shadow-md
          sticky top-0 z-30 backdrop-blur-sm bg-opacity-95
          transition-transform duration-300 ease-in-out
          ${showHeader ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="container mx-auto flex items-center">
          <Logo />
          
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
            <Navigation />
          </div>

          <UserMenu/>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden lg:block">
              <Translate />
            </div>

            <div className="hidden lg:block xl:hidden">
              <MediumHeader />
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-10 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        nav={nav}
        i18n={i18n}
        languages={languages}
        changeLanguage={changeLanguage}
      />
    </>
  );
};

export default Header;
