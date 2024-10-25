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
    <div className="quiz-container flex flex-col items-center p-4">
      <h2 className="text-4xl font-bold mb-4">{question.text}</h2>
      <div className="options grid grid-cols-2 gap-4 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 border rounded-md transition-colors text-black
              ${selectedOption === option ? msg==="correct!!"? 'bg-green-400': 'bg-gray-200 text-black' : 'bg-gray-200'}
             

              hover:bg-blue-400 hover:text-white`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
       
      <div className={msg === "correct!!" ? "text-green-400 text-xl" : msg === "Wrong answer" ? "text-red-600" : "text-blue-600"}>
  {msg}
</div>

      
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={resetQuiz}
      >
        Reset
      </button>
    </div>
  );
};

export default QuizComponent;
