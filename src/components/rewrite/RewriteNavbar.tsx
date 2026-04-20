import type { ReactNode } from 'react';
import { Button, Text } from '../ui';

export type NavLinkItemType = {
  label: string;
  href: string;
};

export type RewriteNavbarProps = {
  logo: ReactNode;
  navLinks: NavLinkItemType[];
};

const RewriteNavbar = ({ logo, navLinks }: RewriteNavbarProps) => {
  return (
    <header className="shadow-md fixed top-0 left-0 right-0 z-40 rw-navbar">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#">{logo}</a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-16">
          {/* Nav links */}
          {navLinks.map((link) => (
            <Button
              key={link.href}
              display="link"
              href={link.href}
              className="font-medium text-gray-300 hover:text-gray-100 transition-colors"
            >
              <Text display="h2">{link.label}</Text>
            </Button>
          ))}

          {/* Resume */}
          <Button
            // className="font-medium text-gray-300 hover:text-gray-100 transition-colors flex items-center gap-2"
            href="/docs/Chris-Vo_resume-04-2026.pdf"
            download
          >
            <Text display="h2">Resume</Text>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default RewriteNavbar;
