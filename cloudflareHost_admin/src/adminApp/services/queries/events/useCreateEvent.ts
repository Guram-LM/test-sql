import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../../../component/axios/Axios";
import type { MyEventPayload, PartnerEventPayload } from "../../../component/interface/interface";


// ── ჩემი ივენთი შექმნა ────────────────────────────────────

export function useCreateMyEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: MyEventPayload) => {
      const res = await $axios.post("/my-events", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
    },
  });
}

// ── პარტნიორის ივენთი შექმნა ──────────────────────────────

export function useCreatePartnerEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: PartnerEventPayload) => {
      const res = await $axios.post("/partner-events", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partner-events"] });
    },
  });
}