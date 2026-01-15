import aboutData from '../data/about.json';
import { Icon, Button } from './ui';

const Hero = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16 bg-neutral-950"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6">
          Hi, I'm <span className="text-blue-400">{aboutData.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6">{aboutData.title}</p>
        <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">{aboutData.bio}</p>

        <div className="flex flex-wrap gap-6 justify-center mb-6">
          <div className="flex items-center gap-2 text-gray-400">
            <Icon name="Mail" size="sm" tone="info" />
            <span>{aboutData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Icon name="MapPin" size="sm" tone="info" />
            <span>{aboutData.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center mb-6">
          <Button
            display="link"
            href="/Chris-Vo_resume.pdf"
            download
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="Download" size="sm" tone="info" />
            <span>Download resume here</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            display="fill"
            href="#projects"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            View My Work
          </Button>
          <Button
            display="outline"
            href="#contact"
            className="bg-neutral-900 text-blue-400 hover:bg-neutral-800 transition-colors"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
