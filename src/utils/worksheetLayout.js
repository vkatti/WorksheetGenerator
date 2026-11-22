// Shared layout helpers for the two worksheet styles (HTML preview + Typst PDF).

export const STYLE_PRACTICE = 'practice';
export const STYLE_PAPER = 'paper';

export const DEFAULT_PAPER_INSTRUCTIONS =
    'Answer all questions.\nShow all your working on the separate working sheet.';

export const OPERATOR_SYMBOL = {
    addition: '+',
    subtraction: '−',
    multiplication: '×',
    division: '÷',
};

// Question text without the "= ____" blank, for the Question Paper style
// (students write their answers on a separate sheet).
export function paperQuestion(p) {
    if (p.isWordProblem || !p.operands) return p.question;
    const [a, b] = p.operands;
    return `${a} ${OPERATOR_SYMBOL[p.type]} ${b} =`;
}

// Rough width of a stacked problem, in digit-widths. Used to pick the column count.
function widthUnits(p) {
    const [a, b] = p.operands;
    if (p.type === 'division') return String(a).length + String(b).length + 2;
    return Math.max(String(a).length, String(b).length) + 2;
}

// Practice Sheet: wider numbers -> fewer, wider cells per row.
export function practiceColumns(problems) {
    const math = problems.filter((p) => !p.isWordProblem && p.operands);
    const widest = math.reduce((m, p) => Math.max(m, widthUnits(p)), 0);
    if (widest <= 4) return 5;
    if (widest <= 6) return 4;
    if (widest <= 8) return 3;
    return 2;
}

// Practice Sheet: more digits -> more room to carry / borrow.
export function practiceCellHeightMm(problems) {
    const math = problems.filter((p) => !p.isWordProblem && p.operands);
    const maxDigits = math.reduce(
        (m, p) => Math.max(m, ...p.operands.map((n) => String(n).length)),
        1
    );
    return 30 + Math.max(0, maxDigits - 2) * 4;
}

export function sectionMarks(problems, config) {
    const math = problems.filter((p) => !p.isWordProblem).length;
    const words = problems.filter((p) => p.isWordProblem).length;
    const marksA = Number(config.marksNumber) || 0;
    const marksB = Number(config.marksWord) || 0;
    return {
        mathCount: math,
        wordCount: words,
        marksA,
        marksB,
        totalA: math * marksA,
        totalB: words * marksB,
        total: math * marksA + words * marksB,
    };
}

export const instructionLines = (config) =>
    String(config.paperInstructions ?? '')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

// One working-sheet page per ~15 questions.
export const workingSheetPageCount = (problems) => Math.max(1, Math.ceil(problems.length / 15));
