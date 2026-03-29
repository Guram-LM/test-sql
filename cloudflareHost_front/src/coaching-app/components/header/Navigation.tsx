import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationType {
  name: string;
  url?: string;
  subMenu?: { name: string; url: string }[];
}

interface NavigationProps {
  openCoursesMenu?: boolean;
}

const Navigation = ({ openCoursesMenu }: NavigationProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const coursesRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openCoursesMenu) {
      const index = nav.findIndex((el) => el.subMenu);
      setOpenIndex(index);
      coursesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [openCoursesMenu]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <nav ref={navRef} className="flex space-x-8 relative">
      {nav.map((element, index) => {
        const isActive = element.url === location.pathname;

        return (
          <div key={element.name} className="relative" ref={element.subMenu ? coursesRef : null}>
            {element.subMenu ? (
              <>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="text-gray-900 hover:text-yellow-800 transition-colors font-medium text-lg whitespace-nowrap flex items-center gap-1 relative z-10"
                >
                  {element.name}
                  <span className="ml-1 text-sm">{openIndex === index ? "▲" : "▼"}</span>
                  {openIndex === index && (
                    <motion.div
                      layoutId="active-background"
                      className="absolute -inset-1 bg-yellow-400/20 rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-white/80 backdrop-blur-md rounded-xl p-2 shadow-lg"
                    >
                      {element.subMenu.map((sub) => (
                        <motion.div
                          key={sub.url}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <NavLink
                            to={sub.url}
                            className={({ isActive }) =>
                              `block px-4 py-3 rounded text-gray-900 font-medium text-center text-sm
                              bg-gray-100 border border-white hover:bg-gray-900 hover:text-white transition-colors ${
                                isActive ? "bg-yellow-100 text-yellow-800" : ""
                              }`
                            }
                            onClick={() => setOpenIndex(null)}
                          >
                            {sub.name}
                          </NavLink>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <NavLink
                to={element.url!}
                className={({ isActive }) =>
                  `relative whitespace-nowrap text-lg font-medium transition-colors px-1 py-1 ${
                    isActive
                      ? "text-yellow-800 font-semibold"
                      : "text-gray-900 hover:text-yellow-800"
                  }`
                }
              >
                {element.name}

                {isActive && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </NavLink>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;