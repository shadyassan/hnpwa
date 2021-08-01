import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppProvider';

render(
  <AppContextProvider>
    <Router>
      <App />
    </Router>
  </AppContextProvider>,
  document.getElementById('root')
);
