import { useTranslation } from 'react-i18next';
import { useInView } from '../../components/hook/useInView';
import { useFetchMyEvents } from '../../components/hook/useFetchEvents';
import { useState, useEffect } from 'react';
import type { MyEvent } from '../../components/interface/Interface';
import { useQueryClient } from '@tanstack/react-query';
import NoEventsState from './NoEventsState';
import UpcomingBadge from './Upcomingbadge';
import { formatFullDate } from './date';


function useCountdown(eventUtc: string) {
  const getTimeLeft = () => {
    const diff = new Date(eventUtc).getTime() - Date.now();

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [eventUtc]);

  return timeLeft;
}


const Unit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-0.5">
    <div className="w-9 h-9 rounded-sm bg-[#0D0C0A] border border-[#C9A84C]/30 flex items-center justify-center">
      <span
        className="text-sm font-bold text-[#C9A84C] tabular-nums"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span
      className="text-[9px] text-[#6B6050] uppercase tracking-wider"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {label}
    </span>
  </div>
);



const UpcomingCard = ({ event, lang }: { event: MyEvent; lang: string }) => {
  const timeLeft = useCountdown(event.eventUtc);
  const queryClient = useQueryClient();
  const [expired, setExpired] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isHoverDevice = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  useEffect(() => {
    if (!timeLeft && !expired) {
      setExpired(true);
      queryClient.invalidateQueries({ queryKey: ['my-events', lang] });
    }
  }, [timeLeft, expired, queryClient, lang]);

  if (!timeLeft) return null;

  const title = lang === 'ka' ? event.title_ka : event.title_en;
  const desc = lang === 'ka' ? event.description_ka : event.description_en;
  const fullDate = formatFullDate(event.event_date, lang);

  const handleCardClick = () => {
    if (isHoverDevice) return;
    setExpanded(prev => !prev);
  };

  return (
    <div
      className="bg-[#1A1A1A] border border-[#3A3028] rounded-xl overflow-hidden relative group
                 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-900/20
                 hover:border-[#C9A84C]/40 transition-all duration-700 ease-in-out cursor-pointer"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      onClick={handleCardClick}
    >

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/3 to-transparent pointer-events-none" />

      <div className="relative z-10 p-5 flex flex-col gap-3">

        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-[#F5F0E8] leading-snug">
              {title}
            </h3>
            <div className="flex-shrink-0">
              <UpcomingBadge />
            </div>
          </div>
          <p className="text-sm text-[#C9A84C] italic">
            {fullDate} · {event.event_time}
          </p>
        </div>

        {desc && (
          <>
   
            <p className="hidden md:block text-sm text-[#9A8E7A] leading-relaxed italic">
              {desc}
            </p>

            <div
              className="relative overflow-hidden md:hidden"
              style={{
                maxHeight: expanded ? '600px' : '8.125em',
                transition: expanded
                  ? 'max-height 1.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'max-height 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <p className="text-sm text-[#9A8E7A] leading-relaxed italic">
                {desc}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent, #1A1A1A)',
                  opacity: expanded ? 0 : 1,
                  transition: expanded ? 'opacity 0.3s ease' : 'opacity 1.3s ease',
                }}
              />
            </div>
          </>
        )}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 pt-1">

          <div className="flex items-end gap-1.5">
            {timeLeft.days > 0 && (
              <>
                <Unit value={timeLeft.days} label={lang === 'ka' ? 'დღე' : 'day'} />
                <span className="text-[#C9A84C]/30 text-sm pb-4">:</span>
              </>
            )}

            <Unit value={timeLeft.hours} label={lang === 'ka' ? 'სთ' : 'hr'} />
            <span className="text-[#C9A84C]/30 text-sm pb-4">:</span>

            <Unit value={timeLeft.minutes} label={lang === 'ka' ? 'წთ' : 'min'} />
            <span className="text-[#C9A84C]/30 text-sm pb-4">:</span>

            <Unit value={timeLeft.seconds} label={lang === 'ka' ? 'წმ' : 'sec'} />
          </div>

          {event.meeting_link && (
            <a
              href={event.meeting_link}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#C9A84C] text-[#1A1A1A] font-bold px-4 py-2 text-center rounded-sm
                         hover:bg-[#E8D5A3] active:scale-95 transition-all duration-200 text-xs"
              style={{ fontFamily: "'DM Mono', monospace", letterSpacing: '1.5px' }}
            >
              ↗ {lang === 'ka' ? 'შესვლა' : 'Join'}
            </a>
          )}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
    </div>
  );
};



const OnlineEvent = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { ref, isVisible } = useInView();
  const { data, isLoading, isError } = useFetchMyEvents(isVisible);

  const upcoming = data?.filter(e => e.status === 'upcoming') ?? [];

  if(isError) return <NoEventsState/>
  

  return (
    <div ref={ref} className="w-full bg-stone-100 md:p-10 px-10">

      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#3A3028] border-t-[#C9A84C] rounded-full animate-spin" />
        </div>
      )}


      <div className="relative z-10 max-w-6xl mx-auto md:py-20 pb-7 pt-20">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[1px] bg-[#C9A84C]" />
              <span className="text-[10px] tracking-[5px] uppercase text-[#C9A84C]">
                {lang === 'ka' ? 'ივენთების სივრცე' : 'Exercise library'}
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-semibold text-[#1A1A1A] italic">
              {lang === 'ka' ? 'დაგეგმილი ივენთი' : 'Planned event'}
            </h2>

            <p className="text-[#8A7A5A] text-base mt-4 max-w-md leading-relaxed italic">
              {lang === 'ka'
                ? 'შეუერთდი ჩვენს ივენთებს, მიიღე ღირებული გამოცდილება და გახდი წარმატებული გარემოს ნაწილი'
                : 'Join our events, gain valuable experience, and become part of a successful environment'}
            </p>
          </div>

         
            <div className="flex items-center gap-3 border border-[#C9A84C]/30 rounded-sm px-5 py-3 bg-[#FFFDF8]">
              <span className="text-3xl font-light text-[#C9A84C]">
                {upcoming.length ? upcoming.length : 0} 
              </span>
              <div className="w-[1px] h-6 bg-[#C9A84C]/30" />
              <span className="text-[9px] tracking-[3px] uppercase text-[#8A7A5A]">
                {lang === 'ka' ? 'დაგეგმილი ივენთი' : 'Planned event'}
              </span>
            </div>
  

        </div>
      </div>

      {upcoming.length === 0  && <NoEventsState/>}

      {upcoming.length > 0 && (
        <div className="flex flex-col max-w-6xl mx-auto gap-3">
          {upcoming.map(event => (
            <UpcomingCard key={event.id} event={event} lang={lang} />
          ))}
        </div>
      )}

    </div>
  );
};

export default OnlineEvent;