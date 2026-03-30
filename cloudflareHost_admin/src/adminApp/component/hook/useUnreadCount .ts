import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';
import { useLocation } from 'react-router-dom';
import { $axios } from '../axios/Axios';

export const useUnreadCount = (resource: 'contacts' | 'orders', route: string) => {
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {

        const res = await $axios.get(`/${resource}/unread-count`);

        setCount(res.data.count || 0);
      } catch (error) {
        console.error(`Error fetching ${resource} unread count:`, error);
      }
    };

    fetchUnreadCount();
  }, [resource]);

  useEffect(() => {
    if (location.pathname === route) {
 
      setCount(0);
      
      const markAsRead = async () => {
        try {
          await $axios.post(`/${resource}/mark-read`);

        } catch (error) {
          console.error(`Error marking ${resource} as read:`, error);
        }
      };
      
      markAsRead();
    }
  }, [location.pathname, route, resource]);


  useSocket((type) => {

    
    const eventType = resource === 'contacts' ? 'contact' : 'order';
    
    if (type === eventType && location.pathname !== route) {
      setCount(prev => prev + 1);
    }
  });

  return count;
};