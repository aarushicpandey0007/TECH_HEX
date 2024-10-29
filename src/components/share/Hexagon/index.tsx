// src/Hexagon.js
import React from 'react';

const Hexagon = () => {
  return (
    <div className="w-12 h-7 bg-white relative mx-1">
      <div className="absolute inset-0 clip-hexagon"></div>
    </div>
  );
};

export default Hexagon;