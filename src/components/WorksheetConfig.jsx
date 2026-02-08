import { useState } from 'react';
import './WorksheetConfig.css';
import AdvancedSettingsModal from './AdvancedSettingsModal';

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

    return (
        <div className="worksheet-config">
            <h2>📝 Worksheet Configuration</h2>

            {/* Problem Types */}
            <div className="config-section">
                <label>Problem Types</label>
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
                <label htmlFor="questionCount">Number of Questions</label>
                <input
                    id="questionCount"
                    type="number"
                    min="5"
                    max="50"
                    value={config.questionCount}
                    onChange={(e) => handleChange('questionCount', parseInt(e.target.value))}
                />
            </div>



            {/* Word Problems Section */}
            <div className="config-section">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={config.includeWordProblems}
                        onChange={(e) => handleChange('includeWordProblems', e.target.checked)}
                    />
                    <span>Include Word Problems</span>
                </label>
            </div>

            {/* Include Answer Key */}
            <div className="config-section">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={config.includeAnswerKey}
                        onChange={(e) => handleChange('includeAnswerKey', e.target.checked)}
                    />
                    <span>Include Answer Key in PDF</span>
                </label>
            </div>

            {/* Worksheet Title */}
            <div className="config-section">
                <label htmlFor="worksheetTitle">Worksheet Title</label>
                <input
                    id="worksheetTitle"
                    type="text"
                    value={config.worksheetTitle}
                    onChange={(e) => handleChange('worksheetTitle', e.target.value)}
                    placeholder="Worksheet"
                />
            </div>

            {/* Advanced Settings Button */}
            <button 
                className="advanced-settings-btn" 
                onClick={() => setIsModalOpen(true)}
                type="button"
            >
                ⚙️ Advanced Settings
            </button>

            {/* Generate Button */}
            <button className="generate-btn" onClick={onGenerate}>
                🎲 Generate Worksheet
            </button>

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
