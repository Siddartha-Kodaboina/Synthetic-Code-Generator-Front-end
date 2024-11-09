import React, { useState, useEffect } from 'react';
import FormComponent from './components/FormComponent';
import ExampleSelector from './components/ExampleSelector';
import CodeDisplay from './components/CodeDisplay';
import PromptInput from './components/PromptInput'; // Import the new component
import examplesData from './codeExamples.json';


import './App.css';

function App() {
  const [examples, setExamples] = useState([]);
  const [selectedExample, setSelectedExample] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copilotResponse, setCopilotResponse] = useState('');

  useEffect(() => {
    setExamples(examplesData);
    if (examplesData.length > 0) {
      setSelectedExample(examplesData[0]);
      setGeneratedCode(examplesData[0].code);
      setActiveIndex(0);
    }
  }, []);

  const handleSelectExample = (index) => {
    const example = examples[index];
    setSelectedExample(example);
    setGeneratedCode(example.code);
    setActiveIndex(index);
  };

  const handleCodeChange = (newCode) => {
    setGeneratedCode(newCode);
  };

  const handleCopilotResponse = (response) => {
    // setCopilotResponse(response);
    console.log("HELLOW WORLD!")
    // Optionally update the editor code with the response if needed
    // setGeneratedCode(response);
  };

  return (
    
    <div className="App">
      <header className="app-header">
        <h1>Code Generation Tool</h1>
      </header>
      <FormComponent onGenerate={() => {}} />
      <PromptInput onResponse={handleCopilotResponse} /> 
      <div className="results-section">
        <ExampleSelector
          examples={examples}
          onSelect={(index) => handleSelectExample(index)}
          activeIndex={activeIndex}
        />
        <CodeDisplay
          codeViewerId="viewer"
          codeEditorId="editor"
          viewerCode={selectedExample ? selectedExample.code : ''}
          editorCode={generatedCode}
          onCodeChange={handleCodeChange}
        />
      </div>
      {copilotResponse && (
        <div className="copilot-response">
          <h4>Copilot Response</h4>
          <pre>{copilotResponse}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
