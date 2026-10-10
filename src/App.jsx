import { useState } from 'react';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import WorksheetConfig from './components/WorksheetConfig';
import WorksheetPreview from './components/WorksheetPreview';
import Tooltip from './components/Tooltip';
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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>
          <img src="/logo.png" alt="WorksheetLoom logo" className="app-logo" />
          WorksheetLoom
        </h1>
        <p>Printable math and logic worksheets, made simple for teachers and parents.</p>
      </header>

      <div className="app-content">
        <aside className="config-panel">
          <WorksheetConfig
            config={config}
            onConfigChange={handleConfigChange}
            onGenerate={handleGenerate}
          />
        </aside>

        <main className="preview-panel">
          {problems.length > 0 && (
            <div className="action-buttons">
              <Tooltip text="Opens your browser's print dialog using the worksheet above.">
                <button
                  className="action-btn print-btn"
                  onClick={handlePrint}
                >
                  🖨️ Print
                </button>
              </Tooltip>
              <Tooltip text="Saves the worksheet (and answer key, if enabled) as a PDF file you can share or print later.">
                <button
                  className="action-btn pdf-btn"
                  onClick={handleExportPDF}
                  disabled={isExporting}
                >
                  {isExporting ? '⏳ Exporting...' : '📄 Download PDF'}
                </button>
              </Tooltip>
            </div>
          )}

          <WorksheetPreview problems={problems} config={config} />
        </main>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
