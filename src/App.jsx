// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Pricing from './Pricing';
// import Quiz from './Quiz';

// function App() {
//   const [count, setCount] = useState(0);
//   const [username, setUsername] = useState("");
//   const [isQuizStarted, setIsQuizStarted] = useState(false);

//   const startQuiz = () => {
//     if (!username.trim()) {
//       alert("Please enter a username!");
//       return;
//     }
//     setIsQuizStarted(true);
//   };

//   return (
//     <div className="App">
//       {/* Navbar */}
//       <nav className="flex w-full items-center justify-between max-w-7xl mx-auto p-4">
//         <h1 className="text-2xl font-bold">Dumbify</h1>
//         <ul className="flex gap-4">
//           <li>Leaderboard</li>
//           <li>Pricing</li>
//         </ul>
//       </nav>
//       {/* Main Content */}
//       {!isQuizStarted ? (
//         <div className="flex flex-col items-center justify-center mt-10">
//           <h1 className="text-4xl font-bold mb-6">Welcome to Dumbify Quiz!</h1>
//           <input
//             type="text"
//             className="border p-2 rounded mb-4"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <button
//             onClick={startQuiz}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Start Quiz
//           </button>
//         </div>
//       ) : (
//         <Quiz username={username} />
//       )}
//     </div>
//         <Router>
//       <nav className='flex w-full items-center justify-between max-w-7xl mx-auto p-4'>
//         <Link to="/">
//           <h1 className='text-2xl font-bold'>Dumbify</h1>
//         </Link>
//         <ul className='flex gap-4'>
//           <li><Link to="/leaderboard">Leaderboard</Link></li>
//           <li><Link to="/pricing">Pricing</Link></li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route
//           path="/pricing"
//           element={
//             <div className='Pricing-Container'>
//               <Pricing
//                 planTitle="Broke Plan"
//                 price="20🪙"
//                 description="Free... because we are too lazy to pay you yet!"
//               />
//               <Pricing
//                 planTitle="Pro Plan"
//                 price="52🪙"
//                 description="Pay us! We will treat you as VIPs" />
//               <Pricing
//                 planTitle="Kidney Plan"
//                 price="609🪙"
//                 description="Pay us! You will get no extra features" />
//             </div>
//           }
//         />
//         <Route
//           path="/leaderboard"
//           element={
//             <div className='Leaderboard-Container'>
//               <h2>Leaderboard Coming Soon!</h2>
//             </div>
//           }
//         />
//         <Route
//           path="/"
//           element={
//             <main>
//               <h2>Welcome to Dumbify</h2>
//             </main>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }
// export default App

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pricing from './Pricing';
import LeaderBoard from './Leaderboard/LeaderBoard';
import Quiz from './Quiz';
import { BackgroundLines } from './components/ui/background-lines';

function App() {
  const [username, setUsername] = useState("");
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const startQuiz = () => {
    if (!username.trim()) {
      alert("Please enter a username!");
      return;
    }
    setIsQuizStarted(true);
  };

  return (
    <Router>
      {/* Navbar */}
      <nav className="flex w-full items-center justify-between max-w-7xl mx-auto p-4 z-10">
        <Link to="/" className='z-10'>
          <h1 className="text-2xl font-bold z-10">Dumbify</h1>
        </Link>
        <ul className="flex gap-4">
          <li className='z-10'>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li className='z-10'>
            <Link to="/pricing">Pricing</Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/pricing"
          element={
            <div className="Pricing-Container">
              <Pricing
                planTitle="Broke Plan"
                price="20🪙"
                description="Free... because we are too lazy to pay you yet!"
              />
              <Pricing
                planTitle="Pro Plan"
                price="52🪙"
                description="Pay us! We will treat you as VIPs"
              />
              <Pricing
                planTitle="Kidney Plan"
                price="609🪙"
                description="Pay us! You will get no extra features"
              />
            </div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <div className="Leaderboard-Container">
              <LeaderBoard />
            </div>
          }
        />
        <Route
          path="/quiz"
          element={
            <div className="flex flex-col items-center justify-center mt-10">
              {!isQuizStarted ? (
                <>
                  <h1 className="text-4xl font-bold mb-6">Welcome to Dumbify Quiz!</h1>
                  <input
                    type="text"
                    className="border p-2 rounded mb-4"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    onClick={startQuiz}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Start Quiz
                  </button>
                </>
              ) : (
                <Quiz username={username} />
              )}
            </div>
          }
        />
        <Route
          path="/"
          element={
            <main className="flex flex-col items-center justify-center">
              <BackgroundLines className={"flex items-center mt-60 flex-col"}>

                <h2 className="text-4xl font-bold mb-4 text-center">Welcome to Dumbify! <br /> Who Needs Knowledge When You Have Money?</h2>
                <p className="text-lg font-semibold mb-6">Don’t Overthink It. Just Click and Go with the Flow!</p>
                <Link
                  to="/quiz"
                  className="bg-blue-500 text-white z-10 px-12 py-6 rounded"
                >

                </Link>
                <div className="Pricing-Container mt-20 z-10">
                  <Pricing
                    planTitle="Broke Plan"
                    price="20🪙"
                    description="Free... because we are too lazy to pay you yet!"
                  />
                  <Pricing
                    planTitle="Pro Plan"
                    price="52🪙"
                    description="Pay us! We will treat you as VIPs"
                  />
                  <Pricing
                    planTitle="Kidney Plan"
                    price="609🪙"
                    description="Pay us! You will get no extra features"
                  />
                </div>
              </BackgroundLines>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;