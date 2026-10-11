import { useState } from 'react';
import './WorksheetConfig.css';
import AdvancedSettingsModal from './AdvancedSettingsModal';
import Tooltip from './Tooltip';
import InfoIcon from './InfoIcon';

export default function WorksheetConfig({ config, onConfigChange, onGenerate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (field, value) => {
        onConfigChange({ ...config, [field]: value });
    };

    const handleProblemTypeToggle = (type) => {
        const types = config.problemTypes.includes(type)
            ? config.problemTypes.filter(t => t !== type)
            : [...config.problemTypes, type];

        // Ensure at least one type is selected
        if (types.length === 0) return;

        handleChange('problemTypes', types);
    };

    const handleAdvancedSettingsApply = (updatedSettings) => {
        onConfigChange({ ...config, ...updatedSettings });
    };

    const handleQuestionCountBlur = () => {
        const clamped = Math.min(100, Math.max(5, config.questionCount || 0));
        if (clamped !== config.questionCount) {
            handleChange('questionCount', clamped);
        }
    };

    return (
        <div className="worksheet-config">
            <h2>📝 Worksheet Configuration</h2>

            {/* Problem Types */}
            <div className="config-section">
                <label>
                    Problem Types
                    <Tooltip text="Pick which kinds of math problems to include. You can select more than one.">
                        <span className="help-icon" tabIndex={0} aria-label="Help: problem types"><InfoIcon /></span>
                    </Tooltip>
                </label>
                <div className="checkbox-group">
                    {[
                        { value: 'addition', label: 'Add' },
                        { value: 'subtraction', label: 'Subtract' },
                        { value: 'multiplication', label: 'Multiply' },
                        { value: 'division', label: 'Divide' }
                    ].map(type => (
                        <label key={type.value} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={config.problemTypes.includes(type.value)}
                                onChange={() => handleProblemTypeToggle(type.value)}
                            />
                            <span>{type.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Number of Questions */}
            <div className="config-section">
                <label htmlFor="questionCount">
                    Number of Questions
                    <Tooltip text="Total questions on the worksheet (5-100). If word problems are included, they count toward this total.">
                        <span className="help-icon" tabIndex={0} aria-label="Help: number of questions"><InfoIcon /></span>
                    </Tooltip>
                </label>
                <input
                    id="questionCount"
                    type="number"
                    min="5"
                    max="100"
                    value={config.questionCount}
                    onChange={(e) => handleChange('questionCount', parseInt(e.target.value))}
                    onBlur={handleQuestionCountBlur}
                />
            </div>



            {/* Word Problems Section */}
            <div className="config-section">
                <div className="checkbox-row">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.includeWordProblems}
                            onChange={(e) => handleChange('includeWordProblems', e.target.checked)}
                        />
                        <span>Include Word Problems</span>
                    </label>
                    <Tooltip text="Adds real-life story problems (e.g. shopping, sharing) alongside the number problems, using the currency set in Advanced Settings.">
                        <span className="help-icon" tabIndex={0} aria-label="Help: word problems"><InfoIcon /></span>
                    </Tooltip>
                </div>
            </div>

            {/* Include Answer Key */}
            <div className="config-section">
                <div className="checkbox-row">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config.includeAnswerKey}
                            onChange={(e) => handleChange('includeAnswerKey', e.target.checked)}
                        />
                        <span>Include Answer Key</span>
                    </label>
                    <Tooltip text="Adds a separate answer key page at the end of the worksheet, included in both Print and the downloaded PDF.">
                        <span className="help-icon" tabIndex={0} aria-label="Help: answer key"><InfoIcon /></span>
                    </Tooltip>
                </div>
            </div>

            {/* Worksheet Title */}
            <div className="config-section">
                <label htmlFor="worksheetTitle">
                    Worksheet Title
                    <Tooltip text="Shown as the heading at the top of the printed worksheet, e.g. a class name or topic.">
                        <span className="help-icon" tabIndex={0} aria-label="Help: worksheet title"><InfoIcon /></span>
                    </Tooltip>
                </label>
                <input
                    id="worksheetTitle"
                    type="text"
                    value={config.worksheetTitle}
                    onChange={(e) => handleChange('worksheetTitle', e.target.value)}
                    placeholder="Worksheet"
                />
            </div>

            {/* Advanced Settings Button */}
            <Tooltip className="tooltip-block" text="Fine-tune digit counts per operation, word-problem count, and currency symbol.">
                <button
                    className="advanced-settings-btn"
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                >
                    ⚙️ Advanced Settings
                </button>
            </Tooltip>

            {/* Generate Button */}
            <button className="generate-btn" onClick={onGenerate}>
                🎲 Generate Worksheet
            </button>

            <a className="support-email-link" href="mailto:support@worksheetloom.com">
                Need help? <span>Get Support</span>
            </a>

            {/* Advanced Settings Modal */}
            <AdvancedSettingsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                config={config}
                onApply={handleAdvancedSettingsApply}
            />
        </div>
    );
}
