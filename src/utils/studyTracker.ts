import type { QuestionPaper, MockTestRecord } from '../types/index.ts';

export interface StoredPaperRecord {
  completedAt: string;
  score?: number;
  maxScore?: number;
  timeTakenMinutes?: number;
  notes?: string;
}

export interface PaperStats {
  completedCount: number;
  totalPapers: number;
  percentage: number;
  averageScorePercentage: number | null;
  scoredCount: number;
}

export interface ChecklistStats {
  completed: number;
  total: number;
  percentage: number;
}

/**
 * Calculates completion stats for a checklist given a state map.
 */
export function calculateChecklistProgress(
  checkedMap: Record<string, boolean> = {},
  totalItemsCount: number = 0
): ChecklistStats {
  if (totalItemsCount <= 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  // Count only true values that belong to existing items
  let count = 0;
  for (const key in checkedMap) {
    if (checkedMap[key] === true) {
      count++;
    }
  }

  // Clamp count so it doesn't exceed totalItemsCount
  const validCompleted = Math.min(count, totalItemsCount);
  const percentage = Math.round((validCompleted / totalItemsCount) * 100);

  return {
    completed: validCompleted,
    total: totalItemsCount,
    percentage,
  };
}

/**
 * Calculates overall past paper completion and mock score averages.
 */
export function calculatePaperStats(
  completedMap: Record<string, StoredPaperRecord> = {},
  totalPapers: number = 0
): PaperStats {
  const keys = Object.keys(completedMap);
  const completedCount = keys.length;
  const percentage = totalPapers > 0 ? Math.round((completedCount / totalPapers) * 100) : 0;

  let totalPercentageSum = 0;
  let scoredCount = 0;

  for (const key of keys) {
    const item = completedMap[key];
    if (
      item &&
      typeof item.score === 'number' &&
      typeof item.maxScore === 'number' &&
      item.maxScore > 0 &&
      !isNaN(item.score)
    ) {
      totalPercentageSum += (item.score / item.maxScore) * 100;
      scoredCount++;
    }
  }

  const averageScorePercentage =
    scoredCount > 0 ? Math.round((totalPercentageSum / scoredCount) * 10) / 10 : null;

  return {
    completedCount,
    totalPapers,
    percentage,
    averageScorePercentage,
    scoredCount,
  };
}

/**
 * Filters question papers by subject, year, or paper type.
 */
export function filterPapers(
  papers: QuestionPaper[],
  filters: {
    subjectId?: string;
    year?: string | number;
    paperType?: string;
    searchQuery?: string;
  }
): QuestionPaper[] {
  return papers.filter((paper) => {
    if (filters.subjectId && filters.subjectId !== 'all' && paper.subjectId !== filters.subjectId) {
      return false;
    }

    if (filters.year && filters.year !== 'all') {
      const yearStr = String(paper.year).toLowerCase();
      const filterYearStr = String(filters.year).toLowerCase();
      if (!yearStr.includes(filterYearStr)) {
        return false;
      }
    }

    if (filters.paperType && filters.paperType !== 'all' && paper.paperType !== filters.paperType) {
      return false;
    }

    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = paper.title.toLowerCase().includes(q);
      const matchSubject = paper.subjectName.toLowerCase().includes(q);
      const matchNotes = (paper.notes || '').toLowerCase().includes(q);
      if (!matchTitle && !matchSubject && !matchNotes) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Returns a stable daily index based on current date (UTC day).
 */
export function getDailyTipIndex(totalTips: number, date: Date = new Date()): number {
  if (totalTips <= 0) return 0;
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      24 /
      60 /
      60 /
      1000
  );
  return dayOfYear % totalTips;
}

// Browser LocalStorage helpers with safe JSON error handling
const PREFIX = 'icse_edge_';

export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}
