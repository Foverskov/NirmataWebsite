"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface MobileLayoutProps {
  showHero: boolean;
  albumArtUrl: string;
  children: ReactNode;
}

export function MobileLayout({ showHero, albumArtUrl, children }: MobileLayoutProps) {
  return (
    <div className={`lg:hidden transition-opacity duration-500 relative ${showHero ? "opacity-0" : "opacity-100"}`}>
      {/* Background Image for mobile layout */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={albumArtUrl}
          alt="Album Art Background"
          fill
          className="object-cover opacity-20 scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      {children}
    </div>
  );
}