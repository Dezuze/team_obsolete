import React, { useState, useEffect, useRef } from 'react';
import './AnimatedButton.css';

const AnimatedButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [eventHistory, setEventHistory] = useState([]);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // Random events that will ONLY occur when button is clicked
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const randomEvents = [
    {
      name: 'Glitch Effect',
      effect: 'glitch',
      duration: 2000,
      message: '🔧 System glitch detected!',
    },
    {
      name: 'Runaway Button',
      effect: 'runaway',
      duration: 10000,
      message: '🏃 Catch me if you can!',
    },
    {
      name: 'Camera Mode',
      effect: 'camera',
      duration: 3000,
      message: '📸 Say cheese!',
    },
  ];

  const handleCameraClick = () => {
    setIsFlashing(true);

    // Play camera shutter sound
    const shutterSound = new Audio(
      'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'
    );
    shutterSound.play();

    // Flash effect
    setTimeout(() => {
      setIsFlashing(false);

      // Download monkey image
      const link = document.createElement('a');
      link.href =
        'https://raw.githubusercontent.com/user-attachments/assets/smiling-monkey.jpg';
      link.download = 'smiling-monkey.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset camera mode after capture
      setTimeout(() => {
        setIsCameraMode(false);
        setIsAnimating(false);
      }, 1000);
    }, 500);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (
        isAnimating &&
        buttonRef.current &&
        !isCameraMode
      ) {
        const button = buttonRef.current;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const buttonRect = button.getBoundingClientRect();

        // Calculate the center of the button
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        // Calculate the direction to move away from the cursor
        const deltaX = buttonCenterX - mouseX;
        const deltaY = buttonCenterY - mouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 250) {
          // Only move if cursor is within 250px
          // Calculate smooth movement based on distance
          const intensity = Math.max(0.1, (250 - distance) / 250);
          const moveX = (deltaX / distance) * 15 * intensity;
          const moveY = (deltaY / distance) * 15 * intensity;

          // Keep strictly within screen bounds with padding
          const padding = 20;
          const maxX = window.innerWidth - buttonRect.width - padding;
          const maxY = window.innerHeight - buttonRect.height - padding;
          const minX = padding;
          const minY = padding;

          const newX = Math.min(Math.max(buttonPosition.x + moveX, minX - buttonRect.left), maxX - buttonRect.left);
          const newY = Math.min(Math.max(buttonPosition.y + moveY, minY - buttonRect.top), maxY - buttonRect.top);

          setButtonPosition({ x: newX, y: newY });
        }
      }
    };

    if (isAnimating && !isCameraMode) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAnimating, buttonPosition, isCameraMode]);

  // This function ONLY triggers when button is clicked
  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Select random event - ONLY happens on click
    const randomEvent =
      randomEvents[Math.floor(Math.random() * randomEvents.length)];

    // Log the event (only when clicked)
    setEventHistory((prev) => [
      ...prev,
      {
        event: randomEvent.name,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Show event message immediately when clicked
    alert(randomEvent.message);

    // Handle specific effects
    if (randomEvent.effect === 'camera') {
      setIsCameraMode(true);
    } else if (randomEvent.effect === 'runaway') {
      // For runaway effect, the button will move away from cursor
      // The useEffect will handle the mouse movement tracking
      setTimeout(() => {
        setIsAnimating(false);
        setButtonPosition({ x: 0, y: 0 }); // Reset position after runaway ends
      }, randomEvent.duration);
    } else {
      // Apply visual effect for the duration
      setTimeout(() => {
        setIsAnimating(false);
      }, randomEvent.duration);
    }
  };

  return (
    <>
      <div className="button-container" ref={containerRef}>
        <button
          ref={buttonRef}
          className={`futuristic-button ${isAnimating ? 'active-effect' : ''} ${
            isCameraMode ? 'camera-mode' : ''
          } ${isAnimating && !isCameraMode ? 'runaway' : ''}`}
          style={{
            transform: isAnimating && !isCameraMode
              ? `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`
              : 'none',
            position: isAnimating && !isCameraMode ? 'relative' : 'static',
            transition: isAnimating && !isCameraMode ? 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'all 0.3s ease'
          }}
          onClick={isCameraMode ? handleCameraClick : handleClick}
          disabled={isAnimating && !isCameraMode}
        >
          <span className="button-text">
            {isAnimating && !isCameraMode ? 'Event Active...' : 'Click Me'}
          </span>
          <div className="button-glow"></div>
          <div className="button-particles"></div>
        </button>
      </div>

      {isCameraMode && (
        <div className="camera-ui">
          <div className="camera-frame"></div>
          <div className={`camera-flash ${isFlashing ? 'flash' : ''}`}></div>
        </div>
      )}

      {/* Show last few events (only from clicks) */}
      {eventHistory.length > 0 && (
        <div className="event-log">
          <h4>Recent Events (Click-Triggered Only):</h4>
          {eventHistory.slice(-3).map((event, index) => (
            <div key={index} className="event-item">
              {event.timestamp}: {event.event}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AnimatedButton;
