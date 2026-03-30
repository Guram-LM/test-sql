import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ResourceType } from "../../services/queries/query/useFetchResources";
import { $axios } from "../axios/Axios";


export function useUploadPdf(type: ResourceType) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await $axios.post(
        `/${type}/${id}/upload-pdf`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });
}