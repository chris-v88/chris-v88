import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Config from './pages/Config';
import FeatureFlag from './components/FeatureFlag';
import RewriteNavbar from './components/rewrite/RewriteNavbar';
import { isFlagActive } from './utils/featureFlags';
import { Text } from './components/ui';

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

  const isRewrite = isFlagActive('ENABLE_REWRITE_2026');

  return (
    <div className={`min-h-screen flex flex-col ${isRewrite ? 'rw-theme' : 'dark bg-black'}`}>
      <FeatureFlag
        name="ENABLE_REWRITE_2026"
        feature={
          <RewriteNavbar
            logo={
              <Text
                display="custom"
                fontFamily="'Press Start 2P', monospace"
                fontSize="25px"
                fontWeight="normal"
              >
                Chris Vo
              </Text>
            }
            navLinks={navLinks}
          />
        }
        backup={<Navbar />}
      />
      <main className="flex-grow">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
