import aboutData from '../data/about.json';
import { Icon } from './ui';

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-16 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6">
          Hi, I'm <span className="text-blue-400">{aboutData.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6">{aboutData.title}</p>
        <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">{aboutData.bio}</p>

        <div className="flex flex-wrap gap-6 justify-center mb-6">
          <div className="flex items-center gap-2 text-gray-400">
            <Icon name="Mail" size="sm" variant="info" />
            <span>{aboutData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Icon name="MapPin" size="sm" variant="info" />
            <span>{aboutData.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center mb-6">
          <a
            href="/Chris-Vo_resume.pdf"
            download
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="Download" size="sm" variant="info" />
            <span>Download resume here</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="bg-gray-900 text-blue-400 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors border-2 border-blue-400"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
