import { useCallback, useEffect, useState } from "react";
import type { OfferApiCombined } from "../interface/interface";
import { $axios } from "../axios/Axios";

export const useOffers = (resource: string) => {
  const [offers, setOffers] = useState<OfferApiCombined[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await $axios.get(`/${resource}`);
      const data = Array.isArray(res.data?.data) ? res.data.data : [];

      const normalizedData = data.map((offer: any) => {
        let activities_ka: string[] = [];
        let activities_en: string[] = [];

        if (offer.activities) {
          try {
            const parsed = JSON.parse(offer.activities);
            activities_ka = Array.isArray(parsed.ka) ? parsed.ka : [];
            activities_en = Array.isArray(parsed.en) ? parsed.en : [];
          } catch {
            activities_ka = [];
            activities_en = [];
          }
        }

        return {
          ...offer,
          activities_ka,
          activities_en,
        };
      });

      setOffers(normalizedData);
    } catch (err: any) {
  if (err.response?.status === 404) {
    setOffers([]);
    setError(null);
  } else {
    setError(err.response?.data?.message || "Failed to fetch offers");
  }
}
 finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return { offers, loading, error, fetchOffers, setOffers };
};
