import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FooterLinksRight = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center md:items-start text-amber-50 space-y-1 md:w-auto text-lg md:px-4">
      <Link to="/privacy" className="hover:text-white transition">
        {t("footerLinksRight.privacy")}
      </Link>
      <Link to="/terms-of-use" className="hover:text-white transition">
        {t("footerLinksRight.termsOfUse")}
      </Link>
      <Link to="/terms-of-service" className="hover:text-white transition">
        {t("footerLinksRight.termsOfService")}
      </Link>
    </div>
  );
};

export default FooterLinksRight;
