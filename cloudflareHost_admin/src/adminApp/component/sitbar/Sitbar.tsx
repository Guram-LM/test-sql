import { NavLink, useNavigate } from "react-router-dom";
import { useUnreadCount } from "../hook/useUnreadCount ";

import { useState } from "react";
import { CloseIcon,  MenuIcon, PdfIcon } from "../svgIcons/SvgIcons";


const Sitbar = () => {
  const navigate = useNavigate();
  const contactCount = useUnreadCount('contacts', '/contactPage');
  const orderCount = useUnreadCount('orders', '/ordePage');

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);




  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("unread_contact");
    sessionStorage.removeItem("unread_order");
    navigate("/login", { replace: true });
  };

  const buttonStyle = ({ isActive }: { isActive: boolean }) =>
    `group relative block w-full px-6 py-4 rounded-2xl font-bold text-center transition-all duration-300 overflow-hidden overflow-visible ${
      isActive
        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/50 scale-105"
        : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 hover:scale-105"
    }`;

  return (
    <>
      
      
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 2xl:hidden"
        ></div>
      )}

      <div className="fixed top-0 left-0 right-0 z-50 2xl:hidden">
        <div className="bg-linear-to-r from-purple-900/80 via-indigo-900/80 to-purple-900/80 backdrop-blur-lg border-b border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="text-white font-bold text-xl tracking-wide">Admin Panel</div>
            <button
              onClick={toggleSidebar}
              className="group p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label="Toggle sidebar"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

  
      <nav
        className={`
          fixed top-0 left-0 w-72 bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 
          p-8 shadow-2xl z-50 border-r border-white/10 overflow-y-auto
          h-dvh
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          2xl:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mb-12 2xl:hidden">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
            Admin Panel
          </h2>
        </div>

        <div
          onClick={() => navigate("/")}
          className="mb-12 cursor-pointer text-center hidden 2xl:block"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-400 to-pink-400 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
            Admin Panel
          </h2>
        </div>

    
        <ul className="flex flex-col space-y-4">

        <li>
          <NavLink to="/" className={buttonStyle}>
            <div className="relative z-10 flex items-center  space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>მთავარი</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/offersPage" className={buttonStyle}>
            <div className="relative z-10 flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span>შეთავაზებები</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/events" className={buttonStyle}>
            <div className="relative z-10 flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <circle cx="12" cy="15" r="2" />
            </svg>
              <span>ივენთები</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/scheduled" className={buttonStyle}>
            <div className="relative z-10 flex items-center space-x-3">

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 14v2l1.5 1" />
            </svg>

              <span>სამოტივაციო</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/contactPage" className={buttonStyle}>
            <div className="relative z-10 flex items-center  space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>შეტყობინებები</span>
            </div>
            {contactCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-7 h-7 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50 z-50 border-2 border-slate-900 pointer-events-none">
                {contactCount > 99 ? '99+' : contactCount}
              </span>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/ordePage" className={buttonStyle}>
            <div className="relative z-10 flex items-center  space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>ჯავშანი</span>
            </div>
            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-7 h-7 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50 z-50 border-2 border-slate-900 pointer-events-none">
                {orderCount > 99 ? '99+' : orderCount}
              </span>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>


        



        <li>
          <NavLink to="/feedback" className={buttonStyle}>
            <div className="relative z-10 flex items-center  space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
            </svg>
              <span>უკუკავშირები</span>
            </div>
           
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/media-page" className={buttonStyle}>
            <div className="relative z-10 flex items-center  space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h10a2 2 0 012 2v14l-5-3-5 3V5z" />
            </svg>
              <span>მედია</span>
            </div>
           
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/users-page" className={buttonStyle}>
            <div className="relative z-10 flex items-center space-x-3">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 fill-white shrink-0"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
              </svg>
              <span>მომხმარებლები</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/freePdf-downloads-statistic" className={buttonStyle}>
            <div className="relative z-10 flex items-center space-x-3">
            <PdfIcon />
              <span>სტატისტიკა</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/pdfs" className={buttonStyle}>
            <div className="relative z-10 flex items-center space-x-3">
            <PdfIcon  />
              <span>რესურსები</span>
            </div>
           
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>


         <li>
          <NavLink to="/changePassword" className={buttonStyle}>
            <div className="relative z-10 flex items-center space-x-3">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span> შეცვლა</span>
            </div>
           
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
          </NavLink>
        </li>


        <li className="pt-6 mt-6 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="group relative w-full px-6 py-4 rounded-2xl font-bold text-center bg-white/10 backdrop-blur-md text-white hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="relative z-10 flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>გასვლა</span>
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </button>
        </li>
      </ul>


      
      </nav>
    </>
  );
};

export default Sitbar;