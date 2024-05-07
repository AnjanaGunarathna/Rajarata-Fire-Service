import React from 'react';
import './oppfeed.css';

const Optfeed = () => {
  const handleOptionClick = () => {

    // Redirect to the add page 
    window.location.href = '/add';
  };

  const handleOptionClick1 = () => {
    // Redirect to the add page 
    window.location.href = '/teamfeed';
  };

  return (
    <div className='background'>
    <div className="option-form-container">

      <h2>Select Feedback Option</h2>

      <div className="options-container">
        <button onClick={handleOptionClick}>Fire Protection Service</button>
        <button onClick={handleOptionClick1}>Fire Protection Team</button>
      </div>
    </div>
    </div>
  );
};

export default Optfeed;
