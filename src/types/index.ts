export type SubjectCategory = 'languages' | 'sciences' | 'mathematics' | 'humanities' | 'applied';

export interface HallTimeSegment {
  section: string;
  durationMinutes: number;
  description: string;
}

export interface ImportantTopic {
  title: string;
  note: string;
  frequency: 'very-high' | 'high' | 'moderate';
}

export interface SubjectChecklistItem {
  id: string;
  text: string;
  chapterOrTopic: string;
}

export interface SubjectStrategy {
  id: string;
  number: string;
  name: string;
  shortName: string;
  paperCode: string;
  marks: number;
  internalMarks?: number;
  duration: string;
  category: SubjectCategory;
  tagline: string;
  overview: string;
  blueprint: {
    sectionA: string;
    sectionB: string;
    choicePattern: string;
  };
  preparationSteps: {
    step: number;
    title: string;
    details: string;
  }[];
  writingRules: string[];
  hallTimePlan: HallTimeSegment[];
  importantTopics: ImportantTopic[];
  revisionChecklist: SubjectChecklistItem[];
}

export type PaperType = 'board' | 'specimen' | 'marking_scheme';

export interface PaperSubQuestion {
  subNumber: string;
  text: string;
  marks: number;
  options?: string[];
  solutionOrMarkingRubric?: string;
}

export interface PaperQuestion {
  questionNumber: string;
  instruction?: string;
  marks: number;
  subQuestions: PaperSubQuestion[];
}

export interface PaperSection {
  name: string;
  instruction: string;
  questions: PaperQuestion[];
}

export interface QuestionPaper {
  id: string;
  subjectId: string;
  subjectName: string;
  year: number | string;
  paperType: PaperType;
  title: string;
  duration: string;
  maxMarks: number;
  downloadUrl?: string;
  viewUrl?: string;
  isAvailable: boolean;
  unavailableReason?: string;
  verifiedSource: string;
  hasMarkingScheme: boolean;
  notes?: string;
  instructions?: string[];
  sections?: PaperSection[];
  markingSchemeSummary?: string[];
}

export interface MockTestRecord {
  id: string;
  paperId: string;
  subjectId: string;
  score: number;
  maxScore: number;
  dateCompleted: string;
  timeTakenMinutes?: number;
  notes?: string;
}

export interface Tip {
  id: string;
  ruleNumber?: string;
  category: 'hall-strategy' | 'answer-presentation' | 'underlining' | 'time-management' | 'mistake-prevention';
  title: string;
  summary: string;
  content: string[];
  applicableSubjects?: string;
  examinerInsight?: string;
}
