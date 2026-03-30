import { useState } from "react";
import { useFetchResources } from "../../services/queries/query/useFetchResources";
import { useDeleteResource } from "../../services/queries/mutations/useDeleteResource";
import type { Feedback } from "../../component/interface/interface";
import ConfirmModal from "../../component/modal/confirmModal/ConfirmModal";
import AdminLoader from "../adminLoader/AdminLoader";
import AdminError from "../adminError/AdminError";
import EmptyState from "../emptyState/EmptyState";

const FeedbackList = () => {
  const { data, isLoading, isError } = useFetchResources("feedback");
  const feedbacks: Feedback[] = data ?? [];
  const { mutate: deleteItem, isPending } = useDeleteResource("feedback");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => { setSelectedId(id); setConfirmOpen(true); };
  const handleConfirm = () => { if (selectedId) deleteItem(selectedId); setConfirmOpen(false); setSelectedId(null); };
  const handleCancel = () => { setConfirmOpen(false); setSelectedId(null); };

  if (isLoading) return <AdminLoader />;
  if (isError) return <AdminError />;
  if (feedbacks.length === 0) return <EmptyState message="უკუკავშირების გალერეა ჯერ არ არის" />;

  return (
    <div className="min-h-screen px-6 sm:px-10 lg:px-14 py-10">
      <h2 className="text-xl md:text-3xl font-extrabold my-10 text-center bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400 pb-2">
        უკუკავშირების გალერეა
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="flex flex-col items-center">


            <div
              className="relative w-[280px] rounded-[44px] p-[3px] shadow-2xl"
              style={{ background: "linear-gradient(145deg, #C9943A, #8B6520, #C9943A, #6B4A10)" }}
            >

              <div className="absolute inset-0 rounded-[44px] opacity-30"
                style={{ background: "linear-gradient(145deg, rgba(255,220,120,0.5) 0%, transparent 50%)" }} />

              <div className="relative rounded-[42px] overflow-hidden bg-black">

                <div className="relative flex items-center justify-between px-5 pt-3 pb-4 bg-black">
                  <span className="text-white text-[10px] font-semibold">9:41</span>

                  <button
                    disabled={isPending}
                    onClick={() => handleDeleteClick(fb.id)}
                    className="absolute left-1/2 -translate-x-1/2 top-2 flex items-center gap-1.5 px-4 h-[28px] rounded-full active:scale-95 transition-all disabled:opacity-50"
                    style={{ background: "#1a0000", border: "1px solid rgba(239,68,68,0.4)", minWidth: 100 }}
                  >
                    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[10px] font-semibold text-red-400">წაშლა</span>
                  </button>


                  <div className="flex items-center gap-1">
                    <div className="flex items-end gap-[2px]">
                      {[3, 5, 7, 9].map((h, i) => (
                        <div key={i} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                      <div className="w-5 h-2.5 rounded-[3px] border border-white/60 relative">
                        <div className="absolute inset-[2px] right-[3px] bg-white rounded-[1px]" />
                      </div>
                      <div className="w-[2px] h-1.5 bg-white/50 rounded-full" />
                    </div>
                  </div>
                </div>

                <img
                  src={fb.image_url}
                  alt=""
                  className="w-full object-contain bg-black"
                />

                <div className="flex justify-center py-2 bg-black">
                  <div className="w-20 h-1 rounded-full bg-white/30" />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {confirmOpen && (
        <ConfirmModal
          message="ნამდვილად გსურთ წაშლა?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default FeedbackList;