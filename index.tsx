import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Basic Service Worker Registration for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // In a real build environment, this would point to a generated sw.js
    // navigator.serviceWorker.register('/service-worker.js').catch(err => {
    //   console.log('SW registration failed: ', err);
    // });
    console.log("Service Worker capability detected. Ready for PWA configuration.");
  });
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);