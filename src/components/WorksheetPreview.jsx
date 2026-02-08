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

    // Separate regular problems and word problems
    const regularProblems = problems.filter(p => !p.isWordProblem);
    const wordProblems = problems.filter(p => p.isWordProblem);

    // Smart pagination: fit as many problems as possible per page
    // Math problems in 2 columns can fit ~40 per page, word problems ~10 per page
    const pages = [];

    if (regularProblems.length > 0 && wordProblems.length > 0) {
        // If we have both types, try to fit all regular problems on page 1
        // and word problems starting on page 1 if there's space, or page 2
        const mathProblemsPerPage = 30; // 2 columns, with increased padding
        const wordProblemsPerPage = 10; // Single column, needs more space

        if (regularProblems.length <= 14) {
            // All math problems fit on page 1 with word problems
            pages.push([...regularProblems, ...wordProblems.slice(0, Math.max(0, wordProblemsPerPage - Math.ceil(regularProblems.length / 2)))]);
            // Remaining word problems on next pages
            for (let i = Math.max(0, wordProblemsPerPage - Math.ceil(regularProblems.length / 2)); i < wordProblems.length; i += wordProblemsPerPage) {
                pages.push(wordProblems.slice(i, i + wordProblemsPerPage));
            }
        } else {
            // More than 14 math problems - word problems must start on next page
            // Paginate math problems first
            for (let i = 0; i < regularProblems.length; i += mathProblemsPerPage) {
                pages.push(regularProblems.slice(i, i + mathProblemsPerPage));
            }
            // Then paginate word problems
            for (let i = 0; i < wordProblems.length; i += wordProblemsPerPage) {
                pages.push(wordProblems.slice(i, i + wordProblemsPerPage));
            }
        }
    } else if (regularProblems.length > 0) {
        // Only math problems - fit 30 per page in 2 columns
        const mathProblemsPerPage = 30;
        for (let i = 0; i < regularProblems.length; i += mathProblemsPerPage) {
            pages.push(regularProblems.slice(i, i + mathProblemsPerPage));
        }
    } else {
        // Only word problems - fit 10 per page
        const wordProblemsPerPage = 10;
        for (let i = 0; i < wordProblems.length; i += wordProblemsPerPage) {
            pages.push(wordProblems.slice(i, i + wordProblemsPerPage));
        }
    }

    return (
        <div className="worksheet-preview" id="worksheet-content">
            {/* Questions Pages */}
            {pages.map((pageProblems, pageIndex) => (
                <div key={`page-${pageIndex}`} className="worksheet-page questions-page">
                    {pageIndex === 0 ? (
                        // First page: Full header with title, name, and date
                        <div className="worksheet-header">
                            <h1>{config.worksheetTitle || 'Worksheet'}</h1>
                            <div className="worksheet-meta-line">
                                <span className="name-field">Name: _______________________________</span>
                                <span className="date-field">{date}</span>
                            </div>
                        </div>
                    ) : (
                        // Subsequent pages: Only page number and date
                        <div className="worksheet-header continuation-header">
                            <div className="worksheet-meta continuation-meta">
                                <span className="page-number">Page {pageIndex + 1} of {pages.length}</span>
                                <span className="page-date">{date}</span>
                            </div>
                        </div>
                    )}

                    <div className="worksheet-content">
                        {/* Regular Problems Section */}
                        {pageProblems.some(p => !p.isWordProblem) && (
                            <>
                                {pageIndex === 0 && wordProblems.length > 0 && (
                                    <h3 className="section-title">Section A: Number Problems</h3>
                                )}
                                <div className="problems-grid math-problems-grid">
                                    {pageProblems.filter(p => !p.isWordProblem).map((problem, index) => (
                                        <div key={index} className="problem-item">
                                            <span className="problem-number">{problem.number}.</span>
                                            <div className="problem-content">
                                                <p className="math-problem">{problem.question}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Word Problems Section */}
                        {pageProblems.some(p => p.isWordProblem) && (
                            <>
                                <h3 className="section-title">Section B: Word Problems</h3>
                                <div className="problems-grid word-problems-grid">
                                    {pageProblems.filter(p => p.isWordProblem).map((problem, index) => (
                                        <div key={index} className="problem-item">
                                            <span className="problem-number">{problem.number}.</span>
                                            <div className="problem-content">
                                                <p className="word-problem">{problem.question}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="worksheet-footer">
                        <p>generated by SmartWorksheetGenerator.com</p>
                    </div>
                </div>
            ))}

            {/* Answer Key Page */}
            {config.includeAnswerKey && (
                <div className="worksheet-page answer-page">
                    <div className="answer-header">
                        <h2>Answer Key</h2>
                        <div className="answer-meta">
                            <span>{problems.length} Questions</span>
                        </div>
                    </div>

                    {/* Math Problems Answers */}
                    {regularProblems.length > 0 && (
                        <>
                            {wordProblems.length > 0 && (
                                <h3 className="section-title">Section A: Number Problems</h3>
                            )}
                            <div className="answers-grid">
                                {regularProblems.map((problem, index) => (
                                    <div key={index} className="answer-item">
                                        <span className="answer-number">{problem.number}.</span>
                                        <span className="answer-value">{problem.answer}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Word Problems Answers */}
                    {wordProblems.length > 0 && (
                        <>
                            <h3 className="section-title">Section B: Word Problems</h3>
                            <div className="answers-grid">
                                {wordProblems.map((problem, index) => (
                                    <div key={index} className="answer-item">
                                        <span className="answer-number">{problem.number}.</span>
                                        <span className="answer-value">{problem.answer}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="worksheet-footer">
                        <p>generated by SmartWorksheetGenerator.com</p>
                    </div>
                </div>
            )}
        </div>
    );
}
