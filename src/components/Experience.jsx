import React from 'react';
import { Briefcase, GraduationCap, Award as AwardIcon, Trophy, Sparkles, Award, Rocket, Star, Target, Zap } from 'lucide-react';
import { experience, education, certifications } from '../data/mock';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';

const Experience = () => {
  const achievementsData = [
    {
      id: 1,
      title: "NSS (National Service Scheme) Member",
      date: "Ongoing",
      content: "Actively volunteered in community service initiatives, contributing to social welfare and community outreach.",
      category: "Community Service",
      icon: Star,
      relatedIds: [2, 3],
      status: "in-progress",
      energy: 85,
    },
    {
      id: 2,
      title: "Smart India Hackathon – Team Leader",
      date: "2024",
      content: "Led the team to secure second position, demonstrating leadership and collaborative problem-solving on a national platform.",
      category: "Competition",
      icon: Trophy,
      relatedIds: [1, 4, 6],
      status: "completed",
      energy: 100,
    },
    {
      id: 3,
      title: "TechnoSapiens 2025 Coordinator",
      date: "2025",
      content: "Coordinated the graphic design event, ensuring smooth execution and a successful creative showcase.",
      category: "Event Management",
      icon: Target,
      relatedIds: [1, 4],
      status: "completed",
      energy: 90,
    },
    {
      id: 4,
      title: "NexHack 1.0 Hackathon Participation",
      date: "2024",
      content: "Participated in a national-level hackathon at IITM, contributing innovative ideas and teamwork.",
      category: "Competition",
      icon: Rocket,
      relatedIds: [2, 3, 5],
      status: "completed",
      energy: 75,
    },
    {
      id: 5,
      title: "Runner-Up in AI Innovations Competition",
      date: "2024",
      content: "Achieved first runner-up in the AI Innovations competition, showcasing strong technical and problem-solving skills.",
      category: "Competition",
      icon: Award,
      relatedIds: [2, 4, 6],
      status: "completed",
      energy: 95,
    },
    {
      id: 6,
      title: "\"From Idea-to-Impact\" Social Media Infographic Competition",
      date: "2024",
      content: "Participated in the \"From Idea-to-Impact\" competition at IITM Janakpuri, demonstrating creativity and communication skills in social media storytelling.",
      category: "Creative",
      icon: Zap,
      relatedIds: [2, 5],
      status: "completed",
      energy: 80,
    },
  ];

  return (
    <section id="experience" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">My Journey</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            Experience & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Education</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white">Work Experience</h3>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className="group relative"
                  style={{
                    animation: `slide-in-left 0.6s ease-out ${index * 0.2}s forwards`,
                    opacity: 0
                  }}
                >
                  {/* Timeline Line */}
                  {index !== experience.length - 1 && (
                    <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
                  )}

                  {/* Card */}
                  <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-cyan-500/50 p-8 transition-all duration-300 hover:bg-slate-800/50 group-hover:scale-105">
                    {/* Timeline Dot */}
                    <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full border-4 border-slate-900 group-hover:scale-125 transition-transform"></div>

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h4>
                        <p className="text-cyan-400 font-semibold text-lg mt-1">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded-full">
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-slate-400 mb-6">{exp.duration}</p>
                    <p className="text-slate-300 mb-4">{exp.description}</p>

                    <ul className="space-y-2 mb-6">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-slate-400 flex items-start gap-3">
                          <span className="text-cyan-400 mt-1.5 text-lg">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-900 text-slate-300 text-xs font-medium rounded-lg border border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & More */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="group p-8 bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800/50 hover:scale-105"
                    style={{
                      animation: `slide-in-right 0.6s ease-out ${0.2 + index * 0.2}s forwards`,
                      opacity: 0
                    }}
                  >
                    <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                    {edu.specialization && (
                      <p className="text-blue-400 font-semibold mb-2">{edu.specialization}</p>
                    )}
                    <p className="text-slate-300 mb-3">{edu.institution}</p>
                    <p className="text-slate-400 text-sm mb-4">{edu.duration}</p>
                    {edu.cgpa && (
                      <p className="text-cyan-400 font-bold text-lg mb-4">CGPA: {edu.cgpa}</p>
                    )}
                    {edu.coursework.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 bg-slate-900 text-slate-300 text-xs font-medium rounded-lg border border-slate-700"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
                  <AwardIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-lime-500/50 transition-all duration-300 hover:bg-slate-800/50"
                    style={{
                      animation: `fade-in 0.6s ease-out ${0.6 + index * 0.1}s forwards`,
                      opacity: 0
                    }}
                  >
                    <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                    <p className="text-lime-400 text-sm font-semibold">{cert.issuer}</p>
                    <p className="text-slate-500 text-sm">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Centered Achievements Section */}
        <div className="mt-16">
          <div className="text-center mb-0 md:mb-8">
            <div className="inline-flex items-center gap-3 mb-1 md:mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white">Achievements</h3>
            </div>
            <p className="text-slate-400 text-sm md:text-lg mb-0">Interactive timeline - click any node to explore details</p>
          </div>

          <div className="relative h-[500px] md:h-[700px] w-full -mt-8 md:mt-0">
            <RadialOrbitalTimeline timelineData={achievementsData} />

            {/* Instructions Overlay */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm text-slate-300">Click nodes to explore • Auto-rotating timeline</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;