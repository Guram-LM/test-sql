import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import io, { Socket } from "socket.io-client";

const socket: Socket = io(
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  { autoConnect: true }
);

interface ScheduledPost {
  id: number;
  title_ka: string;
  title_en?: string;
  content_ka?: string;
  content_en?: string;
  icon?: string;
  published_at: string;
}

const MotivationalPosts: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'ka';

  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openPosts, setOpenPosts] = useState<Record<number, boolean>>({});

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/scheduled-posts`
      );

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error(err);
      setError(lang === 'ka' ? "შეტყობინებების ჩამოტვირთვა ვერ მოხერხდა" : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    socket.on("post:published", (newPost: ScheduledPost) => {
      setPosts((prev) => [newPost, ...prev]);
    });

    return () => {
      socket.off("post:published");
    };
  }, [lang]);

  const togglePost = (id: number) => {
    setOpenPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const [featured, ...restPosts] = posts.length > 0 ? posts : [];

  return (
    <div className="min-h-screen bg-[#FDFAF4] text-[#1A1410]">
      <div className="fixed inset-0 bg-[radial-gradient(#B8860B_1px,transparent_1px)] bg-[length:32px_32px] opacity-5 pointer-events-none" />

      <div className="max-w-[960px] mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[#B8860B] text-xs tracking-[3px] uppercase font-mono">სამოტივაციო სივრცე</div>
            <h1 className="text-4xl font-serif italic mt-2">შეტყობინებები</h1>
            <p className="text-[#6B5E52] mt-3 max-w-md">
              {lang === 'ka' 
                ? "ყოველდღიური შეტყობინებები შენი EQ განვითარებისთვის" 
                : "Daily messages to support your EQ growth"}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-[#EDE8DF] rounded-2xl px-6 py-4">
            <div className="flex gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{
                    background: i < 5 ? '#C44B1B' : '#EDE8DF',
                    boxShadow: i < 5 ? '0 0 8px rgba(196,75,27,0.4)' : 'none',
                  }}
                />
              ))}
            </div>
            <span className="text-xs tracking-widest uppercase text-[#9B8E7F] font-mono">
              {lang === 'ka' ? '12 დღიანი სერია' : '12-day streak'}
            </span>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#EDE8DF] border-t-[#B8860B] rounded-full animate-spin" />
          </div>
        )}

        {error && <div className="text-center py-20 text-red-600">{error}</div>}

        {!loading && !error && posts.length > 0 && (
          <>
            {/* Featured Post (უკვე სრულია) */}
            {featured && (
              <div className="bg-gradient-to-br from-[#F5E6C8] via-[#FDF8EE] to-white border border-[#B8860B]/30 rounded-3xl p-12 mb-16 shadow-sm">
                <div className="flex flex-col md:flex-row gap-10">
                  {featured.icon && <div className="text-7xl flex-shrink-0">{featured.icon}</div>}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#B8860B] rounded-full" />
                      <span className="text-[#B8860B] text-xs tracking-widest uppercase font-mono">
                        {lang === 'ka' ? 'დღის შეტყობინება' : "Today's Message"}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl italic leading-tight mt-6">
                      {lang === 'ka' ? featured.title_ka : (featured.title_en || featured.title_ka)}
                    </h2>

                    {(featured.content_ka || featured.content_en) && (
                      <p className="mt-8 text-[#6B5E52] leading-relaxed text-[15.5px]">
                        {lang === 'ka' ? featured.content_ka : (featured.content_en || featured.content_ka)}
                      </p>
                    )}

                    <div className="mt-10 flex items-center gap-4">
                      <div className="h-px w-8 bg-[#EDE8DF]" />
                      <span className="text-xs tracking-widest text-[#9B8E7F] font-mono">
                        {new Date(featured.published_at).toLocaleDateString(lang)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Expandable Posts */}
            <div className="mb-8 flex items-center gap-3">
              <span className="text-2xl font-bold text-[#B8860B] font-mono">{posts.length}</span>
              <span className="text-xs tracking-widest uppercase text-[#9B8E7F] font-mono">
                {lang === 'ka' ? 'შეტყობინება' : 'messages'}
              </span>
            </div>

            <div className="space-y-4">
              {restPosts.map((post) => {
                const isOpen = openPosts[post.id] || false;
                const title = lang === 'ka' ? post.title_ka : (post.title_en || post.title_ka);
                const content = lang === 'ka' ? post.content_ka : (post.content_en || post.content_ka);

                return (
                  <div
                    key={post.id}
                    onClick={() => togglePost(post.id)}
                    className="group bg-white border border-[#EDE8DF] rounded-3xl overflow-hidden cursor-pointer hover:border-[#B8860B]/40 transition-all"
                  >
                    {/* Header Part */}
                    <div className="p-8 flex items-start gap-5">
                      {post.icon && (
                        <div className="text-4xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                          {post.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif italic text-lg leading-tight group-hover:text-[#B8860B] transition-colors">
                          {title}
                        </h3>
                        <p className="text-[#9B8E7F] text-xs mt-4 font-mono">
                          {new Date(post.published_at).toLocaleDateString(lang)}
                        </p>
                      </div>

                      <div className={`text-2xl text-[#9B8E7F] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        ↓
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out px-8 pb-8 ${
                        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {content && (
                        <div className="pt-6 border-t border-[#EDE8DF]">
                          <p className="text-[#6B5E52] leading-relaxed text-[15.5px]">
                            {content}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-32 text-[#9B8E7F]">
            {lang === 'ka' ? 'შეტყობინებები ჯერ არ არის' : 'No motivational posts yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MotivationalPosts;