import { Icon } from './Icon';

export type ExperienceCardProps = {
  company?: string;
  position?: string;
  school?: string;
  degree?: string;
  field?: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current?: boolean;
  description?: string;
  technologies?: string[];
  gpa?: string | null;
  honors?: string[];
};

export const ExperienceCard = (props: ExperienceCardProps) => {
  const {
    company,
    position,
    school,
    degree,
    field,
    location,
    startDate,
    endDate,
    current,
    description,
    technologies,
    gpa,
    honors,
  } = props;

  const formatDate = (date: string | null) => {
    if (!date) return 'Present';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Icon name={company ? 'Briefcase' : 'GraduationCap'} variant="info" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">
            {company || school}
            {current && (
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                Current
              </span>
            )}
          </h3>
          <p className="text-lg text-blue-600 font-medium">{position || `${degree} in ${field}`}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size="sm" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size="sm" />
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>

          {description && <p className="text-gray-700 mt-4 leading-relaxed">{description}</p>}

          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {gpa && (
            <p className="text-gray-600 mt-3">
              <strong>GPA:</strong> {gpa}
            </p>
          )}

          {honors && honors.length > 0 && (
            <div className="mt-3">
              <strong className="text-gray-700">Honors:</strong>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                {honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
