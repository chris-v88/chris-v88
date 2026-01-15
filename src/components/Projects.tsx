import { useState } from 'react';
import projectsData from '../data/projects.json';
import { ProjectCard, type Project } from './ui';
import { ProjectModal } from './projects/ProjectModal';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = projectsData.projects as Project[];

  return (
    <section id="projects" className="py-20 px-4 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-100 mb-4 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
