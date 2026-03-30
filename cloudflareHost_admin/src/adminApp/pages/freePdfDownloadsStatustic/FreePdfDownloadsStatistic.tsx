import { useState } from "react";
import { useDeleteResource } from "../../services/queries/mutations/useDeleteResource";
import { useFetchResources } from "../../services/queries/query/useFetchResources";
import AdminError from "../adminError/AdminError";
import AdminLoader from "../adminLoader/AdminLoader";
import EmptyState from "../emptyState/EmptyState";
import type { DownloadsPdf } from "../../component/interface/interface";
import ConfirmModal from "../../component/modal/confirmModal/ConfirmModal";

const FreePdfDownloadsStatistic = () => {
  const { data, isLoading, isError } = useFetchResources("free_pdf_downloads");
  const downloads: DownloadsPdf[] = data ?? [];
  const deleteResource = useDeleteResource("free_pdf_downloads");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  if (isLoading) return <AdminLoader />;
  if (isError) return <AdminError />;
  if (downloads.length === 0)
    return <EmptyState message="ჩამოტვირთვების ისტორია ჯერ არ არსებობს" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950/60 to-purple-950/40 relative overflow-hidden px-10 py-32 2xl:py-10 2xl:pb-22">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-600/8 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">

      <div className="text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold pb-2">უფასო PDF-ების ჩამოტვირთვები</h1>
        <p className="mt-4 text-lg">ვინ, როდის და რომელი ფაილი ჩამოტვირთა</p>
        <div className="mt-5 mx-auto w-22 h-1 bg-linear-to-r from-purple-400 to-pink-400" />
      </div>


        {/* Total count */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
            <span className="text-gray-300">სულ ჩამოტვირთვა:</span>
            <span className="font-bold text-xl text-indigo-300 tracking-wide">
              {downloads.length}
            </span>
          </div>
        </div>

        {/* Table / Cards */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-white/8 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/6">
              <thead>
                <tr className="bg-gradient-to-r from-white/5 to-white/3">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    ID
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    PDF სათაური
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    სახელი / გვარი
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    თარიღი
                  </th>
                  <th className="relative px-5 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {downloads.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-white/8 transition-all duration-200"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-400 font-mono">
                      #{item.id}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                      {item.pdf_title || "—"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-300">
                      {item.firstName || "—"} {item.lastName || ""}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-400">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString("ka-GE", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "—"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600/80 to-red-700/80 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-red-700 hover:to-red-800 hover:shadow-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 active:scale-95 transition-all duration-200"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        წაშლა
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-4">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-lg hover:shadow-xl hover:bg-white/8 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs text-gray-500 font-mono">#{item.id}</div>
                  <div className="text-base font-semibold text-white mt-0.5">
                    {item.pdf_title || "უსათაურო"}
                  </div>
                </div>
                <button
                  onClick={() => setConfirmDeleteId(item.id)}
                  className="rounded-lg bg-red-600/70 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-red-700 active:scale-95 transition-all"
                >
                  წაშლა
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mt-2">
                <div>
                  <div className="text-gray-500 text-xs">სახელი / გვარი</div>
                  <div className="text-gray-200 mt-0.5">
                    {item.firstName || "—"} {item.lastName || ""}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">თარიღი</div>
                  <div className="text-gray-300 mt-0.5">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString("ka-GE", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "—"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmDeleteId !== null && (
        <ConfirmModal
          onConfirm={() => {
            deleteResource.mutate(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default FreePdfDownloadsStatistic;