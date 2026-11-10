import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../components/AdvancedSettingsModal.css';
import './InfoModal.css';

export default function InfoModal({ isOpen, onClose, title, children }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content info-modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body info-content">
                    {children}
                </div>

                <div className="modal-footer">
                    <button className="modal-btn modal-btn-apply" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
