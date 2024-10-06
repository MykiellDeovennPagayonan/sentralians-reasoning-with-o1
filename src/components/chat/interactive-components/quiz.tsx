import React, { useState } from 'react';

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  choices: Choice[];
}

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRedo = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {showScore ? (
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">
            Congratulations! You scored {score} out of {questions.length}
          </p>
          <button 
            onClick={handleRedo}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Redo Quiz
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].questionText}</h2>
          <div className="space-y-3">
            {questions[currentQuestion].choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(choice.isCorrect)}
                className="w-full p-3 text-left bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition duration-300 ease-in-out"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;