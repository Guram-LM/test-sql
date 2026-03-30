import { useState } from "react";
import { $axios } from "../axios/Axios";

export const useUpdateOffer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateOffer = async (resource: string, id: number, data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await $axios.put(`/${resource}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update offer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateOffer, loading, error };
};