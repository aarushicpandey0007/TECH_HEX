import React, { useState, useEffect } from "react"; 
import { motion } from "framer-motion";

const Single: React.FC = () => {
  const [hexagons, setHexagons] = useState<Array<string | null>>(Array(49).fill(null));
  const [winner, setWinner] = useState<boolean>(false);
  const [quizQuestion, setQuizQuestion] = useState<{
    question: string;
    answer: string;
    options: string[];
  } | null>(null);
  const [selectedHex, setSelectedHex] = useState<number | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [timer, setTimer] = useState(5);
  const [attemptsLeft, setAttemptsLeft] = useState(2);
  const [showOverlay, setShowOverlay] = useState(true);

  const quizQuestions = [
    { question: "What is the capital of France?", answer: "Paris", options: ["Paris", "Rome", "Berlin"] },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter", options: ["Earth", "Jupiter", "Mars"] },
    { question: "What is the chemical symbol for gold?", answer: "Au", options: ["Ag", "Au", "Pb"] },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare", options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare"] },
    { question: "What is the smallest prime number?", answer: "2", options: ["1", "2", "3"] },
    { question: "What year did the Titanic sink?", answer: "1912", options: ["1910", "1912", "1914"] },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"] },
  ];

  useEffect(() => {
    const blockedHexagons = new Set<number>();
    while (blockedHexagons.size < 15) {
      const randomIndex = Math.floor(Math.random() * 49);
      blockedHexagons.add(randomIndex);
    }

    const initialHexagons = hexagons.map((_, index) => 
      blockedHexagons.has(index) ? "gray" : null
    );

    setHexagons(initialHexagons);
  }, []);

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
    setIsQuizActive(false);
    setQuizQuestion(null);
    setTimer(5);
  };

  const checkPath = () => {
    const visited: boolean[] = Array(49).fill(false);
    
    const explore = (index: number) => {
      if (index < 0 || index >= hexagons.length || visited[index] || hexagons[index] !== "red") {
        return;
      }
      visited[index] = true;

      const neighbors = [
        index - 1, index + 1, // Left, Right
        index - 7, index + 7, // Up, Down
        index - 6, index + 6, // Top-Left, Bottom-Right
        index - 8, index + 8  // Top-Right, Bottom-Left
      ];

      for (const neighbor of neighbors) {
        explore(neighbor);
      }
    };

    for (let i = 0; i < 7; i++) {
      if (hexagons[i] === "red") {
        explore(i);
      }
    }

    for (let i = 42; i < 49; i++) {
      if (visited[i]) {
        setWinner(true);
        return;
      }
    }
  };

  const resetGame = () => {
    setHexagons(Array(49).fill(null));
    setWinner(false);
    setQuizQuestion(null);
    setSelectedHex(null);
    setIsQuizActive(false);
    setAttemptsLeft(2);
    setTimer(5);
    setShowOverlay(true);
    
    // Optionally, reset blocked hexagons if needed
    const blockedHexagons = new Set<number>();
    while (blockedHexagons.size < 15) {
      const randomIndex = Math.floor(Math.random() * 49);
      blockedHexagons.add(randomIndex);
    }
    const initialHexagons = Array(49).fill(null).map((_, index) => 
      blockedHexagons.has(index) ? "gray" : null
    );
    setHexagons(initialHexagons);
  };

  const handleAnswer = (answer: string) => {
    if (quizQuestion && selectedHex !== null && !winner) {
      const isCorrect = answer === quizQuestion.answer;

      if (isCorrect) {
        const newHexagons = [...hexagons];
        newHexagons[selectedHex] = "red";
        setHexagons(newHexagons);
        checkPath();
      } else {
        setAttemptsLeft((prev) => prev - 1);
        if (attemptsLeft <= 1) {
          alert("No attempts left! Restarting the game.");
          resetGame(); // Call the reset function
          return; // Exit the function early
        }
      }

      setIsQuizActive(false);
      setSelectedHex(null);
      setQuizQuestion(null);
      setTimer(5);
    }
  };

  const handleSelectHexagon = (index: number) => {
    if (hexagons[index] === null && !isQuizActive && !winner && attemptsLeft > 0) {
      setSelectedHex(index);
      startQuiz();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">
      {showOverlay && (
        <div className="h-screen absolute top-0 left-0 text-white flex justify-center items-center w-full z-30 backdrop-blur-3xl">
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-3xl">Start the game by choosing your own Hex</p>
            <button
              className="px-4 py-2 rounded-3xl bg-black"
              onClick={() => setShowOverlay(false)}
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
                  ${columnIndex % 2 === 1 ? "translate-y-8" : ""}`}
              onClick={() => handleSelectHexagon(index)}
            >
              <div
                className="absolute w-full h-full clip-hexagon"
                style={{ backgroundColor: color || "white", cursor: color === "gray" ? "not-allowed" : "pointer" }}
                onMouseEnter={(e) => {
                  if (color === null && !isQuizActive) {
                    e.currentTarget.style.backgroundColor = "lightgray";
                  }
                }}
                onMouseLeave={(e) => {
                  if (color === null && !isQuizActive) {
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
            <div className="bg-white w-[430px] min-h-[340px] rounded-2xl p-4 shadow-lg z-50 flex flex-col justify-center items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-gray-300 flex items-center justify-center relative">
                <p className="text-center text-black absolute">{timer}s</p>
                <motion.div
                  className="absolute inset-0 rounded-full border-4"
                  initial={{ borderWidth: "4px", borderColor: "black", borderRadius: "50%" }}
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
              <h2 className="text-black text-xl font-medium">{quizQuestion.question}</h2>
              <div className="mt-4 w-full">
                {quizQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className="block w-full rounded-full bg-gray-200 text-black hover:bg-gray-300 mt-2 p-2"
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
          You Win! 🎉🎉🎉🎉
        </div>
      )}
    </div>
  );
};

export default Single;
