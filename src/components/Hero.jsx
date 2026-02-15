import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Code2, Sparkles, ArrowRight, Github, Linkedin, Mail, Send, X, Terminal, Braces } from 'lucide-react';
import { personalInfo } from '../data/mock';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from '../hooks/use-toast';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef(null);

  // Dynamic code animation state - optimized
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [fieldIndex, setFieldIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Developer profiles - memoized to prevent recreation
  const developerProfiles = useMemo(() => [
    {
      role: "Full-Stack Dev",
      skills: ["React", "Node.js", "Python"],
      passion: "Building solutions",
      available: "true"
    },
    {
      role: "AI/ML Engineer",
      skills: ["TensorFlow", "PyTorch", "NLP"],
      passion: "Creating intelligence",
      available: "true"
    },
    {
      role: "Data Scientist",
      skills: ["Analytics", "Pandas", "Scikit"],
      passion: "Finding insights",
      available: "true"
    },
    {
      role: "Cloud Architect",
      skills: ["AWS", "Docker", "K8s"],
      passion: "Scaling systems",
      available: "true"
    }
  ], []);

  // Field data structure
  const fields = useMemo(() => ['role', 'skills', 'passion', 'available'], []);

  // Get current field content
  const getCurrentFieldContent = useCallback(() => {
    const profile = developerProfiles[currentProfileIndex];
    const field = fields[fieldIndex];
    if (field === 'skills') {
      return profile.skills.join('", "');
    }
    return profile[field];
  }, [currentProfileIndex, fieldIndex, developerProfiles, fields]);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Optimized typewriter animation
  useEffect(() => {
    const fullText = getCurrentFieldContent();
    const typingSpeed = isDeleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < fullText.length) {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        } else {
          // Finished typing current field
          if (fieldIndex < fields.length - 1) {
            // Move to next field after brief pause
            setTimeout(() => {
              setFieldIndex(prev => prev + 1);
              setDisplayedText('');
            }, 400);
          } else {
            // All fields done, start deleting after longer pause
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // Finished deleting current field
          if (fieldIndex > 0) {
            setFieldIndex(prev => prev - 1);
          } else {
            // All fields deleted, move to next profile
            setIsDeleting(false);
            setCurrentProfileIndex((prev) => (prev + 1) % developerProfiles.length);
          }
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, fieldIndex, getCurrentFieldContent, fields.length, developerProfiles.length]);

  // Parse displayed content for rendering
  const displayedCode = useMemo(() => {
    const profile = developerProfiles[currentProfileIndex];
    const result = {
      role: '',
      skills: [],
      passion: '',
      available: ''
    };

    const currentField = fields[fieldIndex];

    // Fill completed fields
    for (let i = 0; i < fieldIndex; i++) {
      const field = fields[i];
      result[field] = field === 'skills' ? profile[field] : profile[field];
    }

    // Add current typing field
    if (currentField === 'skills') {
      const skillsText = displayedText;
      result.skills = skillsText ? skillsText.split('", "').filter(Boolean) : [];
    } else {
      result[currentField] = displayedText;
    }

    return result;
  }, [displayedText, fieldIndex, currentProfileIndex, developerProfiles, fields]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Dynamic Gradient Orbs with parallax */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"
        style={{
          animationDelay: '1s',
          transform: `translate(${(mousePosition.x - 50) * -0.02}px, ${(mousePosition.y - 50) * -0.02}px)`
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{
          animationDelay: '2s',
          transform: `translate(-50%, -50%) translate(${(mousePosition.x - 50) * 0.015}px, ${(mousePosition.y - 50) * 0.015}px)`
        }}
      />

      {/* Floating code symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-cyan-500/20 text-6xl font-mono animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }}>{'<>'}</div>
        <div className="absolute top-40 right-20 text-blue-500/20 text-4xl font-mono animate-float" style={{ animationDelay: '1s', animationDuration: '10s' }}>{'{ }'}</div>
        <div className="absolute bottom-32 left-1/4 text-purple-500/20 text-5xl font-mono animate-float" style={{ animationDelay: '2s', animationDuration: '9s' }}>{'[ ]'}</div>
        <div className="absolute top-1/3 right-1/3 text-cyan-500/20 text-3xl font-mono animate-float" style={{ animationDelay: '1.5s', animationDuration: '11s' }}>{'=>'}</div>
        <Terminal className="absolute bottom-20 right-10 w-16 h-16 text-blue-500/10 animate-float" style={{ animationDelay: '0.5s', animationDuration: '12s' }} />
        <Braces className="absolute top-1/4 right-1/4 w-12 h-12 text-purple-500/15 animate-float" style={{ animationDelay: '2.5s', animationDuration: '10s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </div>
              <span className="text-cyan-400 text-sm font-medium">Available for opportunities</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <span className="block text-xl md:text-2xl font-medium text-cyan-400 mb-2">Hello, I'm</span>
                <span className="block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
                  <span className="text-white">Praveen</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Garg
                  </span>
                </span>
              </h1>

              <div className="h-24 flex items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-xl opacity-50 animate-pulse-slow"></div>
                  <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    I <span className="text-cyan-400 inline-block hover:scale-110 transition-transform cursor-default">build</span> & <span className="text-blue-400 inline-block hover:scale-110 transition-transform cursor-default">innovate</span>
                  </h2>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Full-stack developer & data scientist crafting intelligent solutions with modern technologies and AI
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <button
                onClick={() => setIsContactDialogOpen(true)}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 hover:scale-105"
              >
                Let's Talk
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 hover:scale-110 group">
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all duration-300 hover:scale-110 group">
                <Github className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-slate-700 hover:border-purple-500 hover:bg-slate-800 transition-all duration-300 hover:scale-110 group">
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Content - Floating Card */}
          <div className="relative lg:block hidden animate-float" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse-slow"></div>

              {/* Main card */}
              <div
                className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/10"
                style={{
                  transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * -0.01}deg) rotateY(${(mousePosition.x - 50) * 0.01}deg)`
                }}
              >
                {/* Code window header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700/50">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer animate-pulse"></div>
                  <span className="ml-4 text-sm text-slate-500 font-mono">developer.js</span>
                  <div className="ml-auto flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></div>
                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>

                {/* Code content */}
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">1</span>
                    <span className="text-slate-400"><span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> = {'{'}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">2</span>
                    <span className="text-slate-400 pl-4">
                      name: <span className="text-orange-400">"Praveen Garg"</span>,
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">3</span>
                    <span className="text-slate-400 pl-4">
                      role: <span className="text-orange-400">"{displayedCode.role}</span>
                      {fieldIndex === 0 && showCursor && <span className="text-orange-400">|</span>}
                      <span className="text-orange-400">"</span>,
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">4</span>
                    <span className="text-slate-400 pl-4">
                      skills: [
                      {displayedCode.skills.map((skill, idx) => (
                        <span key={idx}>
                          <span className="text-orange-400">"{skill}"</span>
                          {idx < displayedCode.skills.length - 1 && ', '}
                        </span>
                      ))}
                      {fieldIndex === 1 && showCursor && <span className="text-orange-400">|</span>}
                      ],
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">5</span>
                    <span className="text-slate-400 pl-4">
                      passion: <span className="text-orange-400">"{displayedCode.passion}</span>
                      {fieldIndex === 2 && showCursor && <span className="text-orange-400">|</span>}
                      <span className="text-orange-400">"</span>,
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">6</span>
                    <span className="text-slate-400 pl-4">
                      available: <span className="text-green-400">{displayedCode.available}</span>
                      {fieldIndex === 3 && showCursor && <span className="text-green-400">|</span>}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600 select-none">7</span>
                    <span className="text-slate-400">{'}'};</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">2+</div>
                    <div className="text-xs text-slate-500">Years Exp</div>
                  </div>
                  <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-blue-400 mb-1 group-hover:scale-110 transition-transform">6+</div>
                    <div className="text-xs text-slate-500">Projects</div>
                  </div>
                  <div className="text-center group cursor-default">
                    <div className="text-3xl font-bold text-purple-400 mb-1 group-hover:scale-110 transition-transform">8.4</div>
                    <div className="text-xs text-slate-500">CGPA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee */}
        <div className="mt-20 overflow-hidden animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-slate-500 font-medium">Tech Stack</span>
          </div>
          <div className="flex gap-4 animate-scroll">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 shrink-0">
                {['Python', 'React', 'JavaScript', 'Machine Learning', 'TensorFlow', 'FastAPI', 'MongoDB', 'WordPress', 'PHP', 'Figma'].map((tech) => (
                  <div key={tech} className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 text-slate-300 font-medium whitespace-nowrap hover:border-cyan-500/50 transition-colors">
                    {tech}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-slate-700 group-hover:border-cyan-500 rounded-full flex justify-center p-2 transition-colors">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
        </div>
      </button>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
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

export default Hero;