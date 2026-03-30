import React, { useState } from 'react'
import type {ArticleProp } from '../../../component/interface/interface'

interface ArticlesCardProp {
    magazine:  ArticleProp
    deleteResource: (id: number) => void
}

const ArticlesCard:React.FC<ArticlesCardProp> = ({magazine, deleteResource}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <div className="relative flex-shrink-0">

      <a href={magazine.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative w-full aspect-[3/4] overflow-hidden shadow-2xl rounded-lg">
          <div className="absolute top-0 left-0 right-0 h-1 bg-red-700 z-10" />
          <img src={magazine.cover} alt={magazine.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute top-3 left-0 right-0 z-10 text-center px-2">
            <p className="text-[9px] tracking-[0.25em] text-red-400 uppercase mb-0.5">{magazine.date}</p>
            <h2 className="font-serif text-white text-xl font-black tracking-widest uppercase leading-none">{magazine.name}</h2>
            <div className="mt-1 mx-auto w-16 h-px bg-red-600" />
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-10 px-3">
            <p className="text-[8px] tracking-[0.2em] text-amber-400 uppercase mb-1">{magazine.subtitle}</p>
            <h3 className="font-serif text-white text-sm font-bold leading-tight line-clamp-2">{magazine.title}</h3>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-7 bg-black z-10 flex items-center justify-between px-2 border-t border-red-700">
            <span className="text-[7px] tracking-widest text-amber-400 uppercase">{magazine.price}</span>
            <span className="text-[7px] tracking-[0.1em] text-white/40 font-mono">{magazine.barcode}</span>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-300 line-clamp-2 leading-relaxed px-0.5">{magazine.description_ka}</p>
      </a>

      {!confirmOpen ? (
        <button
          onClick={() => setConfirmOpen(true)}
          className="absolute top-0 right-3 z-20 flex flex-col items-center justify-end active:scale-95 transition-transform"
          style={{
            width: 45,
            height: 65,
            background: "linear-gradient(180deg, #7f1d1d, #991b1b)",
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
            boxShadow: "0 4px 12px rgba(153,27,27,0.5)",
          }}
        >
          <svg className="w-7 h-7 mb-3 " viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <div
          className="absolute top-0 right-3 z-30 rounded-b-xl overflow-hidden"
          style={{
            width: 45,
            background: "linear-gradient(180deg, #7f1d1d, #991b1b)",
            boxShadow: "0 8px 24px rgba(153,27,27,0.6)",
            border: "1px solid rgba(239,68,68,0.4)",
          }}
        >

          <button
            onClick={() => deleteResource(magazine.id)}
            className="w-full flex flex-col items-center justify-center py-3 gap-1 active:scale-95 transition-transform"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[12px] text-white/80 font-bold tracking-wider" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>წაშლა</span>
          </button>
          <button
            onClick={() => setConfirmOpen(false)}
            className="w-full flex items-center justify-center py-2.5 active:scale-95 transition-transform"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default ArticlesCard
