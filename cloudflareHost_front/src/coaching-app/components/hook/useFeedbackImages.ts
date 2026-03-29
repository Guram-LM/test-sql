import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";
import type { Feedback } from "../interface/Interface";


export const useFeedbackImages = (enabled: boolean) => {
  return useQuery<Feedback[], Error>({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await axiosInstance.get("/feedback");
      if (!res.data.success) throw new Error("Failed to fetch exercises");
      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
