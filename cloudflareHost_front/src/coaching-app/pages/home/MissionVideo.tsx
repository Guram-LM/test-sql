import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

import workImage from "../../../assets/workImage.jpg";
import HomeButton from "../../components/button/HomeButton";


export default function MissionVideo() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const missionListVideo: string[] = Array.isArray(
    t("HomePage.missionList", { returnObjects: true })
  )
    ? (t("HomePage.missionList", { returnObjects: true }) as string[])
    : [];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {

      }
    };

    tryPlay();

    const onReady = () => setVideoReady(true);
    const onError = () => setVideoReady(false);

    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onReady);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onReady);
      video.removeEventListener("error", onError);
    };
  }, [shouldLoadVideo]);

  return (
<section
  ref={containerRef}
  className="relative py-10 md:py-15 px-4 sm:px-6 md:px-12 text-center overflow-hidden"
>

  {!videoReady && (
    <img
      src={workImage}
      alt="Mission Background"
      className="absolute inset-0 w-full h-full object-cover rounded-xl md:rounded-none"
    />
  )}

  {shouldLoadVideo && (
    <video
    ref={videoRef}
    src="/videos/work.mp4"
    poster={workImage}
    muted
    loop
    playsInline
    preload="none"
    className="absolute inset-0 w-full h-full object-cover rounded-xl md:rounded-none"
  />
  )}

  <div className="absolute inset-0 bg-white/50 sm:bg-white/30 backdrop-blur-[1.5px] sm:backdrop-blur-[2px] rounded-xl md:rounded-none" />


  <div className="relative z-10 max-w-3xl sm:max-w-4xl mx-auto px-2 sm:px-4 ">
    <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-6 sm:mb-10 text-stone-600">
      {t("HomePage.missionTitle")}
    </h2>

    <p className="text-lg sm:text-xl md:text-xl mb-4 text-gray-800 leading-relaxed max-[1024px]:leading-snug">
      {t("HomePage.missionText")} –{" "}
      <span className="font-bold">{t("HomePage.missionTextbold")}</span>
    </p>

    <p className="text-lg sm:text-xl mb-2 text-gray-800 leading-relaxed max-[1024px]:leading-snug">
      {t("HomePage.missionTextTwo")}
    </p>


    <div className="text-left my-6 sm:my-8 max-w-full sm:max-w-3xl mx-auto">
      <p className="text-lg sm:text-xl text-gray-800 mb-4 leading-relaxed max-[1024px]:leading-snug">
        {t("HomePage.missionTextTwo1")}
      </p>

      <ul className="my-4 sm:my-6">
        {missionListVideo.map((item, i) => (
          <li key={i} className="text-lg sm:text-xl mb-3 leading-relaxed max-[1024px]:leading-snug text-gray-800 flex items-start">
            <span className="text-amber-700 text-2xl sm:text-3xl mr-2 -mt-0.5">•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>

      <p className="text-lg sm:text-xl text-gray-900 mb-8 leading-relaxed max-[1024px]:leading-snug">
        {t("HomePage.missionCTA")}
      </p>
    </div>

    <HomeButton title="HomePage.missionButton" />
  </div>
</section>



  );
}
