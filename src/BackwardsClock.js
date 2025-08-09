import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BackwardsClock.css';

const BackwardsClock = ({ darkMode }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();

      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      setTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`backwards-clock ${darkMode ? 'dark' : ''}`}>
      <div className="clock-display">
        <span className="clock-label">Backwards Clock:</span>
        <div className="clock-time">{time}</div>
      </div>
      <div className="clock-shadow"></div>
    </div>
  );
};

BackwardsClock.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default BackwardsClock;
