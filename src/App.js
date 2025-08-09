import React, { useState } from 'react';
import AnimatedButton from './AnimatedButton';
import CameraUI from './CameraUI';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {!showCamera ? (
        <>
          <div
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            onKeyDown={(e) => e.key === 'Enter' && setDarkMode(!darkMode)}
            role="button"
            tabIndex={0}
          >
            <span className="theme-icon">{darkMode ? '🌞' : '🌙'}</span>
          </div>
          <div className="content-wrapper">
            <button 
              className="test-camera-button"
              onClick={() => setShowCamera(true)}
            >
              Test Camera UI
            </button>
            <AnimatedButton />
          </div>
        </>
      ) : (
        <CameraUI onBack={() => setShowCamera(false)} />
      )}
    </div>
  );
}

export default App;
