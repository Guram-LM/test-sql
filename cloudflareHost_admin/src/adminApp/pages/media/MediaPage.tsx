import { Link } from "react-router-dom";
import videoImage from "../../../assets/cover2.png";
import magazinesImage from "../../../assets/cover2.png";

const create = [
  {
    title: "სოციალური მედია",
    description: "Facebook · Instagram · LinkedIn",
    link: "/create-socialMedia",
    bg: "bg-[#0d1425]",
    border: "border-[#4F6FE8]",
    accent: "#4F6FE8",
    type: "social",
  },
  {
    title: "ვიდეო სიახლეები",
    description: "YouTube-ის სტილის ვიდეო კონტენტი",
    link: "/create-video",
    bg: "bg-[#1a0a0a]",
    border: "border-[#E84040]",
    accent: "#E84040",
    type: "video",
  },
  {
    title: "ბეჭდური სტატიები",
    description: "ჟურნალი · გაზეთი · ბროშურა",
    link: "/create-article",
    bg: "bg-[#0a1a12]",
    border: "border-[#34C97A]",
    accent: "#34C97A",
    type: "article",
  },
];

const view = [
  { title: "სოციალური მედია", link: "/social-mediaList", accent: "#4F6FE8", bg: "bg-[#0d1425]", border: "border-[#4F6FE8]", type: "social" },
  { title: "ვიდეოები", link: "/videos-list", accent: "#E84040", bg: "bg-[#1a0a0a]", border: "border-[#E84040]", type: "video" },
  { title: "სტატიები", link: "/articles-list", accent: "#34C97A", bg: "bg-[#0a1a12]", border: "border-[#34C97A]", type: "article" },
];

const FilmStrip = ({ image }: { image?: string }) => (
  <div className="relative w-full h-20 flex items-center overflow-hidden rounded-lg" style={{ background: "#080808" }}>
    <div className="absolute top-1 left-0 right-0 flex gap-1.5 px-1">
      {[...Array(14)].map((_, i) => (
        <div key={i} className="w-3 h-2 rounded-sm flex-shrink-0" style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }} />
      ))}
    </div>
    <div className="absolute bottom-1 left-0 right-0 flex gap-1.5 px-1">
      {[...Array(14)].map((_, i) => (
        <div key={i} className="w-3 h-2 rounded-sm flex-shrink-0" style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }} />
      ))}
    </div>
    <div className="flex gap-0.5 px-1 w-full">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-1 h-12 rounded-sm overflow-hidden flex-shrink-0 relative" style={{ border: "1px solid #222" }}>
          {image ? <img src={image} className="w-full h-full object-cover opacity-70" /> : <div style={{ background: "#111" }} className="w-full h-full" />}
          {i === 2 && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#E84040"><polygon points="8,5 8,19 19,12" /></svg>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const MagazineStack = ({ image }: { image?: string }) => (
  <div className="relative h-28 flex items-end pl-4">
    <div className="absolute left-0 bottom-0 w-16 h-22 rounded-lg rotate-[-12deg] origin-bottom overflow-hidden"
      style={{ width: 60, height: 82, border: "1px solid rgba(52,201,122,0.15)", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
      {image ? <img src={image} className="w-full h-full object-cover opacity-30" /> : <div className="w-full h-full" style={{ background: "#1a2a1a" }} />}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
    </div>

    <div className="absolute bottom-0 overflow-hidden"
      style={{ left: 22, width: 60, height: 82, borderRadius: 8, transform: "rotate(-4deg)", transformOrigin: "bottom", border: "1px solid rgba(52,201,122,0.3)", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
      {image ? <img src={image} className="w-full h-full object-cover opacity-60" /> : <div className="w-full h-full" style={{ background: "#0f2a18" }} />}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#34C97A", opacity: 0.7 }} />
    </div>

    <div className="absolute bottom-0 overflow-hidden"
      style={{ left: 44, width: 64, height: 88, borderRadius: 8, transform: "rotate(5deg)", transformOrigin: "bottom", border: "1.5px solid rgba(52,201,122,0.7)", boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(52,201,122,0.2)" }}>
      {image
        ? <img src={image} className="w-full h-full object-cover" />
        : <div className="w-full h-full" style={{ background: "#122a1c" }} />
      }
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#34C97A" }} />
      <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1.5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
        <div className="h-1 rounded-full mb-1" style={{ background: "rgba(52,201,122,0.6)", width: "70%" }} />
        <div className="h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", width: "50%" }} />
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-px" style={{ background: "rgba(52,201,122,0.3)" }} />
    </div>
  </div>
);

const SocialGrid = () => (
  <div className="grid grid-cols-3 gap-2 w-full">
    {[
      { bg: "#1877F2", glow: "rgba(24,119,242,0.4)", label: "f", size: "text-xl" },
      { bg: "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)", glow: "rgba(238,42,123,0.4)", label: "IG", size: "text-xs" },
      { bg: "#0A66C2", glow: "rgba(10,102,194,0.4)", label: "in", size: "text-base" },
    ].map((ic, i) => (
      <div key={i} className="h-10 rounded-xl flex items-center justify-center text-white font-black"
        style={{ background: ic.bg, boxShadow: `0 4px 16px ${ic.glow}` }}>
        <span className={ic.size}>{ic.label}</span>
      </div>
    ))}

    <div className="col-span-3 h-8 rounded-xl flex items-center gap-2 px-3"
      style={{ background: "rgba(79,111,232,0.1)", border: "1px solid rgba(79,111,232,0.2)" }}>
      <div className="w-4 h-4 rounded-full" style={{ background: "rgba(79,111,232,0.5)" }} />
      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="w-8 h-1.5 rounded-full" style={{ background: "rgba(79,111,232,0.4)" }} />
    </div>
  </div>
);

const ViewFilmStrip = ({ image }: { image?: string }) => (
  <div className="relative overflow-hidden rounded-lg flex-shrink-0" style={{ width: 140, height: 44, background: "#080808" }}>

    <div className="absolute top-0.5 left-0 right-0 flex gap-1 px-0.5">
      {[...Array(8)].map((_, i) => <div key={i} className="w-2 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#2a2a2a" }} />)}
    </div>
    <div className="absolute bottom-0.5 left-0 right-0 flex gap-1 px-0.5">
      {[...Array(8)].map((_, i) => <div key={i} className="w-2 h-1.5 rounded-sm flex-shrink-0" style={{ background: "#2a2a2a" }} />)}
    </div>
    <div className="absolute inset-x-0 top-3 bottom-3 flex gap-0.5 px-0.5">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-1 h-full rounded-sm overflow-hidden" style={{ border: "1px solid #222" }}>
          {image ? <img src={image} className="w-full h-full object-cover opacity-60" /> : <div className="w-full h-full bg-[#111]" />}
        </div>
      ))}
    </div>
  </div>
);

