import { useState } from 'react';
import './WorksheetConfig.css';

export default function WorksheetConfig({ config, onConfigChange, onGenerate }) {
    const [activeTab, setActiveTab] = useState('addition');

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

        // Set active tab to first selected operation if current tab is not selected
        if (!types.includes(activeTab)) {
            const availableTabs = types.filter(t =>
                ['addition', 'subtraction', 'multiplication', 'division'].includes(t)
            );
            if (availableTabs.length > 0) {
                setActiveTab(availableTabs[0]);
            }
        }
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

            {/* Settings Section with Tabs */}
            {config.problemTypes.length > 0 && (
                <div className="config-section">
                    <h3>⚙️ Settings</h3>

                    {/* Tab Navigation */}
                    <div className="tab-navigation">
                        {config.problemTypes.includes('addition') && (
                            <button
                                className={`tab-button ${activeTab === 'addition' ? 'active' : ''}`}
                                onClick={() => setActiveTab('addition')}
                            >
                                Add
                            </button>
                        )}
                        {config.problemTypes.includes('subtraction') && (
                            <button
                                className={`tab-button ${activeTab === 'subtraction' ? 'active' : ''}`}
                                onClick={() => setActiveTab('subtraction')}
                            >
                                Subtract
                            </button>
                        )}
                        {config.problemTypes.includes('multiplication') && (
                            <button
                                className={`tab-button ${activeTab === 'multiplication' ? 'active' : ''}`}
                                onClick={() => setActiveTab('multiplication')}
                            >
                                Multiply
                            </button>
                        )}
                        {config.problemTypes.includes('division') && (
                            <button
                                className={`tab-button ${activeTab === 'division' ? 'active' : ''}`}
                                onClick={() => setActiveTab('division')}
                            >
                                Divide
                            </button>
                        )}
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === 'addition' && config.problemTypes.includes('addition') && (
                            <div className="input-group">
                                <label htmlFor="addendDigits">Number of Digits</label>
                                <input
                                    id="addendDigits"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={config.addendDigits}
                                    onChange={(e) => handleChange('addendDigits', parseInt(e.target.value))}
                                />
                            </div>
                        )}

                        {activeTab === 'subtraction' && config.problemTypes.includes('subtraction') && (
                            <div className="input-group">
                                <label htmlFor="subtrahendDigits">Number of Digits</label>
                                <input
                                    id="subtrahendDigits"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={config.subtrahendDigits}
                                    onChange={(e) => handleChange('subtrahendDigits', parseInt(e.target.value))}
                                />
                            </div>
                        )}

                        {activeTab === 'multiplication' && config.problemTypes.includes('multiplication') && (
                            <>
                                <div className="input-group">
                                    <label htmlFor="multiplicandDigits">Multiplicand Digits</label>
                                    <input
                                        id="multiplicandDigits"
                                        type="number"
                                        min="1"
                                        max="4"
                                        value={config.multiplicandDigits}
                                        onChange={(e) => handleChange('multiplicandDigits', parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="multiplierDigits">Multiplier Digits</label>
                                    <input
                                        id="multiplierDigits"
                                        type="number"
                                        min="1"
                                        max="3"
                                        value={config.multiplierDigits}
                                        onChange={(e) => handleChange('multiplierDigits', parseInt(e.target.value))}
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'division' && config.problemTypes.includes('division') && (
                            <div className="input-group">
                                <label htmlFor="divisorDigits">Divisor Digits</label>
                                <input
                                    id="divisorDigits"
                                    type="number"
                                    min="1"
                                    max="3"
                                    value={config.divisorDigits}
                                    onChange={(e) => handleChange('divisorDigits', parseInt(e.target.value))}
                                />
                            </div>
                        )}
                    </div>

                    {/* Number of Questions */}
                    <div className="input-group" style={{ marginTop: '16px' }}>
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
                </div>
            )}

            {/* Word Problems Section */}
            <div className="config-section">
                <h3>📖 Word Problems</h3>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={config.includeWordProblems}
                        onChange={(e) => handleChange('includeWordProblems', e.target.checked)}
                    />
                    <span>Include Word Problems</span>
                </label>
                {config.includeWordProblems && (
                    <>
                        <div className="input-group" style={{ marginTop: '10px' }}>
                            <label htmlFor="wordProblemCount">Number of Word Problems</label>
                            <input
                                id="wordProblemCount"
                                type="number"
                                min="1"
                                max="20"
                                value={config.wordProblemCount}
                                onChange={(e) => handleChange('wordProblemCount', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="input-group" style={{ marginTop: '10px' }}>
                            <label htmlFor="currency">Currency Symbol</label>
                            <select
                                id="currency"
                                value={config.currency}
                                onChange={(e) => handleChange('currency', e.target.value)}
                            >
                                <option value="₹">₹ (Rupee)</option>
                                <option value="$">$ (US Dollar)</option>
                                <option value="€">€ (Euro)</option>
                                <option value="£">£ (Pound)</option>
                            </select>
                        </div>
                    </>
                )}
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

            {/* Generate Button */}
            <button className="generate-btn" onClick={onGenerate}>
                🎲 Generate Worksheet
            </button>
        </div>
    );
}
