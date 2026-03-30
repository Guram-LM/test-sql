import { useState, useEffect, useRef } from "react";

/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --gold: #B8860B;
      --gold-light: #D4A017;
      --gold-pale: #F5E6C8;
      --cream: #FDFAF4;
      --cream-2: #F7F2E8;
      --stone: #EDE8DF;
      --warm-gray: #9B8E7F;
      --text-main: #1A1410;
      --text-sub: #6B5E52;
      --text-muted: #A89880;
      --green: #2D6A4F;
      --green-light: #52B788;
      --green-bg: #E8F5EE;
      --orange: #C44B1B;
      --orange-bg: #FEF0EA;
      --blue: #1D5FA8;
      --blue-bg: #EAF0FB;
      --indigo: #3730A3;
      --border: rgba(184,134,11,0.15);
      --border-soft: rgba(0,0,0,0.07);
      --shadow-sm: 0 2px 8px rgba(26,20,16,0.06);
      --shadow-md: 0 8px 32px rgba(26,20,16,0.10);
      --shadow-lg: 0 20px 60px rgba(26,20,16,0.12);
    }

    body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-main); }

    .serif { font-family: 'Playfair Display', Georgia, serif; }
    .mono  { font-family: 'DM Mono', monospace; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
    @keyframes scaleIn  { from { opacity:0; transform:scale(0.96); }       to { opacity:1; transform:scale(1); } }
    @keyframes shimmer  { from { background-position: -400px 0; } to { background-position: 400px 0; } }
    @keyframes spin     { to { transform: rotate(360deg); } }
    @keyframes ping     { 75%, 100% { transform: scale(2); opacity: 0; } }
    @keyframes arcDraw  { from { stroke-dashoffset: var(--arc-full); } to { stroke-dashoffset: var(--arc-offset); } }
    @keyframes barGrow  { from { width: 0; } to { width: var(--bar-w); } }
    @keyframes float    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

    .fade-up  { animation: fadeUp  0.55s cubic-bezier(.22,1,.36,1) both; }
    .scale-in { animation: scaleIn 0.45s cubic-bezier(.22,1,.36,1) both; }

    .card {
      background: #fff;
      border: 1px solid var(--border-soft);
      border-radius: 20px;
      box-shadow: var(--shadow-sm);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

    .tag {
      font-family: 'DM Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
    }

    .tab-btn {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      transition: all 0.25s;
      white-space: nowrap;
      border-radius: 10px;
    }
    .tab-btn.active {
      background: #fff;
      color: var(--gold);
      box-shadow: var(--shadow-sm);
    }
    .tab-btn:not(.active) {
      background: transparent;
      color: var(--warm-gray);
    }
    .tab-btn:not(.active):hover { color: var(--text-main); background: rgba(0,0,0,0.04); }

    input, button { font-family: inherit; }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--stone); border-radius: 4px; }
    ::-webkit-scrollbar-thumb { background: var(--gold-pale); border-radius: 4px; }

    .toggle-btn {
      padding: 8px 18px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      transition: all 0.25s;
    }
    .toggle-btn.on  { background: var(--gold); color: #fff; box-shadow: 0 4px 16px rgba(184,134,11,0.3); }
    .toggle-btn.off { background: transparent; color: var(--warm-gray); }
    .toggle-btn.off:hover { background: var(--stone); color: var(--text-main); }

    .post-card {
      border: 1px solid var(--border-soft);
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s;
      background: #fff;
    }
    .post-card:hover { border-color: var(--border); box-shadow: var(--shadow-sm); }
    .post-card.open  { border-color: rgba(184,134,11,0.3); background: #FFFDF7; }

    .input-field {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1.5px solid var(--border-soft);
      background: var(--cream-2);
      color: var(--text-main);
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      outline: none;
      transition: border 0.2s, box-shadow 0.2s;
    }
    .input-field:focus { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(184,134,11,0.08); }
    .input-field:disabled { opacity: 0.45; cursor: not-allowed; }

    .save-btn {
      width: 100%;
      padding: 13px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 500;
      transition: all 0.3s;
    }
    .save-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  `}</style>
);

/* ─── Types / Mock data ─────────────────────────────────────────────────────── */
const MOCK_USER = {
  id: 1, firstName: "ნინო", lastName: "გიორგაძე",
  email: "nino.giorgazde@eq.ge", joinedAt: "2024-03-10",
  eq_score: 78, streak: 12, totalEvents: 9, completedEvents: 7,
};

const MOCK_POSTS = [
  { id:1, title_ka:"ყოველი ემოცია შენი მასწავლებელია", title_en:"Every emotion is your teacher", content_ka:"გრძნობები სისუსტე არ არის — ისინი ინფორმაციაა. ისწავლე მათი მოსმენა ბრძოლის ნაცვლად. ეს პირველი ნაბიჯია EQ-ში.", content_en:"Feelings are not weakness — they are information. Learn to listen instead of fighting. This is the first step in EQ.", icon:"🌱", published_at:new Date(Date.now()-1800000).toISOString() },
  { id:2, title_ka:"ემპათია შენი თავიდან იწყება", title_en:"Empathy starts with you", content_ka:"სხვების გაგება შეუძლებელია საკუთარი თავის გაგების გარეშე. EQ-ის სიმძლავრე შენშივე ცხოვრობს.", content_en:"You cannot understand others without understanding yourself. The power of EQ lives within you.", icon:"💛", published_at:new Date(Date.now()-86400000).toISOString() },
  { id:3, title_ka:"პატარა ნაბიჯი — დიდი ცვლილება", title_en:"Small step, big change", content_ka:"სრულყოფილება მიზანი არ არის. ყოველდღიური პატარა ნაბიჯი — ეს ემოციური ზრდაა.", content_en:"Perfection is not the goal. Every small daily step is emotional growth.", icon:"✨", published_at:new Date(Date.now()-86400000*2).toISOString() },
  { id:4, title_ka:"შეიცნო შენი ტრიგერები", title_en:"Know your triggers", content_ka:"ტრიგერები ხშირად ჩვენი ყველაზე ძველი ჭრილობებიდან მოდის. მათი ამოცნობა — ეს სიძლიერეა.", content_en:"Triggers often come from our oldest wounds. Recognising them is strength.", icon:"🎯", published_at:new Date(Date.now()-86400000*3).toISOString() },
];

const MOCK_EVENTS = [
  { id:1, title_ka:"EQ სესია — თვითშეგნება", title_en:"EQ Session — Self-Awareness", description_ka:"ღრმა ემოციური ინტელექტის სავარჯიშოები", description_en:"Deep emotional intelligence exercises", event_date:new Date(Date.now()+86400000*3).toISOString(), event_time:"19:00", eventUtc:new Date(Date.now()+86400000*3).toISOString(), status:"upcoming", meeting_link:"https://meet.google.com" },
  { id:2, title_ka:"ჯგუფური კოუჩინგი", title_en:"Group Coaching", description_ka:"ერთობლივი სწავლა და ზრდა", description_en:"Collaborative growth", event_date:new Date(Date.now()-86400000*4).toISOString(), event_time:"18:00", eventUtc:new Date(Date.now()-86400000*4).toISOString(), status:"past" },
  { id:3, title_ka:"ემპათიის სემინარი", title_en:"Empathy Workshop", description_ka:"სოციალური ინტელექტის გაღრმავება", description_en:"Social intelligence deepening", event_date:new Date(Date.now()-86400000*18).toISOString(), event_time:"17:30", eventUtc:new Date(Date.now()-86400000*18).toISOString(), status:"past" },
];

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
function relTime(dateStr, lang) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff/60000), h = Math.floor(diff/3600000), d = Math.floor(diff/86400000);
  if (lang==='ka') { if(m<60) return `${m} წთ წინ`; if(h<24) return `${h} სთ წინ`; return `${d} დღ წინ`; }
  if(m<60) return `${m}m ago`; if(h<24) return `${h}h ago`; return `${d}d ago`;
}

function useCountdown(utc) {
  const get = () => {
    const d = new Date(utc).getTime() - Date.now();
    if (d<=0) return null;
    return { days:Math.floor(d/86400000), hours:Math.floor((d/3600000)%24), minutes:Math.floor((d/60000)%60), seconds:Math.floor((d/1000)%60) };
  };
  const [t,set] = useState(get);
  useEffect(()=>{ const id=setInterval(()=>set(get()),1000); return()=>clearInterval(id); },[utc]);
  return t;
}

function useAnimatedCount(target, duration=1200) {
  const [val,setVal] = useState(0);
  useEffect(()=>{
    let start=null;
    const tick=(ts)=>{
      if(!start) start=ts;
      const p=Math.min((ts-start)/duration,1);
      const ease=1-Math.pow(1-p,3);
      setVal(Math.floor(ease*target));
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[target]);
  return val;
}

/* ─── Avatar ─────────────────────────────────────────────────────────────────── */
const Avatar = ({ name, size=72 }) => {
  const initials = name.trim().split(' ').map(w=>w[0]??'').join('').slice(0,2).toUpperCase();
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', flexShrink:0, position:'relative',
      background:'linear-gradient(135deg, var(--gold-pale) 0%, #E8D5A0 100%)',
      border:'2.5px solid var(--gold)', boxShadow:'0 4px 20px rgba(184,134,11,0.2)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:size*0.3, fontFamily:"'Playfair Display', serif", fontStyle:'italic',
      color:'var(--gold)', fontWeight:600 }}>
      {initials}
      <div style={{ position:'absolute', bottom:2, right:2, width:12, height:12,
        borderRadius:'50%', background:'var(--green-light)',
        border:'2px solid #fff', boxShadow:'0 2px 6px rgba(82,183,136,0.4)' }} />
    </div>
  );
};

/* ─── EQ Arc ─────────────────────────────────────────────────────────────────── */
const EQArc = ({ score }) => {
  const count = useAnimatedCount(score);
  const r=44, sw=7, cx=56, cy=56;
  const circ=2*Math.PI*r, arc=circ*0.75;
  const offset = arc - (count/100)*arc;
  const color = score>=75?'var(--green-light)':score>=50?'var(--gold)':'#E07B54';
  return (
    <div style={{ position:'relative', width:112, height:112, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <svg width={112} height={112} style={{ transform:'rotate(135deg)', position:'absolute' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--stone)" strokeWidth={sw} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circ}`}
          strokeDashoffset={offset}
          style={{ transition:'stroke-dashoffset 1.4s cubic-bezier(.34,1.56,.64,1)', filter:`drop-shadow(0 0 8px ${color}88)` }} />
      </svg>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:1 }}>
        <span className="mono" style={{ fontSize:22, fontWeight:700, color, lineHeight:1 }}>{count}</span>
        <span className="mono" style={{ fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--warm-gray)', marginTop:2 }}>eq</span>
      </div>
    </div>
  );
};

