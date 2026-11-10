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

    // The preview is one continuous sheet; the downloaded PDF (Typst) does the
    // real pagination. Only the Answer Key is a separate sheet.
    const answerSections = [
        { items: regularProblems, title: wordProblems.length > 0 ? 'Section A: Number Problems' : null },
        { items: wordProblems, title: regularProblems.length > 0 ? 'Section B: Word Problems' : 'Word Problems' }
    ].filter(sec => sec.items.length > 0);

    return (
        <div className="worksheet-preview" id="worksheet-content">
            {/* Questions */}
            <div className="worksheet-page questions-page">
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

                <div className="worksheet-content">
                    {regularProblems.length > 0 && (
                        <>
                            {wordProblems.length > 0 && (
                                <h3 className="section-title">Section A: Number Problems</h3>
                            )}
                            <div
                                className="problems-grid math-problems-grid"
                                style={{ gridTemplateRows: `repeat(${Math.ceil(regularProblems.length / 2)}, auto)` }}
                            >
                                {regularProblems.map((problem) => (
                                    <div key={problem.number} className="problem-item">
                                        <span className="problem-number">{problem.number}.</span>
                                        <div className="problem-content">
                                            <p className="math-problem">{problem.question}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {wordProblems.length > 0 && (
                        <>
                            <h3 className="section-title">
                                {regularProblems.length > 0 ? 'Section B: Word Problems' : 'Word Problems'}
                            </h3>
                            <div className="problems-grid word-problems-grid">
                                {wordProblems.map((problem) => (
                                    <div key={problem.number} className="problem-item">
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
            </div>

            {/* Answer Key */}
            {config.includeAnswerKey && (
                <div className="worksheet-page answer-page">
                    <div className="answer-header">
                        <h2>Answer Key</h2>
                        <div className="answer-meta">
                            <span>{problems.length} Questions</span>
                        </div>
                    </div>
                    {answerSections.map((sec) => (
                        <div key={sec.title || 'math'}>
                            {sec.title && <h3 className="section-title">{sec.title}</h3>}
                            <div className="answers-grid">
                                {sec.items.map((problem) => (
                                    <div key={problem.number} className="answer-item">
                                        <span className="answer-number">{problem.number}.</span>
                                        <span className="answer-value">{problem.answer}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
