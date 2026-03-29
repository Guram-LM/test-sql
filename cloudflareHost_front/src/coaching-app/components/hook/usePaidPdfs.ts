import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../services/axiosInstance";
import type { PaidPdf } from "../interface/Interface";



export const usePaidPdfs = (enabled: boolean) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery<PaidPdf[], Error>({
    queryKey: ["paid-pdfs", lang], 
    queryFn: async () => {
      const res = await axiosInstance.get("/pdf/paid-pdfs"); 

      if (!res.data?.data) {
        throw new Error("Failed to fetch paid PDFs");
      }

      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};