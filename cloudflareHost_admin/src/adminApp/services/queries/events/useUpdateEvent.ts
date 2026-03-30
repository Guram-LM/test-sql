import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MyEventPayload, PartnerEventPayload } from "../../../component/interface/interface";
import { $axios } from "../../../component/axios/Axios";


// ── ჩემი ივენთი განახლება ─────────────────────────────────

export function useUpdateMyEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<MyEventPayload>;
    }) => {
      const res = await $axios.put(`/my-events/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
    },
  });
}

// ── პარტნიორის ივენთი განახლება ───────────────────────────

export function useUpdatePartnerEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<PartnerEventPayload>;
    }) => {
      const res = await $axios.put(`/partner-events/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partner-events"] });
    },
  });
}