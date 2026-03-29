import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";

interface CreateDownloadPayload {
  pdf_title: string;
  firstName: string;
  lastName: string;
}

export const useCreateFreePdfDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createDownload = async (payload: CreateDownloadPayload) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

    await axiosInstance.post("/public/free_pdf_downloads", payload);

      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to save download"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createDownload,
    loading,
    error,
    success,
  };
};