"use client";

import Image from "next/image";

interface HeroSectionProps {
  showHero: boolean;
  onDismiss: () => void;
}

export function HeroSection({ showHero, onDismiss }: HeroSectionProps) {
  return (
    <div
      className={`fixed inset-0 z-40 min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 bg-black cursor-pointer ${
        showHero ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={onDismiss}
    >
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
          <Image
            src="/Nirmata_Logo.svg"
            alt="NIRMATA Logo"
            width={300}
            height={120}
            className="mx-auto invert"
            priority
          />
          <h2 className="text-lg md:text-2xl text-center text-gray-400 tracking-wide mt-2">
            X
          </h2>
          <h1 className="text-2xl md:text-5xl text-center text-nirmata-light tracking-widest">
            Last Mile
          </h1>
          <h3 className="text-2xl md:text-3xl text-center tracking-wide text-nirmata-light">
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
  );
}