/* ─── Streak dots ────────────────────────────────────────────────────────────── */
const StreakDots = ({ streak, lang }) => {
  const days=7, lit=Math.min(streak,days);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <div style={{ display:'flex', gap:5 }}>
        {Array.from({length:days}).map((_,i)=>(
          <div key={i} style={{ width:10, height:10, borderRadius:'50%',
            background:i<lit?'var(--orange)':'var(--stone)',
            boxShadow:i<lit?'0 0 8px rgba(196,75,27,0.4)':'none',
            transition:'all 0.3s' }} />
        ))}
      </div>
      <span className="mono" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--warm-gray)' }}>
        {lang==='ka'?`${streak} დღიანი სერია`:`${streak}-day streak`}
      </span>
    </div>
  );
};

/* ─── Stat Card ─────────────────────────────────────────────────────────────── */
const StatCard = ({ icon, value, label, color='var(--gold)', delay=0 }) => (
  <div className="card fade-up" style={{ padding:'20px', display:'flex', flexDirection:'column', gap:12, animationDelay:`${delay}s`,
    background:'#fff', position:'relative', overflow:'hidden' }}>
    <div style={{ position:'absolute', top:-20, right:-20, fontSize:64, opacity:0.06, userSelect:'none', pointerEvents:'none' }}>{icon}</div>
    <span style={{ fontSize:24 }}>{icon}</span>
    <div>
      <div className="mono" style={{ fontSize:26, fontWeight:700, color, lineHeight:1 }}>{value}</div>
      <div className="mono" style={{ fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--warm-gray)', marginTop:4 }}>{label}</div>
    </div>
    <div style={{ height:3, borderRadius:4, background:`linear-gradient(90deg, ${color}30, ${color}80)`, marginTop:'auto' }} />
  </div>
);

/* ─── Animated Bar ───────────────────────────────────────────────────────────── */
const Bar = ({ label, val, max, color='var(--gold)' }) => {
  const [w,setW] = useState(0);
  const pct = Math.round((val/Math.max(max,1))*100);
  useEffect(()=>{ const t=setTimeout(()=>setW(pct),300); return()=>clearTimeout(t); },[pct]);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:12, color:'var(--text-sub)' }}>{label}</span>
        <span className="mono" style={{ fontSize:11, fontWeight:600, color }}>{w}%</span>
      </div>
      <div style={{ height:6, borderRadius:6, background:'var(--stone)', overflow:'hidden' }}>
        <div style={{ height:'100%', borderRadius:6, width:`${w}%`, background:`linear-gradient(90deg, ${color}90, ${color})`,
          boxShadow:`0 0 12px ${color}40`, transition:'width 1.3s cubic-bezier(.34,1.56,.64,1)' }} />
      </div>
    </div>
  );
};

