'use client';

import { Music, Users, Users2, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePerformanceMonitor } from '../../../components/PerformanceMonitor';

export default function FacelessEPK() {
  // Performance monitoring
  usePerformanceMonitor('FacelessEPK');

  const [showHero, setShowHero] = useState(true);

  // Smooth scroll function for navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    // Preload critical images for better performance
    const preloadImages = () => {
      const imageUrls = ['/FACELESS FINAL.png', '/BANDFRONT.jpg'];
      imageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      });
    };
    preloadImages();

    // Prevent body scroll when hero is visible
    if (showHero) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Also listen for scroll to hide hero immediately
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [showHero]);

  return (
    <div className="bg-black text-white">
      {/* Discrete Return Navigation - Fixed Position */}
      <div className={`fixed top-4 left-4 z-50 transition-opacity duration-500 ${showHero ? 'opacity-0' : 'opacity-100'}`}>
        <Link 
          href="/"
          className="btn-nirmata p-3 rounded-full backdrop-blur-md bg-nirmata-dark/80 hover:bg-nirmata-primary/20 border border-nirmata-primary/30 hover:border-nirmata-primary/50 transition-all duration-300 group"
          title="Return to Nirmata Main Site"
        >
          <Home className="w-5 h-5 text-nirmata-primary group-hover:text-white transition-colors duration-300" />
        </Link>
      </div>

      {/* EPK Unique Navigation - Fixed Position */}
      <div className={`fixed top-4 right-4 z-50 transition-opacity duration-500 ${showHero ? 'opacity-0' : 'opacity-100'}`}>
        <nav className="flex gap-2 backdrop-blur-md bg-nirmata-dark/80 p-2 rounded-2xl border border-epk-cyan/30" role="navigation" aria-label="EPK Navigation">
          <button 
            onClick={() => scrollToSection('listen')}
            className="btn-epk px-4 py-2 text-sm rounded-xl hover:bg-epk-cyan/20 hover:text-epk-cyan transition-all duration-300"
            aria-label="Navigate to Listen section"
          >
            Listen
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="btn-epk px-4 py-2 text-sm rounded-xl hover:bg-epk-cyan/20 hover:text-epk-cyan transition-all duration-300"
            aria-label="Navigate to About section"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-epk px-4 py-2 text-sm rounded-xl hover:bg-epk-cyan/20 hover:text-epk-cyan transition-all duration-300"
            aria-label="Navigate to Contact section"
          >
            Contact
          </button>
        </nav>
      </div>

      {/* Hero Section - Only shows on initial load */}
      <div className={`fixed inset-0 z-40 min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 bg-black cursor-pointer ${
        showHero ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`} onClick={() => setShowHero(false)}>
        <div className="absolute inset-0">
          <Image 
            src="/FACELESS FINAL.png" 
            alt="Faceless Album Art" 
            fill
            className="object-cover opacity-50 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center animate-fadeIn">
          <div className="mb-6 animate-slideDown text-center">
            <h1 className='text-2xl md:text-5xl text-nirmata-light tracking-widest'>
              N I R M A T A 
            </h1>
            <h2 className='text-lg md:text-2xl text-center text-gray-400 tracking-wide mt-2'>
              X
            </h2>
            <h1 className='text-2xl md:text-5xl text-center text-nirmata-light tracking-widest'>
              Last Mile
            </h1>
            <h3 className='text-2xl md:text-3xl text-center tracking-wide text-nirmata-light'>
              Presents
            </h3>
          </div>
          <div className="w-full max-w-md mb-8 mt-8 animate-scaleIn relative h-96">
            <Image 
              src="/FACELESS FINAL.png" 
              alt="Faceless Album Art" 
              fill
              className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20 hover:shadow-epk-cyan/30 transition-all duration-300"
            />
          </div>
          
          <h2 className="text-3xl md:text-5xl mb-8 text-gradient-epk tracking-widest animate-slideUp">
            FACELESS
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto text-center animate-fadeIn animation-delay-500 sm:px-4">
            A powerful exploration of unhealthy relationships and their impact on mental health.
          </p>
          <p className="text-sm text-gray-500 animate-pulse animate-fadeIn animation-delay-1000 sm:text-xs">
            Click anywhere or scroll to continue...
          </p>
        </div>
      </div>    

      {/* Desktop Sticky Layout */}
      <div className={`hidden lg:block transition-opacity duration-500 ${showHero ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative flex min-h-screen">        <div className="absolute inset-0">
          <Image 
            src="/FACELESS FINAL.png" 
            alt="Faceless Album Art" 
            fill
            className="object-cover opacity-50 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        </div>

          {/* Left Sticky Column - Album Art */}
          <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center bg-black/30 backdrop-blur-sm z-10">
            <div className="w-96 h-96 animate-fadeIn relative">
              <Image 
                src="/FACELESS FINAL.png" 
                alt="Faceless Album Art"
                fill
                className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20"
              />
            </div>
          </div>
          
          {/* Right Scrolling Column - Content */}
          <div className="w-1/2 bg-black/30 backdrop-blur-sm z-10">
            {/* Track Player Section */}
            <div id="listen" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-black/20 px-12">
              <div className="w-full max-w-2xl">
                <h3 className="text-3xl font-bold mb-8 text-epk-cyan">Listen Now</h3>
                <iframe 
                  src="https://samply.app/embed/c4snNvbiocLyAWXB9HCH" 
                  style={{width: "100%", height: "200px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.12)"}}
                ></iframe>
              </div>
            </div>
            
            {/* Credits Section */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black/20 to-transparent px-12">
              <div className="w-full max-w-2xl">
                <div className="card-epk p-8">
                  <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
                    <Users2 className="w-8 h-8" />
                    Credits
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                      <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Authors</h4>
                      <p className="text-gray-300">Victor Isager Høvring, Ross James McPherson</p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                      <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Composers</h4>
                      <p className="text-gray-300">Andreas Ahrenst Foverskov, <br />
                        Victor Isager Høvring, <br />
                        Jacob Vejter Ottosen, <br />
                        Ross James McPherson, <br />  
                        Oliver Tue Lundquist Møller</p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                      <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Production</h4>
                      <p className="text-gray-300">Recording, Mix & Master: Oliver Tue Lundquist Møller</p>
                      <p className="text-gray-300">Cover Artwork: Ross James McPherson</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Release Details Section */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-black/20 px-12">
              <div className="w-full max-w-2xl">
                <div className="card-epk p-8">
                  <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
                    <Music className="w-8 h-8" />
                    Release Details
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                      <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Timeline</h4>
                      <p className="text-gray-300">Written & Recorded: 2024</p>
                      <p className="text-gray-300">Release Date: June 6, 2025</p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                      <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Publishing</h4>
                      <p className="text-gray-300">Label: LAST MILE RECORDS</p>
                      <p className="text-gray-300">Publisher: LAST MILE SONGS</p>
                      <p className="text-gray-300">ISRC: DK-B2I-24-00401</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* About Section */}
            <div id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black/20 to-transparent px-12">
              <div className="w-full max-w-2xl">
                <div className="card-epk p-8">
                  <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    About NIRMATA
                  </h3>
                  
                  {/* Band Photo */}
                  <div className="mb-8 relative h-64">
                    <Image 
                      src="/BANDFRONT.jpg" 
                      alt="NIRMATA Band Photo"
                      fill
                      className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20"
                    />
                  </div>
                  
                  {/* Band Members - Architectural Layout */}
                  <div className="mt-12 flex justify-center">
                    <div className="flex gap-0 bg-black/30 backdrop-blur-sm border border-epk-cyan/20">
                      {/* Victor Høvring - Vocals */}
                      <div className="relative flex flex-col items-center justify-end h-80 w-24 bg-gradient-to-t from-black/60 to-transparent border-r border-epk-cyan/20 hover:from-epk-cyan/20 transition-all duration-500 group">
                        <div className="absolute bottom-6 flex flex-col items-center">
                          <div className="writing-mode-vertical text-gray-300 font-light text-sm tracking-widest mb-4 group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              VOCALS
                            </span>
                          </div>
                          <div className="writing-mode-vertical text-white font-semibold text-lg tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              VICTOR HØVRING
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Andreas Foverskov - Guitar */}
                      <div className="relative flex flex-col items-center justify-end h-80 w-24 bg-gradient-to-t from-black/60 to-transparent border-r border-epk-cyan/20 hover:from-epk-cyan/20 transition-all duration-500 group">
                        <div className="absolute bottom-6 flex flex-col items-center">
                          <div className="writing-mode-vertical text-gray-300 font-light text-sm tracking-widest mb-4 group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              GUITAR
                            </span>
                          </div>
                          <div className="writing-mode-vertical text-white font-semibold text-lg tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              ANDREAS FOVERSKOV
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Ross McPherson - Bass */}
                      <div className="relative flex flex-col items-center justify-end h-80 w-24 bg-gradient-to-t from-black/60 to-transparent border-r border-epk-cyan/20 hover:from-epk-cyan/20 transition-all duration-500 group">
                        <div className="absolute bottom-6 flex flex-col items-center">
                          <div className="writing-mode-vertical text-gray-300 font-light text-sm tracking-widest mb-4 group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              BASS
                            </span>
                          </div>
                          <div className="writing-mode-vertical text-white font-semibold text-lg tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              ROSS MCPHERSON
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Jacob Ottosen - Drums */}
                      <div className="relative flex flex-col items-center justify-end h-80 w-24 bg-gradient-to-t from-black/60 to-transparent hover:from-epk-cyan/20 transition-all duration-500 group">
                        <div className="absolute bottom-6 flex flex-col items-center">
                          <div className="writing-mode-vertical text-gray-300 font-light text-sm tracking-widest mb-4 group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              DRUMS
                            </span>
                          </div>
                          <div className="writing-mode-vertical text-white font-semibold text-lg tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                            <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                              JACOB OTTOSEN
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 mt-8">
                    <p className="text-gray-300 leading-relaxed">
                      NIRMATA is a new modern rock project based in Copenhagen, Denmark, blending powerful vocals with captivating, melodic
                      riffs and thunderous drums.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      With a dynamic sound that covers both sensitive, melodic sections as well as anthemic, powerful choruses, listeners can
                      expect to hear echoes of Karnivool, VOLA, Mastodon, Black Peaks, and Dizzy Mizz Lizzy.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      In 2024, the band self-released 3 singles: Empire, Bloom, and Circles - touching on themes of religion, exclusion, and growth.
                    </p>
                    <p className="text-epk-cyan font-semibold">
                      NIRMATA will release their debut album 
                      <span className="text-epk-gold ml-2 mr-2"> AVERNO </span> 
                      on August 8, 2025 through LAST MILE RECORDS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className={`lg:hidden transition-opacity duration-500 relative ${showHero ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Image for mobile layout */}
        <div className="fixed inset-0 -z-10">
          <Image 
            src="/FACELESS FINAL.png" 
            alt="Faceless Album Art Background" 
            fill
            className="object-cover opacity-20 scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Track Player Section */}
        <div className="bg-gradient-to-b from-transparent to-black/20 py-20 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-2xl">
            <h3 className="text-3xl font-bold mb-8 text-epk-cyan text-center">Listen Now</h3>
            <iframe 
              src="https://samply.app/embed/c4snNvbiocLyAWXB9HCH" 
              style={{width: "100%", height: "200px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.12)"}}
            ></iframe>
          </div>
        </div>

        {/* Credits Section */}
        <div className="bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="card-epk p-8">
              <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
                <Users2 className="w-8 h-8" />
                Credits
              </h3>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Authors</h4>
                  <p className="text-gray-300">Victor Isager Høvring, Ross James McPherson</p>
                </div>
                <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Composers</h4>
                  <p className="text-gray-300">Andreas Ahrenst Foverskov, <br />
                    Victor Isager Høvring, <br />
                    Jacob Vejter Ottosen, <br />
                    Ross James McPherson, <br />  
                    Oliver Tue Lundquist Møller</p>
                </div>
                <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Production</h4>
                  <p className="text-gray-300">Recording, Mix & Master: Oliver Tue Lundquist Møller</p>
                  <p className="text-gray-300">Cover Artwork: Ross James McPherson</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Release Details Section */}
        <div className="bg-gradient-to-b from-transparent to-black/20 py-20 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="card-epk p-8">
              <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
                <Music className="w-8 h-8" />
                Release Details
              </h3>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Timeline</h4>
                  <p className="text-gray-300">Written & Recorded: 2024</p>
                  <p className="text-gray-300">Release Date: June 6, 2025</p>
                </div>
                <div className="p-4 rounded-xl bg-black/30 hover:bg-black/40 transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-3 text-epk-cyan">Publishing</h4>
                  <p className="text-gray-300">Label: LAST MILE RECORDS</p>
                  <p className="text-gray-300">Publisher: LAST MILE SONGS</p>
                  <p className="text-gray-300">ISRC: DK-B2I-24-00401</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="card-epk p-8">
              <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
                <Users className="w-8 h-8" />
                About NIRMATA
              </h3>
              
              {/* Band Photo */}
              <div className="mb-8 relative h-64">
                <Image 
                  src="/BANDFRONT.jpg" 
                  alt="NIRMATA Band Photo"
                  fill
                  className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20"
                />
              </div>
              {/* Band Members - Architectural Layout for Mobile */}
              <div className="mt-12 flex justify-center">
                <div className="flex gap-0 bg-black/30 backdrop-blur-sm border border-epk-cyan/20">
                  {/* Victor Høvring - Vocals */}
                  <div className="relative flex flex-col items-center justify-end h-64 w-20 bg-gradient-to-t from-black/60 to-transparent border-r border-epk-cyan/20 hover:from-epk-cyan/20 transition-all duration-500 group">
                    <div className="absolute bottom-4 flex flex-col items-center">
                      <div className="writing-mode-vertical text-gray-300 font-light text-xs tracking-widest mb-3 group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          VOCALS
                        </span>
                      </div>
                      <div className="writing-mode-vertical text-white font-semibold text-sm tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          VICTOR HØVRING
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Andreas Foverskov - Guitar */}
                  <div className="relative flex flex-col items-center justify-end h-64 w-20 bg-gradient-to-t from-black/60 to-transparent border-r border-epk-cyan/20 hover:from-epk-cyan/20 transition-all duration-500 group">
                    <div className="absolute bottom-4 flex flex-col items-center">
                      <div className="writing-mode-vertical text-gray-300 font-light text-xs tracking-widest mb-3 group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          GUITAR
                        </span>
                      </div>
                      <div className="writing-mode-vertical text-white font-semibold text-sm tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          ANDREAS FOVERSKOV
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ross McPherson - Bass */}
                  <div className="relative flex flex-col items-center justify-end h-64 w-20 bg-gradient-to-t from-black/60 to-transparent border-r border-epk-cyan/20 hover:from-epk-cyan/20 transition-all duration-500 group">
                    <div className="absolute bottom-4 flex flex-col items-center">
                      <div className="writing-mode-vertical text-gray-300 font-light text-xs tracking-widest mb-3 group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          BASS
                        </span>
                      </div>
                      <div className="writing-mode-vertical text-white font-semibold text-sm tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          ROSS MCPHERSON
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Jacob Ottosen - Drums */}
                  <div className="relative flex flex-col items-center justify-end h-64 w-20 bg-gradient-to-t from-black/60 to-transparent hover:from-epk-cyan/20 transition-all duration-500 group">
                    <div className="absolute bottom-4 flex flex-col items-center">
                      <div className="writing-mode-vertical text-gray-300 font-light text-xs tracking-widest mb-3 group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          DRUMS
                        </span>
                      </div>
                      <div className="writing-mode-vertical text-white font-semibold text-sm tracking-wider group-hover:text-epk-cyan transition-colors duration-300">
                        <span className="rotate-180" style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>
                          JACOB OTTOSEN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 mt-8">
                <p className="text-gray-300 leading-relaxed">
                  NIRMATA is a new modern rock project based in Copenhagen, Denmark, blending powerful vocals with captivating, melodic
                  riffs and thunderous drums.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  With a dynamic sound that covers both sensitive, melodic sections as well as anthemic, powerful choruses, listeners can
                  expect to hear echoes of Karnivool, VOLA, Mastodon, Black Peaks, and Dizzy Mizz Lizzy.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  In 2024, the band self-released 3 singles: Empire, Bloom, and Circles - touching on themes of religion, exclusion, and growth.
                </p>
                <p className="text-epk-cyan font-semibold">
                  NIRMATA will release their debut album 
                  <span className="text-epk-gold ml-2 mr-2"> AVERNO </span> 
                  on August 8, 2025 through LAST MILE RECORDS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Social Media Section */}
      <div id="contact" className="relative bg-gradient-to-b from-black/20 to-black py-20 backdrop-blur-sm overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-epk-cyan rounded-full blur-3xl animate-glow"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-epk-gold rounded-full blur-3xl animate-glow animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-nirmata-primary rounded-full blur-3xl animate-glow animation-delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="card-nirmata p-8 border-nirmata-primary/40 hover:border-nirmata-primary/60">
            <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gradient-epk tracking-wider">
              CONTACT & CONNECT
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h4 className="text-2xl font-bold text-epk-cyan mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-epk-cyan to-nirmata-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📧</span>
                  </div>
                  Contact Information
                </h4>
                
                {/* Management/Booking */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/30 hover:from-epk-cyan/20 hover:to-nirmata-primary/20 transition-all duration-500 border border-epk-cyan/30 hover:border-epk-cyan/50 hover:shadow-xl hover:shadow-epk-cyan/20 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-epk-cyan to-nirmata-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🎤</span>
                    </div>
                    <h5 className="text-xl font-bold text-white group-hover:text-epk-cyan transition-colors duration-300">Management & Booking</h5>
                  </div>
                  <div className="space-y-2 pl-16">
                    <p className="text-gray-300 hover:text-epk-cyan transition-colors duration-300 flex items-center gap-2">
                      <span className="text-epk-cyan">✉️</span> booking@nirmata.com
                    </p>
                    <p className="text-gray-300 hover:text-epk-cyan transition-colors duration-300 flex items-center gap-2">
                      <span className="text-epk-cyan">📱</span> +45 12 34 56 78
                    </p>
                  </div>
                </div>
                
                {/* Press & Media */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/30 hover:from-nirmata-primary/20 hover:to-epk-gold/20 transition-all duration-500 border border-epk-cyan/30 hover:border-nirmata-primary/50 hover:shadow-xl hover:shadow-nirmata-primary/20 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-nirmata-primary to-epk-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📰</span>
                    </div>
                    <h5 className="text-xl font-bold text-white group-hover:text-nirmata-primary transition-colors duration-300">Press & Media</h5>
                  </div>
                  <div className="space-y-2 pl-16">
                    <p className="text-gray-300 hover:text-nirmata-primary transition-colors duration-300 flex items-center gap-2">
                      <span className="text-nirmata-primary">✉️</span> press@nirmata.com
                    </p>
                    <p className="text-gray-300 hover:text-nirmata-primary transition-colors duration-300 flex items-center gap-2">
                      <span className="text-nirmata-primary">🌐</span> www.nirmata.dk
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media & Streaming */}
              <div className="space-y-8">
                <h4 className="text-2xl font-bold text-epk-cyan mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-epk-gold to-epk-cyan rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🌐</span>
                  </div>
                  Follow & Stream
                </h4>
                
                {/* Streaming Platforms */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/30 hover:from-green-900/20 hover:to-emerald-900/20 transition-all duration-500 border border-epk-cyan/30 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🎵</span>
                    </div>
                    <h5 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">Streaming Platforms</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pl-4">
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-green-500/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">♪</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-green-300 font-medium">Spotify</span>
                    </a>
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-red-500/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">♪</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-red-300 font-medium">Apple Music</span>
                    </a>
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-orange-500/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">♪</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-orange-300 font-medium">SoundCloud</span>
                    </a>
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">♪</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-purple-300 font-medium">Bandcamp</span>
                    </a>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-black/50 to-black/30 hover:from-blue-900/20 hover:to-indigo-900/20 transition-all duration-500 border border-epk-cyan/30 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📱</span>
                    </div>
                    <h5 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">Social Media</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pl-4">
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">f</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-blue-300 font-medium">Facebook</span>
                    </a>
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-pink-500/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">📷</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-pink-300 font-medium">Instagram</span>
                    </a>
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-sky-500/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">X</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-sky-300 font-medium">Twitter/X</span>
                    </a>
                    <a href="#" className="group/link flex items-center gap-3 p-3 rounded-xl bg-black/30 hover:bg-red-600/20 transition-all duration-300 transform hover:scale-105">
                      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">▶</span>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-red-300 font-medium">YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-epk-cyan/30 via-nirmata-primary/30 to-epk-cyan/30 border border-epk-cyan/30">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                Stay connected for the latest updates on 
                <span className="text-gradient-epk font-bold"> FACELESS </span>
                and upcoming releases!
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-20 h-1 bg-gradient-to-r from-epk-cyan to-epk-gold rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-6 border-t border-epk-cyan/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-epk-cyan font-bold">NIRMATA</div>
          <div className="flex gap-4">
            <Music className="w-6 h-6 text-epk-cyan hover:text-epk-gold cursor-pointer transition-colors duration-300" />
            <Users className="w-6 h-6 text-epk-cyan hover:text-epk-gold cursor-pointer transition-colors duration-300" />
          </div>
        </div>
      </footer>
    </div>
  );
}
