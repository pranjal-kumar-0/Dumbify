import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <ul>
          <li>Pricing</li>
          <li>Leaderboard</li>
        </ul>
      </nav>
      <main></main>
    </>
  )
}

export default App
