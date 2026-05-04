import { useState, type ReactNode } from 'react';
import { Button, Icon } from '../ui';

export type NavLinkItemType = {
  label: string;
  href: string;
};

export type RewriteNavbarProps = {
  logo: ReactNode;
  navLinks: NavLinkItemType[];
};

const RewriteNavbar = ({ logo, navLinks }: RewriteNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow-md fixed top-0 left-0 right-0 z-40 rw-navbar">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/">{logo}</a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            {/* Nav links */}
            {navLinks.map((link) => (
              <Button
                key={link.href}
                display="link"
                href={link.href}
                className="font-medium text-gray-300 hover:text-gray-100 transition-colors"
              >
                <span className="font-pixelify-sans text-[20px] font-bold">{link.label}</span>
              </Button>
            ))}

            {/* Resume */}
            <Button href="/docs/Chris-Vo_resume-04-2026.pdf" download>
              <span className="font-pixelify-sans text-[20px] font-bold">Resume</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="lg:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-nav" className="lg:hidden mt-4 py-4 border-t border-gray-700">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                display="link"
                href={link.href}
                className="block w-full text-left font-medium text-gray-300 hover:text-gray-100 transition-colors"
              >
                <span className="font-pixelify-sans text-[20px] font-bold">{link.label}</span>
              </Button>
            ))}
            <Button
              href="/docs/Chris-Vo_resume-04-2026.pdf"
              download
              className="block w-full text-left font-medium text-gray-300 hover:text-gray-100 transition-colors mt-2"
            >
              <span className="font-pixelify-sans text-[20px] font-bold">Resume</span>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default RewriteNavbar;
