import React from 'react';
import { Award, Trophy, Rocket, Star, Target, Zap } from 'lucide-react';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';

const RecentAchievements = () => {
  const achievementsData = [
    {
      id: 1,
      title: "AI Hackathon Winner",
      date: "Jan 2024",
      content: "Won first place in national AI/ML hackathon for developing an innovative solution using deep learning.",
      category: "Competition",
      icon: Trophy,
      relatedIds: [2, 3],
      status: "completed",
      energy: 100,
    },
    {
      id: 2,
      title: "Published Research",
      date: "Feb 2024",
      content: "Published paper on machine learning optimization techniques in IEEE conference proceedings.",
      category: "Research",
      icon: Star,
      relatedIds: [1, 4],
      status: "completed",
      energy: 95,
    },
    {
      id: 3,
      title: "Open Source Contribution",
      date: "Mar 2024",
      content: "Major contribution to popular React library, merged 15+ PRs improving performance by 40%.",
      category: "Development",
      icon: Rocket,
      relatedIds: [1, 5],
      status: "completed",
      energy: 85,
    },
    {
      id: 4,
      title: "Tech Talk Speaker",
      date: "Apr 2024",
      content: "Delivered keynote speech on full-stack development best practices at tech conference.",
      category: "Speaking",
      icon: Target,
      relatedIds: [2, 6],
      status: "in-progress",
      energy: 70,
    },
    {
      id: 5,
      title: "Certification",
      date: "May 2024",
      content: "Achieved AWS Solutions Architect Professional certification with distinction.",
      category: "Learning",
      icon: Award,
      relatedIds: [3, 6],
      status: "in-progress",
      energy: 60,
    },
    {
      id: 6,
      title: "Product Launch",
      date: "Jun 2024",
      content: "Leading development of innovative SaaS platform, preparing for beta launch.",
      category: "Product",
      icon: Zap,
      relatedIds: [4, 5],
      status: "pending",
      energy: 40,
    },
  ];

  return (
    <section id="achievements" className="relative min-h-screen bg-slate-950 overflow-visible">
      {/* Section Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-20 pb-8 bg-gradient-to-b from-slate-950 via-slate-950/95 to-transparent">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore my journey through interactive orbital timeline - click on any node to discover details
          </p>
        </div>
      </div>

      {/* Orbital Timeline */}
      <div className="relative overflow-visible px-4 md:px-0">
        <RadialOrbitalTimeline timelineData={achievementsData} />
      </div>

      {/* Instructions Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">Click any node to explore • Auto-rotating timeline</span>
        </div>
      </div>
    </section>
  );
};

export default RecentAchievements;
