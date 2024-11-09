import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core"; 
// import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CopilotKit runtimeUrl="http://localhost:4000/copilotkit">
      <App />
      {/* <CopilotPopup
              instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
              labels={{
                title: "Popup Assistant",
                initial: "Need any help?",
              }}
            /> */}
    </CopilotKit>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
