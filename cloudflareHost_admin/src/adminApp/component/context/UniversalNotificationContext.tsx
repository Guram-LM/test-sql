import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { useSocket } from "../hook/useSocket";
import { useNotifySound } from "../hook/useNotifySound ";
import type { Event } from "../interface/interface";


type NotificationType = "contact" | "order" | "reminder" | "start";

interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  time?: string;
  displayText?: string;
}

interface NotificationContextType {
  showNotification: (data: NotificationData) => void;
  startMonitoring: (events: Event[]) => void;
  stopMonitoring: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useGlobalNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useGlobalNotification must be used within NotificationProvider"
    );
  return ctx;
};


const ClockIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ animation: 'swing 2s ease-in-out infinite' }}>
    <circle cx="32" cy="32" r="28" fill="#FFF" stroke="#FF9800" strokeWidth="3"/>
    <circle cx="32" cy="32" r="24" fill="#FFE0B2"/>
    <line x1="32" y1="32" x2="32" y2="16" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round"/>
    <line x1="32" y1="32" x2="44" y2="32" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="3" fill="#FF6B00"/>
  </svg>
);

const BellFireIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ animation: 'ring 2s ease-in-out infinite' }}>
    <defs>
      <linearGradient id="bellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF1744"/>
        <stop offset="100%" stopColor="#F50057"/>
      </linearGradient>
    </defs>
    <path d="M32 8 C26 8 22 12 22 18 L22 32 C22 36 20 38 18 40 L46 40 C44 38 42 36 42 32 L42 18 C42 12 38 8 32 8Z" 
          fill="url(#bellGrad)" stroke="#FFF" strokeWidth="2"/>
    <ellipse cx="32" cy="40" rx="14" ry="3" fill="#FF1744" opacity="0.5"/>
    <path d="M28 42 C28 44 29.5 46 32 46 C34.5 46 36 44 36 42" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const { playNotification } = useNotifySound();

  const notifiedReminder = useRef<Set<string>>(new Set());
  const notifiedStart = useRef<Set<string>>(new Set());
  const checkIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const showNotification = useCallback(
    (data: NotificationData) => {
      if (!isLoggedIn) return;
      
      setNotification(data);
      
   
      const beepCount = data.type === "reminder" || data.type === "start" ? 3 : 2;
      playNotification(beepCount);
    },
    [isLoggedIn, playNotification]
  );

 
  const startMonitoring = useCallback((newEvents: Event[]) => {
    setEvents(newEvents);
  }, []);

  const stopMonitoring = useCallback(() => {
    setEvents([]);
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      stopMonitoring();
      setNotification(null);
    }
  }, [isLoggedIn, stopMonitoring]);


  useEffect(() => {
    if (!notification) return;
    
 
    const duration = notification.type === "reminder" || notification.type === "start" ? 30000 : 8000;
    
    const timer = setTimeout(() => setNotification(null), duration);
    return () => clearTimeout(timer);
  }, [notification]);


  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);


  useEffect(() => {
    if (!isLoggedIn || events.length === 0) return;

    const checkEvents = () => {
      const now = new Date();

      events.forEach((event) => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        const reminderMinutes = parseInt(event.reminderMinutes || "5");
        const reminderTime = new Date(eventDateTime.getTime() - reminderMinutes * 60 * 1000);


        const reminderDiff = reminderTime.getTime() - now.getTime();
        if (
          !notifiedReminder.current.has(event.id!) &&
          reminderDiff <= 0 &&
          reminderDiff > -10000 &&
          reminderMinutes > 0
        ) {
          notifiedReminder.current.add(event.id!);
          showNotification({
            id: event.id!,
            type: "reminder",
            title: event.title,
            description: event.description,
            time: event.time,
            displayText: `${reminderMinutes} წუთში`,
          });
        }


        const startDiff = eventDateTime.getTime() - now.getTime();
        if (
          !notifiedStart.current.has(event.id!) &&
          startDiff <= 0 &&
          startDiff > -10000
        ) {
          notifiedStart.current.add(event.id!);
          showNotification({
            id: event.id!,
            type: "start",
            title: event.title,
            description: event.description,
            time: event.time,
            displayText: "ახლავე დაიწყო!",
          });
        }
      });
    };

    checkEvents();
    checkIntervalRef.current = setInterval(checkEvents, 10000);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [events, isLoggedIn, showNotification]);


  const socketEnabled = isLoggedIn && !!sessionStorage.getItem("token");

  useSocket(
    (type) => {
      if (type === "order") {
        showNotification({
          id: "order-" + Date.now(),
          type: "order",
          title: "ახალი შეკვეთა!",
          description: "შემოვიდა ახალი შეკვეთა",
          time: new Date().toLocaleTimeString("ka-GE"),
        });
      }

      if (type === "contact") {
        showNotification({
          id: "contact-" + Date.now(),
          type: "contact",
          title: "ახალი კონტაქტი!",
          description: "თქვენ მიიღეთ ახალი შეტყობინება",
          time: new Date().toLocaleTimeString("ka-GE"),
        });
      }
    },
    { enabled: socketEnabled }
  );


  const renderNotification = () => {
    if (!notification) return null;

    const isEventNotification = notification.type === "reminder" || notification.type === "start";

    if (isEventNotification) {

      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(12px)",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "32rem",
              width: "100%",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              border: "4px solid",
              borderColor: notification.type === "reminder" ? "#FDE68A" : "#FECACA",
              background:
                notification.type === "reminder"
                  ? "linear-gradient(to bottom right, #FBBF24, #F59E0B, #EA580C)"
                  : "linear-gradient(to bottom right, #EF4444, #EC4899, #F43F5E)",
              animation: "scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <button
              onClick={() => setNotification(null)}
              style={{
                position: "absolute",
                top: "-16px",
                right: "-16px",
                width: "56px",
                height: "56px",
                background: "white",
                borderRadius: "50%",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                color: "#EF4444",
                transition: "all 0.3s",
                zIndex: 10,               
                pointerEvents: "auto",    
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1) rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              }}
            >
              ✕
            </button>

            <div style={{ position: "relative", padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
                <div style={{ flexShrink: 0 }}>
                  {notification.type === "reminder" ? <ClockIcon /> : <BellFireIcon />}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "white", marginBottom: "8px" }}>
                    {notification.type === "reminder" ? "შეხსენება" : "ივენთი იწყება!"}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "1.125rem", fontWeight: 600 }}>
                    {notification.displayText}
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "16px",
                  padding: "24px",
                  marginBottom: "24px",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                <h3 style={{ fontSize: "1.875rem", fontWeight: 700, color: "white", marginBottom: "12px" }}>
                  {notification.title}
                </h3>
                {notification.description && (
                  <p style={{ color: "rgba(255,255,255,0.95)", marginBottom: "16px", fontSize: "1.125rem" }}>
                    {notification.description}
                  </p>
                )}
                {notification.time && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "white",
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  >
                    <span style={{ fontSize: "1.75rem" }}>🕐</span>
                    <span style={{ fontWeight: 700, fontSize: "1.25rem" }}>{notification.time}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setNotification(null)}
                style={{
                  width: "100%",
                  background: "white",
                  color: "#111827",
                  padding: "20px",
                  borderRadius: "16px",
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ✓ გასაგებია
              </button>
            </div>
          </div>
        </div>
      );
    } else {
  
      return (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            animation: "slideIn 0.5s ease-out",
          }}
        >
          <div
            style={{
              backgroundColor: notification.type === "order" ? "#4c1d95" : "#831843",
              borderRadius: "16px",
              padding: "24px",
              width: "320px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              border: "2px solid rgba(255,255,255,0.2)",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "28px" }}>{notification.type === "order" ? "🛒" : "📝"}</span>
                <h4 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>{notification.title}</h4>
              </div>
              <button
                onClick={() => setNotification(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.transform = "rotate(0deg)";
                }}
              >
                ✕
              </button>
            </div>

            {notification.time && (
              <p style={{ fontSize: "13px", opacity: 0.8, margin: "8px 0" }}>{notification.time}</p>
            )}

            {notification.description && (
              <p style={{ fontSize: "15px", margin: 0, lineHeight: 1.5 }}>{notification.description}</p>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, startMonitoring, stopMonitoring }}>
      {children}
      {isLoggedIn && renderNotification()}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(-10deg); }
          20%, 40% { transform: rotate(10deg); }
        }
      `}</style>
    </NotificationContext.Provider>
  );
};