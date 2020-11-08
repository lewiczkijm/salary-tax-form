import './App.scss';
// @ts-ignore
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
            <label className="custom-control-label" htmlFor="customSwitch1">Toggle this switch element</label>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
