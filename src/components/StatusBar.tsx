import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-white text-xs font-medium select-none z-30 relative">
      {/* Left: Time & Left Status Icons */}
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-bold tracking-tight drop-shadow-sm">14:49</span>
        <div className="flex items-center gap-1 ml-0.5 opacity-90">
          <span className="text-[9px] bg-white/20 backdrop-blur-xs px-1 py-0.2 rounded font-bold border border-white/30">O-T</span>
          <div className="w-3.5 h-3.5 rounded-full border border-white/80 flex items-center justify-center text-[8px] font-bold">N</div>
          <div className="w-3.5 h-3.5 bg-white/25 rounded-full flex items-center justify-center text-[8px] font-bold">💬</div>
          <div className="w-3.5 h-3.5 bg-white/25 rounded-full flex items-center justify-center text-[8px] font-bold">✋</div>
        </div>
      </div>

      {/* Right: Status Icons & Battery */}
      <div className="flex items-center gap-1.5 opacity-95">
        {/* Bell / Alarm icon */}
        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>

        {/* Headphone icon */}
        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 00-9 9v7c0 1.1.9 2 2 2h3a1 1 0 001-1v-5a1 1 0 00-1-1H5v-2a7 7 0 0114 0v2h-3a1 1 0 00-1 1v5a1 1 0 001 1h3c1.1 0 2-.9 2-2v-7a9 9 0 00-9-9z"/>
        </svg>

        {/* 5G Signal */}
        <div className="flex items-center gap-0.5 text-[10px] font-bold">
          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M2 22h20V2L2 22z"/>
          </svg>
          <span className="text-[9px]">5G</span>
        </div>

        {/* 5G Wifi */}
        <div className="flex items-center gap-0.5 text-[10px] font-bold">
          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M12 3C7.95 3 4.21 4.34 1.2 6.6L12 21 22.8 6.6C19.79 4.34 16.05 3 12 3z"/>
          </svg>
          <span className="text-[9px]">5G</span>
        </div>

        {/* Battery with 92% inside horizontal pill */}
        <div className="flex items-center gap-0.5 border border-white/80 rounded-full px-1.5 py-0.2 text-[9px] font-bold bg-white/10">
          <span>92</span>
          <div className="w-2.5 h-1.5 bg-white rounded-xs relative">
            <div className="absolute -right-0.5 top-0.25 w-0.5 h-1 bg-white rounded-r-xs"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
