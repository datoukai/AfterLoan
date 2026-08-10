import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Mic } from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenInterview?: () => void;
  inspectionDetail?: string;
  onInspectionDetailChange?: (val: string) => void;
}

export const PrePhotoCreatePage: React.FC<Props> = ({ 
  onBack, 
  onOpenInterview,
  inspectionDetail = '',
  onInspectionDetailChange 
}) => {
  const [customerName, setCustomerName] = useState('');
  const [inspectionCategory, setInspectionCategory] = useState('');
  const [detailText, setDetailText] = useState(inspectionDetail);

  useEffect(() => {
    setDetailText(inspectionDetail);
  }, [inspectionDetail]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDetailText(val);
    if (onInspectionDetailChange) {
      onInspectionDetailChange(val);
    }
  };

  return (
    <div className="w-full h-full bg-[#F5F7FB] flex flex-col relative overflow-y-auto pb-24 select-none">
      
      {/* Top Blue Header */}
      <div className="bg-[#3B82F6] text-white shrink-0">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold">
          <span className="text-sm font-bold tracking-tight">14:49</span>

          {/* Right network icons & battery */}
          <div className="flex items-center gap-1 text-[10px] font-bold opacity-90">
            <span>5G 5G</span>
            <div className="border border-white/80 rounded-sm px-1 text-[9px]">92</div>
          </div>
        </div>

        {/* Title Bar with Back Button */}
        <div className="relative flex items-center justify-center px-4 py-3">
          <button 
            onClick={onBack}
            aria-label="返回上一页"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer z-30"
          >
            <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
          </button>
          <h1 className="text-lg font-bold text-white text-center tracking-wide">
            预拍照新增
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3.5 space-y-4 flex-1">
        
        {/* Card: 检查情况 */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100/80 space-y-4">
          
          {/* Card Header */}
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100/60">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white" />
            <span className="text-sm font-bold text-slate-800">
              检查情况
            </span>
          </div>

          {/* Form List Fields */}
          <div className="space-y-3.5 text-xs">
            
            {/* 1. 检查地点 */}
            <div className="flex items-start justify-between gap-2 py-1 border-b border-slate-100/50">
              <span className="text-slate-500 font-medium shrink-0 pt-0.5">检查地点：</span>
              <div className="flex items-start justify-end gap-1 text-slate-800 font-semibold text-right">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-snug">北京市西城区金融街街道北京银行大厦</span>
              </div>
            </div>

            {/* 2. 检查时间 */}
            <div className="flex items-center justify-between gap-2 py-1 border-b border-slate-100/50">
              <span className="text-slate-500 font-medium shrink-0">检查时间：</span>
              <span className="text-slate-800 font-bold font-mono">2026-06-11</span>
            </div>

            {/* 3. 客户/抵质押物名称 */}
            <div className="flex items-center justify-between gap-2 py-1 border-b border-slate-100/50">
              <span className="text-slate-500 font-medium shrink-0">客户/抵质押物名称：</span>
              <input
                type="text"
                placeholder=""
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="text-right text-slate-800 font-medium placeholder-slate-400 bg-transparent outline-none w-full"
              />
            </div>

            {/* 4. 检查对象类别 */}
            <div className="flex items-center justify-between gap-2 py-1 border-b border-slate-100/50 cursor-pointer">
              <span className="text-slate-500 font-medium shrink-0">检查对象类别：</span>
              <div className="flex items-center gap-1 text-slate-400 font-medium">
                <span>{inspectionCategory || '请选择检查对象类别'}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
              </div>
            </div>

            {/* 5. 检查情况 */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">检查情况：</span>
                
                {/* Blue border AI Voice Button as highlighted in red rectangle */}
                <button 
                  type="button" 
                  onClick={onOpenInterview}
                  className="flex items-center gap-1 text-blue-600 border border-blue-400 bg-blue-50/60 rounded-md px-2 py-0.5 font-semibold text-[11px] hover:bg-blue-100/60 active:scale-95 transition-all cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5 fill-current" />
                  <span>实地访谈AI纪要</span>
                </button>
              </div>

              <textarea
                rows={3}
                placeholder="请输入"
                value={detailText}
                onChange={handleTextChange}
                className="w-full text-slate-800 placeholder-slate-400 text-xs bg-slate-50/80 border border-slate-100 rounded-xl p-3 outline-none resize-none focus:bg-white focus:border-blue-300 transition-colors"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Fixed Bottom Action Bar: 下一步 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent z-30">
        <button
          type="button"
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm cursor-pointer"
        >
          下一步
        </button>
      </div>

    </div>
  );
};
