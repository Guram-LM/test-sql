import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import type { SocialMedia } from "../interface/Interface";
import { useTranslation } from "react-i18next";


export const useSocialMedia = (enabled: boolean) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
  return useQuery<SocialMedia[], Error>({
    queryKey: ["social_media", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/social_media");
      if (!res.data.success) throw new Error("Failed to fetch exercises");
      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};