import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { Exercise } from "../interface/Interface";
import axiosInstance from "../../services/axiosInstance";



export const useExercises = (enabled: boolean) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;

    return useQuery<Exercise[], Error>({
        queryKey: ["exercises", lang],
        queryFn: async () => {
            const res = await axiosInstance.get("free_pdfs");
            if (!res.data.success) throw new Error("Failed to fetch exercises");
            return res.data.data;
        },
        enabled,
        staleTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnReconnect: false,
   });
};