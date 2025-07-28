"use client";

import { Music, Users } from "lucide-react";
import { useState, useEffect } from "react";
// import Image from "next/image";
import { usePerformanceMonitor } from "../../../components/PerformanceMonitor";

// Import all EPK components - Corrected paths
import { HeroSection } from "../Components/herosection";
import { ListenSection } from "../Components/listenSection";
import { AboutSection } from "../Components/AboutSection";
import { CreditsSection } from "../Components/CreditSection";
import { ReleaseDetailsSection } from "../Components/ReleaseDetailsSection";
import { ContactSection } from "../Components/ContactSection";
import { DesktopLayout } from "../Components/desktopLayout";
import { MobileLayout } from "../Components/mobileLayout";

export default function FacelessEPK() {
  // Performance monitoring
  usePerformanceMonitor("FacelessEPK");

  const [showHero, setShowHero] = useState(true);

  // Data configuration - Easy to modify!
  const albumArtUrl = "/FACELESS FINAL.png";
  const albumTitle = "Faceless";
  const albumDescription = "A journey through identity and self-discovery";
  const embedUrl = "https://samply.app/embed/c4snNvbiocLyAWXB9HCH";
  
  const bandMembers = [
    { name: "VICTOR HØVRING", instrument: "VOCALS" },
    { name: "ANDREAS FOVERSKOV", instrument: "GUITAR" },
    { name: "ROSS MCPHERSON", instrument: "BASS" },
    { name: "JACOB OTTOSEN", instrument: "DRUMS" }
  ];

  const bandDescription = [
    "NIRMATA is a new modern rock project based in Copenhagen, Denmark, blending powerful vocals with captivating, melodic riffs and thunderous drums.",
    "With a dynamic sound that covers both sensitive, melodic sections as well as anthemic, powerful choruses, listeners can expect to hear echoes of Karnivool, VOLA, Mastodon, Black Peaks, and Dizzy Mizz Lizzy.",
    "In 2024, the band self-released 3 singles: Empire, Bloom, and Circles - touching on themes of religion, exclusion, and growth."
  ];

  const albumInfo = 'NIRMATA will release their debut album<span class="text-epk-gold ml-2 mr-2"> AVERNO </span>on August 8, 2025 through LAST MILE RECORDS.';

  const credits = [
    {
      title: "Authors",
      content: "Victor Isager Høvring, Ross James McPherson"
    },
    {
      title: "Composers",
      content: [
        "Andreas Ahrenst Foverskov",
        "Victor Isager Høvring",
        "Jacob Vejter Ottosen",
        "Ross James McPherson",
        "Oliver Tue Lundquist Møller"
      ]
    },
    {
      title: "Production",
      content: [
        "Recording, Mix & Master: Oliver Tue Lundquist Møller",
        "Cover Artwork: Ross James McPherson"
      ]
    }
  ];

  const releaseDetails = [
    {
      title: "Timeline",
      items: [
        "Written & Recorded: 2024",
        "Release Date: June 6, 2025"
      ]
    },
    {
      title: "Publishing",
      items: [
        "Label: LAST MILE RECORDS",
        "Publisher: LAST MILE SONGS",
        "ISRC: DK-B2I-24-00401"
      ]
    }
  ];

  const contactInfo = [
    {
      title: "Management & Booking",
      email: "booking@nirmata.com",
      phone: "+45 12 34 56 78"
    },
    {
      title: "Press & Media",
      email: "press@nirmata.com",
      website: "www.nirmata.dk"
    }
  ];

  const streamingPlatforms = [
    { name: "Spotify", href: "#" },
    { name: "Apple Music", href: "#" },
    { name: "SoundCloud", href: "#" },
    { name: "Bandcamp", href: "#" }
  ];

  const socialMedia = [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Twitter/X", href: "#" },
    { name: "YouTube", href: "#" }
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

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <HeroSection 
        showHero={showHero} 
        onDismiss={() => setShowHero(false)}
        albumArtUrl={albumArtUrl}
        albumTitle={albumTitle}
        albumDescription={albumDescription}
      />

      {/* Desktop Layout */}
      <DesktopLayout showHero={showHero} albumArtUrl={albumArtUrl}>
        <ListenSection embedUrl={embedUrl} />
        <AboutSection 
          bandMembers={bandMembers}
          bandPhotoUrl="/BANDFRONT.jpg"
          description={bandDescription}
          albumInfo={albumInfo}
        />
        <CreditsSection credits={credits} />
        <ReleaseDetailsSection releaseDetails={releaseDetails} />
      </DesktopLayout>

      {/* Mobile Layout */}
      <MobileLayout showHero={showHero} albumArtUrl={albumArtUrl}>
        <ListenSection embedUrl={embedUrl} className="bg-gradient-to-b from-transparent to-black/20 py-20 backdrop-blur-sm" />
        <AboutSection 
          bandMembers={bandMembers}
          bandPhotoUrl="/BANDFRONT.jpg"
          description={bandDescription}
          albumInfo={albumInfo}
          className="bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm"
          isMobile={true}
        />
        <CreditsSection credits={credits} className="bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm" />
        <ReleaseDetailsSection releaseDetails={releaseDetails} className="bg-gradient-to-b from-transparent to-black/20 py-20 backdrop-blur-sm" />
      </MobileLayout>

      {/* Contact Section - Shared between layouts */}
      <ContactSection 
        contactInfo={contactInfo}
        streamingPlatforms={streamingPlatforms}
        socialMedia={socialMedia}
      />

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