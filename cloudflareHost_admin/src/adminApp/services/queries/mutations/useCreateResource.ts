import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResourceType } from "../query/useFetchResources";
import { $axios } from "../../../component/axios/Axios";


export function useCreateResource(type: ResourceType) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ values, file }: any) => {
      const formData = new FormData();
    
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
    
      if (file) {
        formData.append("image", file);
      }
    
      const res = await $axios.post(`/${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });
}