import React from 'react';

interface TaskItem {
  id: string;
  title: string;
  count: number;
  bgColor: string;
  textColor: string;
  badgeBg: string;
  graphicGradient: string;
}

const taskItems: TaskItem[] = [
  {
    id: '1',
    title: '客户常规检查',
    count: 39,
    bgColor: 'bg-[#EBF3FF]',
    textColor: 'text-[#25549C]',
    badgeBg: 'bg-[#2F7CF6]',
    graphicGradient: 'from-[#2F7CF6]/30 to-[#93C5FD]/10',
  },
  {
    id: '2',
    title: '资金用途检查',
    count: 9,
    bgColor: 'bg-[#FFF8E8]',
    textColor: 'text-[#8A5B14]',
    badgeBg: 'bg-[#E59E27]',
    graphicGradient: 'from-[#E59E27]/30 to-[#FDE68A]/10',
  },
  {
    id: '3',
    title: '担保公司检查',
    count: 0,
    bgColor: 'bg-[#FFEFEF]',
    textColor: 'text-[#A03535]',
    badgeBg: 'bg-[#F25555]',
    graphicGradient: 'from-[#F25555]/30 to-[#FCA5A5]/10',
  },
  {
    id: '4',
    title: '集群客户检查',
    count: 0,
    bgColor: 'bg-[#F4EFFF]',
    textColor: 'text-[#5B3FA0]',
    badgeBg: 'bg-[#8C66F6]',
    graphicGradient: 'from-[#8C66F6]/30 to-[#DDD6FE]/10',
  },
];

interface TaskSectionProps {
  onSelectTask?: (taskId: string) => void;
}

export const TaskSection: React.FC<TaskSectionProps> = ({ onSelectTask }) => {
  return (
    <div className="px-3.5 mt-3.5 relative z-20">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100/60 p-4">
        {/* Title Bar */}
        <div className="flex items-center gap-2 mb-3">
          {/* Blue Bell Icon */}
          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
          </div>
          <h3 className="text-[16px] font-bold text-[#1E293B] flex items-center gap-1.5">
            待办任务
            <span className="text-[#2563EB] font-extrabold text-[16px]">(48)</span>
          </h3>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {taskItems.map((task) => (
            <div
              key={task.id}
              onClick={() => onSelectTask?.(task.id)}
              className={`relative ${task.bgColor} rounded-xl p-3.5 pt-4 pb-10 min-h-[92px] overflow-hidden flex flex-col justify-between cursor-pointer active:opacity-90 transition-opacity hover:shadow-xs`}
            >
              {/* Task Title */}
              <span className={`text-[13.5px] font-bold ${task.textColor} leading-tight z-10 tracking-tight`}>
                {task.title}
              </span>

              {/* 3D Glass / Arc overlay graphics in lower right */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none">
                <svg viewBox="0 0 60 60" fill="none" className="w-full h-full opacity-60">
                  <circle cx="45" cy="45" r="30" fill={`url(#grad-${task.id})`} />
                  <defs>
                    <linearGradient id={`grad-${task.id}`} x1="15" y1="15" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                      <stop stopColor="currentColor" className={task.badgeBg.replace('bg-', 'text-')} />
                      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Badge on Bottom Right Corner */}
              <div className="absolute bottom-0 right-0 z-10">
                <div
                  className={`${task.badgeBg} text-white px-2.5 py-0.5 rounded-tl-2xl rounded-br-xl text-xs font-medium flex items-baseline gap-0.5 shadow-2xs`}
                >
                  <span className="font-extrabold text-[15px] leading-none">{task.count}</span>
                  <span className="text-[11px] leading-none font-normal">条</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
