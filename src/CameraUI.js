import React, { useState } from 'react';
import './CameraUI.css';

const CameraUI = ({ onBack }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [gridEnabled, setGridEnabled] = useState(true);

  const handleCameraClick = () => {
    setIsFlashing(true);
    
    // Play camera shutter sound
    const shutterSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    shutterSound.play();

    // Flash effect and download
    setTimeout(() => {
      setIsFlashing(false);
      
      // Download monkey image
      const link = document.createElement('a');
      link.href = 'https://raw.githubusercontent.com/user-attachments/assets/smiling-monkey.jpg';
      link.download = 'smiling-monkey.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
  };

  return (
    <div className="camera-page">
      <div className="camera-ui">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        
        <div className="camera-controls">
          <button 
            className={`camera-control ${flashEnabled ? 'active' : ''}`}
            onClick={() => setFlashEnabled(!flashEnabled)}
            title="Toggle Flash"
          >
            {flashEnabled ? '⚡' : '⚡️'}
          </button>
          <button 
            className={`camera-control ${gridEnabled ? 'active' : ''}`}
            onClick={() => setGridEnabled(!gridEnabled)}
            title="Toggle Grid"
          >
            #
          </button>
        </div>

        <div className={`camera-frame ${gridEnabled ? 'with-grid' : ''}`}>
          {gridEnabled && (
            <div className="grid-lines">
              <div className="grid-line vertical"></div>
              <div className="grid-line vertical"></div>
              <div className="grid-line horizontal"></div>
              <div className="grid-line horizontal"></div>
            </div>
          )}
        </div>

        {flashEnabled && <div className={`camera-flash ${isFlashing ? 'flash' : ''}`}></div>}
        
        <button 
          className="camera-button"
          onClick={handleCameraClick}
        >
          <span className="camera-icon">📸</span>
        </button>
      </div>
    </div>
  );
};

export default CameraUI;
