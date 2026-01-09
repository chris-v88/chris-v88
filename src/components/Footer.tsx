import aboutData from '../data/about.json';
import { Icon } from './ui';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center gap-4 mb-4">
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
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>
            &copy; {currentYear} {aboutData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
