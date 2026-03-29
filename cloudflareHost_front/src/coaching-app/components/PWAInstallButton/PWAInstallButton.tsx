import { useEffect, useState, useRef, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type Mode = 'android' | 'ios' | null;

export default function PWAInstallBanner() {
  const [prompt, setPrompt]       = useState<BeforeInstallPromptEvent | null>(null);
  const [mode, setMode]           = useState<Mode>(null);
  const [visible, setVisible]     = useState(false);
  const [hiding, setHiding]       = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [done, setDone]           = useState(false);
  const autoRef                   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progRef                   = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (sessionStorage.getItem('pwa-done')) return;

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    if (isIOS) {
      setMode('ios');
      setTimeout(() => setVisible(true), 2500);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setMode('android');
      setTimeout(() => setVisible(true), 2500);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      sessionStorage.setItem('pwa-done', '1');
      setDone(true);
    });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const stopTimer = useCallback(() => {
    if (autoRef.current) clearTimeout(autoRef.current);
    if (progRef.current) progRef.current.style.animation = 'none';
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (progRef.current) {
      void progRef.current.offsetWidth;
      progRef.current.style.animation = 'pwa-prog 10s linear forwards';
    }
    autoRef.current = setTimeout(() => hide(), 10000);
  }, [stopTimer]);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => startTimer(), 300);
      return () => clearTimeout(t);
    } else {
      stopTimer();
    }
  }, [visible]);

  const hide = useCallback(() => {
    stopTimer();
    setHiding(true);
    setTimeout(() => {
      setVisible(false);
      setHiding(false);
      setCollapsed(true);
    }, 350);
  }, [stopTimer]);

  const handleInstall = async () => {
    if (mode === 'ios') {
      stopTimer();
      setModalOpen(true);
      return;
    }
    if (!prompt) return;
    stopTimer();
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      sessionStorage.setItem('pwa-done', '1');
      setDone(true);
      hide();
    } else {
      startTimer();
    }
  };

  if (done || (!visible && !collapsed)) return null;

  return (
    <>
      <style>{`
        @keyframes pwa-up   { from{transform:translateX(-50%) translateY(calc(100% + 28px));opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
        @keyframes pwa-down { from{transform:translateX(-50%) translateY(0);opacity:1} to{transform:translateX(-50%) translateY(calc(100% + 28px));opacity:0} }
        @keyframes pwa-bob  { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-6px) rotate(1.5deg)} }
        @keyframes pwa-shim { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pwa-glow { 0%,100%{box-shadow:0 0 0 0 rgba(232,146,10,.4)} 60%{box-shadow:0 0 0 14px rgba(232,146,10,0)} }
        @keyframes pwa-rip  { 0%{transform:scale(0);opacity:.5} 100%{transform:scale(4);opacity:0} }
        @keyframes pwa-fin  { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pwa-prog { from{width:100%} to{width:0%} }
        @keyframes pwa-min  { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        .pwa-s1{animation:pwa-fin .3s ease .04s both}
        .pwa-s2{animation:pwa-fin .3s ease .10s both}
        .pwa-s3{animation:pwa-fin .3s ease .16s both}
      `}</style>

      {collapsed && !visible && (
        <button
          onClick={() => { setCollapsed(false); setVisible(true); }}
          style={{
            position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: 52, height: 20,
            background: '#111116',
            border: '.5px solid rgba(232,146,10,.2)', borderBottom: 'none',
            borderRadius: '10px 10px 0 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 9997,
            boxShadow: '0 -2px 10px rgba(232,146,10,.1)',
            transition: 'height .18s',
          }}
          onMouseEnter={e => (e.currentTarget.style.height = '25px')}
          onMouseLeave={e => (e.currentTarget.style.height = '20px')}
          aria-label="გახსნა"
        >
          <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
            <path d="M7 1L11.5 5.5H2.5L7 1Z" fill="#E8920A" opacity=".6" />
          </svg>
        </button>
      )}

      {visible && (
        <div style={{
          position: 'fixed', bottom: 20, left: '50%',
          width: 'min(calc(100vw - 28px), 420px)',
          zIndex: 9999,
          transform: 'translateX(-50%)',
          filter: 'drop-shadow(0 16px 40px rgba(0,0,0,.5)) drop-shadow(0 2px 8px rgba(232,146,10,.15))',
          animation: hiding
            ? 'pwa-down .35s cubic-bezier(.4,0,1,1) forwards'
            : 'pwa-up .55s cubic-bezier(.16,1,.3,1) forwards',
        }}>
          <div style={{ background: '#111116', border: '.5px solid rgba(232,146,10,.22)', borderRadius: 22, overflow: 'hidden' }}>

            <div style={{
              height: 3,
              background: 'linear-gradient(90deg,#E8920A,#F5B93E,#5BA3E8,#2D7DD2,#FF7C2A,#E8920A)',
              backgroundSize: '300% auto',
              animation: 'pwa-shim 4s linear infinite',
            }} />

            <div style={{ padding: '14px 16px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

                <div style={{
                  width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                  background: 'linear-gradient(145deg,#FF7C2A 0%,#E8920A 50%,#F5B93E 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                  animation: 'pwa-bob 4s ease-in-out infinite',
                  boxShadow: '0 4px 14px rgba(232,146,10,.4)',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,.22),transparent 60%)' }} />
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    ნუცა ბახტაძე
                  </p>
                  <p style={{ fontSize: 13.5, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    EQ ქოუჩი
                  </p>
                </div>

                <button
                  onClick={handleInstall}
                  style={{
                    flexShrink: 0, position: 'relative', overflow: 'hidden',
                    padding: '9px 20px', borderRadius: 12, border: 'none',
                    background: 'linear-gradient(135deg,#FF7C2A,#E8920A)',
                    color: '#fff', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                    animation: 'pwa-glow 2.6s ease-in-out infinite',
                    transition: 'opacity .15s, transform .12s',
                    textShadow: '0 1px 2px rgba(0,0,0,.2)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '.91'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
                  onMouseDown={e => addRipple(e)}
                >
                  ჩამოტვირთვა
                </button>

                <button
                  onClick={hide}
                  style={{
                    flexShrink: 0, marginLeft: 2,
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(255,255,255,.07)',
                    border: '.5px solid rgba(255,255,255,.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,.4)',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.13)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.color = 'rgba(255,255,255,.4)'; }}
                >✕</button>
              </div>

              <div style={{ height: 2, background: 'rgba(255,255,255,.07)', borderRadius: 1, marginTop: 12, overflow: 'hidden' }}>
                <div
                  ref={progRef}
                  style={{ height: '100%', background: 'rgba(232,146,10,.45)', borderRadius: 1, width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,.65)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            paddingBottom: 20,
          }}
          onClick={e => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div style={{
            width: 'min(calc(100vw - 28px), 420px)',
            background: '#111116',
            border: '.5px solid rgba(232,146,10,.2)',
            borderRadius: 22, overflow: 'hidden',
            animation: 'pwa-min .3s cubic-bezier(.16,1,.3,1)',
          }}>
            <div style={{
              height: 3,
              background: 'linear-gradient(90deg,#E8920A,#F5B93E,#5BA3E8,#2D7DD2,#E8920A)',
              backgroundSize: '300% auto',
              animation: 'pwa-shim 4s linear infinite',
            }} />

            <div style={{ padding: '16px 17px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                  background: 'linear-gradient(135deg,#FF7C2A,#E8920A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 500, color: '#fff' }}>მთავარ ეკრანზე დამატება</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>Safari · iPhone / iPad</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    width: 26, height: 26, borderRadius: '50%', border: 'none', flexShrink: 0,
                    background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: 11,
                  }}
                >✕</button>
              </div>

              <div style={{ height: .5, background: 'linear-gradient(90deg,transparent,rgba(232,146,10,.3),rgba(91,163,232,.3),transparent)', marginBottom: 12 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { text: <span>Safari-ში დააჭირე <b style={{ color: 'rgba(255,255,255,.88)' }}>გაზიარების ↑</b> ღილაკს</span>, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>, cls: 'pwa-s1' },
                  { text: <span>სიაში აირჩიე <b style={{ color: 'rgba(255,255,255,.88)' }}>„მთავარ ეკრანზე დამატება"</b></span>, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>, cls: 'pwa-s2' },
                ].map((s, i) => (
                  <div key={i} className={s.cls} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg,#2D7DD2,#5BA3E8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: '#fff',
                      boxShadow: '0 2px 6px rgba(45,125,210,.35)',
                    }}>{i + 1}</div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', lineHeight: 1.5, flex: 1 }}>{s.text}</p>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(232,146,10,.1)', border: '.5px solid rgba(232,146,10,.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8920A',
                    }}>{s.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const r = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  Object.assign(r.style, {
    position: 'absolute', width: '60px', height: '60px',
    background: 'rgba(255,255,255,.3)', borderRadius: '50%',
    top: e.clientY - rect.top - 30 + 'px',
    left: e.clientX - rect.left - 30 + 'px',
    animation: 'pwa-rip .6s ease-out forwards',
    pointerEvents: 'none',
  });
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
}