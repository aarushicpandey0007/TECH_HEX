import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HexGrid: React.FC = () => {
  const [hexagons, setHexagons] = useState<Array<string | null>>(
    Array(49).fill(null)
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"A" | "B">("A");
  const [quizQuestion, setQuizQuestion] = useState<{
    question: string;
    answer: string;
    options: string[];
  } | null>(null);
  const [selectedHex, setSelectedHex] = useState<number | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [timer, setTimer] = useState(5);
  const [showOverlay, setShowOverlay] = useState(true);

  const quizQuestions = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      options: ["Paris", "Rome", "Berlin"],
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
      options: ["Earth", "Jupiter", "Mars"],
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
      options: ["Ag", "Au", "Pb"],
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare",
      options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare"],
    },
    {
      question: "What is the smallest prime number?",
      answer: "2",
      options: ["1", "2", "3"],
    },
    {
      question: "What year did the Titanic sink?",
      answer: "1912",
      options: ["1910", "1912", "1914"],
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
    },
  ];

  const startQuiz = () => {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    const question = quizQuestions[randomIndex];
    setQuizQuestion(question);
    setTimer(5);
    setIsQuizActive(true);
  };

  useEffect(() => {
    if (isQuizActive && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (isQuizActive && timer === 0) {
      handleTimeout();
    }
  }, [isQuizActive, timer]);

  const handleTimeout = () => {
    setCurrentPlayer((prev) => (prev === "A" ? "B" : "A"));
    setIsQuizActive(false);
    setSelectedHex(null);
    setQuizQuestion(null);
    setTimer(5);
  };

  const checkWinCondition = (hexIndex: number) => {
    const currentColor = currentPlayer === "A" ? "red" : "yellow";
    const directions = [
      [-1, -7, 1], // Check horizontal
      [-6, -7, -8], // Check diagonal (top-left to bottom-right)
      [-8, -7, -6], // Check diagonal (top-right to bottom-left)
    ];

    for (let i = 0; i < directions.length; i++) {
      const count = directions[i].reduce((acc, step) => {
        let currentIndex = hexIndex + step;
        while (
          currentIndex >= 0 &&
          currentIndex < hexagons.length &&
          hexagons[currentIndex] === currentColor // Check for current player's color
        ) {
          acc += 1;
          currentIndex += step;
        }
        return acc;
      }, 1);

      if (count >= 4) {
        // Win condition met if 4 in a row are found
        setWinner(currentPlayer);
        return;
      }
    }
  };

  const handleAnswer = (answer: string) => {
    if (quizQuestion && selectedHex !== null && !winner) {
      const isCorrect = answer === quizQuestion.answer;
      const newHexagons = [...hexagons];

      if (isCorrect) {
        newHexagons[selectedHex] = currentPlayer === "A" ? "red" : "blue";
        checkWinCondition(selectedHex);
      } else {
        setCurrentPlayer((prev) => (prev === "A" ? "B" : "A")); // Switch player on wrong answer
      }

      setHexagons(newHexagons);
      setIsQuizActive(false);
      setSelectedHex(null); // Reset selected hexagon
      setQuizQuestion(null);
      setTimer(5);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">
      {showOverlay && (
        <div className="h-screen absolute top-0 left-0 text-white flex justify-center items-center w-full z-30 backdrop-blur-3xl">
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-3xl ">Start the game by choosing your own Hex</p>
            <button
              className="px-4 py-2 rounded-3xl bg-black"
              onClick={() => setShowOverlay(false)} // Close overlay on click
            >
              Start a game
            </button>
          </div>
        </div>
      )}
     
      <div className="grid grid-cols-7">
        {hexagons.map((color, index) => {
          const columnIndex = index % 7;

          return (
            <div
              key={index}
              className={`w-[80px] h-[80px] relative transform hover:scale-125 hover transition-all duration-300  
                ${columnIndex % 2 === 1 ? "translate-y-8" : ""}
              `}
              style={{
                top: columnIndex % 2 === 1 ? "1px" : "0px",
              }}
              onClick={() => {
                if (!color && !isQuizActive && !winner) {
                  setSelectedHex(index);
                  startQuiz();
                }
              }}
            >
             
              <div
                className="absolute w-full h-full clip-hexagon  "
                style={{ backgroundColor: color || "white"  }}
                onMouseEnter={(e) => {
                  if (!color && !isQuizActive) {
                    e.currentTarget.style.backgroundColor = "gray";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!color && !isQuizActive) {
                    e.currentTarget.style.backgroundColor = "white";
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {isQuizActive && quizQuestion && (
        <div className="flex justify-center items-center">
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg w-full flex justify-center items-center h-screen">
          <span className="text-3xl font-medium text-white absolute top-3 ">Team {currentPlayer}</span>
            <div className=" bg-white w-[430px] min-h-[340px] rounded-2xl p-4 shadow-lg z-50 flex flex-col justify-center items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-gray-300 flex items-center justify-center relative">
                <p className="text-center text-black absolute">{timer}s</p>
                <motion.div
                  className="absolute inset-0 rounded-full border-4"
                  initial={{
                    borderWidth: "4px",
                    borderColor: "black",
                    borderRadius: "50%",
                  }}
                  animate={{
                    clipPath: [
                      `inset(80% 0% 0% 0%)`,
                      `inset(0% 0% 0% 80%)`,
                      `inset(0% 0% 80% 0%)`,
                      `inset(0% 0% 0% 0%)`,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: 1,
                  }}
                />
              </div>
              <h2 className="text-black text-xl font-medium">
                {quizQuestion.question}
              </h2>
              <div className="mt-4 w-full">
                {quizQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className="block w-full rounded-full bg-gray-200 text-black hover:bg-gray-300  mt-2 p-2"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            
            </div>
          </div>
        </div>
      )}
      {winner && (
        <div className="absolute top-1/4 w-full text-3xl text-white font-bold backdrop-blur-3xl flex justify-center items-center">
          Team {winner} Wins! 🎉🎉🎉🎉
        </div>
      )}
    </div>
  );
};

export default HexGrid;
