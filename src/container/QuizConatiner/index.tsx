import React, { useState, useEffect, useRef } from 'react';
import Hexagon from '../../view/multiPlayer/Hexagon';
import CircularTimer from '../../components/custom/CircularTimmer';

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
  const [currentTeam, setCurrentTeam] = useState<Team>('teamA');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(5);
  const [hexagonColors, setHexagonColors] = useState<HexagonColors>({});
  const [showHexPrompt, setShowHexPrompt] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const question: Question = {
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const isCorrectOption = option === question.correctAnswer;
    setIsCorrect(isCorrectOption);

    if (isCorrectOption) {
      setMsg('Correct! Please select a hexagon tile.');
      setShowHexPrompt(true);
      setTimerRunning(false); // Stop timer on correct answer
      clearTimeout(timerRef.current!); // Clear any running timer
    } else {
      setMsg('Incorrect. Passing the turn.');
      handleWrongAnswer();
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHexPrompt(false);
    setTimerRunning(false);
  };

  const handleHexClick = (hexagonId: string) => {
    if (isCorrect && showHexPrompt) {
      setHexagonColors(prevColors => ({
        ...prevColors,
        [hexagonId]: currentTeam === 'teamA' ? 'blue' : 'yellow',
      }));
      resetQuiz(); // Reset quiz only after hexagon selection
      setMsg('');
      setCurrentTeam(prevTeam => (prevTeam === 'teamA' ? 'teamB' : 'teamA'));
      setTimerRunning(true); // Restart the timer for the next team
    }
  };

  const startTimer = () => {
    clearTimeout(timerRef.current!); // Clear existing timer to avoid overlap

    if (timerRunning) {
      timerRef.current = setTimeout(() => {
        handleWrongAnswer();
      }, timer * 1000);
    }
  };

  const handleWrongAnswer = () => {
    setMsg('Turn passed to the next team');
    clearTimeout(timerRef.current!); // Clear the timer to prevent looping
    setCurrentTeam(prevTeam => (prevTeam === 'teamA' ? 'teamB' : 'teamA'));
    resetQuiz();
    setTimerRunning(true); // Start timer for the next team’s turn
  };

  useEffect(() => {
    startTimer();
    
    // Cleanup timer on component unmount
    return () => clearTimeout(timerRef.current!);
  }, [timerRunning, currentTeam]); // Depend on timerRunning and currentTeam to reset timer when they change

  // Initialize timer on component mount (or refresh)
  useEffect(() => {
    setTimerRunning(true); // Start the timer when the component mounts
  }, []); // Run only once when component mounts

  return (
    <>
      <Hexagon
        handleHexClick={(e) => handleHexClick(e.currentTarget.id)}
        question={question}
        selectedOption={selectedOption}
        isCorrect={isCorrect}
        handleOptionClick={handleOptionClick}
        resetQuiz={resetQuiz}
        currentTeam={currentTeam}
        hexagonColors={hexagonColors}
        msg={msg}
        duration={timer}
        onComplete={handleWrongAnswer}
        running={timerRunning}
      />
    </>
  );
};

export default QuizContainer;
