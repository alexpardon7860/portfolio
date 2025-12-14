import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h3>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              {personalInfo.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-transparent"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-transparent"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-12 h-12 bg-slate-800/50 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-transparent"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 block break-all"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 block"
                >
                  {personalInfo.phone}
                </a>
              </li>
              <li className="text-slate-400">{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> using React & FastAPI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;