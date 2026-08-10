import { useState } from 'react';
import { StatusBar } from './components/StatusBar';
import { HeaderBanner } from './components/HeaderBanner';
import { QuickActions } from './components/QuickActions';
import { TaskSection } from './components/TaskSection';
import { BottomNav } from './components/BottomNav';
import { CustomerInspectionPage, InspectionItem } from './components/CustomerInspectionPage';
import { InspectionDetailPage } from './components/InspectionDetailPage';
import { FieldInspectionFormPage } from './components/FieldInspectionFormPage';
import { PrePhotoCreatePage } from './components/PrePhotoCreatePage';
import { LiveInterviewPage } from './components/LiveInterviewPage';
import { InterviewSummaryPage } from './components/InterviewSummaryPage';
import { InterviewHistoryPage } from './components/InterviewHistoryPage';

type ScreenType = 'main' | 'inspection' | 'inspectionDetail' | 'fieldInspection' | 'prePhoto' | 'liveInterview' | 'interviewSummary' | 'interviewHistory';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('main');
  const [returnScreen, setReturnScreen] = useState<ScreenType>('main');
  const [isFromAiSummaryQuickAction, setIsFromAiSummaryQuickAction] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<InspectionItem | null>(null);
  const [prePhotoDetail, setPrePhotoDetail] = useState('');
  const [fieldInspectionDetail, setFieldInspectionDetail] = useState('');

  const handleSelectTask = (taskId: string) => {
    if (taskId === '1') {
      setCurrentScreen('inspection');
    }
  };

  const handleSelectRecord = (record: InspectionItem) => {
    setSelectedRecord(record);
    setCurrentScreen('inspectionDetail');
  };

  const openInterviewFrom = (from: ScreenType, isFromQuickAction = false) => {
    setReturnScreen(from);
    setIsFromAiSummaryQuickAction(isFromQuickAction);
    setCurrentScreen('liveInterview');
  };

  const handleImportText = (importedText: string) => {
    if (returnScreen === 'prePhoto') {
      setPrePhotoDetail(importedText);
    } else if (returnScreen === 'fieldInspection') {
      setFieldInspectionDetail(importedText);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#E2E8F0] flex justify-center items-center p-0 sm:p-4 font-sans antialiased select-none">
      {/* Mobile Phone Device Container */}
      <div className="w-full max-w-[390px] h-screen sm:h-[844px] bg-gradient-to-b from-[#92C2FF] via-[#D2E4FF] via-25% to-[#F0F5FA] relative overflow-hidden flex flex-col justify-between shadow-2xl sm:rounded-[40px] border border-slate-300/60">
        
        {currentScreen === 'interviewHistory' ? (
          <InterviewHistoryPage 
            onBack={() => setCurrentScreen('main')}
            onSelectRecord={() => {
              setReturnScreen('interviewHistory');
              setIsFromAiSummaryQuickAction(true);
              setCurrentScreen('interviewSummary');
            }}
          />
        ) : currentScreen === 'interviewSummary' ? (
          <InterviewSummaryPage 
            onBack={() => setCurrentScreen(returnScreen)} 
            isFromAiSummaryQuickAction={isFromAiSummaryQuickAction}
            onImportText={handleImportText}
          />
        ) : currentScreen === 'liveInterview' ? (
          <LiveInterviewPage 
            onBack={() => setCurrentScreen(returnScreen)} 
            onFinishAndSummary={() => setCurrentScreen('interviewSummary')}
          />
        ) : currentScreen === 'prePhoto' ? (
          <PrePhotoCreatePage 
            onBack={() => setCurrentScreen('main')} 
            onOpenInterview={() => openInterviewFrom('prePhoto', false)}
            inspectionDetail={prePhotoDetail}
            onInspectionDetailChange={setPrePhotoDetail}
          />
        ) : currentScreen === 'fieldInspection' ? (
          <FieldInspectionFormPage 
            companyName={selectedRecord?.companyName}
            onBack={() => setCurrentScreen('inspectionDetail')}
            onOpenInterview={() => openInterviewFrom('fieldInspection', false)}
            inspectionDetail={fieldInspectionDetail}
            onInspectionDetailChange={setFieldInspectionDetail}
          />
        ) : currentScreen === 'inspectionDetail' ? (
          <InspectionDetailPage 
            record={selectedRecord || undefined} 
            onBack={() => setCurrentScreen('inspection')} 
            onSelectBorrower={() => setCurrentScreen('fieldInspection')}
          />
        ) : currentScreen === 'inspection' ? (
          <CustomerInspectionPage 
            onBack={() => setCurrentScreen('main')} 
            onSelectRecord={handleSelectRecord}
          />
        ) : (
          <>
            {/* Top Scrollable / Content Area */}
            <div className="relative z-10 flex flex-col">
              {/* Soft Background Wave / Ambient Glow Elements */}
              <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#7FB6FF]/40 via-[#B5D6FF]/20 to-transparent pointer-events-none" />
              <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-[120px] left-[-60px] w-64 h-64 bg-indigo-200/25 rounded-full blur-2xl pointer-events-none" />

              {/* 1. Status Bar */}
              <StatusBar />

              {/* 2. Beijing Bank Header & Assistant Titles */}
              <HeaderBanner />

              {/* 3. Quick Action Buttons Card */}
              <QuickActions 
                onNavigateToPrePhoto={() => setCurrentScreen('prePhoto')} 
                onStartInterview={() => openInterviewFrom('main', true)}
                onOpenHistory={() => setCurrentScreen('interviewHistory')}
              />

              {/* 4. Task Grid Section */}
              <TaskSection onSelectTask={handleSelectTask} />
            </div>

            {/* 5. Fixed Bottom Navigation Bar at bottom of Phone Shell */}
            <BottomNav />
          </>
        )}

      </div>
    </div>
  );
}
