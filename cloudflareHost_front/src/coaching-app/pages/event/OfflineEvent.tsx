import { useTranslation } from 'react-i18next';
import { useInView } from '../../components/hook/useInView';
import { useFetchMyEvents } from '../../components/hook/useFetchEvents';
import type { MyEvent } from '../../components/interface/Interface';
import { formatFullDate } from './date';



const PastCard = ({ event, lang }: { event: MyEvent; lang: string }) => {
  const title = lang === 'ka' ? event.title_ka : event.title_en;
  const desc  = lang === 'ka' ? event.description_ka : event.description_en;

  const date = new Date(event.event_date);
  const fullDate = formatFullDate(event.event_date, lang);

  const shortMonths = {
    ka: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  
  const isKa = lang?.startsWith('ka');
  const monthIndex = date.getMonth();
  
  const monthShort = isKa
    ? shortMonths.ka[monthIndex]
    : shortMonths.en[monthIndex];
  

  return (
    <div
      className="group relative rounded-xl border border-[#2E2820] bg-[#12110F]/80 backdrop-blur-xl 
      p-5 overflow-hidden transition-all duration-500 
      hover:border-[#C9A84C]/40 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] 
      opacity-80 hover:opacity-100"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}


    >
      <div className="absolute top-3 -right-8 rotate-45 translate-y-2 translate-x-2 bg-[#C9A84C] shadow-lg z-20 px-12 py-2">
        <span className="block text-center text-[10px] font-bold tracking-[2px] text-[#1A1A1A] leading-none">
          {lang === 'ka' ? 'ჩავლილი' : 'PAST'}
        </span>
      </div>

    
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
        bg-linear-to-r from-[#C9A84C]/5 via-transparent to-[#C9A84C]/5 rounded-xl" 
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="relative z-10 flex gap-4">

        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-[#0D0C0A] border border-[#3A3028] shadow-inner">
          <span className="text-lg font-semibold text-[#E8D5A3] leading-none">
            {date.getDate()}
          </span>
          <span
            className="text-[10px] text-[#9A8E7A] uppercase tracking-widest"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {monthShort}
          </span>
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-[#F5F0E8] group-hover:text-[#E8D5A3] transition leading-snug">
              {title}
            </h3>
          </div>

          <p className="text-[11px] text-[#8A7F6A] mt-1 font-mono">
            {event.event_time} · {fullDate}
          </p>

          {desc && (
            <p className="text-xs text-[#9A8E7A] mt-2 line-clamp-2 italic leading-relaxed">
              {desc}
            </p>
          )}

          <div className="mt-3">
            <span
              className="text-[10px] text-[#6B6050] tracking-widest uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {lang === 'ka' ? 'დასრულდა' : 'Completed'}
            </span>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

    </div>
  );
};


const OfflineEvent = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { ref, isVisible } = useInView();
  const { data, isLoading, isError } = useFetchMyEvents(isVisible);

  const past = data
    ?.filter(e => e.status === 'past')
    .sort((a, b) => new Date(b.eventUtc).getTime() - new Date(a.eventUtc).getTime()) ?? [];

    if(past.length === 0) return

  return (
    <div ref={ref} className="w-full bg-stone-100 md:p-10 px-10 pb-10">
      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#2E2820] border-t-[#6B6050] rounded-full animate-spin" />
        </div>
      )}
      {isError && (
        <p className="text-center text-red-400/70 text-sm py-10"
          style={{ fontFamily: "'DM Mono', monospace" }}>
          {lang === 'ka' ? 'ჩატვირთვა ვერ მოხერხდა' : 'Failed to load'}
        </p>
      )}


      <div className="relative z-10 max-w-6xl mx-auto md:py-20 pb-7 pt-20 ">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>

              <h2
                className="text-2xl md:text-4xl  font-semibold text-[#1A1A1A] italic "
              >
                {lang === "ka" ? "ჩავლილი ივენთი" : "Past event"}
              </h2>

            </div>

            {!isLoading && past && past.length > 0 && (
              <div className="flex-shrink-0 flex items-center gap-3 border border-[#C9A84C]/30 rounded-sm px-5 py-3 bg-[#FFFDF8]">
                <span
                  className="text-3xl font-light text-[#C9A84C]"
                >
                  {past.length}
                </span>
                <div className="w-[1px] h-6 bg-[#C9A84C]/30" />
                <span
                  className="text-[9px] tracking-[3px] uppercase text-[#8A7A5A]"
                >
                  {lang === "ka" ? "ჩავლილი ივენთი" : "Past event"}
                </span>
              </div>
            )}
          </div>
      </div>






      {past.length > 0 && (
        <div className="flex flex-col max-w-6xl mx-auto gap-3">
          {past.map((event) => (
            <PastCard key={event.id} event={event} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfflineEvent;