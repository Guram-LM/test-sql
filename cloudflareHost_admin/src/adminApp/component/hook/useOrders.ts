import { useState, useEffect, useCallback } from "react";
import { $axios } from "../axios/Axios";
import { useSocket } from "./useSocket";
import type { OrderData } from "../interface/interface";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await $axios.get("/orders");
       const data: OrderData[] = (Array.isArray(response.data) ? response.data : response.data.data || []).map((order: any) => ({
        ...order,
        createdAt: order.created_at, 
      }));
      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useSocket((type) => {
    if (type === "order") {
      fetchOrders();
    }
  });

  return { 
    orders, 
    loading, 
    error, 
    fetchOrders
  };
};