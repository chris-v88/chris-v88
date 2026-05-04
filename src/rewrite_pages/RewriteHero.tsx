import aboutData from '../data/about.json';
import { Button, Text } from '../components/ui';

const RewriteHero = () => {
  return (
    <section
      id="about"
      className="h-screen flex flex-col justify-center pt-20 px-6 sm:px-12 lg:px-28"
    >
      <div className="flex flex-col items-start gap-6 w-full max-w-3xl mx-auto">
        {/* Avatar — sits just above the heading, centered */}
        <div className="self-center mb-2">
          <div className="block lg:hidden">
            <div className="avatar-pixel">
              <img
                src="/images/pixel-me-short.png"
                alt="Chris's pixel avatar"
                className="h-24 w-auto"
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="avatar-pixel">
              <img
                src="/images/pixel-me-tall.png"
                alt="Chris's pixel avatar"
                className="h-52 w-auto"
              />
            </div>
          </div>
        </div>

        <Text display="h2">Hi, I'm Chris.</Text>

        <Text display="body" className="text-gray-300">
          {aboutData.bio}
        </Text>

        <div className="ml-16 flex flex-col items-start gap-2">
          <Text display="caption" className="text-gray-400">
            {aboutData.email}
          </Text>
          <Text display="caption" className="text-gray-400">
            {aboutData.location}
          </Text>
          {aboutData.techStack.length > 0 && (
            <div className="flex flex-row items-center gap-2">
              {aboutData.techStack.map((tech, i) => (
                <>
                  <Text key={tech} display="callout">
                    {tech}
                  </Text>
                  {i < aboutData.techStack.length - 1 && (
                    <Text key={`sep-${i}`} display="caption" className="text-gray-400">
                      |
                    </Text>
                  )}
                </>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-6">
          <Button
            display="link"
            href={aboutData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-pixelify-sans text-[20px] font-bold">LinkedIn</span>
          </Button>
          <Button display="link" href={aboutData.github} target="_blank" rel="noopener noreferrer">
            <span className="font-pixelify-sans text-[20px] font-bold">GitHub</span>
          </Button>
          <Button href="/docs/Chris-Vo_resume-04-2026.pdf" download>
            <span className="font-pixelify-sans text-[20px] font-bold">Resume</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default RewriteHero;
