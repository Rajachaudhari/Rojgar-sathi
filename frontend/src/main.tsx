import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
