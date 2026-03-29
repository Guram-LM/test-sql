

import FooterLinksLeft from "./FooterLinksLeft";
import FooterLinksRight from "./FooterLinksRight";
import FooterLogo from "./FooterLogo";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
   
      <div className="flex flex-col md:grid md:grid-cols-3 items-center justify-center gap-0 lg:gap-1 w-full max-w-6xl px-6">

        <div className="hidden md:block justify-self-end">
          <FooterLinksLeft />
        </div>

        <div className="justify-self-center">
          <FooterLogo />
        </div>

        <div className="md:mt-0 mt-5 justify-self-start">
          <FooterLinksRight />
        </div>

      </div>

        <SocialIcons/>
      </div>
    </footer>
  );
};

export default Footer;
