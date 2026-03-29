import { useTranslation } from "react-i18next";
import { useState } from "react";
import CopyPopup from "../../components/popup/CopyPopup";

interface ContactItem {
  iconUrl: string;
  title: string;
  value: string;
  type: "email" | "phone" | "address";
}

const ContactInfoCard: React.FC = () => {
  const { t } = useTranslation();

  const contactInfo: ContactItem[] = [
    {
      iconUrl: `data:image/svg+xml;utf8,
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'
          stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
          <rect x='2' y='4' width='20' height='16' rx='2' ry='2'/>
          <path d='M22 6l-10 7L2 6'/>
        </svg>`,
      title: t("contactInfo.email.title"),
      value: t("contactInfo.email.value"),
      type: "email",
    },

      {
        iconUrl: `data:image/svg+xml;utf8,
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
            <path d='M22 16.92v3a2 2 0 0 1-2.18 2
            19.79 19.79 0 0 1-8.63-3.07
            19.5 19.5 0 0 1-6-6
            19.79 19.79 0 0 1-3.07-8.67
            A2 2 0 0 1 4.11 2h3
            a2 2 0 0 1 2 1.72
            c.12.81.3 1.6.54 2.36
            a2 2 0 0 1-.45 2.11L8.09 9.91
            a16 16 0 0 0 6 6l1.72-1.72
            a2 2 0 0 1 2.11-.45
            c.76.24 1.55.42 2.36.54
            a2 2 0 0 1 1.72 2z'/>
          </svg>`,
        title: t("contactInfo.phone.title"),
        value: t("contactInfo.phone.value"),
        type: "phone",
      },
      {
        iconUrl: `data:image/svg+xml;utf8,
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
            <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z'/>
            <circle cx='12' cy='10' r='3'/>
          </svg>`,
        title: t("contactInfo.address.title"),
        value: t("contactInfo.address.value"),
        type: "address",
      },
  ];

  const openEmail = (email: string) => {
    const subject = "";
    const body = "";

    const mailServices = [
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      `https://outlook.live.com/mail/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      `https://compose.mail.yahoo.com/?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    ];

    let opened = false;
    for (const url of mailServices) {
      if (!opened) {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (win) opened = true;
      }
    }
  };
 

  const handleCardClick = (type: "email" | "phone" | "address", value: string) => {
    if (type === "email") {
      openEmail(value);
    } else if (type === "phone") {
      const cleanNumber = value.replace(/\s+/g, "");
      window.location.href = `tel:${cleanNumber}`;
    } else if (type === "address") {
      window.open("https://www.google.com/maps/search/?api=1&query=თბილისი, საქართველო", "_blank", "noopener,noreferrer");
    }
  };



  const [copiedItem, setCopiedItem] = useState<string | null>(null);


  const handleCopyClick = (item: ContactItem) => (e: React.MouseEvent) => {
  e.stopPropagation();

  navigator.clipboard.writeText(item.value).then(() => {
    setCopiedItem(item.title);

    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  });
};


  return (
    <div className="relative h-full overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-stone-800 to-slate-900 p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-600/20 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold text-center text-white mb-3 tracking-tight">
          {t("connectWithCommunity.cta")}
        </h2>
        <p className="text-center text-gray-300 text-sm sm:text-base md:text-sm mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
          {t("connectWithCommunity.ctadescription")}
        </p>

        <div className="flex flex-col items-center gap-5 sm:gap-6">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              onClick={() => handleCardClick(item.type, item.value)}
              className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6 w-full max-w-xl transition-all duration-400 hover:bg-white/10 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 hover:border-amber-500/30 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCardClick(item.type, item.value)}
            >
              <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 via-amber-500/15 to-orange-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-800" />


              {(item.type === "email" || item.type === "phone") && (
                <button
                  aria-label="copy"
                  onClick={handleCopyClick(item)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-500/20 flex items-center justify-center transition-all opacity-60 hover:opacity-100 group z-10"
                >
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                 
                </button>
              )}
              {copiedItem === item.title && <CopyPopup />}
              
              <div className="relative flex items-center gap-5">
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-amber-400 to-orange-500 p-3 shadow-lg shadow-amber-500/40">
                  <img
                    src={item.iconUrl}
                    alt={item.title}
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-yellow-100 font-bold text-base sm:text-lg tracking-wider">
                    {item.title}
                  </p>

                  <p className="text-white text-lg sm:text-xl font-medium mt-1 underline underline-offset-4 decoration-amber-400/50 group-hover:decoration-amber-400 transition-all duration-300 break-all">
                    {item.value}
                  </p>
                </div>

               
                <div className="opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-400">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;