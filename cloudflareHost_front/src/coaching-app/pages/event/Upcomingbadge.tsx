import { useTranslation } from "react-i18next";

const UpcomingBadge = () => {
    const { i18n } = useTranslation();
  const lang = i18n.language;
    return (
      <>
        <style>{`
          @keyframes water-flow {
            0%   { background-position: 0% 50%; }
            25%  { background-position: 50% 30%; }
            50%  { background-position: 100% 50%; }
            75%  { background-position: 50% 70%; }
            100% { background-position: 0% 50%; }
          }
  
          @keyframes dot-breathe {
            0%, 100% { opacity: 0.35; transform: scale(0.8); }
            50%       { opacity: 1;   transform: scale(1.2); }
          }
  
          .upcoming-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 1px;
            flex-shrink: 0;
            position: relative;
            border: 1px solid rgba(201,168,76,0.25);
  
            background: linear-gradient(
              110deg,
              #7a5500,
              #c9a84c,
              #f5e090,
              #ffffff,
              #e8c84a,
              #a07020,
              #c9a84c,
              #f0d870,
              #7a5500
            );
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: water-flow 4s ease-in-out infinite;
          }
  
          .upcoming-badge::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 1px;
            background: rgba(201,168,76,0.07);
            z-index: -1;
          }
  
          .upcoming-dot {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            flex-shrink: 0;
            background: linear-gradient(
              110deg,
              #7a5500,
              #c9a84c,
              #f5e090,
              #c9a84c,
              #7a5500
            );
            background-size: 400% 400%;
            animation:
              water-flow 4s ease-in-out infinite,
              dot-breathe 2s ease-in-out infinite;
          }
        `}</style>
  
        <span className="upcoming-badge">
          <span className="upcoming-dot" />
          {lang === 'ka' ? 'დაგეგმილი' : 'Planned'}
        </span>
      </>
    );
  };
  
  export default UpcomingBadge;