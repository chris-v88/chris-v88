import aboutData from '../data/about.json';
import { Icon, Button } from './ui';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end items-center">
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
              href="/docs/Chris-Vo_resume-02-2026.pdf"
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
