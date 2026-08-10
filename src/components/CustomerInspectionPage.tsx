import React, { useState } from 'react';
import { ChevronLeft, Search, ChevronDown } from 'lucide-react';

export interface InspectionItem {
  id: string;
  isField: boolean; // 实地
  companyName: string;
  code: string;
  createdDate: string;
  dueDate: string;
  statusStamp: string; // e.g. "实地已完成"
  orgCode?: string;
}

const mockList: InspectionItem[] = [
  {
    id: '1',
    isField: true,
    companyName: '(脱敏) 恒凯有限公司',
    code: 'H2026072700000001',
    createdDate: '2026-10-10',
    dueDate: '2026-12-07',
    statusStamp: '实地已完成',
  },
  {
    id: '2',
    isField: true,
    companyName: '(脱敏) 林优齐誉有限公司',
    code: 'H2026072700000002',
    createdDate: '2026-10-10',
    dueDate: '2026-12-09',
    statusStamp: '实地已完成',
  },
  {
    id: '3',
    isField: true,
    companyName: '(脱敏) 会锐阳琳有限公司',
    code: 'Y2026072700001006',
    createdDate: '2027-10-05',
    dueDate: '2027-12-04',
    statusStamp: '实地已完成',
  },
  {
    id: '4',
    isField: true,
    companyName: '(脱敏) 儒高振多赛颜欣有限...',
    code: 'Y2026072700001008',
    createdDate: '2027-10-05',
    dueDate: '2027-12-10',
    statusStamp: '实地已完成',
  },
];

interface Props {
  onBack: () => void;
  onSelectRecord?: (record: InspectionItem) => void;
}

export const CustomerInspectionPage: React.FC<Props> = ({ onBack, onSelectRecord }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full h-full bg-[#EDF3F9] flex flex-col relative overflow-y-auto pb-10 select-none">
      
      {/* Status Bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-slate-800 text-xs font-semibold relative z-20">
        <span className="text-sm font-bold tracking-tight">17:04</span>

        {/* Right network icons */}
        <div className="flex items-center gap-1 text-[10px] font-bold opacity-90">
          <span>5G 5G</span>
          <div className="border border-slate-700 rounded-sm px-1 text-[9px]">75</div>
        </div>
      </div>

      {/* Navigation Header */}
      <div className="relative flex items-center justify-center px-4 py-2.5 z-20">
        <button 
          onClick={onBack}
          aria-label="返回上一页"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-800 hover:text-blue-600 hover:bg-slate-200/50 active:scale-90 transition-all cursor-pointer z-30"
        >
          <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
        </button>
        <h1 className="text-lg font-bold text-slate-800 text-center">
          客户常规检查
        </h1>
      </div>

      {/* Tabs Row: 未完成 / 已完成 */}
      <div className="px-5 pt-1 pb-3 flex items-center gap-6">
        <button
          onClick={() => setActiveTab('pending')}
          className="relative flex flex-col items-center cursor-pointer"
        >
          <span className={`text-base font-bold transition-colors ${activeTab === 'pending' ? 'text-[#2563EB]' : 'text-slate-500 font-medium'}`}>
            未完成
          </span>
          {activeTab === 'pending' && (
            <div className="w-6 h-1 bg-[#2563EB] rounded-full mt-1" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className="relative flex flex-col items-center cursor-pointer"
        >
          <span className={`text-base font-bold transition-colors ${activeTab === 'completed' ? 'text-[#2563EB]' : 'text-slate-500 font-medium'}`}>
            已完成
          </span>
          {activeTab === 'completed' && (
            <div className="w-6 h-1 bg-[#2563EB] rounded-full mt-1" />
          )}
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-4 mb-3">
        <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2.5 border border-slate-100 shadow-2xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="请输入客户名称"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs text-slate-700 placeholder-slate-400 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Filter Options Row */}
      <div className="px-4 mb-3.5 flex items-center justify-between text-xs font-bold text-[#3B82F6]">
        <button className="flex items-center gap-1 hover:opacity-80 cursor-pointer">
          <span>实地是否完成</span>
          <ChevronDown className="w-3.5 h-3.5 fill-current" />
        </button>
        <button className="flex items-center gap-1 hover:opacity-80 cursor-pointer">
          <span>任务完成期限</span>
          <ChevronDown className="w-3.5 h-3.5 fill-current" />
        </button>
        <button className="flex items-center gap-1 hover:opacity-80 cursor-pointer">
          <span>差异化标识</span>
          <ChevronDown className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>

      {/* Inspection List Cards */}
      <div className="px-3.5 space-y-3.5">
        {mockList.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelectRecord?.(item)}
            className="bg-white rounded-2xl shadow-xs border border-slate-100 overflow-hidden relative cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]"
          >
            {/* Card Header */}
            <div className="bg-[#EBF3FF]/80 px-3.5 py-2.5 flex items-center justify-between border-b border-blue-50">
              <div className="flex items-center gap-2">
                <span className="bg-[#3B82F6] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  实地
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {item.companyName}
                </span>
              </div>
              <button className="bg-[#FF6B52] hover:bg-[#F2553B] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-2xs cursor-pointer active:scale-95 transition-transform">
                填报
              </button>
            </div>

            {/* Card Content Body */}
            <div className="p-3.5 pt-3 relative flex justify-between items-center min-h-[96px]">
              {/* Left Key-Value Data */}
              <div className="space-y-1.5 text-xs z-10">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-medium w-20">检查编号</span>
                  <span className="text-slate-800 font-semibold font-mono tracking-tight">{item.code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-medium w-20">任务生成日期</span>
                  <span className="text-slate-800 font-semibold font-mono tracking-tight">{item.createdDate}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-medium w-20">完成期限</span>
                  <span className="text-slate-800 font-semibold font-mono tracking-tight">{item.dueDate}</span>
                </div>
              </div>

              {/* Green Stamp Badge Overlay ("实地已完成") */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none opacity-85 transform -rotate-12">
                <div className="w-20 h-20 border-2 border-emerald-500 border-dashed rounded-full flex flex-col items-center justify-center p-1 text-emerald-600 font-bold text-[11px] leading-tight text-center relative shadow-xs bg-emerald-50/20">
                  {/* Stars decoration */}
                  <div className="flex gap-0.5 text-[8px] text-emerald-500 mb-0.5">
                    ★ ★ ★ ★
                  </div>
                  <div className="border-t border-b border-emerald-400 py-0.5 px-1 font-extrabold tracking-tighter">
                    {item.statusStamp}
                  </div>
                  <div className="flex gap-0.5 text-[8px] text-emerald-500 mt-0.5">
                    ★ ★ ★ ★
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
