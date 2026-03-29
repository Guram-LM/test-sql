// services/axiosInstance.ts
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../zustand/useAuthStore";
import { useRateLimitStore } from "../zustand/useRateLimitStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10_000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/* ====================== REQUEST ====================== */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

/* ====================== RESPONSE ====================== */
let isRefreshing = false;
let queue: { resolve: (t: string) => void; reject: (e: unknown) => void }[] = [];

const flushQueue = (error: unknown, token: string | null = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  queue = [];
};

// Auth endpoints — interceptor-მა არ უნდა სცადოს refresh მათზე
const AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
  "/auth/refresh",
  "/auth/forgot-password",
  "/auth/verify-reset-code",
  "/auth/reset-password",
];

const isAuthEndpoint = (url?: string) =>
  AUTH_ENDPOINTS.some((e) => url?.includes(e));

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    // ── 429 Rate limit ────────────────────────────────────────────
    if (error.response?.status === 429) {
      const message =
        (error.response.data as any)?.message ??
        "ძალიან ბევრი მოთხოვნა. სცადეთ მოგვიანებით.";
      const retryAfter = error.response.headers["retry-after"]
        ? Number(error.response.headers["retry-after"])
        : 60;
      useRateLimitStore.getState().open(message, retryAfter);
      return Promise.reject(error);
    }

    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // ── 401 — სცადე refresh, მაგრამ არა auth endpoint-ებზე ────────
    if (
      error.response?.status === 401 &&
      !original?._retry &&
      !isAuthEndpoint(original?.url)
    ) {
      // თუ refresh უკვე მიდის — დაამატე queue-ში
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newToken: string = data.accessToken;
        useAuthStore.getState().setAccessToken(newToken);
        flushQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(original);
      } catch (err) {
        flushQueue(err, null);
        useAuthStore.getState().clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;