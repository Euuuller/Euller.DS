import React from 'react';
import { Heart, Coffee } from 'lucide-react';

/**
 * Componente Footer (Rodapé)
 * 
 * Exibe as informações de copyright e créditos no final da página.
 * É um componente estático simples, mas com layouts diferentes para mobile e desktop.
 */
const Footer: React.FC = () => {
  // Obtém o ano atual automaticamente (ex: 2024, 2025)
  // Isso evita que o rodapé fique desatualizado no futuro
  const currentYear = new Date().getFullYear();

  return (
    // <footersemântico com borda superior e fundo com desfoque (blur)
    <footer className="py-8 border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 text-center">
        {/* Container flexível para alinhar os textos */}
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-slate-500 dark:text-gray-400">
          
          {/* Linha de Copyright */}
          <p>
            &copy; {currentYear} Euller dos Santos Rodrigues Duarte. Todos os direitos reservados.
          </p>
          
          {/* Linha de Créditos com ícones animados */}
          <p className="flex items-center justify-center gap-1.5">
            Feito com muito amor
            {/* Ícone de coração pulsando (animate-pulse) */}
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            e café
             {/* Ícone de café pulando (animate-bounce) */}
            <Coffee size={14} className="text-amber-500 animate-bounce" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;