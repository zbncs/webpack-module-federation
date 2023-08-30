import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
const root = document.getElementById('root').shadowRoot;
// Create a new app root inside the shadow DOM to avoid overwriting stuff (applies to React, too)
const appRoot = document.createElement('div');
appRoot.id = 'app-root';
root.appendChild(appRoot);

ReactDOM.render(<App />, appRoot);
