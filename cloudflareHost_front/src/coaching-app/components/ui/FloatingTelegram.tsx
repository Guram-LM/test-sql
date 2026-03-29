import { useState, useRef, useEffect } from "react";

const SIZE = 64;
const THRESHOLD = 0.20;
const TELEGRAM_LINK = "https://t.me/+995555565464";

interface Position {
  x: number;
  y: number;
}

export default function FloatingTelegram(): JSX.Element | null {
  const isBrowser = typeof window !== "undefined";

  const [position, setPosition] = useState<Position>(() => ({
    x: isBrowser ? window.innerWidth - SIZE - 20 : 0,
    y: isBrowser ? window.innerHeight - SIZE - 20 : 0,
  }));

  const [visible, setVisible] = useState<boolean>(true);
  const [dismissing, setDismissing] = useState<boolean>(false);

  const dragging = useRef<boolean>(false);
  const hasDragged = useRef<boolean>(false);
  const dragDistance = useRef<number>(0);
  const offset = useRef<Position>({ x: 0, y: 0 });
  const positionRef = useRef<Position>(position);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const dismiss = () => {
    setDismissing(true);
    setTimeout(() => setVisible(false), 400);
  };

  useEffect(() => {
    if (!isBrowser || !containerRef.current) return;

    const getCoords = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        return { x: e.touches[0]?.clientX ?? 0, y: e.touches[0]?.clientY ?? 0 };
      }
      return { x: e.clientX, y: e.clientY };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {

      dragging.current = true;
      hasDragged.current = false;
      dragDistance.current = 0;
      const { x, y } = getCoords(e);
      offset.current = {
        x: x - positionRef.current.x,
        y: y - positionRef.current.y,
      };
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const { x, y } = getCoords(e);
      const dx = x - offset.current.x - positionRef.current.x;
      const dy = y - offset.current.y - positionRef.current.y;
      dragDistance.current += Math.sqrt(dx * dx + dy * dy);

      if (dragDistance.current > 5) {
        e.preventDefault();
        hasDragged.current = true;
      }

      const newPos = {
        x: x - offset.current.x,
        y: y - offset.current.y,
      };
      positionRef.current = newPos;
      setPosition(newPos);
    };

    const handleEnd = () => {
      if (!dragging.current) return;
      dragging.current = false;

      const pos = positionRef.current;
      const limit = SIZE * THRESHOLD;
      const outside =
        pos.x + SIZE - limit < 0 ||
        pos.x + limit > window.innerWidth ||
        pos.y + SIZE - limit < 0 ||
        pos.y + limit > window.innerHeight;

      if (outside) dismiss();
    };

    const el = containerRef.current;
    el.addEventListener("mousedown", handleStart, { passive: true });
    el.addEventListener("touchstart", handleStart, { passive: true });

    window.addEventListener("mousemove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      el.removeEventListener("mousedown", handleStart);
      el.removeEventListener("touchstart", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [visible]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>) => {
    if (hasDragged.current) {
      e.preventDefault();
      return;
    }

  };

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        left: position.x,
        top: position.y,
        userSelect: "none",
        touchAction: "none",
        opacity: dismissing ? 0 : 1,
        transform: dismissing ? "scale(0.5)" : "scale(1)",
        transition: dismissing ? "opacity 0.4s ease, transform 0.4s ease" : "none",
      }}
      className="fixed z-9989 w-16 h-16 rounded-full bg-linear-to-br from-sky-500 to-cyan-400 shadow-2xl shadow-black/30 select-none cursor-grab active:cursor-grabbing"
    >
      <a
        href={TELEGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Telegram"
        draggable={false}
        onClick={handleClick}
        onTouchEnd={handleClick as unknown as React.TouchEventHandler<HTMLAnchorElement>}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          pointerEvents: "auto",
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7" style={{ pointerEvents: "none" }}>
          <path d="M9.993 15.672l-.398 4.105c.57 0 .818-.244 1.118-.537l2.683-2.547 5.56 4.06c1.02.563 1.746.267 2.022-.942l3.67-17.2c.327-1.523-.55-2.117-1.543-1.75L1.42 9.166c-1.483.576-1.462 1.404-.252 1.776l5.76 1.796L20.56 4.95c.636-.42 1.216-.188.74.232" />
        </svg>
      </a>
    </div>
  );
}