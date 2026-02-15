import React, { useEffect, useRef, useState } from 'react';
import { Code, Brain, Palette, Award, Rocket, Zap, Target, Send } from 'lucide-react';
import { personalInfo } from '../data/mock';
import ProfileCard from './ProfileCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from '../hooks/use-toast';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Netlify serverless function
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      await response.json();

      toast({
        title: "Message Sent! ✨",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsContactDialogOpen(false);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  setIsContactDialogOpen(true);
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
                className={`group p-8 bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-${item.color}-500/50 transition-all duration-500 hover:transform hover:scale-105 ${isVisible ? 'animate-slide-up-fade' : 'opacity-0'
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

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Let's Talk
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default About;