import React, { useState } from 'react';
import QuizComponent from '../../components/custom/QuizComponent';
import CircularTimer from '../../components/custom/CircularTimmer';

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
    handleHexClick: (e: React.MouseEvent<HTMLDivElement>, isCorrect: boolean | null) => void;
    currentTeam: 'teamA' | 'teamB';
    hexagonColors: { [key: string]: string }; // New prop for hexagon colors
    msg: string | null;
    duration: number; // Duration in seconds
    onComplete: () => void; // Callback when timer completes
    running: boolean;
}

const Hexagon: React.FC<QuizComponentProps> = ({
    handleHexClick,
    resetQuiz,
    handleOptionClick,
    isCorrect,
    selectedOption,
    question,
    currentTeam,
    hexagonColors,
    msg,
    duration, // Duration in seconds
    onComplete, // Callback when timer completes
    running
}) => {
    const [activeHex, setActiveHex] = useState<number | null>(null); // Track the active hexagon

    const hexagonStyle = {
        clipPath: 'polygon(50% 0%, 6.7% 25%, 6.7% 75%, 50% 100%, 93.3% 75%, 93.3% 25%)',
    };

    const renderRows = (totalRows: number, hexCount: number) => {
        return Array.from({ length: totalRows }).map((_, rowIndex) => {
            const isOffset = rowIndex % 2 !== 0; // Offset for every alternate row

            return (
                <div
                    key={rowIndex}
                    className={`flex ${isOffset ? 'translate-x-[50px]' : 'ml-2.5'} -mt-2`}
                >
                    {Array.from({ length: hexCount }).map((_, hexIndexInner) => {
                        const hexIndex = rowIndex * hexCount + hexIndexInner;
                        const isActive = activeHex === hexIndex; // Check if this hexagon is active
                        const hexagonId = `${hexIndex}`; // Generate the hexagon ID

                        // Check if hexagonColors and the specific color exist
                        const backgroundColor =
                            hexagonColors && hexagonColors[hexagonId]
                                ? hexagonColors[hexagonId]
                                : '#d1d5db'; // Default color if not found

                        return (
                            <div
                                key={hexIndex}
                                id={hexagonId}
                                onClick={(e) => {
                                    handleHexClick(e, isCorrect);
                                    setActiveHex(hexIndex); // Set active hexagon on click
                                }}
                                className={`h-[95px] w-[100px] 
                                    inline-block border border-gray-400 -m-1.5 
                                    ${isActive ? 'shadow-2xl transform scale-95' : 'cursor-pointer hover:shadow-lg hover:-translate-y-2'}
                                    transition-all duration-300 ease-in-out`}
                                style={{
                                    ...hexagonStyle, // Spread the hexagon styles
                                    backgroundColor, // Set background color
                                }}
                            ></div>
                        );
                    })}
                </div>
            );
        });
    };

    return (
        <div className="flex justify-between py-10 px-10">
            {/* Left team section */}
            <div className="flex flex-col items-center">
                <div className="flex space-x-5 w-60">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPo94-TeKk0EUaMzKPtCkB5tBTC4e9uigjA&s" alt="obanai" className="h-16 w-16 rounded-full object-cover" />
                    <h1 className="w-full flex flex-col text-3xl font-serif text-white">SK Kaif</h1>
                </div>
                <div
                    className={`transition-opacity duration-500 ${currentTeam === 'teamA' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <div className="timer-container w-full flex flex-col items-center justify-center">
                        <CircularTimer
                            duration={duration} // Set the duration (in seconds) for the timer
                            onComplete={onComplete} // Handle what happens when the timer completes
                            running={running} // Pass the timer running state
                        />
                    </div>
                    <QuizComponent
                        resetQuiz={resetQuiz}
                        handleOptionClick={handleOptionClick}
                        isCorrect={isCorrect}
                        selectedOption={selectedOption}
                        question={question}
                        msg={msg}
                        // currentTeam={currentTeam}    
                    />
                </div>
            </div>

            {/* Hexagon grid section */}
            <div className="flex flex-col items-center mt-20">
                {renderRows(8, 7)}
            </div>

            {/* Right team section */}
            <div className="flex flex-col items-center">
                <div className="flex space-x-5 w-60">
                    <img src="https://us.oricon-group.com/upimg/detail/0/896/img660/775be1206d509afd38fd0489079cdbe1.jpg" alt="obanai" className="h-16 w-16 rounded-full object-cover" />
                    <h1 className="w-full flex flex-col text-3xl font-serif text-white">Gangadhar</h1>
                </div>
                <div
                    className={`transition-opacity duration-500 ${currentTeam === 'teamB' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <div className="timer-container w-full flex flex-col items-center justify-center">
                        <CircularTimer
                            duration={duration} // Set the duration (in seconds) for the timer
                            onComplete={onComplete} // Handle what happens when the timer completes
                            running={running} // Pass the timer running state
                        />
                    </div>
                    <QuizComponent
                        resetQuiz={resetQuiz}
                        handleOptionClick={handleOptionClick}
                        isCorrect={isCorrect}
                        selectedOption={selectedOption}
                        question={question}
                        msg={msg}
                    
                    />
                </div>
            </div>
        </div>
    );
};

export default Hexagon;
