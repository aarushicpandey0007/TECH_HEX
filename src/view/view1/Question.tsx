import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Options = {
  a: string;
  b: string;
  c: string;
  d: string;
};

interface QuestionProps {
  question: string;
  options: Options;
}

const Question: React.FC<QuestionProps> = ({ question, options }) => {
  const [timeLeft, setTimeLeft] = useState(5); // 5-second timer

  // Decrease the timer every second
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Circle animation variants
  const circleVariants = {
    initial: { strokeDashoffset: 251.2 }, // Full circle circumference
    animate: { strokeDashoffset: 0 },     // No offset (circle complete)
  };

  return (
    <div id='question' className='w-1/3 m-auto mt-12 border  border-gray-100 p-6 rounded-lg shadow-lg '>
      <div className='flex justify-center mb-4'>
        {/* Timer Circle with SVG and Framer Motion */}
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24">
            <circle
              className="text-gray-300"
              stroke="currentColor"
              fill="transparent"
              strokeWidth="12"
              r="40"
              cx="50%"
              cy="50%"
            />
            <motion.circle
              className="text-sky-400"
              stroke="currentColor"
              fill="transparent"
              strokeWidth="12"
              r="40"
              cx="50%"
              cy="50%"
              strokeDasharray="251.2"
              strokeDashoffset="251.2"
              variants={circleVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 5, ease: 'linear' }} // Complete in 5 seconds
            />
          </svg>
          <span className='absolute text-lg font-bold text-sky-400'>{timeLeft}</span>
        </div>
      </div>

      <h1 className='text-3xl font-semibold text-center text-gray-300 mb-4'>
        Question : {question}</h1>
      <ul className='text-gray-800 space-y-2'>
        <li className='p-2 bg-gray-200 rounded hover:bg-green-300 cursor-pointer'>{options.a}</li>
        <li className='p-2 bg-gray-200 rounded hover:bg-green-300 cursor-pointer'>{options.b}</li>
        <li className='p-2 bg-gray-200 rounded hover:bg-green-300 cursor-pointer'>{options.c}</li>
        <li className='p-2 bg-gray-200 rounded hover:bg-green-300 cursor-pointer'>{options.d}</li>
      </ul>
    </div>
  );
};

export default Question;
