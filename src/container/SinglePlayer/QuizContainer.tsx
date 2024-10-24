import React, { useState } from 'react';
import Hexagon from '../../view/view1/Hexagon';
import InfoPanel from "../../components/custom/InfoPanel"

const QuizContainer: React.FC = () => {
    const [activeHex, setActiveHex] = useState<number | null>(null); // Track the active hexagon

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
                            <Hexagon
                                key={hexIndex}
                                isActive={isActive}
                                onClick={() => handleHexClick(hexIndex)}
                            />
                        );
                    })}
                </div>
            );
        });
    };

    return (
<div className={`flex items-start justify-center`}>
    <div className='info-panel w-[20%] md:w-[10%] lg:w-[2%] ml-4 md:ml-6 lg:ml-10 mt-20 md:mt-28 lg:mt-52'>
        <InfoPanel />
    </div>

    <div className={`flex flex-col items-center justify-center flex-grow mt-10 md:mt-14 lg:mt-20`}>
        {renderRows(7, 7)}
    </div>
</div>


    );
};

export default QuizContainer;
