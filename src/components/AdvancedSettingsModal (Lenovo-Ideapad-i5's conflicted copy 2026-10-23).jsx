import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './AdvancedSettingsModal.css';
import Tooltip from './Tooltip';
import InfoIcon from './InfoIcon';
import { MultiplicandDiagram, MultiplierDiagram, DivisorDiagram } from './MathTermDiagram';

export default function AdvancedSettingsModal({ isOpen, onClose, config, onApply }) {
    // Local state to hold temporary values until Apply is clicked
    const [tempConfig, setTempConfig] = useState({});

    // Update temp config when modal opens or config changes
    useEffect(() => {
        if (isOpen) {
            setTempConfig({
                addendDigits: config.addendDigits,
                subtrahendDigits: config.subtrahendDigits,
                multiplicandDigits: config.multiplicandDigits,
                multiplierDigits: config.multiplierDigits,
                divisorDigits: config.divisorDigits,
                wordProblemCount: config.wordProblemCount,
                currency: config.currency,
            });
        }
    }, [isOpen, config]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleTempChange = (field, value) => {
        setTempConfig({ ...tempConfig, [field]: value });
    };

    const handleApply = () => {
        onApply(tempConfig);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                    <h2>⚙️ Advanced Settings</h2>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <p className="modal-intro">
                        These settings control number ranges{config.includeWordProblems ? ' and currency formatting' : ''}.
                        They only affect the problem types and options you've already turned on.
                    </p>

                    {/* Digit Settings for Enabled Operations */}
                    {config.problemTypes.length > 0 && (
                        <div className="modal-section">
                            <h3>📐 Digit Settings</h3>
                            <p className="modal-section-hint">
                                Sets how many digits appear in each number, e.g. 2 digits allows numbers from 10-99.
                            </p>

                            {config.problemTypes.includes('addition') && (
                                <div className="modal-input-group">
                                    <label htmlFor="modal-addendDigits">
                                        Addition - Number of Digits
                                    </label>
                                    <input
                                        id="modal-addendDigits"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={tempConfig.addendDigits}
                                        onChange={(e) => handleTempChange('addendDigits', parseInt(e.target.value))}
                                    />
                                </div>
                            )}

                            {config.problemTypes.includes('subtraction') && (
                                <div className="modal-input-group">
                                    <label htmlFor="modal-subtrahendDigits">
                                        Subtraction - Number of Digits
                                    </label>
                                    <input
                                        id="modal-subtrahendDigits"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={tempConfig.subtrahendDigits}
                                        onChange={(e) => handleTempChange('subtrahendDigits', parseInt(e.target.value))}
                                    />
                                </div>
                            )}

                            {config.problemTypes.includes('multiplication') && (
                                <>
                                    <div className="modal-input-group">
                                        <label htmlFor="modal-multiplicandDigits">
                                            Multiplication - Multiplicand Digits
                                            <Tooltip wide position="right" content={<MultiplicandDiagram />}>
                                                <span className="help-icon" tabIndex={0} aria-label="Help: what is a multiplicand"><InfoIcon /></span>
                                            </Tooltip>
                                        </label>
                                        <input
                                            id="modal-multiplicandDigits"
                                            type="number"
                                            min="1"
                                            max="4"
                                            value={tempConfig.multiplicandDigits}
                                            onChange={(e) => handleTempChange('multiplicandDigits', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="modal-input-group">
                                        <label htmlFor="modal-multiplierDigits">
                                            Multiplication - Multiplier Digits
                                            <Tooltip wide position="right" content={<MultiplierDiagram />}>
                                                <span className="help-icon" tabIndex={0} aria-label="Help: what is a multiplier"><InfoIcon /></span>
                                            </Tooltip>
                                        </label>
                                        <input
                                            id="modal-multiplierDigits"
                                            type="number"
                                            min="1"
                                            max="3"
                                            value={tempConfig.multiplierDigits}
                                            onChange={(e) => handleTempChange('multiplierDigits', parseInt(e.target.value))}
                                        />
                                    </div>
                                </>
                            )}

                            {config.problemTypes.includes('division') && (
                                <div className="modal-input-group">
                                    <label htmlFor="modal-divisorDigits">
                                        Division - Divisor Digits
                                        <Tooltip wide position="right" content={<DivisorDiagram />}>
                                            <span className="help-icon" tabIndex={0} aria-label="Help: what is a divisor"><InfoIcon /></span>
                                        </Tooltip>
                                    </label>
                                    <input
                                        id="modal-divisorDigits"
                                        type="number"
                                        min="1"
                                        max="3"
                                        value={tempConfig.divisorDigits}
                                        onChange={(e) => handleTempChange('divisorDigits', parseInt(e.target.value))}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Word Problem Settings */}
                    {config.includeWordProblems && (
                        <div className="modal-section">
                            <h3>📖 Word Problem Settings</h3>

                            <div className="modal-input-group">
                                <label htmlFor="modal-wordProblemCount">
                                    Number of Word Problems
                                </label>
                                <input
                                    id="modal-wordProblemCount"
                                    type="number"
                                    min="1"
                                    max={config.questionCount}
                                    value={Math.min(tempConfig.wordProblemCount, config.questionCount)}
                                    onChange={(e) => handleTempChange('wordProblemCount', parseInt(e.target.value))}
                                />
                                <span className="modal-input-hint">
                                    {Math.min(tempConfig.wordProblemCount, config.questionCount)} out of {config.questionCount} total questions
                                </span>
                            </div>

                            <div className="modal-input-group">
                                <label htmlFor="modal-currency">Currency Symbol</label>
                                <select
                                    id="modal-currency"
                                    value={tempConfig.currency}
                                    onChange={(e) => handleTempChange('currency', e.target.value)}
                                >
                                    <option value="$">$ (US Dollar)</option>
                                    <option value="£">£ (Pound)</option>
                                    <option value="€">€ (Euro)</option>
                                    <option value="₹">₹ (Rupee)</option>
                                </select>
                                <span className="modal-input-hint">
                                    Used in any word problems involving money.
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button className="modal-btn modal-btn-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="modal-btn modal-btn-apply" onClick={handleApply}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
