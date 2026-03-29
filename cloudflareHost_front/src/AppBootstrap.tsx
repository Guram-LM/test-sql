// AppBootstrap.tsx
import { useEffect, useRef } from "react";
import Loader from "./coaching-app/pages/loader/Loader";
import { useAuthStore } from "./coaching-app/zustand/useAuthStore";

const AppBootstrap = ({ children }: { children: React.ReactNode }) => {
  const initialized = useRef(false);
  const { isReady, setReady, setAccessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

    fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          clearAuth();
          return;
        }
        return res.json().then((data) => {
          if (data?.accessToken) setAccessToken(data.accessToken);
        });
      })
      .catch(() => clearAuth()) 
      .finally(() => setReady());
  }, []);

  if (!isReady) return <Loader />;

  return <>{children}</>;
};

export default AppBootstrap;