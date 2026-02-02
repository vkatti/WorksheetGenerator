import './App.css'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <div>
        <h1>📝 Worksheet Generator</h1>
        <p className="subtitle">Generate printable worksheets for kids to practice</p>
      </div>
      <div className="card">
        <p>
          Welcome to the Worksheet Generator! This app will help you create
          custom worksheets for children to practice various skills.
        </p>
        <p className="coming-soon">
          ✨ More features coming soon!
        </p>
      </div>
      <Analytics />
    </>
  )
}

export default App
