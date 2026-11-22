import './WorksheetPreview.css';
import './WorksheetStyles.css';
import PracticeSheetPage from './PracticeSheetPage';
import QuestionPaperPage from './QuestionPaperPage';
import { STYLE_PAPER, answerColumns } from '../utils/worksheetLayout';

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
    const isPaper = config.worksheetStyle === STYLE_PAPER;
    const wordsHeading = regularProblems.length > 0 ? 'Section B: Word Problems' : 'Word Problems';

    // The preview is one continuous sheet; the downloaded PDF (Typst) does the
    // real pagination. Only the Answer Key is a separate sheet.
    const answerSections = [
        { items: regularProblems, title: wordProblems.length > 0 ? 'Section A: Number Problems' : null },
        { items: wordProblems, title: wordsHeading }
    ].filter(sec => sec.items.length > 0);

    return (
        <div className="worksheet-preview" id="worksheet-content">
            {/* Questions */}
            {isPaper ? (
                <QuestionPaperPage
                    problems={problems}
                    config={config}
                    math={regularProblems}
                    words={wordProblems}
                    wordsHeading={wordsHeading}
                />
            ) : (
                <PracticeSheetPage
                    config={config}
                    math={regularProblems}
                    words={wordProblems}
                    wordsHeading={wordsHeading}
                />
            )}

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
                            <div className="answers-columns">
                                {answerColumns(sec.items).map((col, ci) => (
                                    <div key={ci} className="answers-column">
                                        {col.map((problem) => (
                                            <div key={problem.number} className="answer-item">
                                                <span className="answer-number">{problem.number}.</span>
                                                <span className="answer-value">{problem.answer}</span>
                                            </div>
                                        ))}
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
