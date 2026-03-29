import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../services/axiosInstance";
import { usePaidPdfs } from "../../components/hook/usePaidPdfs";
import type { PaidPdf } from "../../components/interface/Interface";
import { useInView } from "../../components/hook/useInView";
import PaidLoader from "./PaidLoader";
import PaidEmpty from "./PaidEmpty";

const TELEGRAM_LINK = "https://t.me/+995555565464";

// ─── Telegram SVG Icon ────────────────────────────────────────────────────────
function TelegramIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.77l-1.68 7.92c-.125.558-.455.695-.92.433l-2.54-1.873-1.225 1.18c-.135.135-.25.25-.513.25l.183-2.588 4.713-4.258c.205-.183-.045-.283-.318-.1L8.18 14.498l-2.5-.78c-.543-.17-.553-.543.113-.803l9.745-3.758c.453-.163.85.11.392.613z"
        fill={color}
      />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface ModalState {
  id: number | null;
  title: string;
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function CodeModal({ modal, lang, onClose }: { modal: ModalState; lang: string; onClose: () => void }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!modal.id) return;

    const stored = localStorage.getItem(`pdf_block_${modal.id}`);
    if (stored) {
      const time = Number(stored);
      if (time > Date.now()) {
        setBlockedUntil(time);
      } else {
        localStorage.removeItem(`pdf_block_${modal.id}`);
      }
    }
  }, [modal.id]);

  useEffect(() => {
    if (!blockedUntil) return;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((blockedUntil - Date.now()) / 1000));
      setTimeLeft(diff);

      if (diff <= 0) {
        setBlockedUntil(null);
        setAttemptsLeft(3);
        localStorage.removeItem(`pdf_block_${modal.id}`);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blockedUntil, modal.id]);

  const isBlocked = blockedUntil !== null && Date.now() < blockedUntil;

  const handleVerify = async () => {
    if (!modal.id || loading || !code.trim()) return;
    if (isBlocked) return;

    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post(
        `/pdf/paid-pdfs/${modal.id}/verify`,
        { code }
      );

      if (res.data?.success && res.data?.url) {
        const response = await fetch(res.data.url);
        const blob = await response.blob();
      
        const url = window.URL.createObjectURL(blob);
      
        const link = document.createElement("a");
        link.href = url;
        link.download = `premium-${modal.id}.pdf`;
        document.body.appendChild(link);
        link.click();
      
        link.remove();
        window.URL.revokeObjectURL(url);
      
        onClose();
      }
    } catch (err: any) {
      if (err.response?.status === 403) {
        const blockTime = Date.now() + 30 * 60 * 1000;
        setBlockedUntil(blockTime);
        localStorage.setItem(`pdf_block_${modal.id}`, blockTime.toString());
        setError(lang === "ka" ? "დაბლოკილია 30 წუთით" : "Blocked for 30 minutes.");
        return;
      }

      const newAttempts = attemptsLeft - 1;

      if (newAttempts <= 0) {
        const blockTime = Date.now() + 30 * 60 * 1000;
        setBlockedUntil(blockTime);
        localStorage.setItem(`pdf_block_${modal.id}`, blockTime.toString());
        setError(
          lang === "ka"
            ? "3 არასწორი მცდელობა. დაბლოკილია 30 წუთით."
            : "3 incorrect attempts. Blocked for 30 minutes."
        );
      } else {
        setAttemptsLeft(newAttempts);
        setError(
          lang === "ka"
            ? `არასწორი კოდი. დაგრჩათ ${newAttempts} მცდელობა.`
            : `Incorrect code. ${newAttempts} attempt(s) left.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-[#F5F0E8] border border-[#C9A84C] rounded-sm w-105 max-w-[92vw] relative overflow-hidden"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C]" />

        <div className="p-10 pb-6">
          <p
            className="text-[10px] tracking-[4px] uppercase text-[#C9A84C] mb-2"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Premium Access
          </p>

          <h3 className="text-2xl font-semibold text-[#1A1A1A] m-0 mb-1.5 leading-snug">
            {modal.title}
          </h3>

          <p className="text-sm text-[#6B5F4A] italic m-0 mb-7">
            {lang === "ka" ? "შეიყვანეთ წვდომის კოდი" : "Enter your access code"}
          </p>

          {!isBlocked && (
            <p
              className="text-[11px] text-[#1A1A1A] mb-3"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {lang === "ka" ? `დაგრჩათ ${attemptsLeft} მცდელობა` : `${attemptsLeft} attempt(s) left`}
            </p>
          )}

          {isBlocked && (
            <p
              className="text-[11px] text-red-600 mb-3"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {lang === "ka"
                ? `დაბლოკილია. სცადეთ ისევ ${timeLeft} წამში.`
                : `Blocked. Try again in ${timeLeft}s.`}
            </p>
          )}

          {error && (
            <p
              className="text-[11px] text-red-600 mb-3 tracking-wide"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              ✗ {error}
            </p>
          )}

          <input
            ref={inputRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="· · · · · · · ·"
            maxLength={32}
            disabled={isBlocked}
            className="w-full border border-[#C9A84C] bg-[#FFFDF7] rounded-sm
                       px-4 py-3.5 text-center text-[#1A1A1A] mb-5
                       focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40
                       placeholder-[#C9A84C]/40"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "16px",
              letterSpacing: "6px",
            }}
          />

          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={onClose}
              className="border border-[#D4C9B0] text-[#6B5F4A] px-5 py-3 rounded-sm
                         hover:bg-[#EAE4D8] transition-colors duration-200"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "2px" }}
            >
              {lang === "ka" ? "გაუქმება" : "CANCEL"}
            </button>

            <button
              onClick={handleVerify}
              disabled={loading || isBlocked}
              className="bg-[#1A1A1A] text-[#C9A84C] font-bold px-6 py-3 rounded-sm
                         hover:bg-[#3A3028] disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-200"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "2px" }}
            >
              {loading ? "..." : lang === "ka" ? "↓ ჩამოტვირთვა " : "↓ Download"}
            </button>
          </div>
        </div>

        <button
          onClick={() => window.open(TELEGRAM_LINK, "_blank")}
          className="w-full flex items-center justify-between gap-3 px-10 py-4
                     bg-[#1A1A1A] hover:bg-[#229ED9]
                     transition-colors duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full bg-[#229ED9] group-hover:bg-white/20
                          flex items-center justify-center transition-colors duration-300 shrink-0"
            >
              <TelegramIcon size={16} color="#fff" />
            </div>
            <span
              className="text-[#9A9080] group-hover:text-white text-sm italic transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {lang === "ka"
                ? "წვდომის კოდის მისაღებად დამიკავშირდი"
                : "Contact us to get your access code"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="text-[#229ED9] group-hover:text-white text-[40px] tracking-[2px] uppercase transition-colors duration-300"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              →
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Paid Card ────────────────────────────────────────────────────────────────
function PaidPdfCard({
  pdf,
  lang,
  onUnlock,
  index,
}: {
  pdf: PaidPdf;
  lang: string;
  onUnlock: () => void;
  index: number;
}) {
  
  return (
    <div
      className="bg-[#1A1A1A] border border-[#3A3028] rounded-sm p-7 flex flex-col gap-3
                 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/20
                 hover:border-[#C9A84C]/40 transition-all duration-300 relative overflow-hidden group"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#C9A84C] to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-linear-to-br from-[#C9A84C]/3 to-transparent pointer-events-none" />

      <span
        className="text-[10px] tracking-[3px] uppercase text-[#C9A84C] bg-[#C9A84C]/10 px-2.5 py-1 rounded-sm w-fit relative z-10"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        
        {lang === "ka" ? "პრემიუმი" : "Premium"}
      </span>

      <h3 className="text-xl font-semibold text-[#F5F0E8] leading-snug m-0 relative z-10">
        {lang === "ka" ? pdf.title_ka : pdf.title_en}
      </h3>

      <p className="text-sm text-[#9A8E7A] leading-relaxed m-0 grow relative z-10">
        {lang === "ka" ? pdf.description_ka : pdf.description_en}
      </p>

      <hr className="border-t border-[#2E2820] my-1" />

      <div className="flex items-center justify-between gap-3 relative z-10">
        <span
          className="text-lg text-[#C9A84C]"
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}
        >
          {pdf.price} ₾
        </span>
        <button
          onClick={onUnlock}
          className="bg-[#C9A84C] text-[#1A1A1A] font-bold px-5 py-2.5 rounded-sm
                     hover:bg-[#E8D5A3] active:scale-95 transition-all duration-200"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "2px" }}
        >
          {lang === "ka" ? "↓ ჩამოტვირთვა" : "↓ Download"}
        </button>
      </div>
    </div>
  );
}

// ─── Telegram Section ─────────────────────────────────────────────────────────
function TelegramSection({ lang }: { lang: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="border-t border-[#2E2820] mt-8">
      <div className="max-w-6xl mx-auto px-10 py-16">

        <div className="flex items-center gap-4 mb-12">
          <div className="grow h-px bg-linear-to-r from-[#C9A84C]/30 to-transparent" />
          <span
            className=" tracking-[4px] uppercase text-[#C9A84C]/60"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {lang === "ka" ? "კავშირი" : "Contact"}
          </span>
          <div className="grow h-px bg-linear-to-l from-[#C9A84C]/30 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <div className="text-center md:text-left max-w-md">

            <h2
              className="text-2xl md:text-4xl font-light text-[#F5F0E8] leading-tight m-0 mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {lang === "ka" ? "გადახდისთვის" : "To purchase"}
              <br />
              <em className="italic font-semibold text-[#C9A84C] " style={{ fontStyle: "italic" }}>
                {lang === "ka" ? "დაგვიკავშირდი" : "get in touch"}
              </em>
            </h2>

            <p
              className="text-[#6B6050] text-base italic leading-relaxed m-0"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {lang === "ka"
                ? "შეიძინე წვდომის კოდი და ჩამოტვირთე პრემიუმ მასალები პირდაპირ Telegram-ის გამოყენებით."
                : "Purchase an access code and download premium materials directly via Telegram."}
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto" style={{ maxWidth: "320px" }}>
            <button
              onClick={() => window.open(TELEGRAM_LINK, "_blank")}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-full group relative overflow-hidden rounded-sm border border-[#229ED9]/30
                         hover:border-[#229ED9]/80 transition-all duration-300"
              style={{
                background: hovered
                  ? "linear-gradient(135deg, #229ED9, #1A7AAA)"
                  : "linear-gradient(135deg, #1A1A1A, #0D0C0A)",
                boxShadow: hovered
                  ? "0 12px 40px rgba(34,158,217,0.30)"
                  : "0 4px 20px rgba(0,0,0,0.4)",
                transform: hovered ? "translateY(-2px)" : "none",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

              <div className="relative z-10 p-8 flex flex-col items-center gap-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: hovered ? "rgba(255,255,255,0.2)" : "rgba(34,158,217,0.15)",
                    border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(34,158,217,0.3)"}`,
                    transition: "all 0.3s",
                  }}
                >
                  <TelegramIcon size={30} color={hovered ? "#fff" : "#229ED9"} />
                </div>

                <div className="text-center">
                  <p
                    className="text-[#F5F0E8] text-lg font-semibold m-0 mb-1 leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {lang === "ka" ? "Telegram-ზე გადასვლა" : "Open Telegram"}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "2px",
                      color: hovered ? "rgba(255,255,255,0.7)" : "#6B6050",
                    }}
                  >
                    @NUTSABAKHTADZE
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 px-5 py-2.5 rounded-sm w-full justify-center"
                  style={{
                    background: hovered ? "rgba(255,255,255,0.15)" : "rgba(201,168,76,0.1)",
                    border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(201,168,76,0.2)"}`,
                    transition: "all 0.3s",
                  }}
                >
                  <TelegramIcon size={13} color={hovered ? "#fff" : "#C9A84C"} />
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: hovered ? "#fff" : "#C9A84C",
                    }}
                  >
                    {lang === "ka" ? "დაგვიკავშირდი →" : "Contact us →"}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const PaidPdfList = () => {
  const { ref, isVisible } = useInView();
  const { data, isLoading, isError } = usePaidPdfs(isVisible);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [modal, setModal] = useState<ModalState>({ id: null, title: "" });

  return (
    <div
      ref={ref}
      className=" bg-[#111009]"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <div className="bg-[#0D0C0A] text-[#F5F0E8] px-10 py-16 relative overflow-hidden border-b border-[#2E2820]">
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C]" />
        <div className="absolute inset-0 bg-linear-to-br from-[#C9A84C]/4 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto md:px-10 px-0">
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[160px] leading-none opacity-[0.04] select-none pointer-events-none">
            ❦
          </span>

          <p
            className="text-[11px] tracking-[4px] uppercase text-[#C9A84C] mb-4 relative z-10"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            
            {lang === "ka" ? "სავარჯიშოების ბიბლიოთეკა" : "Exercise library"}
          </p>
          <h2 className="text-2xl md:text-4xl font-light m-0 mb-3 tracking-tight leading-none relative z-10">
            {lang === "ka" ? "პრემიუმ სავარჯიშოები" : "Premium Exercises"}
          </h2>
          <p className="text-base text-[#6B6050] italic m-0 relative z-10">
            {lang === "ka" ? "ექსკლუზიური მასალები — კოდით წვდომა" : "Exclusive materials — code-gated access"}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 py-10">
        {isLoading ? (
          <PaidLoader/>
        ) : isError ? (
          <PaidEmpty/>
        ) : !data || data.length === 0 ? (
          <PaidEmpty/>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((pdf, i) => (
              <PaidPdfCard
                key={pdf.id}
                pdf={pdf}
                lang={lang}
                index={i}
                onUnlock={() =>
                  setModal({ id: pdf.id, title: lang === "ka" ? pdf.title_ka : pdf.title_en })
                }
              />
            ))}
          </div>
        )}
      </div>

      <TelegramSection lang={lang} />

      {modal.id && (
        <CodeModal modal={modal} lang={lang} onClose={() => setModal({ id: null, title: "" })} />
      )}
    </div>
  );
};

export default PaidPdfList;