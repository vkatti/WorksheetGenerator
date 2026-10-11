import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import WorksheetConfig from './components/WorksheetConfig';
import WorksheetPreview from './components/WorksheetPreview';
import Tooltip from './components/Tooltip';
import InfoModal from './components/InfoModal';
import { PrivacyPolicyContent, TermsOfUseContent, FAQContent } from './content/legalContent';
import { generateProblems } from './utils/problemGenerators';
import { exportToPDF, printWorksheet } from './utils/pdfExporter';

function App() {
  const [config, setConfig] = useState({
    problemTypes: ['addition', 'subtraction'],
    addendDigits: 2,
    subtrahendDigits: 2,
    multiplicandDigits: 2,
    multiplierDigits: 1,
    divisorDigits: 1,
    questionCount: 15,
    includeWordProblems: false,
    wordProblemCount: 5,
    currency: '$',
    worksheetTitle: 'Worksheet',
    includeAnswerKey: true
  });

  const [problems, setProblems] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'faq' | null
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderCompact((prev) => {
        if (prev) return window.scrollY > 20;
        return window.scrollY > 60;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;
    const observer = new ResizeObserver((entries) => {
      setHeaderHeight(entries[0].contentRect.height);
    });
    observer.observe(headerEl);
    return () => observer.disconnect();
  }, []);

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    setProblems([]); // Clear the worksheet when config changes
  };

  const handleGenerate = () => {
    const newProblems = generateProblems(config);
    setProblems(newProblems);
  };

  const handleExportPDF = async () => {
    if (problems.length === 0) {
      alert('Please generate a worksheet first!');
      return;
    }

    setIsExporting(true);
    try {
      await exportToPDF();
    } catch (error) {
      alert('Error generating PDF. Please try again.');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (problems.length === 0) {
      alert('Please generate a worksheet first!');
      return;
    }
    printWorksheet();
  };

  const renderActionButtons = (tooltipPosition) => (
    <div className="action-buttons">
      <Tooltip position={tooltipPosition} text="Opens your browser's print dialog using the worksheet above.">
        <button
          className="action-btn print-btn"
          onClick={handlePrint}
        >
          🖨️ Print
        </button>
      </Tooltip>
      <Tooltip position={tooltipPosition} text="Saves the worksheet (and answer key, if enabled) as a PDF file you can share or print later.">
        <button
          className="action-btn pdf-btn"
          onClick={handleExportPDF}
          disabled={isExporting}
        >
          {isExporting ? '⏳ Exporting...' : '📄 Download PDF'}
        </button>
      </Tooltip>
    </div>
  );

  return (
    <div
      className="app-container"
      style={{ '--header-height': `${headerHeight}px` }}
    >
      <header
        ref={headerRef}
        className={`app-header${isHeaderCompact ? ' is-compact' : ''}`}
      >
        <h1>
          <img src="/logo.png" alt="WorksheetLoom logo" className="app-logo" />
          WorksheetLoom
        </h1>
        <p>Printable math and logic worksheets, made simple for teachers and parents.</p>
        <div className="app-header-links">
          <button className="footer-link" onClick={() => setActiveModal('privacy')}>
            Privacy Policy
          </button>
          <span className="footer-divider">·</span>
          <button className="footer-link" onClick={() => setActiveModal('terms')}>
            Terms of Use
          </button>
          <span className="footer-divider">·</span>
          <button className="footer-link" onClick={() => setActiveModal('faq')}>
            FAQ
          </button>
        </div>
      </header>

      <div className="app-content">
        <aside className="config-panel">
          <WorksheetConfig
            config={config}
            onConfigChange={handleConfigChange}
            onGenerate={handleGenerate}
            onLegalLinkClick={setActiveModal}
          />
        </aside>

        <main className="preview-panel">
          {problems.length > 0 && renderActionButtons('bottom')}

          <WorksheetPreview problems={problems} config={config} />

          {problems.length > 0 && renderActionButtons('top')}
        </main>
      </div>

      <InfoModal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="🔒 Privacy Policy"
      >
        <PrivacyPolicyContent />
      </InfoModal>

      <InfoModal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="📋 Terms of Use"
      >
        <TermsOfUseContent />
      </InfoModal>

      <InfoModal
        isOpen={activeModal === 'faq'}
        onClose={() => setActiveModal(null)}
        title="❓ FAQ"
      >
        <FAQContent />
      </InfoModal>

      <Analytics />
    </div>
  );
}

export default App;
