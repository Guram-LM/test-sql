import type React from "react"
import type { SocialMedia } from "../../../component/interface/interface"
import EmptyState from "../../emptyState/EmptyState"
import ConfirmModal from "../../../component/modal/confirmModal/ConfirmModal"
import { useDeleteResource } from "../../../services/queries/mutations/useDeleteResource"
import { useState } from "react"

interface SitialProps {
  data: SocialMedia[]
}

const LinkedIn:React.FC<SitialProps> = ({data}) => {

  const deleteResource = useDeleteResource("social_media");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const linkedIn =
    data?.filter(item => item.platform === "linkedin").map(item => ({
      id: item.id,
      title: item.title_ka,
      date: new Date(item.created_at).toLocaleDateString(),
      description: item.description_ka,
      link: item.link,
      image: item.image_url
    })) || []

    if (linkedIn.length === 0) return <EmptyState message="სოციალური მედია ჯერ არ არის" />

  return (
    <>
      <section
        className="relative py-32 overflow-hidden bg-gray-950"
      >
        <div className="absolute top-0 left-0 w-full h-[420px] bg-gradient-to-r from-blue-700 to-blue-500 -skew-y-6 origin-top-left"></div>
        <div className="absolute right-[-100px] top-20 text-[420px] font-black text-blue-700/10 select-none pointer-events-none">
          in
        </div>

        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">

          <div className="mb-20 text-white">
            <h2 className="text-5xl font-bold mb-4">
              LinkedIn აქტივობა
            </h2>
            <p className="text-blue-200/80">
              ჩვენი უახლესი პოსტები LinkedIn-დან
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

            {linkedIn.map(post => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 backdrop-blur-xl border border-blue-400/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2 hover:border-blue-400/40"
              >

                <div className="flex items-center px-4 pt-4 pb-3">
                  <div className="relative flex-shrink-0">

                    <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center shadow-md ring-2 ring-blue-400/30 ring-offset-2 ring-offset-gray-950">
                      <span className="text-white font-bold text-xs">in</span>
                    </div>

                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950" />

                  </div>

                  <div className="ml-3">
                    <p className="font-semibold text-white text-sm">შენი გვერდი</p>
                    <p className="text-xs text-blue-200/70">{post.date}</p>
                  </div>
                </div>

                <div className="px-4 pb-3">
                  <p className="text-gray-100 font-semibold text-sm leading-snug line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                    {post.description}
                  </p>
                </div>

                {post.image ? (
                  <div className="relative overflow-hidden aspect-[4/3] md:aspect-[5/4]">

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-60 z-10 pointer-events-none group-hover:opacity-80 transition-opacity" />

                    <img
                      src={post.image}
                      alt="LinkedIn post"
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
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-900/40 to-blue-700/40 flex items-center justify-center">
                    <span className="text-blue-300 text-4xl opacity-40">🔹</span>
                  </div>
                )}

                <div className="px-4 py-3 flex items-center justify-between text-xs border-t border-blue-400/10 bg-blue-900/20">
                  <span className="text-blue-200">👍 45 • ❤️ 12</span>
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

export default LinkedIn