import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchScheduledPosts, useDeleteScheduledPost } from "../../services/queries/scheduled/useScheduledPosts";
import ConfirmModal from "../../component/modal/confirmModal/ConfirmModal";
import AdminLoader from "../adminLoader/AdminLoader";
import AdminError from "../adminError/AdminError";
import EmptyState from "../emptyState/EmptyState";

const ScheduledPostsList = () => {
  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const { data: posts = [], isLoading, isError } = useFetchScheduledPosts();
  const deleteMutation = useDeleteScheduledPost();

  const handleDelete = () => {
    if (!confirmDeleteId) return;

    deleteMutation.mutate(confirmDeleteId, {
      onSuccess: () => {
        setConfirmDeleteId(null);
      },
      onError: (err: any) => {
        console.error("Hard Delete error:", err?.response?.data || err);
        setConfirmDeleteId(null);
      },
    });
  };

  if (isLoading) return <AdminLoader />;
  if (isError) return <AdminError />;

  return (
    <div className="min-h-screen px-5 py-30 2xl:py-20 2xl:pb-12">
      <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
            სამოტივაციო შეტყობინებები
          </h1>
          <p className="text-gray-300 text-lg">შექმენი დაგეგმე და გაავრცელე სამოტივაციო შეტყობინებები</p>
        </div>
        <div className="flex justify-center items-center mb-10">

          <button
            onClick={() => navigate("/admin/scheduled-posts/new")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all active:scale-95"
          >
            + ახალი სამოტივაციო შეტყობინებები დამატება
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-purple-100 hover:border-purple-300 transition-all group"
            >
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

              <div className="p-6">
                <div className="text-5xl mb-4">{post.icon}</div>

                <h3 className="font-semibold text-xl leading-tight mb-2 text-gray-800 line-clamp-2">
                  {post.title_ka}
                </h3>

                {post.title_en && (
                  <p className="text-purple-600 text-sm italic mb-3">{post.title_en}</p>
                )}

                {post.content_ka && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.content_ka}
                  </p>
                )}

                <div className="text-sm text-gray-500 space-y-1">
                  <div>
                    {new Date(post.publish_date).toLocaleDateString("ka-GE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div>🕒 {post.publish_time}</div>

                  <div className="text-xs mt-3">
                    სტატუსი:{" "}
                    <span
                      className={`font-medium ${
                        post.status === "published"
                          ? "text-green-600"
                          : post.status === "failed"
                          ? "text-red-600"
                          : "text-amber-600"
                      }`}
                    >
                      {post.status === "published"
                        ? "✅ გამოქვეყნებული"
                        : post.status === "failed"
                        ? "❌ წარუმატებელი"
                        : "📅 დაგეგმილი"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 p-4 flex gap-3">
                <button
                  onClick={() => navigate(`/admin/scheduled-posts/${post.id}`)}
                  className="flex-1 py-3 text-sm font-semibold text-purple-700 border border-purple-300 rounded-2xl hover:bg-purple-50 transition-all"
                >
                  ✏️ რედაქტირება
                </button>
                <button
                  onClick={() => setConfirmDeleteId(post.id)}
                  className="flex-1 py-3 text-sm font-semibold text-red-600 border border-red-300 rounded-2xl hover:bg-red-50 transition-all"
                >
                  🗑 სრული წაშლა
                </button>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-xl">
            ჯერ არ არის არც ერთი შეტყობინება
          </div>
        )}
      </div>

  
      {confirmDeleteId && (
        <ConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ScheduledPostsList;