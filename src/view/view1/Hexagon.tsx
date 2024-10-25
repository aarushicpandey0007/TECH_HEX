import React, { useState } from 'react';
import QuizComponent from '../../components/custom/QuizComponent';

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
    msg
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
        <div className='flex justify-between py-10 px-10'>
            <div>
                <h1 className='w-full flex flex-col items-center text-4xl font-bold text-blue-600'>Team Blue</h1>
                {currentTeam === 'teamA' ? (
                    <QuizComponent
                        resetQuiz={resetQuiz}
                        handleOptionClick={handleOptionClick}
                        isCorrect={isCorrect}
                        selectedOption={selectedOption}
                        question={question}
                        msg={msg}
                    />
                ) : null}
            </div>
            <div className={`flex flex-col items-center mt-20`}>
                {renderRows(8, 7)} 
            </div>
            <div>
                <h1 className='w-full flex flex-col items-center text-4xl font-bold text-yellow-600'>Team Yellow</h1>
                {currentTeam === 'teamB' ? (
                    <QuizComponent
                        resetQuiz={resetQuiz}
                        handleOptionClick={handleOptionClick}
                        isCorrect={isCorrect}
                        selectedOption={selectedOption}
                        question={question}
                        msg={msg}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Hexagon;
