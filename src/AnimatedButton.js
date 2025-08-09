import React, { useState, useEffect, useRef } from 'react';
import './AnimatedButton.css';

const AnimatedButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [eventHistory, setEventHistory] = useState([]);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [isCalculator, setIsCalculator] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('');

  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const handleCalculatorInput = (value) => {
    if (value === '=') {
      try {
        setCalculatorValue(eval(calculatorValue).toString());
      } catch (error) {
        setCalculatorValue('Error');
      }
    } else if (value === 'C') {
      setCalculatorValue('');
    } else {
      setCalculatorValue((prev) => prev + value);
    }
  };

  const handleRandomEvent = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Select random event
    const randomEvents = [
      {
        name: 'Glitch Effect',
        effect: 'glitch',
        duration: 2000,
      },
      {
        name: 'Runaway Button',
        effect: 'runaway',
        duration: 10000,
      },

      {
        name: 'Calculator Mode',
        effect: 'calculator',
        duration: 15000,
      },
    ];

    const randomEvent =
      randomEvents[Math.floor(Math.random() * randomEvents.length)];

    // Log the event
    setEventHistory((prev) => [
      ...prev,
      {
        event: randomEvent.name,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Handle specific effects
    if (randomEvent.effect === 'calculator') {
      setIsCalculator(true);
      setCalculatorValue('');
      setTimeout(() => {
        setIsCalculator(false);
        setIsAnimating(false);
        handleRandomEvent();
      }, randomEvent.duration);
    } else if (randomEvent.effect === 'runaway') {
      setTimeout(() => {
        setIsAnimating(false);
        setButtonPosition({ x: 0, y: 0 });
        handleRandomEvent();
      }, randomEvent.duration);
    } else if (randomEvent.effect === 'glitch') {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        setIsAnimating(false);
        handleRandomEvent();
      }, randomEvent.duration);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
        handleRandomEvent();
      }, randomEvent.duration);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isAnimating && buttonRef.current && !isCalculator) {
        const button = buttonRef.current;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const buttonRect = button.getBoundingClientRect();
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

          const newX = Math.min(
            Math.max(buttonPosition.x + moveX, minX - buttonRect.left),
            maxX - buttonRect.left
          );
          const newY = Math.min(
            Math.max(buttonPosition.y + moveY, minY - buttonRect.top),
            maxY - buttonRect.top
          );

          setButtonPosition({ x: newX, y: newY });
        }
      }
    };

    if (isAnimating && !isCalculator) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAnimating, buttonPosition, isCalculator]);

  const renderCalculator = () => (
    <div className="calculator-ui">
      <div className="calculator-display">{calculatorValue}</div>
      <div className="calculator-buttons">
        {[
          '7',
          '8',
          '9',
          '+',
          '4',
          '5',
          '6',
          '-',
          '1',
          '2',
          '3',
          '*',
          'C',
          '0',
          '=',
          '/',
        ].map((btn) => (
          <button
            key={btn}
            className="calc-button"
            onClick={() => handleCalculatorInput(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="button-container" ref={containerRef}>
        <button
          ref={buttonRef}
          className={`futuristic-button ${isAnimating ? 'active-effect' : ''} ${
            isAnimating && !isCalculator ? 'runaway' : ''
          } ${isGlitching ? 'glitch' : ''} ${
            isCalculator ? 'calculator-mode' : ''
          }`}
          style={{
            transform:
              isAnimating && !isCalculator
                ? `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`
                : 'none',
            position:
              isAnimating && !isCalculator
                ? 'relative'
                : 'static',
            transition:
              isAnimating && !isCalculator
                ? 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                : 'all 0.3s ease',
          }}
          onClick={isCalculator ? undefined : handleRandomEvent}
          disabled={isAnimating && !isCalculator}
        >
          <span className="button-text">
            {isAnimating && !isCalculator ? 'Event Active...' : 'Click Me'}
          </span>
          <div className="button-glow"></div>
          <div className="button-particles"></div>
        </button>

        {isCalculator && renderCalculator()}
      </div>

      {eventHistory.length > 0 && (
        <div className="event-log">
          <h4>Recent Events:</h4>
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
