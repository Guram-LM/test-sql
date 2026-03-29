import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

// Socket instance
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
  publishUtc?: string;
}

const MotivationalPosts: React.FC = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial posts
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
      setError("შეტყობინებების ჩამოტვირთვა ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Real-time updates via Socket.IO
    socket.on("post:published", (newPost: ScheduledPost) => {
      setPosts((prev) => [newPost, ...prev]);
    });

    return () => {
      socket.off("post:published");
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-300 text-lg">მიმდინარეობს ჩატვირთვა...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors"
          >
            თავიდან ცდა
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              
              {/* Sparkles SVG */}
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 3l1.5 3L10 7.5 6.5 9 5 12 3.5 9 0 7.5 3.5 6 5 3zM19 3l1.5 3L24 7.5 20.5 9 19 12 17.5 9 14 7.5 17.5 6 19 3zM12 13l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"/>
              </svg>

              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                სამოტივაციო შეტყობინებები
              </h1>

              {/* Sparkles SVG */}
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 3l1.5 3L10 7.5 6.5 9 5 12 3.5 9 0 7.5 3.5 6 5 3zM19 3l1.5 3L24 7.5 20.5 9 19 12 17.5 9 14 7.5 17.5 6 19 3zM12 13l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"/>
              </svg>
            </div>
          </div>

          <p className="text-lg md:text-xl text-purple-300 max-w-lg mx-auto leading-relaxed">
            ყოველდღიური მოტივაცია, რომელიც შეცვლის შენს დღეს
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">🌟</div>
            <h3 className="text-2xl font-medium text-white mb-2">ჯერჯერობით არაფერია</h3>
            <p className="text-slate-400">ადმინისტრატორი მალე დაამატებს ახალ შეტყობინებებს</p>
          </div>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Gradient Top Bar */}
                <div className="h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500" />

                <div className="p-8 md:p-12">
                  <div className="flex gap-6">
                    {/* Icon */}
                    {post.icon && (
                      <div className="text-7xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        {post.icon}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-4">
                        {post.title_ka}
                      </h2>

                      {post.title_en && (
                        <p className="text-purple-400 text-lg italic mb-8">
                          {post.title_en}
                        </p>
                      )}

                      {post.content_ka && (
                        <p className="text-slate-200 text-[17px] leading-relaxed whitespace-pre-line">
                          {post.content_ka}
                        </p>
                      )}

                      {post.content_en && (
                        <p className="mt-6 text-slate-400 text-base italic border-l-2 border-purple-500 pl-4">
                          {post.content_en}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between text-sm text-slate-400 bg-black/30">
                  <div className="flex items-center gap-2">
                    
                    {/* Calendar SVG */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>

                    <span>
                        {new Date(post.published_at).toLocaleDateString("ka-GE", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    
                    {/* Clock SVG */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>

                    <span>დღის მოტივაცია</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MotivationalPosts;