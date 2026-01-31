import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente ThemeToggle (Botão de Tema)
 * 
 * Este botão permite ao usuário alternar entre os modos Claro (Light) e Escuro (Dark).
 * Ele utiliza o ThemeContext para ler e atualizar o estado global do tema.
 */
const ThemeToggle: React.FC = () => {
  // Hook customizado que nos dá acesso ao tema atual ('light' ou 'dark')
  // e à função para trocar o tema.
  const { theme, toggleTheme } = useTheme();
  
  // Variável auxiliar para verificar se é modo escuro de forma mais legível
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      // Classes CSS:
      // 'relative overflow-hidden': para conter animações dentro do botão
      // 'transition-colors': para suavizar a mudança de cor de fundo
      // 'dark:...': estilos específicos para quando o modo escuro está ativo
      className="relative p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none w-10 h-10 flex items-center justify-center overflow-hidden"
      aria-label="Alternar Tema" // Importante para acessibilidade (leitores de tela)
    >
      {/* 
        AnimatePresence permite animar componentes quando eles estão SAINDO da tela (unmounting).
        mode="wait": aguarda a animação de saída terminar antes de começar a de entrada.
      */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme} // O 'key' muda (light/dark), forçando o React a recriar o componente e disparar animação
          initial={{ opacity: 0, rotate: -45 }} // Estado inicial (invisível e rodado)
          animate={{ opacity: 1, rotate: 0 }}    // Estado final (visível e reto)
          exit={{ opacity: 0, rotate: 45 }}      // Estado de saída (invisível e rodado pro outro lado)
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            // Ícone da Lua para modo escuro
            <Moon size={20} />
          ) : (
             // Ícone do Sol para modo claro
            <Sun size={20} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;