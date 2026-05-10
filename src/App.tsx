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
import { Text } from './components/ui';
import RewriteHero from './rewrite_pages/RewriteHero';

const App = () => {
  if (window.location.pathname === '/config') {
    return <Config />;
  }

  if (window.location.pathname === '/docs') {
    return <Docs />;
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
    </div>
  );
};

export default App;
