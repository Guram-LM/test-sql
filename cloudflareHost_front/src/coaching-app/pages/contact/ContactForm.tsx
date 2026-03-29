import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useContactForm } from "../../components/hook/useContactForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RateLimitModal from "../../components/modals/rateLimitModal/RateLimitModal";
import ErrorModal from "../../components/modals/errorModal/ErrorModal";
import SuccessModal from "../../components/modals/successModal/SuccessModal";
import { useRateLimitStore } from "../../zustand/useRateLimitStore";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { loading, submitContact } = useContactForm();
  const rateLimit = useRateLimitStore((state) => state);

  
  const [modalState, setModalState] = useState<'none' | 'rateLimit' | 'error' | 'success'>('none');
 
  const contactFormSchema = z.object({
    name: z
      .string()
      .min(2, t("contact.zodResolver.symbolquantity"))
      .regex(/^[ა-ჰa-zA-Z\s]+$/, t("contact.zodResolver.namaSymbol")),
    email: z.string().email(t("contact.zodResolver.validmail")),
    message: z.string().min(20, t("contact.zodResolver.minSymbol")),
  });

  type ContactFormData = z.infer<typeof contactFormSchema>;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContact(data);

      if (result === "success") {
        reset();
        setModalState('success'); 
      }
    } catch (err: any) {
      if (err?.response?.status === 429) {
        reset();
        setModalState('rateLimit');
      } else {
        setModalState('error'); 
      }
    }
  };

  return (
    <>
      <div className="h-full relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-stone-800 to-slate-900 p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-orange-600/20 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl lg:text-2xl font-bold mb-7 text-center text-white">
            {t("contactFormFull.title")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-lg font-bold mb-2 text-yellow-100">{t("contactFormFull.nameLabel")}</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-5 py-3.5 rounded-lg border-2 border-gray-600 bg-white/10 backdrop-blur-sm text-base text-white placeholder-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 transition-all duration-300"
                placeholder={t("contactFormFull.namePlaceholder") ?? ""}
              />
              {errors.name && <p className="text-red-400 mt-1 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-bold mb-2 text-yellow-100">{t("contactFormFull.emailLabel")}</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-5 py-3.5 rounded-lg border-2 border-gray-600 bg-white/10 backdrop-blur-sm text-base text-white placeholder-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 transition-all duration-300"
                placeholder={t("contactFormFull.emailPlaceholder") ?? ""}
              />
              {errors.email && <p className="text-red-400 mt-1 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-bold mb-2 text-yellow-100">{t("contactFormFull.messageLabel")}</label>
              <textarea
                {...register("message")}
                className="w-full px-5 py-3.5 rounded-lg border-2 border-gray-600 bg-white/10 backdrop-blur-sm text-base text-white placeholder-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 resize-none h-36 transition-all duration-300"
                placeholder={t("contactFormFull.messagePlaceholder") ?? ""}
              />
              {errors.message && <p className="text-red-400 mt-1 text-sm">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-4 rounded-lg text-lg transition-all duration-300 bg-linear-to-r from-yellow-500 to-amber-600 text-gray-900 hover:from-yellow-400 hover:to-amber-500 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-5 h-5 border-2 border-t-transparent border-gray-900 rounded-full animate-spin"></span>
                  <span>{t("contactFormFull.loading")}</span>
                </>
              ) : (
                t("contactFormFull.submitButton")
              )}
            </button>
          </form>
        </div>
      </div>

      
      {modalState === 'success' && <SuccessModal onClose={() => setModalState('none')} />}
      {modalState === 'rateLimit' && (
        <RateLimitModal
          message={rateLimit.message || "თქვენ ძალიან ხშირად აგზავნით შეტყობინებას"}
          retryAfter={rateLimit.retryAfter || 60}
          onClose={() => setModalState('none')}
        />
      )}
      {modalState === 'error' && <ErrorModal onClose={() => setModalState('none')} />}
    </>
  );
};

export default ContactForm;
