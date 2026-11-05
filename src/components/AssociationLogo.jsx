import React from 'react';

export default function AssociationLogo({ 
  className = 'h-12 w-12', 
  showText = true, 
  textColor = 'text-slate-900', 
  subtitleColor = 'text-amber-600',
  logoSrc = '/logo.jpeg' 
}) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        {logoSrc && !imgError ? (
          <img 
            src={logoSrc} 
            alt="CBGCSWA Official Logo" 
            className="w-full h-full object-contain rounded-full drop-shadow-md"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2545" />
              <stop offset="50%" stopColor="#133E87" />
              <stop offset="100%" stopColor="#0B2545" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          
          <circle cx="100" cy="100" r="94" fill="#FFFFFF" stroke="url(#logoGrad)" strokeWidth="6" />
          <circle cx="100" cy="100" r="86" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" strokeDasharray="4 2" />
          
          <path id="upperArc" d="M 32 100 A 68 68 0 0 1 168 100" fill="none" />
          <text fontSize="12" fontWeight="800" fill="#D97706" letterSpacing="2.5" textAnchor="middle">
            <textPath href="#upperArc" startOffset="50%">
              ALL FOR ONE
            </textPath>
          </text>
          
          <g transform="translate(48, 62)">
            <path d="M 10 40 L 35 25 C 42 22 48 26 52 30 L 60 38 L 52 46 C 46 50 38 48 30 45 L 10 52 Z" fill="#0B2545" />
            <path d="M 94 40 L 69 25 C 62 22 56 26 52 30 L 44 38 L 52 46 C 58 50 66 48 74 45 L 94 52 Z" fill="#133E87" />
            <path d="M 42 28 C 45 25 50 25 53 28 C 56 31 56 36 53 39 L 46 45" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 50 34 C 53 31 58 31 61 34 C 64 37 64 42 61 45 L 54 50" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 35 34 C 38 31 43 31 46 34" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          </g>
          
          <path id="lowerArc" d="M 168 100 A 68 68 0 0 1 32 100" fill="none" />
          <text fontSize="12" fontWeight="800" fill="#D97706" letterSpacing="2.5" textAnchor="middle">
            <textPath href="#lowerArc" startOffset="50%">
              ONE FOR ALL
            </textPath>
          </text>
          
          <polygon points="24,100 27,95 32,95 28,99 30,104 25,101 20,104 22,99 18,95 23,95" fill="#133E87" />
          <polygon points="176,100 179,95 184,95 180,99 182,104 177,101 172,104 174,99 170,95 175,95" fill="#133E87" />
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`text-sm sm:text-base md:text-lg font-black tracking-tight leading-tight uppercase ${textColor}`}>
            CANARA BANK GENERAL CATEGORY
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-xs sm:text-sm font-bold tracking-wide uppercase ${subtitleColor}`}>
              STAFF WELFARE ASSOCIATION (REGD)
            </span>
            <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-900 rounded-full border border-blue-200">
              Regd. No. 99/2023
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
