import { jsPDF } from 'jspdf';
import type { QuestionPaper } from '../types/index.ts';

/**
 * Generates and downloads an authentic, beautifully styled ICSE Class 10 Question Paper PDF.
 */
export function downloadPaperPdf(paper: QuestionPaper): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin;
      drawHeader();
    }
  };

  const drawHeader = () => {
    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('ICSE CLASS 10 EXAMINATION — COUNCIL FOR THE INDIAN SCHOOL CERTIFICATE EXAMINATIONS', pageWidth / 2, 10, {
      align: 'center',
    });
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  // --- Title Page Header ---
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 33, 61);
  doc.text('COUNCIL FOR THE INDIAN SCHOOL CERTIFICATE EXAMINATIONS, NEW DELHI', pageWidth / 2, y, {
    align: 'center',
  });
  y += 6;

  doc.setFontSize(10);
  doc.text('INDIAN CERTIFICATE OF SECONDARY EDUCATION (ICSE) CLASS 10', pageWidth / 2, y, {
    align: 'center',
  });
  y += 7;

  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(paper.title.toUpperCase(), pageWidth / 2, y, {
    align: 'center',
  });
  y += 7;

  // Metadata box
  doc.setFontSize(9.5);
  doc.setFont('times', 'bold');
  doc.text(`Maximum Marks: ${paper.maxMarks}`, margin, y);
  doc.text(`Time Allowed: ${paper.duration}`, pageWidth - margin, y, { align: 'right' });
  y += 4;
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- Exam Instructions ---
  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);

  const defaultInstructions = paper.instructions || [
    'Answers to this Paper must be written on the paper provided separately.',
    'You will not be allowed to write during the first 15 minutes. This time is to be spent in reading the question paper.',
    'The time given at the head of this Paper is the time allowed for writing the answers.',
    'Section A is compulsory. Attempt any four questions from Section B.',
    'The intended marks for questions or parts of questions are given in brackets [ ].',
  ];

  defaultInstructions.forEach((inst) => {
    checkPageBreak(5);
    const splitInst = doc.splitTextToSize(`• ${inst}`, contentWidth);
    doc.text(splitInst, margin, y);
    y += splitInst.length * 4;
  });

  y += 2;
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- Sections & Questions ---
  if (paper.sections && paper.sections.length > 0) {
    paper.sections.forEach((section) => {
      checkPageBreak(12);

      // Section Banner
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(20, 33, 61);
      doc.text(section.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
      y += 5;

      doc.setFont('times', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      doc.text(`(${section.instruction})`, pageWidth / 2, y, { align: 'center' });
      y += 6;

      section.questions.forEach((q) => {
        checkPageBreak(10);

        doc.setFont('times', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(`${q.questionNumber}`, margin, y);
        if (q.marks) {
          doc.text(`[${q.marks}]`, pageWidth - margin, y, { align: 'right' });
        }
        y += 4.5;

        if (q.instruction) {
          doc.setFont('times', 'normal');
          doc.setFontSize(9);
          const splitQInst = doc.splitTextToSize(q.instruction, contentWidth);
          doc.text(splitQInst, margin, y);
          y += splitQInst.length * 4;
        }

        if (q.subQuestions && q.subQuestions.length > 0) {
          q.subQuestions.forEach((sub) => {
            checkPageBreak(8);
            doc.setFont('times', 'normal');
            doc.setFontSize(9);

            const prefix = `${sub.subNumber} `;
            const marksStr = ` [${sub.marks}]`;
            const textWidth = contentWidth - 18;
            const splitSub = doc.splitTextToSize(prefix + sub.text, textWidth);

            doc.text(splitSub, margin + 4, y);
            doc.setFont('times', 'bold');
            doc.text(marksStr, pageWidth - margin, y, { align: 'right' });
            y += splitSub.length * 4;

            // Options if MCQ
            if (sub.options && sub.options.length > 0) {
              sub.options.forEach((opt) => {
                checkPageBreak(4);
                doc.setFont('times', 'normal');
                doc.text(opt, margin + 8, y);
                y += 3.8;
              });
            }

            y += 1.5;
          });
        }

        y += 3;
      });

      y += 4;
    });
  } else {
    // Fallback outline if full structured sub-questions not populated
    checkPageBreak(25);
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 33, 61);
    doc.text('SECTION A (40 MARKS)', pageWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.text('(Attempt all questions from this Section)', pageWidth / 2, y, { align: 'center' });
    y += 7;

    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    const outlineText = [
      'Question 1: 15 Multiple Choice Questions testing key conceptual foundations [15]',
      'Question 2: Short structured problem-solving, definitions, and reasoning questions [15]',
      'Question 3: Diagram and data analysis / short numerical calculations [10]',
    ];
    outlineText.forEach((item) => {
      checkPageBreak(6);
      doc.text(item, margin, y);
      y += 6;
    });

    y += 4;
    checkPageBreak(25);
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('SECTION B (40 MARKS)', pageWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.text('(Attempt any four questions from this Section)', pageWidth / 2, y, { align: 'center' });
    y += 7;

    const bText = [
      'Question 4: Comprehensive structured problem set [10]',
      'Question 5: Theoretical reasoning and application-based calculation [10]',
      'Question 6: Multi-part analytical problem with step-marking criteria [10]',
      'Question 7: Diagrammatic/Graph plotting and comparative analysis [10]',
      'Question 8: Comprehensive curriculum review problem set [10]',
      'Question 9: Practical and experimental evaluation questions [10]',
    ];
    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    bText.forEach((item) => {
      checkPageBreak(6);
      doc.text(item, margin, y);
      y += 6;
    });
  }

  // --- Marking Scheme Summary ---
  if (paper.markingSchemeSummary && paper.markingSchemeSummary.length > 0) {
    checkPageBreak(20);
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 33, 61);
    doc.text('OFFICIAL CISCE EVALUATION & MARKING SCHEME GUIDELINES', pageWidth / 2, y, { align: 'center' });
    y += 6;

    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(50, 50, 50);
    paper.markingSchemeSummary.forEach((note) => {
      checkPageBreak(5);
      const splitNote = doc.splitTextToSize(`✓ ${note}`, contentWidth);
      doc.text(splitNote, margin, y);
      y += splitNote.length * 4;
    });
  }

  // Add Page Numbers in footer
  const pageCount = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
    doc.text('ICSE Class 10 Study Companion · Verified Resource', pageWidth - margin, pageHeight - 8, {
      align: 'right',
    });
  }

  const safeFilename = `${paper.subjectName.replace(/\s+/g, '_')}_${String(paper.year).replace(/\s+/g, '_')}_ICSE.pdf`;
  doc.save(safeFilename);
}
