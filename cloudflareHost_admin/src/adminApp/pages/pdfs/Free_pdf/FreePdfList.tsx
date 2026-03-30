import { useState } from "react";
import type { FredPdf } from "../../../component/interface/interface";
import { useDeleteResource } from "../../../services/queries/mutations/useDeleteResource";
import { useFetchResources } from "../../../services/queries/query/useFetchResources";
import AdminError from "../../adminError/AdminError";
import AdminLoader from "../../adminLoader/AdminLoader";
import ConfirmModal from "../../../component/modal/confirmModal/ConfirmModal";
import EmptyState from "../../emptyState/EmptyState";

const accent = "#4096FF";
const rgb = "64,150,255";

const FreePdfList = () => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const { data, isLoading, isError } = useFetchResources("free_pdfs");
  const free_pdfs: FredPdf[] = data ?? [];
  const deleteResource = useDeleteResource("free_pdfs");

  if (isLoading) return <AdminLoader/>
  if (isError) return <AdminError/>
  if (free_pdfs.length === 0) return <EmptyState message="უფასო PDF-ები მალე დაემატება" />

  return (
    <>
      <div className="min-h-screen px-10 py-32 2xl:py-20 2xl:pb-12">
        <div className="mx-auto max-w-7xl">

          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">უფასო PDF-ები</h1>
            <div className="mt-4 mx-auto w-35 h-1" style={{ background: `rgba(${rgb},0.5)` }} />
          </div>

          {!isLoading && free_pdfs.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {free_pdfs.map((item) => (
                <div
                  key={item.id}
                  className="relative flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    background: "#161b27",
                    border: `1.5px solid ${accent}`,
                    boxShadow: `0 0 0 1px rgba(${rgb},0.1), 0 8px 32px rgba(${rgb},0.15), inset 0 1px 0 rgba(${rgb},0.06)`,
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb},0.12), transparent 70%)` }} />

                  <div className="absolute right-4 top-4 opacity-[0.04] pointer-events-none">
                    <svg className="w-28 h-28" viewBox="0 0 24 24" fill={accent}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                    </svg>
                  </div>

                  <div className="relative p-6 flex flex-col flex-1">

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                        <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: accent }}>
                          Free PDF
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.25)` }}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                          <path d="M12 10v6M9 13l3 3 3-3" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    <div className="w-7 h-0.5 rounded-full mb-3" style={{ background: accent }} />

                    <h3 className="font-serif text-lg font-bold text-white leading-snug line-clamp-2 mb-1">
                      {item.title_ka}
                    </h3>
                    <p className="text-xs mb-5 line-clamp-1 italic" style={{ color: `rgba(${rgb},0.5)` }}>
                      {item.title_en}
                    </p>

                    <p className="text-sm leading-relaxed line-clamp-3 flex-1 text-white/40">
                      {item.description_ka}
                    </p>

                    <div className="my-5 h-px" style={{ background: `rgba(${rgb},0.1)` }} />

                    <div className="flex items-center justify-between">
                      {item.pdf_url ? (
                      <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-semibold active:scale-95 transition-transform"
                          style={{ color: accent }}
                        >
                          <span>ნახვა</span>
                          <span>→</span>
                        </a>
                      ) : (
                        <span className="text-sm text-white/15">ფაილი არ არის</span>
                      )}

                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="cursor-pointer text-xs px-4 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
                        style={{ background: "rgba(239,68,68,0.08)", color: "rgba(248,113,113,0.7)", border: "1px solid rgba(239,68,68,0.18)" }}
                      >
                        წაშლა
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {confirmDeleteId !== null && (
        <ConfirmModal
          message="ნამდვილად გსურთ ამ PDF-ის წაშლა?"
          onConfirm={() => { deleteResource.mutate(confirmDeleteId); setConfirmDeleteId(null); }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </>
  );
};

export default FreePdfList;