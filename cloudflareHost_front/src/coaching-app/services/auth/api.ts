import axios from "../axiosInstance";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
  VerifyEmailInput,
  ResendOtpInput,
  ForgotPasswordInput,
  VerifyResetCodeInput,
  ResetPasswordInput,
} from "../../components/interface/Interface";

export const registerUser = async (data: RegisterInput) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};

export const verifyEmail = async (data: VerifyEmailInput) => {
  const res = await axios.post("/auth/verify-email", data);
  return res.data as AuthResponse;
};

export const resendOtp = async (data: ResendOtpInput) => {
  const res = await axios.post("/auth/resend-otp", data);
  return res.data;
};

export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const res = await axios.post("/auth/refresh");
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post("/auth/logout");
  return res.data;
};

export const forgotPassword = async (data: ForgotPasswordInput) => {
  const res = await axios.post("/auth/forgot-password", data);
  return res.data;
};

export const verifyResetCode = async (data: VerifyResetCodeInput) => {
  const res = await axios.post("/auth/verify-reset-code", data);
  return res.data;
};

export const resetPassword = async (data: ResetPasswordInput) => {
  const res = await axios.post("/auth/reset-password", data);
  return res.data;
};