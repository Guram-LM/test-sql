import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../services/axiosInstance";

export type LocalizedItem = Record<string, any> & {
  id: number;
};

interface LocalizedArrayItem {
  ka?: string;
  en?: string;
  [key: string]: any;
}

export function useTranslateOrdesr<T extends LocalizedItem>(resourceName: string) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || "ka";

  const query = useQuery({
    queryKey: ["offers", resourceName, lang],
    enabled: !!i18n.isInitialized && !!lang,
    queryFn: async () => {
      const res = await axiosInstance.get<{ success: boolean; data: T[] }>(`/${resourceName}`);
      const data = res.data?.data || [];

      return data.map((item) => {
        const result: any = { ...item };

       
        Object.keys(item).forEach((key) => {
          if (key.endsWith("_ka") || key.endsWith("_en")) {
            const baseKey = key.replace(/_(ka|en)$/, "");
            result[baseKey] = lang === "ka" ? item[`${baseKey}_ka`] : item[`${baseKey}_en`];
          }
        });

  
        if (item.activities) {
          try {
            const arr: LocalizedArrayItem[] =
              typeof item.activities === "string" ? JSON.parse(item.activities) : item.activities;

            result.activities = arr.map((a) => a?.[lang] || a?.ka || a?.en || "").filter(Boolean);
          } catch {
            result.activities = [];
          }
        } else result.activities = [];

 
        if (item.results) {
          try {
            const arr: LocalizedArrayItem[] =
              typeof item.results === "string" ? JSON.parse(item.results) : item.results;

            result.results = arr.map((r) => r?.[lang] || r?.ka || r?.en || "").filter(Boolean);
          } catch {
            result.results = [];
          }
        } else result.results = [];

        return result;
      });
    },
  });

  return {
    offers: query.data ?? [],
    loading: query.isLoading,
    error: query.error as Error | null,
    lang,
  };
}
