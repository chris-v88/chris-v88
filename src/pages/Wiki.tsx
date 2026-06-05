import { useState } from 'react';
import wikiData from '../data/wiki.json';

type WikiEntry = {
  name: string;
  link?: string;
  description: string;
  stack?: string[];
};

export default function WikiPage() {
  const entries = wikiData.wiki as WikiEntry[];
  const [selectedEntry, setSelectedEntry] = useState<WikiEntry | null>(entries[0] ?? null);

  return (
    <div className="rw-theme min-h-screen bg-[#160f0f] p-4 sm:p-8">
      {/* Book Container */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Page - Index */}
          <div className="flex-1 bg-white rounded-xl shadow-2xl p-8 border-4 border-neutral-900 relative">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 4px)',
              }}
            ></div>

            <h2 className="relative z-10 sm:text-xl font-press-start-2p text-neutral-900 mb-6 border-b-4 border-neutral-900 pb-3">
              Index
            </h2>

            <div className="relative z-10 space-y-2">
              {entries.map((entry, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEntry(entry)}
                  className={`w-full text-left px-4 py-3 rounded transition-all ${
                    selectedEntry?.name === entry.name
                      ? 'bg-[#A51919] text-white'
                      : 'text-neutral-800 hover:bg-neutral-100 hover:translate-x-1'
                  }`}
                >
                  <span className="font-pixelify-sans text-[17px] font-bold">{entry.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Page - Content */}
          <div className="flex-1 bg-white rounded-xl shadow-2xl p-8 border-4 border-neutral-900 relative">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 4px)',
              }}
            ></div>

            {selectedEntry ? (
              <div className="relative z-10">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-press-start-2p text-neutral-900 mb-3 leading-relaxed">
                  {selectedEntry.name}
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-[#A51919] to-transparent mb-6"></div>

                {/* Description */}
                <p className="text-neutral-800 text-[16px] leading-relaxed mb-8 font-pixelify-sans">
                  {selectedEntry.description}
                </p>

                {/* Link Button */}
                {selectedEntry.link && (
                  <a
                    href={selectedEntry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 bg-[#A51919] text-white rounded transition hover:bg-[#8B1515] font-pixelify-sans font-bold text-[14px] border-2 border-neutral-900 mb-8"
                  >
                    Learn More →
                  </a>
                )}

                {/* Stack/Tags */}
                {selectedEntry.stack && selectedEntry.stack.length > 0 && (
                  <div>
                    <h3 className="text-neutral-900 font-press-start-2p text-xs mb-4">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedEntry.stack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="font-pixelify-sans text-[14px] font-normal bg-[#22388C] text-white px-3 py-0.5 rounded-full inline-block"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-neutral-600 font-pixelify-sans text-[18px] relative z-10">
                Select an entry to read
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
