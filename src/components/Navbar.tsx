import aboutData from '../data/about.json';
import { useState } from 'react';
import { Icon } from './ui';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="shadow-md fixed top-0 left-0 right-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold">
            {aboutData.name}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="font-medium">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block py-2 font-medium">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