/* ─── Overview ───────────────────────────────────────────────────────────────── */
const OverviewPanel = ({ user, lang }) => {
  const joined = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString(lang==='ka'?'ka-GE':'en-GB',{year:'numeric',month:'long',day:'numeric'})
    : '—';
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16 }}>
        <StatCard icon="🧠" value={user.eq_score??0}        label={lang==='ka'?'EQ ქულა':'EQ Score'}     color="var(--gold)"        delay={0} />
        <StatCard icon="🔥" value={`${user.streak??0}`}     label={lang==='ka'?'სერია':'Day Streak'}       color="var(--orange)"       delay={0.05} />
        <StatCard icon="✅" value={user.completedEvents??0} label={lang==='ka'?'ჩავლილი':'Completed'}     color="var(--green)"        delay={0.1} />
        <StatCard icon="📅" value={user.totalEvents??0}     label={lang==='ka'?'სულ ივენთი':'All Events'}  color="var(--blue)"         delay={0.15} />
      </div>

      <div className="card" style={{ padding:24, display:'flex', flexDirection:'column', gap:18 }}>
        <span className="tag">{lang==='ka'?'— პროგრესი':'— Progress'}</span>
        <Bar label={lang==='ka'?'ემოციური ინტელექტი':'Emotional Intelligence'} val={user.eq_score??0} max={100} color="var(--gold)" />
        <Bar label={lang==='ka'?'ივენთების დასწრება':'Events Completion'} val={user.completedEvents??0} max={user.totalEvents??1} color="var(--green-light)" />
        <Bar label={lang==='ka'?'ყოველდღ. სერია':'Streak Goal (30d)'} val={Math.min(user.streak??0,30)} max={30} color="var(--orange)" />
      </div>

      <div className="card" style={{ padding:'20px 24px', display:'flex', flexWrap:'wrap', gap:'24px 48px' }}>
        {[
          { label:lang==='ka'?'ელ-ფოსტა':'Email',  val:user.email },
          { label:lang==='ka'?'გაწევრება':'Joined', val:joined },
          { label:lang==='ka'?'სტატუსი':'Status',   val:lang==='ka'?'🟢 აქტიური':'🟢 Active' },
        ].map(item=>(
          <div key={item.label}>
            <div className="mono" style={{ fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--warm-gray)', marginBottom:4 }}>{item.label}</div>
            <div className="serif" style={{ fontSize:14, color:'var(--text-main)', fontStyle:'italic' }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Countdown Digit ────────────────────────────────────────────────────────── */
const Digit = ({ v, lbl }) => (
  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
    <div style={{ width:38, height:38, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center',
      background:'var(--cream-2)', border:'1.5px solid var(--border)', boxShadow:'0 2px 8px rgba(184,134,11,0.08)' }}>
      <span className="mono" style={{ fontSize:14, fontWeight:700, color:'var(--gold)' }}>{String(v).padStart(2,'0')}</span>
    </div>
    <span className="mono" style={{ fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--warm-gray)' }}>{lbl}</span>
  </div>
);

/* ─── Upcoming Event Card ────────────────────────────────────────────────────── */
const UpcomingCard = ({ event, lang }) => {
  const t = useCountdown(event.eventUtc);
  if (!t) return null;
  const title = lang==='ka'?event.title_ka:event.title_en;
  const desc  = lang==='ka'?event.description_ka:event.description_en;
  return (
    <div className="card" style={{ padding:0, overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
        background:'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))' }} />
      <div style={{ padding:'20px 20px 16px', display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
          <div>
            <h3 className="serif" style={{ fontSize:16, fontStyle:'italic', color:'var(--text-main)', lineHeight:1.3 }}>{title}</h3>
            {desc && <p style={{ fontSize:13, color:'var(--text-sub)', marginTop:4, fontStyle:'italic' }}>{desc}</p>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', borderRadius:20,
            background:'var(--green-bg)', border:'1.5px solid rgba(45,106,79,0.2)', flexShrink:0 }}>
            <span style={{ position:'relative', display:'inline-flex', width:8, height:8 }}>
              <span style={{ position:'absolute', inset:0, borderRadius:'50%', background:'var(--green-light)',
                animation:'ping 1.4s ease-out infinite', opacity:0.6 }} />
              <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--green-light)', display:'inline-flex' }} />
            </span>
            <span className="mono" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--green)' }}>
              {lang==='ka'?'მოდის':'soon'}
            </span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:4 }}>
            {t.days>0&&(<><Digit v={t.days} lbl={lang==='ka'?'დღ':'d'} /><span style={{ paddingBottom:14, fontSize:12, color:'var(--border)' }}>:</span></>)}
            <Digit v={t.hours}   lbl={lang==='ka'?'სთ':'h'} />
            <span style={{ paddingBottom:14, fontSize:12, color:'var(--gold-pale)' }}>:</span>
            <Digit v={t.minutes} lbl={lang==='ka'?'წთ':'m'} />
            <span style={{ paddingBottom:14, fontSize:12, color:'var(--gold-pale)' }}>:</span>
            <Digit v={t.seconds} lbl={lang==='ka'?'წმ':'s'} />
          </div>
          {event.meeting_link && (
            <a href={event.meeting_link} target="_blank" rel="noopener noreferrer"
              style={{ padding:'9px 20px', borderRadius:10, background:'var(--gold)', color:'#fff',
                fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase',
                textDecoration:'none', fontWeight:600, boxShadow:'0 4px 16px rgba(184,134,11,0.3)',
                transition:'all 0.2s' }}
              onMouseOver={e=>{ e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(184,134,11,0.4)'; }}
              onMouseOut={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 16px rgba(184,134,11,0.3)'; }}>
              ↗ {lang==='ka'?'შეერთება':'Join'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Past Event Card ────────────────────────────────────────────────────────── */
const PastCard = ({ event, lang, idx, total }) => {
  const [open,setOpen] = useState(false);
  const title = lang==='ka'?event.title_ka:event.title_en;
  const desc  = lang==='ka'?event.description_ka:event.description_en;
  const d = new Date(event.event_date);
  const mons_ka=['იან','თებ','მარ','აპრ','მაი','ივნ','ივლ','აგვ','სექ','ოქტ','ნოე','დეკ'];
  const mons_en=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const mon = lang==='ka'?mons_ka[d.getMonth()]:mons_en[d.getMonth()];
  return (
    <div style={{ display:'flex', gap:16 }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', minWidth:48 }}>
        <div style={{ width:48, height:48, borderRadius:12, display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', flexShrink:0,
          background:open?'var(--gold-pale)':'var(--cream-2)',
          border:`1.5px solid ${open?'var(--gold)':'var(--border-soft)'}`,
          transition:'all 0.3s', cursor:'pointer' }} onClick={()=>setOpen(o=>!o)}>
          <span className="serif" style={{ fontSize:15, fontWeight:700, color:'var(--text-main)', lineHeight:1 }}>{d.getDate()}</span>
          <span className="mono" style={{ fontSize:8, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--warm-gray)' }}>{mon}</span>
        </div>
        {idx < total-1 && <div style={{ width:1.5, flex:1, minHeight:16, background:'linear-gradient(to bottom, var(--border), transparent)', marginTop:6 }} />}
      </div>
      <div className="post-card" style={{ flex:1, marginBottom:idx<total-1?16:0 }}
        onClick={()=>setOpen(o=>!o)}>
        <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <div>
            <h4 className="serif" style={{ fontSize:14, fontStyle:'italic', color:open?'var(--gold)':'var(--text-main)', transition:'color 0.2s' }}>{title}</h4>
            <span className="mono" style={{ fontSize:9, color:'var(--warm-gray)' }}>{event.event_time}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            <span className="mono" style={{ fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase',
              padding:'3px 8px', borderRadius:6, background:'var(--stone)', color:'var(--warm-gray)' }}>
              {lang==='ka'?'ჩავლილი':'past'}
            </span>
            <span style={{ color:'var(--warm-gray)', transform:open?'rotate(180deg)':'none', transition:'transform 0.3s', fontSize:12 }}>↓</span>
          </div>
        </div>
        <div style={{ maxHeight:open?200:0, overflow:'hidden', transition:open?'max-height 0.55s cubic-bezier(.4,0,.2,1)':'max-height 0.35s cubic-bezier(.4,0,.2,1)' }}>
          {desc && (
            <div style={{ padding:'0 16px 14px' }}>
              <div style={{ height:1, background:'var(--border)', marginBottom:10 }} />
              <p className="serif" style={{ fontSize:13, fontStyle:'italic', color:'var(--text-sub)', lineHeight:1.6 }}>{desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Events Section ─────────────────────────────────────────────────────────── */
const EventsSection = ({ lang }) => {
  const [view,setView] = useState('upcoming');
  const upcoming = MOCK_EVENTS.filter(e=>e.status==='upcoming');
  const past = MOCK_EVENTS.filter(e=>e.status==='past').sort((a,b)=>new Date(b.eventUtc)-new Date(a.eventUtc));
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div>
        <span className="tag">{lang==='ka'?'— ჩემი ივენთები':'— My Events'}</span>
        <h2 className="serif" style={{ fontSize:26, fontStyle:'italic', color:'var(--text-main)', marginTop:4 }}>
          {lang==='ka'?'ივენთების სივრცე':'Event Space'}
        </h2>
      </div>
      <div style={{ display:'flex', gap:6, padding:6, borderRadius:14, background:'var(--stone)', width:'fit-content' }}>
        {[['upcoming',`${lang==='ka'?'მომდევნო':'Upcoming'} · ${upcoming.length}`],['past',`${lang==='ka'?'ჩავლილი':'Past'} · ${past.length}`]].map(([v,label])=>(
          <button key={v} className={`toggle-btn ${view===v?'on':'off'}`} onClick={()=>setView(v)}>{label}</button>
        ))}
      </div>
      {view==='upcoming' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {upcoming.length===0
            ? <div style={{ padding:40, textAlign:'center', border:'1.5px dashed var(--border)', borderRadius:16 }}>
                <p className="serif" style={{ fontStyle:'italic', color:'var(--warm-gray)', fontSize:14 }}>{lang==='ka'?'დაგეგმილი ივენთი არ არის':'No upcoming events'}</p>
              </div>
            : upcoming.map(e=><UpcomingCard key={e.id} event={e} lang={lang} />)
          }
        </div>
      )}
      {view==='past' && (
        <div>
          {past.length===0
            ? <div style={{ padding:40, textAlign:'center', border:'1.5px dashed var(--border)', borderRadius:16 }}>
                <p className="serif" style={{ fontStyle:'italic', color:'var(--warm-gray)', fontSize:14 }}>{lang==='ka'?'ჩავლილი ივენთი არ არის':'No past events'}</p>
              </div>
            : past.map((e,i)=><PastCard key={e.id} event={e} lang={lang} idx={i} total={past.length} />)
          }
        </div>
      )}
    </div>
  );
};

/* ─── Featured Post ──────────────────────────────────────────────────────────── */
const FeaturedPost = ({ post, lang }) => {
  const title   = lang==='ka'?post.title_ka:(post.title_en??post.title_ka);
  const content = lang==='ka'?post.content_ka:(post.content_en??post.content_ka);
  return (
    <div style={{ borderRadius:20, overflow:'hidden', position:'relative',
      background:'linear-gradient(135deg, var(--gold-pale) 0%, #FDF8EE 60%, #fff 100%)',
      border:'1.5px solid rgba(184,134,11,0.25)',
      boxShadow:'0 8px 40px rgba(184,134,11,0.12)' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
        background:'linear-gradient(90deg, var(--gold), var(--gold-light))' }} />
      <div style={{ padding:'28px 28px 24px', display:'flex', gap:20, alignItems:'flex-start' }}>
        {post.icon && (
          <div style={{ width:56, height:56, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:26, background:'#fff', border:'1.5px solid var(--border)', flexShrink:0,
            boxShadow:'0 4px 16px rgba(184,134,11,0.1)', animation:'float 4s ease-in-out infinite' }}>
            {post.icon}
          </div>
        )}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--gold)', boxShadow:'0 0 8px var(--gold)' }} />
            <span className="tag">{lang==='ka'?'დღის შეტყობინება':"Today's Message"}</span>
          </div>
          <h3 className="serif" style={{ fontSize:20, fontStyle:'italic', color:'var(--text-main)', lineHeight:1.3, marginBottom:10 }}>{title}</h3>
          {content && <p className="serif" style={{ fontSize:14, fontStyle:'italic', color:'var(--text-sub)', lineHeight:1.65 }}>{content}</p>}
          <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:24, height:1, background:'var(--border)' }} />
            <span className="mono" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--warm-gray)' }}>
              {relTime(post.published_at, lang)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Post Card ──────────────────────────────────────────────────────────────── */
const PostCard = ({ post, lang }) => {
  const [open,setOpen] = useState(false);
  const title   = lang==='ka'?post.title_ka:(post.title_en??post.title_ka);
  const content = lang==='ka'?post.content_ka:(post.content_en??post.content_ka);
  return (
    <div className={`post-card ${open?'open':''}`} onClick={()=>setOpen(o=>!o)}>
      <div style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
        {post.icon && <span style={{ fontSize:18 }}>{post.icon}</span>}
        <div style={{ flex:1, minWidth:0 }}>
          <h4 className="serif" style={{ fontSize:14, fontStyle:'italic', lineHeight:1.3,
            color:open?'var(--gold)':'var(--text-main)', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {title}
          </h4>
          <span className="mono" style={{ fontSize:9, color:'var(--warm-gray)' }}>{relTime(post.published_at, lang)}</span>
        </div>
        <span style={{ color:'var(--warm-gray)', transition:'transform 0.3s', transform:open?'rotate(180deg)':'none', flexShrink:0 }}>↓</span>
      </div>
      <div style={{ maxHeight:open?260:0, overflow:'hidden', transition:open?'max-height 0.55s cubic-bezier(.4,0,.2,1)':'max-height 0.35s cubic-bezier(.4,0,.2,1)' }}>
        {content && (
          <div style={{ padding:'0 16px 14px' }}>
            <div style={{ height:1, background:'var(--border)', marginBottom:10 }} />
            <p className="serif" style={{ fontSize:13, fontStyle:'italic', color:'var(--text-sub)', lineHeight:1.65 }}>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Motivation Section ─────────────────────────────────────────────────────── */
const MotivationSection = ({ lang, streak=12 }) => {
  const [featured, ...rest] = MOCK_POSTS;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
        <div>
          <span className="tag">{lang==='ka'?'— სამოტივაციო სივრცე':'— Motivation Space'}</span>
          <h2 className="serif" style={{ fontSize:26, fontStyle:'italic', color:'var(--text-main)', marginTop:4 }}>
            {lang==='ka'?'შეტყობინებები':'Messages'}
          </h2>
          <p className="serif" style={{ fontSize:13, fontStyle:'italic', color:'var(--text-sub)', marginTop:6, maxWidth:340, lineHeight:1.6 }}>
            {lang==='ka'?'ყოველდღიური შეტყობინებები შენი EQ განვითარებისთვის':'Daily messages to support your EQ growth'}
          </p>
        </div>
        <StreakDots streak={streak} lang={lang} />
      </div>
      <FeaturedPost post={featured} lang={lang} />
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <span className="mono" style={{ fontSize:20, fontWeight:700, color:'var(--gold)' }}>{MOCK_POSTS.length}</span>
        <span className="mono" style={{ fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--warm-gray)' }}>
          {lang==='ka'?'შეტყობინება · დააჭირე გასახსნელად':'messages · tap to expand'}
        </span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {rest.map(p=><PostCard key={p.id} post={p} lang={lang} />)}
      </div>
    </div>
  );
};

/* ─── Settings ───────────────────────────────────────────────────────────────── */
const SettingsPanel = ({ user, lang }) => {
  const [form, setForm] = useState({ firstName:user.firstName, lastName:user.lastName });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const dirty = form.firstName!==user.firstName || form.lastName!==user.lastName;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r=>setTimeout(r,900));
    setLoading(false); setSaved(true);
    setTimeout(()=>setSaved(false), 2800);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24, maxWidth:440 }}>
      <div>
        <span className="tag">{lang==='ka'?'— განახლება':'— Update'}</span>
        <h2 className="serif" style={{ fontSize:26, fontStyle:'italic', color:'var(--text-main)', marginTop:4 }}>
          {lang==='ka'?'პარამეტრები':'Settings'}
        </h2>
      </div>
      <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:16 }}>
        {[['firstName',lang==='ka'?'სახელი':'First Name'],['lastName',lang==='ka'?'გვარი':'Last Name']].map(([id,label])=>(
          <div key={id} style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label className="mono" style={{ fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--warm-gray)' }}>{label}</label>
            <input className="input-field" value={form[id]} onChange={e=>setForm(f=>({...f,[id]:e.target.value}))} />
          </div>
        ))}
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <label className="mono" style={{ fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--text-muted)' }}>
            {lang==='ka'?'ელ-ფოსტა':'Email'}
          </label>
          <input className="input-field" value={user.email} disabled />
        </div>
        <button type="submit" disabled={!dirty||loading} className="save-btn"
          style={{
            background: saved?'var(--green-bg)':dirty?'var(--gold)':'var(--stone)',
            color: saved?'var(--green)':dirty?'#fff':'var(--warm-gray)',
            border: saved?'1.5px solid rgba(45,106,79,0.3)':'none',
            boxShadow: dirty&&!saved?'0 4px 20px rgba(184,134,11,0.3)':'none',
          }}>
          {loading?'...' : saved?(lang==='ka'?'✓ შენახულია':'✓ Saved') : lang==='ka'?'შენახვა':'Save Changes'}
        </button>
      </form>
    </div>
  );
};

/* ─── Tabs config ────────────────────────────────────────────────────────────── */
const TABS = [
  { id:'overview',   ka:'მთავარი',     en:'Overview',   sym:'◈' },
  { id:'events',     ka:'ივენთები',    en:'Events',     sym:'◎' },
  { id:'motivation', ka:'მოტივაცია',   en:'Motivation', sym:'✦' },
  { id:'settings',   ka:'პარამეტრები', en:'Settings',   sym:'◐' },
];

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────────── */
export default function ProfilePage({ lang='ka' }) {
  const user = MOCK_USER;
  const [tab, setTab] = useState('overview');
  const [activeLang, setActiveLang] = useState(lang);

  return (
    <>
      <FontLoader />
      <div style={{ minHeight:'100vh', background:'var(--cream)', fontFamily:"'DM Sans', sans-serif" }}>

        {/* Subtle top pattern */}
        <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0,
          backgroundImage:'radial-gradient(circle, rgba(184,134,11,0.06) 1px, transparent 1px)',
          backgroundSize:'32px 32px' }} />

        {/* Warm gradient top */}
        <div style={{ position:'fixed', top:0, left:0, right:0, height:400, pointerEvents:'none', zIndex:0,
          background:'linear-gradient(180deg, rgba(245,230,200,0.6) 0%, transparent 100%)' }} />

        {/* ── HEADER ── */}
        <div style={{ position:'relative', zIndex:10, background:'rgba(253,250,244,0.92)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid var(--border-soft)' }}>
          <div style={{ maxWidth:960, margin:'0 auto', padding:'32px 24px 0' }}>

            {/* lang toggle */}
            <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
              <div style={{ display:'flex', gap:4, padding:4, borderRadius:10, background:'var(--stone)' }}>
                {['ka','en'].map(l=>(
                  <button key={l} onClick={()=>setActiveLang(l)}
                    style={{ padding:'5px 12px', borderRadius:7, border:'none', cursor:'pointer',
                      fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase',
                      background:activeLang===l?'#fff':'transparent',
                      color:activeLang===l?'var(--gold)':'var(--warm-gray)',
                      boxShadow:activeLang===l?'var(--shadow-sm)':'none',
                      transition:'all 0.2s' }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', alignItems:'flex-end', gap:24, flexWrap:'wrap', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'flex-end', gap:20 }}>
                <Avatar name={`${user.firstName} ${user.lastName}`} size={80} />
                <div style={{ paddingBottom:4 }}>
                  <span className="tag" style={{ display:'block', marginBottom:8 }}>
                    {activeLang==='ka'?'— EQ კოუჩინგი':'— EQ Coaching'}
                  </span>
                  <h1 className="serif" style={{ fontSize:'clamp(24px,5vw,38px)', fontStyle:'italic',
                    color:'var(--text-main)', lineHeight:1, fontWeight:600 }}>
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="mono" style={{ fontSize:11, color:'var(--warm-gray)', marginTop:6 }}>{user.email}</p>
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:16, paddingBottom:4 }}>
                <div style={{ padding:'12px 16px', borderRadius:14, background:'var(--orange-bg)',
                  border:'1.5px solid rgba(196,75,27,0.15)', display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:22 }}>🔥</span>
                  <div>
                    <div className="mono" style={{ fontSize:20, fontWeight:700, color:'var(--orange)', lineHeight:1 }}>{user.streak}</div>
                    <div className="mono" style={{ fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--warm-gray)', marginTop:2 }}>
                      {activeLang==='ka'?'სერია':'streak'}
                    </div>
                  </div>
                </div>
                <EQArc score={user.eq_score} />
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display:'flex', gap:4, marginTop:24, overflowX:'auto', scrollbarWidth:'none',
              padding:'6px 6px 0', background:'var(--stone)', borderRadius:'14px 14px 0 0', width:'fit-content' }}>
              {TABS.map(t=>{
                const on = tab===t.id;
                return (
                  <button key={t.id} className={`tab-btn ${on?'active':''}`} onClick={()=>setTab(t.id)}
                    style={{ borderRadius:'10px 10px 0 0' }}>
                    <span style={{ marginRight:5 }}>{t.sym}</span>
                    {activeLang==='ka'?t.ka:t.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ position:'relative', zIndex:10, maxWidth:960, margin:'0 auto', padding:'36px 24px 80px' }}>
          <div key={tab} className="fade-up">
            {tab==='overview'   && <OverviewPanel   user={user} lang={activeLang} />}
            {tab==='events'     && <EventsSection   lang={activeLang} />}
            {tab==='motivation' && <MotivationSection lang={activeLang} streak={user.streak} />}
            {tab==='settings'   && <SettingsPanel   user={user} lang={activeLang} />}
          </div>
        </div>
      </div>
    </>
  );
}