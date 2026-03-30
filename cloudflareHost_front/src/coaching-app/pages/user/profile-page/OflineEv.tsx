import { useTranslation } from 'react-i18next';
import { useFetchMyEvents } from '../../../components/hook/useFetchEvents';
import { useInView } from '../../../components/hook/useInView';

 interface MyEvent {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka?: string;
  description_en?: string;
  event_date: string;
  event_time: string;
  timezone: string;
  utcOffset: number;
  eventUtc: string;
  reminderMinutes: number;
  meeting_type: "online" | "offline";
  meeting_link?: string;
  platform?: string;
  city?: string;
  address?: string;
  notified: number;
  status: "upcoming" | "past";
  created_at: string;
}




const OflineEv = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { ref, isVisible } = useInView();
  const { data, isLoading, isError } = useFetchMyEvents(isVisible);

  const past = data
    ?.filter(e => e.status === 'past')
    .sort((a, b) => new Date(b.eventUtc).getTime() - new Date(a.eventUtc).getTime()) ?? [];

    if(past.length === 0) return

  return (
    <div ref={ref} >
    
      </div>
 
   
  );
};

export default OflineEv;