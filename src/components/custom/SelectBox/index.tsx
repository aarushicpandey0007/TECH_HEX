import React from 'react'
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

type SelectProps = {
  firstText?:string;
  lastText?:string;
  command?: string; 
 
};
const SelectBox = ({firstText,lastText,command}:SelectProps) => {
 
  return (
    <motion.div
    className="relative w-80 h-80  bg-white text-black text-center shadow-lg"
    style={{
      clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
    }}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold drop-shadow-lg">{firstText}</h1>
      <h2 className="text-3xl font-bold drop-shadow-lg mt-2">{lastText}</h2>
      <p className="mt-4 text-2xl">4.20.20</p>
      <NavLink to="/searchingpage">
        <button className="mt-6 px-6 py-2 bg-black bg-opacity-30 text-white rounded-full hover:bg-opacity-100 transition-all">
          {command} →
        </button>
      </NavLink>
    </div>
  </motion.div>
  
  )
}

export default SelectBox