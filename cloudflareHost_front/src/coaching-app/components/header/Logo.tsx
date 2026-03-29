import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <div className="flex items-center">
      {/* Desktop - სრული ლოგო */}
      <Link to={"/"}aria-label="მთავარი გვერდი">
      <div className="hidden lg:flex items-center justify-center w-22 h-22">
        <div className="relative w-96 h-96">
          <svg viewBox="0 0 400 400" className="w-full h-full">
             <title>მთავარი გვერდი</title>
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1120" />
                <stop offset="50%" stopColor="#0E1A2F" />
                <stop offset="100%" stopColor="#13294B" />
              </linearGradient>
              <path
                id="circlePath"
                d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
              />
            </defs>
            <circle cx="200" cy="200" r="190" fill="url(#bgGradient)" />
            <g>
              <text fontSize="34" fill="#D4AF37" fontWeight="500" letterSpacing="4">
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
              fill="#D4AF37"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="serif"
              style={{ letterSpacing: '-8px' }}
            >
              NB
            </text>
          </svg>
        </div>
      </div>
      </Link>
      {/* Mobile - კომპაქტური ლოგო */}
      <Link to={"/"}aria-label="მთავარი გვერდი">
      <div className="lg:hidden flex items-center justify-center">
        <div className="relative w-14 h-14">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <title>მთავარი გვერდი</title>
            <defs>
              <linearGradient id="bgGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1120" />
                <stop offset="50%" stopColor="#0E1A2F" />
                <stop offset="100%" stopColor="#13294B" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="190" fill="url(#bgGradientMobile)" />
            <text
              x="200"
              y="245"
              fontSize="160"
              fill="#D4AF37"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="serif"
              style={{ letterSpacing: '-10px' }}
            >
              NB
            </text>
          </svg>
        </div>
      </div>
      </Link>
    </div>
  );
}
