const icons = [
  {
    href: "https://www.facebook.com/nuca.bakhtadze",
    label: "Facebook",
    svg: (
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    ),
  },
  {
    href: "https://www.instagram.com/nutsabakta?igsh=cGFrbWthZXI1dnJ4&utm_source=qr",
    label: "Instagram",
    svg: (
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .2 2.6.4.6.2 1.1.4 1.6.8.5.3.9.8 1.2 1.3.4.5.6 1 .8 1.6.2.6.3 1.4.4 2.6.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 2-.4 2.6-.2.6-.4 1.1-.8 1.6-.3.5-.8.9-1.3 1.2-.5.4-1 .6-1.6.8-.6.2-1.4.3-2.6.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.2-2.6-.4-.6-.2-1.1-.4-1.6-.8-.5-.3-.9-.8-1.2-1.3-.4-.5-.6-1-.8-1.6-.2-.6-.3-1.4-.4-2.6C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-2 .4-2.6.2-.6.4-1.1.8-1.6.3-.5.8-.9 1.3-1.2.5-.4 1-.6 1.6-.8.6-.2 1.4-.3 2.6-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.6 0-4.8.1-1.1.1-1.7.2-2.1.3-.5.2-.8.3-1.1.6-.3.3-.4.6-.6 1.1-.1.4-.2 1-.3 2.1-.1 1.2-.1 1.6-.1 4.8s0 3.6.1 4.8c.1 1.1.2 1.7.3 2.1.2.5.3.8.6 1.1.3.3.6.4 1.1.6.4.1 1 .2 2.1.3 1.2.1 1.6.1 4.8.1s3.6 0 4.8-.1c1.1-.1 1.7-.2 2.1-.3.5-.2.8-.3 1.1-.6.3-.3.4-.6.6-1.1.1-.4.2-1 .3-2.1.1-1.2.1-1.6.1-4.8s0-3.6-.1-4.8c-.1-1.1-.2-1.7-.3-2.1-.2-.5-.3-.8-.6-1.1-.3-.3-.6-.4-1.1-.6-.4-.1-1-.2-2.1-.3-1.2-.1-1.6-.1-4.8-.1zm0 3.3a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm0 10.7a4.2 4.2 0 1 0 0-8.5 4.2 4.2 0 0 0 0 8.5zm6.8-11.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    ),
  },
  {
    href: "https://www.linkedin.com/in/nutsa-bakhtadze-667510228?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    label: "LinkedIn",
    svg: (
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-2.5v-11h2.5v11zm-1.25-12.27c-.8 0-1.45-.65-1.45-1.45s.65-1.45 1.45-1.45 1.45.65 1.45 1.45-.65 1.45-1.45 1.45zm13 12.27h-2.5v-5.5c0-1.3-.03-3-1.84-3-1.84 0-2.12 1.43-2.12 2.9v5.6h-2.5v-11h2.4v1.5h.03c.33-.63 1.13-1.3 2.33-1.3 2.49 0 2.95 1.64 2.95 3.76v7.04z" />
    ),
  },
  {
    href: "https://www.tiktok.com/@nutsa.bakhtadze?_r=1&_t=ZS-91cPEUpCybS",
    label: "TikTok",
    svg: (
      <path d="M12 2h4.7c.1 1.1.4 2.2.9 3.2a5 5 0 0 0 3.1 2.8v4.1a9.7 9.7 0 0 1-3.9-.9V19a5 5 0 1 1-8.4-3.6v-1.6a8 8 0 0 0 4.6 1.4V13a9.6 9.6 0 0 1-4.6-1.1V2z" />
    ),
  },
];

const SocialIcons = () => {
  return (
    <>
 
      <div className="md:hidden flex justify-center gap-6 pt-6 pb-8">
        {icons.map(({ href, label, svg }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-500 hover:shadow-amber-400/50 hover:-translate-y-1"
          >
      
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-400/50 to-orange-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 w-7 h-7 text-white group-hover:text-[#d4af37] transition-all duration-300 group-hover:scale-125"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {svg}
            </svg>

    
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>
        ))}
      </div>

      <div className="hidden md:flex flex-row justify-center items-center h-full space-x-6 md:flex-row md:items-center md:justify-end md:space-x-4 md:space-y-0 md:pr-10 md:relative w-full max-w-6xl mx-auto md:bottom-0 mb-0 pb-0 overflow-hidden">
        {icons.map(({ href, label, svg }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${label === "Facebook" ? "w-8 h-8" : "w-6 h-6" } text-white hover:text-[#d4af37] transition-transform transform hover:scale-110 duration-200`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {svg}
            </svg>
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialIcons;