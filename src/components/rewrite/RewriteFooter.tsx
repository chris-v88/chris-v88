import aboutData from '../../data/about.json';
import { Icon, Button, Text } from '../ui';

const RewriteFooter = () => {
  return (
    <footer className="py-6 px-4 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Text display="caption" className="text-gray-500">
          © {new Date().getFullYear()} Chris Vo
        </Text>
        <div className="flex gap-4">
          <Button
            display="ghost-icon"
            href={aboutData.github}
            target="_blank"
            rel="noopener noreferrer"
            tone="neutral"
          >
            <Icon name="Github" />
          </Button>
          <Button
            display="ghost-icon"
            href={aboutData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            tone="neutral"
          >
            <Icon name="Linkedin" />
          </Button>
          <Button display="ghost-icon" href={`mailto:${aboutData.email}`} tone="neutral">
            <Icon name="Mail" />
          </Button>
          <Button
            display="ghost-icon"
            href="/docs/Chris-Vo_resume-04-2026.pdf"
            download
            tone="neutral"
          >
            <Icon name="Download" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default RewriteFooter;
