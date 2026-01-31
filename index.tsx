import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

// Busca o elemento raiz no HTML onde o React será injetado
const rootElement = document.getElementById('root');

// Verificação de segurança para TypeScript
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Inicialização da árvore React
const root = createRoot(rootElement);

// Renderização com StrictMode, ThemeProvider e ErrorBoundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);