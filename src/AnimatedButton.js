import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import './AnimatedButton.css';

const AnimatedButton = ({ darkMode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [isCalculator, setIsCalculator] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('');
  const [calculationSteps, setCalculationSteps] = useState('');

  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // Apply dark mode styles
  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.style.background = darkMode
        ? 'linear-gradient(45deg, #2c3e50, #3498db)'
        : 'linear-gradient(45deg, #00d2ff, #3a7bd5)';
    }
  }, [darkMode]);

  const generateUselessResult = () => {
    const uselessResults = [
      '404: Answer not found',
      '🦄 + 🌈 = Magic!',
      'According to my calculations... maybe?',
      'Have you tried turning it off and on again?',
      'Error: Coffee not found',
      '42 (but in a parallel universe)',
      'Loading... Please wait until never',
      'The answer is somewhere between -∞ and +∞',
      'Calculator.exe has stopped working',
      'Your math is now in another castle! 🏰',
      'Calculating... *Windows 95 startup sound*',
      'Result undefined (literally)',
      'Error: Division by cucumber',
      'π² + e = Cake 🍰',
      '✨ Math Magic ✨ (results may vary)',
    ];
    return uselessResults[Math.floor(Math.random() * uselessResults.length)];
  };

  const animateCalculatorButton = (target) => {
    return anime({
      targets: target,
      scale: [1, 0.95, 1],
      duration: 200,
      easing: 'easeInOutQuad',
    }).finished;
  };

  const animateCalculatorResult = () => {
    anime({
      targets: '.calculator-display',
      scale: [1, 1.05, 1],
      duration: 400,
      easing: 'easeInOutElastic(1, .5)',
    });
  };

  const handleCalculatorInput = async (value) => {
    // Animate the clicked button
    const buttons = document.querySelectorAll('.calc-button');
    const button = Array.from(buttons).find((btn) => btn.textContent === value);
    if (button) {
      await animateCalculatorButton(button);
    }

    if (value === '=') {
      // Animate the result display for dramatic effect
      animateCalculatorResult();

      // Generate a useless result
      const uselessResult = generateUselessResult();

      // Add some fake "processing" delay for comedic effect
      await new Promise(resolve => setTimeout(resolve, 800));

      // Show the useless result
      setCalculatorValue(uselessResult);

      // Generate a useless explanation
      const uselessExplanations = [
        'Quantum calculations indicate this is probably right... or left? 🤔',
        'The calculator spirits have spoken! 🔮',
        'I asked ChatGPT and this is what it said...',
        'My pet hamster did the math, blame him 🐹',
        'Calculated using advanced guessing algorithms',
        '60% of the time, it works every time!',
        'Math.random() decided this one',
        'Powered by pure imagination ✨',
        'Results verified by professional coin flip',
      ];
      const explanation = uselessExplanations[Math.floor(Math.random() * uselessExplanations.length)];
      setCalculationSteps(explanation);
    } else if (value === 'C') {
      setCalculatorValue('');
      setCalculationSteps('');
    } else {
      const newValue = value === '*' ? '×' : value === '/' ? '÷' : value;
      setCalculatorValue((prev) => prev + newValue);
      setCalculationSteps('');
    }
  };  const animateGlitch = () => {
    const button = buttonRef.current;
    if (!button) return;

    // Create multiple glitch timelines for more chaotic effect
    const mainTimeline = anime.timeline({
      duration: 2000,
      easing: 'steps(5)',
    });

    // Add rapid position shifts
    mainTimeline.add({
      targets: button,
      keyframes: [
        {
          translateX: -5,
          translateY: 2,
          scale: 1.02,
          filter: 'hue-rotate(45deg)',
          duration: 100,
        },
        {
          translateX: 5,
          translateY: -2,
          scale: 0.98,
          filter: 'hue-rotate(-45deg)',
          duration: 100,
        },
        {
          translateX: -3,
          translateY: -1,
          scale: 1.01,
          filter: 'hue-rotate(90deg)',
          duration: 100,
        },
        {
          translateX: 3,
          translateY: 1,
          scale: 0.99,
          filter: 'hue-rotate(0deg)',
          duration: 100,
        },
        {
          translateX: 0,
          translateY: 0,
          scale: 1,
          filter: 'hue-rotate(0deg)',
          duration: 100,
        },
      ],
      loop: 4,
    });

    // Add color distortion effects
    anime({
      targets: button,
      keyframes: [
        { textShadow: '2px 0 red, -2px 0 blue', duration: 200 },
        { textShadow: '-2px 0 red, 2px 0 blue', duration: 200 },
        { textShadow: 'none', duration: 200 },
      ],
      loop: true,
      direction: 'alternate',
      duration: 1000,
    });

    // Add opacity flicker
    anime({
      targets: button,
      opacity: [
        { value: 1, duration: 50 },
        { value: 0.8, duration: 50 },
        { value: 1, duration: 50 },
        { value: 0.9, duration: 50 },
        { value: 1, duration: 50 },
      ],
      loop: true,
      easing: 'steps(1)',
      duration: 500,
    });

    return mainTimeline.finished;
  };

  const animateCalculator = () => {
    return anime({
      targets: buttonRef.current,
      scale: [1, 0.9, 1.5],
      opacity: [1, 0.8, 1],
      duration: 800,
      easing: 'easeInOutQuad',
    }).finished;
  };

  // Mouse tracking effect for runaway mode
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isAnimating && !isCalculator) {
        moveButtonAwayFromCursor(e.clientX, e.clientY);
      }
    };

    if (isAnimating && !isCalculator) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isAnimating, isCalculator]);

  const handleRandomEvent = async () => {
    if (isAnimating && !isCalculator) return;
    setIsCalculator(false);
    setIsAnimating(true);

    // Select random event
    const randomEvents = [
      {
        name: 'Runaway Button',
        effect: 'runaway',
        duration: 8000,
      },
      {
        name: 'Calculator Mode',
        effect: 'calculator',
      },
      {
        name: 'Glitch Attack',
        effect: 'glitch',
        duration: 5000,
      },
    ];

    const randomEvent =
      randomEvents[Math.floor(Math.random() * randomEvents.length)];

    // Handle specific effects with smooth animations
    try {
      switch (randomEvent.effect) {
      case 'calculator':
        await animateCalculator();
        setIsCalculator(true);
        setCalculatorValue('');
        setCalculationSteps('Ready to calculate! Click Calculate when done! 🧮');
        setIsAnimating(false); // Allow user interaction
        break;

      case 'runaway':
        initializeRunawayMode();
        await new Promise((resolve) => {
          const timeoutId = setTimeout(async () => {
            await stopRunawayMode();
            setIsAnimating(false);
            resolve();
          }, randomEvent.duration);
          return () => clearTimeout(timeoutId);
        });
        break;

      case 'glitch':
        setIsGlitching(true);
        await animateDestructiveGlitch();
        await new Promise((resolve) =>
          setTimeout(() => {
            setIsGlitching(false);
            setIsAnimating(false);
            resolve();
          }, randomEvent.duration)
        );
        break;

      default:
        await new Promise((resolve) =>
          setTimeout(() => {
            setIsAnimating(false);
            resolve();
          }, randomEvent.duration)
        );
        break;
      }
    } finally {
      // Reset state if needed
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    // Randomly trigger glitch effect
    const glitchInterval = setInterval(() => {
      if (!isAnimating && !isCalculator && Math.random() < 0.1) { // 10% chance every 8 seconds
        setIsGlitching(true);
        animateGlitch().then(() => {
          setTimeout(() => {
            setIsGlitching(false);
          }, 2000);
        });
      }
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, [isAnimating, isCalculator]);

  // Clean runaway functionality - viewport constrained
  const initializeRunawayMode = () => {
    const button = buttonRef.current;
    if (!button) return;

    // Get initial button dimensions and center position
    const rect = button.getBoundingClientRect();
    const initialX = window.innerWidth / 2 - rect.width / 2;
    const initialY = window.innerHeight / 2 - rect.height / 2;

    // Set initial position
    setButtonPosition({ x: initialX, y: initialY });

    // Apply absolute positioning
    button.style.position = 'fixed';
    button.style.left = `${initialX}px`;
    button.style.top = `${initialY}px`;
    button.style.transform = 'none';
    button.style.zIndex = '9999';
  };

  const moveButtonAwayFromCursor = (mouseX, mouseY) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Calculate distance from mouse to button center
    const deltaX = buttonCenterX - mouseX;
    const deltaY = buttonCenterY - mouseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Detection radius based on viewport size
    const detectionRadius = Math.min(window.innerWidth, window.innerHeight) * 0.15;

    if (distance < detectionRadius && distance > 0) {
      // Calculate movement direction (away from mouse)
      const moveDistance = 80;
      const moveX = (deltaX / distance) * moveDistance;
      const moveY = (deltaY / distance) * moveDistance;

      // Calculate new position
      let newX = rect.left + moveX;
      let newY = rect.top + moveY;

      // Viewport constraints with padding
      const padding = 10;
      const maxX = window.innerWidth - rect.width - padding;
      const maxY = window.innerHeight - rect.height - padding;

      // Keep button within viewport bounds
      newX = Math.max(padding, Math.min(newX, maxX));
      newY = Math.max(padding, Math.min(newY, maxY));

      // Apply smooth movement
      anime({
        targets: button,
        left: newX,
        top: newY,
        duration: 150,
        easing: 'easeOutQuart',
      });

      setButtonPosition({ x: newX, y: newY });
    }
  };

  const stopRunawayMode = () => {
    const button = buttonRef.current;
    if (!button) return;

    // Smooth return to center
    const centerX = window.innerWidth / 2 - button.offsetWidth / 2;
    const centerY = window.innerHeight / 2 - button.offsetHeight / 2;

    return anime({
      targets: button,
      left: centerX,
      top: centerY,
      duration: 600,
      easing: 'easeInOutQuart',
    }).finished.then(() => {
      // Reset to normal positioning
      button.style.position = 'relative';
      button.style.left = 'auto';
      button.style.top = 'auto';
      button.style.transform = '';
      setButtonPosition({ x: 0, y: 0 });
    });
  };

  const renderCalculator = () => (
    <div className="calculator-ui">
      <div className="calculator-display">
        <div className="calculator-value">{calculatorValue || '0'}</div>
        <div className="calculation-steps">{calculationSteps}</div>
      </div>
      <div className="calculator-controls">
        <button
          className="calc-control-button next-event"
          onClick={handleRandomEvent}
          disabled={isAnimating}
        >
          Next Event
        </button>
        <button
          className="calc-control-button calculate"
          onClick={() => {
            if (calculatorValue) {
              handleCalculatorInput('=');
            }
          }}
          disabled={!calculatorValue}
        >
          Calculate
        </button>
      </div>
      <div
        className="calculator-buttons"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
        }}
      >
        {[
          ['7', '8', '9', '+'],
          ['4', '5', '6', '-'],
          ['1', '2', '3', '×'],
          ['C', '0', '', '÷'],
        ]
          .flat()
          .map((btn) => (
            <button
              key={btn}
              className="calc-button"
              onClick={() => handleCalculatorInput(btn)}
              style={{
                backgroundColor: ['C', '='].includes(btn)
                  ? 'rgba(255, 255, 255, 0.15)'
                  : ['+', '-', '×', '÷'].includes(btn)
                    ? 'rgba(52, 152, 219, 0.3)'
                    : undefined,
              }}
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
          onClick={isCalculator ? undefined : handleRandomEvent}
          disabled={isAnimating && !isCalculator}
        >
          <span
            className="button-text"
            data-text={
              isCalculator
                ? 'Calculate'
                : isAnimating && !isCalculator
                  ? 'Catch me!'
                  : 'Click Me'
            }
          >
            {isCalculator
              ? 'Calculate'
              : isAnimating && !isCalculator
                ? 'Catch me!'
                : 'Click Me'}
          </span>
          <div className="button-glow"></div>
          <div className="button-particles"></div>
        </button>

        {isCalculator && renderCalculator()}
      </div>
    </>
  );
};

AnimatedButton.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default AnimatedButton;
