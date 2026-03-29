import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const SectionHeader = () => {
  return (
    <>
  
      <div className="block max-[850px]:block min-[851px]:hidden">
        <MobileHeader />
      </div>

      <div className="hidden min-[851px]:block">
        <DesktopHeader />
      </div>
    </>
  );
};

export default SectionHeader;
