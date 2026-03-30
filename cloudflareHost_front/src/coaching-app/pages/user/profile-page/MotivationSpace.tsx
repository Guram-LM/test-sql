// MotivationSpace.tsx
import { useTranslation } from 'react-i18next';

const MOCK_POSTS = [];

const MotivationSpace = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'ka';

  const [featured, ...restPosts] = MOCK_POSTS;

  return (
    <div className="min-h-screen bg-[#FDFAF4] text-[#1A1410] pb-20">
      <div className="max-w-[960px] mx-auto px-6 pt-12">
        <div className="mb-12">
          <div className="text-[#B8860B] text-xs tracking-[3px] uppercase">სამოტივაციო სივრცე</div>
          <h1 className="text-4xl font-serif italic mt-2">შეტყობინებები</h1>
          <p className="text-[#6B5E52] mt-3 max-w-md">ყოველდღიური მხარდაჭერა შენი EQ განვითარებისთვის</p>
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="bg-gradient-to-br from-[#F5E6C8] to-white border border-[#B8860B]/30 rounded-3xl p-12 mb-16 shadow-sm">
            <div className="flex gap-10">
              <div className="text-7xl flex-shrink-0">{featured.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#B8860B] rounded-full" />
                  <span className="text-[#B8860B] text-xs tracking-widest uppercase font-mono">დღის შეტყობინება</span>
                </div>
                <h2 className="font-serif text-2xl italic mt-6 leading-tight">
                  {lang === 'ka' ? featured.title_ka : featured.title_en}
                </h2>
                <p className="mt-8 text-[#6B5E52] leading-relaxed text-[15.5px]">
                  {lang === 'ka' ? featured.content_ka : featured.content_en}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Other Posts */}
        <div className="grid md:grid-cols-2 gap-6">
          {restPosts.map(post => (
            <div 
              key={post.id}
              className="bg-white border border-[#EDE8DF] rounded-3xl p-8 hover:border-[#B8860B]/40 transition-all group cursor-pointer"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{post.icon}</div>
              <h3 className="font-serif italic text-lg leading-tight group-hover:text-[#B8860B] transition-colors">
                {lang === 'ka' ? post.title_ka : post.title_en}
              </h3>
              <p className="text-[#9B8E7F] text-xs mt-6 font-mono">
                {new Date(post.published_at).toLocaleDateString(lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationSpace;