import React from 'react';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuizComponentProps {
  question: Question;
  selectedOption: string | null;
  isCorrect: boolean | null;
  handleOptionClick: (option: string) => void;
  resetQuiz: () => void;
  msg: string | null;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  question,
  selectedOption,
  isCorrect,
  handleOptionClick,
  resetQuiz,
  msg
}) => {
  return (
    <div className="quiz-container flex flex-col items-center p-6 max-w-md mx-auto rounded-lg shadow-md">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">{question.text}</h2>
      
      <div className="options grid grid-cols-2 gap-3 mb-4 w-full">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`py-3 px-4  border rounded-lg transition-colors
              ${selectedOption === option && isCorrect === true ? 'bg-green-400' : ''} 
              ${selectedOption === option && isCorrect === false ? 'bg-red-300' : ''} 
              ${selectedOption === null ?' hover:bg-blue-400' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className={`text-xl font-semibold mb-4 ${msg === "Correct!!" ? "text-green-500" : msg === "Wrong answer" ? "text-red-500" : "text-gray-500"}`}>
        {msg}
      </div>
      
      <button
        className="py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={resetQuiz}
      >
        Reset
      </button>
    </div>
  );
};

export default QuizComponent;
