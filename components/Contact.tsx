import React from 'react';
import Section from './Section';
import { SOCIAL_LINKS } from '../constants';
import Button from './Button';
import { Send } from 'lucide-react';

/**
 * Componente Contact (Seção de Contato)
 * 
 * Exibe as informações de contato do usuário e um formulário simples.
 * Divide-se em duas colunas no desktop:
 * 1. Links sociais (LinkedIn, Email, etc.)
 * 2. Formulário de mensagem
 */
const Contact: React.FC = () => {
  return (
    <Section id="contact" title="Vamos Conversar?" subtitle="Estou disponível para novas oportunidades e colaborações">
      
      {/* Container principal com borda e arredondamento */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 
                      md:rounded-3xl p-0 md:p-12 md:border md:border-slate-200 md:dark:border-white/10">
        
        {/* --- COLUNA ESQUERDA: Links Sociais (Ocupa 2/5 do espaço em desktop) --- */}
        <div className="md:col-span-2 space-y-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Canais de Contato</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm">
              Sinta-se à vontade para me adicionar nas redes ou enviar um email direto.
            </p>
          </div>

          <div className="space-y-2">
            {/* Lista de Links: Mapeia o array SOCIAL_LINKS para criar botões */}
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer" // Segurança para abrir links em nova aba
                // Fundo transparente por padrão, hover sutil
                className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300"
              >
                {/* Ícone Redondo (com cor específica definida em link.bg e link.color) */}
                <div className={`p-3 rounded-full flex-shrink-0 border transition-all duration-300 ${link.bg} ${link.color}`}>
                  {link.icon}
                </div>
                
                {/* Texto do Link */}
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {link.name}
                  </span>
                  <span className={`text-sm md:text-base font-bold truncate ${link.color.includes('slate-900') ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-white'}`}>
                    {link.handle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* --- COLUNA DIREITA: Formulário (Ocupa 3/5 do espaço em desktop) --- */}
        <div className="md:col-span-3 md:rounded-2xl p-0 md:p-8 md:border md:border-slate-100 md:dark:border-white/5">
          {/* PreventDefault impede o recarregamento da página ao enviar */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Grid para Nome e Email lado a lado no desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Nome</label>
                <input 
                  type="text" 
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Assunto</label>
              <input 
                type="text" 
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                placeholder="Sobre o projeto..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-gray-300 ml-1">Mensagem</label>
              <textarea 
                rows={4} // Altura inicial da área de texto
                className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                placeholder="Como posso ajudar?"
              />
            </div>

            {/* Botão de Enviar (Visual apenas, sem backend conectado atualmente) */}
            <Button className="w-full h-12 text-base shadow-lg shadow-primary/25" icon={<Send size={18} />}>
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;