import { useState, useEffect, useCallback } from 'react';
import { useFeedbackImages } from '../../components/hook/useFeedbackImages';
import ScreenCardLoader from '../loader/ScreenCardLoader';
import ScreenCardError from '../error/ScreenCardError';
import { useTranslation } from 'react-i18next';
import { useInView } from '../../components/hook/useInView';

const globalStyles = `
  @keyframes modalIn {
    0%   { opacity: 0; transform: scale(0.5) rotate(-3deg); filter: blur(14px); }
    65%  { opacity: 1; transform: scale(1.04) rotate(0.5deg); filter: blur(0px); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0px); }
  }
  @keyframes modalOut {
    0%   { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0px); }
    100% { opacity: 0; transform: scale(0.5) rotate(3deg); filter: blur(14px); }
  }
  @keyframes bdIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes bdOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes cornerPulse {
    0%, 100% { opacity: 0.35; }
    50%       { opacity: 1; }
  }
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px) rotate(var(--card-r)); }
    50%       { transform: translateY(-5px) rotate(var(--card-r)); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  .card-float    { animation: cardFloat 4.5s ease-in-out infinite; }
  .modal-enter   { animation: modalIn  0.52s cubic-bezier(0.34, 1.28, 0.64, 1) forwards; }
  .modal-exit    { animation: modalOut 0.34s cubic-bezier(0.4, 0, 0.6, 1) forwards; }
  .bd-enter      { animation: bdIn  0.38s ease forwards; }
  .bd-exit       { animation: bdOut 0.34s ease forwards; }

  .shimmer-gold {
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(201,168,76,0.7) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2.8s linear infinite;
  }
  .corner-blink { animation: cornerPulse 2.2s ease-in-out infinite; }
  .no-scroll    { overflow: hidden !important; }
`;

interface Feedback {
  id: string;      
  img: string;
  r: string;        
  delay: string;    
  aspect: string;
}

type CornerPos = 'tl' | 'tr' | 'bl' | 'br';
const Corner = ({ pos, delay = '0s' }: { pos: CornerPos; delay?: string }) => {
  const base = 'absolute w-5 h-5 corner-blink pointer-events-none';
  const t = pos.startsWith('t') ? 'top-3'    : 'bottom-3';
  const l = pos.endsWith('l')  ? 'left-3'   : 'right-3';
  const bt = pos.startsWith('t') ? 'borderTop'    : 'borderBottom';
  const bl = pos.endsWith('l')  ? 'borderLeft'   : 'borderRight';
  return (
    <div
      className={`${base} ${t} ${l}`}
      style={{
        animationDelay: delay,
        [bt]: '1.5px solid #c9a84c',
        [bl]: '1.5px solid #c9a84c',
      }}
    />
  );
};






