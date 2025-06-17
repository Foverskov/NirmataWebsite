"use client";

import { Users } from "lucide-react";
import Image from "next/image";
// import { BandMemberCard } from "./BandMemberCardProps";

interface BandMember {
  name: string;
  instrument: string;
}

interface AboutSectionProps {
  bandMembers: BandMember[];
  bandPhotoUrl: string;
  description: string[];
  albumInfo: string;
  className?: string;
  isMobile?: boolean;
}

export function AboutSection({ 
  // bandMembers, 
  bandPhotoUrl, 
  description, 
  albumInfo, 
  className = "",
  // isMobile = false 
}: AboutSectionProps) {
  return (
    <div
      id="about"
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-black/20 to-transparent px-4 lg:px-12 ${className}`}
    >
      <div className="w-full max-w-2xl">
        <div className="card-epk p-8">
          <h3 className="text-3xl font-bold mb-8 text-epk-cyan flex items-center gap-3">
            <Users className="w-8 h-8" />
            About NIRMATA
          </h3>

          {/* Band Photo */}
          <div className="mb-8 relative h-100">
            <Image
              src={bandPhotoUrl}
              alt="NIRMATA Band Photo"
              fill
              className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20"
            />
          </div>

          <div className="space-y-6 mt-8">
            {description.map((paragraph, index) => {
              // Check if paragraph contains HTML tags
              if (paragraph.includes('<')) {
                return (
                  <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                );
              } else {
                return (
                  <p key={index} className="text-gray-100 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
            })}
            <div className="font-semibold" dangerouslySetInnerHTML={{ __html: albumInfo }} />
          </div>
        </div>
      </div>
    </div>
  );
}