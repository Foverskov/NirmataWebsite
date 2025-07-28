"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePerformanceMonitor } from "../../../components/PerformanceMonitor";

// Import all EPK components - Corrected paths
import { HeroSection } from "../Components/herosection";
import { ContactSection } from "../Components/ContactSection";
import { AboutSection } from "../Components/AboutSection";
import { DesktopLayout } from "../Components/desktopLayout";
import { MobileLayout } from "../Components/mobileLayout";
import { SongMetaDataSection } from "../Components/SongMetaDataSection";
import { DesignSection } from "../Components/DesignSection";

export default function InfernoEPK(){
    // Performance monitoring
    usePerformanceMonitor("InfernoEPK");
    
    const [showHero, setShowHero] = useState(true);
    
    // Data configuration - Easy to modify!
    const albumArtUrl = "/INFERNO_COVER_NOW.png";
    const albumTitle = "Infinite Inferno";
    const albumDescription = "A relentless journey through electronic soundscapes that push the boundaries of sonic intensity.";
    const embedUrl = "https://samply.app/embed/lIRZrw2XhEzllfKdWOhW";
    const bandDescription = [
    "NIRMATA - Big, Melodic, Modern Rock from Copenhagen",
    "Formed in 2023, NIRMATA delivers a unique blend of raw emotion and heavy grooves. Combining the intensity of modern heavy rock with the nostalgic, riff-heavy vibe. The music is inspired by film, history, religion & artists like Karnivool, Mastodon, Black Peaks, and Dizzy Mizz Lizzy.",
    '<span class="font-light tracking-widest italic text-blue-400">It\'s powerful, melancholic and honest.</span>', 
    "In 2024, the band self-released 3 singles: Empire, Bloom, and Circles - touching on themes of religion, exclusion, and growth."
  ];

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

    // Design assets for Infinite Inferno
    const designAssets = [
      {
        src: albumArtUrl,
        alt: `${albumTitle} Album Cover`,
        title: "Album Artwork",
        description: "High-resolution album cover for press and promotional use"
      },
      {
        src: "/BANDFRONT.jpg",
        alt: "NIRMATA Band Photo",
        title: "Band Photo",
        description: "Official band photograph for media and press kits"
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
          <div className="bg-gradient-to-b from-black/20 to-transparent py-60 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1">
                  <div className="card-epk-fire p-8">
                    <h3 className="text-3xl font-bold mb-6 text-gradient-fire">
                      About Infinite Inferno
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                      <div className="flex-shrink-0">
                        <Image
                          src={albumArtUrl}
                          alt={albumTitle}
                          width={357}
                          height={357}
                          className="rounded-lg shadow-lg"
                          priority
                        />
                      </div>
                      <div className="flex-1">
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
                  </div>
                </div>
                <div className="lg:w-96">
                  <SongMetaDataSection 
                    embedUrl={embedUrl}
                    credits={credits}
                    releaseDetails={releaseDetails}
                    compact={true}
                    maxHeight="calc(100vh - 200px)"
                    theme="fire"
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
              <div className="card-epk-fire p-8 mb-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <h3 className="text-3xl font-bold mb-6 text-gradient-fire">
                    About Infinite Inferno
                  </h3>
                  <Image
                    src={albumArtUrl}
                    alt={albumTitle}
                    width={176}
                    height={176}
                    className="rounded-lg shadow-lg mb-6"
                    priority
                  />
                </div>
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
                theme="fire"
              />
            </div>
          </div>
        </MobileLayout>

        {/* About Section */}
        <AboutSection 
          bandPhotoUrl="/BANDFRONT.jpg"
          description={bandDescription}
          albumInfo="Infinite Inferno represents a new chapter in NIRMATA's sonic evolution."
          bandMembers={[]}
          theme="fire"
        />

        {/* Design Section */}
        <DesignSection 
          designAssets={designAssets}
          theme="fire"
        />

        {/* Contact Section - Add if needed */}
        <ContactSection 
          contactInfo={[
            {
              title: "NIRMATA",
              email: "nirmata@evergreenstudios.dk",
              website: "nirmata.dk"
            }
          ]}
          streamingPlatforms={[
            { name: "Spotify", href: "#" },
            { name: "Apple Music", href: "#" },
            { name: "Linktree", href:"#"}
          ]}
          socialMedia={[
            { name: "Instagram", href: "#" },
            { name: "YouTube", href: "#" }
          ]}
          theme="fire"
        />
    </div>
  )
}