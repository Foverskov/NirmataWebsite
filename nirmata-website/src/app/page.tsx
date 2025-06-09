"use client";

import Image from "next/image";
import RevealOnScrollPercent from "@/components/RevealOnScrollPercent";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing cookie consent
    const consent = localStorage.getItem("cookieConsent");
    setCookieConsent(consent);

    // Handle scroll for header visibility
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setShowHeader(scrollPosition > heroBottom - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCookieConsent = (consent: "accepted" | "declined") => {
    localStorage.setItem("cookieConsent", consent);
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
              We use cookies to enhance your experience. By continuing to visit
              this site you agree to our use of cookies.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleCookieConsent("accepted")}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handleCookieConsent("declined")}
                className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 bg-[#222] z-40 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav className="flex justify-between items-center p-4 max-w-6xl mx-auto z-50">
          <div className="logo">
            <Image
              src="/Nirmata_Logo.svg"
              alt="Nirmata Logo"
              className="invert"
              width={120}
              height={60}
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6">
            <li>
              <a
                href="#hero"
                className="text-white hover:opacity-80 transition-opacity"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-white hover:opacity-80 transition-opacity"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#events"
                className="text-white hover:opacity-80 transition-opacity"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-white hover:opacity-80 transition-opacity"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center w-8 h-6 gap-1 z-50 relative"
          >
            <span
              className={`w-8 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`w-8 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-8 h-0.5 bg-white rounded transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
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
              <a
                href="#hero"
                onClick={closeMenu}
                className="text-white hover:opacity-80 transition-opacity"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={closeMenu}
                className="text-white hover:opacity-80 transition-opacity"
              >
                About
              </a>
              <a
                href="#events"
                onClick={closeMenu}
                className="text-white hover:opacity-80 transition-opacity"
              >
                Events
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className="text-white hover:opacity-80 transition-opacity"
              >
                Contact
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
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
            src="/Nirmata_Logo.svg"
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-left mb-12">About Nirmata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
              <RevealOnScrollPercent
                showAtPercent={20}
                // triggerType={"scrollPercent"}
              >
                <p className="text-lg leading-relaxed">
                  Our music explores themes of personal growth, societal
                  challenges, and human connection, delivered through an
                  energetic live performance that engages audiences across
                  Denmark and beyond. With our debut singles gaining traction
                  and a growing fanbase, we&apos;re excited to share our musical
                  journey with listeners worldwide.
                </p>
              </RevealOnScrollPercent>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Our Sound</h3>
              <RevealOnScrollPercent
                showAtPercent={20}
                // triggerType={"scrollPercent"}
              >
                <p className="text-lg leading-relaxed">
                  Nirmata is a Copenhagen-based modern heavy rock band formed in
                  2023. Drawing inspiration from diverse musical influences, we
                  create a unique sound that combines powerful riffs, dynamic
                  rhythms, and emotionally charged lyrics.
                </p>
              </RevealOnScrollPercent>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="releases" className="py-20 px-4 bg-[#1a1a1a] relative">
        {/* Background image layer with blur - positioned absolute so it doesn't affect content */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/FACELESS FINAL.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(3px)",
            opacity: 0.4,
          }}
        ></div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content layer - positioned relative with high z-index */}
        <div className="max-w-4xl mx-auto rounded-lg p-8 relative z-10">
          <h2 className="text-4xl font-bold text-left mb-8">
            Listen to our music
          </h2>

          {cookieConsent === "declined" && (
            <div className="text-center mb-8 p-6 bg-[#2a2a2a] rounded-lg">
              <p>
                To listen to our music directly on the website, please accept
                cookies. Alternatively, you can find us on{" "}
                <a
                  href="https://open.spotify.com/artist/YOUR_ARTIST_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Spotify
                </a>
                .
              </p>
            </div>
          )}

          {cookieConsent === "accepted" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/4JZo9vV66bCWOtTMbQ5Lxl?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/5wGUfeTr2gDfasvRk8JZYm?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/33bW9bwpiDxShx6vnxfuBc?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/7dRn4DDzSEYPvcT6Ugx0dB?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/4aQOGLRqFsAsUQhxBAHgSv?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/0vEdX9KpT36waoGBgYEIy1?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-left mb-12">
            We&apos;re playing:
          </h2>
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
                  <h3 className="text-2xl font-bold mb-4">
                    Vesterbro Rock Fest
                  </h3>
                  <p className="mb-2">
                    <strong>Date:</strong> March 15, 2025
                  </p>
                  <p>
                    <strong>Location:</strong> Studenterhuset, Copenhagen
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section id="instagram" className="py-20 px-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2a2a2a] aspect-square rounded-lg flex items-center justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DKjfgRUM0bv/?utm_source=ig_embed&utm_campaign=loading"
                data-instgrm-version="14"
                style={{
                  background: "#fff",
                  border: 0,
                  borderRadius: "3px",
                  boxShadow:
                    "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: 0,
                  width: "99.375%",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <a
                    href="https://www.instagram.com/reel/DKjfgRUM0bv/?utm_source=ig_embed&utm_campaign=loading"
                    style={{
                      background: "#FFFFFF",
                      lineHeight: 0,
                      padding: "0 0",
                      textAlign: "center",
                      textDecoration: "none",
                      width: "100%",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "50%",
                          flexGrow: 0,
                          height: "40px",
                          marginRight: "14px",
                          width: "40px",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "4px",
                            flexGrow: 0,
                            height: "14px",
                            marginBottom: "6px",
                            width: "100px",
                          }}
                        ></div>
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "4px",
                            flexGrow: 0,
                            height: "14px",
                            width: "60px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div style={{ padding: "19% 0" }}></div>
                    <div
                      style={{
                        display: "block",
                        height: "50px",
                        margin: "0 auto 12px",
                        width: "50px",
                      }}
                    >
                      <svg
                        width="50px"
                        height="50px"
                        viewBox="0 0 60 60"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            transform="translate(-511.000000, -20.000000)"
                            fill="#000000"
                          >
                            <g></g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div style={{ paddingTop: "8px" }}>
                      <div
                        style={{
                          color: "#3897f0",
                          fontFamily: "Arial,sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 550,
                          lineHeight: "18px",
                        }}
                      >
                        View this post on Instagram
                      </div>
                    </div>
                  </a>
                  <p
                    style={{
                      color: "#c9c8cd",
                      fontFamily: "Arial,sans-serif",
                      fontSize: "14px",
                      lineHeight: "17px",
                      marginBottom: 0,
                      marginTop: "8px",
                      overflow: "hidden",
                      padding: "8px 0 7px",
                      textAlign: "center",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <a
                      href="https://www.instagram.com/reel/DKjfgRUM0bv/?utm_source=ig_embed&utm_campaign=loading"
                      style={{
                        color: "#c9c8cd",
                        fontFamily: "Arial,sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        lineHeight: "17px",
                        textDecoration: "none",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      A post shared by NIRMATA (@nirmata_dk)
                    </a>
                  </p>
                </div>
              </blockquote>
            </div>
            <div className="bg-[#2a2a2a] aspect-square rounded-lg flex items-center justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DJEYKPLsCGK/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "3px",
                  boxShadow:
                    "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: 0,
                  width: "calc(100% - 2px)",
                }}
              >
                <div style={{ padding: "16px" }}>
                  {" "}
                  <a
                    href="https://www.instagram.com/p/DJEYKPLsCGK/?utm_source=ig_embed&amp;utm_campaign=loading"
                    style={{
                      background: "#FFFFFF",
                      lineHeight: 0,
                      padding: "0 0",
                      textAlign: "center",
                      textDecoration: "none",
                      width: "100%",
                    }}
                    target="_blank"
                  >
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "50%",
                          flexGrow: 0,
                          height: "40px",
                          marginRight: "14px",
                          width: "40px",
                        }}
                      ></div>{" "}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "4px",
                            flexGrow: 0,
                            height: "14px",
                            marginBottom: "6px",
                            width: "100px",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "4px",
                            flexGrow: 0,
                            height: "14px",
                            width: "60px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div style={{ padding: "19% 0" }}></div>{" "}
                    <div
                      style={{
                        display: "block",
                        height: "50px",
                        margin: "0 auto 12px",
                        width: "50px",
                      }}
                    >
                      <svg
                        width="50px"
                        height="50px"
                        viewBox="0 0 60 60"
                        version="1.1"
                        xmlns="https://www.w3.org/2000/svg"
                        xmlnsXlink="https://www.w3.org/1999/xlink"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            transform="translate(-511.000000, -20.000000)"
                            fill="#000000"
                          >
                            <g>
                              <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div style={{ paddingTop: "8px" }}>
                      {" "}
                      <div
                        style={{
                          color: "#3897f0",
                          fontFamily: "Arial,sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 550,
                          lineHeight: "18px",
                        }}
                      >
                        View this post on Instagram
                      </div>
                    </div>
                    <div style={{ padding: "12.5% 0" }}></div>{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "14px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "50%",
                            height: "12.5px",
                            width: "12.5px",
                            transform: "translateX(0px) translateY(7px)",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            height: "12.5px",
                            transform:
                              "rotate(-45deg) translateX(3px) translateY(1px)",
                            width: "12.5px",
                            flexGrow: 0,
                            marginRight: "14px",
                            marginLeft: "2px",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "50%",
                            height: "12.5px",
                            width: "12.5px",
                            transform: "translateX(9px) translateY(-18px)",
                          }}
                        ></div>
                      </div>
                      <div style={{ marginLeft: "8px" }}>
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "50%",
                            flexGrow: 0,
                            height: "20px",
                            width: "20px",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "2px solid transparent",
                            borderLeft: "6px solid #f4f4f4",
                            borderBottom: "2px solid transparent",
                            transform:
                              "translateX(16px) translateY(-4px) rotate(30deg)",
                          }}
                        ></div>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        {" "}
                        <div
                          style={{
                            width: "0px",
                            borderTop: "8px solid #F4F4F4",
                            borderRight: "8px solid transparent",
                            transform: "translateY(16px)",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            flexGrow: 0,
                            height: "12px",
                            width: "16px",
                            transform: "translateY(-4px)",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "8px solid #F4F4F4",
                            borderLeft: "8px solid transparent",
                            transform: "translateY(-4px) translateX(8px)",
                          }}
                        ></div>
                      </div>
                    </div>{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "center",
                        marginBottom: "24px",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          marginBottom: "6px",
                          width: "224px",
                        }}
                      ></div>{" "}
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          width: "144px",
                        }}
                      ></div>
                    </div>
                  </a>
                  <p
                    style={{
                      color: "#c9c8cd",
                      fontFamily: "Arial,sans-serif",
                      fontSize: "14px",
                      lineHeight: "17px",
                      marginBottom: 0,
                      marginTop: "8px",
                      overflow: "hidden",
                      padding: "8px 0 7px",
                      textAlign: "center",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <a
                      href="https://www.instagram.com/p/DJEYKPLsCGK/?utm_source=ig_embed&amp;utm_campaign=loading"
                      style={{
                        color: "#c9c8cd",
                        fontFamily: "Arial,sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        lineHeight: "17px",
                        textDecoration: "none",
                      }}
                      target="_blank"
                    >
                      A post shared by NIRMATA (@nirmata_dk)
                    </a>
                  </p>
                </div>
              </blockquote>
              <script async src="//www.instagram.com/embed.js"></script>
            </div>
            <div className="bg-[#2a2a2a] aspect-square rounded-lg flex items-center justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DHLOsreNx5A/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "3px",
                  boxShadow:
                    "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: "1px",
                  maxWidth: "540px",
                  minWidth: "326px",
                  padding: 0,
                  width: "calc(100% - 2px)",
                }}
              >
                <div style={{ padding: "16px" }}>
                  {" "}
                  <a
                    href="https://www.instagram.com/reel/DHLOsreNx5A/?utm_source=ig_embed&amp;utm_campaign=loading"
                    style={{
                      background: "#FFFFFF",
                      lineHeight: 0,
                      padding: "0 0",
                      textAlign: "center",
                      textDecoration: "none",
                      width: "100%",
                    }}
                    target="_blank"
                  >
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "50%",
                          flexGrow: 0,
                          height: "40px",
                          marginRight: "14px",
                          width: "40px",
                        }}
                      ></div>{" "}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "4px",
                            flexGrow: 0,
                            height: "14px",
                            marginBottom: "6px",
                            width: "100px",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "4px",
                            flexGrow: 0,
                            height: "14px",
                            width: "60px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div style={{ padding: "19% 0" }}></div>{" "}
                    <div
                      style={{
                        display: "block",
                        height: "50px",
                        margin: "0 auto 12px",
                        width: "50px",
                      }}
                    >
                      <svg
                        width="50px"
                        height="50px"
                        viewBox="0 0 60 60"
                        version="1.1"
                        xmlns="https://www.w3.org/2000/svg"
                        xmlnsXlink="https://www.w3.org/1999/xlink"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            transform="translate(-511.000000, -20.000000)"
                            fill="#000000"
                          >
                            <g>
                              <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div style={{ paddingTop: "8px" }}>
                      {" "}
                      <div
                        style={{
                          color: "#3897f0",
                          fontFamily: "Arial,sans-serif",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 550,
                          lineHeight: "18px",
                        }}
                      >
                        View this post on Instagram
                      </div>
                    </div>
                    <div style={{ padding: "12.5% 0" }}></div>{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "14px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "50%",
                            height: "12.5px",
                            width: "12.5px",
                            transform: "translateX(0px) translateY(7px)",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            height: "12.5px",
                            transform:
                              "rotate(-45deg) translateX(3px) translateY(1px)",
                            width: "12.5px",
                            flexGrow: 0,
                            marginRight: "14px",
                            marginLeft: "2px",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "50%",
                            height: "12.5px",
                            width: "12.5px",
                            transform: "translateX(9px) translateY(-18px)",
                          }}
                        ></div>
                      </div>
                      <div style={{ marginLeft: "8px" }}>
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            borderRadius: "50%",
                            flexGrow: 0,
                            height: "20px",
                            width: "20px",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "2px solid transparent",
                            borderLeft: "6px solid #f4f4f4",
                            borderBottom: "2px solid transparent",
                            transform:
                              "translateX(16px) translateY(-4px) rotate(30deg)",
                          }}
                        ></div>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        {" "}
                        <div
                          style={{
                            width: "0px",
                            borderTop: "8px solid #F4F4F4",
                            borderRight: "8px solid transparent",
                            transform: "translateY(16px)",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            backgroundColor: "#F4F4F4",
                            flexGrow: 0,
                            height: "12px",
                            width: "16px",
                            transform: "translateY(-4px)",
                          }}
                        ></div>{" "}
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "8px solid #F4F4F4",
                            borderLeft: "8px solid transparent",
                            transform: "translateY(-4px) translateX(8px)",
                          }}
                        ></div>
                      </div>
                    </div>{" "}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "center",
                        marginBottom: "24px",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          marginBottom: "6px",
                          width: "224px",
                        }}
                      ></div>{" "}
                      <div
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "4px",
                          flexGrow: 0,
                          height: "14px",
                          width: "144px",
                        }}
                      ></div>
                    </div>
                  </a>
                  <p
                    style={{
                      color: "#c9c8cd",
                      fontFamily: "Arial,sans-serif",
                      fontSize: "14px",
                      lineHeight: "17px",
                      marginBottom: 0,
                      marginTop: "8px",
                      overflow: "hidden",
                      padding: "8px 0 7px",
                      textAlign: "center",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <a
                      href="https://www.instagram.com/reel/DHLOsreNx5A/?utm_source=ig_embed&amp;utm_campaign=loading"
                      style={{
                        color: "#c9c8cd",
                        fontFamily: "Arial,sans-serif",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        lineHeight: "17px",
                        textDecoration: "none",
                      }}
                      target="_blank"
                    >
                      A post shared by NIRMATA (@nirmata_dk)
                    </a>
                  </p>
                </div>
              </blockquote>
              <script async src="//www.instagram.com/embed.js"></script>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
          <p className="text-center mb-8 text-lg">
            Interested in booking us or just want to say hello? Send us a
            message!
          </p>

          <form
            action="https://formsubmit.co/fover99@gmail.com"
            method="POST"
            className="space-y-6"
          >
            <input
              type="hidden"
              name="_subject"
              value="New message from Nirmata website!"
            />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://www.nirmata.dk/" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
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
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
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
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
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
          <p className="text-center md:text-left">
            &copy; 2025 Nirmata. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/NirmataDK"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/nirmata_dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://distrokid.com/hyperfollow/nirmata/circles"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              Stream our music
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
