import React, { useState } from 'react';

const Hexagon: React.FC = () => {
    const [startSlide, setStartSlide] = useState(true);  // Assume it starts sliding once it's rendered

    const hexagonStyle = {
        clipPath: 'polygon(50% 0%, 6.7% 25%, 6.7% 75%, 50% 100%, 93.3% 75%, 93.3% 25%)',
    };

    const renderRows = (totalRows: number, hexCount: number) => {
        return Array.from({ length: totalRows }).map((_, rowIndex) => {
            const isOffset = rowIndex % 2 !== 0;
            return (
                <div
                    key={rowIndex}
                    className={`flex ${isOffset ? 'translate-x-[50px]' : 'ml-2.5'} -mt-2`}
                >
                    {Array.from({ length: hexCount }).map((_, hexIndex) => (
                        <div
                            key={hexIndex}
                            style={hexagonStyle}
                            className="w-[100px] h-[86.6px] bg-gray-400 inline-block border border-gray-400 -m-1.5 hover:bg-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out"
                        ></div>
                    ))}
                </div>
            );
        });
    };

    return (
        <div className={`flex flex-col items-center transition-transform duration-700 ease-out ${startSlide ? 'translate-x-0' : '-translate-x-[100vw]'} rotate-90 mt-40`}>
            {renderRows(7, 7)}  {/* 7 rows with 7 hexagons in each */}
        </div>
    );
};

export default Hexagon;
