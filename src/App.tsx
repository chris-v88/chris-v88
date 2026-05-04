import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Config from './pages/Config';
import FeatureFlag from './components/FeatureFlag';
import RewriteNavbar from './components/rewrite/RewriteNavbar';
import { isFlagActive, Flag } from './utils/featureFlags';
import { Text } from './components/ui';
import ReWriteHero from './rewrite_pages/RewriteHero';

const App = () => {
  if (window.location.pathname === '/config') {
    return <Config />;
  }

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const isRewrite = isFlagActive(Flag.ENABLE_REWRITE_2026);

  return (
    <div className={`min-h-screen flex flex-col ${isRewrite ? 'rw-theme' : 'dark bg-black'}`}>
      <FeatureFlag
        name={Flag.ENABLE_REWRITE_2026}
        feature={
          <RewriteNavbar
            logo={
              <Text display="custom" className="font-press-start-2p text-[25px] font-normal">
                Chris Vo
              </Text>
            }
            navLinks={navLinks}
          />
        }
        backup={<Navbar />}
      />
      <main className="flex-grow">
        <FeatureFlag name={Flag.ENABLE_REWRITE_2026} feature={<ReWriteHero />} backup={<Hero />} />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
