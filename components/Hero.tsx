import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import TypewriterText from './TypewriterText';

/**
 * Componente Hero (Banner Principal)
 * 
 * É a primeira seção que o usuário vê (Landing Page).
 * Contém a apresentação do portfólio, título animado e botões de chamada para ação (CTA).
 * 
 * Performance:
 * Usamos memo() para evitar re-renderizações desnecessárias. Como é um componente estático
 * (não recebe props variáveis), ele só deve renderizar uma vez.
 */
const Hero: React.FC = memo(() => {
  // Array de textos para o efeito de digitação automática
  const roles = ["Analista de Dados", "Data Analyst", "Futuro Engenheiro"];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden z-10">
      
      {/* Otimização: Performance - Efeito de Glow removido para evitar travamentos em mobile */}

      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge "Disponível para projetos" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm font-medium backdrop-blur-sm"
          >
            {/* Bolinha pulsante (Ping animation) */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Disponível para projetos
          </motion.div>

          {/* Título Principal Animate */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-6 text-slate-900 dark:text-white"
          >
            <span>Euller</span>
            <span className="animate-shimmer">.DS</span>
          </motion.h1>

          {/* Componente de Texto Datilografado (que fica trocando os textos de 'roles') */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-12 md:h-16 mb-8 flex items-center justify-center"
          >
            <TypewriterText words={roles} />
          </motion.div>

          {/* Descrição Curta */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-12 leading-relaxed"
          >
            Transformo dados brutos em inteligência de negócio. Especialista em 
            <span className="text-indigo-600 dark:text-indigo-400 font-medium"> Machine Learning</span>, 
            <span className="text-indigo-600 dark:text-indigo-400 font-medium"> Análise Estatística</span> e 
            <span className="text-indigo-600 dark:text-indigo-400 font-medium"> Visualização de Dados</span>.
          </motion.p>

          {/* Botões de Ação (CTA) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button size="md" href="#projects" icon={<ArrowRight className="w-4 h-4" />}>
              Ver Projetos
            </Button>
            <Button variant="outline" size="md" href="#contact">
              Entrar em Contato
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Seta indicando scroll para baixo (apenas desktop) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-500 hidden md:block"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
});

export default Hero;