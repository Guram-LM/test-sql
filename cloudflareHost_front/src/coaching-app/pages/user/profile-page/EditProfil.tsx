import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { getSchemas, type UpdateProfileSchema } from "../../../utils/validations";
import { Field, inputCls } from "../register-page/RegisterPage";
import { useMe, useUpdateProfile } from "../../../components/hook/user/useUserHooks";

const EditProfil = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { updateProfileSchema } = getSchemas(lang);

  const { data: user } = useMe();
  const updateMut = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileSchema>({ resolver: zodResolver(updateProfileSchema) });

  useEffect(() => {
    if (user) reset({ firstName: user.firstName, lastName: user.lastName });
  }, [user, reset]);



  const onSubmit = (data: UpdateProfileSchema) => updateMut.mutate(data);

  return (
    <div className="bg-gray-50 px-4 py-12">
      <div className="max-w-lg mx-auto space-y-5">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-5">
            {lang === "ka" ? "პროფილის რედაქტირება" : "Edit profile"}
          </h2>

          {updateMut.isSuccess && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-600">
              {lang === "ka" ? "პროფილი განახლდა" : "Profile updated"}
            </div>
          )}
          {updateMut.isError && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {(updateMut.error as any)?.response?.data?.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <Field label={lang === "ka" ? "სახელი" : "First name"} error={errors.firstName?.message}>
                <input {...register("firstName")} className={inputCls(!!errors.firstName)} />
              </Field>
              <Field label={lang === "ka" ? "გვარი" : "Last name"} error={errors.lastName?.message}>
                <input {...register("lastName")} className={inputCls(!!errors.lastName)} />
              </Field>
            </div>
            <button
              type="submit"
              disabled={!isDirty || updateMut.isPending}
              className="w-full bg-[#B8860B] hover:bg-[#D4A017] active:scale-95 text-white px-8 py-3.5 rounded-2xl text-sm tracking-widest transition-all"
            >
              {updateMut.isPending
                ? lang === "ka" ? "შენახვა..." : "Saving..."
                : lang === "ka" ? "შენახვა" : "Save"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            {lang === "ka" ? "ანგარიშის მართვა" : "Account"}
          </h2>
          <Link
            to="/change-password"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition-colors text-sm text-gray-700"
          >
            <span>{lang === "ka" ? "🔒 პაროლის შეცვლა" : "🔒 Change password"}</span>
            <span className="text-gray-300">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default EditProfil;