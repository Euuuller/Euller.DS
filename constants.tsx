import React from 'react';
import { Project, SkillCategory, SocialLink, NavItem } from './types';
import { Github, Linkedin, Mail, Zap, TrendingUp, Clock, Activity, Database, BookOpen } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#about' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Contato', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:euller.santos.duarte@gmail.com',
    handle: 'euller.santos.duarte',
    icon: <Mail className="w-5 h-5" />,
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 group-hover:border-red-500/50'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/euuuller',
    handle: '/in/euuuller',
    icon: <Linkedin className="w-5 h-5" />,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 group-hover:border-blue-500/50'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Euuuller',
    handle: '@euuuller',
    icon: <Github className="w-5 h-5" />,
    // Github limpo: Preto no light, Branco no dark
    color: 'text-slate-900 dark:text-white', 
    bg: 'bg-white dark:bg-black border-black dark:border-white group-hover:bg-slate-50 dark:group-hover:bg-slate-900 transition-colors'
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@euller.santos.duarte',
    handle: '@euller.duarte',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20 group-hover:border-orange-500/50'
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'langs',
    title: 'Linguagens & Dados',
    items: [
      { name: 'Python', description: 'Data Science & Automação', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'SQL', description: 'Queries & Modelagem', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'R', description: 'Estatística Avançada', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
      { name: 'PostgreSQL', description: 'Banco de Dados Relacional', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    ]
  },
  {
    id: 'viz',
    title: 'Visualização',
    items: [
      { name: 'Power BI', description: 'Dashboards Interativos', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
      { name: 'Matplotlib', description: 'Plotagem Científica', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg' },
      { name: 'Figma', description: 'UI Design & Prototipagem', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ]
  },
  {
    id: 'ml',
    title: 'IA & Machine Learning',
    items: [
      { name: 'TensorFlow', description: 'Deep Learning', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', description: 'Neural Networks', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'Pandas', description: 'Manipulação de Dados', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'Numpy', description: 'Computação Numérica', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Scikit-Learn', description: 'Modelos Preditivos', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
    ]
  },
  {
    id: 'eng',
    title: 'DevOps & Tools',
    items: [
      { name: 'Git', description: 'Versionamento', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', description: 'CI/CD & Colaboração', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Docker', description: 'Containerização', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'VS Code', description: 'IDE Principal', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'Previsão de Vendas com XGBoost',
    category: 'machine-learning',
    description: 'Modelo preditivo de alta precisão para varejo, otimizando estoque através de análise de séries temporais e sazonalidade.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', 'XGBoost', 'Pandas'],
    metrics: [
      { label: 'Acurácia', value: '92%', icon: <Activity className="w-4 h-4" /> },
      { label: 'Otimização', value: '15%', icon: <TrendingUp className="w-4 h-4" /> }
    ],
    links: {
      github: 'https://github.com/Euuuller',
      demo: 'https://github.com/Euuuller'
    },
    details: {
      problem: 'Dificuldade em prever demanda futura causava excesso de estoque e perda de capital de giro.',
      solution: 'Modelo XGBoost treinado com 3 anos de histórico, considerando feriados e promoções.',
      impact: 'Redução de 15% em custos operacionais e melhor disponibilidade de produtos.',
      keyMetrics: ['R² Score: 0.92', 'Redução de Stockout', 'Processamento em <2min']
    }
  },
  {
    id: 2,
    title: 'Dashboard Executivo Financeiro',
    category: 'visualization',
    description: 'Painel de controle estratégico no Power BI, consolidando múltiplas fontes de dados para visão em tempo real.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['Power BI', 'DAX', 'SQL'],
    metrics: [
      { label: 'Fontes', value: '5+', icon: <Database className="w-4 h-4" /> },
      { label: 'Atualização', value: 'Real-time', icon: <Clock className="w-4 h-4" /> }
    ],
    links: {
      demo: 'https://github.com/Euuuller'
    },
    details: {
      problem: 'Relatórios financeiros dispersos em planilhas Excel dificultavam a visão consolidada.',
      solution: 'ETL automatizado via SQL e visualização interativa com Drill-down no Power BI.',
      impact: 'Tomada de decisão 10x mais rápida pela diretoria.',
      keyMetrics: ['5 Fontes Integradas', 'Acesso Mobile', 'Alertas Automáticos']
    }
  },
  {
    id: 3,
    title: 'Segmentação de Clientes (RFM)',
    category: 'analysis',
    description: 'Clusterização de base de clientes utilizando K-Means para campanhas de marketing personalizadas.',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', 'K-Means', 'Scikit-learn'],
    metrics: [
      { label: 'Clusters', value: '4', icon: <Zap className="w-4 h-4" /> }
    ],
    links: {
      github: 'https://github.com/Euuuller'
    },
    details: {
      problem: 'Marketing massivo tinha baixo ROI e taxa de conversão.',
      solution: 'Algoritmo não-supervisionado para identificar personas baseado em Recência, Frequência e Valor.',
      impact: 'Aumento de 12% na conversão de campanhas de e-mail.',
      keyMetrics: ['4 Perfis Definidos', 'ROI +20%', 'Python Puro']
    }
  }
];

/**
 * Sistema de Cores de Tags Unificado
 * Abandona o "arco-íris" para um look mais "Tech/Sci-Fi" usando variações de Azul, Roxo, Indigo e Ciano.
 */
export const getTagStyle = (tag: string): string => {
  const styles: { [key: string]: string } = {
    // Linguagens (Blues)
    'Python': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
    'SQL': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20',
    'DAX': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20',
    
    // ML & AI (Purples/Pinks)
    'XGBoost': 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:border-fuchsia-500/20',
    'Scikit-learn': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20',
    'K-Means': 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20',
    
    // Data & Tools (Cyans/Emeralds)
    'Power BI': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20', // Mantendo Amber pois é a cor da marca
    'Pandas': 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20',
    'Data Viz': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20',
  };

  return styles[tag] || 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
};