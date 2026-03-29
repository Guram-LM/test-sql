import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import palmPoster from '../../../assets/palmPoster.png';

const resultIcons = ['⚖️', '🧘', '💭', '🌱', '✨', '🦋', '⚡'];

export default function ResultsSection() {
  const { t } = useTranslation();
  const results = t('ResultsPage.results', { returnObjects: true }) as string[];
  const [hoveredResult, setHoveredResult] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let settled = false;

    const success = () => {
      if (!settled) {
        settled = true;
        setShowFallback(false);
      }
    };

    const failure = () => {
      if (!settled) {
        settled = true;
        setShowFallback(true);
      }
    };

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        requestAnimationFrame(() => {
          video.play().catch(() => {});
        });
      }
    };

    tryPlay();

    video.addEventListener('playing', success);
    video.addEventListener('canplay', success);
    video.addEventListener('error', failure);

    const timeout = setTimeout(() => {
      if (video.paused || video.readyState < 2) {
        failure();
      }
    }, 1500);

    return () => {
      clearTimeout(timeout);
      video.removeEventListener('playing', success);
      video.removeEventListener('canplay', success);
      video.removeEventListener('error', failure);
    };
  }, []);

  return (
    <section className="relative py-20 px-8 overflow-hidden">
      {showFallback && (
        <img
          src={palmPoster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <video
        ref={videoRef}
        src="/videos/palm1.mp4"
        poster={palmPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            {t('ResultsPage.resultsSectionTitle')}
          </h2>
          <p className="text-2xl text-white font-bold">
            {t('ResultsPage.resultsSectionSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {results.map((result, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredResult(idx)}
              onMouseLeave={() => setHoveredResult(null)}
              className={`group bg-white/90 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 p-5 border border-amber-100 ${
                hoveredResult === idx ? '-translate-y-1' : ''
              } mx-auto lg:mx-0`}
            >
              <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-4">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110">
                  {resultIcons[idx]}
                </div>

                <div className="flex-1">
                  <div className="text-xs text-amber-600 font-medium mb-1">
                    0{idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xl">
                    {result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-linear-to-br from-stone-50 to-amber-50 rounded-3xl p-10 md:p-12 border-l-4 border-amber-400 shadow-lg text-center overflow-hidden">
          <div className="absolute top-0 left-8 text-9xl text-amber-300/30 font-serif leading-none">
            "
          </div>
          <p
            className="relative text-2xl font-light text-gray-800 italic leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('ResultsPage.resultsQuote') }}
          />
        </div>
      </div>
    </section>
  );
}
