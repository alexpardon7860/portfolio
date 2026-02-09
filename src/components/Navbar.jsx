import React, { useState, useEffect } from 'react';
import { Home, User, Code, FolderKanban, Briefcase, Mail, FileDown } from 'lucide-react';
import { personalInfo } from '../data/mock';
import Dock from './Dock';
import GooeyNav from './GooeyNav';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', icon: <User className="w-5 h-5" /> },
    { label: 'Skills', href: '#skills', icon: <Code className="w-5 h-5" /> },
    { label: 'Projects', href: '#projects', icon: <FolderKanban className="w-5 h-5" /> },
    { label: 'Experience', href: '#experience', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Contact', href: '#contact', icon: <Mail className="w-5 h-5" /> }
  ];

  const gooeyNavItems = navLinks.map(link => ({
    label: link.label,
    href: link.href
  }));

  // Mobile dock items with Home in center and varying sizes
  const dockItems = [
    ...navLinks.slice(0, 3).map(link => ({
      label: link.label,
      icon: React.cloneElement(link.icon, { className: 'w-4 h-4 text-cyan-400' }),
      onClick: (e) => handleNavClick(e, link.href)
    })),
    {
      label: 'Home',
      icon: <Home className="w-7 h-7 text-cyan-400" />,
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', window.location.pathname);
      }
    },
    ...navLinks.slice(3).map(link => ({
      label: link.label,
      icon: React.cloneElement(link.icon, { className: 'w-4 h-4 text-cyan-400' }),
      onClick: (e) => handleNavClick(e, link.href)
    })),
    {
      label: 'Resume',
      icon: <FileDown className="w-4 h-4 text-cyan-400" />,
      onClick: () => window.open(personalInfo.resumeUrl, '_blank')
    }
  ];

  const handleNavClick = (e, href) => {
    if (e) e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <nav
        className={`absolute md:fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${isScrolled
            ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-800'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#hero"
              className="text-2xl font-bold"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', window.location.pathname);
                setActiveNavIndex(0);
              }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {personalInfo.name.split(' ')[0]}
              </span>
            </a>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-4">
              <GooeyNav
                items={gooeyNavItems}
                initialActiveIndex={activeNavIndex}
              />
              <a
                href={personalInfo.resumeUrl}
                download
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 ml-4"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Dock Navigation - Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999]">
        <Dock
          items={dockItems}
          magnification={55}
          distance={140}
          panelHeight={60}
          baseItemSize={36}
        />
      </div>
    </>
  );
}; export default Navbar;