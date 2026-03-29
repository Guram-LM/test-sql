// components/ui/OtpInput.tsx
import { useRef, useState, useEffect } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
  autoFocus?: boolean;
}

export const OtpInput = ({
  length = 6,
  value,
  onChange,
  hasError = false,
  autoFocus = true,
}: OtpInputProps) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [focused, setFocused] = useState<number | null>(autoFocus ? 0 : null);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      const next = value.split("");
      next[i] = "";
      onChange(next.join(""));
      return;
    }
    // handle paste
    if (raw.length > 1) {
      const pasted = raw.slice(0, length);
      const arr = Array.from({ length }, (_, j) => pasted[j] ?? "");
      onChange(arr.join(""));
      const nextIdx = Math.min(pasted.length, length - 1);
      refs.current[nextIdx]?.focus();
      setFocused(nextIdx);
      return;
    }
    const next = value.split("");
    next[i] = raw;
    onChange(next.join(""));
    if (i < length - 1) {
      refs.current[i + 1]?.focus();
      setFocused(i + 1);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        const next = value.split("");
        next[i] = "";
        onChange(next.join(""));
      } else if (i > 0) {
        refs.current[i - 1]?.focus();
        setFocused(i - 1);
        const next = value.split("");
        next[i - 1] = "";
        onChange(next.join(""));
      }
    }
    if (e.key === "ArrowLeft" && i > 0) {
      refs.current[i - 1]?.focus();
      setFocused(i - 1);
    }
    if (e.key === "ArrowRight" && i < length - 1) {
      refs.current[i + 1]?.focus();
      setFocused(i + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const arr = Array.from({ length }, (_, j) => pasted[j] ?? "");
    onChange(arr.join(""));
    const nextIdx = Math.min(pasted.length, length - 1);
    refs.current[nextIdx]?.focus();
    setFocused(nextIdx);
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={() => setFocused(i)}
          onBlur={() => setFocused(null)}
          className={[
            "w-11 h-14 text-center text-xl font-semibold rounded-xl border-2 outline-none transition-all duration-150 bg-gray-50",
            hasError
              ? "border-red-400 bg-red-50 text-red-600 shake"
              : focused === i
              ? "border-violet-500 bg-white shadow-md shadow-violet-100 scale-105"
              : digit
              ? "border-violet-300 bg-white text-gray-900"
              : "border-gray-200 text-gray-900",
          ].join(" ")}
        />
      ))}
    </div>
  );
};