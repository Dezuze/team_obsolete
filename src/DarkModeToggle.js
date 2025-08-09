import React from 'react';
import PropTypes from 'prop-types';
import './DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, onToggle }) => {
  return (
    <button
      className={`dark-mode-toggle ${darkMode ? 'dark' : ''}`}
      onClick={onToggle}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      <span className="dark-mode-icon">{darkMode ? '☀️' : '🌙'}</span>
    </button>
  );
};

DarkModeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DarkModeToggle;
