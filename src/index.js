import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import Tailwind CSS
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Start measuring performance, useful if you plan to integrate analytics later.
// You can uncomment the line below and log performance metrics to the console or send to an endpoint
// reportWebVitals(console.log);

