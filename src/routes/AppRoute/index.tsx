import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from '../../view/Home';
import MultiQuizPage from '../../page/multiPlayer/MultiQuizPage';
import SingleQuizPage from '../../page/singlePlayer/SingleQuizPage';
import ModeSelectPage from '../../page/ModeSelectPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // No need for AnimatePresence here
  },
  {
    path: '/singleplayer/quiz',
    element: (
      <AnimatePresence mode='wait'>
        <motion.div
          key="single-quiz" // Unique key for this route
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <SingleQuizPage />
        </motion.div>
      </AnimatePresence>
    ),
  },
  {
    path: '/multiplayer/quiz',
    element: (
      <AnimatePresence mode='wait'>
        <motion.div
          key="multi-quiz" // Unique key for this route
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <MultiQuizPage />
        </motion.div>
      </AnimatePresence>
    ),
  },
  {
    path: '/mode',
    element: (
      <AnimatePresence mode='wait'>
        <motion.div
          key="mode-select" // Unique key for this route
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <ModeSelectPage />
        </motion.div>
      </AnimatePresence>
    ),
  },
]);

export default router;
