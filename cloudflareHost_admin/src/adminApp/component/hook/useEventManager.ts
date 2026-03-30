import { useState } from "react";
import { $axios } from "../axios/Axios";
import type { Event } from "../interface/interface";

export const useEventManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = async (eventData: Event) => {
    setLoading(true);
    setError(null);

    try {
      if (!eventData.date || !eventData.time) {
        throw new Error("Event must have a valid date and time");
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const utcOffset = new Date().getTimezoneOffset() * -1;

      const payload = {
        ...eventData,
        reminderMinutes: eventData.reminderMinutes || "5",
        timezone,
        utcOffset
      };

      const response = await $axios.post("/events", payload);

      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Unknown error";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await $axios.get("/events");
      return response.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Unknown error";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    setLoading(true);
    setError(null);

    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const utcOffset = new Date().getTimezoneOffset() * -1;

      const payload = {
        ...eventData,
        timezone,
        utcOffset
      };

      const response = await $axios.put(`/events/${id}`, payload);

      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Unknown error";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await $axios.delete(`/events/${id}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Unknown error";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    loading,
    error,
  };
};
