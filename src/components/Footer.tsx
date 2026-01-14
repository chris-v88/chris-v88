import aboutData from '../data/about.json';
import { Icon } from './ui';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-gray-400">
            <p>
              &copy; {currentYear} {aboutData.name} v.1.0.0
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={aboutData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Github" />
            </a>
            <a
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Linkedin" />
            </a>
            <a
              href={`mailto:${aboutData.email}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Mail" />
            </a>
            <a
              href="/Chris-Vo_resume.pdf"
              download
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Download" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
