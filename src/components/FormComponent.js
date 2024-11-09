import React, { useState } from 'react';
import './FormComponent.css';
import '../App.css'

const FormComponent = ({ onGenerate }) => {
  const [urls, setUrls] = useState(['']);

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  const handleSubmit = () => {
    onGenerate(urls);
  };

  return (
    <div className="form-component">
      <h2>Enter URLs</h2>
      {urls.map((url, index) => (
        <input
          key={index}
          type="text"
          placeholder={`URL ${index + 1}`}
          value={url}
          onChange={(e) => handleChange(index, e.target.value)}
          className="url-input"
        />
      ))}
      <button className="add-btn" onClick={handleAddUrl}>Add (+) more URL</button>
      <button className="generate-btn" onClick={handleSubmit}>Generate Synthetic Code</button>
    </div>
  );
};

export default FormComponent;
