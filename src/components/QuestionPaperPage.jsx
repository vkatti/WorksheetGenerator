import { paperQuestion, sectionMarks, instructionLines } from '../utils/worksheetLayout';

const marksLabel = (n) => `${n} ${n === 1 ? 'mark' : 'marks'}`;

function PaperQuestion({ problem, marks }) {
    return (
        <div className="paper-question">
            <span className="paper-q-number">{problem.number}.</span>
            <span className={problem.isWordProblem ? 'paper-q-text paper-q-word' : 'paper-q-text'}>
                {paperQuestion(problem)}
            </span>
            <span className="paper-q-marks">[{marks}]</span>
        </div>
    );
}

export default function QuestionPaperPage({ problems, config, math, words, wordsHeading }) {
    const m = sectionMarks(problems, config);
    const instructions = instructionLines(config);

    return (
        <div className="worksheet-page questions-page paper-page">
            <div className="worksheet-header paper-header">
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
                <div className="paper-summary">
                    {config.timeAllowed?.trim() && (
                        <span><strong>Time allowed:</strong> {config.timeAllowed.trim()}</span>
                    )}
                    <span><strong>Total marks:</strong> {m.total}</span>
                </div>
            </div>

            {instructions.length > 0 && (
                <div className="paper-instructions">
                    <h4>General Instructions</h4>
                    <ul>
                        {instructions.map((line, i) => <li key={i}>{line}</li>)}
                    </ul>
                </div>
            )}

            <div className="worksheet-content">
                {math.length > 0 && (
                    <>
                        <h3 className="section-title paper-section-title">
                            <span>{words.length > 0 ? 'Section A: Number Problems' : 'Questions'}</span>
                            <span className="paper-section-marks">[{marksLabel(m.totalA)}]</span>
                        </h3>
                        <div className="paper-grid">
                            {math.map((p) => <PaperQuestion key={p.number} problem={p} marks={m.marksA} />)}
                        </div>
                    </>
                )}

                {words.length > 0 && (
                    <>
                        <h3 className="section-title paper-section-title">
                            <span>{wordsHeading}</span>
                            <span className="paper-section-marks">[{marksLabel(m.totalB)}]</span>
                        </h3>
                        <div className="paper-words">
                            {words.map((p) => <PaperQuestion key={p.number} problem={p} marks={m.marksB} />)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
