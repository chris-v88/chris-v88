import Navbar from './components/Navbar';

import Hero from './pages/Hero';
import { Experience } from './pages/Experience';
import RewriteExperience from './rewrite_pages/RewriteExperience';
import { Projects } from './pages/Projects';
import RewriteProjects from './rewrite_pages/RewriteProjects';
import Contact from './pages/Contact';
import RewriteContact from './rewrite_pages/RewriteContact';
import Footer from './components/Footer';
import RewriteFooter from './components/rewrite/RewriteFooter';
import Config from './pages/Config';
import Docs from './pages/Docs';
import FeatureFlag from './components/FeatureFlag';
import RewriteNavbar from './components/rewrite/RewriteNavbar';
import { isFlagActive, Flag } from './utils/featureFlags';
import { PixelIcon, Text } from './components/ui';
import RewriteHero from './rewrite_pages/RewriteHero';
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

  const hiddenLinkClass = `rounded-full ${lockOpen ? 'bg-white/20' : 'bg-white/5'} px-4 py-2 text-sm text-white backdrop-blur-sm ${lockOpen ? 'opacity-100' : 'opacity-30'} transition hover:opacity-100 hover:bg-white/30`;
  const lockIconClass = `fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm ${lockOpen ? 'opacity-100' : 'opacity-30'} transition hover:opacity-100 hover:bg-white/30`;

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const isRewrite = isFlagActive(Flag.ENABLE_REWRITE_2026);
  // const isHiddenLinkEnabled = isFlagActive(Flag.ENABLE_HIDDEN_LINK);

  return (
    <div className={`min-h-screen flex flex-col ${isRewrite ? 'rw-theme' : 'dark bg-black'}`}>
      <FeatureFlag
        name={Flag.ENABLE_REWRITE_2026}
        feature={<RewriteNavbar logo={<Text display="h1">Chris Vo</Text>} navLinks={navLinks} />}
        backup={<Navbar />}
      />
      <main className="flex-grow">
        <FeatureFlag
          name={Flag.ENABLE_REWRITE_2026}
          feature={
            <>
              <RewriteHero />
              <RewriteExperience />
              <RewriteProjects />
              <RewriteContact />
            </>
          }
          backup={
            <>
              <Hero />
              <Experience />
              <Projects />
              <Contact />
            </>
          }
        />
      </main>
      <FeatureFlag
        name={Flag.ENABLE_REWRITE_2026}
        feature={<RewriteFooter />}
        backup={<Footer />}
      />
      <FeatureFlag
        name={Flag.ENABLE_HIDDEN_LINK}
        feature={
          <div>
            {lockOpen && (
              <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-2">
                <a href="/config" className={hiddenLinkClass}>
                  Config
                </a>
                <a href="/wiki" className={hiddenLinkClass}>
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
