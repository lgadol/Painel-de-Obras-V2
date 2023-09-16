import React from 'react';
import './styles/ProgressBar.css';

const ProgressBar = ({ value }) => {
  return (
    <div className='progress-bar'>
      <div
        className='progress-bar-inner'
        style={{
          width: `${value != null ? value : 0}%`,
        }}
      />
      <span>{value ? `${value}%` : '0%'}</span>
    </div>
  );
};

export default ProgressBar;

