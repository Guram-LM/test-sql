import { useState, useEffect, useCallback } from "react";
import { $axios } from "../axios/Axios";
import { useSocket } from "./useSocket"; 

export const useContacts = () => {
  const [contacts, setContacts] = useState<{id:number, name:string, email:string, message:string, created_at:string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await $axios.get("/contacts"); 
      setContacts(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useSocket((type) => {
    if (type === "contact") {
      fetchContacts();
    }
  });

  return { contacts, loading, error, fetchContacts };
};