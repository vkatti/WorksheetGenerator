import { useState } from 'react'
import './App.css'

function App() {
  const [worksheetType, setWorksheetType] = useState('addition')

  return (
    <>
      <div>
        <h1>Worksheet Generator</h1>
        <p>Generate printable worksheets for kids to practice</p>
      </div>
      <div className="card">
        <label htmlFor="worksheet-type">Select Worksheet Type: </label>
        <select 
          id="worksheet-type"
          value={worksheetType} 
          onChange={(e) => setWorksheetType(e.target.value)}
        >
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
        </select>
        <p>Selected: {worksheetType}</p>
        <button onClick={() => alert(`Generating ${worksheetType} worksheet!`)}>
          Generate Worksheet
        </button>
      </div>
      <p className="read-the-docs">
        Choose a worksheet type and click Generate to create printable worksheets
      </p>
    </>
  )
}

export default App
