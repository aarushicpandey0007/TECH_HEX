import React from 'react'
import { motion } from 'framer-motion';

type SelectProps = {
  firstText?:string;
  lastText?:string;
  command?: string; 
 
};
const SelectBox = ({firstText,lastText,command}:SelectProps) => {
 
  return (
    <motion.div 
    className="lg:p-10 md:p-6 p-5 rounded-3xl bg-gradient-to-r from-blue-400 via-pink-400 to-red-300 text-center shadow-lg"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
  >
    <h1 className="text-6xl font-bold text-yellow-200 drop-shadow-lg">
      {firstText}
    </h1>
    <h2 className="text-6xl font-bold text-yellow-200 drop-shadow-lg mt-2">
      {lastText}
    </h2>
    <p className="text-white text-2xl mt-4">4.20.20</p>
    <button className="mt-6 px-6 py-2 bg-white bg-opacity-30 text-white rounded-full hover:bg-opacity-50 transition-all">
      {command} →
    </button>
  </motion.div>
  )
}

export default SelectBox