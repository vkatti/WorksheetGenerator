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

        if (regularProblems.length <= 10) {
            // All math problems fit on page 1 with word problems (conservative estimate)
            const wordProblemsOnFirstPage = Math.min(Math.max(0, 10 - Math.ceil(regularProblems.length / 2)), wordProblems.length);
            pages.push([...regularProblems, ...wordProblems.slice(0, wordProblemsOnFirstPage)]);
            // Remaining word problems on next pages
            for (let i = wordProblemsOnFirstPage; i < wordProblems.length; i += wordProblemsPerPage) {
                pages.push(wordProblems.slice(i, i + wordProblemsPerPage));
            }
        } else {
            // More than 10 math problems - word problems must start on next page
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

    // Paginate the Answer Key the same way the question pages are paginated,
    // so a large question count can never get clipped off a single sheet.
    const ANSWERS_PER_PAGE = 60;
    const allAnswerItems = [...regularProblems, ...wordProblems];
    const answerChunks = [];
    for (let i = 0; i < allAnswerItems.length; i += ANSWERS_PER_PAGE) {
        answerChunks.push(allAnswerItems.slice(i, i + ANSWERS_PER_PAGE));
    }
    if (answerChunks.length === 0) {
        answerChunks.push([]);
    }

    let sectionAShown = false;
    let sectionBShown = false;
    const answerPagesData = answerChunks.map((chunkItems) => {
        const chunkRegular = chunkItems.filter(p => !p.isWordProblem);
        const chunkWord = chunkItems.filter(p => p.isWordProblem);
        const showSectionA = chunkRegular.length > 0 && !sectionAShown;
        const showSectionB = chunkWord.length > 0 && !sectionBShown;
        if (showSectionA) sectionAShown = true;
        if (showSectionB) sectionBShown = true;
        return { chunkRegular, chunkWord, showSectionA, showSectionB };
    });

    return (
        <div className="worksheet-preview" id="worksheet-content">
            {/* Questions Pages */}
            {pages.map((pageProblems, pageIndex) => (
                <div key={`page-${pageIndex}`} className="worksheet-page questions-page">
                    {pageIndex === 0 ? (
                        // First page: Full header with title, name, class, and date fill-ins
                        <div className="worksheet-header">
                            <h1>{config.worksheetTitle || 'Worksheet'}</h1>
                            <div className="worksheet-meta-line">
                                <span className="meta-field meta-field-name">
                                    <span className="meta-label">Name:</span>
                                    <span className="meta-blank"></span>
                                </span>
                                <span className="meta-field meta-field-class">
                                    <span className="meta-label">Class:</span>
                                    <span className="meta-blank"></span>
                                </span>
                                <span className="meta-field meta-field-date">
                                    <span className="meta-label">Date:</span>
                                    <span className="meta-blank"></span>
                                </span>
                            </div>
                        </div>
                    ) : null}

                    <div className="worksheet-content">
                        {/* Regular Problems Section */}
                        {pageProblems.some(p => !p.isWordProblem) && (
                            <>
                                {pageIndex === 0 && wordProblems.length > 0 && (
                                    <h3 className="section-title">Section A: Number Problems</h3>
                                )}
                                <div 
                                    className="problems-grid math-problems-grid"
                                    style={{
                                        gridTemplateRows: `repeat(${Math.ceil(pageProblems.filter(p => !p.isWordProblem).length / 2)}, auto)`
                                    }}
                                >
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
                                <h3 className="section-title">
                                    {regularProblems.length > 0 ? 'Section B: Word Problems' : 'Word Problems'}
                                </h3>
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
                        <span className="footer-page-info">Page {pageIndex + 1} of {pages.length}</span>
                        <span className="footer-brand">Generated by WorksheetLoom.com</span>
                    </div>
                </div>
            ))}

            {/* Answer Key Pages */}
            {config.includeAnswerKey && answerPagesData.map((pageData, pageIndex) => (
                <div key={`answer-page-${pageIndex}`} className="worksheet-page answer-page">
                    <div className="answer-header">
                        <h2>Answer Key</h2>
                        {pageIndex === 0 && (
                            <div className="answer-meta">
                                <span>{problems.length} Questions</span>
                            </div>
                        )}
                    </div>

                    {/* Math Problems Answers */}
                    {pageData.chunkRegular.length > 0 && (
                        <>
                            {pageData.showSectionA && wordProblems.length > 0 && (
                                <h3 className="section-title">Section A: Number Problems</h3>
                            )}
                            <div className="answers-grid">
                                {pageData.chunkRegular.map((problem, index) => (
                                    <div key={index} className="answer-item">
                                        <span className="answer-number">{problem.number}.</span>
                                        <span className="answer-value">{problem.answer}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Word Problems Answers */}
                    {pageData.chunkWord.length > 0 && (
                        <>
                            {pageData.showSectionB && (
                                <h3 className="section-title">
                                    {regularProblems.length > 0 ? 'Section B: Word Problems' : 'Word Problems'}
                                </h3>
                            )}
                            <div className="answers-grid">
                                {pageData.chunkWord.map((problem, index) => (
                                    <div key={index} className="answer-item">
                                        <span className="answer-number">{problem.number}.</span>
                                        <span className="answer-value">{problem.answer}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="worksheet-footer">
                        <span className="footer-page-info">Page {pageIndex + 1} of {answerPagesData.length}</span>
                        <span className="footer-brand">Generated by WorksheetLoom.com</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
