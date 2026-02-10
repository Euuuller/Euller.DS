import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { useScroll } from '../hooks/useScroll';

/**
 * Componente Header (Cabeçalho/Navbar)
 * 
 * Exibe a navegação principal do site, logo e botão de tema.
 * Possui comportamento responsivo:
 * - Desktop: Menu horizontal
 * - Mobile: Botão "hambúrguer" que abre um menu expansível
 * 
 * Também muda de aparência quando o usuário rola a página (efeito glassmorphism).
 */
const Header: React.FC = () => {
  // Hook customizado que retorna true se o usuário rolou mais de 50px
  const isScrolled = useScroll(50);
  
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header 
      // Classes dinâmicas baseadas no scroll:
      // Se rolou a página (isScrolled true): fundo branco/escuro translúcido com blur (efeito vidro) e sombra
      // Se está no topo (isScrolled false): fundo transparente
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark/95 md:bg-white/80 md:dark:bg-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-4 shadow-sm dark:shadow-none' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <a href="#" className="text-2xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-1">
          <span className="text-primary mr-1">&gt;_</span>
          Euller<span className="text-primary"> Duarte</span>
        </a>

        {/* --- NAVEGAÇÃO DESKTOP (escondida em mobile 'hidden md:flex') --- */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors relative group"
            >
              {item.name}
              {/* Linha sublinhada animada que aparece no hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          {/* Divisória vertical decorativa */}
          <div className="h-6 w-px bg-slate-300 dark:bg-white/10 mx-2"></div>
          
          {/* Botão de Alternar Tema (Sol/Lua) */}
          <ThemeToggle />
          
          {/* Botão para o Github */}
          <Button 
            href="https://github.com/Euuuller" 
            target="_blank" 
            size="sm"
            variant="outline"
          >
            GitHub
          </Button>
        </nav>

        {/* --- AÇÕES MOBILE (visível apenas em mobile 'md:hidden') --- */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          
          {/* Botão do Menu Hambúrguer */}
          <button 
            className="text-slate-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir Menu"
          >
            {/* Alterna ícone entre X (fechar) e Menu (três riscos) */}
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* --- MENU EXPANSÍVEL MOBILE --- */}
      {/* Removido AnimatePresence/framer-motion para evitar conflitos em mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-secondary border-b border-slate-200 dark:border-white/5 shadow-xl transition-all duration-300 ease-in-out">
          <nav className="flex flex-col p-6 gap-4">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                // Fecha o menu automaticamente ao clicar em um link
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white py-2 border-b border-slate-100 dark:border-white/5"
              >
                {item.name}
              </a>
            ))}
            <Button href="https://github.com/Euuuller" className="mt-4 w-full">
              Ver GitHub
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;