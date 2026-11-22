// Shared layout helpers for the two worksheet styles (HTML preview + Typst PDF).

export const STYLE_PRACTICE = 'practice';
export const STYLE_PAPER = 'paper';

export const DEFAULT_PAPER_INSTRUCTIONS =
    'Answer all questions.\nShow all your working on a separate sheet.';

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

const isHardType = (p) => p.type === 'multiplication' || p.type === 'division';

// Practice Sheet order: add/subtract, then all multiplication, then all division
// (the last two need more vertical room).
export function sortPracticeProblems(problems) {
    const of = (fn) => problems.filter(fn);
    return [
        ...of((p) => !isHardType(p)),
        ...of((p) => p.type === 'multiplication'),
        ...of((p) => p.type === 'division'),
    ];
}

// Wider numbers -> fewer, wider cells per row.
function columnsFor(items) {
    const widest = items.reduce((m, p) => Math.max(m, widthUnits(p)), 0);
    if (widest <= 4) return 5;
    if (widest <= 6) return 4;
    if (widest <= 8) return 3;
    return 2;
}

// Cell height (mm). More digits -> more room to carry / borrow; multi-digit multipliers
// need partial-product rows; division needs room for the working under the bracket.
function cellHeightFor(items) {
    return items.reduce((h, p) => {
        const [a, b] = p.operands;
        const digits = Math.max(String(a).length, String(b).length);
        if (p.type === 'division') return Math.max(h, 44 + Math.max(0, String(a).length - 3) * 4);
        if (p.type === 'multiplication') {
            const partials = String(b).length > 1 ? (String(b).length + 1) * 9 : 0;
            return Math.max(h, 36 + partials);
        }
        return Math.max(h, 30 + Math.max(0, digits - 2) * 4);
    }, 30);
}

// Practice Sheet grids: [{ items, columns, cellHeightMm, topAlign }]; each group is its own grid.
// Multiplication and division cells are top-aligned so students work downwards.
export function practiceGroups(math) {
    const ok = math.filter((p) => p.operands);
    return [
        { items: ok.filter((p) => !isHardType(p)), topAlign: false },
        { items: ok.filter((p) => p.type === 'multiplication'), topAlign: true },
        { items: ok.filter((p) => p.type === 'division'), topAlign: true },
    ]
        .filter((g) => g.items.length > 0)
        .map((g) => ({ ...g, columns: columnsFor(g.items), cellHeightMm: cellHeightFor(g.items) }));
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

// Answer key: answers run down the page in columns of at most 25 (and, when there are
// enough answers, at least 5). Items are split as evenly as possible across columns.
export const ANSWER_COLUMN_MAX = 25;
export const ANSWER_COLUMN_MIN = 5;

export function answerColumns(items) {
    if (items.length === 0) return [];
    const cols = Math.ceil(items.length / ANSWER_COLUMN_MAX);
    const per = Math.ceil(items.length / cols);
    const out = [];
    for (let i = 0; i < items.length; i += per) out.push(items.slice(i, i + per));
    // A short trailing column (< min) is merged back into the previous one if it still fits.
    const last = out[out.length - 1];
    if (out.length > 1 && last.length < ANSWER_COLUMN_MIN && out[out.length - 2].length + last.length <= ANSWER_COLUMN_MAX) {
        out.splice(out.length - 2, 2, [...out[out.length - 2], ...last]);
    }
    return out;
}
