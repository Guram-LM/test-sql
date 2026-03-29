import { create } from "zustand";

type RateLimitState = {
  isOpen: boolean;
  message: string;
  retryAfter: number | null;
  open: (message: string, retryAfter?: number) => void;
  close: () => void;
};

export const useRateLimitStore = create<RateLimitState>((set) => ({
  isOpen: false,
  message: "",
  retryAfter: null,
  open: (message, retryAfter = 60) => {
  set({ isOpen: true, message, retryAfter });
},

close: () => {
  set({ isOpen: false, message: "", retryAfter: null });
},

}));
