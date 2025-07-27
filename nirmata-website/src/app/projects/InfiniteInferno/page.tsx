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

export default function InfernoEPK(){
    const [showHero, setShowHero] = useState(true);
    
    // Data configuration - Easy to modify!
    const albumArtUrl = "/INFERNO_COVER_NOW.png";
    const albumTitle = "Infinite Inferno";
    const albumDescription = "A relentless journey through electronic soundscapes that push the boundaries of sonic intensity.";
    const embedUrl = "https://samply.app/embed/c4snNvbiocLyAWXB9HCH";

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
    <div>
        <HeroSection 
          showHero={showHero} 
          onDismiss={()=> setShowHero(false)}
          albumArtUrl={albumArtUrl}
          albumTitle={albumTitle}
          albumDescription={albumDescription}
          colorTheme="fire"
        />

        
    </div>
  )
}