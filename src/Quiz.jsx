import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Import Firebase configuration
import { collection, addDoc } from "firebase/firestore";

const Quiz = ({ username }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

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

    // Update the user's answers
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: { answer, isCorrect },
    }));

    // Track correct and incorrect answers
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    // Track which questions were answered correctly or incorrectly
    setAnsweredQuestions((prev) => [
      ...prev,
      { question: currentQuestion.question, isCorrect, answer, correctAnswer: currentQuestion.correctAnswer },
    ]);

    // Move to next question or finish the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  // Save quiz results to Firebase
  const saveResults = async () => {
    try {
      const results = {
        username,
        correctCount,
        incorrectCount,
        answeredQuestions,
        timestamp: new Date(),
      };

      const docRef = await addDoc(collection(db, "quiz_results"), results);
      console.log("Quiz results saved with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving quiz results:", error);
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

        {/* Display answered questions with feedback */}
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
      <h2 className="text-xl font-bold">
        Question {currentQuestionIndex + 1}/{questions.length}
      </h2>
      <p className="my-4">{currentQuestion.question}</p>
      <ul className="space-y-2">
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
    </div>
  );
};

export default Quiz;
