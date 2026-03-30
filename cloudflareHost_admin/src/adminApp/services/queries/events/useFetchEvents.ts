import { useQuery } from "@tanstack/react-query";
import type { MyEvent, PartnerEvent } from "../../../component/interface/interface";
import { $axios } from "../../../component/axios/Axios";


// ── ჩემი ივენთები ─────────────────────────────────────────

export function useFetchMyEvents() {
  return useQuery<MyEvent[]>({
    queryKey: ["my-events"],
    queryFn: async () => {
      const res = await $axios.get("/my-events");
      return res.data.data || [];
    },
  });
}

// ── პარტნიორის ივენთები ───────────────────────────────────

export function useFetchPartnerEvents() {
  return useQuery<PartnerEvent[]>({
    queryKey: ["partner-events"],
    queryFn: async () => {
      const res = await $axios.get("/partner-events");
      return res.data.data || [];
    },
  });
}