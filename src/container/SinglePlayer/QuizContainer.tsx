import React, { useState, useEffect, useRef } from 'react';
import Hexagon from '../../view/singlePlayer/Hexagon';
import InfoPanel from '../../components/custom/InfoPanel';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

type HexagonColors = {
  [key: number]: string; // Maps hexagon index to its color
};

const QuizContainer: React.FC = () => {
  const [activeHex, setActiveHex] = useState<number | null>(null); // Track the active hexagon
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(5); // 5-second countdown timer
  const [hexagonColors, setHexagonColors] = useState<HexagonColors>({});
  const [msg, setMsg] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const question: Question = {
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const isCorrectOption = option === question.correctAnswer;
    setIsCorrect(isCorrectOption);

    if (activeHex !== null) {
      setMsg(isCorrectOption ? 'Correct!' : 'Wrong Answer');
      setHexagonColors((prevColors) => ({
        ...prevColors,
        [activeHex]: isCorrectOption ? 'green' : 'red',
      }));

      if (isCorrectOption) {
        resetQuiz(); // Reset for the next question if correct
      } else {
        setTimeout(() => {
          setMsg(null);
        }, 2000); // Display wrong answer message briefly
      }
    }
  };

  const handleHexClick = (index: number) => {
    setActiveHex((prevActive) => (prevActive === index ? null : index));
    startTimer(); // Restart the timer with each new hex click
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setTimerRunning(false);
    setMsg(null);
    startTimer(); // Restart the timer for the next question
  };

  const startTimer = () => {
    setTimerRunning(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setMsg('Time expired! Try again.');
      setIsCorrect(false);
      setTimerRunning(false);
    }, timer * 1000);
  };

  const renderRows = (totalRows: number, hexCount: number) => {
    return Array.from({ length: totalRows }).map((_, rowIndex) => {
      const isOffset = rowIndex % 2 !== 0;

      return (
        <div
          key={rowIndex}
          className={`flex ${isOffset ? 'translate-x-[50px]' : 'ml-2.5'} -mt-2`}
        >
          {Array.from({ length: hexCount }).map((_, hexIndexInner) => {
            const hexIndex = rowIndex * hexCount + hexIndexInner;
            const isActive = activeHex === hexIndex;

            return (
              <Hexagon
                key={hexIndex}
                isActive={isActive}
                // color={hexagonColors[hexIndex] || 'default'}
                onClick={() => handleHexClick(hexIndex)}
              />
            );
          })}
        </div>
      );
    });
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-start justify-center">
      <div className="info-panel w-[20%] md:w-[10%] lg:w-[2%] ml-4 md:ml-6 lg:ml-10 mt-20 md:mt-28 lg:mt-52">
        <InfoPanel />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow mt-10 md:mt-14 lg:mt-20">
        {renderRows(7, 7)}
        <div className="mt-4 text-center">
          <h2>{question.text}</h2>
          <div className="options flex justify-center space-x-4 mt-2">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-2 rounded ${
                  selectedOption === option
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {msg && <p className="mt-2 text-lg">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
