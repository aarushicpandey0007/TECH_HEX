import React, { useState } from 'react';
import Header from './components/share/Header';
import Home from './view/Home';
import Quiz from './page/page1/Quiz';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartPlaying = () => {
    setIsPlaying(true); // Switch to Quiz page
  };

  return (
    <div>
      <Header />
      
      <AnimatePresence  mode='wait'>
        {!isPlaying ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}   
            exit={{ opacity: 0, y: -50 }}    
            transition={{ duration: 0.6 }}   
          >
            <Home onStartPlaying={handleStartPlaying} />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 50 }}  
            animate={{ opacity: 1, y: 0 }}   
            exit={{ opacity: 0, y: -50 }}    
            transition={{ duration: 0.6 }}   
          >
            <Quiz />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
