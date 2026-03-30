import { useQuery } from "@tanstack/react-query";
import { $axios } from "../../../component/axios/Axios";


export type ResourceType =
  | "videos"
  | "articles"
  | "social_media"
  | "feedback"
  | "free_pdf_downloads"
  | "free_pdfs";

export function useFetchResources(type: ResourceType) {
  return useQuery({
    queryKey: [type],
    queryFn: async () => {
      const res = await $axios.get(`/${type}`);
      return res.data.data || [];
    },
  });
}