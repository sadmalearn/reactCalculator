import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import History from './components/History';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const App = () => {
  const [theme, setTheme] = useState('light');
  const error = useSelector((state) => state.calculator.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app-layout ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <div className="calculator-container">
        <Display />
        <Keypad />
      </div>

      <History />

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
