import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateChecklistProgress,
  calculatePaperStats,
  filterPapers,
  getDailyTipIndex,
} from './studyTracker.ts';
import type { QuestionPaper } from '../types/index.ts';

test('calculateChecklistProgress handles empty or zero total items', () => {
  const result = calculateChecklistProgress({}, 0);
  assert.deepEqual(result, { completed: 0, total: 0, percentage: 0 });
});

test('calculateChecklistProgress computes percentage accurately', () => {
  const checked = {
    'item-1': true,
    'item-2': false,
    'item-3': true,
  };
  const result = calculateChecklistProgress(checked, 4);
  assert.equal(result.completed, 2);
  assert.equal(result.total, 4);
  assert.equal(result.percentage, 50);
});

test('calculateChecklistProgress clamps to total items count', () => {
  const checked = {
    'item-1': true,
    'item-2': true,
    'item-3': true,
  };
  const result = calculateChecklistProgress(checked, 2);
  assert.equal(result.completed, 2);
  assert.equal(result.percentage, 100);
});

test('calculatePaperStats correctly averages scores and completion rates', () => {
  const mockCompleted = {
    'math-2025': {
      completedAt: '2026-10-10',
      score: 72,
      maxScore: 80, // 90%
    },
    'physics-2025': {
      completedAt: '2026-10-11',
      score: 60,
      maxScore: 80, // 75%
    },
    'chem-2024': {
      completedAt: '2026-10-12',
      // no score recorded
    },
  };

  const stats = calculatePaperStats(mockCompleted, 10);
  assert.equal(stats.completedCount, 3);
  assert.equal(stats.totalPapers, 10);
  assert.equal(stats.percentage, 30);
  assert.equal(stats.scoredCount, 2);
  // Average of 90% and 75% is 82.5%
  assert.equal(stats.averageScorePercentage, 82.5);
});

test('calculatePaperStats handles empty completions', () => {
  const stats = calculatePaperStats({}, 20);
  assert.equal(stats.completedCount, 0);
  assert.equal(stats.percentage, 0);
  assert.equal(stats.averageScorePercentage, null);
  assert.equal(stats.scoredCount, 0);
});

test('filterPapers filters by subject, year, and search query', () => {
  const dummyPapers: QuestionPaper[] = [
    {
      id: 'math-2025',
      subjectId: 'mathematics',
      subjectName: 'Mathematics',
      year: 2025,
      paperType: 'board',
      title: 'ICSE 2025 Mathematics Board Paper',
      duration: '2.5 hours',
      maxMarks: 80,
      downloadUrl: 'https://cisce.org',
      isAvailable: true,
      verifiedSource: 'CISCE',
      hasMarkingScheme: true,
    },
    {
      id: 'phys-2024',
      subjectId: 'physics',
      subjectName: 'Physics',
      year: 2024,
      paperType: 'board',
      title: 'ICSE 2024 Physics Board Paper',
      duration: '2 hours',
      maxMarks: 80,
      downloadUrl: 'https://cisce.org',
      isAvailable: true,
      verifiedSource: 'CISCE',
      hasMarkingScheme: true,
    },
  ];

  const mathOnly = filterPapers(dummyPapers, { subjectId: 'mathematics' });
  assert.equal(mathOnly.length, 1);
  assert.equal(mathOnly[0].id, 'math-2025');

  const year2024Only = filterPapers(dummyPapers, { year: '2024' });
  assert.equal(year2024Only.length, 1);
  assert.equal(year2024Only[0].id, 'phys-2024');

  const searchBoard = filterPapers(dummyPapers, { searchQuery: 'physics' });
  assert.equal(searchBoard.length, 1);
  assert.equal(searchBoard[0].id, 'phys-2024');
});

test('getDailyTipIndex returns consistent index within bounds', () => {
  const dateA = new Date('2026-10-15T12:00:00Z');
  const index1 = getDailyTipIndex(5, dateA);
  const index2 = getDailyTipIndex(5, dateA);
  assert.equal(index1, index2);
  assert.ok(index1 >= 0 && index1 < 5);
});
