import { NavLink, Outlet } from "react-router-dom";

const DynamicHeader = () => {
  const navItems = [
    { name: "CreateIndividualOffers", url: "/createIndividualOffers", icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { name: "CreateCompanyOffers", url: "/createCompanylOffers", icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { name: "IndividualOffersList", url: "/individualeOffersList", icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )},
    { name: "CompanyOffersList", url: "/companyOffersList", icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )}
  ];

  return (
    <>
      <nav
  className="
    max-w-7xl mx-auto
    mt-26
    md:mt-30
    2xl:mt-15
    px-4 sm:px-6 lg:px-0
  "
>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:justify-center lg:gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-2
                lg:flex-row lg:gap-3
                p-3 sm:p-4 rounded-2xl font-semibold text-sm sm:text-base
                text-center transition-all duration-300
                ${isActive 
                  ? "bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                  : "bg-white/10 text-slate-200 hover:bg-white/20 hover:scale-105"
                }`
              }
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/20">
                {item.icon}
              </span>
              <span className="text-xs sm:text-sm">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      <Outlet/>
    </>
  );
};

export default DynamicHeader;
