import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { forgotPassword, loginUser, logoutUser, registerUser, resendOtp, resetPassword, verifyEmail, verifyResetCode } from "../../../services/auth/api";
import type { ForgotPasswordInput, LoginInput, RegisterInput, ResendOtpInput, ResetPasswordInput, VerifyEmailInput, VerifyResetCodeInput } from "../../interface/Interface";
import { useAuthStore } from "../../../zustand/useAuthStore";


// ─── REGISTER ────────────────────────────────────────────────────
export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
    onSuccess: (_data, variables) => {
      // email-ს გადავცემთ verify გვერდზე
      navigate("/verify-email", { state: { email: variables.email } });
    },
  });
};

// ─── VERIFY EMAIL ────────────────────────────────────────────────
export const useVerifyEmail = () => {
  const setToken = useAuthStore((s) => s.setAccessToken);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: VerifyEmailInput) => verifyEmail(data),
    onSuccess: (data) => {
      if (data.accessToken) {
        setToken(data.accessToken);
        navigate("/profile");
      }
    },
  });
};

// ─── RESEND OTP ──────────────────────────────────────────────────
export const useResendOtp = () =>
  useMutation({
    mutationFn: (data: ResendOtpInput) => resendOtp(data),
  });

// ─── LOGIN ───────────────────────────────────────────────────────
export const useLogin = () => {
  const setToken = useAuthStore((s) => s.setAccessToken);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate("/profile");
    },
  });
};

// ─── LOGOUT ──────────────────────────────────────────────────────
export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      navigate("/login");
    },
    onError: () => {
      // logout locally even if server fails
      clearAuth();
      navigate("/login");
    },
  });
};

// ─── FORGOT PASSWORD ─────────────────────────────────────────────
export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: ForgotPasswordInput) => forgotPassword(data),
  });

// ─── VERIFY RESET CODE ───────────────────────────────────────────
export const useVerifyResetCode = () =>
  useMutation({
    mutationFn: (data: VerifyResetCodeInput) => verifyResetCode(data),
  });

// ─── RESET PASSWORD ──────────────────────────────────────────────
export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPassword(data),
    onSuccess: () => {
      navigate("/login", { 
        state: { successMessage: "პაროლი წარმატებით შეიცვალა! შეგიძლიათ შეხვიდეთ." } 
      });
    },
  });
};