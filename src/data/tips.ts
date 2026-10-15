import type { Tip } from '../types/index.ts';

export interface UnderlineGuideline {
  subject: string;
  itemsToUnderline: string;
  avoidRule: string;
}

export const UNDERLINE_GUIDELINES: UnderlineGuideline[] = [
  {
    subject: 'Literature & Languages',
    itemsToUnderline: 'Textual quotations, character names, poem titles, dramatic acts/scenes, essay heading.',
    avoidRule: 'Do not underline full paragraphs or long multi-sentence chunks. Only precision keywords.',
  },
  {
    subject: 'Physics & Chemistry',
    itemsToUnderline: 'Definitions, physical laws verbatim, balanced chemical equations, every final numerical value WITH its unit.',
    avoidRule: 'Never underline scratch math in rough columns. Never forget units (e.g. cm, J, Ω).',
  },
  {
    subject: 'Biology',
    itemsToUnderline: 'Technical biological terms (e.g., erythrocytes, Bowman\'s capsule), diagram titles, scientific nomenclature.',
    avoidRule: 'Never use vague colloquial terms (e.g., "blood filter", "brain part").',
  },
  {
    subject: 'History & Civics',
    itemsToUnderline: 'Names of leaders, historic dates, acts, treaties, movement names, constitutional terms (Quorum, Ordinance, Writs).',
    avoidRule: 'Avoid rambling essays. Structure in clearly numbered points: 3 marks = 3 points.',
  },
  {
    subject: 'Geography',
    itemsToUnderline: 'Specific place names, rivers, crops, soil types, technical wind mechanisms, 4-figure/6-figure grid refs.',
    avoidRule: 'Keep map labels neat; do not scribble names outside boundary arrows.',
  },
  {
    subject: 'Mathematics',
    itemsToUnderline: 'The boxed final answer only along with appropriate units (e.g., [ ₹ 2,450 ], [ 154 cm² ]).',
    avoidRule: 'Do not underline intermediate equation manipulations. Keep working clean.',
  },
  {
    subject: 'Computer Applications',
    itemsToUnderline: 'Method signatures, key Java keywords, class name, and Variable Description Table headers.',
    avoidRule: 'Ensure variable tables are drawn neatly in pencil with all variables listed.',
  },
];

export const CORE_ANSWER_RULES: Tip[] = [
  {
    id: 'rule-1',
    ruleNumber: 'Rule 01',
    category: 'hall-strategy',
    title: 'The First 15 Minutes — Strategic Planning',
    summary: 'ICSE provides 15 minutes of mandatory reading time before you are allowed to write.',
    content: [
      'Do not read passively like a storybook.',
      'In Section B, tick the exact 4 questions you will attempt and cross out the ones you will leave.',
      'In English Language, pick your essay topic and mentally outline 3 main points and a punchy conclusion.',
      'In Science and Math, inspect all numericals for familiar values and potential unit conversion traps.',
    ],
    examinerInsight: 'Students who enter the writing time with their question selection finalized save 12 to 18 minutes of mid-exam indecision.',
  },
  {
    id: 'rule-2',
    ruleNumber: 'Rule 02',
    category: 'underlining',
    title: 'Underline Like an Examiner Scans',
    summary: 'The examiner spends roughly 90 to 120 seconds per answer sheet. Make the keywords impossible to miss.',
    content: [
      'Underline definitions, laws, dates, names, formulas, and final answers with a ruler or clean line.',
      'Use the exact same dark blue or black ink pen you are writing with.',
      'Coloured pens, red ink, and fluorescent highlighters are strictly prohibited by CISCE guidelines.',
      'Underlining acts as a beacon for the official CISCE marking scheme keywords.',
    ],
    examinerInsight: 'Examiners are scanning against an official CISCE marking rubric. When the key phrase is underlined, marks are awarded immediately.',
  },
  {
    id: 'rule-3',
    ruleNumber: 'Rule 03',
    category: 'answer-presentation',
    title: 'Marks Decide Length — Not Your Enthusiasm',
    summary: 'Writing two pages for a 2-mark question earns zero extra credit and starves your Section B answers.',
    content: [
      '2 Marks = Two distinct, numbered points or one tight two-sentence definition.',
      '3 Marks = Three clear points with specific examples or conditions.',
      '4 Marks = Four points or one well-structured paragraph with evidence.',
      'Never write a lengthy essay for a short answer question in History, Civics, or Biology.',
    ],
    examinerInsight: 'Length does not substitute for substance. Examiners count valid points, not lines of ink.',
  },
  {
    id: 'rule-4',
    ruleNumber: 'Rule 04',
    category: 'answer-presentation',
    title: 'Numbering and Margin Integrity',
    summary: 'Keep all sub-parts of a question together in contiguous sequence.',
    content: [
      'Write the question number in the left margin exactly as printed (e.g., Question 3 (a) (ii)).',
      'Leave 1 blank line between answer sub-parts, and 2 blank lines (or draw a clean divider line) between major questions.',
      'Never scatter sub-parts across different pages (e.g. doing Q3(a) on page 2 and Q3(b) on page 11). Scatter costs marks.',
      'If you get stuck on a sub-part, leave an estimated 4–6 lines and proceed to the next sub-part.',
    ],
    examinerInsight: 'Separated sub-parts create a severe risk of being missed during rapid paper evaluation.',
  },
  {
    id: 'rule-5',
    ruleNumber: 'Rule 05',
    category: 'answer-presentation',
    title: 'Diagrams and Comparative Tables',
    summary: 'All diagrams must be in pencil, properly scaled, and comprehensively labeled.',
    content: [
      'Always draw diagrams in sharp pencil with a ruler.',
      'Keep label guide lines straight, horizontal, and never cross one line over another.',
      'When asked to "Differentiate" or "Distinguish", always create a two-column table with a stated "Basis of Comparison".',
      'In Physics, every light ray and electrical circuit diagram must feature unambiguous direction arrows.',
    ],
    examinerInsight: 'A ray diagram without arrows receives an immediate zero under CISCE marking rules.',
  },
  {
    id: 'rule-6',
    ruleNumber: 'Rule 06',
    category: 'mistake-prevention',
    title: 'Attempt Everything — Zero Negative Marking',
    summary: 'There is no negative marking in ICSE examinations. Never leave a sub-part blank.',
    content: [
      'Even if you do not know the complete numerical solution, write the basic formula and substitute the given values.',
      'In Biology or Chemistry, write the related organ name, law, or equation you recall.',
      'Partial credit is standard in ICSE evaluation. A partially correct attempt earns 1 or 2 marks; a blank earns zero.',
      'In multiple choice questions, make an educated guess by eliminating obviously incorrect options.',
    ],
    examinerInsight: 'Step marking allows students to harvest 30–40% of marks on hard questions through formula and setup alone.',
  },
  {
    id: 'rule-7',
    ruleNumber: 'Rule 07',
    category: 'time-management',
    title: 'The Last 15 Minutes — The Sanity Audit',
    summary: 'Reserve the final 15 minutes of the clock exclusively for checking and recovery.',
    content: [
      'Check that every single sub-question number corresponds to the question paper.',
      'Verify every single numerical answer carries its proper unit (e.g., m/s², cm³, ₹, Joules, Watts).',
      'Ensure supplementary sheets and graph papers are securely tied with thread inside the booklet.',
      'Ensure maps are securely stitched and named with your Unique ID and Index Number.',
    ],
    examinerInsight: 'The last 15 minutes routinely recover 4 to 8 lost marks from careless omission and misnumbering.',
  },
];

