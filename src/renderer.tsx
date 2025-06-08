// src/renderer.ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './renderer/App';
import { Provider } from 'react-redux';
import { store } from './renderer/app/store';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('❌ Failed to find root element in index.html');
}
