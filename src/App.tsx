import type { ComponentType } from 'react';
import Hero from './pages/Hero';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Config from './pages/Config';
import Docs from './pages/Docs';
import Wiki from './pages/Wiki';
import Footer from './components/Footer';
import FeatureFlag from './components/FeatureFlag';
import HiddenMenu from './components/HiddenMenu';
import Navbar from './components/Navbar';
import { Flag } from './utils/featureFlags';
import { Text } from './components/ui';

const STANDALONE_PAGES: Record<string, ComponentType> = {
  '/config': Config,
  '/wiki': Wiki,
  '/docs': Docs,
};

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const App = () => {
  const StandalonePage = STANDALONE_PAGES[window.location.pathname];

  if (StandalonePage) {
    return <StandalonePage />;
  }

  return (
    <div className="min-h-screen flex flex-col rw-theme">
      <Navbar logo={<Text display="h1">Chris Vo</Text>} navLinks={NAV_LINKS} />
      <main className="flex-grow">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FeatureFlag name={Flag.ENABLE_HIDDEN_LINK} feature={<HiddenMenu />} />
    </div>
  );
};

export default App;
