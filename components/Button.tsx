import React, { ReactNode } from 'react';

/**
 * Componente Button
 * 
 * Este componente é um botão reutilizável que pode funcionar tanto como um botão normal (<button>)
 * quanto como um link (<a>). Ele suporta variantes de estilo (primary, outline, ghost) e tamanhos diferentes.
 */

// Props estendidas de ButtonHTMLAttributes para aceitar todos os eventos padrão de botão
// Isso permite que passemos onClick, disabled, type, etc. sem precisar declarar um por um.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Variante visual do botão. O '?' indica que é opcional.
  variant?: 'primary' | 'outline' | 'ghost';
  // Tamanho do botão
  size?: 'sm' | 'md' | 'lg';
  // O conteúdo dentro do botão (texto, outros componentes)
  children: ReactNode;
  // Ícone opcional para aparecer ao lado do texto
  icon?: ReactNode;
  // Se fornecido, o botão se comporta como um Link (tag <a>)
  href?: string;
  // Propriedades padrão de links HTML
  target?: string;
  rel?: string;
  // Adiciona suporte a atributo de download
  download?: string;
}

/**
 * Função Button
 * 
 * Renderiza um botão estilizado ou um link, dependendo das props passadas.
 * 
 * @param variant - Estilo visual (padrão: 'primary')
 * @param size - Tamanho do botão (padrão: 'md')
 * @param children - Conteúdo interno
 * @param icon - Ícone opcional
 * @param href - URL de destino (se for link)
 * @param className - Classes CSS adicionais
 * @returns Um elemento JSX (button ou a)
 */
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  href,
  className = '',
  ...props // 'Rest operator': pega todas as outras propriedades não listadas acima
}) => {
  // Classes base que todo botão terá (alinhamento, fonte, transições)
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
  
  // Objeto de configuração para os estilos de cada variante
  // Isso evita ter muitos 'if/else' no código
  const variants = {
    // Gradiente Indigo -> Cyan com sombra colorida
    primary: "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/30 hover:brightness-110",
    // Outline com borda Indigo
    outline: "bg-transparent border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10",
    // Ghost neutro (sem fundo, só texto)
    ghost: "bg-transparent text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
  };

  // Objeto de configuração para os tamanhos
  const sizes = {
    sm: "px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm",
    md: "px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base",
    lg: "px-6 py-3.5 text-base md:px-8 md:py-4 md:text-lg"
  };

  // Constrói a string final de classes combinando:
  // Base + Variante escolhida + Tamanho escolhido + Classes extras passadas por prop
  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  // Se a prop 'href' existir, renderizamos um link (<a>)
  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses} 
        // Conversão de tipo (cast) necessária pois props de Button e Anchor são levemente diferentes no TypeScript
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {icon}
      </a>
    );
  }

  // Caso contrário, renderizamos um botão normal (<button>)
  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon}
    </button>
  );
};

export default Button;