import { useTranslation } from 'react-i18next';

import { useState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { formatFullDate } from '../../event/date';
import NoEventsState from '../../event/NoEventsState';
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


};



const OnlineEvent = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { ref, isVisible } = useInView();
  const { data, isLoading, isError } = useFetchMyEvents(isVisible);

  const upcoming = data?.filter(e => e.status === 'upcoming') ?? [];

  if(isError) return <NoEventsState/>
  

  return (
    <div ref={ref} >

    
      </div>

  );
};

export default OnlineEvent;