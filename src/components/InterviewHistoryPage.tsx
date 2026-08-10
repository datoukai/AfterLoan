import React, { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';

interface Props {
  onBack: () => void;
  onSelectRecord?: () => void;
}

export const InterviewHistoryPage: React.FC<Props> = ({ onBack, onSelectRecord }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const historyGroups = [
    {
      date: '08.06',
      day: '周四',
      items: [
        {
          title: '妙记汇报优化讨论',
          time: '16:56',
          duration: '1小时48分26秒',
          members: '8人',
        },
      ],
    },
    {
      date: '08.04',
      day: '周二',
      items: [
        {
          title: '智能协同平台工作推进会',
          time: '16:07',
          duration: '',
          members: '13人',
        },
      ],
    },
    {
      date: '07.30',
      day: '周四',
      items: [
        {
          title: 'Meet妙记项目汇报与评审',
          time: '09:53',
          duration: '1小时2分41秒',
          members: '12人',
        },
      ],
    },
    {
      date: '07.23',
      day: '周四',
      items: [
        {
          title: '会议记录工具功能介绍',
          time: '16:10',
          duration: '4分0秒',
          members: '1人',
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50/60 via-slate-50 to-white flex flex-col relative overflow-hidden select-none">
      
      {/* Top Header Section */}
      <div className="shrink-0 pt-2 px-4 pb-3">
        {/* Status Bar */}
        <div className="flex items-center justify-between pb-2 text-xs font-semibold text-slate-900">
          <span className="text-sm font-bold tracking-tight">09:55</span>

          {/* Right Network Icons */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-90">
            <span>5G</span>
            <div className="border border-slate-900/80 bg-slate-900/10 rounded-sm px-1 text-[9px] font-mono">41</div>
          </div>
        </div>

        {/* Header Bar with Back button & Title */}
        <div className="flex items-center justify-between py-1 mb-3">
          <button 
            type="button"
            onClick={onBack}
            className="p-1 -ml-1 text-slate-800 hover:text-blue-600 active:scale-90 transition-all cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            <span className="text-base font-bold text-slate-900">访谈记录</span>
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="请输入需要查询的内容"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/90 shadow-xs focus:bg-white text-xs text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2.5 rounded-xl outline-none border border-slate-200/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* (分组模块: 全部 / 会议 / 培训 / 展开 已按要求删除) */}
      </div>

      {/* Main List Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4">
        {historyGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-2">
            
            {/* Group Date Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 pt-1">
              <span className="bg-blue-100/60 text-blue-700 px-2 py-0.5 rounded-md text-[11px] font-bold">{group.date}</span>
              <span className="text-slate-400 font-normal">{group.day}</span>
            </div>

            {/* Group Items */}
            <div className="space-y-2.5">
              {group.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  onClick={onSelectRecord}
                  className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100/90 hover:border-blue-200 hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer space-y-2"
                >
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>{item.time}</span>
                    {item.duration && (
                      <>
                        <span>|</span>
                        <span>{item.duration}</span>
                      </>
                    )}
                    <span>|</span>
                    <span>{item.members}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* (开始记录 悬浮按钮 已按要求删除) */}

    </div>
  );
};
