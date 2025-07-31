"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface DesktopLayoutProps {
  showHero: boolean;
  albumArtUrl: string;
  children: ReactNode;
  backgroundBlur?: number;
}

export function DesktopLayout({ showHero, albumArtUrl, children, backgroundBlur = 4 }: DesktopLayoutProps) {
  return (
    <div className={`hidden lg:block transition-opacity duration-500 ${showHero ? "opacity-20" : "opacity-100"}`}>
      <div className="relative flex min-h-screen">
        <div className="absolute inset-0">
          <Image
            src={albumArtUrl}
            alt="Album Art Background"
            fill
            className="object-cover opacity-50 transition-all duration-300 ease-out"
            style={{ filter: `blur(${backgroundBlur}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        </div>
        
        {/* Right Scrolling Column - Content */}
        <div className="flex-1 bg-black/30 backdrop-blur-sm z-10">
          {children}
        </div>
      </div>
    </div>
  );
}