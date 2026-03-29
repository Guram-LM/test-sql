import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import type { MyEvent, PartnerEvent } from "../interface/Interface";
import { useTranslation } from "react-i18next";


// ── ჩემი ივენთები ─────────────────────────────────────────

export function useFetchMyEvents(enabled: boolean) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery<MyEvent[]>({
    queryKey: ["my-events", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/my-events");
      if (!res.data.success) throw new Error("Failed to fetch events");
      return res.data.data || [];
    },
    enabled,
    staleTime: 1000 * 60,       
    refetchInterval: 1000 * 60, 
    refetchOnWindowFocus: true,
  });
}

// ── პარტნიორის ივენთები ───────────────────────────────────

export function useFetchPartnerEvents(enabled: boolean) {
  const { i18n } = useTranslation();
    const lang = i18n.language;
  return useQuery<PartnerEvent[]>({
    queryKey: ["partner-events",lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/partner-events");
      if (!res.data.success) throw new Error("Failed to fetch exercises");
      return res.data.data || [];
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}