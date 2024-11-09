import React from 'react';
import './ExampleSelector.css';

const ExampleSelector = ({ examples, onSelect, activeIndex }) => {
  return (
    <div className="example-selector">
      <h3>Results</h3>
      {examples.map((example, index) => (
        <div
          key={index}
          className={`example-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          {example.title}
        </div>
      ))}
    </div>
  );
};

export default ExampleSelector;
