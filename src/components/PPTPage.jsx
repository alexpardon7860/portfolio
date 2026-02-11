import React, { useState, useEffect } from 'react';
import { Download, FileText, Presentation, ArrowLeft, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { personalInfo } from '../data/mock';

const PPTPage = () => {
    const [downloadCount, setDownloadCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const CORRECT_PASSWORD = 'praveentechhead';

    // Check if user is already authenticated (stored in sessionStorage)
    useEffect(() => {
        const auth = sessionStorage.getItem('ppt_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('ppt_auth', 'true');
            setError('');
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    const handleDownload = () => {
        setDownloadCount(prev => prev + 1);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const pptFiles = [
        {
            id: 1,
            title: "Evolution and Vision of the Internet of Things",
            description: "Comprehensive presentation on IoT evolution, technologies, and future vision",
            filename: "Evolution-and-Vision-of-the-Internet-of-Things.pptx",
            url: personalInfo.pptUrl,
            size: "14.5 MB",
            slides: 30,
            gradient: "from-purple-500 to-pink-600"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-8 right-8 z-50 animate-slide-in">
                    <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/50 rounded-2xl px-6 py-4 flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                        <span className="text-white font-semibold">Download Started!</span>
                    </div>
                </div>
            )}

            {/* Password Authentication Screen */}
            {!isAuthenticated ? (
                <div className="max-w-md mx-auto px-6 py-12 relative z-10 min-h-screen flex flex-col justify-center">
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 p-8 shadow-2xl">
                        {/* Lock Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl">
                                <Lock className="w-10 h-10 text-purple-400" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-black text-white mb-2 text-center">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Protected Area
                            </span>
                        </h2>
                        <p className="text-slate-400 text-center mb-8">
                            Enter password to access presentations
                        </p>

                        {/* Password Form */}
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all pr-12"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-2xl px-4 py-3 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                                Unlock Access
                            </button>
                        </form>

                        {/* Back Link */}
                        <a
                            href="/"
                            className="mt-6 inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm w-full justify-center"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </a>
                    </div>
                </div>
            ) : (
                // Main PPT Download Page (shown after authentication)
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    {/* Back Button */}
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </a>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl mb-6">
                            <Presentation className="w-10 h-10 text-purple-400" />
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Presentation
                            </span>{' '}
                            Downloads
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Download professional presentations showcasing my work, projects, and achievements
                        </p>
                    </div>

                    {/* PPT Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {pptFiles.map((ppt) => (
                            <div
                                key={ppt.id}
                                className="group bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all duration-500 overflow-hidden hover:transform hover:scale-105"
                            >
                                {/* Card Header with Icon */}
                                <div className={`bg-gradient-to-br ${ppt.gradient} p-8 relative`}>
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="relative z-10 flex items-center justify-center">
                                        <FileText className="w-16 h-16 text-white" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
                                        {ppt.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {ppt.description}
                                    </p>

                                    {/* Meta Information */}
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <FileText className="w-4 h-4" />
                                            <span>{ppt.slides} slides</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Download className="w-4 h-4" />
                                            <span>{ppt.size}</span>
                                        </div>
                                    </div>

                                    {/* Download Button */}
                                    <a
                                        href={ppt.url}
                                        download
                                        onClick={handleDownload}
                                        className={`w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${ppt.gradient} text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 group/btn mt-4`}
                                    >
                                        <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                                        Download PPT
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">Download Statistics</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-2xl border border-purple-500/20">
                                <div className="text-4xl font-black text-purple-400 mb-2">{downloadCount}</div>
                                <div className="text-sm text-slate-400">Downloads This Session</div>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl border border-cyan-500/20">
                                <div className="text-4xl font-black text-cyan-400 mb-2">{pptFiles.length}</div>
                                <div className="text-sm text-slate-400">Available Files</div>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-pink-500/10 to-red-600/10 rounded-2xl border border-pink-500/20">
                                <div className="text-4xl font-black text-pink-400 mb-2">14.5</div>
                                <div className="text-sm text-slate-400">MB Total Size</div>
                            </div>
                        </div>
                    </div>

                    {/* Info Notice */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-500 text-sm">
                            All presentations are in PowerPoint format (.pptx) and can be viewed with Microsoft PowerPoint, Google Slides, or compatible applications.
                        </p>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default PPTPage;
