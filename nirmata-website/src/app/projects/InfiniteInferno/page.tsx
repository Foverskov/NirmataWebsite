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
import { FloatingSocialLinks } from "../Components/FloatingSocialLinks";

export default function InfernoEPK(){
    // Performance monitoring
    usePerformanceMonitor("InfernoEPK");
    
    const [showHero, setShowHero] = useState(true);
    
    // Data configuration - Easy to modify!
    const albumArtUrl = "/INFERNO_COVER_NOW.png";
    const albumTitle = "Inferno";

    // TODO: Rename at some point
    const albumDescription = '<span class="italic">A new single from Copenhagen based metal band</span>';

    const embedUrl = "https://samply.app/embed/lIRZrw2XhEzllfKdWOhW";
    const bandDescription = [
    '<span class="font-bold">NIRMATA</span> is a new modern rock project based in Copenhagen, Denmark blending powerful vocals with captivating, melodic riffs and thunderous drums.',
    "With a dynamic sound that blends  dynamic, melodic moments alongside anthemic choruses, listeners can expect to hear echoes of VOLA, Dizzy Mizz Lizzy, Karnivool, Mastodon, and Black Peaks.",
    'In 2024, the band released 3 singles: <span class="italic font-bold">Empire, Bloom, and Circles</span> - touching on themes of religion, exclusion, and growth. This was followed by 3 singles from their upcoming debut album: <span class="italic font-bold">Dancing On The Sun, Ministry of Pain, and Faceless</span>',
    '<span class="font-extrabold italic text-white">NIRMATA will release their debut album <span class="italic">AVERNO</span> on August 8, 2025.</span>'
  ];


    // Credits data for Infinite Inferno
    const credits = [
      {
        title: "Lyrics",
        content: ["Victor Isager Høvring", "Ross James McPherson"]
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
          "Producer: Oliver Tue Lundquist Møller",
          "Mix & Master: Oliver Tue Lundquist Møller",
          "Cover Artwork: Ross James McPherson",
        ]
      }
    ];

    // Release details for Infinite Inferno
    const releaseDetails = [
      {
        title: "Timeline",
        items: [
          "Written & Recorded: 2024-2025",
          "Release Date: 08.08.2025"
        ]
      },
      {
        title: "Publishing",
        items: [
          "Label: LAST MILE RECORDS",
          "Publisher: LAST MILE SONGS",
          "ISRC: DK-B2I-24-00407"
        ]
      },
      {
        title: "Technical",
        items: [
          "Genre: Progressive metal/Hard Rock",
          "Duration: 4:28",
        ]
      }
    ];

    // Design assets for Infinite Inferno
    const designAssets = [
      {
        src: "/BANDFRONT.jpg",
        alt: "NIRMATA Band Photo",
        title: "Band Photo Primary",
        // description: "Official band photograph for media and press kits"
      },
      {
        src: albumArtUrl,
        alt: `${albumTitle} Album Cover`,
        title: "Inferno Single Artwork",
        // description: "High-resolution album cover for press and promotional use"
      },
      {
        src: "/Averno_Cover_Final.png",
        alt: "Averno Album Cover",
        title: "AVERNO Album Cover",
        description: ""
      },
      {
        src: "/FarawayBW.jpg",
        alt: "NIRMATA Band Photo",
        title: "Band Photo Alternative 1",
        description: ""
      },
      {
        src: "/fullbandcolor.jpg",
        alt: "NIRMATA Band Photo",
        title: "Band Photo Alternative 2",
        description: ""
      },
      {
        src: "/fullbandTallboi.jpg",
        alt: "NIRMATA Band Photo",
        title: "Band Photo Alternative 3",
        description: ""
      },
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
        
        {/* Floating Social Links - Place at top level for proper fixed positioning */}
        {!showHero && (
          <FloatingSocialLinks 
            instagramUrl="https://instagram.com/nirmataband"
            spotifyUrl="https://open.spotify.com/artist/YOUR_ARTIST_ID"
            theme="fire"
          />
        )}
        
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
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="card-epk-fire p-8">
                    <h3 className="text-3xl font-bold mb-6 text-white">
                      About Inferno
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
                        <p className="text-gray-300 leading-relaxed mb-4">
                          <span className="font-bold">A raw, unrelenting burst of industrial chaos, <span className="italic font-bold">Inferno</span> explores the evil within all of us.</span> </p>
                          <p className="text-gray-300 leading-relaxed mb-4">With distorted, pounding rhythms, and haunting vocal fragments, <span className="font-bold">NIRMATA</span> crafts a cinematic soundscape that feels both intimate and alive.</p> 
                          <p className="text-gray-300 leading-relaxed mb-2">For fans of dynamic, genre-blending acts like VOLA and Sleep Token, <span className="italic font-bold">Inferno</span> fuses crushing intensity with atmospheric depth.</p>
                        
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
          <div className="bg-gradient-to-b from-transparent to-black/20 py-12 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="card-epk-fire p-8 mb-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <h3 className="text-3xl font-bold mb-6 text-white">
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
                <div className="flex-1">
                        <p className="text-gray-300 leading-relaxed mb-4">
                          <span className="font-bold">A raw, unrelenting burst of industrial chaos, <span className="italic font-bold">Inferno</span> explores the evil within all of us.</span> </p>
                          <p className="text-gray-300 leading-relaxed mb-4">With distorted, pounding rhythms, and haunting vocal fragments, <span className="font-bold">NIRMATA</span> crafts a cinematic soundscape that feels both intimate and alive.</p> 
                          <p className="text-gray-300 leading-relaxed mb-2">For fans of dynamic, genre-blending acts like VOLA and Sleep Token, <span className="italic font-bold">Inferno</span> fuses crushing intensity with atmospheric depth.</p>
                        
                      </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-black/20 to-transparent py-12 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-6xl">
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
        {/* TODO: Make this section visible from the first view. */}
        <AboutSection 
          bandPhotoUrl="/BANDFRONT.jpg"
          description={bandDescription}
          albumInfo=""
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