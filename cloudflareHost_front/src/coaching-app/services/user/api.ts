import axios from "../axiosInstance";
import type {
  MeResponse,
  UpdateProfileInput,
  ChangePasswordInput,
} from "../../components/interface/Interface";

export const getMe = async (): Promise<MeResponse> => {
  const res = await axios.get("/user/me");
  return res.data;
};

export const updateProfile = async (data: UpdateProfileInput) => {
  const res = await axios.put("/user/update", data);
  return res.data;
};

export const changePassword = async (data: ChangePasswordInput) => {
  const res = await axios.post("/user/change-password", data);
  return res.data;
};