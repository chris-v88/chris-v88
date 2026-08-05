import Hero from './pages/Hero';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Config from './pages/Config';
import Docs from './pages/Docs';
import FeatureFlag from './components/FeatureFlag';
import Navbar from './components/Navbar';
import { Flag } from './utils/featureFlags';
import { PixelIcon, Text } from './components/ui';
import { useState } from 'react';
import Wiki from './pages/Wiki';

const App = () => {
  const pathname = window.location.pathname;
  const [lockOpen, setLockOpen] = useState(false);

  if (pathname === '/config') {
    return <Config />;
  }

  if (pathname === '/wiki') {
    return <Wiki />;
  }

  if (pathname === '/docs') {
    return <Docs />;
  }

  // const hiddenLinkClass = `rounded-full ${lockOpen ? 'bg-white/20' : 'bg-white/5'} px-4 py-2 text-sm text-white backdrop-blur-sm ${lockOpen ? 'opacity-90' : 'opacity-10'} transition hover:opacity-100 hover:bg-white/30`;
  // const lockIconClass = `fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm ${lockOpen ? 'opacity-80' : 'opacity-20'} transition hover:opacity-100 hover:bg-white/30`;
  const hiddenLinkClass = `font-pixelify-sans text-sm text-white px-4 py-2 inline-block pill-pixel bg-white/10 backdrop-blur-sm border border-white/20 ${lockOpen ? 'opacity-90' : 'opacity-10'} transition hover:opacity-100 hover:bg-white/30`;
  const lockIconClass = `fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center text-white btn-pixel bg-white/10 backdrop-blur-sm border border-white/20 ${lockOpen ? 'opacity-80' : 'opacity-20'} transition hover:opacity-100 hover:bg-white/30`;

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];
  // const isHiddenLinkEnabled = isFlagActive(Flag.ENABLE_HIDDEN_LINK);

  return (
    <div className="min-h-screen flex flex-col rw-theme">
      <Navbar logo={<Text display="h1">Chris Vo</Text>} navLinks={navLinks} />
      <main className="flex-grow">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FeatureFlag
        name={Flag.ENABLE_HIDDEN_LINK}
        feature={
          <div>
            {lockOpen && (
              <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-2">
                <a href="/config" className={`${hiddenLinkClass} hidden-link-pill-active`}>
                  Config
                </a>
                <a href="/wiki" className={`${hiddenLinkClass} hidden-link-pill-active`}>
                  Wiki
                </a>
              </div>
            )}
            <button
              // className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm opacity-30 transition hover:opacity-100 hover:bg-white/30"
              className={lockIconClass}
              onClick={() => setLockOpen(!lockOpen)}
            >
              <PixelIcon name={lockOpen ? 'lock-unlocked' : 'lock-locked'} className="h-6 w-6" />
            </button>
          </div>
        }
      />
    </div>
  );
};

export default App;
