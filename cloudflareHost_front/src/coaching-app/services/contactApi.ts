import axiosInstance from "./axiosInstance";

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  const response = await axiosInstance.post("/contact", data);
  return response.data;
};
