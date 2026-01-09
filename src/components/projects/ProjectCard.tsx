import { Icon } from '../ui/Icon';
import { formatDate } from '../../utils/helpers';

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  live: string | null;
  youtube: string | null;
  technologies: string[];
  startDate: string;
  endDate: string | null;
  status: 'completed' | 'in-progress' | 'planned';
};

export type ProjectCardProps = {
  project: Project;
  onClick: () => void;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { project, onClick } = props;

  const statusColors = {
    completed: 'bg-green-900 text-green-200',
    'in-progress': 'bg-blue-900 text-blue-200',
    planned: 'bg-gray-700 text-gray-300',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planned: 'Planned',
  };

  return (
    <div
      className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-800 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-100">{project.title}</h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Icon name="Calendar" size="sm" />
          <span>
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
          )}
        </div>

        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="Github" size="sm" />
              <span className="text-sm">Code</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="ExternalLink" size="sm" />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
          {project.youtube && (
            <a
              href={project.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-red-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="Youtube" size="sm" />
              <span className="text-sm">Video</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
