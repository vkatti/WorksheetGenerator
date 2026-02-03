                      // Problem Generators for SmartWorksheet

// Helper: Generate random number with specific digit count
function randomWithDigits(digitCount) {
    if (digitCount === 1) return Math.floor(Math.random() * 9) + 1;
    const min = Math.pow(10, digitCount - 1);
    const max = Math.pow(10, digitCount) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Addition Problem Generator
export function generateAddition(config) {
    const { addendDigits = 2, subtrahendDigits = 2 } = config;
    const a = randomWithDigits(addendDigits);
    const b = randomWithDigits(addendDigits);
    return {
        type: 'addition',
        question: `${a} + ${b} = ____`,
        answer: a + b
    };
}

// Subtraction Problem Generator
export function generateSubtraction(config) {
    const { subtrahendDigits = 2 } = config;
    let a = randomWithDigits(subtrahendDigits);
    let b = randomWithDigits(subtrahendDigits);

    // Ensure a >= b for positive results
    if (a < b) [a, b] = [b, a];

    return {
        type: 'subtraction',
        question: `${a} - ${b} = ____`,
        answer: a - b
    };
}

// Multiplication Problem Generator
export function generateMultiplication(config) {
    const { multiplicandDigits = 2, multiplierDigits = 1 } = config;
    const a = randomWithDigits(multiplicandDigits);
    const b = randomWithDigits(multiplierDigits);
    return {
        type: 'multiplication',
        question: `${a} × ${b} = ____`,
        answer: a * b
    };
}

// Division Problem Generator
export function generateDivision(config) {
    const { divisorDigits = 1 } = config;
    const divisor = randomWithDigits(divisorDigits);
    const quotient = Math.floor(Math.random() * 20) + 1; // Keep quotient reasonable
    const dividend = divisor * quotient;

    return {
        type: 'division',
        question: `${dividend} ÷ ${divisor} = ____`,
        answer: quotient
    };
}

// Word Problem Templates
const wordTemplates = [
    // Addition templates
    {
        type: 'addition',
        template: (a, b) => `Sarah has ${a} apples. She buys ${b} more apples. How many apples does she have now?`,
        operation: (a, b) => a + b
    },
    {
        type: 'addition',
        template: (a, b) => `There are ${a} birds on a tree. ${b} more birds join them. How many birds are there in total?`,
        operation: (a, b) => a + b
    },
    {
        type: 'addition',
        template: (a, b) => `Mike reads ${a} pages on Monday and ${b} pages on Tuesday. How many pages did he read altogether?`,
        operation: (a, b) => a + b
    },

    // Subtraction templates
    {
        type: 'subtraction',
        template: (a, b) => `Emma has ${a} candies. She gives ${b} candies to her friend. How many candies does she have left?`,
        operation: (a, b) => a - b
    },
    {
        type: 'subtraction',
        template: (a, b) => `A basket has ${a} oranges. ${b} oranges are eaten. How many oranges are left in the basket?`,
        operation: (a, b) => a - b
    },
    {
        type: 'subtraction',
        template: (a, b) => `Tom had ${a} stickers. He used ${b} stickers to decorate his notebook. How many stickers does he have now?`,
        operation: (a, b) => a - b
    },

    // Multiplication templates
    {
        type: 'multiplication',
        template: (a, b) => `Each box contains ${a} pencils. If you have ${b} boxes, how many pencils do you have in total?`,
        operation: (a, b) => a * b
    },
    {
        type: 'multiplication',
        template: (a, b) => `A chocolate bar costs $${a}. How much do ${b} chocolate bars cost?`,
        operation: (a, b) => a * b
    },
    {
        type: 'multiplication',
        template: (a, b) => `There are ${a} rows of chairs. Each row has ${b} chairs. How many chairs are there altogether?`,
        operation: (a, b) => a * b
    },

    // Division templates
    {
        type: 'division',
        template: (a, b) => `${a} cookies are shared equally among ${b} children. How many cookies does each child get?`,
        operation: (a, b) => Math.floor(a / b)
    },
    {
        type: 'division',
        template: (a, b) => `A teacher has ${a} books to distribute equally to ${b} students. How many books does each student receive?`,
        operation: (a, b) => Math.floor(a / b)
    },
    {
        type: 'division',
        template: (a, b) => `${a} flowers are arranged into ${b} equal bouquets. How many flowers are in each bouquet?`,
        operation: (a, b) => Math.floor(a / b)
    }
];

// Word Logic Problem Generator
export function generateWordProblem(config) {
    const { logicComplexity = 'medium', problemType = 'addition' } = config;

    // Filter templates by problem type
    const templates = wordTemplates.filter(t => t.type === problemType);
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Generate numbers based on complexity
    let a, b;
    if (logicComplexity === 'easy') {
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
    } else if (logicComplexity === 'medium') {
        a = Math.floor(Math.random() * 50) + 1;
        b = Math.floor(Math.random() * 50) + 1;
    } else { // hard
        a = Math.floor(Math.random() * 100) + 1;
        b = Math.floor(Math.random() * 100) + 1;
    }

    // For subtraction, ensure a >= b
    if (problemType === 'subtraction' && a < b) [a, b] = [b, a];

    // For division, ensure clean division
    if (problemType === 'division') {
        b = Math.floor(Math.random() * 10) + 2;
        const quotient = Math.floor(Math.random() * 20) + 1;
        a = b * quotient;
    }

    const question = template.template(a, b);
    const answer = template.operation(a, b);

    return {
        type: 'word-problem',
        question,
        answer
    };
}

// Main Generator Function
export function generateProblems(config) {
    const { problemTypes, questionCount, gradeLevel } = config;
    const problems = [];

    for (let i = 0; i < questionCount; i++) {
        // Pick a random problem type from selected types
        const type = problemTypes[Math.floor(Math.random() * problemTypes.length)];

        let problem;
        switch (type) {
            case 'addition':
                problem = generateAddition(config);
                break;
            case 'subtraction':
                problem = generateSubtraction(config);
                break;
            case 'multiplication':
                problem = generateMultiplication(config);
                break;
            case 'division':
                problem = generateDivision(config);
                break;
            case 'word-logic':
                // For word problems, pick a random operation type
                const wordType = ['addition', 'subtraction', 'multiplication', 'division'][
                    Math.floor(Math.random() * 4)
                ];
                problem = generateWordProblem({ ...config, problemType: wordType });
                break;
            default:
                problem = generateAddition(config);
        }

        problems.push({ ...problem, number: i + 1 });
    }

    return problems;
}
