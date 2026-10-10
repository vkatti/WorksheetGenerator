import './MathTermDiagram.css';

function Term({ value, highlighted }) {
    return (
        <span className={`term-diagram-num${highlighted ? ' term-diagram-highlight' : ''}`}>
            {value}
        </span>
    );
}

export function MultiplicandDiagram() {
    return (
        <div className="term-diagram">
            <div className="term-diagram-equation">
                <Term value="23" highlighted />
                <span className="term-diagram-op">×</span>
                <Term value="4" />
                <span className="term-diagram-op">=</span>
                <Term value="92" />
            </div>
            <p className="term-diagram-caption">
                The <strong>multiplicand</strong> is the number being multiplied — the first number in the problem.
            </p>
        </div>
    );
}

export function MultiplierDiagram() {
    return (
        <div className="term-diagram">
            <div className="term-diagram-equation">
                <Term value="23" />
                <span className="term-diagram-op">×</span>
                <Term value="4" highlighted />
                <span className="term-diagram-op">=</span>
                <Term value="92" />
            </div>
            <p className="term-diagram-caption">
                The <strong>multiplier</strong> is the number you're multiplying by — the second number in the problem.
            </p>
        </div>
    );
}

export function DivisorDiagram() {
    return (
        <div className="term-diagram">
            <div className="term-diagram-equation">
                <Term value="20" />
                <span className="term-diagram-op">÷</span>
                <Term value="4" highlighted />
                <span className="term-diagram-op">=</span>
                <Term value="5" />
            </div>
            <p className="term-diagram-caption">
                The <strong>divisor</strong> is the number you're dividing by — the second number in the problem.
            </p>
        </div>
    );
}
