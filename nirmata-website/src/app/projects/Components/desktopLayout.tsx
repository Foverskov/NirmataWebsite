"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface DesktopLayoutProps {
  showHero: boolean;
  albumArtUrl: string;
  children: ReactNode;
}

export function DesktopLayout({ showHero, albumArtUrl, children }: DesktopLayoutProps) {
  return (
    <div className={`hidden lg:block transition-opacity duration-500 ${showHero ? "opacity-0" : "opacity-100"}`}>
      <div className="relative flex min-h-screen">
        <div className="absolute inset-0">
          <Image
            src={albumArtUrl}
            alt="Album Art Background"
            fill
            className="object-cover opacity-50 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        </div>
        
        {/* Left Sticky Column - Album Art */}
        {/* <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center bg-black/30 backdrop-blur-sm z-10">
          <div className="w-96 h-96 animate-fadeIn relative">
            <Image
              src={albumArtUrl}
              alt="Album Art"
              fill
              className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20"
            />
          </div>
        </div> */}
        
        {/* Right Scrolling Column - Content */}
        <div className="flex-1 bg-black/30 backdrop-blur-sm z-10">
          {children}
        </div>
      </div>
    </div>
  );
}