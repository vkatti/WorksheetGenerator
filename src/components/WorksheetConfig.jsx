import { useState } from 'react';
import './WorksheetConfig.css';

export default function WorksheetConfig({ config, onConfigChange, onGenerate }) {
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

    return (
        <div className="worksheet-config">
            <h2>📝 Worksheet Configuration</h2>

            {/* Grade Level */}
            <div className="config-section">
                <label htmlFor="gradeLevel">Grade Level</label>
                <select
                    id="gradeLevel"
                    value={config.gradeLevel}
                    onChange={(e) => handleChange('gradeLevel', parseInt(e.target.value))}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                </select>
            </div>

            {/* Problem Types */}
            <div className="config-section">
                <label>Problem Types</label>
                <div className="checkbox-group">
                    {[
                        { value: 'addition', label: 'Addition' },
                        { value: 'subtraction', label: 'Subtraction' },
                        { value: 'multiplication', label: 'Multiplication' },
                        { value: 'division', label: 'Division' }
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

            {/* Arithmetic Settings */}
            {(config.problemTypes.includes('addition') ||
                config.problemTypes.includes('subtraction')) && (
                    <div className="config-section">
                        <h3>Addition/Subtraction Settings</h3>
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
                    </div>
                )}

            {config.problemTypes.includes('multiplication') && (
                <div className="config-section">
                    <h3>Multiplication Settings</h3>
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
                </div>
            )}

            {config.problemTypes.includes('division') && (
                <div className="config-section">
                    <h3>Division Settings</h3>
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
                </div>
            )}

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
                {config.includeWordProblems && (
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
                )}
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

            {/* Generate Button */}
            <button className="generate-btn" onClick={onGenerate}>
                🎲 Generate Worksheet
            </button>
        </div>
    );
}
