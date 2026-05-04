import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import { Card, Text, Icon, Button, PixelIcon } from '../components/ui';
import { formatDateRange } from '../utils/helpers';
import type { WorkExperience, Education } from '../pages/Experience';

const RewriteExperience = () => {
  const workExperience = experienceData.workExperience as WorkExperience[];
  const education = educationData.education as Education[];

  return (
    <section id="experience" className="py-20 px-4">
      <Text display="h1" className="text-gray-100 mb-10 text-center">
        Experience & Education
      </Text>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <Text display="h2" className="text-gray-100 mb-6">
            Experience
          </Text>
          <div className="space-y-4">
            {workExperience.map((item) => (
              <Card key={item.id} size="wide">
                <div className="flex items-start gap-3 mb-3">
                  <PixelIcon name="work" className="mt-0.5" />
                  <div className="flex-1">
                    <Text display="h4" className="text-gray-100">
                      {item.position}
                    </Text>
                    <Button
                      display="link"
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      tone="info"
                    >
                      <Text display="caption">{item.company.toUpperCase()}</Text>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Icon name="MapPin" size="sm" tone="default" />
                  <Text display="caption">{item.location}</Text>
                </div>

                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <Icon name="Calendar" size="sm" tone="default" />
                  <Text display="caption">{formatDateRange(item.startDate, item.endDate)}</Text>
                </div>

                {item.description && (
                  <Text display="body" className="text-gray-300 mb-3">
                    {item.description}
                  </Text>
                )}

                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Text display="callout" key={tech}>
                      {tech}
                    </Text>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 md:mt-0">
          <Text display="h2" className="text-gray-100 mb-6">
            Education
          </Text>
          <div className="space-y-4">
            {education
              .filter((item) => item.startDate || item.endDate)
              .map((item) => (
                <Card key={item.id} size="wide">
                  <div className="flex items-start gap-3 mb-3">
                    <PixelIcon name="education" className="mt-0.5" />
                    <div className="flex-1">
                      <Text display="h4" className="text-gray-100">
                        {item.field}
                      </Text>
                      <Button
                        display="link"
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        tone="success"
                      >
                        <Text display="caption">{item.school.toUpperCase()}</Text>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Icon name="MapPin" size="sm" tone="default" />
                    <Text display="caption">{item.location}</Text>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <Icon name="Calendar" size="sm" tone="default" />
                    <Text display="caption">{formatDateRange(item.startDate, item.endDate)}</Text>
                  </div>

                  <Text display="body" className="text-gray-300 mb-3">
                    {item.degree}
                  </Text>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Text display="callout" key={skill}>
                        {skill}
                      </Text>
                    ))}
                  </div>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default RewriteExperience;
