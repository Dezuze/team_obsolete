import React, { useState, useEffect } from 'react';
import AnimatedButton from './AnimatedButton';
import DarkModeToggle from './DarkModeToggle';
import BackwardsClock from './BackwardsClock';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [themeTransition, setThemeTransition] = useState(false);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  const toggleDarkMode = () => {
    setThemeTransition(true);
    setDarkMode(!darkMode);
    setTimeout(() => setThemeTransition(false), 500);
  };

  useEffect(() => {
    // Set light mode as default instead of system preference
    // const prefersDark = window.matchMedia(
    //   '(prefers-color-scheme: dark)'
    // ).matches;
    // setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
      setMousePos({ x: `${x}%`, y: `${y}%` });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`App modern-ui ${darkMode ? 'dark-mode' : ''} ${
        themeTransition ? 'theme-transition' : ''
      }`}
      style={{
        '--mouse-x': mousePos.x,
        '--mouse-y': mousePos.y,
      }}
    >
      <BackwardsClock darkMode={darkMode} />
      <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
      <div className="button-section">
        <AnimatedButton darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
