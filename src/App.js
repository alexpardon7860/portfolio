import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import DomeGallery from "./components/DomeGallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Skills id="skills" />
      <Projects />
      <Experience id="experience" />
      <section
        id="gallery"
        className="bg-slate-950"
        style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
      >
        <div className="text-center py-8 md:py-12 w-full px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Certificate Gallery</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">Interactive 3D Certificate Gallery</p>
        </div>
        <div style={{ flex: '1 1 auto', minHeight: '700px', width: '100%', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <DomeGallery
              openedImageWidth="min(600px, 90vw)"
              openedImageHeight="min(360px, 54vw)"
              fit={0.75}
              minRadius={400}
              grayscale={false}
            />
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
