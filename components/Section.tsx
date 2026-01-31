import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Interface para as props do componente Section
 */
interface SectionProps {
  id: string;               // ID HTML para navegação (âncoras)
  className?: string;       // Classes CSS adicionais
  children: ReactNode;      // Conteúdo principal da seção
  title?: string;           // Título opcional da seção
  subtitle?: string;        // Subtítulo opcional
}

/**
 * Componente Section (Seção Genérica)
 * 
 * Este componente atua como um "container" padrão para todas as seções do site (Sobre, Projetos, etc.).
 * Ele centraliza o conteúdo, padroniza o espaçamento (padding) e gerencia a animação de entrada do título.
 * 
 * Otimização: Usamos React.memo para evitar que a seção inteira seja re-renderizada
 * sem necessidade (por exemplo, quando um modal abre ou fecha).
 */
const Section: React.FC<SectionProps> = React.memo(({ id, className = '', children, title, subtitle }) => {
  return (
    <section id={id} className={`py-20 relative ${className}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Renderiza o cabeçalho da seção SOMENTE se houver título ou subtítulo */}
        {(title || subtitle) && (
          <motion.div 
            // Animação de entrada: aparece de baixo para cima (y: 20 -> 0) e ganha opacidade
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}: Anima apenas na PRIMEIRA vez que aparece na tela
            // margin: "-10%": Começa a animar quando 10% do elemento já estiver visível
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">
                {/* 
                  Efeito de gradiente no texto (bg-clip-text) apenas no modo escuro. 
                  No modo claro, usamos cor sólida para melhor contraste.
                */}
                <span className="bg-clip-text text-slate-900 dark:text-transparent dark:bg-gradient-to-r dark:from-white dark:to-slate-400">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            {/* Linha decorativa abaixo do título */}
            <div className="h-1 w-20 bg-primary mx-auto mt-6 rounded-full" />
          </motion.div>
        )}
        
        {/* Renderiza o conteúdo principal passado como filho */}
        {children}
      </div>
    </section>
  );
});

export default Section;