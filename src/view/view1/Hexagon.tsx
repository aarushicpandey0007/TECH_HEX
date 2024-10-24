import React from 'react';

interface HexagonProps {
    isActive: boolean;
    onClick: () => void;
}

const hexagonStyle = {
    clipPath: 'polygon(50% 0%, 6.7% 25%, 6.7% 75%, 50% 100%, 93.3% 75%, 93.3% 25%)',
};

const Hexagon: React.FC<HexagonProps> = ({ isActive, onClick }) => {
    return (
        <>
            <div
                style={hexagonStyle}
                onClick={onClick}
                className={`h-[95px] w-[100px] 
                inline-block border border-gray-400 -m-1.5 
                ${isActive ? 'bg-red-500 shadow-2xl transform scale-95' : 'bg-gray-300 cursor-pointer hover:bg-red-500 hover:shadow-lg hover:-translate-y-2'}
                transition-all duration-300 ease-in-out`}
            ></div>
        </>
    );
};

export default Hexagon;
