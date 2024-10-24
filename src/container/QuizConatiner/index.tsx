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
  const [msg,setMsg]=useState<string | null>(null);
  const [touch, setTouch] = useState<boolean | null>(false);
  


  const question: Question = {
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Update the selected option
    console.log("Selected option:", option);

    const isCorrectOption = option === question.correctAnswer; // Check if the selected option is correct
    setIsCorrect(isCorrectOption);
    console.log("Is correct option:", isCorrectOption); // Update the correctness state

    // Check if there was a previous hexagon click event
    if (lastHexagonId.current) {
      const hexagonId = lastHexagonId.current; // Get the last clicked hexagon ID
      console.log('Handle option - Last clicked hexagon ID:', hexagonId);

      // Create a mock event to pass to handleHexClick
      const mockEvent = {
        currentTarget: {
          id: hexagonId,
          style: {}, // You can initialize any styles you expect to manipulate
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
   
    startTimer(); // Reset the timer to 5 seconds
    setMsg("Now your Turn")
  };

  // Function to handle hexagon clicks
  const handleHexClick = (e: React.MouseEvent<HTMLDivElement>, isCorrectOption: boolean | null) => {
    
    setMsg("")
    const hexagonId = e.currentTarget.id; // Access the ID of the clicked element
    lastHexagonId.current = hexagonId; // Store the hexagon ID for later reference
    console.log('Clicked hexagon ID:', hexagonId);

    // Clear existing timeout when an option is clicked
   
    // Change color based on correctness
    if (isCorrectOption) {
      // Set the color for the clicked hexagon based on the current team
      setMsg("correct!!")
      setHexagonColors(prevColors => ({
        ...prevColors,
        [hexagonId]: currentTeam === 'teamA' ? 'red' : 'yellow',
      }));
      
      startTimer();
    } if(isCorrectOption===false) {
      setMsg("Now Your Turn")
      setHexagonColors(prevColors => ({
        ...prevColors,
        [hexagonId]: 'gray', // Example color for incorrect answers
      }));
      handleWrongAnswer();
    }
   
    
    // Start a new timer
    setIsCorrect(null);
   // Call the function to start the timer
  };

  const startTimer = () => {
    // Clear any existing timer
    console.log("hii")
    if (timeoutRef.current) {
     
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleWrongAnswer();
      console.log("boom")
    }, timer * 1000); // Set timeout in milliseconds
  };

  const handleWrongAnswer = () => {
    setCurrentTeam((prevTeam) => (prevTeam === 'teamA' ? 'teamB' : 'teamA'));
    resetQuiz(); // Reset quiz after a wrong answer
  };

  
  useEffect(() => {
   startTimer();
   return () => {
    // Cleanup: Clear the timeout when the component unmounts
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
