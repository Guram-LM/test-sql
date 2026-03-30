import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchMyEvents } from '../../../components/hook/useFetchEvents';
import { useInView } from '../../../components/hook/useInView';
import { formatFullDate } from '../../event/date';
import NoEventsState from '../../event/NoEventsState';

interface MyEvent {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka?: string;
  description_en?: string;
  event_date: string;
  event_time: string;
  eventUtc: string;
  meeting_link?: string;
  status: "upcoming" | "past";
}

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
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [eventUtc]);

  return timeLeft;
}

const UpcomingCard = ({ event, lang }: { event: MyEvent; lang: string }) => {
  const timeLeft = useCountdown(event.eventUtc);
  const [expanded, setExpanded] = useState(false);
  const isHoverDevice = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  if (!timeLeft) return null;

  const title = lang === 'ka' ? event.title_ka : event.title_en;
  const desc = lang === 'ka' ? event.description_ka : event.description_en;
  const fullDate = formatFullDate(event.event_date, lang);

  const handleCardClick = () => {
    if (isHoverDevice) return;
    setExpanded(!expanded);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-[#EDE8DF] rounded-3xl overflow-hidden hover:border-[#B8860B]/40 transition-all cursor-pointer group"
    >
      {/* Top gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-[#B8860B] via-[#D4A017] to-[#B8860B]" />

      <div className="p-8">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <h3 className="font-serif italic text-[17px] leading-tight text-[#1A1410] group-hover:text-[#B8860B] transition-colors">
              {title}
            </h3>
            <p className="text-[#B8860B] mt-3 text-sm">
              {fullDate} · {event.event_time}
            </p>
          </div>

          {/* "Soon" badge */}
          <div className="bg-[#E8F5EE] border border-[#2D6A4F]/20 px-5 py-2 rounded-2xl flex items-center gap-2 text-[#2D6A4F] text-xs whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#52B788]"></span>
            </span>
            {lang === 'ka' ? 'მოდის' : 'soon'}
          </div>
        </div>

        {desc && (
          <div
            className={`mt-6 text-[#6B5E52] leading-relaxed italic text-[15px] overflow-hidden transition-all duration-700 ${
              expanded ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {desc}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          {/* Countdown */}
          <div className="flex items-end gap-4">
            {timeLeft.days > 0 && (
              <>
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-[#B8860B] tabular-nums">{timeLeft.days}</div>
                  <div className="text-[10px] tracking-widest uppercase text-[#9B8E7F] mt-1">{lang === 'ka' ? 'დღე' : 'd'}</div>
                </div>
                <div className="text-[#B8860B]/30 text-3xl pb-2">:</div>
              </>
            )}

            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-[#B8860B] tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[10px] tracking-widest uppercase text-[#9B8E7F] mt-1">{lang === 'ka' ? 'სთ' : 'hr'}</div>
            </div>
            <div className="text-[#B8860B]/30 text-3xl pb-2">:</div>

            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-[#B8860B] tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[10px] tracking-widest uppercase text-[#9B8E7F] mt-1">{lang === 'ka' ? 'წთ' : 'min'}</div>
            </div>
            <div className="text-[#B8860B]/30 text-3xl pb-2">:</div>

            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-[#B8860B] tabular-nums">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[10px] tracking-widest uppercase text-[#9B8E7F] mt-1">{lang === 'ka' ? 'წმ' : 'sec'}</div>
            </div>
          </div>

          {event.meeting_link && (
            <a
              href={event.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#B8860B] hover:bg-[#D4A017] active:scale-95 text-white px-8 py-3.5 rounded-2xl text-sm tracking-widest transition-all"
            >
              ↗ {lang === 'ka' ? 'შესვლა' : 'Join'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const PastCard = ({ event, lang, idx, total }: { event: MyEvent; lang: string; idx: number; total: number }) => {
  const [open, setOpen] = useState(false);

  const title = lang === 'ka' ? event.title_ka : event.title_en;
  const desc = lang === 'ka' ? event.description_ka : event.description_en;
  const d = new Date(event.event_date);
  const mons_ka = ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'];
  const mons_en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mon = lang === 'ka' ? mons_ka[d.getMonth()] : mons_en[d.getMonth()];

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* Date Circle */}
      <div className="flex flex-col items-center min-w-[48px]">
        <div
          onClick={() => setOpen(!open)}
          className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
            open ? 'bg-[#F5E6C8] border-[#B8860B]' : 'bg-[#F7F2E8] border-[#EDE8DF]'
          }`}
        >
          <span className="font-serif text-[15px] font-bold text-[#1A1410]">{d.getDate()}</span>
          <span className="text-[8px] tracking-widest uppercase text-[#9B8E7F] font-mono">{mon}</span>
        </div>
        {idx < total - 1 && (
          <div className="w-[1.5px] flex-1 min-h-6 bg-gradient-to-b from-[#EDE8DF] to-transparent mt-2" />
        )}
      </div>

      {/* Past Card */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex-1 border rounded-3xl bg-white transition-all mb-4 cursor-pointer hover:border-[#B8860B]/40 ${
          open ? 'border-[#B8860B]/30 bg-[#FFFDF7]' : 'border-[#EDE8DF]'
        }`}
      >
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <h4 className={`font-serif italic text-[15px] transition-colors ${open ? 'text-[#B8860B]' : 'text-[#1A1410]'}`}>
              {title}
            </h4>
            <span className="text-[#9B8E7F] text-xs font-mono">{event.event_time}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest bg-[#EDE8DF] text-[#9B8E7F] px-4 py-1.5 rounded-xl">
              {lang === 'ka' ? 'ჩავლილი' : 'PAST'}
            </span>
            <span className={`text-xl text-[#9B8E7F] transition-transform ${open ? 'rotate-180' : ''}`}>↓</span>
          </div>
        </div>

        {desc && (
          <div
            className={`px-5 pb-6 overflow-hidden transition-all duration-500 ease-in-out ${
              open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-[#EDE8DF] pt-5">
              <p className="text-[#6B5E52] text-[14px] leading-relaxed italic">{desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EventsSpace = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { ref, isVisible } = useInView();
  const { data, isLoading, isError } = useFetchMyEvents(isVisible);

  const upcoming = data?.filter((e: MyEvent) => e.status === 'upcoming') ?? [];
  const past = data
    ?.filter((e: MyEvent) => e.status === 'past')
    .sort((a, b) => new Date(b.eventUtc).getTime() - new Date(a.eventUtc).getTime()) ?? [];

  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div ref={ref} className="min-h-screen bg-[#FDFAF4] text-[#1A1410] pb-20">
      <div className="max-w-[960px] mx-auto px-6 pt-12">
        <div className="mb-10">
          <span className="text-[#B8860B] text-xs tracking-[3px] uppercase font-mono">— ჩემი ივენთები</span>
          <h2 className="font-serif italic text-4xl mt-2">ივენთების სივრცე</h2>
        </div>

        {/* Toggle Buttons */}
        <div className="inline-flex bg-[#EDE8DF] p-1.5 rounded-2xl mb-10">
          <button
            onClick={() => setView('upcoming')}
            className={`px-8 py-3 text-xs tracking-widest font-mono rounded-xl transition-all ${
              view === 'upcoming' 
                ? 'bg-white shadow text-[#B8860B]' 
                : 'text-[#9B8E7F] hover:bg-white/70'
            }`}
          >
            მომდევნო · {upcoming.length}
          </button>
          <button
            onClick={() => setView('past')}
            className={`px-8 py-3 text-xs tracking-widest font-mono rounded-xl transition-all ${
              view === 'past' 
                ? 'bg-white shadow text-[#B8860B]' 
                : 'text-[#9B8E7F] hover:bg-white/70'
            }`}
          >
            ჩავლილი · {past.length}
          </button>
        </div>

        {view === 'upcoming' && (
          <div className="space-y-6">
            {upcoming.length === 0 ? (
              <div className="border border-dashed border-[#EDE8DF] rounded-3xl p-20 text-center">
                <p className="font-serif italic text-[#9B8E7F]">
                  {lang === 'ka' ? 'დაგეგმილი ივენთი არ არის' : 'No upcoming events'}
                </p>
              </div>
            ) : (
              upcoming.map((event) => (
                <UpcomingCard key={event.id} event={event} lang={lang} />
              ))
            )}
          </div>
        )}

        {view === 'past' && (
          <div className="space-y-6">
            {past.length === 0 ? (
              <div className="border border-dashed border-[#EDE8DF] rounded-3xl p-20 text-center">
                <p className="font-serif italic text-[#9B8E7F]">
                  {lang === 'ka' ? 'ჩავლილი ივენთი არ არის' : 'No past events'}
                </p>
              </div>
            ) : (
              past.map((event, idx) => (
                <PastCard 
                  key={event.id} 
                  event={event} 
                  lang={lang} 
                  idx={idx} 
                  total={past.length} 
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSpace;