import { useState } from 'react';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import WorksheetConfig from './components/WorksheetConfig';
import WorksheetPreview from './components/WorksheetPreview';
import { generateProblems } from './utils/problemGenerators';
import { exportToPDF, printWorksheet } from './utils/pdfExporter';

function App() {
  const [config, setConfig] = useState({
    gradeLevel: 3,
    problemTypes: ['addition', 'subtraction'],
    addendDigits: 2,
    subtrahendDigits: 2,
    multiplicandDigits: 2,
    multiplierDigits: 1,
    divisorDigits: 1,
    questionCount: 15,
    includeWordProblems: false,
    wordProblemCount: 5,
    includeAnswerKey: true
  });

  const [problems, setProblems] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

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
        <h1>📝 SmartWorksheet Generator</h1>
        <p>Generate printable math and logic worksheets for kids</p>
      </header>

      <div className="app-content">
        <aside className="config-panel">
          <WorksheetConfig
            config={config}
            onConfigChange={setConfig}
            onGenerate={handleGenerate}
          />
        </aside>

        <main className="preview-panel">
          {problems.length > 0 && (
            <div className="action-buttons">
              <button
                className="action-btn print-btn"
                onClick={handlePrint}
                title="Print worksheet"
              >
                🖨️ Print
              </button>
              <button
                className="action-btn pdf-btn"
                onClick={handleExportPDF}
                disabled={isExporting}
                title="Download as PDF"
              >
                {isExporting ? '⏳ Exporting...' : '📄 Download PDF'}
              </button>
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
