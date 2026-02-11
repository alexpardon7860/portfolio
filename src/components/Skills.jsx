import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Palette, Cpu, Brain, Sparkles } from 'lucide-react';
import { skills } from '../data/mock';

const Skills = ({ id }) => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: Code, color: 'cyan' },
    { id: 'backend', label: 'Backend', icon: Database, color: 'blue' },
    { id: 'programming', label: 'Programming', icon: Cpu, color: 'purple' },
    { id: 'design', label: 'Design', icon: Palette, color: 'orange' },
    { id: 'dataScience', label: 'Data Science', icon: Brain, color: 'lime' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getGradientClasses = (color) => {
    const gradientMap = {
      cyan: 'from-cyan-500 to-blue-600',
      blue: 'from-blue-500 to-indigo-600',
      purple: 'from-purple-500 to-pink-600',
      orange: 'from-orange-500 to-red-600',
      lime: 'from-lime-500 to-green-600'
    };
    return gradientMap[color];
  };

  const activeColor = categories.find(c => c.id === activeCategory)?.color || 'cyan';

  return (
    <section id={id} ref={sectionRef} className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Technical Arsenal</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Skills & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and intelligent solutions
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${isActive
                  ? `bg-gradient-to-r ${getGradientClasses(category.color)} text-white shadow-2xl shadow-${category.color}-500/50 scale-110`
                  : 'bg-slate-800/50 backdrop-blur-sm text-slate-300 hover:bg-slate-800 border border-slate-700 hover:border-slate-600'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {category.label}
                </span>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl animate-shimmer"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Display - Clean Design */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills[activeCategory]?.map((skill, index) => {
              return (
                <div
                  key={skill.name}
                  className="group relative"
                  style={{
                    animation: isVisible ? `scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s forwards` : 'none',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.8)'
                  }}
                >
                  {/* Main Card */}
                  <div className="relative p-8 bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">

                    {/* Hexagonal Pattern Background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2300ffff' stroke-width='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                      }}></div>
                    </div>

                    {/* Glow Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${getGradientClasses(activeColor)} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}></div>

                    {/* Content */}
                    <div className="relative flex flex-col items-center text-center">
                      {/* Floating Particles */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${getGradientClasses(activeColor)} opacity-40`}
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animation: `particle-float ${3 + i}s ease-in-out infinite`,
                              animationDelay: `${i * 0.5}s`
                            }}
                          ></div>
                        ))}
                      </div>

                      {/* Glowing Orbs */}
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                      {/* Icon/Letter */}
                      <div className={`w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br ${getGradientClasses(activeColor)} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden`}>
                        <span className="text-3xl font-black text-white relative z-10">{skill.name.charAt(0)}</span>
                        {/* Shimmer effect on icon */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>

                      {/* Skill Name */}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {skill.name}
                      </h3>

                      {/* Animated Line Decoration */}
                      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mt-24">
          <h3 className="text-3xl font-black text-white text-center mb-12">
            Soft Skills & <span className="text-cyan-400">Attributes</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Communication', 'Leadership', 'Problem-Solving', 'Critical Thinking', 'Time Management', 'Creativity', 'Team Collaboration', 'Adaptability'].map((skill, index) => (
              <div
                key={skill}
                className="group p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105"
                style={{
                  animation: isVisible ? `fade-in-up 0.5s ease-out ${0.8 + index * 0.05}s forwards` : 'none',
                  opacity: isVisible ? 1 : 0
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{skill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, -15px);
            opacity: 0.5;
          }
          50% {
            transform: translate(-15px, -25px);
            opacity: 0.7;
          }
          75% {
            transform: translate(15px, -10px);
            opacity: 0.5;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;