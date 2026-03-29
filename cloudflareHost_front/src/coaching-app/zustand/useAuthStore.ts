// useAuthStore.ts — დაამატე isReady
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isReady: boolean;  
  setAccessToken: (token: string) => void;
  setReady: () => void;  
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isReady: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setReady: () => set({ isReady: true }),
  clearAuth: () => set({ accessToken: null }),
}));