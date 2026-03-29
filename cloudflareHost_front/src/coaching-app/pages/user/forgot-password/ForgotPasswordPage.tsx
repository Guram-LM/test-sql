// pages/auth/forgot-password-page/ForgotPasswordPage.tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  getSchemas,
  type ForgotSchema,
  type OtpSchema,
  type ResetSchema,
} from "../../../utils/validations";
import {
  Field, inputCls, ErrBox, SuccessBox, SubmitBtn,
  AuthCard, AuthLayout, StepIndicator,
} from "../../../components/ui/AuthShared";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { OtpInput } from "../../../components/ui/OtpInput";
import {
  useForgotPassword,
  useResetPassword,
  useVerifyResetCode,
} from "../../../components/hook/user/useAuthHooks";

type Step = "email" | "code" | "reset";

const ForgotPasswordPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { forgotSchema, otpSchema, resetSchema } = getSchemas(lang);

  const [step, setStep]   = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode]   = useState("");   // saved after step 2 verify

  /* ── Step 1 ─────────────────────────────────────────────────── */
  const emailForm = useForm<ForgotSchema>({ resolver: zodResolver(forgotSchema) });
  const forgotMut = useForgotPassword();

  /* ── Step 2 ─────────────────────────────────────────────────── */
  const codeForm  = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });
  const verifyMut = useVerifyResetCode();

  /* ── Step 3 ─────────────────────────────────────────────────── */
  // resetSchema no longer has 'code' field — only newPassword + confirmPassword
  const resetForm = useForm<ResetSchema>({
    resolver: zodResolver(resetSchema),
  });
  const resetMut  = useResetPassword();

  /* ── Handlers ───────────────────────────────────────────────── */
  const onSendCode = (d: ForgotSchema) => {
    setEmail(d.email);
    forgotMut.mutate(d, { onSuccess: () => setStep("code") });
  };

  const onVerifyCode = (d: OtpSchema) => {
    verifyMut.mutate(
      { email, code: d.otp },
      {
        onSuccess: () => {
          setCode(d.otp);   // save verified code for step 3
          setStep("reset");
        },
      }
    );
  };

  const onReset = (d: ResetSchema) => {
    resetMut.mutate({
      email,
      code,                 // from state — not from form
      newPassword:     d.newPassword,
      confirmPassword: d.confirmPassword,
    });
  };

  /* ── Titles ─────────────────────────────────────────────────── */
  const title = {
    email: { ka: "პაროლის აღდგენა", en: "Reset password" },
    code:  { ka: "კოდის შეყვანა",   en: "Enter code" },
    reset: { ka: "ახალი პაროლი",    en: "New password" },
  }[step];

  return (
    <AuthLayout>
      <StepIndicator step={step} />

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {lang === "ka" ? title.ka : title.en}
        </h1>
      </div>

      <AuthCard>

        {/* ── STEP 1 — Email ──────────────────────────────────── */}
        {step === "email" && (
          <>
            {forgotMut.isError && (
              <ErrBox msg={(forgotMut.error as any)?.response?.data?.message} />
            )}
            <form onSubmit={emailForm.handleSubmit(onSendCode)} className="space-y-5" noValidate>
              <Field
                label={lang === "ka" ? "ელ.ფოსტა" : "Email"}
                error={emailForm.formState.errors.email?.message}
              >
                <input
                  {...emailForm.register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={inputCls(!!emailForm.formState.errors.email)}
                />
              </Field>
              <SubmitBtn
                loading={forgotMut.isPending}
                label={lang === "ka" ? "კოდის გაგზავნა" : "Send code"}
                loadingLabel={lang === "ka" ? "გაგზავნა..." : "Sending..."}
              />
            </form>
          </>
        )}

        {/* ── STEP 2 — OTP Code ───────────────────────────────── */}
        {step === "code" && (
          <>
            <p className="text-sm text-gray-500 text-center mb-6">
              {lang === "ka" ? "კოდი გაიგზავნა" : "Code sent to"}{" "}
              <span className="font-medium text-gray-700">{email}</span>
            </p>
            {verifyMut.isError && (
              <ErrBox msg={(verifyMut.error as any)?.response?.data?.message} />
            )}
            <form onSubmit={codeForm.handleSubmit(onVerifyCode)} className="space-y-6" noValidate>
              <div>
                <Controller
                  name="otp"
                  control={codeForm.control}
                  render={({ field }) => (
                    <OtpInput
                      value={field.value}
                      onChange={field.onChange}
                      hasError={!!codeForm.formState.errors.otp}
                      autoFocus
                    />
                  )}
                />
                {codeForm.formState.errors.otp && (
                  <p className="mt-2 text-xs text-red-500 text-center">
                    {codeForm.formState.errors.otp.message}
                  </p>
                )}
              </div>
              <SubmitBtn
                loading={verifyMut.isPending}
                label={lang === "ka" ? "შემოწმება" : "Verify"}
                loadingLabel={lang === "ka" ? "შემოწმება..." : "Verifying..."}
              />
            </form>
            <button
              onClick={() => setStep("email")}
              className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← {lang === "ka" ? "უკან" : "Back"}
            </button>
          </>
        )}

        {/* ── STEP 3 — New password ───────────────────────────── */}
        {step === "reset" && (
          <>
            {resetMut.isError && (
              <ErrBox msg={(resetMut.error as any)?.response?.data?.message} />
            )}
            {resetMut.isSuccess && (
              <SuccessBox
                msg={lang === "ka"
                  ? "პაროლი შეიცვალა! შეგიძლიათ შეხვიდეთ."
                  : "Password changed! You can now log in."}
              />
            )}
            {!resetMut.isSuccess && (
              <form onSubmit={resetForm.handleSubmit(onReset)} className="space-y-4" noValidate>
                <Field
                  label={lang === "ka" ? "ახალი პაროლი" : "New password"}
                  error={resetForm.formState.errors.newPassword?.message}
                >
                  <PasswordInput
                    {...resetForm.register("newPassword")}
                    placeholder="••••••••"
                    hasError={!!resetForm.formState.errors.newPassword}
                  />
                </Field>
                <Field
                  label={lang === "ka" ? "პაროლის გამეორება" : "Confirm password"}
                  error={resetForm.formState.errors.confirmPassword?.message}
                >
                  <PasswordInput
                    {...resetForm.register("confirmPassword")}
                    placeholder="••••••••"
                    hasError={!!resetForm.formState.errors.confirmPassword}
                  />
                </Field>
                <div className="pt-1">
                  <SubmitBtn
                    loading={resetMut.isPending}
                    label={lang === "ka" ? "შეცვლა" : "Change password"}
                    loadingLabel={lang === "ka" ? "შეცვლა..." : "Changing..."}
                  />
                </div>
              </form>
            )}
          </>
        )}

        {!resetMut.isSuccess && (
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link
              to="/login"
              className="text-violet-600 hover:text-violet-700 font-medium hover:underline transition-colors"
            >
              ← {lang === "ka" ? "შესვლა" : "Log in"}
            </Link>
          </p>
        )}
        {resetMut.isSuccess && (
          <p className="text-center mt-4">
            <Link
              to="/login"
              className="text-sm text-violet-600 hover:text-violet-700 font-medium hover:underline transition-colors"
            >
              {lang === "ka" ? "შესვლის გვერდი →" : "Go to login →"}
            </Link>
          </p>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;