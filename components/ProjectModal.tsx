import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { Project } from '../types';
import Button from './Button';
import { getTagStyle } from '../constants';

/**
 * Interface ProjectModalProps
 * Define as props que controlam o modal.
 */
interface ProjectModalProps {
  project: Project | null; // Projeto selecionado (se null, o modal deve estar fechado)
  onClose: () => void;     // Função para fechar o modal (chamada ao clicar no X ou fora)
}

/**
 * Componente ProjectModal
 * 
 * Exibe os detalhes completos de um projeto em uma janela sobreposta (overlay/modal).
 * Trava o scroll da página enquanto aberto para melhor experiência de uso.
 */
const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  
  // Hook 1: Scroll Lock Otimizado
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      // Dica para o navegador prever animação
      document.body.style.willChange = 'scroll-position'; 
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.willChange = 'auto';
    };
  }, [project]);

  // Hook 2: Tecla ESC (Memoizado para performance)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (project) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, project]);

  // Configuração de Animação "Spring" - Mais sutil e rápida
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: '-45%',
      x: '-50%',
      filter: 'blur(5px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: '-50%',
      x: '-50%',
      filter: 'blur(0px)',
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 350,
        mass: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: '-45%', 
      x: '-50%',
      filter: 'blur(5px)',
      transition: { duration: 0.15, ease: 'easeInOut' } 
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { opacity: 1, backdropFilter: 'blur(8px)', transition: { duration: 0.25 } },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.15 } }
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Overlay: Fundo escuro com Blur Progressivo */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 z-[100] will-change-[opacity,backdrop-filter]"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Modal Card: Compacto e Centralizado */}
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="fixed left-1/2 top-1/2 w-[95vw] max-w-[900px] max-h-[80vh] 
                       bg-white dark:bg-[#0f172a] 
                       text-slate-900 dark:text-slate-100
                       rounded-xl md:rounded-2xl shadow-2xl z-[110]
                       border border-slate-200 dark:border-white/10
                       flex flex-col overflow-hidden will-change-transform" 
          >
            
            {/* Header Fixo com Botão Fechar */}
            <div className="absolute top-0 right-0 left-0 p-3 md:p-4 flex justify-end z-[120] pointer-events-none">
                <button
                onClick={onClose}
                className="pointer-events-auto p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md 
                           hover:bg-slate-100 dark:hover:bg-slate-700 
                           text-slate-500 dark:text-slate-400 
                           rounded-full transition-all duration-200 
                           shadow-sm hover:shadow-md border border-slate-200 dark:border-white/10 group"
                aria-label="Fechar Modal"
                >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            {/* Container de Scroll */}
            <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 p-4 md:p-8">
              
              {/* Header do Conteúdo */}
              <div className="mb-4 md:mb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-3 text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full uppercase tracking-wider"
                >
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse"/>
                  {project.category.replace('-', ' ')}
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 leading-tight"
                >
                  {project.title}
                </motion.h2>
              </div>

              {/* Descrição Principal */}
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-[1.5] mb-6">
                {project.description}
              </p>

              {/* Layout Grid Compacto */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                
                {/* --- Coluna Principal (Esquerda) - 2/3 --- */}
                <div className="lg:col-span-2 space-y-4">
                  
                  {project.details?.problem && (
                    <div className="group rounded-xl bg-red-50/50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 p-4 hover:border-red-200 dark:hover:border-red-500/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-red-100/50 dark:bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
                          <Target size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">O Desafio</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-[1.5]">
                            {project.details.problem}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.details?.solution && (
                    <div className="group rounded-xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 p-4 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                          <Lightbulb size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">A Solução</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-[1.5]">
                            {project.details.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.details?.impact && (
                    <div className="group rounded-xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 p-4 hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                          <TrendingUp size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">Impacto & Resultados</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-[1.5]">
                            {project.details.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* --- Sidebar (Direita) - 1/3 --- */}
                <div className="lg:col-span-1 space-y-4">
                  
                  {/* Botões de Ação - Side by Side em Desktop */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    {project.links.demo && (
                      <Button 
                        href={project.links.demo} 
                        target="_blank" 
                        className="w-full justify-center h-10 text-sm shadow-md shadow-primary/20 hover:shadow-primary/40" 
                        icon={<ExternalLink size={16} />}
                      >
                        Ver Demo
                      </Button>
                    )}
                    {project.links.github && (
                      <Button 
                        href={project.links.github} 
                        target="_blank" 
                        variant="outline"
                        className="w-full justify-center h-10 text-sm border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5" 
                        icon={<Github size={16} />}
                      >
                        Código
                      </Button>
                    )}
                  </div>

                  {/* Tecnologias Tags */}
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2.5">
                      Stack
                      <div className="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded border transition-all duration-200 hover:scale-105 cursor-default ${getTagStyle(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Métricas Chave */}
                  {project.details?.keyMetrics && (
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2.5">
                        Métricas
                        <div className="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
                      </h4>
                      <div className="grid gap-2">
                        {project.details.keyMetrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/5">
                            <div className="w-1 h-1 rounded-full bg-secondary shadow-[0_0_6px_rgba(16,185,129,0.5)] shrink-0" />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-tight">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;