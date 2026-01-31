import { ReactNode } from 'react';

/**
 * Contexto do Tema (Claro/Escuro).
 */
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

/**
 * Definição da estrutura de um Projeto.
 */
export interface Project {
  id: number;
  title: string;
  category: 'machine-learning' | 'visualization' | 'analysis' | 'engineering';
  description: string;
  image: string;
  tags: string[];
  metrics?: {
    label: string;
    value: string;
    icon: ReactNode;
  }[];
  links: {
    github?: string;
    demo?: string;
  };
  // Novos campos para o Modal de Detalhes
  details?: {
    problem: string;
    solution: string;
    impact: string;
    keyMetrics?: string[]; // Lista simples para a barra lateral
  };
}

/**
 * Representa uma habilidade individual (Skill) com suporte a ícone SVG.
 */
export interface Skill {
  name: string;
  /** Descrição curta da habilidade ou uso principal */
  description?: string;
  /** URL do ícone (Devicon ou similar) */
  iconUrl: string;
}

/**
 * Agrupamento de habilidades por categoria para o sistema de Abas.
 */
export interface SkillCategory {
  id: string; // Identificador único para a aba
  title: string;
  items: Skill[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
  handle: string; // O texto de exibição (ex: @usuario)
  color: string;  // Classe de cor do texto (ex: text-blue-500)
  bg: string;     // Classe de cor de fundo (ex: bg-blue-500/10)
}

export interface NavItem {
  name: string;
  href: string;
}