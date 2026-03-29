import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import type { Video } from "../interface/Interface";
import { useTranslation } from "react-i18next";


export const useVideos = (enabled: boolean) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
  return useQuery<Video[], Error>({
    queryKey: ["videos", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/videos");
      if (!res.data.success) throw new Error("Failed to fetch exercises");
      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};