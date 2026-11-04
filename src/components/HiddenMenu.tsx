import { useState } from 'react';
import { PixelIcon } from './ui';

const HIDDEN_LINKS = [
  { href: '/config', label: 'Config' },
  { href: '/wiki', label: 'Wiki' },
];

const glassStyles =
  'rounded-full text-white backdrop-blur-sm transition hover:bg-white/30 hover:opacity-5';

const linkStyles = `${glassStyles} bg-white/20 px-4 py-2 text-sm`;

const toggleStyles = `${glassStyles} fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10`;

const toggleOpenStyles = {
  open: 'opacity-100',
  closed: 'opacity-3',
};

/**
 * Lock button pinned to the bottom-right corner that reveals links to internal pages.
 */
const HiddenMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <nav className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-2">
          {HIDDEN_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={linkStyles}>
              {label}
            </a>
          ))}
        </nav>
      )}
      <button
        className={`${toggleStyles} ${toggleOpenStyles[isOpen ? 'open' : 'closed']}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Hide internal links' : 'Show internal links'}
        aria-expanded={isOpen}
      >
        <PixelIcon name={isOpen ? 'lock-unlocked' : 'lock-locked'} className="h-6 w-6" />
      </button>
    </>
  );
};

export default HiddenMenu;
