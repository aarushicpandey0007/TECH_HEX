import React from 'react';

const Hexagon: React.FC = () => {
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
                    {
                        Array.from({ length: hexCount }).map((_, hexIndex) => (
                            <div
                                key={hexIndex}
                                style={hexagonStyle}
                                className="w-[100px] h-[86.6px] bg-red-500 inline-block border border-gray-400 -m-1.5"
                            ></div>
                        ))
                    }
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col items-center rotate-90 mt-40">
            {renderRows(7, 7)}  {/* 7 rows with 7 hexagons in each */}
        </div>
    );
};

export default Hexagon;
