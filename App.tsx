import React, { Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy Loading dos componentes "pesados" ou que estão abaixo da dobra (below the fold).
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Contact = React.lazy(() => import('./components/Contact'));

// Componente de Loading com altura mínima para evitar layout shift brusco
const SectionLoader = () => (
  <div className="min-h-[50vh] flex flex-col justify-center items-center opacity-70 gap-4">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <span className="text-sm text-slate-500 font-medium">Carregando conteúdo...</span>
  </div>
);

/**
 * Componente Raiz da Aplicação.
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-primary/30 selection:text-white transition-colors duration-300 bg-light dark:bg-dark text-slate-900 dark:text-slate-100 bg-grid-pattern">
      <Header />
      <main>
        {/* Hero é renderizado imediatamente (Critical Rendering Path) */}
        <Hero />
        
        {/* O restante é carregado sob demanda ou em background */}
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;