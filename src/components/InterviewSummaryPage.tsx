import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

interface Props {
  onBack: () => void;
  isFromAiSummaryQuickAction?: boolean;
  onImportText?: (text: string) => void;
}

export const InterviewSummaryPage: React.FC<Props> = ({ 
  onBack, 
  isFromAiSummaryQuickAction = false,
  onImportText
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript'>('summary');
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('导入成功');

  const transcriptLines = [
    { time: '00:00:03', text: '您好，我们今天进行例行现场检查，主要了解下目前的生产线运转情况和近期订单及人员安排。' },
    { time: '00:00:15', text: '好的，目前我们1号和2号车间都在正常满负荷运转，近两个月订单较去年同期增长了大约15%。' },
    { time: '00:00:28', text: '现场的安全生产制度和消防设施近期是否有做专项巡检？' },
    { time: '00:00:41', text: '有的，上周刚完成了季度消防演练，消火栓和灭火器均处于合格状态，台账记录齐全。' },
    { time: '00:00:58', text: '好的，麻烦带我们去仓库和厂区实地核对一下存货和主要设备情况。' },
    { time: '00:01:12', text: '没问题，请随我来，仓库这边原料储备充足，出入库管理均已实现数字化扫码。' },
  ];

  const handleAction = () => {
    setToastText(isFromAiSummaryQuickAction ? '复制成功' : '导入成功');
    setShowToast(true);

    if (!isFromAiSummaryQuickAction && onImportText) {
      const summaryContent = `例行现场检查实地访谈AI纪要

【会议背景与目的】
本次现场访谈旨在全面核查企业当前生产线运转状态、近期订单增长规模及人员安全防范措施，评估企业日常经营与合规情况。

【核心信息摘要】
1. 生产运转与订单增长：目前厂区1号和2号主要生产车间均处于满负荷稳定运转状态；近两个月订单规模保持强劲增长，较去年同期增长约 15%。
2. 安全生产与消防设施巡检：上周已顺利完成季度专项消防演练，现场消火栓与灭火设备均经排查处于良好合格状态，专项安全台账记录完整健全。
3. 仓储储备与数字化管理：实地核查仓库原料及半成品储备充足，出入库流程已全面接轨数字化扫码追溯系统，管理流程严密规范。

【现场评估结论】
企业整体经营秩序正常，产能与订单匹配良好，安全生产防线扎实。`;

      const transcriptContent = transcriptLines.map(l => `${l.time} ${l.text}`).join('\n');
      const textToImport = activeTab === 'summary' ? summaryContent : transcriptContent;
      
      onImportText(textToImport);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden select-none">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-fadeIn pointer-events-none">
          <div className="bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-400 stroke-[2.5]" />
            <span>{toastText}</span>
          </div>
        </div>
      )}

      {/* Top Header Section */}
      <div className="bg-white shrink-0 border-b border-slate-100">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-xs font-semibold text-slate-900">
          <span className="text-sm font-bold tracking-tight">09:59</span>

          {/* Right Network Icons */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-90">
            <span>5G</span>
            <div className="border border-slate-900/80 bg-slate-900/10 rounded-sm px-1 text-[9px] font-mono">42</div>
          </div>
        </div>

        {/* Navigation Bar with Tabs */}
        <div className="relative flex items-center justify-between px-4 py-2">
          {/* Back Button */}
          <button 
            onClick={onBack}
            aria-label="返回上一页"
            className="p-1 -ml-1 text-slate-800 hover:text-blue-600 active:scale-90 transition-all cursor-pointer z-30 shrink-0"
          >
            <ChevronLeft className="w-7 h-7 stroke-[2.2]" />
          </button>

          {/* Center Tabs: Ai纪要 | 对话原文 (笔记tab已按要求删除, 搜索/转发/更多已删除) */}
          <div className="flex items-center gap-6 ml-2">
            {/* Tab 1: Ai纪要 */}
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              className={`relative py-1.5 text-base font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'summary' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span>Ai纪要</span>
              {activeTab === 'summary' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              )}
            </button>

            {/* Tab 2: 对话原文 */}
            <button
              type="button"
              onClick={() => setActiveTab('transcript')}
              className={`relative py-1.5 text-base font-medium transition-colors cursor-pointer ${
                activeTab === 'transcript' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span>对话原文</span>
              {activeTab === 'transcript' && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Right Area (Clean & empty as requested: 删除搜索、转发、更多按钮) */}
          <div className="w-8" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 relative bg-gradient-to-b from-blue-50/20 via-white to-white">
        
        {activeTab === 'summary' ? (
          /* Ai纪要 View */
          <div className="relative space-y-6">
            
            {/* Background floating AI watermark visual accent */}
            <div className="absolute top-0 right-0 text-[120px] font-black text-blue-500/5 select-none pointer-events-none leading-none -mt-4">
              Ai
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1.5 pt-1 relative z-10">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                例行现场检查实地访谈AI纪要
              </h1>
              <p className="text-xs font-mono text-slate-400">
                2026.08.09 19:38~19:42
              </p>
            </div>

            {/* Section 1: 会议背景与目的 */}
            <div className="space-y-2 relative z-10">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                会议背景与目的
              </h2>
              <ul className="list-disc list-outside pl-5 text-sm text-slate-700 leading-relaxed space-y-1.5">
                <li>
                  本次现场访谈旨在全面核查企业当前生产线运转状态、近期订单增长规模及人员安全防范措施，评估企业日常经营与合规情况。
                </li>
              </ul>
            </div>

            {/* Section 2: 核心信息摘要 */}
            <div className="space-y-3 relative z-10">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                核心信息摘要
              </h2>

              <ul className="list-disc list-outside pl-5 text-sm text-slate-700 leading-relaxed space-y-3">
                {/* Subsection A */}
                <li className="space-y-1">
                  <span className="font-bold text-slate-900">生产运转与订单增长：</span>
                  <div className="pl-1 pt-0.5 text-slate-700">
                    目前厂区1号和2号主要生产车间均处于满负荷稳定运转状态；近两个月订单规模保持强劲增长，较去年同期增长约 15%。
                  </div>
                </li>

                {/* Subsection B */}
                <li className="space-y-1">
                  <span className="font-bold text-slate-900">安全生产与消防设施巡检：</span>
                  <div className="pl-1 pt-0.5 text-slate-700">
                    上周已顺利完成季度专项消防演练，现场消火栓与灭火设备均经排查处于良好合格状态，专项安全台账记录完整健全。
                  </div>
                </li>

                {/* Subsection C */}
                <li className="space-y-1">
                  <span className="font-bold text-slate-900">仓储储备与数字化管理：</span>
                  <div className="pl-1 pt-0.5 text-slate-700">
                    实地核查仓库原料及半成品储备充足，出入库流程已全面接轨数字化扫码追溯系统，管理流程严密规范。
                  </div>
                </li>
              </ul>
            </div>

            {/* Section 3: 检查结论 */}
            <div className="space-y-2 relative z-10 pt-1">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                现场评估结论
              </h2>
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed">
                企业整体经营秩序正常，产能与订单匹配良好，安全生产防线扎实。建议按计划开展后续定期跟踪。
              </div>
            </div>

          </div>
        ) : (
          /* 对话原文 View */
          <div className="space-y-3 pt-1">
            <div className="space-y-3">
              {transcriptLines.map((item, idx) => (
                <div key={idx} className="space-y-1 py-2 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center justify-start text-[10px] font-mono text-slate-400">
                    <span>{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-normal">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-slate-100 p-4 shrink-0 shadow-lg">
        <button
          type="button"
          onClick={handleAction}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          {isFromAiSummaryQuickAction
            ? (activeTab === 'summary' ? '复制纪要' : '复制原文')
            : (activeTab === 'summary' ? '将纪要导入检查情况文本框' : '将原文导入检查情况文本框')}
        </button>
      </div>

    </div>
  );
};
