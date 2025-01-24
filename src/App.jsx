import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className='flex w-full items-center justify-between max-w-7xl mx-auto p-4'>
        <h1 className='text-2xl font-bold'>Dumbify</h1>
        <ul className='flex gap-4'>
          <li>Leaderboard</li>
          <li>Pricing</li>
        </ul>
      </nav>
      <main></main>
    </>
  )
}

export default App
