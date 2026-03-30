import { useState } from "react";
import type { SocialMedia } from "../../../component/interface/interface";
import { useDeleteResource } from "../../../services/queries/mutations/useDeleteResource";
import EmptyState from "../../emptyState/EmptyState";
import ConfirmModal from "../../../component/modal/confirmModal/ConfirmModal";

interface SitialProps {
  data: SocialMedia[]
}

const Instagram:React.FC<SitialProps> = ({data}) => {

  const deleteResource = useDeleteResource("social_media");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const instagram =
    data?.filter(item => item.platform === "instagram").map(item => ({
      id: item.id,
      title: item.title_ka,
      link: item.link,
      image: item.image_url
    })) || [];

    if (instagram.length === 0) return <EmptyState message="სოციალური მედია ჯერ არ არის" />

  return (
    <>
      <section
        className="relative py-32 overflow-hidden bg-gray-950"
      >

        <div className="absolute top-0 left-0 w-full h-[420px] bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 -skew-y-6 origin-top-left"></div>

        <div className="absolute right-[-120px] top-20 text-[420px] font-black text-pink-500/10 select-none pointer-events-none">
          IG
        </div>

        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-1/3 w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">

          <div className="mb-20 text-white">
            <h2 className="text-5xl font-bold mb-4">
              Instagram აქტივობა
            </h2>
            <p className="text-pink-200/80">
              ჩვენი უახლესი პოსტები Instagram-იდან
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

            {instagram.map(post => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-xl border border-pink-400/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/30 hover:-translate-y-2 hover:border-pink-400/40"
              >

                <div className="flex items-center px-4 pt-4 pb-3">
                  <div className="relative flex-shrink-0">

                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-md ring-2 ring-pink-400/30 ring-offset-2 ring-offset-gray-950">
                      <span className="text-white font-black text-xs">IG</span>
                    </div>

                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950" />

                  </div>

                  <div className="ml-3">
                    <p className="font-semibold text-white text-sm">
                      შენი გვერდი
                    </p>
                    <p className="text-xs text-pink-300/70">
                      2 სთ წინ
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-3">
                  <p className="text-gray-100 text-sm leading-relaxed line-clamp-3">
                    {post.title}
                  </p>
                </div>

                {post.image ? (
                  <div className="relative overflow-hidden aspect-[4/3] md:aspect-[5/4]">

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />

                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/10 opacity-60 z-10 pointer-events-none group-hover:opacity-90 transition-opacity" />

                    <img
                      src={post.image}
                      alt="Instagram post"
                      className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-4 z-20 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">

                      <p className="text-white text-sm font-medium drop-shadow-md line-clamp-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg inline-block">
                        {post.title.slice(0, 60)}...
                      </p>

                    </div>

                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-pink-900/40 to-purple-900/40 flex items-center justify-center">
                    <span className="text-pink-300 text-4xl opacity-40">
                      📸
                    </span>
                  </div>
                )}

                <div className="px-4 py-3 flex items-center justify-between text-xs border-t border-pink-400/10 bg-pink-900/10">

                  <span className="text-pink-200">
                    ❤️ 210 • 💬 18
                  </span>

                  <button
                      onClick={(e) => {
                        e.preventDefault();      
                        e.stopPropagation();
                        setConfirmDeleteId(post.id)
                      }}
                      className="text-xs px-4 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
                      style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      წაშლა
                    </button>

                </div>

              </a>
            ))}

          </div>

        </div>

      </section>

      {confirmDeleteId !== null && (
        <ConfirmModal
          onConfirm={() => {
            deleteResource.mutate(confirmDeleteId); 
            setConfirmDeleteId(null);              
          }}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </>
  )
}

export default Instagram