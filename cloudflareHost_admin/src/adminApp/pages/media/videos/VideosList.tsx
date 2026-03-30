import { useState } from "react";
import { useDeleteResource } from "../../../services/queries/mutations/useDeleteResource";
import { useFetchResources } from "../../../services/queries/query/useFetchResources";
import AdminLoader from "../../adminLoader/AdminLoader";
import AdminError from "../../adminError/AdminError";
import EmptyState from "../../emptyState/EmptyState";
import type { Video } from "../../../component/interface/interface";

const VideosList = () => {
  const { data, isLoading, isError } = useFetchResources("videos");
  const videos: Video[] = data ?? [];
  const deleteResource = useDeleteResource("videos");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [deleteOpenId, setDeleteOpenId] = useState<number | null>(null);

  if (isLoading) return <AdminLoader />;
  if (isError) return <AdminError />;
  if (videos.length === 0) return <EmptyState message="ვიდეო კონტენტი ჯერ არ არის" />;

  return (
    <section className="relative min-h-screen py-32 2xl:py-10 2xl:pb-22 bg-gradient-to-b from-gray-950 via-gray-900 to-black overflow-hidden">

      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-yellow-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center mb-20 z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight ">
          <span className="text-red-600 ml-2">YouTube</span>
        </h2>
        <p className="text-gray-100 text-lg max-w-3xl mx-auto leading-relaxed">
          იხილეთ ყველა ვიდეო აქ
        </p>
        <div className="mt-6 w-24 h-1 mx-auto bg-red-600 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 z-10">
        {videos.map((video) => (
          <div key={video.id} className="relative group">
            <div
              className="absolute -top-4 left-0 right-0 z-30 flex items-center justify-between px-3 transition-all duration-300"
              style={{
                height: 40,
                background: deleteOpenId === video.id
                  ? "linear-gradient(90deg, #1a0505, #2d0808, #1a0505)"
                  : "linear-gradient(90deg, #0a0a0a, #141414, #0a0a0a)",
                border: deleteOpenId === video.id
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(255,255,255,0.06)",
                borderRadius: 5,
              }}
            >
              <div className="flex gap-1.5 items-center">
                {[...Array(4)].map((_, i) => (
                  <div
                  key={i}
                  className="w-3 h-2.5 rounded-sm"
                  style={{
                    background: deleteOpenId === video.id
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)"
                  }}
                  />
                ))}
              </div>

              {deleteOpenId !== video.id ? (
                <button
                  onClick={() => setDeleteOpenId(video.id)}
                  className="flex items-center gap-2 px-4 py-1 rounded-full active:scale-95 transition-transform"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[12px] font-bold tracking-widest uppercase text-red-400">წაშლა</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { deleteResource.mutate(video.id); setDeleteOpenId(null); }}
                    className="flex items-center gap-1.5 px-4 py-1 rounded-full active:scale-95 transition-transform"
                    style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.45)" }}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[10px] font-bold text-red-400 tracking-wider">დადასტურება</span>
                  </button>
                  <button
                    onClick={() => setDeleteOpenId(null)}
                    className="w-6 h-6 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="flex gap-1.5 items-center">
                {[...Array(4)].map((_, i) => (
                  <div 
                  key={i}
                  className="w-3 h-2.5 rounded-sm"
                  style={{
                    background: deleteOpenId === video.id
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)"
                  }}
                  />
                ))}
              </div>
            </div>

            {/* video card */}
            <div
              onClick={() => setActiveVideo(video)}
              className="relative rounded-xl overflow-hidden cursor-pointer border-4 border-yellow-600/40 bg-black shadow-2xl shadow-red-950/60 transition-all duration-700 hover:border-yellow-400 hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] hover:-translate-y-4 mt-3"
            >
              <div className="relative aspect-[3/4] md:aspect-[2/3] overflow-hidden">
                <img
                  src={video.image_url}
                  alt={video.title_ka}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110 sepia-[0.3] group-hover:sepia-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-900/80 to-yellow-900/60 py-4 px-5">
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-100 drop-shadow-lg line-clamp-2">
                    {video.title_ka}
                  </h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-red-600/85 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <svg className="w-12 h-12 md:w-14 md:h-14 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <div className="absolute inset-0 rounded-full border-2 border-red-300/40 animate-ping" />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center bg-black/60">
                <p className="text-sm md:text-base text-gray-300 italic line-clamp-2">
                  "{video.description_ka.slice(0, 80)}..."
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* video modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-3xl border-4 border-yellow-600/40 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtube_id}?autoplay=1`}
              title={activeVideo.title_ka}
              allow="autoplay; fullscreen"
              className="w-full h-full"
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-yellow-100 bg-red-700/70 border-2 border-yellow-400 rounded-full shadow-lg active:scale-95 transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default VideosList;