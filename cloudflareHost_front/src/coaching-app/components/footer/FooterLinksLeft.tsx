import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FooterLinksLeft = () => {
  const { t } = useTranslation();

  return (
   <div className="flex flex-col items-end md:items-end text-amber-50 space-y-1 md:w-auto text-lg md:px-4">
    <Link to="/" className="hover:text-white transition">{t('footerLinks.home')}</Link>
    <Link to="/individual-coaching" className="hover:text-white transition">{t('footerLinks.coaching')}</Link>
    <Link to="/results" className="hover:text-white transition">{t('footerLinks.results')}</Link>
  </div>


  );
};

export default FooterLinksLeft;
