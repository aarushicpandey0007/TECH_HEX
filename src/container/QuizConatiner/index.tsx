import React, { useState, useEffect, useRef } from 'react';
import Hexagon from '../../view/multiPlayer/Hexagon';
import CircularTimmer from '../../components/custom/CircularTimmer';

type Team = 'teamA' | 'teamB';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

type HexagonColors = {
  [key: string]: string; // Maps hexagon ID to its color
};

const QuizContainer = () => {
  const [currentTeam, setCurrentTeam] = useState<Team>('teamA'); // Assume team A starts
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(5); // 5-second countdown timer
  const [hexagonColors, setHexagonColors] = useState<HexagonColors>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastHexagonId = useRef<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(false); // State to manage the timer's running state

  const question: Question = {
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const isCorrectOption = option === question.correctAnswer;
    setIsCorrect(isCorrectOption);

    if (lastHexagonId.current) {
      setMsg("Correct!!");
      const hexagonId = lastHexagonId.current;

      const mockEvent = {
        currentTarget: {
          id: hexagonId,
          style: {},
        },
      } as React.MouseEvent<HTMLDivElement>;

      handleHexClick(mockEvent, isCorrectOption);
    } else {
      console.log('No hexagon was clicked before this option was selected.');
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setTimerRunning(false); // Stop the timer before resetting
    startTimer(); // Restart the timer for the next question
    // setMsg("Now your Turn");
  };

  const handleHexClick = (e: React.MouseEvent<HTMLDivElement>, isCorrectOption: boolean | null) => {
    
    const hexagonId = e.currentTarget.id;
    lastHexagonId.current = hexagonId;

    if (isCorrectOption) {
      
      setHexagonColors(prevColors => ({
        ...prevColors,
        [hexagonId]: currentTeam === 'teamA' ? 'blue' : 'yellow',
      }));

      // Clear the timer and restart it when an answer is correct
      if (timeoutRef.current) {
        
        
        clearTimeout(timeoutRef.current);
      }

      resetQuiz(); // Reset quiz for the next question
    } else if (isCorrectOption === false) {
      setMsg("Wrong answer");
      setHexagonColors(prevColors => ({
        ...prevColors,
        [hexagonId]: 'gray',
      }));
      
      // Handle incorrect answer, let the timer run
      if (timeoutRef.current) {
        
        clearTimeout(timeoutRef.current);
      }
      
      // Switch to the other team after 2 seconds
      setTimeout(() => {
        setMsg("");
        handleWrongAnswer();
      }, 2000);
    }

    setIsCorrect(null);
  };

  const startTimer = () => {
    setTimerRunning(true); // Set the timer as running
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleWrongAnswer();
      console.log("Timer expired, switching turn.");
    }, timer * 1000);
  };

  const handleWrongAnswer = () => {
    setMsg("Now Your Turn");
    setCurrentTeam(prevTeam => (prevTeam === 'teamA' ? 'teamB' : 'teamA'));
    resetQuiz();
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
    <>
      
      <Hexagon
        handleHexClick={handleHexClick}
        question={question}
        selectedOption={selectedOption}
        isCorrect={isCorrect}
        handleOptionClick={handleOptionClick}
        resetQuiz={resetQuiz}
        currentTeam={currentTeam}
        hexagonColors={hexagonColors}
        msg={msg}
        duration={timer} // Set the duration (in seconds) for the timer
        onComplete={handleWrongAnswer} // Handle what happens when the timer completes
        running={timerRunning}
      />
    </>
  );
};

export default QuizContainer;
