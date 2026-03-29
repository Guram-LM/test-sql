// pages/auth/verify-email-page/VerifyEmailPage.tsx
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useLocation, Navigate } from "react-router-dom";
import { getSchemas, type OtpSchema } from "../../../utils/validations";
import { ErrBox, SubmitBtn, AuthCard, AuthLayout } from "../../../components/ui/AuthShared";
import { OtpInput } from "../../../components/ui/OtpInput";
import { useResendOtp, useVerifyEmail } from "../../../components/hook/user/useAuthHooks";

const VerifyEmailPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { state } = useLocation();
  const email: string | undefined = state?.email;
  const { otpSchema } = getSchemas(lang);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const verify = useVerifyEmail();
  const resend = useResendOtp();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  if (!email) return <Navigate to="/register" />;

  const onSubmit = ({ otp }: OtpSchema) => verify.mutate({ email, otp });

  const handleResend = () => {
    resend.mutate({ email });
    setCountdown(60);
  };

  const serverError = verify.isError ? (verify.error as any)?.response?.data?.message : null;

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-100 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {lang === "ka" ? "კოდის შეყვანა" : "Enter code"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {lang === "ka" ? `კოდი გაიგზავნა` : `Code sent to`}{" "}
          <span className="font-medium text-gray-700">{email}</span>
        </p>
      </div>

      <AuthCard>
        {serverError && <ErrBox msg={serverError} />}
        {resend.isSuccess && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700">
            {lang === "ka" ? "კოდი ხელახლა გაიგზავნა" : "Code resent successfully"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  hasError={!!errors.otp}
                  autoFocus
                />
              )}
            />
            {errors.otp && (
              <p className="mt-2 text-xs text-red-500 text-center">{errors.otp.message}</p>
            )}
          </div>

          <SubmitBtn
            loading={verify.isPending}
            label={lang === "ka" ? "დადასტურება" : "Verify"}
            loadingLabel={lang === "ka" ? "შემოწმება..." : "Verifying..."}
          />
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-gray-500">
            {lang === "ka" ? "კოდი არ მივიღე?" : "Didn't get the code?"}{" "}
            {countdown > 0 ? (
              <span className="text-gray-400 font-medium tabular-nums">
                {countdown}{lang === "ka" ? "წმ" : "s"}
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resend.isPending}
                className="text-violet-600 hover:text-violet-700 font-medium hover:underline transition-colors disabled:opacity-60"
              >
                {resend.isPending
                  ? lang === "ka" ? "გაგზავნა..." : "Sending..."
                  : lang === "ka" ? "ხელახლა გაგზავნა" : "Resend"}
              </button>
            )}
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyEmailPage;