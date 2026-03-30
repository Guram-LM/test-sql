import { useRef, useCallback, useEffect } from 'react';

export const useNotifySound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isInitializedRef = useRef(false);

  const initializeAudio = useCallback(() => {
    if (!isInitializedRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        isInitializedRef.current = true;
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

 
  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown'];
    
    const handleInteraction = () => {
      initializeAudio();
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [initializeAudio]);

  const playNotification = useCallback((times: number = 1) => {

    if (!audioContextRef.current && !isInitializedRef.current) {
      initializeAudio();
    }

    if (!audioContextRef.current) {
      return;
    }

    const ctx = audioContextRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        playBeeps(ctx, times);
      }).catch(err => {
        console.error(err);
      });
    } else {
      playBeeps(ctx, times);
    }
  }, [initializeAudio]);

  const playBeeps = (ctx: AudioContext, times: number) => {
    const playBeep = (startTime: number) => {
      try {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, startTime); 
        oscillator.frequency.exponentialRampToValueAtTime(440, startTime + 0.1); 

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      } catch (error) {
        console.error(error);
      }
    };

    const currentTime = ctx.currentTime;
    for (let i = 0; i < times; i++) {
      playBeep(currentTime + i * 0.4);
    }
  };

  return { playNotification, initializeAudio };
};