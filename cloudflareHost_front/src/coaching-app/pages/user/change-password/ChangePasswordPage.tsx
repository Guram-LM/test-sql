// pages/auth/change-password-page/ChangePasswordPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../zustand/useAuthStore";
import { getSchemas, type ChangePasswordSchema } from "../../../utils/validations";
import { Field, ErrBox, AuthCard, AuthLayout } from "../../../components/ui/AuthShared";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { useChangePassword } from "../../../components/hook/user/useUserHooks";

const ChangePasswordPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { changePasswordSchema } = getSchemas(lang);
  const navigate  = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({ resolver: zodResolver(changePasswordSchema) });

  const { mutate, isPending, isError, isSuccess, error } = useChangePassword();

  const onSubmit = (data: ChangePasswordSchema) =>
    mutate(data, {
      onSuccess: () => {
        setTimeout(() => {
          clearAuth();
          navigate("/login");
        }, 1500);
      },
    });

  const serverMessage = isError ? (error as any)?.response?.data?.message : null;

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {lang === "ka" ? "პაროლის შეცვლა" : "Change password"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {lang === "ka"
            ? "შეცვლის შემდეგ ყველა სესია დაიხურება"
            : "All sessions will be revoked after change"}
        </p>
      </div>

      <AuthCard>
        {serverMessage && <ErrBox msg={serverMessage} />}
        {isSuccess && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            {lang === "ka" ? "პაროლი შეიცვალა. გადამისამართება..." : "Password changed. Redirecting..."}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field
            label={lang === "ka" ? "ძველი პაროლი" : "Current password"}
            error={errors.oldPassword?.message}
          >
            <PasswordInput
              {...register("oldPassword")}
              placeholder="••••••••"
              hasError={!!errors.oldPassword}
            />
          </Field>

          <Field
            label={lang === "ka" ? "ახალი პაროლი" : "New password"}
            error={errors.newPassword?.message}
          >
            <PasswordInput
              {...register("newPassword")}
              placeholder="••••••••"
              hasError={!!errors.newPassword}
            />
          </Field>

          <Field
            label={lang === "ka" ? "პაროლის გამეორება" : "Confirm new password"}
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              {...register("confirmPassword")}
              placeholder="••••••••"
              hasError={!!errors.confirmPassword}
            />
          </Field>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isPending || isSuccess}
              className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-150 flex items-center justify-center gap-2"
            >
              {isPending && (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              )}
              {isPending
                ? lang === "ka" ? "შეცვლა..." : "Changing..."
                : lang === "ka" ? "პაროლის შეცვლა" : "Change password"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link
            to="/profile"
            className="text-violet-600 hover:text-violet-700 font-medium hover:underline transition-colors"
          >
            ← {lang === "ka" ? "პროფილი" : "Profile"}
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default ChangePasswordPage;