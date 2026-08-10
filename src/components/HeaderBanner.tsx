import React from 'react';

export const HeaderBanner: React.FC = () => {
  return (
    <div className="relative pt-1 pb-5 px-5 select-none overflow-hidden">
      {/* 3D Decorative Graphics in Top-Right Background */}
      <div className="absolute top-0 right-0 w-60 h-44 pointer-events-none z-10">
        <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
          <g filter="drop-shadow(0px 8px 16px rgba(37, 99, 235, 0.15))">
            {/* Background 3D glass tiles / pillars */}
            <path d="M140 15 L180 35 L180 95 L140 75 Z" fill="url(#blue-glass-1)" fillOpacity="0.5" />
            <path d="M158 25 L198 45 L198 105 L158 85 Z" fill="url(#blue-glass-2)" fillOpacity="0.6" />
            <path d="M175 35 L215 55 L215 115 L175 95 Z" fill="url(#blue-glass-3)" fillOpacity="0.75" />

            {/* Main 3D Blue Ring / Torus Feature */}
            <g transform="translate(145, 95) rotate(-15)">
              <ellipse cx="0" cy="0" rx="42" ry="24" fill="none" stroke="url(#ring-gradient)" strokeWidth="16" />
              <ellipse cx="0" cy="0" rx="42" ry="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="30 100" opacity="0.8" />
              <ellipse cx="0" cy="0" rx="32" ry="18" fill="none" stroke="#3B82F6" strokeWidth="6" opacity="0.9" />
            </g>
            
            {/* Light sparkles and dots */}
            <circle cx="125" cy="50" r="3" fill="#93C5FD" opacity="0.8" />
            <circle cx="195" cy="25" r="2" fill="#FFFFFF" opacity="0.9" />
          </g>

          <defs>
            <linearGradient id="blue-glass-1" x1="140" y1="15" x2="180" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93C5FD" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="blue-glass-2" x1="158" y1="25" x2="198" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#1D4ED8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="blue-glass-3" x1="175" y1="35" x2="215" y2="115" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#93C5FD" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="ring-gradient" x1="-42" y1="-24" x2="42" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1D4ED8" />
              <stop offset="0.4" stopColor="#3B82F6" />
              <stop offset="0.8" stopColor="#93C5FD" />
              <stop offset="1" stopColor="#EFF6FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Beijing Bank Logo Header */}
      <div className="flex items-center gap-2 mb-3 relative z-20">
        {/* Red Bank Logo Badge */}
        <div className="w-6 h-6 rounded-full bg-[#E60012] flex items-center justify-center text-white shadow-sm shrink-0">
          <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current">
            {/* Bank of Beijing Emblem representation */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="12" />
            <path d="M 50 15 A 35 35 0 0 1 85 50 L 50 50 Z" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="10" />
          </svg>
        </div>
        
        {/* Text Logo */}
        <div className="flex flex-col justify-center leading-none">
          <span className="text-[#E60012] font-extrabold text-[15px] tracking-wider">
            北京银行
          </span>
          <span className="text-[#E60012] font-bold text-[7px] tracking-tight uppercase mt-0.5">
            BANK OF BEIJING
          </span>
        </div>
      </div>

      {/* Main App Title Section */}
      <div className="relative z-20 mt-3 space-y-0.5">
        <h1 className="text-[26px] font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] drop-shadow-2xs">
          移动贷后
        </h1>
        <h2 className="text-[20px] font-extrabold text-[#111827] tracking-tight">
          智能贷后小助手
        </h2>
      </div>
    </div>
  );
};
