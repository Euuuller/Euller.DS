import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { GraduationCap, LineChart, Download } from 'lucide-react';
import Button from './Button';

/**
 * Componente About (Sobre)
 * 
 * Seção que apresenta a biografia, foto e resumo profissional do usuário.
 * Também contém o link para download do currículo.
 */
const About: React.FC = () => {
  return (
    <Section id="about" title="Sobre Mim" subtitle="Minha jornada profissional e acadêmica">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* 
          Coluna da Imagem (Esquerda)
          Animação: Entra vindo da esquerda (x: -50)
        */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Container da Foto com bordas e sombra colorida */}
          <div className="relative aspect-square max-w-md mx-auto rounded-full overflow-hidden border-4 border-white dark:border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
            <img 
              src="https://github.com/Euuuller.png" 
              alt="Euller Duarte" 
              // Efeito de zoom na imagem ao passar o mouse no container (group-hover)
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* 
          Coluna do Texto (Direita)
          Animação: Entra vindo da direita (x: 50) e tem delay para começar depois da foto
        */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-6">
            Analista de Dados & Graduando em Engenharia
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            Olá! Sou Euller dos Santos Rodrigues Duarte. Minha paixão reside na interseção entre 
            Engenharia e Ciência de Dados. Atualmente graduando em Engenharia Elétrica no IFMA, 
            aplico o rigor matemático e o pensamento sistêmico da engenharia para resolver 
            problemas complexos de dados.
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Tenho experiência prática em desenvolvimento de modelos preditivos, automação de 
            processos e criação de dashboards que auxiliam na tomada de decisão estratégica.
          </p>

          {/* Cards de Destaque (Formação e Foco) - Visível apenas em Telas maiores que 'sm' */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
            
            {/* Card Formação */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col items-center gap-3 shadow-sm">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Formação</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Engenharia Elétrica (IFMA)</p>
              </div>
            </div>

            {/* Card Foco */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col items-center gap-3 shadow-sm">
              <div className="p-2 bg-cyan-50 dark:bg-cyan-500/10 rounded-lg text-cyan-600 dark:text-cyan-400">
                <LineChart size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Foco</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Data Science & BI</p>
              </div>
            </div>
          </div>

          {/* Botão de Download do Currículo (PDF) */}
          <Button href="/documents/curriculo.pdf" download="Curriculo_Euller_Duarte.pdf" target="_blank" icon={<Download size={18} />}>
            Download CV
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;