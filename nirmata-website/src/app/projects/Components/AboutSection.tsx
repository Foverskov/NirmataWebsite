"use client";

// import { Users } from "lucide-react";
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
  theme?: 'default' | 'fire';
}

export function AboutSection({ 
  // bandMembers, 
  bandPhotoUrl, 
  description, 
  albumInfo, 
  className = "",
  // isMobile = false 
  theme = "default"
}: AboutSectionProps) {
  const cardClass = theme === 'fire' ? 'card-epk-fire' : 'card-epk';
  const accentColor = theme === 'fire' ? 'text-gradient-fire' : 'text-epk-cyan';
  return (
    <div
      id="about"
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-black/20 to-transparent px-4 lg:px-12 ${className}`}
    >
      <div className="w-full max-w-6xl">
        <div className={cardClass + " p-8"}>
          {/* Header - Left aligned on desktop, centered on mobile */}
          <h3 className={`text-3xl font-bold mb-8 ${accentColor} text-center lg:text-left`}>
            About NIRMATA
          </h3>

          {/* Content Container - Mobile: stacked, Desktop: side-by-side */}
          <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start">
            {/* Band Photo */}
            <div className="mb-8 lg:mb-0 relative h-96 lg:h-[500px] lg:w-1/2 lg:flex-shrink-0">
              <Image
                src={bandPhotoUrl}
                alt="NIRMATA Band Photo"
                fill
                className="object-cover rounded-lg shadow-2xl shadow-epk-cyan/20"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6 lg:w-1/2 lg:flex-shrink-0">
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
    </div>
  );
}