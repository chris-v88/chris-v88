import { useState } from 'react';
import projectsData from '../data/projects.json';
import { Card, Text, Icon, Button } from '../components/ui';
import { Modal } from '../components/ui/Modal';
import { formatDate } from '../utils/helpers';
import type { Project } from '../components/projects/ProjectCard';

const statusStyles: Record<Project['status'], string> = {
  completed: 'text-green-300',
  'in-progress': 'text-blue-300',
  planned: 'text-gray-400',
};

const statusLabels: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
};

const RewriteProjects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = projectsData.projects as Project[];

  return (
    <section id="projects" className="py-20 px-4">
      <Text display="h1" className="text-gray-100 mb-10 text-center">
        Projects
      </Text>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <Card
              size="wide"
              type="outline"
              tone="neutral"
              className="h-full hover:brightness-110 transition-all duration-200"
            >
              <div className="aspect-video bg-neutral-800 overflow-hidden -mx-4 -mt-4 mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-start justify-between mb-2">
                <Text display="h3" className="text-gray-100 flex-1 mr-2">
                  {project.title}
                </Text>
                <span
                  className={`font-pixelify-sans text-xs font-bold mt-1 shrink-0 ${statusStyles[project.status]}`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              <Text display="body" className="text-gray-400 mb-4 line-clamp-2">
                {project.description}
              </Text>

              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <Icon name="Calendar" size="sm" tone="default" />
                <Text display="caption" className="text-gray-500">
                  {formatDate(project.startDate)} – {formatDate(project.endDate)}
                </Text>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Text display="callout" key={tech}>
                    {tech}
                  </Text>
                ))}
                {project.technologies.length > 3 && (
                  <Text display="caption" className="text-gray-500 self-center">
                    +{project.technologies.length - 3} more
                  </Text>
                )}
              </div>

              <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                {project.github && (
                  <Button
                    display="link"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    tone="info"
                  >
                    <span className="flex items-center gap-1 font-pixelify-sans text-[14px]">
                      <Icon name="Github" size="sm" />
                      Code
                    </span>
                  </Button>
                )}
                {project.live && (
                  <Button
                    display="link"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    tone="info"
                  >
                    <span className="flex items-center gap-1 font-pixelify-sans text-[14px]">
                      <Icon name="ExternalLink" size="sm" />
                      Live Demo
                    </span>
                  </Button>
                )}
                {project.youtube && (
                  <Button
                    display="link"
                    href={project.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    tone="caution"
                  >
                    <span className="flex items-center gap-1 font-pixelify-sans text-[14px]">
                      <Icon name="Youtube" size="sm" />
                      Video
                    </span>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
        >
          <div className="space-y-6">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full rounded-lg shadow-md"
            />

            <div>
              <Text display="h3" className="text-gray-100 mb-2">
                Description
              </Text>
              <Text display="body" className="text-gray-300">
                {selectedProject.description}
              </Text>
            </div>

            <div>
              <Text display="h3" className="text-gray-100 mb-2">
                Timeline
              </Text>
              <Text display="body" className="text-gray-300">
                {formatDate(selectedProject.startDate)} – {formatDate(selectedProject.endDate)}
              </Text>
            </div>

            <div>
              <Text display="h3" className="text-gray-100 mb-2">
                Technologies
              </Text>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <Text display="callout" key={tech}>
                    {tech}
                  </Text>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {selectedProject.github && (
                <Button
                  display="fill"
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="neutral"
                >
                  <span className="flex items-center gap-2 font-pixelify-sans text-[14px]">
                    <Icon name="Github" size="sm" />
                    View Code
                  </span>
                </Button>
              )}
              {selectedProject.live && (
                <Button
                  display="fill"
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="info"
                >
                  <span className="flex items-center gap-2 font-pixelify-sans text-[14px]">
                    <Icon name="ExternalLink" size="sm" />
                    Live Demo
                  </span>
                </Button>
              )}
              {selectedProject.youtube && (
                <Button
                  display="fill"
                  href={selectedProject.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="caution"
                >
                  <span className="flex items-center gap-2 font-pixelify-sans text-[14px]">
                    <Icon name="Youtube" size="sm" />
                    Watch Video
                  </span>
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default RewriteProjects;
