import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { PaperModal } from './components/PaperModal.tsx';
import { SeoGuideModal } from './components/SeoGuideModal.tsx';

import { HomePage } from './pages/HomePage.tsx';
import { StrategiesPage } from './pages/StrategiesPage.tsx';
import { SubjectDetailPage } from './pages/SubjectDetailPage.tsx';
import { PapersPage } from './pages/PapersPage.tsx';
import { HowToWritePage } from './pages/HowToWritePage.tsx';
import { TipsPage } from './pages/TipsPage.tsx';
import { ProgressPage } from './pages/ProgressPage.tsx';

import { ICSE_SUBJECTS } from './data/subjects.ts';
import { QUESTION_PAPERS } from './data/papers.ts';
import type { QuestionPaper } from './types/index.ts';
import {
  getStorageItem,
  setStorageItem,
  calculateChecklistProgress,
  calculatePaperStats,
  type StoredPaperRecord,
} from './utils/studyTracker.ts';

export default function App() {
  // Client-side router state initialized with current path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return window.location.pathname === '' ? '/' : window.location.pathname;
    }
    return '/';
  });

  // Local storage state for tracking
  const [completedPapers, setCompletedPapers] = useState<Record<string, StoredPaperRecord>>(() => {
    return getStorageItem<Record<string, StoredPaperRecord>>('completed_papers', {});
  });

  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(() => {
    return getStorageItem<Record<string, boolean>>('checked_tasks', {});
  });

  // Modal states
  const [modalPaper, setModalPaper] = useState<QuestionPaper | null>(null);
  const [isSeoGuideOpen, setIsSeoGuideOpen] = useState(false);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync to localStorage
  useEffect(() => {
    setStorageItem('completed_papers', completedPapers);
  }, [completedPapers]);

  useEffect(() => {
    setStorageItem('checked_tasks', checkedTasks);
  }, [checkedTasks]);

  // Total checklist items across all 10 subjects
  const totalChecklistCount = useMemo(() => {
    return ICSE_SUBJECTS.reduce((acc, sub) => acc + sub.revisionChecklist.length, 0);
  }, []);

  // Compute paper and checklist metrics
  const paperStats = useMemo(() => {
    return calculatePaperStats(completedPapers, QUESTION_PAPERS.length);
  }, [completedPapers]);

  const checklistStats = useMemo(() => {
    return calculateChecklistProgress(checkedTasks, totalChecklistCount);
  }, [checkedTasks, totalChecklistCount]);

  // Handler to toggle a checklist item
  const handleToggleTask = (taskId: string) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Handler to save paper score / completion
  const handleSavePaperRecord = (paperId: string, record: StoredPaperRecord | null) => {
    setCompletedPapers((prev) => {
      const next = { ...prev };
      if (!record) {
        delete next[paperId];
      } else {
        next[paperId] = record;
      }
      return next;
    });
  };

  // Handler to reset all progress
  const handleClearAllProgress = () => {
    setCompletedPapers({});
    setCheckedTasks({});
    setStorageItem('completed_papers', {});
    setStorageItem('checked_tasks', {});
  };

  // Page title sync for SEO
  useEffect(() => {
    let title = 'ICSE Edge — Class 10 Study & Paper Bank';
    if (currentPath === '/strategies') {
      title = 'Subject Strategies — ICSE Class 10 | ICSE Edge';
    } else if (currentPath.startsWith('/strategies/')) {
      const subId = currentPath.replace('/strategies/', '');
      const found = ICSE_SUBJECTS.find((s) => s.id === subId);
      if (found) {
        title = `${found.name} Strategy & Blueprint — ICSE Class 10 | ICSE Edge`;
      }
    } else if (currentPath === '/papers') {
      title = 'Previous Year Question Papers Bank — ICSE Class 10 | ICSE Edge';
    } else if (currentPath === '/how-to-write') {
      title = 'How to Write Your ICSE Paper — Presentation & Underlining Rules | ICSE Edge';
    } else if (currentPath === '/tips') {
      title = 'High-Yield Study Tips & Hall Management — ICSE Class 10 | ICSE Edge';
    } else if (currentPath === '/progress') {
      title = 'My Study Progress & Mock Scores — ICSE Class 10 | ICSE Edge';
    }
    document.title = title;
  }, [currentPath]);

  // Render current view
  const renderCurrentPage = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onNavigate={handleNavigate}
          paperStats={paperStats}
          checklistStats={checklistStats}
        />
      );
    }

    if (currentPath === '/strategies') {
      return (
        <StrategiesPage
          onNavigate={handleNavigate}
          checkedTasks={checkedTasks}
        />
      );
    }

    if (currentPath.startsWith('/strategies/')) {
      const subjectId = currentPath.replace('/strategies/', '');
      return (
        <SubjectDetailPage
          subjectId={subjectId}
          onNavigate={handleNavigate}
          checkedTasks={checkedTasks}
          onToggleTask={handleToggleTask}
          completedPapers={completedPapers}
          onOpenPaperModal={(paper) => setModalPaper(paper)}
        />
      );
    }

    if (currentPath === '/papers') {
      return (
        <PapersPage
          completedPapers={completedPapers}
          onOpenPaperModal={(paper) => setModalPaper(paper)}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/how-to-write') {
      return <HowToWritePage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/tips') {
      return <TipsPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/progress') {
      return (
        <ProgressPage
          completedPapers={completedPapers}
          checkedTasks={checkedTasks}
          paperStats={paperStats}
          checklistStats={checklistStats}
          onOpenPaperModal={(paper) => setModalPaper(paper)}
          onClearAllProgress={handleClearAllProgress}
          onNavigate={handleNavigate}
        />
      );
    }

    // Default fallback to HomePage
    return (
      <HomePage
        onNavigate={handleNavigate}
        paperStats={paperStats}
        checklistStats={checklistStats}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#14213d] font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        paperStats={paperStats}
        checklistStats={checklistStats}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-12">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSeoGuide={() => setIsSeoGuideOpen(true)}
      />

      {/* Paper Details & Mock Test Modal */}
      <PaperModal
        paper={modalPaper}
        storedRecord={modalPaper ? completedPapers[modalPaper.id] : undefined}
        isOpen={!!modalPaper}
        onClose={() => setModalPaper(null)}
        onSaveRecord={handleSavePaperRecord}
      />

      {/* SEO & Domain Setup Guide Modal */}
      <SeoGuideModal
        isOpen={isSeoGuideOpen}
        onClose={() => setIsSeoGuideOpen(false)}
      />
    </div>
  );
}
