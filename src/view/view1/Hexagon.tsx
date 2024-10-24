import React, { useState } from 'react';

const Hexagon: React.FC = () => {
    const [activeHex, setActiveHex] = useState<number | null>(null); // Track the active hexagon

    const hexagonStyle = {
        clipPath: 'polygon(50% 0%, 6.7% 25%, 6.7% 75%, 50% 100%, 93.3% 75%, 93.3% 25%)',
    };

    const handleHexClick = (index: number) => {
        // Toggle active hexagon
        setActiveHex(prevActive => (prevActive === index ? null : index));
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
                        // Calculate unique index for each hexagon
                        const hexIndex = rowIndex * hexCount + hexIndexInner;
                        const isActive = activeHex === hexIndex; // Check if this hexagon is active

                        return (
                            <div
                                key={hexIndex}
                                style={hexagonStyle}
                                onClick={() => handleHexClick(hexIndex)}
                                className={`h-[95px] w-[100px] 
                                    inline-block border border-gray-400 -m-1.5 
                                    ${isActive ? 'bg-red-500 shadow-2xl transform scale-95' : 'bg-gray-300 cursor-pointer hover:bg-red-500 hover:shadow-lg hover:-translate-y-2'}
                                    transition-all duration-300 ease-in-out`}
                            ></div>
                        );
                    })}
                </div>
            );
        });
    };

    return (
        <div className={`flex flex-col items-center mt-20`}>
            {renderRows(7, 7)}
        </div>
    );
};

export default Hexagon;
