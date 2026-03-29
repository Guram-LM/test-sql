import { useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";
import type { OrderCourse, OrderData, OrderResult } from "../../interface/Interface";
import { useOrderForm } from "../../hook/useOrderForm";
import { useTranslation } from "react-i18next";

const getSchema = (t: (key: string) => string) => {
  return z.object({
    firstName: z
      .string()
      .min(2, t("OrderModal.validation.firstNameMin")) 
      .regex(/^[ა-ჰa-zA-Z]+$/, t("OrderModal.validation.firstNameLetters")),
    lastName: z
      .string()
      .min(2, t("OrderModal.validation.lastNameMin"))
      .regex(/^[ა-ჰa-zA-Z]+$/, t("OrderModal.validation.lastNameLetters")),
    email: z.string().email(t("OrderModal.validation.email")),
    phone: z
      .string()
      .regex(/^\d+$/, t("OrderModal.validation.phoneDigits"))
      .min(9, t("OrderModal.validation.phoneMin"))
      .max(12, t("OrderModal.validation.phoneMax")),
    message: z.string().optional(),
  });
};

type FormData = z.infer<ReturnType<typeof getSchema>>;

interface OrderModalProps {
  course: OrderCourse;
  onClose: () => void;

  onResult: (result: OrderResult) => void;
}

export default function OrderModal({ course, onClose, onResult }: OrderModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const { loading, submitOrder } = useOrderForm();
  const schema = getSchema(t);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      schema.parse(formData);

      const orderData: OrderData = {
        ...formData,
        courseTitle: course.title,
        coursePrice: course.price,
      };

      const result: OrderResult = await submitOrder(orderData);
      onResult(result);

    } catch (err) {
      if (err instanceof z.ZodError) {
        const formErrors: Partial<Record<keyof FormData, string>> = {};
        err.issues.forEach(issue => {
          const path = issue.path[0] as keyof FormData;
          if (path) formErrors[path] = issue.message;
        });
        setErrors(formErrors);
     
      } else {
    
        onResult({ success: false, isRateLimit: false });
      }
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm">

 
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-6 py-5">
        <div className="flex items-center justify-between max-w-2xl mx-auto w-full">

    
      <button
        onClick={onClose}
        className="md:hidden w-full h-11 rounded-full bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700
                  flex items-center justify-center transition-all duration-300 
                  hover:scale-110 shadow-md mx-auto"
      >
        <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

    
  <button
  onClick={onClose}
  className="hidden md:block relative w-14 h-14 rounded-full bg-linear-to-r from-amber-600 to-orange-600 
             hover:from-amber-700 hover:to-orange-700 
             transition-all duration-300 hover:scale-110 shadow-xl 
            items-center justify-center overflow-hidden"
>

  <svg
    className="absolute inset-0 m-auto w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

     
      <h3 className="hidden md:block text-2xl lg:text-3xl font-bold text-gray-900 text-center absolute left-1/2 -translate-x-1/2">
        {t("OrderModal.modalTitle")}
      </h3>

  
      <div className="hidden md:block w-12 h-12" />
        </div>
      </div>

    
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center px-4 py-8">
             
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-2xl shadow-2xl border border-white/20">
           <h3 className="md:hidden block text-xl mt-4 lg:text-2xl font-bold text-gray-900 text-center ">
                {t("OrderModal.modalTitle")}
              </h3>
            <div className="p-6 md:p-10">

          


              <form onSubmit={handleSubmit} className="space-y-4">

              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t("OrderModal.firstName")}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-5 rounded-2xl md:rounded-r-none border-2 text-lg font-medium 
                              bg-gray-50/80 border-gray-300 focus:border-amber-500 
                              focus:ring-4 focus:ring-amber-500/30 transition-all duration-300 
                              md:border-r-0"
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-2">! {errors.firstName}</p>}


                  <input
                    type="text"
                    name="lastName"
                    placeholder={t("OrderModal.lastName")}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-5 rounded-2xl md:rounded-l-none border-2 text-lg font-medium 
                              bg-gray-50/80 border-gray-300 focus:border-amber-500 
                              focus:ring-4 focus:ring-amber-500/30 transition-all duration-300 
                              md:-ml-px"
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-2  md:mt-2">! {errors.lastName}</p>}
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder={t("OrderModal.email")}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-5 rounded-2xl border-2 text-lg font-medium 
                           bg-gray-50/80 border-gray-300 focus:border-amber-500 
                           focus:ring-4 focus:ring-amber-500/30 transition-all duration-300"
                />
                {errors.email && <p className="text-red-600 text-sm mt-2">! {errors.email}</p>}

                <input
                  type="tel"
                  name="phone"
                  placeholder={t("OrderModal.phone")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-6 py-5 rounded-2xl border-2 text-lg font-medium 
                           bg-gray-50/80 border-gray-300 focus:border-amber-500 
                           focus:ring-4 focus:ring-amber-500/30 transition-all duration-300"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-2">! {errors.phone}</p>}

                <textarea
                  name="message"
                  placeholder={t("OrderModal.message")}
                  value={formData.message || ""}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-6 py-5 rounded-2xl border-2 border-gray-300 bg-gray-50/80 
                           text-lg font-medium focus:border-amber-500 focus:ring-4 
                           focus:ring-amber-500/30 resize-none transition-all duration-300"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mx-auto relative overflow-hidden bg-linear-to-r from-amber-600 to-orange-600 
                           hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xl py-6 
                           rounded-2xl shadow-2xl hover:shadow-amber-500/50 transform hover:scale-[1.02] 
                           transition-all duration-500 disabled:opacity-60 
                           flex items-center justify-center gap-4 group"
                >
                  <span className="relative z-10">
                    {loading ? t("OrderModal.sending") : t("OrderModal.send")}
                  </span>
                  {loading && <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />}
                  <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-2xl" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}