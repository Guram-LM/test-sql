import type React from "react"
import type { User } from "../../../components/interface/Interface"

interface GlowingInitialsProp {
    user:User | undefined
}

const GlowingInitials:React.FC<GlowingInitialsProp> = ({user}) => {
  return (
    
        <>
        <style>{`
  @keyframes breathe {
    0%, 100% { opacity: 0.18; stroke-width: 0.8px; }
    50%       { opacity: 0.34; stroke-width: 1.3px; }
  }
  @keyframes breathe-echo {
    0%, 100% { opacity: 0.07; stroke-width: 0.5px; }
    50%       { opacity: 0.16; stroke-width: 0.9px; }
  }
  @keyframes drift {
    0%, 100% { transform: translateY(0px)   rotate(-4deg); }
    33%       { transform: translateY(-6px)  rotate(-3deg); }
    66%       { transform: translateY(-3px)  rotate(-5deg); }
  }
`}</style>

<div
  className="relative pt-35 flex items-center justify-center select-none pointer-events-none overflow-visible"
  style={{ height: '110px', minWidth: '180px' }}
>
  {/* echo — offset shadow */}
  <span
    className="absolute leading-none"
    style={{
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: '128px',
      fontStyle: 'italic',
      fontWeight: 700,
      color: 'transparent',
      WebkitTextStroke: '0.5px #c9a84c',
      letterSpacing: '-6px',
      bottom: -6,
      right: -5,
      animation: 'drift 6s ease-in-out infinite 0.5s, breathe-echo 6s ease-in-out infinite 0.5s',
    }}
  >
    {user?.firstName?.[0]}{user?.lastName?.[0]}
  </span>

  {/* main outline */}
  <span
    className="relative leading-none"
    style={{
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: '128px',
      fontStyle: 'italic',
      fontWeight: 700,
      color: 'transparent',
      WebkitTextStroke: '0.9px #c9a84c',
      letterSpacing: '-6px',
      animation: 'drift 6s ease-in-out infinite, breathe 6s ease-in-out infinite',
    }}
  >
    {user?.firstName?.[0]}{user?.lastName?.[0]}
  </span>
</div>
</>
   
  )
}

export default GlowingInitials