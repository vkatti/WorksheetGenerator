import './Tooltip.css';

export default function Tooltip({ text, content, children, className = '', wide = false, position = 'top' }) {
    const bubbleClassName = `tooltip-bubble tooltip-position-${position}${wide ? ' tooltip-bubble-wide' : ''}`;
    return (
        <span className={`tooltip-wrapper ${className}`.trim()}>
            {children}
            <span className={bubbleClassName} role="tooltip">
                {content ?? text}
            </span>
        </span>
    );
}
