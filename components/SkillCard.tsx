import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';

/**
 * Interface de Propriedades do Card de Habilidade
 */
interface SkillCardProps {
  skill: Skill;     // Objeto contendo dados da habilidade (nome, ícone, descrição)
  index: number;    // Índice do card na lista (usado para escalonar animações)
}

/**
 * Componente SkillCard
 * 
 * Exibe uma habilidade individual com ícone e nome.
 * É renderizado dentro de um grid no componente Skills.
 * 
 * Otimização de Performance:
 * Usamos React.memo para garantir que este card só seja re-renderizado
 * se as propriedades 'skill' ou 'index' mudarem.
 * Isso é vital em listas longas para evitar travamentos.
 */
const SkillCard: React.FC<SkillCardProps> = memo(({ skill, index }) => {
  return (
    <motion.div
      // Animação de entrada escalonada (stagger):
      // Cada card aparece um pouquinho depois do anterior (index * 0.03 segundos)
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group flex flex-col items-center text-center p-6 rounded-2xl 
                 border border-slate-200 dark:border-white/10 
                 hover:border-primary/50 dark:hover:border-primary/50 
                 transition-all duration-300 h-full justify-between"
    >
      <div className="flex flex-col items-center w-full">
        {/* Container do ícone com efeito de hover (zoom e levitação) */}
        <div className="w-14 h-14 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
          <img 
            src={skill.iconUrl} 
            alt={`Ícone ${skill.name}`}
            className="w-full h-full object-contain drop-shadow-sm" 
            // loading="lazy": Adia o carregamento da imagem até que ela esteja perto de aparecer na tela
            // Economiza dados e acelera o carregamento inicial da página
            loading="lazy"
            width="56"
            height="56"
          />
        </div>
        
        {/* Nome da Habilidade */}
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          {skill.name}
        </h4>
      </div>
      
      {/* Descrição opcional (renderização condicional) */}
      {skill.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          {skill.description}
        </p>
      )}
    </motion.div>
  );
});

export default SkillCard;