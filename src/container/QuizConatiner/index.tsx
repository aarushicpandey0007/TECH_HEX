import React, { useState, useEffect, useRef } from 'react';
import Hexagon from '../../view/view1/Hexagon';

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
  const [hexagonColors, setHexagonColors] = useState<HexagonColors>({}); // State to hold colors of hexagons
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Use useRef to store timeout ID
  const lastHexagonId = useRef<string | null>(null); // Ref to store the last clicked hexagon ID
  const [msg, setMsg] = useState<string | null>(null);

  const question: Question = {
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Update the selected option
    const isCorrectOption = option === question.correctAnswer; // Check if the selected option is correct
    setIsCorrect(isCorrectOption);

    if (lastHexagonId.current) {
      const hexagonId = lastHexagonId.current; // Get the last clicked hexagon ID

      const mockEvent = {
        currentTarget: {
          id: hexagonId,
          style: {}, // Initialize any styles you expect to manipulate
        },
      } as React.MouseEvent<HTMLDivElement>;

      handleHexClick(mockEvent, isCorrectOption); // Call the hexagon click handler with the mock event
    } else {
      console.log('No hexagon was clicked before this option was selected.');
    }
  };

  // Function to reset the quiz state
  const resetQuiz = () => {
    setSelectedOption(null); // Reset the selected option
    setIsCorrect(null); // Reset the correctness state
    startTimer(); // Restart the timer for the next question
    setMsg("Now your Turn");
  };

  // Function to handle hexagon clicks
  const handleHexClick = (e: React.MouseEvent<HTMLDivElement>, isCorrectOption: boolean | null) => {
    setMsg("");
    const hexagonId = e.currentTarget.id; // Access the ID of the clicked element
    lastHexagonId.current = hexagonId; // Store the hexagon ID for later reference

    if (isCorrectOption) {
      // Set the color for the clicked hexagon based on the current team
      setMsg("correct!!");
      setHexagonColors(prevColors => ({
        ...prevColors,
        [hexagonId]: currentTeam === 'teamA' ? 'blue' : 'yellow',
      }));

      // Clear the timer and restart it when an answer is correct
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      startTimer(); // Restart timer for the next question
    } else if (isCorrectOption === false) {
      // Handle incorrect answer, let the timer run
      setMsg("Wrong answer");
      setHexagonColors(prevColors => ({
        ...prevColors,
        [hexagonId]: 'gray', // Color for incorrect answers
      }));
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Switch to the other team after 2 seconds
      setTimeout(() => {
        handleWrongAnswer();
      }, 2000); // 2-second delay before switching the team
    }

    setIsCorrect(null); // Reset correctness state
  };

  const startTimer = () => {
    // Ensure no existing timer is running
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start the timer (for 5 seconds or configured time)
    timeoutRef.current = setTimeout(() => {
      handleWrongAnswer(); // Call handleWrongAnswer when timer expires
      console.log("Timer expired, switching turn.");
    }, timer * 1000); // Timer duration in milliseconds
  };

  const handleWrongAnswer = () => {
    setMsg("Now Your Turn");
    setCurrentTeam(prevTeam => (prevTeam === 'teamA' ? 'teamB' : 'teamA')); // Switch team
    resetQuiz(); // Reset quiz for the next round
  };

  useEffect(() => {
    startTimer(); // Start the timer when the component mounts

    return () => {
      // Cleanup: clear the timeout when the component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Hexagon
      handleHexClick={handleHexClick}
      question={question}
      selectedOption={selectedOption}
      isCorrect={isCorrect}
      handleOptionClick={handleOptionClick}
      resetQuiz={resetQuiz}
      currentTeam={currentTeam}
      hexagonColors={hexagonColors} // Pass the hexagon colors to the Hexagon component
      msg={msg}
    />
  );
};

export default QuizContainer;
