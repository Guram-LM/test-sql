import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResourceType } from "../query/useFetchResources";
import { $axios } from "../../../component/axios/Axios";


export function useDeleteResource(type: ResourceType) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await $axios.delete(`/${type}/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });
}