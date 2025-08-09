import React, { useState, useEffect } from 'react';
import AnimatedButton from './AnimatedButton';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [themeTransition, setThemeTransition] = useState(false);

  const toggleDarkMode = () => {
    setThemeTransition(true);
    setDarkMode(!darkMode);
    setTimeout(() => setThemeTransition(false), 500);
  };

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  return (
    <div
      className={`App modern-ui ${darkMode ? 'dark-mode' : ''} ${
        themeTransition ? 'theme-transition' : ''
      }`}
    >
      <div className="theme-toggle-wrapper">
        <button
          className="theme-toggle-button"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <div className="theme-toggle-slider">
            <span className="theme-icon">{darkMode ? '🌙' : '☀️'}</span>
            <span className="theme-text">{darkMode ? 'Dark' : 'Light'}</span>
          </div>
        </button>
      </div>
      <div className="button-section">
        <AnimatedButton darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
