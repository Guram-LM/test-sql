import { useState } from "react";
import { $axios } from "../axios/Axios";

export const useDeleteOffer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteOffer = async (resource: string, id: string | number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await $axios.delete(`/${resource}/${id}`);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete offer");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteOffer, loading, error };
};