import React, { useState } from 'react';
import { Camera, FileText, Zap, Mic, History, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickActionsProps {
  onNavigateToInspection?: () => void;
  onNavigateToPrePhoto?: () => void;
  onStartInterview?: () => void;
  onOpenHistory?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  onNavigateToInspection, 
  onNavigateToPrePhoto,
  onStartInterview,
  onOpenHistory
}) => {
  const [isAiExpanded, setIsAiExpanded] = useState(false);

  return (
    <div className="px-3.5 relative z-20">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100/60 p-4 py-4 transition-all duration-300">
        <div className="grid grid-cols-3 gap-2 items-center">
          
          {/* Action 1: 常规检查预拍照 */}
          <div 
            onClick={onNavigateToPrePhoto}
            className="flex flex-col items-center justify-center text-center cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="relative w-12 h-12 mb-2 flex items-center justify-center">
              {/* Coral/Peach gradient circle container */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFAB91] via-[#FF8A65] to-[#FF7043] flex items-center justify-center shadow-xs relative">
                <Camera className="w-6 h-6 text-white stroke-[2]" />
                {/* Small yellow lightning bolt on top-right corner */}
                <div className="absolute -top-1 -right-1 bg-[#FFD54F] text-amber-900 rounded-full p-0.5 shadow-xs border border-white">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                </div>
              </div>
            </div>
            <span className="text-[11.5px] font-semibold text-[#334155] leading-tight whitespace-nowrap tracking-tight">
              常规检查预拍照
            </span>
          </div>

          {/* Action 2: 发票预拍照 */}
          <div className="flex flex-col items-center justify-center text-center cursor-pointer group active:scale-95 transition-transform">
            <div className="relative w-12 h-12 mb-2 flex items-center justify-center">
              {/* Lavender/Purple gradient container */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B39DDB] via-[#9FA8DA] to-[#7E57C2] flex items-center justify-center shadow-xs">
                <FileText className="w-6 h-6 text-white stroke-[2]" />
              </div>
            </div>
            <span className="text-[11.5px] font-semibold text-[#334155] leading-tight whitespace-nowrap tracking-tight">
              发票预拍照
            </span>
          </div>

          {/* Action 3: AI纪要 (Clickable to expand) */}
          <div 
            onClick={() => setIsAiExpanded(!isAiExpanded)}
            className="flex flex-col items-center justify-center text-center cursor-pointer group active:scale-95 transition-transform relative"
          >
            <div className="relative w-12 h-12 mb-2 flex items-center justify-center">
              {/* Vibrant Indigo-Purple-Pink Gradient Container */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-md overflow-hidden relative transition-all ${isAiExpanded ? 'ring-2 ring-purple-500 ring-offset-2 scale-105' : ''}`}>
                {/* Subtle Inner Gloss Effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/15 rounded-t-2xl pointer-events-none" />
                <div className="relative flex items-center justify-center z-10">
                  <Mic className="w-6 h-6 text-white stroke-[2.2] drop-shadow-xs" />
                  {/* Glowing sound wave rings around mic */}
                  <span className="absolute -inset-1 rounded-full border border-white/30 animate-ping opacity-25 pointer-events-none" />
                </div>
              </div>

              {/* Indicator Dot/Badge when active */}
              {isAiExpanded && (
                <div className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5 shadow-xs border border-white">
                  <ChevronUp className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </div>
            <span className={`text-[11.5px] font-semibold leading-tight whitespace-nowrap tracking-tight transition-colors ${isAiExpanded ? 'text-indigo-600 font-bold' : 'text-[#334155]'}`}>
              AI纪要
            </span>
          </div>

        </div>

        {/* Expanded 2 Block Cards ("豆腐块") Area */}
        <AnimatePresence>
          {isAiExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-slate-100 pt-3.5"
            >
              <div className="text-[11px] font-bold text-slate-400 mb-2 px-1 flex items-center justify-between">
                <span>AI会议纪要功能</span>
                <span className="text-indigo-500 font-normal">点击选择</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 豆腐块 1: 开始访谈 */}
                <div 
                  onClick={onStartInterview}
                  className="bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-blue-100/50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/70 rounded-xl p-3 flex flex-col justify-between cursor-pointer active:scale-98 transition-all group shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                      <Mic className="w-5 h-5" />
                    </div>
                    <span className="text-[9.5px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                      实时
                    </span>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-blue-950 leading-tight">
                      开始访谈
                    </div>
                  </div>
                </div>

                {/* 豆腐块 2: 访谈记录 */}
                <div 
                  onClick={onOpenHistory}
                  className="bg-gradient-to-br from-purple-50/90 via-fuchsia-50/70 to-purple-100/50 hover:from-purple-100 hover:to-fuchsia-100 border border-purple-200/70 rounded-xl p-3 flex flex-col justify-between cursor-pointer active:scale-98 transition-all group shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                      <History className="w-5 h-5" />
                    </div>
                    <span className="text-[9.5px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                      历史
                    </span>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-purple-950 leading-tight">
                      访谈记录
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

