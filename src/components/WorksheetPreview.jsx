import './WorksheetPreview.css';

export default function WorksheetPreview({ problems, config }) {
    if (!problems || problems.length === 0) {
        return (
            <div className="worksheet-preview empty">
                <div className="empty-state">
                    <p>👈 Configure your worksheet and click "Generate Worksheet" to preview</p>
                </div>
            </div>
        );
    }

    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Estimate problems per page based on problem types
    // Word problems take more space than math problems
    const estimateProblemsPerPage = () => {
        const hasWordProblems = problems.some(p => p.type === 'word-problem');
        const wordProblemCount = problems.filter(p => p.type === 'word-problem').length;
        const mathProblemCount = problems.length - wordProblemCount;

        // Rough estimates: word problems ~50mm each, math problems ~35mm each
        // Available space after header: ~220mm
        // Conservative estimate: 10 problems per page for mixed, 12 for math-only
        if (hasWordProblems) {
            return Math.min(10, problems.length);
        }
        return Math.min(12, problems.length);
    };

    // Split problems into pages
    const problemsPerPage = estimateProblemsPerPage();
    const pageCount = Math.ceil(problems.length / problemsPerPage);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        const startIdx = i * problemsPerPage;
        const endIdx = Math.min(startIdx + problemsPerPage, problems.length);
        pages.push(problems.slice(startIdx, endIdx));
    }

    return (
        <div className="worksheet-preview" id="worksheet-content">
            {/* Questions Pages */}
            {pages.map((pageProblems, pageIndex) => (
                <div key={`page-${pageIndex}`} className="worksheet-page questions-page">
                    {pageIndex === 0 ? (
                        // First page: Full header with title, grade, date, and student name
                        <div className="worksheet-header">
                            <h1>Math Worksheet</h1>
                            <div className="worksheet-meta">
                                <span>Grade {config.gradeLevel}</span>
                                <span>•</span>
                                <span>{date}</span>
                            </div>
                            <div className="student-info">
                                <label>Name: _______________________________</label>
                            </div>
                        </div>
                    ) : (
                        // Subsequent pages: Only page number and date
                        <div className="worksheet-header continuation-header">
                            <div className="worksheet-meta">
                                <span>Page {pageIndex + 1} of {pageCount}</span>
                                <span>•</span>
                                <span>{date}</span>
                            </div>
                        </div>
                    )}

                    <div className="problems-grid">
                        {pageProblems.map((problem, index) => (
                            <div key={index} className="problem-item">
                                <span className="problem-number">{problem.number}.</span>
                                <div className="problem-content">
                                    {problem.type === 'word-problem' ? (
                                        <p className="word-problem">{problem.question}</p>
                                    ) : (
                                        <p className="math-problem">{problem.question}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Answer Key Page */}
            {config.includeAnswerKey && (
                <div className="worksheet-page answer-page">
                    <div className="answer-header">
                        <h2>Answer Key</h2>
                        <div className="answer-meta">
                            <span>Grade {config.gradeLevel}</span>
                            <span>•</span>
                            <span>{problems.length} Questions</span>
                        </div>
                    </div>

                    <div className="answers-grid">
                        {problems.map((problem, index) => (
                            <div key={index} className="answer-item">
                                <span className="answer-number">{problem.number}.</span>
                                <span className="answer-value">{problem.answer}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
