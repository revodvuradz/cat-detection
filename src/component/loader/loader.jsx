import React from 'react';
import './style.css'; // Import file CSS untuk styling

const Loader = () => {
  return (
    <div id="wifi-loader" className="bg-gray-200 items-center">
      <svg viewBox="0 0 86 86" className="circle-outer">
        <circle r="40" cx="43" cy="43" className="back"></circle>
        <circle r="40" cx="43" cy="43" className="front"></circle>
        <circle r="40" cx="43" cy="43" className="new"></circle>
      </svg>
      <svg viewBox="0 0 60 60" className="circle-middle">
        <circle r="27" cx="30" cy="30" className="back"></circle>
        <circle r="27" cx="30" cy="30" className="front"></circle>
      </svg>
      <div data-text="Loading..." className="text"></div>
    </div>
  );
};

export default Loader;
