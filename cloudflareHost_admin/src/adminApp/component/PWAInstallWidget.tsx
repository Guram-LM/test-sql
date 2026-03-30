import { useEffect, useState } from "react";

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

const isInStandaloneMode = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (window.navigator as any).standalone === true;

const PWAInstallWidget = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {

    if (isInStandaloneMode()) return;

    const ios = isIOS();
    setIsIOSDevice(ios);

    if (ios) {

      setVisible(true);
      return;
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    const handleInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#FFFFFF",
      border: "0.5px solid rgba(0,0,0,0.10)",
      borderRadius: "40px",
      padding: "8px 10px 8px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      zIndex: 9999,
      whiteSpace: "nowrap",
      maxWidth: "calc(100vw - 40px)",
    }}>
      <div style={{
        width: "28px", height: "28px", borderRadius: "50%",
        background: "#EBF3FD", display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v7M7 9L5 7M7 9l2-2" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.5 11h9" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>

      {isIOSDevice ? (

        <>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#111" }}>
            Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
          </span>
          <button onClick={() => setVisible(false)} style={{
            width: "24px", height: "24px", borderRadius: "50%",
            border: "0.5px solid rgba(0,0,0,0.12)",
            background: "rgba(0,0,0,0.04)", cursor: "pointer",
            fontSize: "11px", color: "#888",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, padding: 0,
          }}>✕</button>
        </>
      ) : (

        <>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>
            Install App
          </span>
          <button onClick={install} style={{
            padding: "6px 14px", borderRadius: "30px",
            border: "none", background: "#185FA5",
            color: "#fff", fontSize: "12px", fontWeight: 500,
            cursor: "pointer",
          }}>
            Install
          </button>
          <button onClick={() => setVisible(false)} style={{
            width: "24px", height: "24px", borderRadius: "50%",
            border: "0.5px solid rgba(0,0,0,0.12)",
            background: "rgba(0,0,0,0.04)", cursor: "pointer",
            fontSize: "11px", color: "#888",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, padding: 0,
          }}>✕</button>
        </>
      )}
    </div>
  );
};

export default PWAInstallWidget;