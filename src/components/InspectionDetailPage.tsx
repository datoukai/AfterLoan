import React, { useState } from 'react';
import { ChevronLeft, UserCheck } from 'lucide-react';

interface InspectionRecordData {
  companyName: string;
  code: string;
  orgCode?: string;
}

interface Props {
  record?: InspectionRecordData;
  onBack: () => void;
  onSelectBorrower?: () => void;
}

const navTabs = ['现场检查', '填写报告', '关联预拍照', '影像附件'];

export const InspectionDetailPage: React.FC<Props> = ({ record, onBack, onSelectBorrower }) => {
  const [activeTab, setActiveTab] = useState(0);

  const companyName = record?.companyName || '(脱敏) 会锐阳琳有限公司';
  const orgCode = record?.orgCode || 'CL6F8N9P-7';

  return (
    <div className="w-full h-full bg-[#F5F7FB] flex flex-col relative overflow-y-auto pb-10 select-none">
      
      {/* Top Blue Header Header Block */}
      <div className="bg-[#2563EB] text-white">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold">
          <span className="text-sm font-bold tracking-tight">17:05</span>

          {/* Right network icons */}
          <div className="flex items-center gap-1 text-[10px] font-bold opacity-90">
            <span>5G 5G</span>
            <div className="border border-white/80 rounded-sm px-1 text-[9px]">75</div>
          </div>
        </div>

        {/* Title Bar */}
        <div className="relative flex items-center justify-center px-4 py-3">
          <button 
            onClick={onBack}
            aria-label="返回上一页"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer z-30"
          >
            <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
          </button>
          <h1 className="text-lg font-bold text-white text-center tracking-wide">
            常规检查
          </h1>
        </div>
      </div>

      {/* Top Tab Bar */}
      <div className="bg-white border-b border-slate-100 flex items-center justify-around px-2 py-3 text-xs font-semibold">
        {navTabs.map((tab, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className="relative py-1 px-2 cursor-pointer flex flex-col items-center"
            >
              <span className={`transition-colors ${isActive ? 'text-[#2563EB] font-bold text-sm' : 'text-slate-600 font-medium'}`}>
                {tab}
              </span>
              {isActive && (
                <div className="absolute -bottom-2 w-8 h-1 bg-[#2563EB] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-3.5 space-y-4">
        {/* Borrower Section Card */}
        <div 
          onClick={onSelectBorrower}
          className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
        >
          
          {/* Card Title */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-blue-100/80 flex items-center justify-center text-[#2563EB]">
              <UserCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              借款人
            </h2>
          </div>

          {/* Inner Light Grey Card Box */}
          <div className="bg-[#F8FAFC] rounded-xl p-3.5 space-y-2 border border-slate-100/60">
            <div className="text-sm font-bold text-slate-800">
              {companyName}
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">组织机构代码</span>
              <span className="text-slate-700 font-mono font-bold">{orgCode}</span>
            </div>
          </div>

        </div>

        {/* Bottom End Text */}
        <div className="text-center pt-8 text-xs font-medium text-slate-400">
          没有更多了
        </div>
      </div>

    </div>
  );
};
