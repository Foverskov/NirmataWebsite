"use client";

import { useState, useEffect } from "react";
import { usePerformanceMonitor } from "../../../components/PerformanceMonitor";

// Import all EPK components - Corrected paths
import { HeroSection } from "../Components/herosection";
import { ContactSection } from "../Components/ContactSection";
import { DesktopLayout } from "../Components/desktopLayout";
import { MobileLayout } from "../Components/mobileLayout";
import { SongMetaDataSection } from "../Components/SongMetaDataSection";

export default function InfernoEPK(){
    // Performance monitoring
    usePerformanceMonitor("InfernoEPK");
    
    const [showHero, setShowHero] = useState(true);
    
    // Data configuration - Easy to modify!
    const albumArtUrl = "/INFERNO_COVER_NOW.png";
    const albumTitle = "Infinite Inferno";
    const albumDescription = "A relentless journey through electronic soundscapes that push the boundaries of sonic intensity.";
    const embedUrl = "https://samply.app/embed/lIRZrw2XhEzllfKdWOhW";

    // Credits data for Infinite Inferno
    const credits = [
      {
        title: "Authors",
        content: "Victor Isager Høvring, Andreas Foverskov"
      },
      {
        title: "Composers",
        content: [
          "Andreas Ahrenst Foverskov",
          "Victor Isager Høvring",
          "Jacob Vejter Ottosen",
          "Ross James McPherson"
        ]
      },
      {
        title: "Production",
        content: [
          "Producer: NIRMATA",
          "Mix & Master: Oliver Tue Lundquist Møller",
          "Cover Artwork: NIRMATA Creative"
        ]
      }
    ];

    // Release details for Infinite Inferno
    const releaseDetails = [
      {
        title: "Timeline",
        items: [
          "Written & Recorded: 2024-2025",
          "Release Date: TBA 2025"
        ]
      },
      {
        title: "Publishing",
        items: [
          "Label: LAST MILE RECORDS",
          "Publisher: LAST MILE SONGS",
          "ISRC: TBA"
        ]
      },
      {
        title: "Technical",
        items: [
          "Genre: Electronic Metal",
          "Duration: TBA",
          "Format: Digital Release"
        ]
      }
    ];

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showHero) setShowHero(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showHero]);

  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [albumArtUrl, "/BANDFRONT.jpg"];
      imageUrls.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = url;
        document.head.appendChild(link);
      });
    };
    preloadImages();
  }, []);

  useEffect(() => {
    if (showHero) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    };
  }, [showHero]);

  useEffect(() => {
    if (!showHero) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHero]);

  return(
    <div className="bg-black text-white">
        <HeroSection 
          showHero={showHero} 
          onDismiss={()=> setShowHero(false)}
          albumArtUrl={albumArtUrl}
          albumTitle={albumTitle}
          albumDescription={albumDescription}
          colorTheme="fire"
        />

        {/* Desktop Layout */}
        <DesktopLayout showHero={showHero} albumArtUrl={albumArtUrl}>
          <div className="bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="card-epk p-8">
                    <h3 className="text-3xl font-bold mb-8 text-epk-cyan">
                      About Infinite Inferno
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {albumDescription}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      This electronic metal journey represents NIRMATA&apos;s exploration into 
                      darker, more intense sonic territories. Combining crushing riffs with 
                      electronic elements, Infinite Inferno pushes the boundaries of what 
                      modern metal can be.
                    </p>
                  </div>
                </div>
                <div className="lg:w-96">
                  <SongMetaDataSection 
                    embedUrl={embedUrl}
                    credits={credits}
                    releaseDetails={releaseDetails}
                    compact={true}
                    maxHeight="calc(100vh - 200px)"
                  />
                </div>
              </div>
            </div>
          </div>
        </DesktopLayout>

        {/* Mobile Layout */}
        <MobileLayout showHero={showHero} albumArtUrl={albumArtUrl}>
          <div className="bg-gradient-to-b from-transparent to-black/20 py-20 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="card-epk p-8 mb-8">
                <h3 className="text-3xl font-bold mb-8 text-epk-cyan">
                  About Infinite Inferno
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {albumDescription}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This electronic metal journey represents NIRMATA&apos;s exploration into 
                  darker, more intense sonic territories.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-2xl">
              <SongMetaDataSection 
                embedUrl={embedUrl}
                credits={credits}
                releaseDetails={releaseDetails}
                className="w-full"
              />
            </div>
          </div>
        </MobileLayout>

        {/* Contact Section - Add if needed */}
        <ContactSection 
          contactInfo={[
            {
              title: "NIRMATA",
              icon: "🎤",
              email: "nirmata@evergreenstudios.dk",
              website: "nirmata.dk"
            }
          ]}
          streamingPlatforms={[
            { name: "Spotify", icon: "♪", bgColor: "bg-green-500", hoverColor: "bg-green-500/20", href: "#" },
            { name: "Apple Music", icon: "♪", bgColor: "bg-red-500", hoverColor: "bg-red-500/20", href: "#" }
          ]}
          socialMedia={[
            { name: "Instagram", icon: "📷", bgColor: "bg-gradient-to-r from-pink-500 to-purple-500", hoverColor: "bg-pink-500/20", href: "#" },
            { name: "YouTube", icon: "▶", bgColor: "bg-red-600", hoverColor: "bg-red-600/20", href: "#" }
          ]}
        />
    </div>
  )
}