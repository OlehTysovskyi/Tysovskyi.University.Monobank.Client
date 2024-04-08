import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/styles.css";
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/authContext';
import Navigation from "./components/Navigation";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
