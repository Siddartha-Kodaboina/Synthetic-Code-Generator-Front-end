import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './CodeDisplay.css'; // Ensure the loader CSS is in this file

const CodeDisplay = ({ viewerCode, editorCode, onCodeChange, codeViewerId, codeEditorId }) => {
  const [viewerOutput, setViewerOutput] = useState('');
  const [editorOutput, setEditorOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditorProcessing, setIsEditorProcessing] = useState(false);

  // Function to run code and update the output
  const runCode = async (code, isEditor = false) => {
    if (isEditor) {
      setIsEditorProcessing(true);
    } else {
      setIsProcessing(true);
    }

    try {
      const response = await fetch('http://localhost:8000/api/run-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (isEditor) {
        setEditorOutput(data.output);
      } else {
        setViewerOutput(data.output);
        setEditorOutput(data.output); // Update editor output to match viewer output on initial load or example change
      }
    } catch (error) {
      console.error('Error executing code:', error);
    } finally {
      if (isEditor) {
        setIsEditorProcessing(false);
      } else {
        setIsProcessing(false);
      }
    }
  };

  // Automatically run code for the viewer on page load and when example changes
  useEffect(() => {
    if (viewerCode) {
      runCode(viewerCode, false); // Run code for viewer and set initial outputs
    }
  }, [viewerCode]); // Only runs when viewerCode changes (page load or example change)

  return (
    <div className="code-display">
      {/* Code Viewer Section */}
      <div className="code-section">
        <h4>Generated Code Example (Read-Only)</h4>
        <pre id={codeViewerId} className="code-block">
          {viewerCode}
        </pre>
        <div className="output-section">
          <h5>Code Viewer Output</h5>
          {isProcessing ? (
            <div className="loading-container">
              <span className="loader"></span> {/* Loader animation */}
            </div>
          ) : (
            <pre className="output-block">{viewerOutput}</pre>
          )}
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="editor-section">
        <h4>Edit Code</h4>
        <MonacoEditor
          id={codeEditorId}
          height="300px"
          language="python"
          value={editorCode}
          theme="vs-dark"
          options={{ readOnly: false }}
          onChange={(value) => onCodeChange(value)}
        />
        <button className="submit-btn" onClick={() => runCode(editorCode, true)}>Submit</button>
        <div className="output-section">
          <h5>Code Editor Output</h5>
          {isEditorProcessing ? (
            <div className="loading-container">
              <span className="loader"></span> {/* Loader animation */}
            </div>
          ) : (
            <pre className="output-block">{editorOutput}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
