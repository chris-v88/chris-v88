import aboutData from '../data/about.json';
import { Icon } from './ui';

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Hi, I'm <span className="text-blue-600">{aboutData.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-6">{aboutData.title}</p>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{aboutData.bio}</p>

        <div className="flex flex-wrap gap-6 justify-center mb-12">
          <div className="flex items-center gap-2 text-gray-600">
            <Icon name="Mail" size="sm" variant="info" />
            <span>{aboutData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Icon name="MapPin" size="sm" variant="info" />
            <span>{aboutData.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border-2 border-blue-600"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
