import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Rendering the app to the DOM
ReactDOM.render(
  // Wrap the app in a BrowserRouter component to enable routing functionality
  <BrowserRouter>
    {/* Enable React Strict Mode for better development practices */}
    <React.StrictMode>
      {/* Render the App component */}
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  // Select the DOM element with an ID of 'root' to render the app
  document.getElementById('root')
);