const Modal = ({
  item,
  closing,
  onClose,
}: {
  item: Feedback;
  closing: boolean;
  onClose: () => void;
}) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 ${closing ? 'bd-exit' : 'bd-enter'}`}
    style={{ backgroundColor: 'rgba(6,6,6,0.88)', backdropFilter: 'blur(18px)' }}
    onClick={onClose}
  >
    <div
      className="pointer-events-none absolute inset-x-0 h-40 opacity-[0.03]"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.8), transparent)',
        animation: 'scanline 3.5s linear infinite',
      }}
    />

    <div
      className={`relative ${closing ? 'modal-exit' : 'modal-enter'} flex flex-col max-h-[90vh]`}
      style={{ width: '100%', maxWidth: 'min(90vw, 720px)' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute -inset-[1.5px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #C9A84C 0%, #6E4E1A 35%, #F0D080 65%, #C9A84C 100%)',
          backgroundSize: '300% 300%',
          animation: 'shimmer 3.2s linear infinite',
        }}
      />

      <div
        className="relative bg-[#0A0A0A] overflow-hidden flex flex-col"
        style={{
          boxShadow:
            '0 0 0 1px rgba(201,168,76,0.15), 0 40px 80px rgba(0,0,0,0.85), 0 0 80px rgba(201,168,76,0.08)',
        }}
      >
        <Corner pos="tl" delay="0s"    />
        <Corner pos="tr" delay="0.25s" />
        <Corner pos="bl" delay="0.5s"  />
        <Corner pos="br" delay="0.75s" />

        
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/6 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
            <span
              className="text-[#C9A84C]/70 text-[10px] uppercase tracking-[0.35em]"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              feedback · #{item.id}
            </span>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#C9A84C] text-xs leading-none">★</span>
            ))}
          </div>
        </div>

        
        <div
          className="modal-scroll relative flex-1 overflow-y-auto p-4"
          style={{
            maxHeight: '80vh',
       
            scrollbarWidth: 'auto',
            scrollbarColor: '#C9A84C #111008',
          }}
        >
          <img
            src={item.img}
            alt={`Feedback ${item.id}`}
            className="w-full max-w-full object-contain mx-auto block"
            crossOrigin="anonymous"
          />
        </div>

     
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/6 shrink-0">
          <span
            className="text-white/25 text-[10px] uppercase tracking-[0.25em]"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            verified review
          </span>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="group flex items-center gap-2 text-white/35 hover:text-[#C9A84C] transition-colors duration-300 cursor-pointer"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 border border-white/10 group-hover:border-[#C9A84C]/50 transition-colors duration-300" />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div
      className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-25 pointer-events-none"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      <kbd className="text-[9px] text-white/70 border border-white/20 px-1.5 py-0.5 uppercase tracking-widest rounded-none">
        ESC
      </kbd>
      <span className="text-white/50 text-[9px] tracking-widest uppercase">to close</span>
    </div>
  </div>
);








const FeedbackTwo = () => {

  const {t} = useTranslation()

  const { ref, isVisible } = useInView();

  const { data: images = [], isLoading, error } = useFeedbackImages(isVisible);




  
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [closing, setClosing] = useState(false);

  const feedbacks: Feedback[] = images.map((img: { id: number; image_url: string }, index: number) => ({
    id: String(img.id),
    img: img.image_url,
    r: ['-2deg', '1.5deg', '-1deg', '2.5deg', '-1.8deg', '1deg'][index % 6],
    delay: ['0s', '0.6s', '1.2s', '0.3s', '0.9s', '1.5s'][index % 6],
    aspect: index % 2 === 0 ? '1/1' : '4/5',
  }));

  const openModal = (item: Feedback) => {
    setSelected(item);
    setClosing(false);
    document.body.classList.add('no-scroll');
  };

  const closeModal = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
      document.body.classList.remove('no-scroll');
    }, 340);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selected) closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, closeModal]);

  const placeholderCount = 8;

  return (
    <>
      <style>{globalStyles}</style>

      <section 
        ref={ref}
        className="relative min-h-screen overflow-hidden py-20 px-4"
      >
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center mb-13 mt-5 sm:mb-24">
          <h2
            className="text-white text-2xl md:text-4xl leading-none"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontStyle: 'italic',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#c9a84c',
            }}
          >
            {t("feedback.title")}
          </h2>

          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-16 sm:w-24 bg-linear-to-r from-transparent to-[#c9a84c]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
            <div className="h-px w-16 sm:w-24 bg-linear-to-l from-transparent to-[#c9a84c]" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {(isLoading || error || feedbacks.length === 0) ? (
        
              Array.from({ length: placeholderCount }).map((_, i) => (
                <div key={`placeholder-${i}`} className="break-inside-avoid">
                  <div
                    className="card-float relative bg-[#1a1a1a] border border-white/5 overflow-hidden"
                    style={{
                      '--card-r': ['-2deg', '1.5deg', '-1deg', '2.5deg', '-1.8deg', '1deg'][i % 6],
                      transform: `rotate(var(--card-r))`,
                      animationDelay: ['0s', '0.6s', '1.2s', '0.3s', '0.9s', '1.5s'][i % 6],
                      boxShadow: '0 4px 30px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
                    } as React.CSSProperties}
                  >
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: i % 2 === 0 ? '1/1' : '4/5' }}>
                      {isLoading ? (
                        <ScreenCardLoader />
                      ) : (
                        <ScreenCardError />
                      )}
                    </div>

                    <div className="px-4 py-3 flex items-center justify-between border-t border-white/5">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/30" />
                        ))}
                      </div>
                      <span className="text-[#c9a84c]/50 text-[10px] font-mono uppercase tracking-widest">
                        {isLoading ? 'იტვირთება...' : 'შეცდომა'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              feedbacks.map((item) => (
                <div key={item.id} className="break-inside-avoid group">
                  <div
                    className="card-float relative bg-[#1a1a1a] border border-white/5
                               transition-all duration-300 ease-out
                               hover:scale-[1.03] hover:z-20 hover:border-[#c9a84c]/40
                               cursor-zoom-in"
                    style={{
                      '--card-r': item.r,
                      transform: `rotate(${item.r})`,
                      animationDelay: item.delay,
                      boxShadow:
                        '0 4px 30px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
                    } as React.CSSProperties}
                    onClick={() => openModal(item)}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-5
                                 bg-black/40 border border-[#C9A84C]
                                 shadow-[0_0_10px_rgba(201,168,76,0.6)]"
                      style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}
                    />

                    <div className="relative overflow-hidden">
                      <img
                        src={item.img}
                        alt={`Feedback ${item.id}`}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ aspectRatio: item.aspect }}
                        crossOrigin="anonymous" 
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div
                          className="w-12 h-12 flex items-center justify-center border border-[#c9a84c]/60 bg-black/40 backdrop-blur-sm"
                          style={{ boxShadow: '0 0 24px rgba(201,168,76,0.3)' }}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="7.5" stroke="#c9a84c" strokeWidth="1"/>
                            <path d="M6.5 9h5M9 6.5v5" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-[#c9a84c] text-sm tracking-wider">★★★★★</span>
                      </div>
                    </div>

                    <div className="px-4 py-3 flex items-center justify-between border-t border-white/5">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/55" />
                        ))}
                      </div>
                      <span className="text-[#c9a84c] text-[10px] font-mono uppercase tracking-widest">view</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {selected && (
        <Modal item={selected} closing={closing} onClose={closeModal} />
      )}
    </>
  );
};

export default FeedbackTwo;