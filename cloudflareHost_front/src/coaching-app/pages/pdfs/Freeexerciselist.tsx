import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/axiosInstance";
import { useExercises } from "../../components/hook/useExercises";
import { useCreateFreePdfDownload } from "../../components/hook/useCreateFreePdfDownload";
import type { Exercise } from "../../components/interface/Interface";
import { useInView } from "../../components/hook/useInView";
import FreeLoader from "./FreeLoader";
import FreeEmpty from "./FreeEmpty";

// ─── Download Modal ───────────────────────────────────────────────────────────
interface DownloadModalProps {
  exercise: Exercise;
  lang: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
}

function DownloadModal({ exercise, lang, onClose, onSuccess }: DownloadModalProps) {
  const { createDownload, loading } = useCreateFreePdfDownload();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });


  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useState(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    const pdfTitle = lang === "ka" ? exercise.title_ka : exercise.title_en;
    const ok = await createDownload({
      pdf_title: pdfTitle,
      firstName: values.firstName,
      lastName: values.lastName,
    });
    if (ok) {
      // Proceed with actual download
      try {
        const res = await axiosInstance.get(exercise.pdf_url, { responseType: "blob" });
        const blobUrl = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = pdfTitle;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
      } catch {
        // download failed but record was saved — still treat as success
      }
      onSuccess();
    } else {
      setServerError(lang === "ka" ? "შეცდომა მოხდა. სცადეთ თავიდან." : "Something went wrong. Please try again.");
    }
  };

  const namePattern = /^[a-zA-Zა-ჰ]{2,}$/;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(26,20,10,0.55)", backdropFilter: "blur(6px)" }}
      onClick={handleBackdrop}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-md bg-[#FFFDF8] border border-[#E0D8C4] rounded-sm overflow-hidden shadow-[0_32px_80px_rgba(26,20,10,0.35)]"
      >
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        {/* Left accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C9A84C]/30 via-[#C9A84C] to-[#C9A84C]/30" />

        <div className="pl-8 pr-7 pt-8 pb-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-[1px] bg-[#C9A84C]" />
                <span
                  className="text-[9px] tracking-[4px] uppercase text-[#C9A84C]"
                >
                  {lang === "ka" ? "ჩამოტვირთვა" : "Download"}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] leading-snug m-0">
                {lang === "ka" ? exercise.title_ka : exercise.title_en}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 mt-1 w-7 h-7 flex items-center justify-center border border-[#D4C9B0] rounded-sm text-[#9A8E7A] hover:bg-[#1A1A1A] hover:text-[#F5F0E8] hover:border-[#1A1A1A] transition-all duration-200"
              style={{fontSize: "14px" }}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-[#D4C9B0]" />

          {/* Description */}
          <p className="text-sm text-[#8A7A5A] italic leading-relaxed m-0">
            {lang === "ka"
              ? "გთხოვთ შეიყვანოთ თქვენი სახელი და გვარი ფაილის გადმოსაწერად."
              : "Please enter your name and surname to download the file."}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[9px] tracking-[3px] uppercase text-[#8A7A5A]"
              >
                {lang === "ka" ? "სახელი" : "First Name"}
              </label>
              <input
                {...register("firstName", {
                  required: lang === "ka" ? "სახელი სავალდებულოა" : "First name is required",
                  minLength: { value: 2, message: lang === "ka" ? "მინიმუმ 2 ასო" : "Minimum 2 characters" },
                  pattern: {
                    value: namePattern,
                    message: lang === "ka" ? "მხოლოდ ასოები (მინ. 2)" : "Letters only (min. 2)",
                  },
                })}
                placeholder={lang === "ka" ? "მაგ. გიორგი" : "e.g. John"}
                className={`
                  w-full px-4 py-2.5 bg-[#F5F0E8] border rounded-sm text-[15px] text-[#1A1A1A]
                  placeholder:text-[#BEB5A5] outline-none transition-all duration-200
                  focus:bg-[#FFFDF8] focus:border-[#C9A84C]
                  ${errors.firstName ? "border-[#C0392B]" : "border-[#D4C9B0]"}
                `}
              />
              {errors.firstName && (
                <span
                  className="text-[10px] text-[#C0392B] tracking-wide"
                >
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[9px] tracking-[3px] uppercase text-[#8A7A5A]"
              >
                {lang === "ka" ? "გვარი" : "Last Name"}
              </label>
              <input
                {...register("lastName", {
                  required: lang === "ka" ? "გვარი სავალდებულოა" : "Last name is required",
                  minLength: { value: 2, message: lang === "ka" ? "მინიმუმ 2 ასო" : "Minimum 2 characters" },
                  pattern: {
                    value: namePattern,
                    message: lang === "ka" ? "მხოლოდ ასოები (მინ. 2)" : "Letters only (min. 2)",
                  },
                })}
                placeholder={lang === "ka" ? "მაგ. გიორგაძე" : "e.g. Smith"}
                className={`
                  w-full px-4 py-2.5 bg-[#F5F0E8] border rounded-sm text-[15px] text-[#1A1A1A]
                  placeholder:text-[#BEB5A5] outline-none transition-all duration-200
                  focus:bg-[#FFFDF8] focus:border-[#C9A84C]
                  ${errors.lastName ? "border-[#C0392B]" : "border-[#D4C9B0]"}
                `}
              />
              {errors.lastName && (
                <span
                  className="text-[10px] text-[#C0392B] tracking-wide"
                >
                  {errors.lastName.message}
                </span>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <p
                className="text-[11px] text-[#C0392B] italic m-0"
              >
                {serverError}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-dashed border-[#D4C9B0]" />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-sm bg-[#1A1A1A] text-[#F5F0E8] border border-[#1A1A1A]
                           hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#1A1A1A]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
                style={{fontSize: "10px", letterSpacing: "2.5px" }}
              >
                <span className={`text-sm ${loading ? "animate-spin inline-block" : ""}`}>
                  {loading ? "◌" : "↓"}
                </span>
                <span className="uppercase">
                  {loading
                    ? lang === "ka" ? "იტვირთება..." : "Loading..."
                    : lang === "ka" ? "ჩამოტვირთვა" : "Download PDF"}
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-sm text-[#6B5F4A] border border-[#D4C9B0]
                           hover:bg-[#F5F0E8] hover:border-[#8A7A5A]
                           transition-all duration-200"
                style={{fontSize: "10px", letterSpacing: "2.5px" }}
              >
                <span className="uppercase">{lang === "ka" ? "გაუქმება" : "Cancel"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function FreeExerciseCard({
  exercise,
  lang,
  index,
  done,
  onDownloadClick,
}: {
  exercise: any;
  lang: string;
  index: number;
  done: boolean;
  onDownloadClick: (exercise: any) => void;
}) {
  const handleClick = () => {
    if (!exercise.pdf_url || done) return;
    onDownloadClick(exercise);
  };

  return (
    <div
      className="group relative bg-[#FFFDF8] border border-[#E8DFC8] rounded-sm
                 flex flex-col overflow-hidden
                 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,168,76,0.15)]
                 hover:border-[#C9A84C]/50
                 transition-all duration-300"
    >

      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C9A84C]/30 via-[#C9A84C] to-[#C9A84C]/30
                      group-hover:from-[#C9A84C] group-hover:via-[#E8D5A3] group-hover:to-[#C9A84C]
                      transition-all duration-300" />


      <span
        className="absolute top-5 right-5 text-[10px] text-[#C9A84C]/40 group-hover:text-[#C9A84C]/70 transition-colors duration-300"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="pl-8 pr-7 pt-7 pb-6 flex flex-col gap-3 flex-grow">

        <span
          className="text-[9px] tracking-[4px] uppercase text-[#7A9A6A] bg-[#EEF5E8]
                     border border-[#C5DFB0] px-3 py-1 rounded-sm w-fit"
        >
          {lang === "ka" ? "უფასო" : "Free"}
        </span>

        <h3 className="text-[21px] font-semibold text-[#1A1A1A] leading-snug m-0
                       group-hover:text-[#8A6A2A] transition-colors duration-300">
          {lang === "ka" ? exercise.title_ka : exercise.title_en}
        </h3>


        <p className="text-sm text-[#6B5F4A] leading-relaxed m-0 flex-grow font-light">
          {lang === "ka" ? exercise.description_ka : exercise.description_en}
        </p>

        {exercise.pdf_url && (
          <>
            <div className="border-t border-dashed border-[#D4C9B0] mt-1" />

            <button
              onClick={handleClick}
              className={`
                flex items-center gap-2.5 w-fit px-5 py-2.5 rounded-sm
                transition-all duration-200
                ${done
                  ? "bg-[#EEF5E8] text-[#5A8A4A] border border-[#C5DFB0]"
                  : "bg-transparent text-[#1A1A1A] border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F5F0E8] hover:border-[#1A1A1A]"
                }
              `}
              style={{fontSize: "10px", letterSpacing: "2.5px" }}
            >
              <span className="text-sm">{done ? "✓" : "↓"}</span>
              <span className="uppercase">
                {done
                  ? lang === "ka" ? "ჩამოიტვირთა" : "Downloaded"
                  : lang === "ka" ? "ჩამოტვირთვა" : "Download PDF"}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}


const FreeExerciseList = () => {
  const { ref, isVisible } = useInView();
  const { data, isLoading, isError } = useExercises(isVisible);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [modalExercise, setModalExercise] = useState<any | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<number>>(new Set());

  const handleDownloadSuccess = () => {
    if (modalExercise) {
      setDownloadedIds((prev) => new Set(prev).add(modalExercise.id));
    }
    setModalExercise(null);
  };

  return (
    <div
      ref={ref}
      className=" bg-[#F5F0E8]"
    >

      {modalExercise && (
        <DownloadModal
          exercise={modalExercise}
          lang={lang}
          onClose={() => setModalExercise(null)}
          onSuccess={handleDownloadSuccess}
        />
      )}

      <div className="relative overflow-hidden bg-[#FFFDF8] border-b border-[#E0D8C4]">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#F5E8C8/40,transparent_60%)]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-[#C9A84C]/12" />
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full border border-[#C9A84C]/12" />
        <div className="absolute top-8 right-32 w-32 h-32 rounded-full border border-[#C9A84C]/10" />

        <div className="relative z-10 max-w-6xl mx-auto px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-[#C9A84C]" />
                <span
                  className="text-[10px] tracking-[5px] uppercase text-[#C9A84C]"
                >
                  {lang === "ka" ? "სავარჯიშოების ბიბლიოთეკა" : "Exercise library"}
                </span>
              </div>

              <h2
                className="text-2xl md:text-4xl  font-semibold text-[#1A1A1A] italic "
              >
                {lang === "ka" ? "უფასო" : "Free"}
                <br />
                <em className="text-[#C9A84C] italic font-semibold"> {lang === "ka" ? "სავარჯიშოები" : "Exercises"}</em>
              </h2>

              <p className="text-[#8A7A5A] text-base m-0 max-w-md leading-relaxed italic">
                {lang === "ka"
                  ? "პროფესიონალური სავარჯიშო მასალები — ყველასთვის ხელმისაწვდომი, სრულიად უფასო."
                  : "Professional exercise materials — accessible to everyone, completely free."}
              </p>
            </div>

            {!isLoading && data && data.length > 0 && (
              <div className="flex-shrink-0 flex items-center gap-3 border border-[#C9A84C]/30 rounded-sm px-5 py-3 bg-[#FFFDF8]">
                <span
                  className="text-3xl font-light text-[#C9A84C]"
                >
                  {data.length}
                </span>
                <div className="w-[1px] h-6 bg-[#C9A84C]/30" />
                <span
                  className="text-[9px] tracking-[3px] uppercase text-[#8A7A5A]"
                >
                  {lang === "ka" ? "სავარჯიშო" : "exercises"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F5F0E8] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-10 py-12">
        {isLoading ? (
          <FreeLoader/>
        ) : isError ? (
          <FreeEmpty/>
        ) : !data || data.length === 0 ? (
          <FreeEmpty/>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-grow h-[1px] bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
             
              <div className="flex-grow h-[1px] bg-gradient-to-l from-[#C9A84C]/40 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((exercise, i) => (
                <FreeExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  lang={lang}
                  index={i}
                  done={downloadedIds.has(exercise.id)}
                  onDownloadClick={setModalExercise}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-10 pb-16 flex items-center gap-3">
        <div className="flex-grow h-[1px] bg-[#D4C9B0]" />
        <span
          className="text-[12px] tracking-[3px] uppercase text-[#B0A090]"
        >
           {lang === "ka" ? "✦ ყველა მასალა უფასოა ✦" : "✦ All materials are free ✦"}
        </span>
        <div className="flex-grow h-[1px] bg-[#D4C9B0]" />
      </div>
    </div>
  );
};

export default FreeExerciseList;