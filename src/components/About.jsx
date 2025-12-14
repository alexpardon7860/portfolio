import React, { useEffect, useRef, useState } from 'react';
import { Code, Brain, Palette, Award, Rocket, Zap, Target } from 'lucide-react';
import { personalInfo } from '../data/mock';
import ProfileCard from './ProfileCard';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const expertise = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Building responsive, scalable web applications with modern frameworks',
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Creating intelligent systems with deep learning and neural networks',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing beautiful, user-centric interfaces that delight users',
      color: 'orange',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Award,
      title: 'Technical Leadership',
      description: 'Leading teams and driving innovation at AI Experience Centre',
      color: 'lime',
      gradient: 'from-lime-500 to-green-600'
    }
  ];

  const principles = [
    { icon: Rocket, text: 'Ship fast, iterate faster', color: 'cyan' },
    { icon: Zap, text: 'Code with purpose & passion', color: 'yellow' },
    { icon: Target, text: 'Build solutions that matter', color: 'blue' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-cyan-400 font-semibold text-sm tracking-wider uppercase mb-4 block">About Me</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Turning <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ideas</span> into
            <br />reality with code
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Passionate about creating exceptional digital experiences through clean code and innovative solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mb-20 items-start">
          {/* Left - Profile Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 flex justify-center">
              <ProfileCard
                avatarUrl="/praveen-profile.png"
                iconUrl="/tech-pattern.svg"
                grainUrl="https://grainy-gradients.vercel.app/noise.svg"
                name={personalInfo.name}
                title={personalInfo.title}
                handle="gargpraveen"
                status="Available for work"
                contactText="Contact"
                showBehindGradient={true}
                onContactClick={() => {
                  window.location.href = `mailto:${personalInfo.email}`;
                }}
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {personalInfo.bio}
              </p>
              
              {/* Principles */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                  My Principles
                </h3>
                <div className="grid gap-4">
                  {principles.map((principle, index) => {
                    const Icon = principle.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${principle.color}-500/20 to-${principle.color}-600/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 text-${principle.color}-400`} />
                        </div>
                        <span className="text-lg font-medium text-white">{principle.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="group p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl font-black text-cyan-400 mb-2">2+</div>
                <div className="text-sm text-slate-400">Years Building</div>
              </div>
              <div className="group p-6 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl font-black text-blue-400 mb-2">6+</div>
                <div className="text-sm text-slate-400">Projects Shipped</div>
              </div>
              <div className="group p-6 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl font-black text-purple-400 mb-2">8.4</div>
                <div className="text-sm text-slate-400">Academic GPA</div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={personalInfo.resumeUrl}
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 group"
            >
              <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertise.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group p-8 bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-${item.color}-500/50 transition-all duration-500 hover:transform hover:scale-105 ${
                  isVisible ? 'animate-slide-up-fade' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-2xl group-hover:shadow-${item.color}-500/50 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up-fade {
          animation: slide-up-fade 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;