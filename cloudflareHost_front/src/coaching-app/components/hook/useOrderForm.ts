import { useState } from "react";
import type { OrderData, OrderResult } from "../interface/Interface";
import axiosInstance from "../../services/axiosInstance";

export const useOrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

 const submitOrder = async (data: OrderData): Promise<OrderResult> => {
  setLoading(true);
  setStatus(null);

    try {
      await axiosInstance.post("/orders", data);
      setStatus("success");
      return { success: true } as OrderResult;
    } catch (err: any) {
      if (err.isRateLimit) {
        return { success: false, isRateLimit: true };
      }

      setStatus("error");
      return { success: false };
    } finally {
      setLoading(false);
    }
 }


  const resetStatus = () => setStatus(null);

  return { loading, status, submitOrder, resetStatus };
};
