import { useState, useCallback, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";


function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export type PushStatus = "idle" | "granted" | "denied" | "unsupported" | "loading";

export function usePushNotification() {
  const [status, setStatus] = useState<PushStatus>("idle");

  useEffect(() => {

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "granted") {
      setStatus("granted");
      autoResubscribe(); 
    } else if (Notification.permission === "denied") {
      setStatus("denied");
    }
  }, []);

  async function autoResubscribe() {
    try {
      const { data } = await axiosInstance.get("/push/vapid-public-key");
      const applicationServerKey = urlBase64ToUint8Array(data.publicKey);
      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
        await axiosInstance.post("/push/subscribe", { subscription });
      }
    } catch (err) {
      console.warn("Auto resubscribe failed:", err);
    }
  }

  const requestPermission = useCallback(async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return false;
    }

    setStatus("loading");

    try {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setStatus("denied");
        return false;
      }

      const { data } = await axiosInstance.get("/push/vapid-public-key");
      const applicationServerKey = urlBase64ToUint8Array(data.publicKey);
      const registration = await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
      }

      await axiosInstance.post("/push/subscribe", { subscription });
      setStatus("granted");
      localStorage.setItem("pushGranted", "true");
      return true;
    } catch (err) {
      console.warn("Push registration failed:", err);
      setStatus("denied");
      return false;
    }
  }, []);

  return { status, requestPermission };
}