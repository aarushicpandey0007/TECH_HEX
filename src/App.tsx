import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { approute } from './routes/AppRoute';
function App() {
  return (
   <RouterProvider router={approute}/>
  )
}

export default App

