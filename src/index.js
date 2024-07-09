import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContextReducer from './components/ContextReducer';

ReactDOM.render(
  <ContextReducer>
    <App />
  </ContextReducer>,
  document.getElementById('root')
);
