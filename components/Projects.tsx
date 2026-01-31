import React, { useState, useCallback } from 'react';
import Section from './Section';
import { PROJECTS_DATA } from '../constants';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { LayoutGroup } from 'framer-motion';

/**
 * Componente Projects (Grade de Projetos)
 * 
 * Exibe a lista de projetos em um grid responsivo.
 * Gerencia o estado do modal (qual projeto está aberto).
 */
const Projects: React.FC = () => {
  // Estado que armazena o projeto clicado.
  // Se for null, o modal está fechado. 
  // Se tiver um objeto Project, o modal abre mostrando os detalhes dele.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /**
   * Função para abrir o modal.
   * Envolva em useCallback para manter a mesma referência de função entre renderizações,
   * permitindo que o ProjectCard (que usa React.memo) não re-renderize à toa.
   */
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  /**
   * Função para fechar o modal.
   * Limpa o projeto selecionado.
   */
  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <Section id="projects" title="Projetos em Destaque" subtitle="Casos reais de resolução de problemas com dados">
      <div id="projects-grid">
        {/* Grid responsivo: 1 coluna no mobile, 2 no tablet (md), 3 no desktop (lg) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard 
              key={project.id}     // Chave única para o React identificar o item
              project={project}    // Dados do projeto
              index={index}        // Índice para o efeito "escada" (stagger)
              onClick={handleProjectClick} // Função passada para o filho chamar ao clicar
            />
          ))}
        </div>

        {/* 
           O modal é renderizado aqui, mas usa 'Portal' internamente ou CSS fixed
           para aparecer sobre todo o conteúdo.
           Passamos 'selectedProject' e a função de fechar.
        */}
        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />
      </div>
    </Section>
  );
};

export default Projects;