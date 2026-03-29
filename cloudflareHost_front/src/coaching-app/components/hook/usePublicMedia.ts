import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import type { Article } from "../interface/Interface";
import { useTranslation } from "react-i18next";


export const usePublicMedia = (enabled: boolean) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
  return useQuery<Article[], Error>({
    queryKey: ["article", lang],
    queryFn: async () => {
      const res = await axiosInstance.get("/articles");
      if (!res.data.success) throw new Error("Failed to fetch exercises");
      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};