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

  const getColorClasses = (color) => {
    const colorMap = {
      cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
      purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      orange: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
      lime: 'text-lime-400 border-lime-500/30 bg-lime-500/10'
    };
    return colorMap[color];
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
                className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive
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

        {/* Skills Display */}
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {skills[activeCategory]?.map((skill, index) => (
              <div
                key={skill.name}
                className="group"
                style={{
                  animation: isVisible ? `slide-in-right 0.5s ease-out ${index * 0.1}s forwards` : 'none',
                  opacity: isVisible ? 1 : 0
                }}
              >
                {/* Skill Card */}
                <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getGradientClasses(activeColor)} flex items-center justify-center font-black text-white text-xl`}>
                        {skill.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{skill.name}</h3>
                        <p className="text-sm text-slate-500">Proficiency Level</p>
                      </div>
                    </div>
                    <div className={`text-3xl font-black bg-gradient-to-r ${getGradientClasses(activeColor)} bg-clip-text text-transparent`}>
                      {skill.level}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getGradientClasses(activeColor)} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;