import aboutData from '../data/about.json';
import { Icon, Button } from './ui';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-gray-400">
            <p>
              &copy; {currentYear} {aboutData.name} v.1.0.0
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              display="link"
              href={aboutData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Github" />
            </Button>
            <Button
              display="link"
              href={aboutData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Linkedin" />
            </Button>
            <Button
              display="link"
              href={`mailto:${aboutData.email}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Mail" />
            </Button>
            <Button
              display="link"
              href="/Chris-Vo_resume.pdf"
              download
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Icon name="Download" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