const ViewMagazine = ({ image }: { image?: string }) => (
  <div className="relative w-14 h-10 flex items-end">
    <div className="absolute left-0 bottom-0 w-8 h-10 rounded rotate-[-8deg] origin-bottom overflow-hidden"
      style={{ border: "1px solid rgba(52,201,122,0.3)" }}>
      {image ? <img src={image} className="w-full h-full object-cover opacity-50" /> : <div className="w-full h-full" style={{ background: "#1a2a1a" }} />}
    </div>
    <div className="absolute left-3 bottom-0 w-8 h-10 rounded rotate-[5deg] origin-bottom overflow-hidden"
      style={{ border: "1px solid rgba(52,201,122,0.6)" }}>
      {image ? <img src={image} className="w-full h-full object-cover opacity-90" /> : <div className="w-full h-full" style={{ background: "#122a1c" }} />}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#34C97A" }} />
    </div>
  </div>
);

const ViewSocial = () => (
  <div className="flex gap-1.5">
    {[
      { bg: "#1877F2", label: "f" },
      { bg: "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)", label: "ig" },
      { bg: "#0A66C2", label: "in" },
    ].map((ic, i) => (
      <div key={i} className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
        style={{ background: ic.bg }}>
        {ic.label}
      </div>
    ))}
  </div>
);

const MediaPage = () => (
  <main className="min-h-screen px-10 py-32 2xl:py-20 2xl:pb-12">
    <div className="max-w-6xl mx-auto">

      <div className="text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold pb-2">მედია მენეჯმენტი</h1>
        <p className="mt-4 text-lg">შექმენი · მართე · გაავრცელე</p>
        <div className="mt-5 mx-auto w-22 h-1 bg-linear-to-r from-purple-400 to-pink-400" />
      </div>

      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">შექმნა</p>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {create.map((s) => (
          <Link key={s.link} to={s.link}
            className={`relative flex flex-col justify-between ${s.bg} border ${s.border} rounded-2xl p-6 overflow-hidden active:scale-[0.97] transition-transform`}
            style={{ boxShadow: `0 8px 32px ${s.accent}18` }}>
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />

            <div className="mb-6">
              {s.type === "social" && <SocialGrid />}
              {s.type === "video" && <FilmStrip image={videoImage} />}
              {s.type === "article" && <MagazineStack image={magazinesImage} />}
            </div>

            <div>
              <div className="w-6 h-0.5 rounded-full mb-3" style={{ background: s.accent }} />
              <h2 className="font-serif text-lg font-bold text-white mb-1">{s.title}</h2>
              <p className="text-xs text-white/40">{s.description}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex justify-end">
              <span className="text-xs font-medium" style={{ color: s.accent }}>შექმნა →</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">ნახვა</p>
      <div className="grid gap-4 md:grid-cols-3">
        {view.map((s) => (
          <Link key={s.link} to={s.link}
            className={`relative flex items-center justify-between ${s.bg} border ${s.border} rounded-2xl px-5 py-4 active:scale-[0.97] transition-transform overflow-hidden`}>
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />
            <div className="flex items-center gap-4">
              {s.type === "video" && <ViewFilmStrip image={videoImage} />}
              {s.type === "article" && <ViewMagazine image={magazinesImage} />}
              {s.type === "social" && <ViewSocial />}
              <span className="font-serif text-base font-bold text-white">{s.title}</span>
            </div>
            <span className="text-sm font-medium" style={{ color: s.accent }}>→</span>
          </Link>
        ))}
      </div>

    </div>
  </main>
);

export default MediaPage;