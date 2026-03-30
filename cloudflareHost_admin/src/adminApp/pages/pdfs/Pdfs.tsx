import { Link } from "react-router-dom";

const items = [
  {
    title: "ფასიანი რესურსების შექმნა",
    to: "/create-paidPdf",
    description: "შექმენი პრემიუმ სასწავლო მასალები გაყიდვისთვის",
    tag: "PREMIUM",
    number: "01",
    accent: "#FBBF24",
    rgb: "251,191,36",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke="#FBBF24" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(251,191,36,0.12)" />
      </svg>
    ),
  },
  {
    title: "უფასო რესურსების შექმნა",
    to: "/create-freePdf",
    description: "გააზიარე ცოდნა უფასოდ — შექმენი ხელმისაწვდომი მასალები",
    tag: "FREE",
    number: "02",
    accent: "#4096FF",
    rgb: "64,150,255",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#1877F2" strokeWidth="1.5" fill="rgba(24,119,242,0.08)" />
        <path d="M8 12H16M12 8V16" stroke="#1877F2" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];


const viewItems = [
  {
    title: "ფასიანი რესურსები", to: "/paid-pdfList", tag: "LIST",
    accent: "#FBBF24", rgb: "251,191,36",
    icon: (c: string) => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "უფასო რესურსები", to: "/free-pdfList", tag: "LIST",
    accent: "#1877F2", rgb: "24,119,242",
    icon: (c: string) => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinejoin="round" />
        <path d="M14 2v6h6" strokeLinejoin="round" />
        <path d="M9 13h6M9 17h4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Pdfs = () => (
  <main className="min-h-screen px-10 py-32 2xl:py-20 2xl:pb-12">
    <div className="mx-auto max-w-5xl">

      <div className="text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold  pb-2">
          pdf ფაილების მართვა
        </h1>
        <p className="mt-4 text-lg">შექმენი · მართე · გაავრცელე</p>
        <div className="mt-5 mx-auto w-22 h-1 bg-linear-to-r from-purple-400 to-pink-400" />
      </div>

      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">შექმნა</p>

      <div className="grid gap-5 md:grid-cols-2 mb-5">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="relative flex flex-col justify-between rounded-2xl p-7 overflow-hidden active:scale-[0.97] transition-transform duration-150"
            style={{
              background: "#161b27",
              border: `1.5px solid ${item.accent}`,
              boxShadow: `0 0 0 1px rgba(${item.rgb},0.12), 0 8px 40px rgba(${item.rgb},0.18), inset 0 1px 0 rgba(${item.rgb},0.07)`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${item.rgb},0.13), transparent 70%)` }} />

            <span className="absolute -right-1 -top-5 font-serif text-9xl font-black select-none leading-none pointer-events-none"
              style={{ color: `rgba(${item.rgb},0.04)` }}>
              {item.number}
            </span>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${item.rgb},0.1)`, border: `1px solid rgba(${item.rgb},0.25)` }}>
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase rounded-full px-3 py-1 font-bold"
                  style={{ background: `rgba(${item.rgb},0.1)`, color: item.accent, border: `1px solid rgba(${item.rgb},0.25)` }}>
                  {item.tag}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `rgba(${item.rgb},0.08)`, border: `1px solid rgba(${item.rgb},0.2)` }}>
                <span style={{ color: item.accent, fontSize: 14 }}>→</span>
              </div>
            </div>

            <div className="relative z-10">
              <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: item.accent }} />
              <h2 className="font-serif text-xl font-bold text-white mb-2 leading-snug">{item.title}</h2>
              <p className="text-sm text-white/38 leading-relaxed">{item.description}</p>
            </div>

            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `rgba(${item.rgb},0.1)`, border: `1px solid rgba(${item.rgb},0.28)` }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={item.accent} strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinejoin="round"/>
                <path d="M14 2v6h6" strokeLinejoin="round"/>
                <text x="12" y="17" fontSize="5.5" fontWeight="800" fill={item.accent} textAnchor="middle" fontFamily="serif">PDF</text>
              </svg>
            </div>

            <div className="mt-8 pt-5 flex items-center justify-between relative z-10"
              style={{ borderTop: `1px solid rgba(${item.rgb},0.1)` }}>
              <div className="flex gap-1.5 items-center">
                <div className="w-5 h-1 rounded-full" style={{ background: item.accent }} />
                <div className="w-2 h-1 rounded-full bg-white/10" />
                <div className="w-2 h-1 rounded-full bg-white/10" />
              </div>
              <span className="text-xs font-semibold" style={{ color: item.accent }}>შექმნა →</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">ნახვა</p>

      <div className="grid gap-4 md:grid-cols-2">
        {viewItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="relative flex items-center justify-between rounded-2xl px-6 py-5 overflow-hidden active:scale-[0.97] transition-transform"
            style={{
              background: "#161b27",
              border: `1.5px solid ${item.accent}`,
              boxShadow: `0 0 0 1px rgba(${item.rgb},0.1), 0 4px 24px rgba(${item.rgb},0.15), inset 0 1px 0 rgba(${item.rgb},0.05)`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${item.rgb},0.07), transparent 70%)` }} />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${item.rgb},0.1)`, border: `1px solid rgba(${item.rgb},0.28)` }}>
                {item.icon(item.accent)}
              </div>
              <div>
                <span className="text-[9px] tracking-[0.25em] uppercase font-semibold block mb-0.5"
                  style={{ color: `rgba(${item.rgb},0.5)` }}>{item.tag}</span>
                <span className="font-serif text-base font-bold text-white">{item.title}</span>
              </div>
            </div>

            <span className="text-base font-bold relative z-10" style={{ color: item.accent }}>→</span>
          </Link>
        ))}
      </div>

    </div>
  </main>
);

export default Pdfs;