import { useEffect, useState } from "react";
import { usePushNotification } from "./usePushNotification";


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
    <>
    <style>{`
      @keyframes notif-up {
        from { transform: translateX(-50%) translateY(calc(100% + 28px)); opacity: 0; }
        to   { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
      @keyframes notif-shim {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }
      @keyframes notif-glow {
        0%,100% { box-shadow: 0 0 0 0 rgba(232,146,10,.4); }
        60%     { box-shadow: 0 0 0 12px rgba(232,146,10,0); }
      }
      @keyframes notif-bob {
        0%,100% { transform: translateY(0) rotate(-1.5deg); }
        50%     { transform: translateY(-5px) rotate(1.5deg); }
      }
      @keyframes notif-rip {
        0%   { transform: scale(0); opacity: .5; }
        100% { transform: scale(4); opacity: 0; }
      }
    `}</style>
    
    <div style={{
      position: "fixed",
      bottom: "90px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "min(calc(100vw - 28px), 420px)",
      zIndex: 9998,
      filter: "drop-shadow(0 16px 40px rgba(0,0,0,.5)) drop-shadow(0 2px 8px rgba(232,146,10,.15))",
      animation: "notif-up .55s cubic-bezier(.16,1,.3,1) forwards",
      fontFamily: "inherit",
    }}>
      <div style={{
        background: "#111116",
        border: ".5px solid rgba(232,146,10,.22)",
        borderRadius: 22,
        overflow: "hidden",
      }}>
    

        <div style={{
          height: 3,
          background: "linear-gradient(90deg,#E8920A,#F5B93E,#5BA3E8,#2D7DD2,#FF7C2A,#E8920A)",
          backgroundSize: "300% auto",
          animation: "notif-shim 4s linear infinite",
        }} />
    
        <div style={{ padding: "14px 16px 16px", display: "flex", alignItems: "center", gap: 12 }}>

          <div style={{
            width: 46, height: 46, borderRadius: 13, flexShrink: 0,
            background: "linear-gradient(145deg,#FF7C2A 0%,#E8920A 50%,#F5B93E 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            animation: "notif-bob 4s ease-in-out infinite",
            boxShadow: "0 4px 14px rgba(232,146,10,.4)",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,.22),transparent 60%)" }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </div>
    
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", margin: 0 }}>
              შეტყობინებები
            </p>

          </div>
    
          <button
            onClick={async () => {
              const ok = await requestPermission();
              if (ok) setVisible(false);
            }}
            disabled={status === "loading"}
            style={{
              flexShrink: 0, position: "relative", overflow: "hidden",
              padding: "9px 18px", borderRadius: 12, border: "none",
              background: status === "loading"
                ? "rgba(255,255,255,.12)"
                : "linear-gradient(135deg,#FF7C2A,#E8920A)",
              color: status === "loading" ? "rgba(255,255,255,.4)" : "#fff",
              fontSize: 13, fontWeight: 600,
              cursor: status === "loading" ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              animation: status === "loading" ? "none" : "notif-glow 2.6s ease-in-out infinite",
              transition: "opacity .15s, transform .12s",
              textShadow: "0 1px 2px rgba(0,0,0,.2)",
            }}
            onMouseEnter={e => {
              if (status !== "loading") {
                e.currentTarget.style.opacity = ".91";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "none";
            }}
          >
            {status === "loading" ? "..." : "ჩართვა"}
          </button>
    
          <button
            onClick={dismiss}
            style={{
              flexShrink: 0, marginLeft: 2,
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(255,255,255,.07)",
              border: ".5px solid rgba(255,255,255,.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,.4)",
              transition: "all .2s",
              padding: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,.13)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,.07)";
              e.currentTarget.style.color = "rgba(255,255,255,.4)";
            }}
          >✕</button>
    
        </div>
      </div>
    </div>

    </>
  );
}


