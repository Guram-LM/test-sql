// ProfileOverview.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MOCK_USER = {
  firstName: "ნინო",
  lastName: "გიორგაძე",
  email: "nino.giorgazde@eq.ge",
  joinedAt: "2024-03-10",
  eq_score: 78,
  streak: 12,
  totalEvents: 9,
  completedEvents: 7,
};

const ProfileOverview = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'ka';
  const user = MOCK_USER;

  return (
    <div className="min-h-screen bg-[#FDFAF4] text-[#1A1410]">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(#B8860B_1px,transparent_1px)] bg-[length:32px_32px] opacity-5 pointer-events-none" />
      <div className="fixed top-0 inset-x-0 h-[400px] bg-gradient-to-b from-[#F5E6C8]/60 to-transparent pointer-events-none" />

      <div className="max-w-[960px] mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <div className="flex items-end gap-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-serif italic border-[2.5px] shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #F5E6C8 0%, #E8D5A0 100%)',
                borderColor: '#B8860B',
                color: '#B8860B',
              }}
            >
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <div className="text-[#B8860B] text-xs tracking-[2px] uppercase">EQ კოუჩინგი</div>
              <h1 className="text-5xl font-serif italic font-semibold leading-none mt-1">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-[#9B8E7F] mt-3 text-sm font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="bg-[#FEF0EA] border border-[#C44B1B]/20 rounded-2xl px-6 py-4 flex items-center gap-4">
              <span className="text-4xl">🔥</span>
              <div>
                <div className="text-3xl font-bold text-[#C44B1B] font-mono">{user.streak}</div>
                <div className="text-xs tracking-widest uppercase text-[#9B8E7F]">დღიანი სერია</div>
              </div>
            </div>

            {/* EQ Arc */}
            <div className="relative w-[112px] h-[112px]">
              <svg width="112" height="112" className="-rotate-[45deg]">
                <circle cx="56" cy="56" r="44" fill="none" stroke="#EDE8DF" strokeWidth="7" />
                <circle 
                  cx="56" cy="56" r="44" 
                  fill="none" 
                  stroke={user.eq_score >= 75 ? "#52B788" : "#B8860B"} 
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="301.59"
                  strokeDashoffset={301.59 - (user.eq_score / 100) * 301.59}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{ color: user.eq_score >= 75 ? "#52B788" : "#B8860B" }}>
                    {user.eq_score}
                  </div>
                  <div className="text-[9px] tracking-[3px] uppercase text-[#9B8E7F]">EQ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🧠", value: user.eq_score, label: lang === 'ka' ? "EQ ქულა" : "EQ Score", color: "#B8860B" },
            { icon: "🔥", value: user.streak, label: lang === 'ka' ? "სერია" : "Day Streak", color: "#C44B1B" },
            { icon: "✅", value: user.completedEvents, label: lang === 'ka' ? "ჩავლილი" : "Completed", color: "#2D6A4F" },
            { icon: "📅", value: user.totalEvents, label: lang === 'ka' ? "სულ ივენთი" : "All Events", color: "#1D5FA8" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-[#EDE8DF] rounded-3xl p-8 hover:shadow-md transition-all">
              <div className="text-4xl mb-6">{stat.icon}</div>
              <div className="text-[42px] font-semibold leading-none" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs tracking-widest uppercase text-[#9B8E7F] mt-4 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;