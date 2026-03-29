import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CopyPopup from '../../components/popup/CopyPopup';

export default function ContactSection() {
  const { t } = useTranslation();

  const email = "hello@nutsabakhtadze.com";
  const phone = "+995555565464";
  const address = "თბილისი, საქართველო";
  
  const openEmail = () => {
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


  const [copiedField, setCopiedField] = useState<null | "email" | "phone">(null);



  const copyToClipboard = (key: "email" | "phone", text: string) => (e: React.MouseEvent) => {
  e.stopPropagation();

  navigator.clipboard.writeText(text).then(() => {
    setCopiedField(key);

    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  });
};



  return (
    <section className="py-16 sm:py-20 md:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="block">
          <h2 className="md:text-3xl text-2xl font-light text-gray-800 mb-4">
            {t('ResultsPage.contactSectionTitle')}
          </h2>
          <p className="text-xl text-gray-600 mb-10">{t('ResultsPage.contactName')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            <div className="relative p-6 bg-white rounded-2xl shadow-md transition hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">

              <button
                aria-label='copy'
                onClick={copyToClipboard("email", email)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-amber-100 flex items-center justify-center transition-all opacity-60 hover:opacity-100 group z-10"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>


              <button
                aria-label='open Email'
                onClick={openEmail}
                className="w-full flex flex-col items-center cursor-pointer"
              >
                <svg className="w-10 h-10 text-amber-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l8.25 5.25 8.25-5.25M4.5 18h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0019.5 6h-15A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18z"/>
                </svg>
                <p className="text-gray-700">{t('ResultsPage.contactEmail') || email}</p>
              </button>

              {copiedField === "email" && <CopyPopup/>}

            </div>


            <div className="relative p-6 bg-white rounded-2xl shadow-md transition hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">

              <button
                aria-label='copy'
                onClick={copyToClipboard("phone", phone)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-amber-100 flex items-center justify-center transition-all opacity-60 hover:opacity-100 group z-10"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>


              <a
                href={`tel:${phone}`}
                className="w-full flex flex-col items-center cursor-pointer"
              >
                <svg className="w-10 h-10 text-amber-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 5.25c0 9 7.5 16.5 16.5 16.5.7 0 1.38-.07 2.04-.2.45-.09.84-.38 1.02-.79l1.23-2.88a1.12 1.12 0 00-.56-1.41l-3.64-1.82a1.12 1.12 0 00-1.36.26l-1.7 1.95a1.12 1.12 0 01-1.12.32c-2.37-.75-4.75-3.13-5.5-5.5a1.12 1.12 0 01.32-1.12l1.95-1.7a1.12 1.12 0 00.26-1.36L7.12 2.79a1.12 1.12 0 00-1.41-.56L2.83 3.46c-.41.18-.7.57-.79 1.02-.13.66-.2 1.34-.2 2.04z"/>
                </svg>
                <p className="text-gray-700">{t('ResultsPage.contactPhone') || phone}</p>
              </a>
              {copiedField === "phone"&& <CopyPopup/>}
            </div>

           
            <a
              href="https://www.google.com/maps/search/?api=1&query=თბილისი, საქართველო"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white rounded-2xl shadow-md transition hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center cursor-pointer"
            >
              <svg className="w-10 h-10 text-amber-500 mb-3" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7.5-6-7.5-12A7.5 7.5 0 1119.5 9c0 6-7.5 12-7.5 12z"/>
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <p className="text-gray-700">{t('ResultsPage.contactAddress') || address}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}