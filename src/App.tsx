
import Header from './components/share/Header';

import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoute';

function App() {
 
  return (
    <div>
    <Header />
    <RouterProvider router={router} />
  </div>
  );
}

export default App;
