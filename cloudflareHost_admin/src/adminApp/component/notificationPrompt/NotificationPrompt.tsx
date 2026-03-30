import { useEffect, useState } from "react";
import { usePushNotification } from "../hook/usePushNotification";

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (window.navigator as any).standalone === true;

export default function NotificationPrompt() {
  const { status, requestPermission } = usePushNotification();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // მხოლოდ standalone mode-ში ვაჩვენოთ
    // ბრაუზერში (iOS და Android) საერთოდ არ ჩანს
    if (!isStandalone()) return;

    if (localStorage.getItem("pushDismissed")) return;
    if (Notification.permission === "granted") return;
    if (!("PushManager" in window)) return;

    setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem("pushDismissed", "true");
  };

  if (!visible || status === "granted") return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "90px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#FFFFFF",
      border: "0.5px solid rgba(0,0,0,0.10)",
      borderRadius: "40px",
      padding: "8px 10px 8px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      fontFamily: "system-ui, -apple-system, sans-serif",
      zIndex: 9998,
      whiteSpace: "nowrap",
      maxWidth: "calc(100vw - 40px)",
    }}>
      <div style={{
        width: "28px", height: "28px", borderRadius: "50%",
        background: "#FFF3E0", display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
        fontSize: "14px",
      }}>
        🔔
      </div>

      <span style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>
        შეტყობინებები
      </span>

      <button
        onClick={async () => {
          const ok = await requestPermission();
          if (ok) setVisible(false);
        }}
        disabled={status === "loading"}
        style={{
          padding: "6px 14px", borderRadius: "30px",
          border: "none",
          background: status === "loading" ? "#999" : "#185FA5",
          color: "#fff", fontSize: "12px", fontWeight: 500,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
      >
        {status === "loading" ? "..." : "ჩართვა"}
      </button>

      <button onClick={dismiss} style={{
        width: "24px", height: "24px", borderRadius: "50%",
        border: "0.5px solid rgba(0,0,0,0.12)",
        background: "rgba(0,0,0,0.04)", cursor: "pointer",
        fontSize: "11px", color: "#888",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, padding: 0,
      }}>✕</button>
    </div>
  );
}