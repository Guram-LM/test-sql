export default function FooterLogo() {
  return (
    <div className="flex items-center justify-center w-40 h-40 bg-transparent pt-2">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 400 400" className="w-full h-full">
           <title>Footer Logo – Emotional Intelligence Coaching & Growth</title>
          <defs>
            <path
              id="circlePath"
              d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
            />
            
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#C5A028" />
              <stop offset="100%" stopColor="#B8941E" />
            </linearGradient>
          </defs>

          <g>
            <text
              fontSize="34"
              fill="url(#goldGradient)"
              fontWeight="600"
              letterSpacing="4"
              style={{ filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.6))' }}
            >
              <textPath href="#circlePath" startOffset="0%">
                EMOTIONAL INTELLIGENCE • COACHING & GROWTH • EMOTIONAL INTELLIGENCE • COACHING & GROWTH •
              </textPath>
            </text>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="20s"
              repeatCount="indefinite"
            />
          </g>

          <text
            x="200"
            y="235"
            fontSize="140"
            fill="url(#goldGradient)"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="serif"
            style={{
              letterSpacing: '-8px',
              filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.7))',
            }}
          >
            NB
          </text>
        </svg>
      </div>
    </div>
  );
}