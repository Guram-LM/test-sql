import { useState } from "react";
import { $axios } from "../axios/Axios";

export const useDeleteOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteOrder = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await $axios.delete(`/orders/${id}`);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete contact");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteOrder, loading, error };
};
