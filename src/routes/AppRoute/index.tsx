import HomePage from "../../page/HomePage";
import SelectPage from "../../page/SelectPage";

const { createBrowserRouter } = require('react-router-dom');

export const approute = createBrowserRouter([
    {
      path: '/',
    element: <HomePage/>
    },
    {
      path: '/selectpage',
      element: <SelectPage/>
    },
   
  ]);
  