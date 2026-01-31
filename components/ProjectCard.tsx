import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { getTagStyle } from '../constants';

/**
 * Interface ProjectCardProps
 * Define os dados que o card precisa receber para funcionar.
 */
interface ProjectCardProps {
  project: Project;                 // Objeto com todos os dados do projeto (título, imagem, links)
  index: number;                    // Posição do card na lista (0, 1, 2...) usado para criar o efeito "escada" na animação
  onClick: (project: Project) => void; // Função que o pai (Projects.tsx) passa para saber quando o card foi clicado
}

/**
 * Componente ProjectCard
 * 
 * Representa um único projeto na grade de projetos.
 * Ele exibe a imagem, título, descrição curta, tags e links.
 * Ao clicar no card, ele chama a função onClick para abrir o modal de detalhes.
 * 
 * Otimizações de Performance:
 * 1. React.memo: Evita re-renderizar o card se as props não mudarem.
 * 2. Carregamento de imagem otimizado: Usa skeleton loader e loading="lazy".
 * 3. Animações leves: Evita propriedades pesadas como 'layoutId' que podem travar celulares.
 */
// React.memo com comparação rasa (padrão) é suficiente aqui pois passamos objetos estáveis
const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, index, onClick }) => {
  // Estado local para controlar se a imagem já carregou
  // Usado para trocar o esqueleto cinza pela imagem real suavemente
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.article
      // Animação de Entrada:
      // initial: começa invisível e deslocado 20px para baixo
      initial={{ opacity: 0, y: 20 }}
      // whileInView: quando aparece na tela, fica visível e sobe para posição 0
      whileInView={{ opacity: 1, y: 0 }}
      // viewport: configura como o observador de scroll funciona
      // once: true -> anima só uma vez (não fica repetindo ao subir/descer)
      // margin: "-10%" -> começa a animar um pouco antes de aparecer totalmente
      viewport={{ once: true, margin: "-10%" }} 
      // transition: duração e delay baseado no índice (efeito cascata)
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      
      // Ao clicar no card, avisa o componente pai passando o projeto atual
      onClick={() => onClick(project)}
      
      // Classes de estilo (Tailwind CSS)
      // group: permite estilizar filhos baseado no hover do pai
      // cursor-pointer: mostra a mãozinha indicando que é clicável
      // hover:-translate-y-1: efeito sutil de subir ao passar o mouse
      className="group rounded-2xl overflow-hidden 
                 border border-slate-200 dark:border-white/10 
                 hover:border-primary/50 dark:hover:border-primary/50 
                 transition-all duration-300 flex flex-col h-full cursor-pointer 
                 hover:-translate-y-1"
    >
      {/* Container da Imagem (Topo do Card) */}
      <div className="relative h-48 overflow-hidden border-b border-slate-100 dark:border-white/5 bg-slate-200 dark:bg-slate-800">
        
        {/* Overlay gradiente para melhorar contraste do texto sobre a imagem (se houvesse) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10 opacity-60 pointer-events-none" />
        
        {/* Imagem do Projeto */}
        <motion.img 
          src={project.image} 
          alt={project.title} 
          // loading="lazy": O navegador só baixa a imagem quando ela estiver perto de aparecer
          loading="lazy"
          decoding="async" // Decodifica a imagem em paralelo para não travar a thread principal
          width="800"
          height="400"
          // Quando terminar de baixar, atualiza o estado para mostrar a imagem
          onLoad={() => setIsImageLoaded(true)}
          
          // Pequena animação de fade-in quando e imagem carrega
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          
          // Efeito de zoom suave na imagem quando passa o mouse no card (group-hover)
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Skeleton Loader: Caixa cinza pulsante mostrada enquanto a imagem não carrega */}
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-slate-700 z-0" />
        )}

        {/* Badge de Categoria (ex: "Data Science") no canto superior direito */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 uppercase tracking-wider text-primary dark:text-secondary shadow-sm">
            {project.category.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Corpo do Card (Texto e Informações) */}
      <div className="p-6 flex flex-col flex-grow text-center">
        {/* Título do Projeto */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        {/* Descrição limitada a 3 linhas (line-clamp-3) */}
        <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags Tecnológicas (ex: Python, React) */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {/* Mostra apenas as 4 primeiras tags para não poluir o card */}
          {project.tags.slice(0, 4).map(tag => (
            <span 
              key={tag} 
              className={`text-xs font-semibold font-mono px-2 py-1 rounded border ${getTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Métricas (se existirem) - Ex: Acurácia 99% */}
        {project.metrics && (
          <div className="flex items-center justify-between gap-4 mb-6 px-2">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400 mb-1">
                  <div className="text-primary">{metric.icon}</div>
                  <span className="text-[10px] uppercase tracking-wider font-bold">{metric.label}</span>
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rodapé do Card (Links) */}
        {/* mt-auto empurra esta div para o final do card, garantindo alinhamento mesmo se o texto for curto */}
        <div className="mt-auto flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4">
          <div className="flex gap-4">
            
            {/* Link para o Github (se existir) */}
            {project.links.github && (
              // stopPropagation é CRUCIAL aqui:
              // Impede que o clique no ícone do Github abra o modal de detalhes (que é o comportamento padrão do card inteiro)
              <div className="text-slate-400 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors p-1" onClick={(e) => e.stopPropagation()}>
                <a href={project.links.github} target="_blank" rel="noopener" aria-label="Github Repo">
                    <Github size={20} />
                </a>
              </div>
            )}
            
            {/* Link para Demo Online (se existir) */}
            {project.links.demo && (
              <div className="text-slate-400 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors p-1" onClick={(e) => e.stopPropagation()}>
                 <a href={project.links.demo} target="_blank" rel="noopener" aria-label="Live Demo">
                    <ExternalLink size={20} />
                 </a>
              </div>
            )}
          </div>
          
          {/* Botão "Detalhes" (apenas visual, pois o clique no card já abre) */}
          <span className="text-sm font-semibold text-primary flex items-center gap-1 group/link">
            Detalhes <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.article>
  );
});

export default ProjectCard;