import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Trash2, Edit2, Pause, Play, CheckCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
  onFinishAndSummary?: () => void;
}

export const LiveInterviewPage: React.FC<Props> = ({ onBack, onFinishAndSummary }) => {
  const [meetingName, setMeetingName] = useState('新记录');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const [isRecording, setIsRecording] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulated real-time audio transcription text stream
  const dialogScript = [
    '您好，我们今天进行例行现场检查，主要了解下目前的生产线运转情况和近期订单及人员安排。',
    '好的，目前我们1号和2号车间都在正常满负荷运转，近两个月订单较去年同期增长了大约15%。',
    '现场的安全生产制度和消防设施近期是否有做专项巡检？',
    '有的，上周刚完成了季度消防演练，消火栓和灭火器均处于合格状态，台账记录齐全。',
    '好的，麻烦带我们去仓库和厂区实地核对一下存货和主要设备情况。',
    '没问题，请随我来，仓库这边原料储备充足，出入库管理均已实现数字化扫码。',
  ];

  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<Array<{ text: string; time: string }>>([]);

  const handleStartEditing = () => {
    setIsEditingTitle(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  };

  // Timer counter when recording
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Real-time speech transcription typing simulation
  useEffect(() => {
    if (!isRecording) return;

    const timer = setTimeout(() => {
      if (currentScriptIndex < dialogScript.length) {
        const targetLine = dialogScript[currentScriptIndex];
        if (currentCharIndex < targetLine.length) {
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          // Finished current line
          const formattedTime = formatTime(seconds);
          setCompletedLines((prev) => [
            ...prev,
            { text: targetLine, time: formattedTime },
          ]);
          setCurrentScriptIndex((prev) => (prev + 1) % dialogScript.length);
          setCurrentCharIndex(0);
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [isRecording, currentScriptIndex, currentCharIndex, seconds]);

  // Auto-scroll to bottom as new text streams in
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [completedLines, currentCharIndex]);

  // Format seconds to 00:00:00
  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden select-none">
      
      {/* Top Header Section */}
      <div className="bg-white shrink-0 border-b border-slate-100">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-xs font-semibold text-slate-900">
          <span className="text-sm font-bold tracking-tight">09:55</span>

          {/* Right Network Icons */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-90">
            <span>5G</span>
            <div className="border border-slate-900/80 bg-slate-900/10 rounded-sm px-1 text-[9px] font-mono">40</div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="relative flex items-center justify-between px-4 py-2.5 gap-2">
          <button 
            onClick={onBack}
            aria-label="返回上一页"
            className="p-1 -ml-1 text-slate-800 hover:text-blue-600 active:scale-90 transition-all cursor-pointer z-30 shrink-0"
          >
            <ChevronLeft className="w-7 h-7 stroke-[2.2]" />
          </button>

          {/* Editable Meeting Title with Edit Icon */}
          <div className="flex-1 flex items-center justify-center gap-1.5 px-2">
            <input
              ref={inputRef}
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              onFocus={() => setIsEditingTitle(true)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  inputRef.current?.blur();
                }
              }}
              placeholder="新记录"
              className={`max-w-[140px] text-base font-bold text-slate-900 text-center tracking-wide outline-none transition-all py-0.5 rounded ${
                isEditingTitle 
                  ? 'bg-blue-50/80 border-b-2 border-blue-600 px-2' 
                  : 'bg-transparent hover:bg-slate-50 border-b border-transparent'
              }`}
            />
            <button
              type="button"
              onClick={handleStartEditing}
              className="p-1 -mr-1 text-slate-400 hover:text-blue-600 active:scale-90 transition-colors cursor-pointer"
              title="编辑标题"
            >
              <Edit2 className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-700 shrink-0">
            <button 
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1 hover:text-red-500 active:scale-90 transition-all cursor-pointer"
              title="删除"
            >
              <Trash2 className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Screen Live Transcription Module */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white overflow-hidden">
        
        {/* Live Transcript Full Screen Text Content Area with Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-3.5 pr-1 scroll-smooth"
        >
          {completedLines.length === 0 && currentCharIndex === 0 && (
            <div className="text-slate-400 text-sm font-normal">
              转录文字将在这里实时显示...
            </div>
          )}

          {/* Render Completed Lines */}
          {completedLines.map((line, idx) => (
            <div key={idx} className="space-y-0.5">
              <span className="text-[10px] font-mono text-slate-400 block">
                {line.time}
              </span>
              <p className="text-sm font-normal text-slate-800 leading-relaxed">
                {line.text}
              </p>
            </div>
          ))}

          {/* Render Active Streaming Line */}
          {currentScriptIndex < dialogScript.length && (
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-blue-500 font-semibold animate-pulse block">
                {formatTime(seconds)}
              </span>
              <p className="text-sm font-normal text-slate-900 leading-relaxed">
                {dialogScript[currentScriptIndex].substring(0, currentCharIndex)}
                {isRecording && (
                  <span className="inline-block w-1.5 h-4 bg-blue-600 ml-0.5 align-middle animate-pulse" />
                )}
              </p>
            </div>
          )}
        </div>

        {/* Audio Status & Waveform Bar (Displayed at Bottom of content area) */}
        <div className="flex items-center justify-start text-xs pt-3 pb-1 border-t border-slate-100/80 shrink-0">
          <div className="flex items-center gap-2">
            {/* Sound Wave Animation Icon */}
            <div className="flex items-center gap-0.5 text-blue-600">
              <span className="w-0.5 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>

            {/* Timer string */}
            <span className="font-bold text-blue-600 font-mono text-sm">
              {formatTime(seconds)}
            </span>

            {/* Helper text */}
            <span className="text-blue-500/90 text-xs font-medium pl-1">
              (单次最长记录4小时)
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Fixed Action Controls Bar */}
      <div className="bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-around shrink-0 z-20">
        
        {/* 1. 暂停/继续 录音 */}
        <button 
          type="button" 
          onClick={() => setIsRecording(!isRecording)}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            {isRecording ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {isRecording ? '暂停录音' : '继续录音'}
          </span>
        </button>

        {/* 2. 结束并生成纪要 */}
        <button 
          type="button" 
          onClick={onFinishAndSummary || onBack}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <CheckCircle className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-xs font-semibold text-slate-700">
            结束并生成纪要
          </span>
        </button>

      </div>

      {/* Confirmation Modal Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 w-full max-w-[280px] shadow-xl text-center space-y-4 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 pt-1">
              删除记录
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed px-1">
              删除后本次记录将无法找回
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              >
                取消
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full py-2.5 px-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
