import type { QuestionPaper } from '../types/index.ts';

export const QUESTION_PAPERS: QuestionPaper[] = [
  // --- MATHEMATICS ---
  {
    id: 'math-2025-specimen',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2025 Specimen',
    paperType: 'specimen',
    title: 'ICSE 2025 Mathematics Specimen Question Paper',
    duration: '2.5 hours',
    maxMarks: 80,
    isAvailable: true,
    verifiedSource: 'Council for the Indian School Certificate Examinations (CISCE)',
    hasMarkingScheme: true,
    notes: 'Official specimen paper featuring revised 2025-26 15 MCQs pattern and structured Section B questions.',
    instructions: [
      'Answers to this Paper must be written on the paper provided separately.',
      'You will not be allowed to write during the first 15 minutes. This time is to be spent in reading the question paper.',
      'The time given at the head of this Paper is the time allowed for writing the answers.',
      'Section A is compulsory. Attempt any four questions from Section B.',
      'All working, including rough work, must be clearly shown and must be done on the same sheet as the rest of the answer.',
      'Mathematical tables are provided on request.',
    ],
    sections: [
      {
        name: 'SECTION A (40 Marks)',
        instruction: 'Attempt all questions from this Section.',
        questions: [
          {
            questionNumber: 'Question 1',
            instruction: 'Choose the correct answers to the questions from the given options: [15 × 1 = 15 Marks]',
            marks: 15,
            subQuestions: [
              {
                subNumber: '(i)',
                text: 'If a dealer in Delhi sells goods worth ₹10,000 to a customer in Agra (UP) at 18% GST, the amount of IGST charged is:',
                marks: 1,
                options: ['(a) ₹900', '(b) ₹1,800', '(c) ₹0', '(d) ₹3,600'],
              },
              {
                subNumber: '(ii)',
                text: 'If (x - 2) is a factor of the polynomial 2x³ - x² - px - 2, then the value of p is:',
                marks: 1,
                options: ['(a) 3', '(b) 5', '(c) -3', '(d) -5'],
              },
              {
                subNumber: '(iii)',
                text: 'If matrix A has order 2 × 3 and matrix B has order 3 × 2, then the order of the product AB is:',
                marks: 1,
                options: ['(a) 3 × 3', '(b) 2 × 2', '(c) 2 × 3', '(d) Not possible'],
              },
              {
                subNumber: '(iv)',
                text: 'The roots of the quadratic equation 3x² - 6x + 2 = 0 are:',
                marks: 1,
                options: ['(a) Real and equal', '(b) Real and distinct', '(c) Not real', '(d) Purely imaginary'],
              },
              {
                subNumber: '(v)',
                text: 'The 10th term of the arithmetic progression 4, 9, 14, 19, ... is:',
                marks: 1,
                options: ['(a) 45', '(b) 49', '(c) 54', '(d) 50'],
              },
            ],
          },
          {
            questionNumber: 'Question 2',
            instruction: 'Answer the following structured mathematical problems: [12 Marks]',
            marks: 12,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'Mrs. Sharma deposited ₹800 per month in a recurring deposit account for 2.5 years. If the rate of interest is 8% per annum, find the total amount she receives on maturity.',
                marks: 4,
              },
              {
                subNumber: '(b)',
                text: 'Using remainder and factor theorem, factorise completely: 2x³ + x² - 13x + 6.',
                marks: 4,
              },
              {
                subNumber: '(c)',
                text: 'Solve the following inequation and represent the solution set on the real number line: -3 ≤ 2x - 1 < x + 4, where x ∈ R.',
                marks: 4,
              },
            ],
          },
          {
            questionNumber: 'Question 3',
            instruction: 'Answer the following questions: [13 Marks]',
            marks: 13,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'If A = [[2, 1], [0, 3]] and B = [[1, -1], [4, 2]], find the matrix X such that 2A + X = B².',
                marks: 4,
              },
              {
                subNumber: '(b)',
                text: 'The coordinates of points A and B are (2, -3) and (-4, 5) respectively. Find the equation of the perpendicular bisector of line segment AB.',
                marks: 4,
              },
              {
                subNumber: '(c)',
                text: 'Prove the trigonometric identity: (sin A + cosec A)² + (cos A + sec A)² = 7 + tan² A + cot² A.',
                marks: 5,
              },
            ],
          },
        ],
      },
      {
        name: 'SECTION B (40 Marks)',
        instruction: 'Attempt any four questions from this Section.',
        questions: [
          {
            questionNumber: 'Question 4',
            marks: 10,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'A retailer buys a camera from a wholesaler for ₹20,000. He marks up the price by 20% and sells it to a consumer at 10% discount. If GST rate is 18%, calculate the final bill of the consumer and the CGST paid by the retailer.',
                marks: 3,
              },
              {
                subNumber: '(b)',
                text: 'Two dice are rolled simultaneously. Find the probability of getting: (i) a doublet, (ii) a sum greater than 9, (iii) an even number on the first die.',
                marks: 3,
              },
              {
                subNumber: '(c)',
                text: 'From the top of a cliff 60 m high, the angles of depression of the top and bottom of a tower are observed to be 30° and 60° respectively. Find the height of the tower. (Take √3 = 1.732).',
                marks: 4,
              },
            ],
          },
          {
            questionNumber: 'Question 5',
            marks: 10,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'A solid metallic cylinder of base radius 3 cm and height 12 cm is melted and recast into small spheres of radius 1.5 cm each. Find the number of spheres formed.',
                marks: 3,
              },
              {
                subNumber: '(b)',
                text: 'Solve for x using the quadratic formula: 2x² - 5x - 3 = 0. Give your answer correct to two decimal places.',
                marks: 3,
              },
              {
                subNumber: '(c)',
                text: 'Use graph paper for this question. Draw an ogive for the following cumulative frequency distribution: Weekly wages (₹) and number of workers. Hence estimate the median wage and the semi-interquartile range.',
                marks: 4,
              },
            ],
          },
        ],
      },
    ],
    markingSchemeSummary: [
      'Banking maturity formula: MV = P × n + I, where I = P × n(n+1)/(2×12) × r/100. Correct formula substitution carries 2 marks; arithmetic simplifies for final 2 marks.',
      'Polynomial factorisation: Trial method root x = 2 earns 1 mark; synthetic/long division quotient quadratic earns 2 marks; final factorisation (x - 2)(2x - 1)(x + 3) earns 1 mark.',
      'Inequation: Splitting into two parts (-3 ≤ 2x - 1 and 2x - 1 < x + 4) earns 2 marks; solution set -1 ≤ x < 5 earns 1 mark; solid dot at -1 and hollow circle at 5 on number line earns 1 mark.',
      'Trigonometry identity: Expanding left hand side (sin²A + 2 + cosec²A + cos²A + 2 + sec²A) earns 3 marks; using identities 1 + tan²A and 1 + cot²A yields 7 + tan²A + cot²A (2 marks).',
    ],
  },
  {
    id: 'math-2024-board',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    year: '2024',
    paperType: 'board',
    title: 'ICSE 2024 Mathematics Board Question Paper',
    duration: '2.5 hours',
    maxMarks: 80,
    isAvailable: true,
    verifiedSource: 'Council for the Indian School Certificate Examinations (CISCE)',
    hasMarkingScheme: true,
    notes: 'Official board paper tested step-by-step arithmetic progression, coordinate line equations, and ogive plotting.',
    instructions: [
      'Answers to this Paper must be written on the paper provided separately.',
      'You will not be allowed to write during the first 15 minutes. This time is to be spent in reading the question paper.',
      'The time given at the head of this Paper is the time allowed for writing the answers.',
      'Section A is compulsory. Attempt any four questions from Section B.',
    ],
    sections: [
      {
        name: 'SECTION A (40 Marks)',
        instruction: 'Attempt all questions from this Section.',
        questions: [
          {
            questionNumber: 'Question 1',
            marks: 15,
            instruction: 'Choose the correct answers from the given options:',
            subQuestions: [
              {
                subNumber: '(i)',
                text: 'The reflection of point P(-3, 5) in the y-axis followed by origin reflection gives:',
                marks: 1,
                options: ['(a) (-3, -5)', '(b) (3, -5)', '(c) (3, 5)', '(d) (-3, 5)'],
              },
              {
                subNumber: '(ii)',
                text: 'If x, 12, y, 27 are in continued proportion, then the positive values of x and y are:',
                marks: 1,
                options: ['(a) x = 8, y = 18', '(b) x = 6, y = 18', '(c) x = 8, y = 24', '(d) x = 9, y = 18'],
              },
            ],
          },
          {
            questionNumber: 'Question 2',
            marks: 12,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'Find the value of k for which the quadratic equation (k - 1)x² + 2(k - 1)x + 1 = 0 has real and equal roots.',
                marks: 4,
              },
              {
                subNumber: '(b)',
                text: 'A recurring deposit of ₹1,200 per month matures in 3 years with an interest of ₹5,580. Find the annual rate of interest.',
                marks: 4,
              },
              {
                subNumber: '(c)',
                text: 'In what ratio does the point P(2, -5) divide the line segment joining A(-3, 5) and B(4, -9)?',
                marks: 4,
              },
            ],
          },
        ],
      },
    ],
    markingSchemeSummary: [
      'Equal roots condition: Discriminant D = b² - 4ac = 0. Substituting values gives 4(k-1)² - 4(k-1) = 0. Roots are k = 1 or k = 2. Reject k = 1 since coefficient of x² cannot be zero.',
      'Section formula: Let ratio be k:1. Formula (4k - 3)/(k + 1) = 2. Solving yields k = 5/2. Required ratio is 5 : 2.',
    ],
  },

  // --- PHYSICS ---
  {
    id: 'phys-2025-specimen',
    subjectId: 'physics',
    subjectName: 'Physics',
    year: '2025 Specimen',
    paperType: 'specimen',
    title: 'ICSE 2025 Physics Specimen Question Paper',
    duration: '2 hours',
    maxMarks: 80,
    isAvailable: true,
    verifiedSource: 'Council for the Indian School Certificate Examinations (CISCE)',
    hasMarkingScheme: true,
    notes: 'Features revised 15 MCQs and structured questions on Light ray diagrams, Calorimetry, and Electricity.',
    instructions: [
      'Answers to this Paper must be written on the paper provided separately.',
      'You will not be allowed to write during the first 15 minutes. This time is to be spent in reading the question paper.',
      'Section A is compulsory. Attempt any four questions from Section B.',
      'All ray diagrams and circuits must be drawn in sharp pencil with directional arrows.',
    ],
    sections: [
      {
        name: 'SECTION A (40 Marks)',
        instruction: 'Attempt all questions from this Section.',
        questions: [
          {
            questionNumber: 'Question 1',
            marks: 15,
            instruction: 'Choose the correct answers from the given options:',
            subQuestions: [
              {
                subNumber: '(i)',
                text: 'The SI unit of moment of force is:',
                marks: 1,
                options: ['(a) N m', '(b) N/m', '(c) N m²', '(d) J s'],
              },
              {
                subNumber: '(ii)',
                text: 'A ray of light passes through the optical center of a thin concave lens. The ray after refraction:',
                marks: 1,
                options: ['(a) Emerges undeviated', '(b) Passes through focus', '(c) Becomes parallel to principal axis', '(d) Retraces its path'],
              },
              {
                subNumber: '(iii)',
                text: 'The mechanical advantage of an ideal single movable pulley is:',
                marks: 1,
                options: ['(a) 1', '(b) 2', '(c) Less than 1', '(d) Variable'],
              },
              {
                subNumber: '(iv)',
                text: 'The radiation having highest penetrating power among alpha, beta, and gamma is:',
                marks: 1,
                options: ['(a) Alpha', '(b) Beta', '(c) Gamma', '(d) Equal for all'],
              },
            ],
          },
          {
            questionNumber: 'Question 2',
            marks: 12,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'State the Principle of Moments. A uniform half-metre rule balances horizontally on a knife edge at 29 cm mark when a weight of 20 gf is suspended from one end. Find the weight of the half-metre rule.',
                marks: 4,
              },
              {
                subNumber: '(b)',
                text: 'Draw a neat labelled ray diagram to show the formation of an image by a convex lens when the object is placed between F and 2F. State two characteristics of the image.',
                marks: 4,
              },
              {
                subNumber: '(c)',
                text: 'Differentiate between forced vibrations and resonance on the basis of: (i) applied frequency, (ii) amplitude of vibration.',
                marks: 4,
              },
            ],
          },
        ],
      },
      {
        name: 'SECTION B (40 Marks)',
        instruction: 'Attempt any four questions from this Section.',
        questions: [
          {
            questionNumber: 'Question 4',
            marks: 10,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'Calculate the electrical energy consumed in units (kWh) in a month of 30 days by using two 60 W bulbs and one 1000 W heater for 5 hours daily.',
                marks: 3,
              },
              {
                subNumber: '(b)',
                text: 'A block and tackle system has 5 pulleys. If an effort of 150 N is required to raise a load of 600 N, find: (i) Mechanical Advantage, (ii) Velocity Ratio, (iii) Efficiency of the pulley system.',
                marks: 3,
              },
              {
                subNumber: '(c)',
                text: '50 g of ice at 0°C is added to 200 g of water at 30°C in a calorimeter of water equivalent 20 g. Calculate the final steady temperature of the mixture. (Specific heat capacity of water = 4.2 J/g°C, Specific latent heat of ice = 336 J/g).',
                marks: 4,
              },
            ],
          },
        ],
      },
    ],
    markingSchemeSummary: [
      'Moment of force: Principle states clockwise moments = anticlockwise moments. Center of gravity of half-metre rule is at 25 cm. Distance from fulcrum (29 cm) is 4 cm. Equation: W × 4 = 20 × (50 - 29). Weight W = 105 gf.',
      'Lens ray diagram: 1 mark for central ray through optical center; 1 mark for parallel ray through F; 1 mark for inverted, enlarged, real image beyond 2F; 1 mark for arrows on both incident and refracted rays.',
      'Calorimetry: Heat gained by ice to melt + heat gained by melted ice = Heat lost by water + calorimeter. Final temp T = 9.33°C.',
    ],
  },

  // --- CHEMISTRY ---
  {
    id: 'chem-2025-specimen',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    year: '2025 Specimen',
    paperType: 'specimen',
    title: 'ICSE 2025 Chemistry Specimen Question Paper',
    duration: '2 hours',
    maxMarks: 80,
    isAvailable: true,
    verifiedSource: 'Council for the Indian School Certificate Examinations (CISCE)',
    hasMarkingScheme: true,
    notes: 'Highlights: Analytical precipitate reactions with NaOH/NH4OH and Ostwald process balanced equations.',
    instructions: [
      'Answers to this Paper must be written on the paper provided separately.',
      'Section A is compulsory. Attempt any four questions from Section B.',
      'All chemical equations must be balanced with conditions stated.',
    ],
    sections: [
      {
        name: 'SECTION A (40 Marks)',
        instruction: 'Attempt all questions from this Section.',
        questions: [
          {
            questionNumber: 'Question 1',
            marks: 15,
            instruction: 'Choose the correct answers from the given options:',
            subQuestions: [
              {
                subNumber: '(i)',
                text: 'The element having highest electronegativity in the periodic table is:',
                marks: 1,
                options: ['(a) Fluorine', '(b) Chlorine', '(c) Oxygen', '(d) Francium'],
              },
              {
                subNumber: '(ii)',
                text: 'The gas evolved when dilute hydrochloric acid reacts with iron(II) sulphide is:',
                marks: 1,
                options: ['(a) Sulphur dioxide', '(b) Hydrogen sulphide', '(c) Hydrogen', '(d) Chlorine'],
              },
            ],
          },
          {
            questionNumber: 'Question 2',
            marks: 15,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'State what you observe when: (i) Excess ammonia gas is passed into copper sulphate solution, (ii) Concentrated nitric acid is poured over copper turnings.',
                marks: 4,
              },
              {
                subNumber: '(b)',
                text: 'Write balanced chemical equations for: (i) Haber process, (ii) Catalytic oxidation of ammonia, (iii) Laboratory preparation of nitric acid.',
                marks: 6,
              },
              {
                subNumber: '(c)',
                text: 'A compound of carbon, hydrogen, and oxygen contains 40% C and 6.67% H. If its vapor density is 30, determine its empirical and molecular formula. (C=12, H=1, O=16).',
                marks: 5,
              },
            ],
          },
        ],
      },
    ],
    markingSchemeSummary: [
      'Observation: (i) Pale blue precipitate dissolves to give deep inky blue solution. (ii) Dense reddish brown fumes of NO2 gas evolved, solution turns blue.',
      'Balanced equations: N2 + 3H2 ⇌ 2NH3 [Fe, Mo, 450-500°C, 200 atm]; 4NH3 + 5O2 → 4NO + 6H2O [Pt, 800°C].',
      'Empirical formula: % Oxygen = 100 - (40 + 6.67) = 53.33%. Simplest ratio C:H:O = 1:2:1. Empirical formula CH2O. Molecular weight = 2 × 30 = 60. Molecular formula C2H4O2 (CH3COOH).',
    ],
  },

  // --- BIOLOGY ---
  {
    id: 'bio-2025-specimen',
    subjectId: 'biology',
    subjectName: 'Biology',
    year: '2025 Specimen',
    paperType: 'specimen',
    title: 'ICSE 2025 Biology Specimen Question Paper',
    duration: '2 hours',
    maxMarks: 80,
    isAvailable: true,
    verifiedSource: 'Council for the Indian School Certificate Examinations (CISCE)',
    hasMarkingScheme: true,
    notes: 'Diagram evaluation criteria for kidney nephron, mitosis chromosome stages, and plant experiments.',
    instructions: [
      'Answers to this Paper must be written on the paper provided separately.',
      'Section A is compulsory. Attempt any four questions from Section B.',
      'All diagrams must be drawn in sharp pencil with neat horizontal labels.',
    ],
    sections: [
      {
        name: 'SECTION A (40 Marks)',
        instruction: 'Attempt all questions from this Section.',
        questions: [
          {
            questionNumber: 'Question 1',
            marks: 15,
            instruction: 'Choose the correct answers from the given options:',
            subQuestions: [
              {
                subNumber: '(i)',
                text: 'The stage of mitosis where chromosomes align along the equatorial plate is:',
                marks: 1,
                options: ['(a) Prophase', '(b) Metaphase', '(c) Anaphase', '(d) Telophase'],
              },
              {
                subNumber: '(ii)',
                text: 'The hormone that regulates the level of sugar in human blood is:',
                marks: 1,
                options: ['(a) Thyroxine', '(b) Adrenaline', '(c) Insulin', '(d) Growth Hormone'],
              },
            ],
          },
          {
            questionNumber: 'Question 2',
            marks: 15,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'State the exact location and one function of: (i) Bowman’s capsule, (ii) Islets of Langerhans, (iii) Thylakoids.',
                marks: 6,
              },
              {
                subNumber: '(b)',
                text: 'Explain the following biological terms: (i) Osmosis, (ii) Guttation, (iii) Tropic movement.',
                marks: 6,
              },
            ],
          },
        ],
      },
    ],
    markingSchemeSummary: [
      'Bowman\'s capsule location: Cortex of the kidney, surrounding the glomerulus. Function: Receives glomerular filtrate during ultrafiltration.',
      'Islets of Langerhans: Located in the pancreas. Function: Secretes insulin (beta cells) and glucagon (alpha cells) for glucose regulation.',
    ],
  },

  // --- ENGLISH LANGUAGE ---
  {
    id: 'eng1-2025-specimen',
    subjectId: 'english-language',
    subjectName: 'English Language',
    year: '2025 Specimen',
    paperType: 'specimen',
    title: 'ICSE 2025 English Language Specimen Paper & Rubric',
    duration: '2 hours',
    maxMarks: 80,
    isAvailable: true,
    verifiedSource: 'Council for the Indian School Certificate Examinations (CISCE)',
    hasMarkingScheme: true,
    notes: 'Prescribed formats for notice, email, transformation drills, and 50-word precis drafting.',
    instructions: [
      'Attempt all five questions.',
      'You will not be allowed to write during the first 15 minutes.',
      'Stick strictly to the 300–350 word limit in composition.',
    ],
    sections: [
      {
        name: 'COMPULSORY QUESTIONS (80 Marks)',
        instruction: 'All questions are compulsory.',
        questions: [
          {
            questionNumber: 'Question 1',
            instruction: 'Write a composition (300–350 words) on any one of the following topics: [20 Marks]',
            marks: 20,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'Narrate an experience where an unexpected act of kindness from a stranger changed your outlook on life.',
                marks: 20,
              },
              {
                subNumber: '(b)',
                text: 'Describe a bustling traditional market in your city early in the morning before regular commerce begins.',
                marks: 20,
              },
              {
                subNumber: '(c)',
                text: '"Artificial Intelligence will eliminate more jobs than it creates." Express your views either for or against the statement.',
                marks: 20,
              },
            ],
          },
          {
            questionNumber: 'Question 2',
            instruction: 'Select any one letter writing topic: [10 Marks]',
            marks: 10,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'Formal Letter: Write a letter to the Municipal Commissioner complaining about irregular garbage collection in your neighborhood, citing health hazards.',
                marks: 10,
              },
              {
                subNumber: '(b)',
                text: 'Informal Letter: Write a letter to your cousin sharing how you overcame procrastination and prepared for the upcoming pre-board examinations.',
                marks: 10,
              },
            ],
          },
          {
            questionNumber: 'Question 3',
            instruction: 'Notice and Email writing based on a school event: [5 + 5 = 10 Marks]',
            marks: 10,
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'Notice: Draft a notice for your school notice board inviting students of classes 9 and 10 to audition for the Annual Inter-School Shakespeare Play.',
                marks: 5,
              },
              {
                subNumber: '(b)',
                text: 'Email: Write an email to the Principal of a neighboring school requesting them to depute their Drama Teacher to act as an external judge for the auditions.',
                marks: 5,
              },
            ],
          },
        ],
      },
    ],
    markingSchemeSummary: [
      'Notice format rubric (5 Marks): Creative Title [1], Name of Event [1], Date, Time, Venue [2], Target Audience & Sign-off [1].',
      'Email rubric (5 Marks): To address [0.5], Subject [0.5], Salutation [0.5], Opening & Body [2], Subscription & Signature [1.5].',
      'Grammar transformations: Complete grammatical sentence without altering original meaning. Minor punctuation slips deducted.',
    ],
  },

  // --- COMPUTER APPLICATIONS ---
  {
    id: 'ca-2025-specimen',
    subjectId: 'computer-applications',
    subjectName: 'Computer Applications',
    year: '2025 Specimen',
    paperType: 'specimen',
    title: 'ICSE 2025 Computer Applications Specimen Paper',
    duration: '2 hours',
    maxMarks: 100,
    isAvailable: true,
    verifiedSource: 'Council for the Indian School Certificate Examinations (CISCE)',
    hasMarkingScheme: true,
    notes: 'Includes Java String methods questions, loop outputs, and 4 complete OOPs coding questions with variable description tables.',
    instructions: [
      'Answers to this Paper must be written on the paper provided separately.',
      'Section A (40 Marks) is compulsory.',
      'Section B (60 Marks): Attempt any four questions. All programs must include a Variable Description Table.',
    ],
    sections: [
      {
        name: 'SECTION A (40 Marks)',
        instruction: 'Compulsory: Theory, Snippets & Output tracing',
        questions: [
          {
            questionNumber: 'Question 1',
            marks: 20,
            instruction: '20 Multiple Choice Questions covering Java Fundamentals & OOPs:',
            subQuestions: [
              {
                subNumber: '(i)',
                text: 'The access specifier that allows member variables to be accessed only within the same class is:',
                marks: 1,
                options: ['(a) public', '(b) private', '(c) protected', '(d) default'],
              },
              {
                subNumber: '(ii)',
                text: 'What will be the output of Math.round(5.5) + Math.ceil(4.2)?',
                marks: 1,
                options: ['(a) 11.0', '(b) 11', '(c) 10.0', '(d) 10'],
              },
            ],
          },
        ],
      },
      {
        name: 'SECTION B (60 Marks)',
        instruction: 'Attempt any four programs. Each program carries 15 marks.',
        questions: [
          {
            questionNumber: 'Question 3',
            marks: 15,
            instruction: 'Define a class ElectricityBill with member variables, constructor, calculate() method based on tiered units, and display() method. Include Variable Description Table.',
            subQuestions: [
              {
                subNumber: '(a)',
                text: 'Complete Java Class definition following BlueJ conventions with proper variable table.',
                marks: 15,
              },
            ],
          },
        ],
      },
    ],
    markingSchemeSummary: [
      'Variable Description Table: 2 marks allocated exclusively for table (Name, Data Type, Purpose).',
      'Class definition & attributes: 3 marks; constructor: 2 marks; conditional calculation: 5 marks; print method: 3 marks.',
    ],
  },
];
