import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { getSchemas, type UpdateProfileSchema } from "../../../utils/validations";
import { Field, inputCls } from "../register-page/RegisterPage";
import { useMe, useUpdateProfile } from "../../../components/hook/user/useUserHooks";
import { useLogout } from "../../../components/hook/user/useAuthHooks";

const ProfilePage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { updateProfileSchema } = getSchemas(lang);

  const { data: user, isLoading, isError } = useMe();
  const updateMut = useUpdateProfile();
  const logout = useLogout();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileSchema>({ resolver: zodResolver(updateProfileSchema) });

  // fill form when user loaded
  useEffect(() => {
    if (user) reset({ firstName: user.firstName, lastName: user.lastName });
  }, [user, reset]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-red-500">
        {lang === "ka" ? "მონაცემები ვერ ჩაიტვირთა" : "Failed to load profile"}
      </div>
    );

  const onSubmit = (data: UpdateProfileSchema) => updateMut.mutate(data);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-lg mx-auto space-y-5">

        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center text-xl font-bold text-violet-600">
              {user?.firstName?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium
                ${user?.isVerified ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                {user?.isVerified
                  ? lang === "ka" ? "დადასტურებული" : "Verified"
                  : lang === "ka" ? "დაუდასტურებელი" : "Unverified"}
              </span>
            </div>
          </div>
        </div>

        {/* Edit form */}
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
              className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {updateMut.isPending
                ? lang === "ka" ? "შენახვა..." : "Saving..."
                : lang === "ka" ? "შენახვა" : "Save"}
            </button>
          </form>
        </div>

        {/* Actions */}
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
          <button
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-red-100 hover:bg-red-50 transition-colors text-sm text-red-500 disabled:opacity-60"
          >
            <span>{lang === "ka" ? "🚪 გამოსვლა" : "🚪 Log out"}</span>
            <span className="text-red-200">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;