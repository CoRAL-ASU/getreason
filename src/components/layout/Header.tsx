import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sectionsRef.current && !sectionsRef.current.contains(e.target as Node)) {
        setIsSectionsOpen(false);
      }
    };
    if (isSectionsOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isSectionsOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Abstract', href: '#abstract' },
    { name: 'Dataset', href: '#dataset' },
    { name: 'Methodology', href: '#methodology' },
    { name: 'Results', href: '#results' },
    { name: 'Authors', href: '#authors' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo and Title */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GR</span>
              </div>
              <span className="font-bold text-xl text-gray-900">GETReason</span>
            </div>
          </div>

          {/* Center: Sections Navigation */}
          <div className="hidden md:flex items-center flex-1 min-w-0 justify-center">
            <div className="relative" ref={sectionsRef}>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
                onClick={() => setIsSectionsOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={isSectionsOpen}
              >
                <span>Sections</span>
                <ChevronDown size={16} className={`transition-transform ${isSectionsOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                  isSectionsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-5 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setIsSectionsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="hidden md:flex items-center flex-shrink-0 pl-8">
            <a href="#resources" className="btn bg-black text-white hover:bg-gray-900">
              Paper Resources
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-2 pb-4">
            {/* Section Navigation */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="my-2 border-gray-200" />
            <a 
              href="#resources" 
              className="px-4 py-2 text-black font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Paper Resources
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};