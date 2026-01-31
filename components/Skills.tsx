import React, { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DATA } from '../constants';
import SkillCard from './SkillCard';

/**
 * Componente Skills (Seção de Habilidades Técnicas)
 * 
 * Exibe as habilidades organizadas por abas (categorias).
 * Ex: Linguagens, Ferramentas, Bibliotecas.
 * 
 * A troca de abas é animada com framer-motion.
 */
const Skills: React.FC = () => {
  // Estado para armazenar o ID da aba ativa (começa com a primeira da lista)
  const [activeTabId, setActiveTabId] = useState(SKILLS_DATA[0].id);

  // Encontra os dados (título, items) da categoria ativa basedo no ID selecionado
  const activeCategory = SKILLS_DATA.find(cat => cat.id === activeTabId) || SKILLS_DATA[0];

  return (
    <Section id="skills" title="Habilidades Técnicas" subtitle="Stack tecnológica otimizada para análise de dados e desenvolvimento de soluções escaláveis.">
      
      {/* Área de Navegação das Abas */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {SKILLS_DATA.map((category) => {
          // Verifica se esta é a aba ativa no momento
          const isActive = activeTabId === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveTabId(category.id)}
              // Classes condicionais:
              // Se ativa: texto escuro/branco e borda sólida
              // Se inativa: texto cinza e borda clara
              className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/50 border ${
                isActive 
                  ? 'text-slate-900 dark:text-white border-slate-900 dark:border-white' 
                  : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {category.title}
            </button>
          );
        })}
      </div>

      {/* Grid de Cards da Categoria Ativa */}
      {/* min-h-[400px] evita que a página "pule" de tamanho quando troca de aba */}
      <div className="min-h-[400px]">
        {/* 
          AnimatePresence gerencia as animações de entrada e saída.
          mode="popLayout": faz o elemento que sai "dar espaço" imediatamente para o que entra,
          prevenindo bugs de layout em listas animadas.
        */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTabId} // A chave muda quando trocamos de aba, disparando a animação
            // Animação de entrada e saída suave (fade + slide + scale)
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {activeCategory.items.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default Skills;