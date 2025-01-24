import { useState } from 'react'
import LeaderBoard from './Leaderboard/leaderBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LeaderBoard/>
      {/* <nav className='flex w-full items-center justify-between max-w-7xl mx-auto p-4'>
        <h1 className='text-2xl font-bold'>Dumbify</h1>
        <ul className='flex gap-4'>
          <li>Leaderboard</li>
          <li>Pricing</li>
        </ul>
      </nav>
      <main></main> */}
    </>
  )
}

export default App
