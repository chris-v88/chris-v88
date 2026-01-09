import { Modal } from '../ui/Modal';
import { Icon } from '../ui/Icon';
import { formatDate } from '../../utils/helpers';
import type { Project } from '../ui/ProjectCard';

export type ProjectModalProps = {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
};

export const ProjectModal = (props: ProjectModalProps) => {
  const { project, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title}>
      <div className="space-y-6">
        <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />

        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Description</h3>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Timeline</h3>
          <p className="text-gray-300">
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Icon name="Github" size="sm" />
              View Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icon name="ExternalLink" size="sm" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
