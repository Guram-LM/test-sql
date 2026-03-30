import React, { useState, useEffect } from 'react';

interface OtpSentMessageProps {
  onResend?: () => void; 
  theme?: 'amber' | 'purple-pink';
}

const OtpSentMessage: React.FC<OtpSentMessageProps> = ({ onResend, theme = 'amber' }) => {
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const handleResendClick = () => {
    if (onResend) {
      onResend();
    }
    setSeconds(120); 
  };

  const themes = {
    amber: {
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-amber-600',
      hoverFrom: 'hover:from-amber-500',
      hoverTo: 'hover:to-amber-600',
      border: 'border-amber-600/30',
      glow: 'bg-amber-500/30',
      text: 'text-amber-400',
      buttonGradient: 'from-amber-600 to-amber-700',
      buttonHover: 'hover:from-amber-500 hover:to-amber-600',
    },
    'purple-pink': {
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-600',
      hoverFrom: 'hover:from-purple-500',
      hoverTo: 'hover:to-pink-500',
      border: 'border-purple-600/30',
      glow: 'bg-purple-500/30',
      text: 'text-purple-400',
      buttonGradient: 'from-purple-600 to-pink-600',
      buttonHover: 'hover:from-purple-500 hover:to-pink-500',
    }
  };

  const t = themes[theme];

  return (
    <div className={`relative bg-linear-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border ${t.border} shadow-2xl shadow-${theme === 'amber' ? 'amber' : 'purple'}-900/50 backdrop-blur-xl text-center mt-5`}>

      

      <div className="relative inline-block mb-6">
        <div className={`absolute inset-0 ${t.glow} rounded-full blur-2xl animate-pulse`} />
        <div className={`relative bg-linear-to-br ${t.gradientFrom} ${t.gradientTo} p-6 rounded-full shadow-lg shadow-${theme === 'amber' ? 'amber' : 'purple'}-900/50`}>
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <h3 className={`text-2xl font-bold ${t.text} mb-3`}>
        კოდი გამოგიგზავნეთ ელფოსტაზე
      </h3>


      <div className="inline-flex flex-col md:flex-row items-center gap-3 bg-gray-800/70 px-6 py-3 rounded-xl border border-current/40 mb-6">
        <span className={`${t.text} font-semibold text-lg`}>მოქმედია:</span>
        <div className="text-3xl font-mono font-bold text-white tracking-wider">
          {minutes.toString().padStart(2, '0')}:{remainingSeconds.toString().padStart(2, '0')}
        </div>
      </div>

      {onResend && (
        <button
          onClick={handleResendClick}
          disabled={seconds > 0}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
            seconds > 0
              ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
              : `bg-linear-to-r ${t.buttonGradient} ${t.buttonHover} text-white shadow-lg shadow-${theme === 'amber' ? 'amber' : 'purple'}-900/40 hover:shadow-xl`
          }`}
        >
          {seconds > 0 
            ? `ხელახლა გაგზავნა შესაძლებელია ${minutes}:${remainingSeconds.toString().padStart(2, '0')} წამში` 
            : 'გაგზავნეთ ხელახლა'
          }
        </button>
      )}
    </div>
  );
};

export default OtpSentMessage;