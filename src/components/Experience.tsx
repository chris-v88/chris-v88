import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import { SimpleCard, type SimpleCardData } from './ui';
import { formatDateRange } from '../utils/helpers';

type WorkExperience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
};

type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  skills: string[];
};

export const Experience = () => {
  const workExperience = experienceData.workExperience as WorkExperience[];
  const education = educationData.education as Education[];

  const workItems: SimpleCardData[] = workExperience.map((item) => ({
    header: item.position,
    subheader: item.company,
    location: item.location,
    date: formatDateRange(item.startDate, item.endDate),
    description: item.description,
    tech: item.technologies,
    iconName: 'Briefcase',
    iconVariant: 'info',
  }));

  const educationItems: SimpleCardData[] = education
    .filter((item) => item.startDate || item.endDate)
    .map((item) => ({
      header: item.school,
      subheader: item.field,
      location: item.location,
      date: formatDateRange(item.startDate, item.endDate),
      description: item.degree,
      tech: item.skills,
      iconName: 'GraduationCap',
      iconVariant: 'success',
    }));

  return (
    <section id="experience" className="bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-3xl font-bold text-gray-100 mb-8">Experience</h2>
          <div className="space-y-6">
            {workItems.map((item) => (
              <SimpleCard key={item.header + item.subheader} data={item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-100 mb-8">Education</h2>
          <div className="space-y-6">
            {educationItems.map((item) => (
              <SimpleCard key={item.header + item.subheader} data={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};
