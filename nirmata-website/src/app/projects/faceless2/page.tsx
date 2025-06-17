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
  const embedUrl = "https://samply.app/embed/c4snNvbiocLyAWXB9HCH";
  
  const bandMembers = [
    { name: "VICTOR HØVRING", instrument: "VOCALS" },
    { name: "ANDREAS FOVERSKOV", instrument: "GUITAR" },
    { name: "ROSS MCPHERSON", instrument: "BASS" },
    { name: "JACOB OTTOSEN", instrument: "DRUMS" }
  ];

  const bandDescription = [
    "NIRMATA - Big, Melodic, Modern Rock from Copenhagen",
    "Formed in 2023, NIRMATA delivers a unique blend of raw emotion and heavy grooves. Combining the intensity of modern heavy rock with the nostalgic, riff-heavy vibe. The music is inspired by film, history, religion & artists like Karnivool, Mastodon, Black Peaks, and Dizzy Mizz Lizzy.",
    '<span class="font-light tracking-widest italic text-blue-400">It\'s powerful, melancholic and honest.</span>', 
    "In 2024, the band self-released 3 singles: Empire, Bloom, and Circles - touching on themes of religion, exclusion, and growth."
  ];

  const albumInfo = 'NIRMATA will release their debut album<span class="text-blue-500 tracking-widest font-light italic"> AVERNO </span>on September 5, 2025 through LAST MILE RECORDS.';

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
      title: "Last Mile Records - Jimmy Nielsen",
      icon: "🏢",
      email: "jimmy@lastmile.dk",
      phone: "+45 41 14 11 60",
      website: "lastmile.dk"
    },
    {
      title: "Booking - Mathias",
      icon: "📰",
      email: "mathias@lastmile.dk",
    },
    {
      title: "NIRMATA",
      icon: "🎤",
      email: "nirmata@evergreenstudios.dk",
      website: "nirmata.dk"
    }
  ];

  const streamingPlatforms = [
    { name: "Spotify", icon: "♪", bgColor: "bg-green-500", hoverColor: "bg-green-500/20", href: "https://open.spotify.com/track/4JZo9vV66bCWOtTMbQ5Lxl?si=9f521319e8574632" },
    { name: "Apple Music", icon: "♪", bgColor: "bg-red-500", hoverColor: "bg-red-500/20", href: "#" },
    { name: "SoundCloud", icon: "♪", bgColor: "bg-orange-500", hoverColor: "bg-orange-500/20", href: "#" },
    { name: "Bandcamp", icon: "♪", bgColor: "bg-purple-500", hoverColor: "bg-purple-500/20", href: "#" }
  ];

  const socialMedia = [
    { name: "Facebook", icon: "f", bgColor: "bg-blue-600", hoverColor: "bg-blue-500/20", href: "#" },
    { name: "Instagram", icon: "📷", bgColor: "bg-gradient-to-r from-pink-500 to-purple-500", hoverColor: "bg-pink-500/20", href: "#" },
    { name: "Twitter/X", icon: "X", bgColor: "bg-sky-500", hoverColor: "bg-sky-500/20", href: "#" },
    { name: "YouTube", icon: "▶", bgColor: "bg-red-600", hoverColor: "bg-red-600/20", href: "#" }
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
      <HeroSection showHero={showHero} onDismiss={() => setShowHero(false)} />

      {/* Desktop Layout */}
      <DesktopLayout showHero={showHero} albumArtUrl={albumArtUrl}>
        <ListenSection embedUrl={embedUrl} />
        <AboutSection 
          bandMembers={bandMembers}
          bandPhotoUrl="/BANDFRONT.jpg"
          description={bandDescription}
          albumInfo={albumInfo}
        />
        <div className="bg-gradient-to-b from-black/20 to-transparent py-20 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <CreditsSection credits={credits} />
            </div>
            <div className="flex-1">
              <ReleaseDetailsSection releaseDetails={releaseDetails} />
            </div>
          </div>
        </div>
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