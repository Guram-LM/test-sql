// pages/auth/register-page/RegisterPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getSchemas, type RegisterSchema } from "../../../utils/validations";
import { Field, inputCls, ErrBox, SubmitBtn, AuthCard, AuthLayout } from "../../../components/ui/AuthShared";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { useRegister } from "../../../components/hook/user/useAuthHooks";

// re-export for other files that import from here
export { Field, inputCls };

const RegisterPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { registerSchema } = getSchemas(lang);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const { mutate, isPending, isError, error } = useRegister();
  const onSubmit = (data: RegisterSchema) => mutate(data);
  const serverMessage = isError ? (error as any)?.response?.data?.message : null;

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {lang === "ka" ? "რეგისტრაცია" : "Create account"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {lang === "ka" ? "შეავსეთ ველები ანგარიშის შესაქმნელად" : "Fill in the fields to create your account"}
        </p>
      </div>

      <AuthCard>
        {serverMessage && <ErrBox msg={serverMessage} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <Field label={lang === "ka" ? "სახელი" : "First name"} error={errors.firstName?.message}>
              <input
                {...register("firstName")}
                placeholder={lang === "ka" ? "სახელი" : "First name"}
                className={inputCls(!!errors.firstName)}
              />
            </Field>
            <Field label={lang === "ka" ? "გვარი" : "Last name"} error={errors.lastName?.message}>
              <input
                {...register("lastName")}
                placeholder={lang === "ka" ? "გვარი" : "Last name"}
                className={inputCls(!!errors.lastName)}
              />
            </Field>
          </div>

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

          <Field label={lang === "ka" ? "პაროლის გამეორება" : "Confirm password"} error={errors.confirmPassword?.message}>
            <PasswordInput
              {...register("confirmPassword")}
              placeholder="••••••••"
              hasError={!!errors.confirmPassword}
            />
          </Field>

          <div className="pt-1">
            <SubmitBtn
              loading={isPending}
              label={lang === "ka" ? "რეგისტრაცია" : "Create account"}
              loadingLabel={lang === "ka" ? "გაგზავნა..." : "Sending..."}
            />
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {lang === "ka" ? "უკვე გაქვთ ანგარიში?" : "Already have an account?"}{" "}
          <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium hover:underline transition-colors">
            {lang === "ka" ? "შესვლა" : "Log in"}
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default RegisterPage;