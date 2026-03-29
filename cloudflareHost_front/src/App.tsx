// App.tsx
import { Suspense, useEffect, useState } from "react";
import i18n from "./i18n";
import ScrollToTop from "./coaching-app/components/scrollToTop/ScrollToTop";
import AppNavigation from "./coaching-app/routes/AppNavigation";
import SmileMoment from "./coaching-app/pages/home/SmileMoment";
import { HelmetProvider } from "react-helmet-async";
import FloatingTelegram from "./coaching-app/components/ui/FloatingTelegram";
import PWAInstallButton from "./coaching-app/components/PWAInstallButton/PWAInstallButton";
import NotificationPrompt from "./coaching-app/components/PWAInstallButton/NotificationPrompt";
import Loader from "./coaching-app/pages/loader/Loader";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-lang", i18n.language);
    i18n.on("languageChanged", (lng) => {
      document.documentElement.setAttribute("data-lang", lng);
    });
  }, []);

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const KEY = "welcomeShown";
    if (sessionStorage.getItem(KEY) === "true") return;
    const now = performance.now();
    const lastRun = Number(sessionStorage.getItem("welcomeLastRun") || "0");
    if (now - lastRun < 300) return;
    sessionStorage.setItem("welcomeLastRun", now.toString());
    setShowWelcome(true);
    sessionStorage.setItem(KEY, "true");
    const timer = setTimeout(() => setShowWelcome(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {showWelcome && (
        <SmileMoment show={true} onClose={() => setShowWelcome(false)} />
      )}
      <ScrollToTop />
      <PWAInstallButton />
      <NotificationPrompt />
      <HelmetProvider>
        <Suspense fallback={<Loader />}>
          <AppNavigation />
        </Suspense>
      </HelmetProvider>
      <FloatingTelegram />
    </main>
  );
}

export default App;