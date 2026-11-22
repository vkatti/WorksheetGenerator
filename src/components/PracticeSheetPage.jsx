import { practiceColumns, practiceCellHeightMm, OPERATOR_SYMBOL } from '../utils/worksheetLayout';

function StackedProblem({ problem }) {
    const [a, b] = problem.operands;

    if (problem.type === 'division') {
        return (
            <div className="long-division">
                <span className="long-division-divisor">{b}</span>
                <span className="long-division-dividend">{a}</span>
            </div>
        );
    }

    return (
        <div className="stacked">
            <div className="stacked-top">{a}</div>
            <div className="stacked-bottom">
                <span className="stacked-op">{OPERATOR_SYMBOL[problem.type]}</span>
                <span>{b}</span>
            </div>
        </div>
    );
}

export default function PracticeSheetPage({ config, math, words, wordsHeading }) {
    const columns = practiceColumns(math);
    const cellHeight = practiceCellHeightMm(math);

    return (
        <div className="worksheet-page questions-page practice-page">
            <div className="practice-frame">
                <h1 className="practice-title">{config.worksheetTitle || 'Worksheet'}</h1>
                <div className="worksheet-meta-line practice-meta">
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

                {math.length > 0 && (
                    <>
                        {words.length > 0 && <h3 className="section-title">Section A: Number Problems</h3>}
                        <div
                            className="practice-grid"
                            style={{
                                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                gridAutoRows: `${cellHeight}mm`,
                            }}
                        >
                            {math.map((p) => (
                                <div key={p.number} className="practice-cell">
                                    <span className="practice-cell-number">{p.number}.</span>
                                    <StackedProblem problem={p} />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {words.length > 0 && (
                    <>
                        <h3 className="section-title">{wordsHeading}</h3>
                        <div className="practice-words">
                            {words.map((p) => (
                                <div key={p.number} className="practice-word">
                                    <div className="problem-item">
                                        <span className="problem-number">{p.number}.</span>
                                        <p className="word-problem">{p.question}</p>
                                    </div>
                                    {config.wordAnswerArea === 'box' ? (
                                        <div className="word-answer-box"><span>Answer:</span></div>
                                    ) : (
                                        <div className="word-answer-lines">
                                            <span className="word-answer-line"></span>
                                            <span className="word-answer-line"></span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
