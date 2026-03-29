import { useTranslation } from 'react-i18next';

const NoEventsState = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="w-full flex items-center justify-center bg-stone-100  p-5">
      
      <div className="relative max-w-lg text-center">

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 bg-[#C9A84C]/10 blur-3xl rounded-full animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="fade-up-1" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -16,
            borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.15)',
            animation: 'float 5s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: -8,
            borderRadius: '50%',
            border: '1px dashed rgba(201,168,76,0.25)',
            animation: 'float-reverse 7s ease-in-out infinite',
          }} />
          <div style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #FFFDF5 0%, #FFF8E6 100%)',
            border: '1.5px solid rgba(201,168,76,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
            animation: 'float 5s ease-in-out infinite',
          }}>

            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">

              <rect x="4" y="7" width="30" height="26" rx="3" stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.06)" />
              <rect x="4" y="7" width="30" height="9" rx="3" fill="rgba(201,168,76,0.18)" />
              <line x1="4" y1="16" x2="34" y2="16" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
              <rect x="11" y="4" width="2.5" height="7" rx="1.2" fill="#C9A84C" />
              <rect x="24.5" y="4" width="2.5" height="7" rx="1.2" fill="#C9A84C" />
              <circle cx="12" cy="23" r="1.5" fill="#C9A84C" opacity="0.5" />
              <circle cx="19" cy="23" r="1.5" fill="#C9A84C" opacity="0.7" />
              <circle cx="26" cy="23" r="1.5" fill="#C9A84C" opacity="0.5" />
              <circle cx="12" cy="29" r="1.5" fill="#C9A84C" opacity="0.4" />
              <circle cx="19" cy="29" r="1.5" fill="#C9A84C" opacity="0.4" />
              <path d="M26 28 L27 26 L28 28 L30 27 L28 28.5 L29 30.5 L27 29 L25 30.5 L26 28.5 L24 27 Z"
                fill="#C9A84C" opacity="0.7" />
            </svg>
          </div>
        </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] italic">
            {lang === 'ka'
              ? 'ამჟამად ივენთები არ არის'
              : 'No active events right now'}
          </h2>

          <p className="text-[#8A7A5A] text-sm md:text-base leading-relaxed max-w-md italic">
            {lang === 'ka'
              ? 'მაგრამ, ახალი ივენთები მალე დაემატება. დარჩი ჩვენთან და არ გამოტოვო შემდეგი შესაძლებლობა.'
              : 'But, new events are coming soon. Stay tuned and don’t miss your next opportunity.'}
          </p>

          <div className="w-24 h-[1px] bg-[#C9A84C]/40" />

        </div>



      </div>
    </div>
  );
};

export default NoEventsState;