export const DAILY_TIPS: Tip[] = [
  {
    id: 'daily-1',
    category: 'mistake-prevention',
    title: 'The Silly Mistake Notebook Habit',
    summary: 'Every time you lose marks in a school pre-board or mock test, write down the exact careless error in a pocket notebook.',
    content: [
      'Categorize mistakes into: (1) Misread the question, (2) Arithmetic slip, (3) Missing unit, (4) Incomplete keyword.',
      'Re-read your Silly Mistake Notebook for 10 minutes right before you enter every examination hall.',
    ],
  },
  {
    id: 'daily-2',
    category: 'answer-presentation',
    title: 'The Power of "Basis of Comparison"',
    summary: 'In Science and Social Studies, never write paragraph differences.',
    content: [
      'Create 3 columns: Parameter / Basis of Comparison, Entity A, Entity B.',
      'For example: Basis: Location, Function, Hormone secreted. This guarantees maximum available marks.',
    ],
  },
  {
    id: 'daily-3',
    category: 'time-management',
    title: 'Simulate the Clock on Loose Sheets',
    summary: 'Solving papers in your regular school notebook gives a false sense of page width and writing pace.',
    content: [
      'Buy a pack of ruled loose exam sheets. Time yourself with a tabletop clock (no phones).',
      'Build writing endurance so your hand muscles do not cramp during 3-hour Hindi or 2.5-hour Math papers.',
    ],
  },
  {
    id: 'daily-4',
    category: 'hall-strategy',
    title: 'The 20-Second Question Re-read',
    summary: 'Before writing your final line, re-read the last sentence of the printed question.',
    content: [
      'Did it ask for "area" or "cost of painting"? Did it ask for "radius" or "diameter"?',
      'Did it ask for "in reverse order"? This single 20-second check prevents the most heartbreaking slips.',
    ],
  },
  {
    id: 'daily-5',
    category: 'underlining',
    title: 'English Literature Quotation Weaving',
    summary: 'Integrate 3- to 4-word quotes into your analytical sentences rather than writing isolated quote blocks.',
    content: [
      'Write: Antony subtly subverts the crowd by repeatedly calling Brutus an "honourable man", exposing their hypocrisy.',
      'Short integrated quotes demonstrate deep textual familiarity to CISCE evaluators.',
    ],
  },
  {
    id: 'daily-6',
    category: 'answer-presentation',
    title: 'Computer Applications Variable Table',
    summary: 'Do not lose 2 guaranteed marks on Java programs.',
    content: [
      'Every program must have a 3-column table: Variable Name | Data Type | Purpose/Description.',
      'Draw it at the end of every program using pencil. It takes 90 seconds and locks in full technical points.',
    ],
  },
  {
    id: 'daily-7',
    category: 'hall-strategy',
    title: 'Calorimetry Principle Statement First',
    summary: 'In Physics heat numericals, never start with raw numbers.',
    content: [
      'Always write: "According to the principle of calorimetry, Heat lost by hot body = Heat gained by cold body".',
      'This grants 1 full mark even if you make a calculation slip later in the algebraic simplification.',
    ],
  },
];
