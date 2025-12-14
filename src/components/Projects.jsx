import React, { useState } from 'react';
import { ExternalLink, Github, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/mock';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Machine Learning', 'Web Development', 'Data Science', 'Deep Learning'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Portfolio Showcase</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Building intelligent systems and beautiful web experiences
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/30 scale-110'
                  : 'bg-slate-800/50 backdrop-blur-sm text-slate-300 hover:bg-slate-800 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              style={{
                animation: `fade-scale-in 0.6s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              {/* Project Card */}
              <div
                className="relative h-full bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden cursor-pointer group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <span className="px-3 py-1.5 bg-cyan-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1.5 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-slate-800 text-cyan-400 text-xs font-medium rounded-lg">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-5xl bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-black text-white">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-8">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-96 object-cover"
                  />
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl font-semibold">
                    {selectedProject.category}
                  </span>
                  {selectedProject.github !== '#' && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-semibold"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                  {selectedProject.demo !== '#' && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-xl text-white rounded-xl transition-all font-semibold"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white">About the Project</h4>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes fade-scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;