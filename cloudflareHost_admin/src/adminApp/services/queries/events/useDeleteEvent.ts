import { useMutation, useQueryClient } from "@tanstack/react-query";
import { $axios } from "../../../component/axios/Axios";


// ── ჩემი ივენთი წაშლა ────────────────────────────────────

export function useDeleteMyEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await $axios.delete(`/my-events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
    },
  });
}

// ── პარტნიორის ივენთი წაშლა ──────────────────────────────

export function useDeletePartnerEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await $axios.delete(`/partner-events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partner-events"] });
    },
  });
}