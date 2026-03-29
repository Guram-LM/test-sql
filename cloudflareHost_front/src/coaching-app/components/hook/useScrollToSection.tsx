import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== "/individual-coaching" &&
      location.pathname !== "/for-companies"
    ) {
      return;
    }

    const params = new URLSearchParams(location.search);

    if (params.has("target") && params.get("target") === "offers") {
      const timer = setTimeout(() => {
        const element = document.getElementById("offers");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.search]); 
};