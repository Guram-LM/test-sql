// ProfileOverview.tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from '../../../components/hook/user/useUserHooks';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GlowingInitials from './GlowingInitials';



const ProfileOverview = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'ka';
  const [tab, setTab] = useState<'events' | 'motivation' | 'settings'>('motivation');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("events-space")) setTab("events");
    else if (location.pathname.includes("edit-profil")) setTab("settings");
    else setTab("motivation");
  }, [location.pathname]);

  const { data: user } = useMe();

  const tabs = [
    { id: 'motivation', ka: 'მოტივაცია', en: 'Motivation', sym: '✦', url:"/profile" },
    { id: 'events', ka: 'ივენთები', en: 'Events', sym: '◎', url:"/profile/events-space" },
    { id: 'settings', ka: 'პარამეტრები', en: 'Settings', sym: '◐', url:"/profile/edit-profil" },
  ];

  return (
    <div className=" bg-[#FDFAF4] text-[#1A1410] font-sans">
      <div className="fixed inset-0 bg-[radial-gradient(#B8860B_1px,transparent_1px)] bg-[length:32px_32px] opacity-5 pointer-events-none z-0" />


      <div className=" bg-[#FDFAF4]/95 backdrop-blur-2xl border-b border-[#EDE8DF]">
        <div className="max-w-240 mx-auto px-6 pt-8 pb-6">


        <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="flex items-end gap-6">
          
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-serif italic border-[2.5px] shadow-lg"
              style={{
                background: '#242323',
                borderColor: '#242323',
                color: '#d4af37',
              }}
            >
              {user?.firstName[0]}{user?.lastName[0]}
            </div>

          
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#FDFAF4]" />
          </div>

          <div className="pb-1">
            <div className="text-[#B8860B] text-xs tracking-[2px] uppercase mb-1">EQ კოუჩინგი</div>
            <h1 className="text-[38px] leading-none font-serif italic font-semibold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-[#9B8E7F] mt-3 text-sm font-mono">{user?.email}</p>
          </div>

        </div>


                <div className="hidden min-[800px]:block">
                  <GlowingInitials user={user} />
                </div>

      </div>
      

          <div className="mt-10 bg-[#242323] p-2 rounded-2xl inline-flex gap-1">
          {tabs.map((t) => (
            <Link
              to={t.url}
              key={t.id}
              className={`px-7 py-3.5 rounded-xl text-xs tracking-widest font-mono transition-all whitespace-nowrap ${
                tab === t.id
                  ? 'bg-white shadow text-[#B8860B]'
                  : 'text-[#9B8E7F] hover:text-[#1A1410] hover:bg-white/60'
              }`}
            >
              <span className="mr-1.5">{t.sym}</span>
              {lang === 'ka' ? t.ka : t.en}
            </Link>
          ))}
          </div>
        </div>
        
      </div>

      <Outlet />

    </div>
  );
};

export default ProfileOverview;



