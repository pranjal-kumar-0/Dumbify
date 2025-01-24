import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Import Firebase configuration
import { collection, getDoc, setDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { LampContainer, LampDemo } from "./components/ui/lamp";
import { motion } from "framer-motion";

const Quiz = ({ username }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [gifPath, setGifPath] = useState(""); // State for the GIF path

  // Fetch questions from The Trivia API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://the-trivia-api.com/api/questions?limit=5"
        );
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    const num = Math.floor(Math.random() * 4) + 1;

    // Set the GIF path based on whether the answer is correct or not
    const gif = isCorrect
      ? `/gifs/correct/${num}.gif` // Correct answer GIF path
      : `/gifs/wrong/${num}.gif`; // Incorrect answer GIF path

    setGifPath(gif);

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: { answer, isCorrect },
    }));

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => [
      ...prev,
      { question: currentQuestion.question, isCorrect, answer, correctAnswer: currentQuestion.correctAnswer },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const saveResults = async () => {
    try {
      // Get a reference to the user's document
      const userDocRef = doc(db, "quiz_results", username);

      // Check if the document already exists
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        // If the document exists, update it (adding the new counts to the existing data)
        await updateDoc(userDocRef, {
          correctCount: docSnap.data().correctCount + correctCount,
          incorrectCount: docSnap.data().incorrectCount + incorrectCount,
        });
        console.log("Quiz results updated for", username);
      } else {
        // If the document doesn't exist, create a new one
        const results = {
          username,
          correctCount,
          incorrectCount,
          timestamp: new Date(),
        };
        await setDoc(userDocRef, results);
        console.log("Quiz results saved for", username);
      }
    } catch (error) {
      console.error("Error saving or updating quiz results:", error);
    }
  };

  useEffect(() => {
    if (isQuizCompleted) saveResults();
  }, [isQuizCompleted]);

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  if (isQuizCompleted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Quiz Completed!</h2>
        <p className="mt-4">Thank you, {username}, for playing Dumbify!</p>
        <p>Correct Answers: {correctCount}</p>
        <p>Incorrect Answers: {incorrectCount}</p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Your Results:</h3>
          <ul className="mt-4 space-y-4">
            {answeredQuestions.map((q, index) => (
              <li key={index} className="border p-4 rounded">
                <p className="font-bold">{q.question}</p>
                <p className="my-2">
                  Your Answer: {q.answer}{" "}
                  {q.isCorrect ? (
                    <span role="img" aria-label="correct" className="text-green-500">
                      ✅
                    </span>
                  ) : (
                    <span role="img" aria-label="incorrect" className="text-red-500">
                      ❌
                    </span>
                  )}
                </p>
                <p className="my-2">Correct Answer: {q.correctAnswer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container p-6">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 w-1/2 mb-9 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-xl font-medium tracking-tight text-transparent md:text-7xl">
          {currentQuestion.question}
        </motion.h1>
        <h2 className="my-2 font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h2>
        <ul className="space-y-2 w-full">
          {currentQuestion.incorrectAnswers
            .concat(currentQuestion.correctAnswer)
            .sort()
            .map((answer) => (
              <li
                key={answer}
                className="p-2 border rounded cursor-pointer hover:bg-blue-100"
                onClick={() => handleAnswerSelect(answer)}
              >
                {answer}
              </li>
            ))}
        </ul>
      </LampContainer>

      {/* Display the GIF after selecting an answer */}
      {gifPath && (
        <div className="absolute mt-6 top-10 left-10">
          <img src={gifPath} alt="Answer Result" className="w-48 h-48 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default Quiz;
