import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Config from './pages/Config';

const App = () => {
  if (window.location.pathname === '/config') {
    return <Config />;
  }

  return (
    <div className="min-h-screen dark bg-black flex flex-col">
      <Navbar />
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
