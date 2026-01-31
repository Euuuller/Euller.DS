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
  
  // Hook 1: Scroll Lock
  // Trava o scroll da página <body> quando o modal abre (project !== null)
  // Isso evita que o usuário role a página de trás sem querer.
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup function: restaura o scroll quando o modal fecha (desmonta ou project vira null)
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Hook 2: Tecla ESC
  // Fecha o modal se o usuário apertar a tecla ESC do teclado.
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Adiciona o listener apenas se o modal estiver aberto
    if (project) {
      window.addEventListener('keydown', handleEsc);
    }
    
    // Remove o listener para não acumular eventos na memória
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, project]);

  return (
    // AnimatePresence gerencia a animação de SAÍDA do modal (quando project vira null).
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          {/* 
             Overlay Escuro (Fundo)
             - Cobre toda a tela (absolute inset-0)
             - Fecha o modal ao clicar (onClick={onClose})
          */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm will-change-auto"
          />

          {/* 
             Janela do Modal (Card Branco/Escuro)
             - StopPropagation no clique: impede que clicar DENTRO do modal feche ele 
               (pois o clique subiria para o Overlay)
          */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#111] rounded-3xl shadow-2xl scrollbar-hide z-10"
            
            // Animação de Zoom/Scale ao abrir
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Botão Fechar (X) - Fixo no canto superior direito */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="Fechar Modal"
            >
              <X size={20} />
            </button>

            {/* Conteúdo Principal Scrollável */}
            <div className="p-8 md:p-12">
              
              {/* Cabeçalho do Projeto */}
              <div className="mb-8 max-w-3xl">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-primary bg-primary/10 rounded-full uppercase tracking-wider">
                  {project.category.replace('-', ' ')}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
                  {project.title}
                </h2>
              </div>

              {/* Grid de layout: Narrativa (esquerda) e Sidebar (direita) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* --- Coluna Esquerda: Texto Detalhado --- */}
                <div className="lg:col-span-2 space-y-8">
                  <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Renderização Condicional: Só mostra a caixa se o texto existir */}
                  {project.details?.problem && (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3 text-red-600 dark:text-red-400">
                        <Target size={24} />
                        <h3 className="font-bold text-lg">O Desafio</h3>
                      </div>
                      <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                        {project.details.problem}
                      </p>
                    </div>
                  )}

                  {project.details?.solution && (
                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
                        <Lightbulb size={24} />
                        <h3 className="font-bold text-lg">A Solução</h3>
                      </div>
                      <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                        {project.details.solution}
                      </p>
                    </div>
                  )}

                  {project.details?.impact && (
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3 text-green-600 dark:text-green-400">
                        <TrendingUp size={24} />
                        <h3 className="font-bold text-lg">Impacto & Resultados</h3>
                      </div>
                      <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                        {project.details.impact}
                      </p>
                    </div>
                  )}
                </div>

                {/* --- Coluna Direita: Informações Rápidas e Links --- */}
                <div className="space-y-8">
                  {/* Botões de Link */}
                  <div className="flex flex-col gap-3">
                    {project.links.demo && (
                      <Button 
                        href={project.links.demo} 
                        target="_blank" 
                        className="w-full justify-center" 
                        icon={<ExternalLink size={18} />}
                      >
                        Ver Demo Online
                      </Button>
                    )}
                    {project.links.github && (
                      <Button 
                        href={project.links.github} 
                        target="_blank" 
                        variant="outline"
                        className="w-full justify-center dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10" 
                        icon={<Github size={18} />}
                      >
                        Ver Código Fonte
                      </Button>
                    )}
                  </div>

                  {/* Lista de Tecnologias */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-4">
                      Tecnologias
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${getTagStyle(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Métricas em Lista */}
                  {project.details?.keyMetrics && (
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-4">
                        Métricas Chave
                      </h4>
                      <ul className="space-y-3">
                        {project.details.keyMetrics.map((metric, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;