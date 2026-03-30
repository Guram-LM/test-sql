import { useEffect, useState } from "react";
import type { PaidPdf } from "../../../component/interface/interface";
import { $axios } from "../../../component/axios/Axios";
import ConfirmModal from "../../../component/modal/confirmModal/ConfirmModal";
import EmptyState from "../../emptyState/EmptyState";

const accent = "#FBBF24";
const rgb = "251,191,36";

const PaidPdfList = () => {
  const [pdfs, setPdfs ] = useState<PaidPdf[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => { fetchPdfs() }, []);

  const fetchPdfs = async () => {
    try {
      const res = await $axios.get("/pdf/paid-pdfs");
      setPdfs(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  const generateCode = async (id: number) => {
    try {
      setLoadingId(id);
      const res = await $axios.post(`/pdf/admin/paid-pdfs/${id}/generate-code`);
      setPdfs(prev => prev.map(p => p.id === id ? { ...p, code: res.data.code } : p));
    } catch (err) { console.error(err); }
    finally { setLoadingId(null); }
  };

  const copyToClipboard = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await $axios.delete(`/pdf/admin/paid-pdfs/${id}`);
      if (res.data.success) setPdfs(prev => prev.filter(p => p.id !== id));
    } catch (err) { console.error(err); }
    finally { setDeletingId(null); setConfirmDeleteId(null); }
  };

  if (pdfs.length === 0) return <EmptyState message="ფასიანი PDF-ები მალე დაემატება" />

  return (
    <>
      <main className="min-h-screen px-10 py-32 2xl:py-20 2xl:pb-12">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">ფასიანი PDF-ები</h1>
            <div className="mt-4 mx-auto w-35 h-1" style={{ background: `rgba(${rgb},0.5)` }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="relative flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: "#161b27",
                  border: `1.5px solid ${accent}`,
                  boxShadow: `0 0 0 1px rgba(${rgb},0.1), 0 8px 32px rgba(${rgb},0.15), inset 0 1px 0 rgba(${rgb},0.06)`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb},0.1), transparent 70%)` }} />

                <div className="relative p-6 flex flex-col flex-1">

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                      <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: accent }}>
                        Paid PDF
                      </span>
                    </div>
                    <div className="px-3 py-1 rounded-full font-serif font-black text-sm"
                      style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.3)`, color: accent }}>
                      {pdf.price}₾
                    </div>
                  </div>

                  <div className="w-7 h-0.5 rounded-full mb-3" style={{ background: accent }} />
                  <h3 className="font-serif text-lg font-bold text-white leading-snug mb-3">{pdf.title_ka}</h3>

                  <p className="text-sm leading-relaxed line-clamp-3 flex-1 text-white/40">
                    {pdf.description_ka || "აღწერა არ არის"}
                  </p>

                  <div className="my-5 h-px" style={{ background: `rgba(${rgb},0.1)` }} />

                  {pdf.code ? (
                    <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-3"
                      style={{ background: "rgba(0,0,0,0.35)", border: `1px solid rgba(${rgb},0.15)` }}>
                      <span className="font-mono text-xs flex-1 truncate tracking-widest" style={{ color: `rgba(${rgb},0.7)` }}>
                        {pdf.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(pdf.code!, pdf.id)}
                        className="cursor-pointer text-xs px-3 py-1 rounded-full font-semibold active:scale-95 transition-transform flex-shrink-0"
                        style={{ background: `rgba(${rgb},0.15)`, color: accent, border: `1px solid rgba(${rgb},0.25)` }}
                      >
                        {copiedId === pdf.id ? "✓" : "კოპი"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => generateCode(pdf.id)}
                      disabled={loadingId === pdf.id}
                      className="cursor-pointer w-full py-2.5 rounded-xl text-sm font-semibold mb-3 active:scale-95 transition-transform disabled:opacity-50"
                      style={{ background: `rgba(${rgb},0.15)`, color: accent, border: `1px solid rgba(${rgb},0.3)` }}
                    >
                      {loadingId === pdf.id ? "მიმდინარეობს..." : "კოდის გენერაცია"}
                    </button>
                  )}

                  <button
                    onClick={() => setConfirmDeleteId(pdf.id)}
                    disabled={deletingId === pdf.id}
                    className="cursor-pointer w-full py-2 rounded-xl text-sm active:scale-95 transition-transform disabled:opacity-50"
                    style={{ background: "rgba(239,68,68,0.08)", color: "rgba(248,113,113,0.55)", border: "1px solid rgba(239,68,68,0.15)" }}
                  >
                    {deletingId === pdf.id ? "წაშლა..." : "წაშლა"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {confirmDeleteId !== null && (
        <ConfirmModal
          message="ნამდვილად გსურთ ამ PDF-ის წაშლა?"
          onConfirm={() => handleDelete(confirmDeleteId)}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </>
  );
};

export default PaidPdfList;