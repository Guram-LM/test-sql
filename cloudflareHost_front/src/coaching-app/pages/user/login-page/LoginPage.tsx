// pages/auth/login-page/LoginPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { getSchemas, type LoginSchema } from "../../../utils/validations";
import { Field, inputCls, ErrBox, SubmitBtn, AuthCard, AuthLayout, SuccessBox } from "../../../components/ui/AuthShared";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { useLogin } from "../../../components/hook/user/useAuthHooks";

const LoginPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { loginSchema } = getSchemas(lang);

  const { state } = useLocation();
  const successMessage = state?.successMessage;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const { mutate, isPending, isError, error } = useLogin();
  const onSubmit = (data: LoginSchema) => mutate(data);
  const serverMessage = isError ? (error as any)?.response?.data?.message : null;

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {lang === "ka" ? "შესვლა" : "Log in"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {lang === "ka" ? "შეიყვანეთ თქვენი მონაცემები" : "Enter your credentials"}
        </p>
      </div>

      <AuthCard>
        {successMessage && <SuccessBox msg={successMessage} />}
        {serverMessage && <ErrBox msg={serverMessage} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field label={lang === "ka" ? "ელ.ფოსტა" : "Email"} error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={inputCls(!!errors.email)}
            />
          </Field>

          <Field label={lang === "ka" ? "პაროლი" : "Password"} error={errors.password?.message}>
            <PasswordInput
              {...register("password")}
              placeholder="••••••••"
              hasError={!!errors.password}
            />
          </Field>

          <div className="flex justify-end -mt-1">
            <Link to="/forgot-password" className="text-xs text-violet-600 hover:text-violet-700 hover:underline transition-colors">
              {lang === "ka" ? "პაროლი დამავიწყდა?" : "Forgot password?"}
            </Link>
          </div>

          <SubmitBtn
            loading={isPending}
            label={lang === "ka" ? "შესვლა" : "Log in"}
            loadingLabel={lang === "ka" ? "შესვლა..." : "Logging in..."}
          />
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {lang === "ka" ? "ანგარიში არ გაქვთ?" : "No account?"}{" "}
          <Link to="/register" className="text-violet-600 hover:text-violet-700 font-medium hover:underline transition-colors">
            {lang === "ka" ? "რეგისტრაცია" : "Register"}
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;