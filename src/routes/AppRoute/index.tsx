import HomePage from "../../page/HomePage";
import SearchingPage from "../../page/SearchingPage";
import ModeSelectPage from "../../page/ModeSelectPage";

const { createBrowserRouter } = require('react-router-dom');

export const approute = createBrowserRouter([
    {
      path: '/',
    element: <HomePage/>
    },
    {
      path: '/selectpage',
      element: <ModeSelectPage/>
    },
    {
      path: '/searchingpage',
      element: <SearchingPage/>
    },
   
  ]);
  