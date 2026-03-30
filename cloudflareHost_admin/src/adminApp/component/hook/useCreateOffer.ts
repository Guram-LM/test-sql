import { useState } from "react";
import { $axios } from "../axios/Axios";

export const useCreateOffer = (resource: "companyoffers" | "individualoffersOrder") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOffer = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      if (!data.has("activities")) {
        data.append("activities", "[]");
      }

      await $axios.post(`/${resource}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Unknown error";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createOffer, loading, error };
};
