import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

// Error Boundary para capturar erros críticos e evitar a "tela preta"
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ef4444', backgroundColor: '#ffffff', height: '100vh', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ops! Algo deu errado.</h1>
          <p>Tente recarregar a página.</p>
          <pre style={{ marginTop: '1rem', background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', textAlign: 'left', fontSize: '0.875rem', color: '#374151' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

// Busca o elemento raiz no HTML onde o React será injetado
const rootElement = document.getElementById('root');

// Verificação de segurança para TypeScript
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Inicialização da árvore React
const root = ReactDOM.createRoot(rootElement);

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