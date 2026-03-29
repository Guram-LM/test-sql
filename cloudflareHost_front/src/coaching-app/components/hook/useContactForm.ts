import { useState } from "react";
import { sendContactMessage } from "../../services/contactApi";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submitContact = async (data: ContactData) => {
    setLoading(true);
    setStatus("idle");
    try {
      await sendContactMessage(data);
      setStatus("success");
      return "success";
    } catch (error: any) {
      setStatus("error");
      
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  return { loading, status, submitContact };
};
