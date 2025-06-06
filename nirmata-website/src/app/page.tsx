'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing cookie consent
    const consent = localStorage.getItem('cookieConsent');
    setCookieConsent(consent);

    // Handle scroll for header visibility
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setShowHeader(scrollPosition > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCookieConsent = (consent: 'accepted' | 'declined') => {
    localStorage.setItem('cookieConsent', consent);
    setCookieConsent(consent);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]">
      {/* Cookie Consent Banner */}
      {cookieConsent === null && (
        <div className="fixed top-0 left-0 right-0 bg-[#222] text-white p-4 z-40 border-b border-gray-700">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleCookieConsent('accepted')}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handleCookieConsent('declined')}
                className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 bg-[#222] z-40 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="flex justify-between items-center p-4 max-w-6xl mx-auto">
          <div className="logo">
            <Image
              src="/nirmata_logo.svg"
              alt="Nirmata Logo"
              width={120}
              height={60}
              className="invert"
            />
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6">
            <li><a href="#hero" className="text-white hover:opacity-80 transition-opacity">Home</a></li>
            <li><a href="#about" className="text-white hover:opacity-80 transition-opacity">About</a></li>
            <li><a href="#events" className="text-white hover:opacity-80 transition-opacity">Events</a></li>
            <li><a href="#contact" className="text-white hover:opacity-80 transition-opacity">Contact</a></li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center w-8 h-6 gap-1 z-50 relative"
          >
            <span className={`w-8 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-[#222] md:hidden flex flex-col items-center justify-center gap-8 text-2xl z-50">
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 text-white text-3xl"
              >
                ×
              </button>
              <a href="#hero" onClick={closeMenu} className="text-white hover:opacity-80 transition-opacity">Home</a>
              <a href="#about" onClick={closeMenu} className="text-white hover:opacity-80 transition-opacity">About</a>
              <a href="#events" onClick={closeMenu} className="text-white hover:opacity-80 transition-opacity">Events</a>
              <a href="#contact" onClick={closeMenu} className="text-white hover:opacity-80 transition-opacity">Contact</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Desktop Background Image - hidden on mobile */}
        <Image 
          src="/BANDFRONT.jpg" 
          alt="Nirmata Band" 
          fill
          className="object-cover hidden sm:block"
          priority
          sizes="100vw"
        />
        {/* Mobile Background Image - hidden on desktop */}
        <Image 
          src="/DSC_4316.jpg" 
          alt="Nirmata Band Mobile" 
          fill
          className="object-cover block sm:hidden"
          priority
          sizes="100vw"
        />
        {/* Logo content */}
        <div className="relative z-20 text-center transform -translate-y-5">
          <Image
        src="/nirmata_logo.svg"
        alt="Nirmata Logo"
        width={375}
        height={185}
        className="invert mx-auto w-64 h-auto sm:w-[375px]"
        priority
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Nirmata</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Nirmata is a Copenhagen-based modern heavy rock band formed in 2023. 
              Drawing inspiration from diverse musical influences, we create a unique 
              sound that combines powerful riffs, dynamic rhythms, and emotionally charged lyrics.
            </p>
            <p>
              Our music explores themes of personal growth, societal challenges, and human connection, 
              delivered through an energetic live performance that engages audiences across Denmark 
              and beyond. With our debut singles gaining traction and a growing fanbase, 
              we&apos;re excited to share our musical journey with listeners worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="releases" className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Listen to our music</h2>
          
          {cookieConsent === 'declined' && (
            <div className="text-center mb-8 p-6 bg-[#2a2a2a] rounded-lg">
              <p>
                To listen to our music directly on the website, please accept cookies. 
                Alternatively, you can find us on{' '}
                <a href="https://open.spotify.com/artist/YOUR_ARTIST_ID" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Spotify
                </a>.
              </p>
            </div>
          )}
          
          {cookieConsent === 'accepted' && (
            <div className="space-y-6">
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/7dRn4DDzSEYPvcT6Ugx0dB?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/4aQOGLRqFsAsUQhxBAHgSv?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/0vEdX9KpT36waoGBgYEIy1?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">We&apos;re playing:</h2>
          <div className="space-y-6">
            <a 
              href="https://www.facebook.com/events/1345915849727062/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <Image
                    src="/VBRF2.png"
                    alt="Vesterbro Rock Fest"
                    width={400}
                    height={300}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-2xl font-bold mb-4">Vesterbro Rock Fest</h3>
                  <p className="mb-2"><strong>Date:</strong> March 15, 2025</p>
                  <p><strong>Location:</strong> Studenterhuset, Copenhagen</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section id="instagram" className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for Instagram feed - would need Instagram API integration */}
            <div className="bg-[#2a2a2a] aspect-square rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Instagram Post 1</p>
            </div>
            <div className="bg-[#2a2a2a] aspect-square rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Instagram Post 2</p>
            </div>
            <div className="bg-[#2a2a2a] aspect-square rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Instagram Post 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
          <p className="text-center mb-8 text-lg">
            Interested in booking us or just want to say hello? Send us a message!
          </p>
          
          <form 
            action="https://formsubmit.co/fover99@gmail.com" 
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="_subject" value="New message from Nirmata website!" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://www.nirmata.dk/" />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write something..."
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-vertical"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#222] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">&copy; 2025 Nirmata. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/NirmataDK" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              Facebook
            </a>
            <a href="https://www.instagram.com/nirmata_dk/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              Instagram
            </a>
            <a href="https://distrokid.com/hyperfollow/nirmata/circles" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
              Stream our music
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
