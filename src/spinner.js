import React from 'react';
import './spinner.css'; // Make sure to create this CSS file

const Spinner = ({count}) => {
  return (
    <div className='align'>
        <div className="spinner"></div>
        {count}/10 LOADED
    </div>
  );
}

export default Spinner;
