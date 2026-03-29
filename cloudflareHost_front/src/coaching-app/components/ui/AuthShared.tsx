// components/ui/AuthShared.tsx
import { type ReactNode } from "react";

/* ─── inputCls ─────────────────────────────────────────────────── */
export const inputCls = (hasError = false) =>
  [
    "w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all duration-150 bg-gray-50",
    hasError
      ? "border-red-300 bg-red-50 focus:border-red-400 focus:bg-white"
      : "border-gray-200 focus:border-violet-400 focus:bg-white focus:shadow-sm focus:shadow-violet-100",
  ].join(" ");

/* ─── Field ────────────────────────────────────────────────────── */
export const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide">
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {error}
      </p>
    )}
  </div>
);

/* ─── ErrBox ────────────────────────────────────────────────────── */
export const ErrBox = ({ msg }: { msg?: string }) =>
  msg ? (
    <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 flex items-start gap-2">
      <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {msg}
    </div>
  ) : null;

/* ─── SuccessBox ─────────────────────────────────────────────────── */
export const SuccessBox = ({ msg }: { msg: string }) => (
  <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700 flex items-start gap-2">
    <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    {msg}
  </div>
);

/* ─── SubmitBtn ─────────────────────────────────────────────────── */
export const SubmitBtn = ({
  loading,
  label,
  loadingLabel,
  disabled,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
  disabled?: boolean;
}) => (
  <button
    type="submit"
    disabled={loading || disabled}
    className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-150 flex items-center justify-center gap-2"
  >
    {loading && (
      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
    )}
    {loading ? loadingLabel : label}
  </button>
);

/* ─── AuthCard ──────────────────────────────────────────────────── */
export const AuthCard = ({ children }: { children: ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-sm shadow-gray-200 border border-gray-100 p-8">
    {children}
  </div>
);

/* ─── AuthLayout ────────────────────────────────────────────────── */
export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <div className="w-full max-w-sm">{children}</div>
  </div>
);

/* ─── StepIndicator ─────────────────────────────────────────────── */
const STEPS = ["email", "code", "reset"] as const;
export const StepIndicator = ({ step }: { step: typeof STEPS[number] }) => {
  const idx = STEPS.indexOf(step);
  return (
    <div className="flex items-center justify-center gap-2 mb-7">
      {STEPS.map((s, i) => {
        const done = idx > i;
        const active = idx === i;
        return (
          <div key={s} className="flex items-center gap-2">
            <div
              className={[
                "w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-300",
                active
                  ? "bg-violet-600 text-white shadow-md shadow-violet-200 scale-110"
                  : done
                  ? "bg-violet-100 text-violet-600"
                  : "bg-gray-100 text-gray-400",
              ].join(" ")}
            >
              {done ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < 2 && (
              <div
                className={[
                  "w-8 h-px transition-all duration-300",
                  done ? "bg-violet-300" : "bg-gray-200",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};