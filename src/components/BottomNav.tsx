import React from 'react';

export const BottomNav: React.FC = () => {
  return (
    <div className="w-full bg-white border-t border-slate-100/80 py-2.5 px-14 flex justify-between items-center z-50 shadow-lg shrink-0">
      
      {/* Home / Bank Icon Tab (Active) */}
      <button className="flex flex-col items-center justify-center cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#3B82F6] flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-100">
          <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="12" />
            <path d="M 50 15 A 35 35 0 0 1 85 50 L 50 50 Z" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="10" />
          </svg>
        </div>
      </button>

      {/* Profile Tab ("我的") */}
      <button className="flex flex-col items-center justify-center gap-0.5 text-[#94A3B8] hover:text-[#64748B] cursor-pointer">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span className="text-[11px] font-medium tracking-tight">我的</span>
      </button>

    </div>
  );
};
