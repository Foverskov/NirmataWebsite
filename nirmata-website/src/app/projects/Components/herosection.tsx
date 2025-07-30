"use client";

import Image from "next/image";

// Predefined color themes for consistency
const colorThemes = {
  purple: 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
  fire: 'bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent',
  ocean: 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent',
  emerald: 'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent',
  sunset: 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent',
  neon: 'bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent',
  royal: 'bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent',
  cosmic: 'bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent'
} as const;

interface HeroSectionProps {
  showHero: boolean;
  onDismiss: () => void;
  albumArtUrl: string;
  backgroundImageUrl?: string; // Optional, defaults to albumArtUrl if not provided
  albumTitle: string;
  albumDescription: string;
  colorTheme?: keyof typeof colorThemes; // Predefined themes
  customTitleClass?: string; // Custom Tailwind classes for advanced use
}

export function HeroSection({ 
  showHero, 
  onDismiss, 
  albumArtUrl, 
  backgroundImageUrl, 
  albumTitle, 
  albumDescription,
  colorTheme,
  customTitleClass
}: HeroSectionProps) {
  // Determine the title class to use
  const titleClass = customTitleClass || (colorTheme && colorThemes[colorTheme]) || 'text-gradient-epk';
  return (
    <div
      className={`fixed inset-0 z-40 min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 bg-black cursor-pointer ${
        showHero ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={onDismiss}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImageUrl || albumArtUrl}
          alt={`${albumTitle} Album Art`}
          fill
          className="object-cover opacity-50 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center animate-fadeIn">
        <div className="mb-8 animate-slideDown text-center">
          <Image
            src="/Nirmata_Logo.svg"
            alt="NIRMATA Logo"
            width={440}
            height={190}
            className="mx-auto invert"
            priority
          />
          {/* <h2 className="text-lg md:text-2xl text-center text-gray-400 tracking-wide mt-2">
            X
          </h2> */}
          {/* <h1 className="text-2xl md:text-5xl text-center text-nirmata-light tracking-widest">
            Last Mile
          </h1> */}
          <h3 className="mt-12 text-2xl md:text-3xl text-center tracking-wide text-nirmata-light">
            Presents
          </h3>
        </div>
        
        <div className="w-full max-w-md mb-8 mt-8 animate-scaleIn relative h-96">
          <Image
            src={albumArtUrl}
            alt={`${albumTitle} Album Art`}
            fill
            className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20 hover:shadow-epk-cyan/30 transition-all duration-300"
          />
        </div>

        <h2 className={`text-3xl md:text-5xl mb-8 ${titleClass} tracking-widest animate-slideUp`}>
          {albumTitle.toUpperCase()}
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto text-center animate-fadeIn animation-delay-500 sm:px-4">
          <span className="italic">A new single from Copenhagen based metal band</span>
        </p>
        <p className="text-sm text-gray-500 animate-pulse animate-fadeIn animation-delay-1000 sm:text-xs">
          Click anywhere or scroll to continue...
        </p>
      </div>
    </div>
  );
}